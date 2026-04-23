import { a as useParams, r as reactExports, u as useNavigate, j as jsxRuntimeExports } from "./index-DlHngFV9.js";
import { c as createLucideIcon, g as useGetProject, L as Layout, B as Button } from "./useProjects-D9WOPPD3.js";
import { C as ComplianceBadge } from "./ComplianceBadge-C2AFKqUS.js";
import { I as INSTALLATION_TYPE_LABELS, V as VOLTAGE_SYSTEM_LABELS, C as CONDUCTOR_MATERIAL_LABELS, a as CONDUCTOR_INSULATION_LABELS, b as CIRCUIT_TYPE_LABELS } from "./electrical-CKUfwKux.js";
import { H as House } from "./house-W4H4lv9y.js";
import "./circle-check-Dq2fdYZ5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
function SectionHeading({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold font-display text-foreground tracking-wider uppercase", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-1 border-border" })
  ] });
}
function DataRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-4 text-[11px] text-muted-foreground font-mono w-1/2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-[11px] font-semibold text-foreground font-mono", children: value })
  ] });
}
function generateTextReport(projectName, date, circuits) {
  const lines = [
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
      (c, i) => `${String(i + 1).padEnd(3)} ${c.description.substring(0, 19).padEnd(20)} ${(CIRCUIT_TYPE_LABELS[c.circuitType] ?? String(c.circuitType)).padEnd(14)} ${String(c.totalPowerVA.toFixed(0)).padStart(7)} ${String(c.nominalCurrentA.toFixed(2)).padStart(9)} ${String(c.cableSectionMm2).padStart(9)} ${String(Number(c.itmAmperes)).padStart(7)} ${String(c.voltageDropPct.toFixed(2)).padStart(6)} ${(c.compliesNB777 ? "✓ Cumple" : "✗ No cumple").padStart(10)}`
    ),
    "",
    "Generado por ElectroCalc NB 777 · caffeine.ai"
  ];
  return lines.join("\n");
}
function ReportPage() {
  const { projectId } = useParams({ strict: false });
  const { data: project, isLoading } = useGetProject(projectId);
  const [copied, setCopied] = reactExports.useState(false);
  const navigate = useNavigate();
  const result = project == null ? void 0 : project.result;
  const input = project == null ? void 0 : project.input;
  const reportDate = (/* @__PURE__ */ new Date()).toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  async function handleCopyReport() {
    if (!project || !result) return;
    const text = generateTextReport(project.name, reportDate, result.circuits);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Layout,
      {
        showBack: true,
        backLabel: "Resultados",
        backTo: `/proyecto/${projectId}/resultados`,
        headerSubtitle: "Informe técnico",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "report.loading_state",
            className: "flex flex-col gap-3 mt-8 animate-pulse",
            children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded-sm" }, n))
          }
        )
      }
    );
  }
  if (!result || !input) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Layout,
      {
        showBack: true,
        backLabel: "Resultados",
        backTo: `/proyecto/${projectId}/resultados`,
        headerSubtitle: "Informe técnico",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "report.empty_state",
            className: "flex flex-col items-center gap-4 mt-12 text-center px-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "📋" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No hay resultados disponibles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ejecuta el cálculo primero para generar el informe técnico." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "report.back_to_results_button",
                  onClick: () => navigate({ to: `/proyecto/${projectId}/resultados` }),
                  children: "Ver resultados"
                }
              )
            ]
          }
        )
      }
    );
  }
  const fpComp = result.powerFactorCompensation;
  const transformer = result.transformer;
  const energy = result.energyEstimate;
  const totalLuminaires = input.luminaires.reduce(
    (s, l) => s + Number(l.quantity),
    0
  );
  const totalCommonOutlets = input.commonOutlets.reduce(
    (s, o) => s + Number(o.quantity),
    0
  );
  const totalPowerEquipment = input.powerOutlets.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      showBack: true,
      backLabel: "Resultados",
      backTo: `/proyecto/${projectId}/resultados`,
      headerSubtitle: "Informe técnico",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-break { page-break-before: always; }
        }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-0 max-w-3xl mx-auto w-full pb-10",
            "data-ocid": "report.page",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 mb-1 border border-border rounded-sm bg-card p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-1", children: "Informe Técnico de Instalación Eléctrica" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground leading-tight", children: project.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground mt-0.5", children: "Norma: NB 777 — Instalaciones Eléctricas de Baja Tensión" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: reportDate }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono mt-0.5", children: INSTALLATION_TYPE_LABELS[input.installationType] ?? String(input.installationType) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-3 italic", children: "💡 Use Ctrl+P o el botón de compartir del navegador para imprimir este informe" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Datos de Entrada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-sm bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Tipo de instalación",
                    value: INSTALLATION_TYPE_LABELS[input.installationType] ?? String(input.installationType)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DataRow, { label: "Área total", value: `${input.totalAreaM2} m²` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Número de pisos",
                    value: String(Number(input.floors))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Sistema de voltaje",
                    value: VOLTAGE_SYSTEM_LABELS[input.voltageSystem] ?? String(input.voltageSystem)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Factor de potencia inicial",
                    value: `cos φ = ${input.initialPowerFactor.toFixed(2)}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Temperatura ambiente",
                    value: `${input.ambientTempC} °C`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Material conductor",
                    value: CONDUCTOR_MATERIAL_LABELS[input.conductorType.material] ?? String(input.conductorType.material)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Aislamiento",
                    value: CONDUCTOR_INSULATION_LABELS[input.conductorType.insulation] ?? String(input.conductorType.insulation)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Distancia al transformador",
                    value: `${input.distanceToTransformerM} m`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Nº luminarias total",
                    value: String(totalLuminaires)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Nº tomas comunes total",
                    value: String(totalCommonOutlets)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Nº equipos de fuerza",
                    value: String(totalPowerEquipment)
                  }
                )
              ] }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Tabla de Circuitos Derivados" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "overflow-x-auto border border-border rounded-sm",
                  "data-ocid": "report.circuits.table",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[680px] text-[11px] font-mono", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-secondary/60 border-b border-border", children: [
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
                      "Estado"
                    ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "th",
                      {
                        className: "text-left px-2 py-2 text-muted-foreground font-semibold whitespace-nowrap",
                        children: h
                      },
                      h
                    )) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: result.circuits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        colSpan: 11,
                        className: "text-center py-4 text-muted-foreground text-xs",
                        children: "Sin circuitos calculados"
                      }
                    ) }) : result.circuits.map((circuit, i) => {
                      const overLimit = circuit.voltageDropPct > 3;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          "data-ocid": `report.circuit.item.${i + 1}`,
                          className: "border-b border-border last:border-0 even:bg-secondary/20",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-muted-foreground", children: i + 1 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-foreground max-w-[140px] truncate", children: circuit.description }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: CIRCUIT_TYPE_LABELS[circuit.circuitType] ?? String(circuit.circuitType) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: Number(circuit.points) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: circuit.totalPowerVA.toFixed(0) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: circuit.nominalCurrentA.toFixed(2) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: circuit.correctedCurrentA.toFixed(2) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: circuit.cableSectionMm2 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: Number(circuit.itmAmperes) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                className: "px-2 py-1.5 text-right font-bold",
                                style: {
                                  color: overLimit ? "oklch(0.55 0.22 25)" : "oklch(0.6 0.16 150)"
                                },
                                children: circuit.voltageDropPct.toFixed(2)
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ComplianceBadge,
                              {
                                complies: circuit.compliesNB777,
                                size: "sm",
                                label: circuit.compliesNB777 ? "OK" : "Revisar"
                              }
                            ) })
                          ]
                        },
                        circuit.id
                      );
                    }) })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Diagrama Unifilar Simplificado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-2 italic", children: "Diagrama esquemático — no a escala" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border border-border rounded-sm overflow-hidden",
                  style: { background: "oklch(0.10 0.015 240)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "px-3 py-1.5 border-b border-border flex items-center gap-2",
                        style: { background: "oklch(0.13 0.018 240)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "DIAGRAMA UNIFILAR · NB 777" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "pre",
                      {
                        "data-ocid": "report.ascii_diagram",
                        className: "p-4 text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono",
                        style: { color: "oklch(0.75 0.12 240)" },
                        children: result.asciiSingleLineDiagram || defaultAsciiDiagram
                      }
                    )
                  ]
                }
              ),
              result.asciiFloorPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold font-display text-foreground mt-4 mb-1 uppercase tracking-wider", children: "Distribución por Planta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "border border-border rounded-sm overflow-hidden",
                    style: { background: "oklch(0.10 0.015 240)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "pre",
                      {
                        "data-ocid": "report.floor_plan",
                        className: "p-4 text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono",
                        style: { color: "oklch(0.68 0.10 150)" },
                        children: result.asciiFloorPlan
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Lista de Materiales" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border border-border rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-[11px] font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-secondary/60 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 text-muted-foreground font-semibold", children: "Descripción" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 text-muted-foreground font-semibold", children: "Cantidad" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 text-muted-foreground font-semibold", children: "Especificación técnica" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: result.materialsList.map(([desc, qty, spec], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `report.materials.item.${i + 1}`,
                    className: "border-b border-border last:border-0 even:bg-secondary/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 text-foreground", children: desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 text-right font-bold", children: Number(qty) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 text-muted-foreground", children: spec })
                    ]
                  },
                  desc
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Compensación de Factor de Potencia" }),
              fpComp.needed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "report.fp_compensation.warning",
                  className: "compliance-warning",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-destructive mb-2", children: "⚠ Se requiere compensación de factor de potencia" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1 text-[11px] font-mono text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Potencia reactiva necesaria:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                        fpComp.reactiveKVAR.toFixed(2),
                        " kVAR"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Banco de capacitores sugerido:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                        fpComp.suggestedBankKVAR.toFixed(2),
                        " kVAR"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Capacitor:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                        fpComp.capacitorMicroFarads.toFixed(2),
                        " µF"
                      ] })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "report.fp_compensation.success",
                  className: "compliance-success",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold",
                        style: { color: "oklch(0.6 0.16 150)" },
                        children: "✓ Factor de potencia adecuado — No se requiere compensación"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "No se requiere compensación adicional." })
                  ]
                }
              ),
              transformer && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Transformador" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-sm bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataRow,
                    {
                      label: "Potencia requerida",
                      value: `${transformer.requiredKVA.toFixed(2)} kVA`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataRow,
                    {
                      label: "Potencia nominal seleccionada",
                      value: `${transformer.selectedKVA} kVA`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataRow,
                    {
                      label: "Corriente primaria",
                      value: `${transformer.primaryCurrentA.toFixed(2)} A`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataRow,
                    {
                      label: "Corriente secundaria",
                      value: `${transformer.secondaryCurrentA.toFixed(2)} A`
                    }
                  ),
                  transformer.isExistingAdequate !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DataRow,
                    {
                      label: "Adecuación",
                      value: transformer.isExistingAdequate ? "✓ Soporta la demanda" : "✗ Insuficiente — revisar"
                    }
                  )
                ] }) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Consumo Energético Estimado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-sm bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Horas de uso diario estimadas",
                    value: `${energy.dailyUsageHours} h/día`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Consumo diario",
                    value: `${energy.dailyKWh.toFixed(2)} kWh/día`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Consumo mensual estimado",
                    value: `${energy.monthlyKWh.toFixed(2)} kWh/mes`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DataRow,
                  {
                    label: "Costo mensual estimado",
                    value: `Bs. ${energy.estimatedMonthlyCostBs.toFixed(2)}`
                  }
                )
              ] }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Advertencias Normativas" }),
              result.globalWarnings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "report.warnings.success",
                  className: "compliance-success",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold",
                        style: { color: "oklch(0.6 0.16 150)" },
                        children: "✓ La instalación cumple todos los requisitos de la NB 777"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "No se detectaron incumplimientos en la verificación automática." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "report.warnings.list", children: result.globalWarnings.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "report.warning.item",
                  className: "compliance-warning",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-destructive", children: [
                    "⚠ ",
                    w
                  ] })
                },
                w
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-print flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-8 pt-4 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "default",
                    size: "sm",
                    onClick: handleCopyReport,
                    "data-ocid": "report.copy_button",
                    className: "flex-1 sm:flex-none gap-2",
                    children: [
                      copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                      copied ? "¡Copiado!" : "Copiar informe como texto"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => window.print(),
                    "data-ocid": "report.print_button",
                    className: "flex-1 sm:flex-none gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
                      "Imprimir"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-print flex items-center justify-between mt-4 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": "report.back_to_results_button",
                    className: "gap-1.5 text-xs",
                    onClick: () => navigate({ to: `/proyecto/${projectId}/resultados` }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                      "Ver Resultados"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    "data-ocid": "report.back_to_home_button",
                    className: "gap-1.5 text-xs",
                    onClick: () => navigate({ to: "/" }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" }),
                      "Inicio"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
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
export {
  ReportPage as default
};
