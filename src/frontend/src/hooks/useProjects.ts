import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CalculationResult, Project, ProjectInput } from "../backend.d.ts";

// ─────────────────────────────────────────────
// Query keys
// ─────────────────────────────────────────────

export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => ["projects", id] as const,
};

// ─────────────────────────────────────────────
// useListProjects
// ─────────────────────────────────────────────

export function useListProjects() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Project[]>({
    queryKey: projectKeys.all,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

// ─────────────────────────────────────────────
// useGetProject
// ─────────────────────────────────────────────

export function useGetProject(id: string | undefined) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Project | null>({
    queryKey: projectKeys.detail(id ?? ""),
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ─────────────────────────────────────────────
// useCreateProject
// ─────────────────────────────────────────────

export function useCreateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<string, Error, ProjectInput>({
    mutationFn: async (input: ProjectInput) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.createProject(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

// ─────────────────────────────────────────────
// useUpdateProjectInput
// ─────────────────────────────────────────────

export function useUpdateProjectInput() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, { id: string; input: ProjectInput }>({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.updateProjectInput(id, input);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────
// useCalculateProject
// ─────────────────────────────────────────────

export function useCalculateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    { projectId: string; result: CalculationResult | null },
    Error,
    string
  >({
    mutationFn: async (projectId: string) => {
      if (!actor) throw new Error("Actor no disponible");
      const result = await actor.calculateProject(projectId);
      return { projectId, result };
    },
    onSuccess: ({ projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
    },
  });
}

// ─────────────────────────────────────────────
// useDeleteProject
// ─────────────────────────────────────────────

export function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}
