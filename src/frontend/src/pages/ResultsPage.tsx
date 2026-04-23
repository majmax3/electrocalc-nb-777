import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Coins,
  Settings,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { CircuitDesign, FormulaStep } from "../backend.d.ts";
import { Layout } from "../components/layout/Layout";
import { ComplianceBadge } from "../components/ui/ComplianceBadge";
import { FormulaCard } from "../components/ui/FormulaCard";
import { useGetProject } from "../hooks/useProjects";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function fmt(n: number, d = 2): string {
  return n.toFixed(d);
}

const CIRCUIT_TYPE_MAP: Record<string, string> = {
  lighting: "Iluminación",
  common: "Tomas",
  power: "Fuerza",
};

function CircuitTypeBadge({ type }: { type: CircuitDesign["circuitType"] }) {
  const label = CIRCUIT_TYPE_MAP[type as string] ?? String(type);
  return (
    <Badge variant="outline" className="text-[10px] font-mono">
      {label}
    </Badge>
  );
}

function SummaryPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="tech-label">{label}</span>
      <span
        className={`text-sm font-mono font-bold ${accent ? "text-accent" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-sm bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <h3 className="text-sm font-semibold font-display text-foreground">
          {title}
        </h3>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

function DataRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-xs font-mono font-semibold ${accent ? "text-accent" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

function FormulaList({
  steps,
  label,
}: {
  steps: FormulaStep[];
  label?: string;
}) {
  if (!steps.length) return null;
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {label && <p className="tech-label mb-1">{label}</p>}
      {steps.map((s, i) => (
        <FormulaCard key={`${s.name}-${i}`} step={s} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Circuit card with expand/collapse
// ─────────────────────────────────────────────

function CircuitCard({
  circuit,
  index,
}: {
  circuit: CircuitDesign;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const complies = circuit.compliesNB777;
  const hasWarnings = circuit.warnings.length > 0;

  return (
    <div
      className="border border-border rounded-sm bg-card overflow-hidden"
      data-ocid={`circuit.item.${index + 1}`}
    >
      {/* Header */}
      <div className="px-3 py-3 border-b border-border bg-secondary/20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <CircuitTypeBadge type={circuit.circuitType} />
          <span className="text-xs font-semibold font-display text-foreground truncate">
            {circuit.description}
          </span>
        </div>
        <ComplianceBadge complies={complies} size="sm" />
      </div>

      {/* Summary grid */}
      <div className="px-3 py-3 grid grid-cols-4 gap-2">
        <SummaryPill
          label="I nominal"
          value={`${fmt(circuit.nominalCurrentA)} A`}
        />
        <SummaryPill
          label="I corregida"
          value={`${fmt(circuit.correctedCurrentA)} A`}
          accent
        />
        <SummaryPill
          label="Cable"
          value={`${circuit.cableSectionMm2} mm²`}
          accent
        />
        <SummaryPill label="ITM" value={`${Number(circuit.itmAmperes)} A`} />
      </div>

      <div className="px-3 pb-3 flex items-center gap-4">
        <SummaryPill
          label="ΔV%"
          value={`${fmt(circuit.voltageDropPct)} %`}
          accent={circuit.voltageDropPct > 3}
        />
        <SummaryPill
          label="Carga"
          value={`${fmt(circuit.totalPowerVA, 0)} VA`}
        />
        <SummaryPill label="Puntos" value={String(Number(circuit.points))} />
      </div>

      {/* Warnings */}
      {(!complies || hasWarnings) && (
        <div className="px-3 pb-3 flex flex-col gap-1">
          {circuit.warnings.map((w) => (
            <div
              key={w}
              className="compliance-warning text-xs text-destructive flex items-start gap-2"
            >
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Expandable formulas */}
      {circuit.formulaSteps.length > 0 && (
        <>
          <button
            type="button"
            data-ocid={`circuit.toggle.${index + 1}`}
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2 border-t border-border text-xs text-muted-foreground hover:bg-secondary/30 transition-colors duration-200"
          >
            <span className="font-mono">Ver cálculos</span>
            {open ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          {open && (
            <div className="px-3 pb-3 flex flex-col gap-1.5 bg-secondary/10">
              <FormulaList steps={circuit.formulaSteps} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Loading skeleton
// ─────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4" data-ocid="results.loading_state">
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="text-2xl animate-pulse">⚡</div>
        <p className="text-xs text-muted-foreground font-mono">
          Calculando según NB 777...
        </p>
      </div>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-sm" />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

export default function ResultsPage() {
  const { projectId } = useParams({ from: "/proyecto/$projectId/resultados" });
  const navigate = useNavigate();
  const { data: project, isLoading } = useGetProject(projectId);

  const result = project?.result;

  if (isLoading) {
    return (
      <Layout
        showBack
        backTo={`/proyecto/${projectId}`}
        backLabel="Editar datos"
        headerSubtitle="Resultados NB 777"
      >
        <LoadingSkeleton />
      </Layout>
    );
  }

  if (!result) {
    return (
      <Layout
        showBack
        backTo={`/proyecto/${projectId}`}
        backLabel="Editar datos"
        headerSubtitle="Resultados NB 777"
      >
        <div
          className="flex flex-col items-center gap-5 py-16 text-center"
          data-ocid="results.empty_state"
        >
          <div className="text-4xl">📐</div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Sin resultados calculados
            </p>
            <p className="text-xs text-muted-foreground">
              No hay resultados. Vuelve al formulario y calcula.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            data-ocid="results.back_button"
            onClick={() => navigate({ to: `/proyecto/${projectId}` })}
          >
            ← Ir al formulario
          </Button>
        </div>
      </Layout>
    );
  }

  const energy = result.energyEstimate;
  const fpComp = result.powerFactorCompensation;
  const transformer = result.transformer;

  // Derive overall compliance
  const overallComplies =
    result.globalWarnings.length === 0 &&
    result.circuits.every((c) => c.compliesNB777);

  return (
    <Layout
      showBack
      backTo={`/proyecto/${projectId}`}
      backLabel="Editar datos"
      headerSubtitle={project?.name ?? "Resultados NB 777"}
    >
      {/* Overall compliance banner */}
      <div className="mb-4">
        {overallComplies ? (
          <div className="compliance-success flex items-center gap-2">
            <CheckCircle2
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "oklch(0.6 0.16 150)" }}
            />
            <span
              className="text-xs font-semibold font-mono"
              style={{ color: "oklch(0.6 0.16 150)" }}
            >
              Instalación cumple todos los requisitos NB 777
            </span>
          </div>
        ) : (
          <div className="compliance-warning flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-destructive" />
            <span className="text-xs font-semibold font-mono text-destructive">
              Se detectaron incumplimientos — revisar advertencias
            </span>
          </div>
        )}
      </div>

      <Tabs defaultValue="resumen" data-ocid="results.tabs">
        <TabsList className="w-full grid grid-cols-5 mb-4 h-auto">
          <TabsTrigger
            value="resumen"
            className="text-[10px] px-1 py-1.5 flex flex-col gap-0.5"
            data-ocid="results.tab.resumen"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Resumen</span>
          </TabsTrigger>
          <TabsTrigger
            value="circuitos"
            className="text-[10px] px-1 py-1.5 flex flex-col gap-0.5"
            data-ocid="results.tab.circuitos"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Circuitos</span>
          </TabsTrigger>
          <TabsTrigger
            value="fp"
            className="text-[10px] px-1 py-1.5 flex flex-col gap-0.5"
            data-ocid="results.tab.fp"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>cos φ</span>
          </TabsTrigger>
          <TabsTrigger
            value="trafo"
            className="text-[10px] px-1 py-1.5 flex flex-col gap-0.5"
            data-ocid="results.tab.trafo"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Trafo</span>
          </TabsTrigger>
          <TabsTrigger
            value="costos"
            className="text-[10px] px-1 py-1.5 flex flex-col gap-0.5"
            data-ocid="results.tab.costos"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Costos</span>
          </TabsTrigger>
        </TabsList>

        {/* ─── TAB 1: RESUMEN GENERAL ─── */}
        <TabsContent value="resumen" className="flex flex-col gap-3">
          <InfoCard title="Potencias y Demanda">
            <DataRow
              label="Potencia Instalada Total"
              value={`${fmt(result.totalInstalledPowerVA, 1)} VA`}
            />
            <DataRow
              label="Factor de Temperatura"
              value={fmt(result.temperatureFactor, 3)}
            />
            <DataRow
              label="Factor de Agrupamiento"
              value={fmt(result.groupingFactor, 3)}
            />
            <DataRow
              label="Demanda Máxima NB 777"
              value={`${fmt(result.maxDemandVA, 1)} VA`}
              accent
            />
            <FormulaList
              steps={result.demandFormulaSteps}
              label="Pasos de cálculo — Demanda"
            />
          </InfoCard>

          <InfoCard title="Corriente Principal">
            <DataRow
              label="Corriente de Línea"
              value={`${fmt(result.lineCurrentA, 2)} A`}
              accent
            />
            <FormulaList steps={[]} label="Pasos de cálculo — Corriente" />
          </InfoCard>

          <InfoCard title="Corriente de Cortocircuito">
            <DataRow
              label="I cc (Icc)"
              value={`${fmt(result.shortCircuitCurrentA / 1000, 3)} kA`}
              accent
            />
            <FormulaList
              steps={result.shortCircuitFormulaSteps}
              label="Pasos de cálculo — Cortocircuito"
            />
          </InfoCard>

          {/* Global warnings */}
          {result.globalWarnings.length > 0 && (
            <InfoCard title="Advertencias Normativas">
              <div className="flex flex-col gap-2">
                {result.globalWarnings.map((w) => (
                  <div
                    key={w}
                    className="compliance-warning text-xs text-destructive flex items-start gap-2"
                  >
                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </InfoCard>
          )}
        </TabsContent>

        {/* ─── TAB 2: CIRCUITOS DERIVADOS ─── */}
        <TabsContent value="circuitos" className="flex flex-col gap-3">
          {result.circuits.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 py-10 text-center"
              data-ocid="circuitos.empty_state"
            >
              <p className="text-xs text-muted-foreground">
                No hay circuitos derivados calculados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.circuits.map((c, i) => (
                <CircuitCard key={c.id} circuit={c} index={i} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* ─── TAB 3: FACTOR DE POTENCIA ─── */}
        <TabsContent value="fp" className="flex flex-col gap-3">
          <InfoCard title="Compensación de Factor de Potencia">
            {fpComp.needed ? (
              <>
                <div className="mt-2 compliance-warning flex items-start gap-2 text-xs text-destructive">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    cos φ &lt; 0.95 — Compensación requerida por NB 777 Art. 8.3
                  </span>
                </div>
                <div className="mt-3">
                  <DataRow
                    label="Potencia Reactiva a Compensar"
                    value={`${fmt(fpComp.reactiveKVAR, 3)} kVAR`}
                    accent
                  />
                  <DataRow
                    label="Banco de capacitores sugerido"
                    value={`${fmt(fpComp.suggestedBankKVAR, 2)} kVAR`}
                    accent
                  />
                  <DataRow
                    label="Capacitor"
                    value={`${fmt(fpComp.capacitorMicroFarads, 2)} µF`}
                  />
                </div>
                <FormulaList
                  steps={fpComp.formulaSteps}
                  label="Pasos de cálculo — Compensación"
                />
              </>
            ) : (
              <div className="mt-3 compliance-success flex items-center gap-2">
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.6 0.16 150)" }}
                />
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: "oklch(0.6 0.16 150)" }}
                >
                  cos φ ≥ 0.95 — No requiere compensación
                </span>
              </div>
            )}
          </InfoCard>
        </TabsContent>

        {/* ─── TAB 4: TRANSFORMADOR ─── */}
        <TabsContent value="trafo" className="flex flex-col gap-3">
          <InfoCard title="Dimensionamiento del Transformador">
            {transformer ? (
              <>
                <DataRow
                  label="Potencia requerida"
                  value={`${fmt(transformer.requiredKVA, 2)} kVA`}
                />
                <DataRow
                  label="Potencia nominal seleccionada"
                  value={`${fmt(transformer.selectedKVA, 0)} kVA`}
                  accent
                />
                <DataRow
                  label="Corriente primaria"
                  value={`${fmt(transformer.primaryCurrentA, 2)} A`}
                />
                <DataRow
                  label="Corriente secundaria"
                  value={`${fmt(transformer.secondaryCurrentA, 2)} A`}
                />
                {transformer.isExistingAdequate !== undefined && (
                  <div className="mt-3">
                    <ComplianceBadge
                      complies={transformer.isExistingAdequate}
                      label={
                        transformer.isExistingAdequate
                          ? "Transformador existente: Adecuado"
                          : "Transformador existente: Insuficiente"
                      }
                    />
                  </div>
                )}
                <FormulaList
                  steps={transformer.formulaSteps}
                  label="Pasos de cálculo — Transformador"
                />
              </>
            ) : (
              <p className="text-xs text-muted-foreground py-2">
                No aplica transformador en esta instalación.
              </p>
            )}
          </InfoCard>
        </TabsContent>

        {/* ─── TAB 5: CONSUMO Y COSTOS ─── */}
        <TabsContent value="costos" className="flex flex-col gap-3">
          <InfoCard title="Estimación de Consumo Energético">
            <DataRow
              label="Horas de uso diario asumidas"
              value={`${energy.dailyUsageHours} h/día`}
            />
            <DataRow
              label="Energía diaria"
              value={`${fmt(energy.dailyKWh, 2)} kWh`}
              accent
            />
            <DataRow
              label="Energía mensual (30 días)"
              value={`${fmt(energy.monthlyKWh, 1)} kWh`}
              accent
            />
            <DataRow
              label="Costo estimado mensual"
              value={`Bs. ${fmt(energy.estimatedMonthlyCostBs, 1)}`}
              accent
            />

            <div className="mt-4 flex flex-col gap-2">
              <p className="tech-label">Fórmula de Consumo</p>
              <div className="border border-border rounded-sm bg-secondary/20 px-3 py-3 flex flex-col gap-2">
                <p className="text-xs font-semibold text-foreground">
                  Energía consumida
                </p>
                <code className="formula-code block">
                  E = P_demanda × h_uso × días
                </code>
                <code className="formula-code block text-foreground/80">
                  E = {fmt(result.maxDemandVA / 1000, 3)} kVA ×{" "}
                  {energy.dailyUsageHours} h × 30 días
                </code>
                <div className="flex items-center justify-between">
                  <span className="tech-label">Resultado</span>
                  <span className="text-base font-bold font-mono text-accent">
                    {fmt(energy.monthlyKWh, 2)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      kWh/mes
                    </span>
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-1">
                  Costo estimado basado en tarifa SINEC-ENDE Bolivia
                </p>
              </div>
            </div>
          </InfoCard>
        </TabsContent>
      </Tabs>

      {/* ─── NAVIGATION BUTTONS ─── */}
      <div className="mt-6 flex gap-3 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          data-ocid="results.back_button"
          onClick={() => navigate({ to: `/proyecto/${projectId}` })}
        >
          ← Editar datos
        </Button>
        <Button
          size="sm"
          className="flex-1"
          data-ocid="results.report_button"
          onClick={() => navigate({ to: `/proyecto/${projectId}/informe` })}
        >
          Ver Informe Técnico →
        </Button>
      </div>
    </Layout>
  );
}
