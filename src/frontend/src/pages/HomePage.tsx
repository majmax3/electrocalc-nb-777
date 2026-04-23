import type { Project } from "@/backend.d.ts";
import { Layout } from "@/components/layout/Layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteProject, useListProjects } from "@/hooks/useProjects";
import { INSTALLATION_TYPE_LABELS } from "@/types/electrical";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Edit3,
  FileText,
  Home,
  PlusCircle,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(createdAt: bigint): string {
  try {
    // Motoko Int → nanoseconds bigint; convert to ms
    const ms = Number(createdAt / 1_000_000n);
    const d = new Date(ms);
    // If invalid or year < 2020, fall back to treating as ms directly
    if (Number.isNaN(d.getTime()) || d.getFullYear() < 2020) {
      return new Date(Number(createdAt)).toLocaleDateString("es-BO");
    }
    return d.toLocaleDateString("es-BO");
  } catch {
    return "-";
  }
}

// ─────────────────────────────────────────────
// Banner
// ─────────────────────────────────────────────

function AppBanner({ onNewProject }: { onNewProject: () => void }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-border"
      style={{ background: "oklch(0.17 0.022 240)" }}
      data-ocid="home.banner"
    >
      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.5 0.18 240) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0.18 240) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-28 rounded-full blur-3xl"
        style={{ background: "oklch(0.5 0.18 240 / 0.18)" }}
      />

      <div className="relative px-5 pt-8 pb-6 flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className="text-3xl"
            style={{ filter: "drop-shadow(0 0 10px oklch(0.68 0.12 70))" }}
          >
            ⚡
          </span>
          <h1 className="text-[22px] font-display font-bold tracking-tight text-foreground">
            ElectroCalc{" "}
            <span style={{ color: "oklch(0.68 0.12 70)" }}>NB 777</span>
          </h1>
        </div>

        <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
          Cálculo de instalaciones eléctricas según{" "}
          <span
            className="font-semibold"
            style={{ color: "oklch(0.68 0.12 70)" }}
          >
            Norma Boliviana NB 777
          </span>
        </p>

        <div className="flex gap-2 flex-wrap justify-center">
          <span className="tech-label">Baja Tensión</span>
          <span className="text-muted-foreground/50 text-xs">·</span>
          <span className="tech-label">Fórmulas explícitas</span>
          <span className="text-muted-foreground/50 text-xs">·</span>
          <span className="tech-label">RTDE Bolivia</span>
        </div>

        <Button
          className="mt-2 gap-2 font-semibold text-sm"
          style={{
            background: "oklch(0.5 0.18 240)",
            color: "oklch(0.92 0.01 240)",
          }}
          onClick={onNewProject}
          data-ocid="home.new_project_primary_button"
        >
          <PlusCircle className="w-4 h-4" />
          Nuevo Proyecto
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Skeleton cards while loading
// ─────────────────────────────────────────────

function ProjectSkeletons() {
  return (
    <div className="flex flex-col gap-3" data-ocid="home.loading_state">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-border p-4 space-y-3"
          style={{ background: "oklch(0.17 0.022 240)" }}
        >
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-40 rounded" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-3.5 w-20 rounded" />
            <Skeleton className="h-3.5 w-14 rounded" />
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-8 w-28 rounded" />
            <Skeleton className="h-8 w-28 rounded" />
            <Skeleton className="h-8 w-8 rounded ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────

function EmptyState({ onNewProject }: { onNewProject: () => void }) {
  return (
    <div
      className="flex flex-col items-center gap-4 py-12 px-6 text-center rounded-lg border border-dashed border-border"
      data-ocid="home.projects.empty_state"
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "oklch(0.21 0.025 240)" }}
      >
        <Zap className="w-6 h-6" style={{ color: "oklch(0.5 0.18 240)" }} />
      </div>

      <div className="space-y-1.5">
        <p className="font-semibold text-sm text-foreground">
          No hay proyectos guardados
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[240px]">
          Crea tu primer proyecto para comenzar los cálculos eléctricos según NB
          777
        </p>
      </div>

      <button
        type="button"
        onClick={onNewProject}
        className="flex items-center gap-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        style={{ color: "oklch(0.68 0.12 70)" }}
        data-ocid="home.empty_new_project_link"
      >
        Crear primer proyecto
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Single project card
// ─────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate();
  const deleteProject = useDeleteProject();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isResidential = project.input.installationType === "residential";
  const hasResult = !!project.result;

  async function handleDelete() {
    try {
      await deleteProject.mutateAsync(project.id);
      toast.success("Proyecto eliminado correctamente");
      setDeleteOpen(false);
    } catch {
      toast.error("Error al eliminar el proyecto");
    }
  }

  function goToEdit() {
    navigate({
      to: "/proyecto/$projectId",
      params: { projectId: project.id },
    });
  }

  function goToReport() {
    navigate({
      to: "/proyecto/$projectId/informe",
      params: { projectId: project.id },
    });
  }

  return (
    <div
      className="rounded-lg border border-border flex flex-col gap-3 p-4 transition-smooth hover:border-primary/40"
      style={{ background: "oklch(0.17 0.022 240)" }}
      data-ocid={`home.projects.item.${index}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <h3 className="font-semibold text-sm text-foreground truncate min-w-0 leading-snug pr-1">
          {project.name}
        </h3>
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            background: isResidential
              ? "oklch(0.5 0.18 240 / 0.18)"
              : "oklch(0.68 0.12 70 / 0.18)",
            color: isResidential
              ? "oklch(0.72 0.14 240)"
              : "oklch(0.68 0.12 70)",
          }}
        >
          {isResidential ? (
            <Home className="w-3 h-3" />
          ) : (
            <Building2 className="w-3 h-3" />
          )}
          {INSTALLATION_TYPE_LABELS[project.input.installationType as string] ??
            String(project.input.installationType)}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground">
          <span className="font-mono font-semibold text-foreground">
            {project.input.totalAreaM2}
          </span>{" "}
          m²
        </span>
        <span className="text-muted-foreground/40 text-xs">·</span>
        <span className="text-xs text-muted-foreground">
          <span className="font-mono font-semibold text-foreground">
            {Number(project.input.floors)}
          </span>{" "}
          {Number(project.input.floors) === 1 ? "piso" : "pisos"}
        </span>
        <span className="text-muted-foreground/40 text-xs">·</span>
        <span className="text-xs text-muted-foreground font-mono">
          {formatDate(project.createdAt)}
        </span>

        {hasResult && (
          <>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <span
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{
                background: "oklch(0.6 0.16 150 / 0.15)",
                color: "oklch(0.7 0.14 150)",
              }}
              data-ocid={`home.projects.result_badge.${index}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.6 0.16 150)" }}
              />
              Tiene resultados
            </span>
          </>
        )}
      </div>

      {/* NB 777 compliance warning */}
      {hasResult &&
        project.result &&
        project.result.globalWarnings.length > 0 && (
          <div className="compliance-warning flex items-center gap-2">
            <AlertTriangle
              className="w-3 h-3 flex-shrink-0"
              style={{ color: "oklch(0.65 0.22 25)" }}
            />
            <span className="text-xs" style={{ color: "oklch(0.75 0.15 25)" }}>
              Advertencias de cumplimiento NB 777
            </span>
          </div>
        )}

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs h-8"
          onClick={goToEdit}
          data-ocid={`home.projects.edit_button.${index}`}
        >
          <Edit3 className="w-3 h-3" />
          Editar datos
        </Button>

        {hasResult && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs h-8 transition-smooth"
            style={{
              borderColor: "oklch(0.6 0.16 150 / 0.35)",
              color: "oklch(0.7 0.14 150)",
            }}
            onClick={goToReport}
            data-ocid={`home.projects.report_button.${index}`}
          >
            <FileText className="w-3 h-3" />
            Ver informe
          </Button>
        )}

        {/* Delete */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 ml-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
              aria-label="Eliminar proyecto"
              data-ocid={`home.projects.delete_button.${index}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            className="border-border mx-4 rounded-lg max-w-sm"
            style={{ background: "oklch(0.17 0.022 240)" }}
            data-ocid={`home.projects.delete_dialog.${index}`}
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground text-base font-display">
                ¿Eliminar este proyecto?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground font-semibold">
                  {project.name}
                </strong>{" "}
                — esta acción no se puede deshacer. Se perderán todos los datos
                y resultados guardados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2 flex-row">
              <AlertDialogCancel
                className="flex-1 h-9 text-sm"
                data-ocid={`home.projects.delete_cancel.${index}`}
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="flex-1 h-9 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
                disabled={deleteProject.isPending}
                data-ocid={`home.projects.delete_confirm.${index}`}
              >
                {deleteProject.isPending ? "Eliminando…" : "Eliminar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Project list
// ─────────────────────────────────────────────

function ProjectList({ onNewProject }: { onNewProject: () => void }) {
  const { data: projects, isLoading, isError } = useListProjects();

  if (isLoading) return <ProjectSkeletons />;

  if (isError) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-8 rounded-lg border border-destructive/30 bg-destructive/10 text-center"
        data-ocid="home.projects.error_state"
      >
        <AlertTriangle
          className="w-5 h-5"
          style={{ color: "oklch(0.65 0.22 25)" }}
        />
        <p className="text-sm text-muted-foreground">
          Error al cargar los proyectos
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <EmptyState onNewProject={onNewProject} />;
  }

  return (
    <div className="flex flex-col gap-3" data-ocid="home.projects.list">
      {projects.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx + 1} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate();
  const { data: projects } = useListProjects();
  const hasProjects = projects && projects.length > 0;

  function goToNewProject() {
    navigate({ to: "/proyecto/nuevo" });
  }

  return (
    <Layout>
      <div
        className="flex flex-col gap-5 px-4 pt-4 pb-8 max-w-lg mx-auto w-full"
        data-ocid="home.page"
      >
        {/* Banner */}
        <AppBanner onNewProject={goToNewProject} />

        {/* Projects section */}
        <section data-ocid="home.projects.section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="tech-label">Proyectos Guardados</h2>
            {hasProjects && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs h-7 px-2 transition-smooth"
                style={{ color: "oklch(0.5 0.18 240)" }}
                onClick={goToNewProject}
                data-ocid="home.new_project_secondary_button"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Nuevo
              </Button>
            )}
          </div>

          <ProjectList onNewProject={goToNewProject} />
        </section>

        {/* NB 777 info strip */}
        <div className="compliance-success">
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: "oklch(0.65 0.14 150)" }}
          >
            ⚡ Norma Boliviana NB 777 · RTDE Bolivia
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Todos los cálculos muestran fórmulas explícitas con sustitución de
            valores. Ningún resultado queda en "caja negra".
          </p>
        </div>

        {/* Footer */}
        <footer
          className="text-center pt-1 border-t border-border"
          data-ocid="home.footer"
        >
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            ElectroCalc NB 777 —{" "}
            <span className="font-mono">
              Norma Boliviana de Instalaciones Eléctricas de Baja Tensión
            </span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth underline underline-offset-2"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </Layout>
  );
}
