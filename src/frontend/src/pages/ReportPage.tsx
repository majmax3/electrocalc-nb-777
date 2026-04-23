import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCheck, Copy, Home, Printer } from "lucide-react";
import { useState } from "react";
import type { CircuitDesign } from "../backend.d.ts";
import { Layout } from "../components/layout/Layout";
import { ComplianceBadge } from "../components/ui/ComplianceBadge";
import { useGetProject } from "../hooks/useProjects";
import {
  CIRCUIT_TYPE_LABELS,
  CONDUCTOR_INSULATION_LABELS,
  CONDUCTOR_MATERIAL_LABELS,
  INSTALLATION_TYPE_LABELS,
  VOLTAGE_SYSTEM_LABELS,
} from "../types/electrical";

// ─────────────────────────────────────────────
// Small helpers
// ─────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-3">
      <h2 className="text-sm font-bold font-display text-foreground tracking-wider uppercase">
        {children}
      </h2>
      <hr className="mt-1 border-border" />
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-1.5 pr-4 text-[11px] text-muted-foreground font-mono w-1/2">
        {label}
      </td>
      <td className="py-1.5 text-[11px] font-semibold text-foreground font-mono">
        {value}
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────
// Text report generator (for clipboard)
// ─────────────────────────────────────────────

function generateTextReport(
  projectName: string,
  date: string,
  circuits: CircuitDesign[],
): string {
  const lines: string[] = [
    "═══════════════════════════════════════════════════════════",
    "       INFORME TÉCNICO DE INSTALACIÓN ELÉCTRICA",
    "       Norma: NB 777 — Instalaciones Eléctricas de Baja Tensión",
    "═══════════════════════════════════════════════════════════",
    `Proyecto: ${projectName}`,
    `Fecha: ${date}`,
    "",
    "TABLA DE CIRCUITOS DERIVADOS",
    "───────────────────────────────────────────────────────────",
    `${"#".padEnd(3)} ${"Descripción".padEnd(20)} ${"Tipo".padEnd(14)} ${"P(VA)".padStart(7)} ${"I Nom(A)".padStart(9)} ${"Sec(mm²)".padStart(9)} ${"ITM(A)".padStart(7)} ${"ΔV%".padStart(6)} ${"Estado".padStart(10)}`,
    "───────────────────────────────────────────────────────────",
    ...circuits.map(
      (c, i) =>
        `${String(i + 1).padEnd(3)} ${c.description.substring(0, 19).padEnd(20)} ${(CIRCUIT_TYPE_LABELS[c.circuitType as string] ?? String(c.circuitType)).padEnd(14)} ${String(c.totalPowerVA.toFixed(0)).padStart(7)} ${String(c.nominalCurrentA.toFixed(2)).padStart(9)} ${String(c.cableSectionMm2).padStart(9)} ${String(Number(c.itmAmperes)).padStart(7)} ${String(c.voltageDropPct.toFixed(2)).padStart(6)} ${(c.compliesNB777 ? "✓ Cumple" : "✗ No cumple").padStart(10)}`,
    ),
    "",
    "Generado por ElectroCalc NB 777 · caffeine.ai",
  ];
  return lines.join("\n");
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function ReportPage() {
  const { projectId } = useParams({ strict: false }) as { projectId: string };
  const { data: project, isLoading } = useGetProject(projectId);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const result = project?.result;
  const input = project?.input;

  const reportDate = new Date().toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  async function handleCopyReport() {
    if (!project || !result) return;
    const text = generateTextReport(project.name, reportDate, result.circuits);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: do nothing
    }
  }

  // ── Loading ──────────────────────────────────
  if (isLoading) {
    return (
      <Layout
        showBack
        backLabel="Resultados"
        backTo={`/proyecto/${projectId}/resultados`}
        headerSubtitle="Informe técnico"
      >
        <div
          data-ocid="report.loading_state"
          className="flex flex-col gap-3 mt-8 animate-pulse"
        >
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-8 bg-muted rounded-sm" />
          ))}
        </div>
      </Layout>
    );
  }

  // ── No results ───────────────────────────────
  if (!result || !input) {
    return (
      <Layout
        showBack
        backLabel="Resultados"
        backTo={`/proyecto/${projectId}/resultados`}
        headerSubtitle="Informe técnico"
      >
        <div
          data-ocid="report.empty_state"
          className="flex flex-col items-center gap-4 mt-12 text-center px-4"
        >
          <span className="text-4xl">📋</span>
          <p className="text-sm font-semibold text-foreground">
            No hay resultados disponibles
          </p>
          <p className="text-xs text-muted-foreground">
            Ejecuta el cálculo primero para generar el informe técnico.
          </p>
          <Button
            variant="outline"
            size="sm"
            data-ocid="report.back_to_results_button"
            onClick={() =>
              navigate({ to: `/proyecto/${projectId}/resultados` })
            }
          >
            Ver resultados
          </Button>
        </div>
      </Layout>
    );
  }

  const fpComp = result.powerFactorCompensation;
  const transformer = result.transformer;
  const energy = result.energyEstimate;

  const totalLuminaires = input.luminaires.reduce(
    (s, l) => s + Number(l.quantity),
    0,
  );
  const totalCommonOutlets = input.commonOutlets.reduce(
    (s, o) => s + Number(o.quantity),
    0,
  );
  const totalPowerEquipment = input.powerOutlets.length;

  return (
    <Layout
      showBack
      backLabel="Resultados"
      backTo={`/proyecto/${projectId}/resultados`}
      headerSubtitle="Informe técnico"
    >
      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      <div
        className="flex flex-col gap-0 max-w-3xl mx-auto w-full pb-10"
        data-ocid="report.page"
      >
        {/* ── SECTION 1: ENCABEZADO ─────────────────── */}
        <div className="mt-2 mb-1 border border-border rounded-sm bg-card p-4">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="tech-label mb-1">
                Informe Técnico de Instalación Eléctrica
              </p>
              <h1 className="text-lg font-bold font-display text-foreground leading-tight">
                {project.name}
              </h1>
              <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                Norma: NB 777 — Instalaciones Eléctricas de Baja Tensión
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-muted-foreground font-mono">
                {reportDate}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                {INSTALLATION_TYPE_LABELS[input.installationType as string] ??
                  String(input.installationType)}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 italic">
            💡 Use Ctrl+P o el botón de compartir del navegador para imprimir
            este informe
          </p>
        </div>

        {/* ── SECTION 2: DATOS DE ENTRADA ──────────── */}
        <SectionHeading>Datos de Entrada</SectionHeading>
        <div className="border border-border rounded-sm bg-card overflow-hidden">
          <table className="w-full">
            <tbody>
              <DataRow
                label="Tipo de instalación"
                value={
                  INSTALLATION_TYPE_LABELS[input.installationType as string] ??
                  String(input.installationType)
                }
              />
              <DataRow label="Área total" value={`${input.totalAreaM2} m²`} />
              <DataRow
                label="Número de pisos"
                value={String(Number(input.floors))}
              />
              <DataRow
                label="Sistema de voltaje"
                value={
                  VOLTAGE_SYSTEM_LABELS[input.voltageSystem as string] ??
                  String(input.voltageSystem)
                }
              />
              <DataRow
                label="Factor de potencia inicial"
                value={`cos φ = ${input.initialPowerFactor.toFixed(2)}`}
              />
              <DataRow
                label="Temperatura ambiente"
                value={`${input.ambientTempC} °C`}
              />
              <DataRow
                label="Material conductor"
                value={
                  CONDUCTOR_MATERIAL_LABELS[
                    input.conductorType.material as string
                  ] ?? String(input.conductorType.material)
                }
              />
              <DataRow
                label="Aislamiento"
                value={
                  CONDUCTOR_INSULATION_LABELS[
                    input.conductorType.insulation as string
                  ] ?? String(input.conductorType.insulation)
                }
              />
              <DataRow
                label="Distancia al transformador"
                value={`${input.distanceToTransformerM} m`}
              />
              <DataRow
                label="Nº luminarias total"
                value={String(totalLuminaires)}
              />
              <DataRow
                label="Nº tomas comunes total"
                value={String(totalCommonOutlets)}
              />
              <DataRow
                label="Nº equipos de fuerza"
                value={String(totalPowerEquipment)}
              />
            </tbody>
          </table>
        </div>

        {/* ── SECTION 3: TABLA DE CIRCUITOS ────────── */}
        <SectionHeading>Tabla de Circuitos Derivados</SectionHeading>
        <div
          className="overflow-x-auto border border-border rounded-sm"
          data-ocid="report.circuits.table"
        >
          <table className="w-full min-w-[680px] text-[11px] font-mono">
            <thead>
              <tr className="bg-secondary/60 border-b border-border">
                {[
                  "#",
                  "Descripción",
                  "Tipo",
                  "Puntos",
                  "P (VA)",
                  "I Nom (A)",
                  "I Cor (A)",
                  "Sección mm²",
                  "ITM (A)",
                  "ΔV %",
                  "Estado",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-2 py-2 text-muted-foreground font-semibold whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.circuits.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="text-center py-4 text-muted-foreground text-xs"
                  >
                    Sin circuitos calculados
                  </td>
                </tr>
              ) : (
                result.circuits.map((circuit, i) => {
                  const overLimit = circuit.voltageDropPct > 3;
                  return (
                    <tr
                      key={circuit.id}
                      data-ocid={`report.circuit.item.${i + 1}`}
                      className="border-b border-border last:border-0 even:bg-secondary/20"
                    >
                      <td className="px-2 py-1.5 text-muted-foreground">
                        {i + 1}
                      </td>
                      <td className="px-2 py-1.5 text-foreground max-w-[140px] truncate">
                        {circuit.description}
                      </td>
                      <td className="px-2 py-1.5">
                        {CIRCUIT_TYPE_LABELS[circuit.circuitType as string] ??
                          String(circuit.circuitType)}
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        {Number(circuit.points)}
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        {circuit.totalPowerVA.toFixed(0)}
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        {circuit.nominalCurrentA.toFixed(2)}
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        {circuit.correctedCurrentA.toFixed(2)}
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        {circuit.cableSectionMm2}
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        {Number(circuit.itmAmperes)}
                      </td>
                      <td
                        className="px-2 py-1.5 text-right font-bold"
                        style={{
                          color: overLimit
                            ? "oklch(0.55 0.22 25)"
                            : "oklch(0.6 0.16 150)",
                        }}
                      >
                        {circuit.voltageDropPct.toFixed(2)}
                      </td>
                      <td className="px-2 py-1.5">
                        <ComplianceBadge
                          complies={circuit.compliesNB777}
                          size="sm"
                          label={circuit.compliesNB777 ? "OK" : "Revisar"}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── SECTION 4: DIAGRAMA UNIFILAR ─────────── */}
        <SectionHeading>Diagrama Unifilar Simplificado</SectionHeading>
        <p className="text-[10px] text-muted-foreground mb-2 italic">
          Diagrama esquemático — no a escala
        </p>
        <div
          className="border border-border rounded-sm overflow-hidden"
          style={{ background: "oklch(0.10 0.015 240)" }}
        >
          <div
            className="px-3 py-1.5 border-b border-border flex items-center gap-2"
            style={{ background: "oklch(0.13 0.018 240)" }}
          >
            <span className="text-[10px] font-mono text-muted-foreground">
              DIAGRAMA UNIFILAR · NB 777
            </span>
          </div>
          <pre
            data-ocid="report.ascii_diagram"
            className="p-4 text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono"
            style={{ color: "oklch(0.75 0.12 240)" }}
          >
            {result.asciiSingleLineDiagram || defaultAsciiDiagram}
          </pre>
        </div>

        {/* Floor plan */}
        {result.asciiFloorPlan && (
          <>
            <p className="text-[11px] font-bold font-display text-foreground mt-4 mb-1 uppercase tracking-wider">
              Distribución por Planta
            </p>
            <div
              className="border border-border rounded-sm overflow-hidden"
              style={{ background: "oklch(0.10 0.015 240)" }}
            >
              <pre
                data-ocid="report.floor_plan"
                className="p-4 text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono"
                style={{ color: "oklch(0.68 0.10 150)" }}
              >
                {result.asciiFloorPlan}
              </pre>
            </div>
          </>
        )}

        {/* ── SECTION 5: LISTA DE MATERIALES ────────── */}
        <SectionHeading>Lista de Materiales</SectionHeading>
        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="bg-secondary/60 border-b border-border">
                <th className="text-left px-3 py-2 text-muted-foreground font-semibold">
                  Descripción
                </th>
                <th className="text-right px-3 py-2 text-muted-foreground font-semibold">
                  Cantidad
                </th>
                <th className="text-left px-3 py-2 text-muted-foreground font-semibold">
                  Especificación técnica
                </th>
              </tr>
            </thead>
            <tbody>
              {result.materialsList.map(([desc, qty, spec], i) => (
                <tr
                  key={desc}
                  data-ocid={`report.materials.item.${i + 1}`}
                  className="border-b border-border last:border-0 even:bg-secondary/20"
                >
                  <td className="px-3 py-1.5 text-foreground">{desc}</td>
                  <td className="px-3 py-1.5 text-right font-bold">
                    {Number(qty)}
                  </td>
                  <td className="px-3 py-1.5 text-muted-foreground">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── SECTION 6: COMPENSACIÓN FP ────────────── */}
        <SectionHeading>Compensación de Factor de Potencia</SectionHeading>
        {fpComp.needed ? (
          <div
            data-ocid="report.fp_compensation.warning"
            className="compliance-warning"
          >
            <p className="text-xs font-bold text-destructive mb-2">
              ⚠ Se requiere compensación de factor de potencia
            </p>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-muted-foreground">
              <span>Potencia reactiva necesaria:</span>
              <span className="font-semibold text-foreground">
                {fpComp.reactiveKVAR.toFixed(2)} kVAR
              </span>
              <span>Banco de capacitores sugerido:</span>
              <span className="font-semibold text-foreground">
                {fpComp.suggestedBankKVAR.toFixed(2)} kVAR
              </span>
              <span>Capacitor:</span>
              <span className="font-semibold text-foreground">
                {fpComp.capacitorMicroFarads.toFixed(2)} µF
              </span>
            </div>
          </div>
        ) : (
          <div
            data-ocid="report.fp_compensation.success"
            className="compliance-success"
          >
            <p
              className="text-xs font-bold"
              style={{ color: "oklch(0.6 0.16 150)" }}
            >
              ✓ Factor de potencia adecuado — No se requiere compensación
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              No se requiere compensación adicional.
            </p>
          </div>
        )}

        {/* ── SECTION 7: TRANSFORMADOR ──────────────── */}
        {transformer && (
          <>
            <SectionHeading>Transformador</SectionHeading>
            <div className="border border-border rounded-sm bg-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  <DataRow
                    label="Potencia requerida"
                    value={`${transformer.requiredKVA.toFixed(2)} kVA`}
                  />
                  <DataRow
                    label="Potencia nominal seleccionada"
                    value={`${transformer.selectedKVA} kVA`}
                  />
                  <DataRow
                    label="Corriente primaria"
                    value={`${transformer.primaryCurrentA.toFixed(2)} A`}
                  />
                  <DataRow
                    label="Corriente secundaria"
                    value={`${transformer.secondaryCurrentA.toFixed(2)} A`}
                  />
                  {transformer.isExistingAdequate !== undefined && (
                    <DataRow
                      label="Adecuación"
                      value={
                        transformer.isExistingAdequate
                          ? "✓ Soporta la demanda"
                          : "✗ Insuficiente — revisar"
                      }
                    />
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── SECTION 8: CONSUMO ESTIMADO ───────────── */}
        <SectionHeading>Consumo Energético Estimado</SectionHeading>
        <div className="border border-border rounded-sm bg-card overflow-hidden">
          <table className="w-full">
            <tbody>
              <DataRow
                label="Horas de uso diario estimadas"
                value={`${energy.dailyUsageHours} h/día`}
              />
              <DataRow
                label="Consumo diario"
                value={`${energy.dailyKWh.toFixed(2)} kWh/día`}
              />
              <DataRow
                label="Consumo mensual estimado"
                value={`${energy.monthlyKWh.toFixed(2)} kWh/mes`}
              />
              <DataRow
                label="Costo mensual estimado"
                value={`Bs. ${energy.estimatedMonthlyCostBs.toFixed(2)}`}
              />
            </tbody>
          </table>
        </div>

        {/* ── SECTION 9: ADVERTENCIAS NORMATIVAS ────── */}
        <SectionHeading>Advertencias Normativas</SectionHeading>
        {result.globalWarnings.length === 0 ? (
          <div
            data-ocid="report.warnings.success"
            className="compliance-success"
          >
            <p
              className="text-xs font-bold"
              style={{ color: "oklch(0.6 0.16 150)" }}
            >
              ✓ La instalación cumple todos los requisitos de la NB 777
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              No se detectaron incumplimientos en la verificación automática.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2" data-ocid="report.warnings.list">
            {result.globalWarnings.map((w) => (
              <div
                key={w}
                data-ocid="report.warning.item"
                className="compliance-warning"
              >
                <p className="text-xs font-semibold text-destructive">⚠ {w}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── ACTIONS ───────────────────────────────── */}
        <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-8 pt-4 border-t border-border">
          <Button
            variant="default"
            size="sm"
            onClick={handleCopyReport}
            data-ocid="report.copy_button"
            className="flex-1 sm:flex-none gap-2"
          >
            {copied ? (
              <CheckCheck className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "¡Copiado!" : "Copiar informe como texto"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            data-ocid="report.print_button"
            className="flex-1 sm:flex-none gap-2"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </Button>
        </div>

        {/* ── NAVIGATION ────────────────────────────── */}
        <div className="no-print flex items-center justify-between mt-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            data-ocid="report.back_to_results_button"
            className="gap-1.5 text-xs"
            onClick={() =>
              navigate({ to: `/proyecto/${projectId}/resultados` })
            }
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Ver Resultados
          </Button>
          <Button
            variant="ghost"
            size="sm"
            data-ocid="report.back_to_home_button"
            className="gap-1.5 text-xs"
            onClick={() => navigate({ to: "/" })}
          >
            <Home className="w-3.5 h-3.5" />
            Inicio
          </Button>
        </div>
      </div>
    </Layout>
  );
}

// ─────────────────────────────────────────────
// ASCII diagram fallback
// ─────────────────────────────────────────────

const defaultAsciiDiagram = `
  ┌─────────────────────────────────────────┐
  │        DIAGRAMA UNIFILAR                │
  │        NB 777 · Bolivia                 │
  └─────────────────────────────────────────┘
           │
      [Transformador]
       ___/___
      /       \\
     │  kVA    │
      \\_______/
           │
      ─────┼─────
      │         │
    [ITM]     [Med.]
    Principal
      │
  ════╪══════════════════
      │         │        │
    [C1]      [C2]     [Cn]
    Ilum.    Tomas    Fuerza
    10A      15A       XX A
`;
