import { j as jsxRuntimeExports, r as reactExports, a as useParams, u as useNavigate } from "./index-DlHngFV9.js";
import { B as Badge } from "./badge-CRLOndo5.js";
import { c as createLucideIcon, a as cn, f as createSlot, g as useGetProject, h as useCreateProject, i as useUpdateProjectInput, j as useCalculateProject, L as Layout, B as Button, C as ChevronLeft, Z as Zap } from "./useProjects-D9WOPPD3.js";
import { S as Skeleton, T as TriangleAlert } from "./skeleton-Cpso_Col.js";
import { u as ue, T as Trash2 } from "./index-DlvKRCcF.js";
import { I as INSTALLATION_TYPE_LABELS, V as VOLTAGE_SYSTEM_LABELS, C as CONDUCTOR_MATERIAL_LABELS, a as CONDUCTOR_INSULATION_LABELS } from "./electrical-CKUfwKux.js";
import { C as CircleCheck } from "./circle-check-Dq2fdYZ5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z", key: "goz73y" }
  ],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  ["path", { d: "m18 3-4 4h6l-4 4", key: "16psg9" }]
];
const PlugZap = createLucideIcon("plug-zap", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const DEFAULT_FORM = {
  name: "",
  installationType: "residential",
  totalAreaM2: 0,
  floors: 1,
  voltageSystem: "mono220",
  initialPowerFactor: 0.85,
  distanceToTransformerM: 50,
  ambientTempC: 25,
  conductorType: {
    material: "copper",
    insulation: "pvc"
  },
  transformerMode: "existing",
  existingTransformerKVA: void 0,
  luminaires: [],
  commonOutlets: [],
  powerOutlets: []
};
function toProjectInput(form) {
  return {
    name: form.name,
    installationType: form.installationType,
    totalAreaM2: form.totalAreaM2,
    floors: BigInt(form.floors),
    voltageSystem: form.voltageSystem,
    initialPowerFactor: form.initialPowerFactor,
    distanceToTransformerM: form.distanceToTransformerM,
    ambientTempC: form.ambientTempC,
    conductorType: form.conductorType,
    transformerMode: form.transformerMode,
    existingTransformerKVA: form.existingTransformerKVA,
    luminaires: form.luminaires.map((l) => ({
      typ: l.type,
      quantity: BigInt(l.quantity),
      unitPowerW: l.unitPowerW
    })),
    commonOutlets: form.commonOutlets.map((o) => ({
      quantity: BigInt(o.quantity)
    })),
    powerOutlets: form.powerOutlets
  };
}
function fromProjectInput(input) {
  return {
    name: input.name,
    installationType: input.installationType,
    totalAreaM2: input.totalAreaM2,
    floors: Number(input.floors),
    voltageSystem: input.voltageSystem,
    initialPowerFactor: input.initialPowerFactor,
    distanceToTransformerM: input.distanceToTransformerM,
    ambientTempC: input.ambientTempC,
    conductorType: input.conductorType,
    transformerMode: input.transformerMode,
    existingTransformerKVA: input.existingTransformerKVA,
    luminaires: input.luminaires.map((l) => ({
      type: l.typ,
      quantity: Number(l.quantity),
      unitPowerW: l.unitPowerW
    })),
    commonOutlets: input.commonOutlets.map((o) => ({
      quantity: Number(o.quantity)
    })),
    powerOutlets: input.powerOutlets
  };
}
function getVoltageValue(vs) {
  if (vs === "tri380") return 380;
  return 220;
}
function estimatePower(form) {
  const lumVA = form.luminaires.reduce(
    (s, l) => s + l.quantity * l.unitPowerW,
    0
  );
  const comVA = form.commonOutlets.reduce((s, c) => s + c.quantity * 100, 0);
  const powVA = form.powerOutlets.reduce(
    (s, p) => s + p.powerKW * 1e3 / (p.cosPhi * (p.efficiency / 100)),
    0
  );
  return lumVA + comVA + powVA;
}
function estimateCircuits(form) {
  const lumCircuits = form.luminaires.reduce(
    (s, l) => s + Math.ceil(l.quantity / 15),
    0
  );
  const comCircuits = form.commonOutlets.reduce(
    (s, c) => s + Math.ceil(c.quantity / 10),
    0
  );
  const powCircuits = form.powerOutlets.length;
  return Math.max(lumCircuits + comCircuits + powCircuits, 1);
}
function StepIndicator({ current, total }) {
  const labels = ["Datos Generales", "Conductor", "Cargas", "Resumen"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tech-label", children: [
        "Paso ",
        current,
        " de ",
        total
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: labels[current - 1] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({ length: total }, (_, i) => {
      const stepKey = `step-seg-${i + 1}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-1.5 flex-1 rounded-full transition-smooth ${i + 1 <= current ? "bg-primary" : "bg-secondary"}`
        },
        stepKey
      );
    }) })
  ] });
}
function SectionHeader({
  icon: Icon,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4 pb-3 border-b border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded bg-primary/10 text-primary mt-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold font-display text-foreground leading-tight", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
    ] })
  ] });
}
function NormNote({ text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-secondary/50 border border-border rounded px-3 py-2 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, className: "text-accent shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: text })
  ] });
}
function FormField({
  label,
  hint,
  children,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium text-foreground/80", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
    ] }),
    children,
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: hint })
  ] });
}
function RadioGroup({
  value,
  onChange,
  options,
  name
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": `${name}.${opt.value}`,
      onClick: () => onChange(opt.value),
      className: `px-3 py-1.5 rounded text-xs font-medium border transition-smooth ${value === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/70"}`,
      children: opt.label
    },
    opt.value
  )) });
}
function Step1({
  data,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        icon: Zap,
        title: "Datos Generales del Proyecto",
        description: "Información base de la instalación eléctrica"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Nombre del proyecto", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        "data-ocid": "form.name_input",
        value: data.name,
        onChange: (e) => onChange({ name: e.target.value }),
        placeholder: "Ej: Residencia García – Planta Baja",
        className: "text-sm"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormField, { label: "Tipo de instalación", required: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioGroup,
        {
          name: "form.installation_type",
          value: data.installationType,
          onChange: (v) => {
            onChange({
              installationType: v,
              initialPowerFactor: v === "industrial" ? 0.8 : 0.85,
              transformerMode: v === "industrial" ? "own" : "existing"
            });
          },
          options: [
            {
              value: "residential",
              label: INSTALLATION_TYPE_LABELS.residential
            },
            {
              value: "industrial",
              label: INSTALLATION_TYPE_LABELS.industrial
            }
          ]
        }
      ),
      data.installationType === "industrial" && /* @__PURE__ */ jsxRuntimeExports.jsx(NormNote, { text: "Se aplicará factor de demanda industrial según NB 777 Cap. 4. cosφ ajustado a 0.80 automáticamente." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Área total (m²)", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "form.area_input",
          type: "number",
          min: 1,
          value: data.totalAreaM2 || "",
          onChange: (e) => onChange({ totalAreaM2: Number(e.target.value) }),
          placeholder: "0",
          className: "text-sm"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Número de pisos", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "form.floors_input",
          type: "number",
          min: 1,
          value: data.floors,
          onChange: (e) => onChange({ floors: Number(e.target.value) }),
          className: "text-sm"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormField, { label: "Sistema de voltaje", required: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioGroup,
        {
          name: "form.voltage_system",
          value: data.voltageSystem,
          onChange: (v) => onChange({ voltageSystem: v }),
          options: [
            {
              value: "mono220",
              label: VOLTAGE_SYSTEM_LABELS.mono220
            },
            {
              value: "tri220",
              label: VOLTAGE_SYSTEM_LABELS.tri220
            },
            {
              value: "tri380",
              label: VOLTAGE_SYSTEM_LABELS.tri380
            }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Voltaje típico Bolivia (ENDE/SINEC)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      FormField,
      {
        label: "Factor de potencia (cosφ)",
        hint: "Si se desconoce, usar 0.80 para industrial según NB 777 Art. 4.2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "form.power_factor_input",
              type: "number",
              min: 0.5,
              max: 1,
              step: 0.01,
              value: data.initialPowerFactor,
              onChange: (e) => onChange({ initialPowerFactor: Number(e.target.value) }),
              className: "text-sm font-mono"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "formula-code mt-1", children: [
            "cosφ = ",
            data.initialPowerFactor.toFixed(2),
            " → φ =",
            " ",
            (Math.acos(data.initialPowerFactor) * 180 / Math.PI).toFixed(1),
            "°"
          ] })
        ]
      }
    )
  ] });
}
function Step2({
  data,
  onChange
}) {
  const tempFactor = data.ambientTempC <= 30 ? 1 : data.ambientTempC <= 40 ? 0.91 : data.ambientTempC <= 50 ? 0.82 : 0.71;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        icon: Zap,
        title: "Conductor y Temperatura",
        description: "Parámetros físicos del cableado"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        label: "Distancia transformador → tablero (m)",
        hint: "Afecta la caída de tensión en la acometida principal",
        required: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "form.distance_input",
            type: "number",
            min: 1,
            value: data.distanceToTransformerM,
            onChange: (e) => onChange({ distanceToTransformerM: Number(e.target.value) }),
            className: "text-sm font-mono"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormField, { label: "Material del conductor", required: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioGroup,
        {
          name: "form.conductor_material",
          value: data.conductorType.material,
          onChange: (v) => onChange({
            conductorType: { ...data.conductorType, material: v }
          }),
          options: [
            {
              value: "copper",
              label: CONDUCTOR_MATERIAL_LABELS.copper
            },
            {
              value: "aluminum",
              label: CONDUCTOR_MATERIAL_LABELS.aluminum
            }
          ]
        }
      ),
      data.conductorType.material === "aluminum" && /* @__PURE__ */ jsxRuntimeExports.jsx(NormNote, { text: "El aluminio requiere sección mayor (+30%) respecto al cobre para igual capacidad de corriente. NB 777 Tabla 8." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Tipo de aislamiento", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroup,
      {
        name: "form.conductor_insulation",
        value: data.conductorType.insulation,
        onChange: (v) => onChange({
          conductorType: { ...data.conductorType, insulation: v }
        }),
        options: [
          {
            value: "xlpe",
            label: CONDUCTOR_INSULATION_LABELS.xlpe
          },
          {
            value: "pvc",
            label: CONDUCTOR_INSULATION_LABELS.pvc
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      FormField,
      {
        label: "Temperatura ambiente (°C)",
        hint: "Afecta el factor de corrección Ft según NB 777 Tabla 11",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "form.temp_input",
              type: "number",
              min: 10,
              max: 60,
              value: data.ambientTempC,
              onChange: (e) => onChange({ ambientTempC: Number(e.target.value) }),
              className: "text-sm font-mono"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "formula-code mt-1", children: [
            "Ft = ",
            tempFactor.toFixed(2),
            " (NB 777 Tabla 11 — ",
            data.ambientTempC,
            "°C)"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          icon: Cpu,
          title: "Transformador",
          description: "Configuración del suministro eléctrico"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormField, { label: "Modo del transformador", required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadioGroup,
          {
            name: "form.transformer_mode",
            value: data.transformerMode,
            onChange: (v) => onChange({ transformerMode: v }),
            options: [
              {
                value: "existing",
                label: "Transformador existente"
              },
              {
                value: "own",
                label: "Requiere transformador propio"
              }
            ]
          }
        ),
        data.installationType === "industrial" && /* @__PURE__ */ jsxRuntimeExports.jsx(NormNote, { text: "Instalaciones industriales requieren transformador propio según RTDE Bolivia Art. 3.5." })
      ] }),
      data.transformerMode === "existing" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          label: "Potencia del transformador existente (kVA)",
          hint: "Se verificará si soporta la demanda calculada",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "form.transformer_kva_input",
              type: "number",
              min: 5,
              value: data.existingTransformerKVA ?? "",
              onChange: (e) => onChange({
                existingTransformerKVA: e.target.value ? Number(e.target.value) : void 0
              }),
              placeholder: "Ej: 160",
              className: "text-sm font-mono"
            }
          )
        }
      )
    ] })
  ] });
}
function Step3({
  data,
  onChange
}) {
  const defaultVoltage = getVoltageValue(data.voltageSystem);
  const addLuminaire = () => onChange({
    luminaires: [
      ...data.luminaires,
      { type: "LED", quantity: 1, unitPowerW: 15 }
    ]
  });
  const updateLuminaire = (i, patch) => {
    const updated = [...data.luminaires];
    updated[i] = { ...updated[i], ...patch };
    onChange({ luminaires: updated });
  };
  const removeLuminaire = (i) => onChange({ luminaires: data.luminaires.filter((_, idx) => idx !== i) });
  const addOutlet = () => onChange({ commonOutlets: [...data.commonOutlets, { quantity: 1 }] });
  const updateOutlet = (i, patch) => {
    const updated = [...data.commonOutlets];
    updated[i] = { ...updated[i], ...patch };
    onChange({ commonOutlets: updated });
  };
  const removeOutlet = (i) => onChange({
    commonOutlets: data.commonOutlets.filter((_, idx) => idx !== i)
  });
  const addPowerOutlet = () => onChange({
    powerOutlets: [
      ...data.powerOutlets,
      {
        name: "Motor",
        powerKW: 1,
        voltage: defaultVoltage,
        cosPhi: 0.85,
        efficiency: 88,
        isWetArea: false
      }
    ]
  });
  const updatePowerOutlet = (i, patch) => {
    const updated = [...data.powerOutlets];
    updated[i] = { ...updated[i], ...patch };
    onChange({ powerOutlets: updated });
  };
  const removePowerOutlet = (i) => onChange({
    powerOutlets: data.powerOutlets.filter((_, idx) => idx !== i)
  });
  const totalLumVA = data.luminaires.reduce(
    (s, l) => s + l.quantity * l.unitPowerW,
    0
  );
  const totalComVA = data.commonOutlets.reduce(
    (s, c) => s + c.quantity * 100,
    0
  );
  const totalPowVA = data.powerOutlets.reduce(
    (s, p) => s + p.powerKW * 1e3 / (p.cosPhi * (p.efficiency / 100)),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          icon: Lightbulb,
          title: "A. Luminarias",
          description: "Puntos de iluminación por zona"
        }
      ),
      data.luminaires.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "luminaires.empty_state",
          className: "text-center py-5 bg-secondary/30 rounded border border-dashed border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Lightbulb,
              {
                size: 20,
                className: "mx-auto text-muted-foreground mb-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sin luminarias. Agrega una." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-3", children: data.luminaires.map((lum, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `luminaires.item.${i + 1}`,
          className: "bg-card border border-border rounded p-3 flex flex-col gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] font-mono", children: [
                "LUM-",
                String(i + 1).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Eliminar luminaria",
                  "data-ocid": `luminaires.delete_button.${i + 1}`,
                  onClick: () => removeLuminaire(i),
                  className: "text-muted-foreground hover:text-destructive transition-smooth",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Tipo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `luminaires.type_input.${i + 1}`,
                    value: lum.type,
                    onChange: (e) => updateLuminaire(i, { type: e.target.value }),
                    placeholder: "LED",
                    className: "text-xs h-7 mt-0.5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Cantidad" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `luminaires.qty_input.${i + 1}`,
                    type: "number",
                    min: 1,
                    value: lum.quantity,
                    onChange: (e) => updateLuminaire(i, {
                      quantity: Number(e.target.value)
                    }),
                    className: "text-xs h-7 mt-0.5 font-mono"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Potencia unitaria (W)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `luminaires.power_input.${i + 1}`,
                    type: "number",
                    min: 1,
                    value: lum.unitPowerW,
                    onChange: (e) => updateLuminaire(i, {
                      unitPowerW: Number(e.target.value)
                    }),
                    className: "text-xs h-7 mt-0.5 font-mono"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "formula-code text-[10px]", children: [
              "VA = ",
              lum.quantity,
              " × ",
              lum.unitPowerW,
              " W =",
              " ",
              (lum.quantity * lum.unitPowerW).toFixed(0),
              " VA"
            ] })
          ]
        },
        `lum-${i + 1}-${lum.type}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            "data-ocid": "luminaires.add_button",
            onClick: addLuminaire,
            className: "text-xs gap-1 h-7",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
              " Agregar Luminaria"
            ]
          }
        ),
        totalLumVA > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
          "Total: ",
          totalLumVA.toFixed(0),
          " VA"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NormNote, { text: "Máx. 15 puntos por circuito, 10 A (NB 777 Art. 7.3)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          icon: PlugZap,
          title: "B. Tomas Comunes",
          description: "100 VA por toma según NB 777"
        }
      ),
      data.commonOutlets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "outlets.empty_state",
          className: "text-center py-5 bg-secondary/30 rounded border border-dashed border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { size: 20, className: "mx-auto text-muted-foreground mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sin tomas comunes. Agrega un grupo." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-3", children: data.commonOutlets.map((outlet, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `outlets.item.${i + 1}`,
          className: "bg-card border border-border rounded p-3 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] font-mono shrink-0",
                children: [
                  "GRP-",
                  String(i + 1).padStart(2, "0")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Cantidad de tomas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": `outlets.qty_input.${i + 1}`,
                  type: "number",
                  min: 1,
                  value: outlet.quantity,
                  onChange: (e) => updateOutlet(i, { quantity: Number(e.target.value) }),
                  className: "text-xs h-7 mt-0.5 font-mono"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono", children: [
                (outlet.quantity * 100).toFixed(0),
                " VA"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground/60", children: "100 VA c/u" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Eliminar toma",
                "data-ocid": `outlets.delete_button.${i + 1}`,
                onClick: () => removeOutlet(i),
                className: "text-muted-foreground hover:text-destructive transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
              }
            )
          ]
        },
        `outlet-${i + 1}-${outlet.quantity}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            "data-ocid": "outlets.add_button",
            onClick: addOutlet,
            className: "text-xs gap-1 h-7",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
              " Agregar grupo de tomas"
            ]
          }
        ),
        totalComVA > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
          "Total: ",
          totalComVA.toFixed(0),
          " VA"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NormNote, { text: "Máx. 10 tomas por circuito, 15 A (NB 777 Art. 7.4)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          icon: Cpu,
          title: "C. Tomas de Fuerza / Motores",
          description: "Equipos especiales y motores eléctricos"
        }
      ),
      data.powerOutlets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "power_outlets.empty_state",
          className: "text-center py-5 bg-secondary/30 rounded border border-dashed border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { size: 20, className: "mx-auto text-muted-foreground mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sin equipos de fuerza. Agrega uno." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-3", children: data.powerOutlets.map((po, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `power_outlets.item.${i + 1}`,
          className: "bg-card border border-border rounded p-3 flex flex-col gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] font-mono", children: [
                "EQP-",
                String(i + 1).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                po.isWetArea && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "destructive",
                    className: "text-[9px] px-1.5 py-0",
                    children: "Área húmeda"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Eliminar equipo",
                    "data-ocid": `power_outlets.delete_button.${i + 1}`,
                    onClick: () => removePowerOutlet(i),
                    className: "text-muted-foreground hover:text-destructive transition-smooth",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Nombre del equipo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": `power_outlets.name_input.${i + 1}`,
                  value: po.name,
                  onChange: (e) => updatePowerOutlet(i, { name: e.target.value }),
                  placeholder: "Motor bomba",
                  className: "text-xs h-7 mt-0.5"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Potencia (kW)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `power_outlets.kw_input.${i + 1}`,
                    type: "number",
                    min: 0.1,
                    step: 0.1,
                    value: po.powerKW,
                    onChange: (e) => updatePowerOutlet(i, {
                      powerKW: Number(e.target.value)
                    }),
                    className: "text-xs h-7 mt-0.5 font-mono"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Voltaje (V)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `power_outlets.voltage_input.${i + 1}`,
                    type: "number",
                    value: po.voltage,
                    onChange: (e) => updatePowerOutlet(i, {
                      voltage: Number(e.target.value)
                    }),
                    className: "text-xs h-7 mt-0.5 font-mono"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "cosφ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `power_outlets.cosphi_input.${i + 1}`,
                    type: "number",
                    min: 0.5,
                    max: 1,
                    step: 0.01,
                    value: po.cosPhi,
                    onChange: (e) => updatePowerOutlet(i, {
                      cosPhi: Number(e.target.value)
                    }),
                    className: "text-xs h-7 mt-0.5 font-mono"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Rendimiento (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": `power_outlets.efficiency_input.${i + 1}`,
                    type: "number",
                    min: 50,
                    max: 100,
                    value: po.efficiency,
                    onChange: (e) => updatePowerOutlet(i, {
                      efficiency: Number(e.target.value)
                    }),
                    className: "text-xs h-7 mt-0.5 font-mono"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `power_outlets.wet_area_toggle.${i + 1}`,
                  onClick: () => updatePowerOutlet(i, { isWetArea: !po.isWetArea }),
                  className: `w-8 h-4 rounded-full relative transition-smooth shrink-0 ${po.isWetArea ? "bg-destructive" : "bg-secondary"}`,
                  "aria-label": "Área húmeda",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 w-3 h-3 rounded-full bg-foreground/80 transition-smooth ${po.isWetArea ? "left-[18px]" : "left-0.5"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Área húmeda" }),
              po.isWetArea && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-destructive font-medium", children: "→ Diferencial 30 mA obligatorio" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "formula-code text-[10px] leading-relaxed", children: [
              "I = P / (V·cosφ·η) = ",
              (po.powerKW * 1e3).toFixed(0),
              " / (",
              po.voltage,
              "·",
              po.cosPhi,
              "·",
              (po.efficiency / 100).toFixed(2),
              ") =",
              " ",
              (po.powerKW * 1e3 / (po.voltage * po.cosPhi * (po.efficiency / 100))).toFixed(2),
              " ",
              "A"
            ] })
          ]
        },
        `po-${i + 1}-${po.name}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            "data-ocid": "power_outlets.add_button",
            onClick: addPowerOutlet,
            className: "text-xs gap-1 h-7",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
              " Agregar equipo"
            ]
          }
        ),
        totalPowVA > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
          "Total: ",
          totalPowVA.toFixed(0),
          " VA"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NormNote, { text: "Circuito exclusivo por equipo (NB 777 Art. 7.5). Diferencial 30 mA en áreas húmedas." })
    ] })
  ] });
}
function Step4({
  data,
  onCalculate,
  isCalculating
}) {
  const totalVA = estimatePower(data);
  const circuits = estimateCircuits(data);
  const voltage = getVoltageValue(data.voltageSystem);
  const isTri = data.voltageSystem.startsWith("tri");
  const currentA = isTri ? totalVA / (Math.sqrt(3) * voltage * data.initialPowerFactor) : totalVA / (voltage * data.initialPowerFactor);
  const SummaryRow = ({
    label,
    value
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-border/50 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-medium text-foreground", children: value })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        icon: CircleCheck,
        title: "Resumen del Proyecto",
        description: "Verifica los datos antes de calcular"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-2", children: "Datos Generales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Nombre", value: data.name || "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Tipo",
          value: data.installationType === "residential" ? "Residencial" : "Industrial"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Área / Pisos",
          value: `${data.totalAreaM2} m² / ${data.floors} piso(s)`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Sistema",
          value: VOLTAGE_SYSTEM_LABELS[data.voltageSystem] ?? String(data.voltageSystem)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "cosφ", value: data.initialPowerFactor.toFixed(2) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-2", children: "Conductor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Material",
          value: CONDUCTOR_MATERIAL_LABELS[data.conductorType.material] ?? String(data.conductorType.material)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Aislamiento",
          value: CONDUCTOR_INSULATION_LABELS[data.conductorType.insulation] ?? String(data.conductorType.insulation)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Distancia",
          value: `${data.distanceToTransformerM} m`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Temperatura", value: `${data.ambientTempC}°C` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Transformador",
          value: data.transformerMode === "existing" ? `Existente${data.existingTransformerKVA ? ` ${data.existingTransformerKVA} kVA` : ""}` : "Propio"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-2", children: "Cargas Eléctricas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Luminarias (grupos)",
          value: `${data.luminaires.length} grupo(s)`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Tomas comunes",
          value: `${data.commonOutlets.reduce((s, c) => s + c.quantity, 0)} tomas`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryRow,
        {
          label: "Equipos de fuerza",
          value: `${data.powerOutlets.length} equipo(s)`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label text-primary/70 mb-3", children: "Estimación Previa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Potencia instalada" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold font-mono text-foreground", children: [
            (totalVA / 1e3).toFixed(2),
            " kVA"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Circuitos estimados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold font-mono text-foreground", children: circuits })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Corriente nominal (pre-cálculo)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold font-mono text-foreground", children: [
            currentA.toFixed(2),
            " A"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "formula-code mt-3 text-[10px] leading-relaxed", children: [
        isTri ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "I = P / (√3·V·cosφ) = ",
          totalVA.toFixed(0),
          " / (1.732·",
          voltage,
          "·",
          data.initialPowerFactor.toFixed(2),
          ") = ",
          currentA.toFixed(2),
          " A"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "I = P / (V·cosφ) = ",
          totalVA.toFixed(0),
          " / (",
          voltage,
          "·",
          data.initialPowerFactor.toFixed(2),
          ") = ",
          currentA.toFixed(2),
          " A"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "NB 777 Art. 4.1 — Cálculo de corriente nominal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        "data-ocid": "form.calculate_button",
        onClick: onCalculate,
        disabled: isCalculating || !data.name.trim() || totalVA === 0,
        className: "w-full h-12 text-sm font-semibold gap-2",
        children: isCalculating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
          "Calculando según NB 777…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { size: 16 }),
          "Calcular según NB 777"
        ] })
      }
    ),
    !data.name.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        "data-ocid": "form.name_error",
        className: "text-xs text-destructive text-center",
        children: "El nombre del proyecto es obligatorio"
      }
    ),
    totalVA === 0 && data.name.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        "data-ocid": "form.loads_error",
        className: "text-xs text-destructive text-center",
        children: "Agrega al menos una carga eléctrica en el Paso 3"
      }
    )
  ] });
}
function validateStep(step, data) {
  if (step === 1) {
    if (!data.name.trim()) return "El nombre del proyecto es obligatorio";
    if (data.totalAreaM2 <= 0) return "El área total debe ser mayor a 0";
    if (data.floors < 1) return "El número de pisos debe ser al menos 1";
  }
  if (step === 2) {
    if (data.distanceToTransformerM <= 0)
      return "La distancia al transformador debe ser mayor a 0";
  }
  return null;
}
function FormPage() {
  const { projectId } = useParams({ strict: false });
  const navigate = useNavigate();
  const isNew = !projectId || projectId === "nuevo";
  const [step, setStep] = reactExports.useState(1);
  const [formData, setFormData] = reactExports.useState(DEFAULT_FORM);
  const [savedProjectId, setSavedProjectId] = reactExports.useState(
    isNew ? void 0 : projectId
  );
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const { data: existingProject, isLoading: loadingProject } = useGetProject(
    isNew ? void 0 : projectId
  );
  const createProject = useCreateProject();
  const updateProject = useUpdateProjectInput();
  const calculateProject = useCalculateProject();
  reactExports.useEffect(() => {
    if (existingProject) {
      setFormData(fromProjectInput(existingProject.input));
      setSavedProjectId(existingProject.id);
    }
  }, [existingProject]);
  const handleChange = (patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const input = toProjectInput(formData);
      if (savedProjectId) {
        await updateProject.mutateAsync({
          id: savedProjectId,
          input
        });
        ue.success("Borrador guardado");
      } else {
        const createdId = await createProject.mutateAsync(input);
        setSavedProjectId(createdId);
        ue.success("Proyecto guardado");
      }
    } catch {
      ue.error("Error al guardar. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleNext = () => {
    const err = validateStep(step, formData);
    if (err) {
      ue.error(err);
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleCalculate = async () => {
    try {
      const input = toProjectInput(formData);
      let pid = savedProjectId;
      if (!pid) {
        pid = await createProject.mutateAsync(input);
        setSavedProjectId(pid);
      } else {
        await updateProject.mutateAsync({ id: pid, input });
      }
      await calculateProject.mutateAsync(pid);
      navigate({
        to: "/proyecto/$projectId/resultados",
        params: { projectId: pid }
      });
    } catch {
      ue.error("Error en el cálculo. Revisa los datos ingresados.");
    }
  };
  const isCalculating = calculateProject.isPending || createProject.isPending || updateProject.isPending;
  if (loadingProject) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Layout,
      {
        showBack: true,
        backLabel: "Proyectos",
        backTo: "/",
        headerSubtitle: "Cargando…",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Layout,
    {
      showBack: true,
      backLabel: "Proyectos",
      backTo: "/",
      headerSubtitle: isNew ? "Nuevo proyecto" : "Editar proyecto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pb-24", children: [
        !isNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "form.edit_banner",
            className: "flex items-center gap-2 bg-accent/10 border border-accent/30 rounded px-3 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, className: "text-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/80", children: [
                "Actualizando proyecto existente:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formData.name || projectId })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step, total: 4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `form.step_${step}`, children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step1, { data: formData, onChange: handleChange }),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step2, { data: formData, onChange: handleChange }),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step3, { data: formData, onChange: handleChange }),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step4,
            {
              data: formData,
              onCalculate: handleCalculate,
              isCalculating
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between gap-2 z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "data-ocid": "form.prev_button",
              onClick: handlePrev,
              disabled: step === 1,
              className: "gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 14 }),
                " Anterior"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              "data-ocid": "form.save_draft_button",
              onClick: handleSaveDraft,
              disabled: isSaving || !formData.name.trim(),
              className: "gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 12 }),
                isSaving ? "Guardando…" : "Guardar borrador"
              ]
            }
          ),
          step < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              "data-ocid": "form.next_button",
              onClick: handleNext,
              className: "gap-1 text-xs",
              children: [
                "Siguiente ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20" })
        ] })
      ] })
    }
  );
}
export {
  FormPage as default
};
