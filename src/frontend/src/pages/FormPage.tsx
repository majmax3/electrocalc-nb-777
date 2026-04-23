import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Lightbulb,
  PlugZap,
  Plus,
  Save,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  ConductorInsulation,
  ConductorMaterial,
  InstallationType,
  LuminaireLoad,
  PowerOutletLoad,
  ProjectInput,
  TransformerMode,
  VoltageSystem,
} from "../backend.d.ts";
import { Layout } from "../components/layout/Layout";
import {
  useCalculateProject,
  useCreateProject,
  useGetProject,
  useUpdateProjectInput,
} from "../hooks/useProjects";
import {
  CONDUCTOR_INSULATION_LABELS,
  CONDUCTOR_MATERIAL_LABELS,
  INSTALLATION_TYPE_LABELS,
  VOLTAGE_SYSTEM_LABELS,
} from "../types/electrical";

// ─────────────────────────────────────────────
// Local form state mirrors backend ProjectInput
// but uses number for UI-friendly fields
// ─────────────────────────────────────────────

interface FormState {
  name: string;
  installationType: InstallationType;
  totalAreaM2: number;
  floors: number;
  voltageSystem: VoltageSystem;
  initialPowerFactor: number;
  distanceToTransformerM: number;
  ambientTempC: number;
  conductorType: {
    material: ConductorMaterial;
    insulation: ConductorInsulation;
  };
  transformerMode: TransformerMode;
  existingTransformerKVA?: number;
  luminaires: Array<{ type: string; quantity: number; unitPowerW: number }>;
  commonOutlets: Array<{ quantity: number }>;
  powerOutlets: PowerOutletLoad[];
}

const DEFAULT_FORM: FormState = {
  name: "",
  installationType: "residential" as InstallationType,
  totalAreaM2: 0,
  floors: 1,
  voltageSystem: "mono220" as VoltageSystem,
  initialPowerFactor: 0.85,
  distanceToTransformerM: 50,
  ambientTempC: 25,
  conductorType: {
    material: "copper" as ConductorMaterial,
    insulation: "pvc" as ConductorInsulation,
  },
  transformerMode: "existing" as TransformerMode,
  existingTransformerKVA: undefined,
  luminaires: [],
  commonOutlets: [],
  powerOutlets: [],
};

// Convert form state → backend ProjectInput
function toProjectInput(form: FormState): ProjectInput {
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
      unitPowerW: l.unitPowerW,
    })),
    commonOutlets: form.commonOutlets.map((o) => ({
      quantity: BigInt(o.quantity),
    })),
    powerOutlets: form.powerOutlets,
  };
}

// Convert backend ProjectInput → form state
function fromProjectInput(input: ProjectInput): FormState {
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
      unitPowerW: l.unitPowerW,
    })),
    commonOutlets: input.commonOutlets.map((o) => ({
      quantity: Number(o.quantity),
    })),
    powerOutlets: input.powerOutlets,
  };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function getVoltageValue(vs: VoltageSystem): number {
  if (vs === "tri380") return 380;
  return 220;
}

function estimatePower(form: FormState): number {
  const lumVA = form.luminaires.reduce(
    (s, l) => s + l.quantity * l.unitPowerW,
    0,
  );
  const comVA = form.commonOutlets.reduce((s, c) => s + c.quantity * 100, 0);
  const powVA = form.powerOutlets.reduce(
    (s, p) => s + (p.powerKW * 1000) / (p.cosPhi * (p.efficiency / 100)),
    0,
  );
  return lumVA + comVA + powVA;
}

function estimateCircuits(form: FormState): number {
  const lumCircuits = form.luminaires.reduce(
    (s, l) => s + Math.ceil(l.quantity / 15),
    0,
  );
  const comCircuits = form.commonOutlets.reduce(
    (s, c) => s + Math.ceil(c.quantity / 10),
    0,
  );
  const powCircuits = form.powerOutlets.length;
  return Math.max(lumCircuits + comCircuits + powCircuits, 1);
}

// ─────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────

interface StepIndicatorProps {
  current: number;
  total: number;
}

function StepIndicator({ current, total }: StepIndicatorProps) {
  const labels = ["Datos Generales", "Conductor", "Cargas", "Resumen"];
  return (
    <div className="flex flex-col gap-2 mb-5">
      <div className="flex items-center justify-between">
        <span className="tech-label">
          Paso {current} de {total}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {labels[current - 1]}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => {
          const stepKey = `step-seg-${i + 1}`;
          return (
            <div
              key={stepKey}
              className={`h-1.5 flex-1 rounded-full transition-smooth ${
                i + 1 <= current ? "bg-primary" : "bg-secondary"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4 pb-3 border-b border-border">
      <div className="p-1.5 rounded bg-primary/10 text-primary mt-0.5 shrink-0">
        <Icon size={14} />
      </div>
      <div>
        <h3 className="text-sm font-semibold font-display text-foreground leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Nota normativa
// ─────────────────────────────────────────────

function NormNote({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-secondary/50 border border-border rounded px-3 py-2 mt-2">
      <AlertTriangle size={12} className="text-accent shrink-0 mt-0.5" />
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Campo de formulario
// ─────────────────────────────────────────────

function FormField({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-foreground/80">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {hint && (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Radio group
// ─────────────────────────────────────────────

function RadioGroup<T extends string>({
  value,
  onChange,
  options,
  name,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          data-ocid={`${name}.${opt.value}`}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded text-xs font-medium border transition-smooth ${
            value === opt.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/70"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 1: Datos Generales
// ─────────────────────────────────────────────

function Step1({
  data,
  onChange,
}: {
  data: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        icon={Zap}
        title="Datos Generales del Proyecto"
        description="Información base de la instalación eléctrica"
      />

      <FormField label="Nombre del proyecto" required>
        <Input
          data-ocid="form.name_input"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Ej: Residencia García – Planta Baja"
          className="text-sm"
        />
      </FormField>

      <FormField label="Tipo de instalación" required>
        <RadioGroup<InstallationType>
          name="form.installation_type"
          value={data.installationType}
          onChange={(v) => {
            onChange({
              installationType: v,
              initialPowerFactor: v === "industrial" ? 0.8 : 0.85,
              transformerMode:
                v === "industrial"
                  ? ("own" as TransformerMode)
                  : ("existing" as TransformerMode),
            });
          }}
          options={[
            {
              value: "residential" as InstallationType,
              label: INSTALLATION_TYPE_LABELS.residential,
            },
            {
              value: "industrial" as InstallationType,
              label: INSTALLATION_TYPE_LABELS.industrial,
            },
          ]}
        />
        {data.installationType === "industrial" && (
          <NormNote text="Se aplicará factor de demanda industrial según NB 777 Cap. 4. cosφ ajustado a 0.80 automáticamente." />
        )}
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Área total (m²)" required>
          <Input
            data-ocid="form.area_input"
            type="number"
            min={1}
            value={data.totalAreaM2 || ""}
            onChange={(e) => onChange({ totalAreaM2: Number(e.target.value) })}
            placeholder="0"
            className="text-sm"
          />
        </FormField>

        <FormField label="Número de pisos" required>
          <Input
            data-ocid="form.floors_input"
            type="number"
            min={1}
            value={data.floors}
            onChange={(e) => onChange({ floors: Number(e.target.value) })}
            className="text-sm"
          />
        </FormField>
      </div>

      <FormField label="Sistema de voltaje" required>
        <RadioGroup<VoltageSystem>
          name="form.voltage_system"
          value={data.voltageSystem}
          onChange={(v) => onChange({ voltageSystem: v })}
          options={[
            {
              value: "mono220" as VoltageSystem,
              label: VOLTAGE_SYSTEM_LABELS.mono220,
            },
            {
              value: "tri220" as VoltageSystem,
              label: VOLTAGE_SYSTEM_LABELS.tri220,
            },
            {
              value: "tri380" as VoltageSystem,
              label: VOLTAGE_SYSTEM_LABELS.tri380,
            },
          ]}
        />
        <p className="text-[11px] text-muted-foreground mt-1">
          Voltaje típico Bolivia (ENDE/SINEC)
        </p>
      </FormField>

      <FormField
        label="Factor de potencia (cosφ)"
        hint="Si se desconoce, usar 0.80 para industrial según NB 777 Art. 4.2"
      >
        <Input
          data-ocid="form.power_factor_input"
          type="number"
          min={0.5}
          max={1}
          step={0.01}
          value={data.initialPowerFactor}
          onChange={(e) =>
            onChange({ initialPowerFactor: Number(e.target.value) })
          }
          className="text-sm font-mono"
        />
        <div className="formula-code mt-1">
          cosφ = {data.initialPowerFactor.toFixed(2)} → φ ={" "}
          {((Math.acos(data.initialPowerFactor) * 180) / Math.PI).toFixed(1)}°
        </div>
      </FormField>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 2: Conductor y Transformador
// ─────────────────────────────────────────────

function Step2({
  data,
  onChange,
}: {
  data: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const tempFactor =
    data.ambientTempC <= 30
      ? 1.0
      : data.ambientTempC <= 40
        ? 0.91
        : data.ambientTempC <= 50
          ? 0.82
          : 0.71;

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        icon={Zap}
        title="Conductor y Temperatura"
        description="Parámetros físicos del cableado"
      />

      <FormField
        label="Distancia transformador → tablero (m)"
        hint="Afecta la caída de tensión en la acometida principal"
        required
      >
        <Input
          data-ocid="form.distance_input"
          type="number"
          min={1}
          value={data.distanceToTransformerM}
          onChange={(e) =>
            onChange({ distanceToTransformerM: Number(e.target.value) })
          }
          className="text-sm font-mono"
        />
      </FormField>

      <FormField label="Material del conductor" required>
        <RadioGroup<ConductorMaterial>
          name="form.conductor_material"
          value={data.conductorType.material}
          onChange={(v) =>
            onChange({
              conductorType: { ...data.conductorType, material: v },
            })
          }
          options={[
            {
              value: "copper" as ConductorMaterial,
              label: CONDUCTOR_MATERIAL_LABELS.copper,
            },
            {
              value: "aluminum" as ConductorMaterial,
              label: CONDUCTOR_MATERIAL_LABELS.aluminum,
            },
          ]}
        />
        {data.conductorType.material === "aluminum" && (
          <NormNote text="El aluminio requiere sección mayor (+30%) respecto al cobre para igual capacidad de corriente. NB 777 Tabla 8." />
        )}
      </FormField>

      <FormField label="Tipo de aislamiento" required>
        <RadioGroup<ConductorInsulation>
          name="form.conductor_insulation"
          value={data.conductorType.insulation}
          onChange={(v) =>
            onChange({
              conductorType: { ...data.conductorType, insulation: v },
            })
          }
          options={[
            {
              value: "xlpe" as ConductorInsulation,
              label: CONDUCTOR_INSULATION_LABELS.xlpe,
            },
            {
              value: "pvc" as ConductorInsulation,
              label: CONDUCTOR_INSULATION_LABELS.pvc,
            },
          ]}
        />
      </FormField>

      <FormField
        label="Temperatura ambiente (°C)"
        hint="Afecta el factor de corrección Ft según NB 777 Tabla 11"
      >
        <Input
          data-ocid="form.temp_input"
          type="number"
          min={10}
          max={60}
          value={data.ambientTempC}
          onChange={(e) => onChange({ ambientTempC: Number(e.target.value) })}
          className="text-sm font-mono"
        />
        <div className="formula-code mt-1">
          Ft = {tempFactor.toFixed(2)} (NB 777 Tabla 11 — {data.ambientTempC}°C)
        </div>
      </FormField>

      <div className="border-t border-border pt-4">
        <SectionHeader
          icon={Cpu}
          title="Transformador"
          description="Configuración del suministro eléctrico"
        />

        <FormField label="Modo del transformador" required>
          <RadioGroup<TransformerMode>
            name="form.transformer_mode"
            value={data.transformerMode}
            onChange={(v) => onChange({ transformerMode: v })}
            options={[
              {
                value: "existing" as TransformerMode,
                label: "Transformador existente",
              },
              {
                value: "own" as TransformerMode,
                label: "Requiere transformador propio",
              },
            ]}
          />
          {data.installationType === "industrial" && (
            <NormNote text="Instalaciones industriales requieren transformador propio según RTDE Bolivia Art. 3.5." />
          )}
        </FormField>

        {data.transformerMode === "existing" && (
          <FormField
            label="Potencia del transformador existente (kVA)"
            hint="Se verificará si soporta la demanda calculada"
          >
            <Input
              data-ocid="form.transformer_kva_input"
              type="number"
              min={5}
              value={data.existingTransformerKVA ?? ""}
              onChange={(e) =>
                onChange({
                  existingTransformerKVA: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              placeholder="Ej: 160"
              className="text-sm font-mono"
            />
          </FormField>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 3: Cargas Eléctricas
// ─────────────────────────────────────────────

function Step3({
  data,
  onChange,
}: {
  data: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const defaultVoltage = getVoltageValue(data.voltageSystem);

  const addLuminaire = () =>
    onChange({
      luminaires: [
        ...data.luminaires,
        { type: "LED", quantity: 1, unitPowerW: 15 },
      ],
    });

  const updateLuminaire = (
    i: number,
    patch: Partial<{ type: string; quantity: number; unitPowerW: number }>,
  ) => {
    const updated = [...data.luminaires];
    updated[i] = { ...updated[i], ...patch };
    onChange({ luminaires: updated });
  };

  const removeLuminaire = (i: number) =>
    onChange({ luminaires: data.luminaires.filter((_, idx) => idx !== i) });

  const addOutlet = () =>
    onChange({ commonOutlets: [...data.commonOutlets, { quantity: 1 }] });

  const updateOutlet = (i: number, patch: Partial<{ quantity: number }>) => {
    const updated = [...data.commonOutlets];
    updated[i] = { ...updated[i], ...patch };
    onChange({ commonOutlets: updated });
  };

  const removeOutlet = (i: number) =>
    onChange({
      commonOutlets: data.commonOutlets.filter((_, idx) => idx !== i),
    });

  const addPowerOutlet = () =>
    onChange({
      powerOutlets: [
        ...data.powerOutlets,
        {
          name: "Motor",
          powerKW: 1,
          voltage: defaultVoltage,
          cosPhi: 0.85,
          efficiency: 88,
          isWetArea: false,
        },
      ],
    });

  const updatePowerOutlet = (i: number, patch: Partial<PowerOutletLoad>) => {
    const updated = [...data.powerOutlets];
    updated[i] = { ...updated[i], ...patch };
    onChange({ powerOutlets: updated });
  };

  const removePowerOutlet = (i: number) =>
    onChange({
      powerOutlets: data.powerOutlets.filter((_, idx) => idx !== i),
    });

  const totalLumVA = data.luminaires.reduce(
    (s, l) => s + l.quantity * l.unitPowerW,
    0,
  );
  const totalComVA = data.commonOutlets.reduce(
    (s, c) => s + c.quantity * 100,
    0,
  );
  const totalPowVA = data.powerOutlets.reduce(
    (s, p) => s + (p.powerKW * 1000) / (p.cosPhi * (p.efficiency / 100)),
    0,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* ── A: Luminarias ── */}
      <div>
        <SectionHeader
          icon={Lightbulb}
          title="A. Luminarias"
          description="Puntos de iluminación por zona"
        />

        {data.luminaires.length === 0 ? (
          <div
            data-ocid="luminaires.empty_state"
            className="text-center py-5 bg-secondary/30 rounded border border-dashed border-border"
          >
            <Lightbulb
              size={20}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Sin luminarias. Agrega una.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-3">
            {data.luminaires.map((lum, i) => (
              <div
                key={`lum-${i + 1}-${lum.type}`}
                data-ocid={`luminaires.item.${i + 1}`}
                className="bg-card border border-border rounded p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    LUM-{String(i + 1).padStart(2, "0")}
                  </Badge>
                  <button
                    type="button"
                    aria-label="Eliminar luminaria"
                    data-ocid={`luminaires.delete_button.${i + 1}`}
                    onClick={() => removeLuminaire(i)}
                    className="text-muted-foreground hover:text-destructive transition-smooth"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3">
                    <Label className="text-[10px] text-muted-foreground">
                      Tipo
                    </Label>
                    <Input
                      data-ocid={`luminaires.type_input.${i + 1}`}
                      value={lum.type}
                      onChange={(e) =>
                        updateLuminaire(i, { type: e.target.value })
                      }
                      placeholder="LED"
                      className="text-xs h-7 mt-0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      Cantidad
                    </Label>
                    <Input
                      data-ocid={`luminaires.qty_input.${i + 1}`}
                      type="number"
                      min={1}
                      value={lum.quantity}
                      onChange={(e) =>
                        updateLuminaire(i, {
                          quantity: Number(e.target.value),
                        })
                      }
                      className="text-xs h-7 mt-0.5 font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-[10px] text-muted-foreground">
                      Potencia unitaria (W)
                    </Label>
                    <Input
                      data-ocid={`luminaires.power_input.${i + 1}`}
                      type="number"
                      min={1}
                      value={lum.unitPowerW}
                      onChange={(e) =>
                        updateLuminaire(i, {
                          unitPowerW: Number(e.target.value),
                        })
                      }
                      className="text-xs h-7 mt-0.5 font-mono"
                    />
                  </div>
                </div>
                <div className="formula-code text-[10px]">
                  VA = {lum.quantity} × {lum.unitPowerW} W ={" "}
                  {(lum.quantity * lum.unitPowerW).toFixed(0)} VA
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="luminaires.add_button"
            onClick={addLuminaire}
            className="text-xs gap-1 h-7"
          >
            <Plus size={12} /> Agregar Luminaria
          </Button>
          {totalLumVA > 0 && (
            <span className="text-xs text-muted-foreground font-mono">
              Total: {totalLumVA.toFixed(0)} VA
            </span>
          )}
        </div>
        <NormNote text="Máx. 15 puntos por circuito, 10 A (NB 777 Art. 7.3)" />
      </div>

      {/* ── B: Tomas Comunes ── */}
      <div>
        <SectionHeader
          icon={PlugZap}
          title="B. Tomas Comunes"
          description="100 VA por toma según NB 777"
        />

        {data.commonOutlets.length === 0 ? (
          <div
            data-ocid="outlets.empty_state"
            className="text-center py-5 bg-secondary/30 rounded border border-dashed border-border"
          >
            <PlugZap size={20} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">
              Sin tomas comunes. Agrega un grupo.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-3">
            {data.commonOutlets.map((outlet, i) => (
              <div
                key={`outlet-${i + 1}-${outlet.quantity}`}
                data-ocid={`outlets.item.${i + 1}`}
                className="bg-card border border-border rounded p-3 flex items-center gap-3"
              >
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono shrink-0"
                >
                  GRP-{String(i + 1).padStart(2, "0")}
                </Badge>
                <div className="flex-1">
                  <Label className="text-[10px] text-muted-foreground">
                    Cantidad de tomas
                  </Label>
                  <Input
                    data-ocid={`outlets.qty_input.${i + 1}`}
                    type="number"
                    min={1}
                    value={outlet.quantity}
                    onChange={(e) =>
                      updateOutlet(i, { quantity: Number(e.target.value) })
                    }
                    className="text-xs h-7 mt-0.5 font-mono"
                  />
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {(outlet.quantity * 100).toFixed(0)} VA
                  </p>
                  <p className="text-[9px] text-muted-foreground/60">
                    100 VA c/u
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Eliminar toma"
                  data-ocid={`outlets.delete_button.${i + 1}`}
                  onClick={() => removeOutlet(i)}
                  className="text-muted-foreground hover:text-destructive transition-smooth"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="outlets.add_button"
            onClick={addOutlet}
            className="text-xs gap-1 h-7"
          >
            <Plus size={12} /> Agregar grupo de tomas
          </Button>
          {totalComVA > 0 && (
            <span className="text-xs text-muted-foreground font-mono">
              Total: {totalComVA.toFixed(0)} VA
            </span>
          )}
        </div>
        <NormNote text="Máx. 10 tomas por circuito, 15 A (NB 777 Art. 7.4)" />
      </div>

      {/* ── C: Tomas de Fuerza ── */}
      <div>
        <SectionHeader
          icon={Cpu}
          title="C. Tomas de Fuerza / Motores"
          description="Equipos especiales y motores eléctricos"
        />

        {data.powerOutlets.length === 0 ? (
          <div
            data-ocid="power_outlets.empty_state"
            className="text-center py-5 bg-secondary/30 rounded border border-dashed border-border"
          >
            <Cpu size={20} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">
              Sin equipos de fuerza. Agrega uno.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-3">
            {data.powerOutlets.map((po, i) => (
              <div
                key={`po-${i + 1}-${po.name}`}
                data-ocid={`power_outlets.item.${i + 1}`}
                className="bg-card border border-border rounded p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    EQP-{String(i + 1).padStart(2, "0")}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {po.isWetArea && (
                      <Badge
                        variant="destructive"
                        className="text-[9px] px-1.5 py-0"
                      >
                        Área húmeda
                      </Badge>
                    )}
                    <button
                      type="button"
                      aria-label="Eliminar equipo"
                      data-ocid={`power_outlets.delete_button.${i + 1}`}
                      onClick={() => removePowerOutlet(i)}
                      className="text-muted-foreground hover:text-destructive transition-smooth"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Nombre del equipo
                  </Label>
                  <Input
                    data-ocid={`power_outlets.name_input.${i + 1}`}
                    value={po.name}
                    onChange={(e) =>
                      updatePowerOutlet(i, { name: e.target.value })
                    }
                    placeholder="Motor bomba"
                    className="text-xs h-7 mt-0.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      Potencia (kW)
                    </Label>
                    <Input
                      data-ocid={`power_outlets.kw_input.${i + 1}`}
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={po.powerKW}
                      onChange={(e) =>
                        updatePowerOutlet(i, {
                          powerKW: Number(e.target.value),
                        })
                      }
                      className="text-xs h-7 mt-0.5 font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      Voltaje (V)
                    </Label>
                    <Input
                      data-ocid={`power_outlets.voltage_input.${i + 1}`}
                      type="number"
                      value={po.voltage}
                      onChange={(e) =>
                        updatePowerOutlet(i, {
                          voltage: Number(e.target.value),
                        })
                      }
                      className="text-xs h-7 mt-0.5 font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      cosφ
                    </Label>
                    <Input
                      data-ocid={`power_outlets.cosphi_input.${i + 1}`}
                      type="number"
                      min={0.5}
                      max={1}
                      step={0.01}
                      value={po.cosPhi}
                      onChange={(e) =>
                        updatePowerOutlet(i, {
                          cosPhi: Number(e.target.value),
                        })
                      }
                      className="text-xs h-7 mt-0.5 font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      Rendimiento (%)
                    </Label>
                    <Input
                      data-ocid={`power_outlets.efficiency_input.${i + 1}`}
                      type="number"
                      min={50}
                      max={100}
                      value={po.efficiency}
                      onChange={(e) =>
                        updatePowerOutlet(i, {
                          efficiency: Number(e.target.value),
                        })
                      }
                      className="text-xs h-7 mt-0.5 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-ocid={`power_outlets.wet_area_toggle.${i + 1}`}
                    onClick={() =>
                      updatePowerOutlet(i, { isWetArea: !po.isWetArea })
                    }
                    className={`w-8 h-4 rounded-full relative transition-smooth shrink-0 ${
                      po.isWetArea ? "bg-destructive" : "bg-secondary"
                    }`}
                    aria-label="Área húmeda"
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-foreground/80 transition-smooth ${
                        po.isWetArea ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </button>
                  <span className="text-[11px] text-muted-foreground">
                    Área húmeda
                  </span>
                  {po.isWetArea && (
                    <span className="text-[10px] text-destructive font-medium">
                      → Diferencial 30 mA obligatorio
                    </span>
                  )}
                </div>

                {/* Fórmula visible */}
                <div className="formula-code text-[10px] leading-relaxed">
                  I = P / (V·cosφ·η) = {(po.powerKW * 1000).toFixed(0)} / (
                  {po.voltage}·{po.cosPhi}·{(po.efficiency / 100).toFixed(2)}) ={" "}
                  {(
                    (po.powerKW * 1000) /
                    (po.voltage * po.cosPhi * (po.efficiency / 100))
                  ).toFixed(2)}{" "}
                  A
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="power_outlets.add_button"
            onClick={addPowerOutlet}
            className="text-xs gap-1 h-7"
          >
            <Plus size={12} /> Agregar equipo
          </Button>
          {totalPowVA > 0 && (
            <span className="text-xs text-muted-foreground font-mono">
              Total: {totalPowVA.toFixed(0)} VA
            </span>
          )}
        </div>
        <NormNote text="Circuito exclusivo por equipo (NB 777 Art. 7.5). Diferencial 30 mA en áreas húmedas." />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Step 4: Resumen y Calcular
// ─────────────────────────────────────────────

function Step4({
  data,
  onCalculate,
  isCalculating,
}: {
  data: FormState;
  onCalculate: () => void;
  isCalculating: boolean;
}) {
  const totalVA = estimatePower(data);
  const circuits = estimateCircuits(data);
  const voltage = getVoltageValue(data.voltageSystem);
  const isTri = (data.voltageSystem as string).startsWith("tri");
  const currentA = isTri
    ? totalVA / (Math.sqrt(3) * voltage * data.initialPowerFactor)
    : totalVA / (voltage * data.initialPowerFactor);

  const SummaryRow = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono font-medium text-foreground">
        {value}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        icon={CheckCircle2}
        title="Resumen del Proyecto"
        description="Verifica los datos antes de calcular"
      />

      {/* Datos del proyecto */}
      <div className="bg-card border border-border rounded p-4">
        <p className="tech-label mb-2">Datos Generales</p>
        <SummaryRow label="Nombre" value={data.name || "—"} />
        <SummaryRow
          label="Tipo"
          value={
            data.installationType === "residential"
              ? "Residencial"
              : "Industrial"
          }
        />
        <SummaryRow
          label="Área / Pisos"
          value={`${data.totalAreaM2} m² / ${data.floors} piso(s)`}
        />
        <SummaryRow
          label="Sistema"
          value={
            VOLTAGE_SYSTEM_LABELS[data.voltageSystem as string] ??
            String(data.voltageSystem)
          }
        />
        <SummaryRow label="cosφ" value={data.initialPowerFactor.toFixed(2)} />
      </div>

      {/* Conductor */}
      <div className="bg-card border border-border rounded p-4">
        <p className="tech-label mb-2">Conductor</p>
        <SummaryRow
          label="Material"
          value={
            CONDUCTOR_MATERIAL_LABELS[data.conductorType.material as string] ??
            String(data.conductorType.material)
          }
        />
        <SummaryRow
          label="Aislamiento"
          value={
            CONDUCTOR_INSULATION_LABELS[
              data.conductorType.insulation as string
            ] ?? String(data.conductorType.insulation)
          }
        />
        <SummaryRow
          label="Distancia"
          value={`${data.distanceToTransformerM} m`}
        />
        <SummaryRow label="Temperatura" value={`${data.ambientTempC}°C`} />
        <SummaryRow
          label="Transformador"
          value={
            data.transformerMode === "existing"
              ? `Existente${data.existingTransformerKVA ? ` ${data.existingTransformerKVA} kVA` : ""}`
              : "Propio"
          }
        />
      </div>

      {/* Cargas */}
      <div className="bg-card border border-border rounded p-4">
        <p className="tech-label mb-2">Cargas Eléctricas</p>
        <SummaryRow
          label="Luminarias (grupos)"
          value={`${data.luminaires.length} grupo(s)`}
        />
        <SummaryRow
          label="Tomas comunes"
          value={`${data.commonOutlets.reduce((s, c) => s + c.quantity, 0)} tomas`}
        />
        <SummaryRow
          label="Equipos de fuerza"
          value={`${data.powerOutlets.length} equipo(s)`}
        />
      </div>

      {/* Estimación */}
      <div className="bg-primary/5 border border-primary/20 rounded p-4">
        <p className="tech-label text-primary/70 mb-3">Estimación Previa</p>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-muted-foreground">
              Potencia instalada
            </span>
            <span className="text-lg font-bold font-mono text-foreground">
              {(totalVA / 1000).toFixed(2)} kVA
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-muted-foreground">
              Circuitos estimados
            </span>
            <span className="text-base font-bold font-mono text-foreground">
              {circuits}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-muted-foreground">
              Corriente nominal (pre-cálculo)
            </span>
            <span className="text-base font-bold font-mono text-foreground">
              {currentA.toFixed(2)} A
            </span>
          </div>
        </div>

        {/* Fórmula visible */}
        <div className="formula-code mt-3 text-[10px] leading-relaxed">
          {isTri ? (
            <>
              I = P / (√3·V·cosφ) = {totalVA.toFixed(0)} / (1.732·{voltage}·
              {data.initialPowerFactor.toFixed(2)}) = {currentA.toFixed(2)} A
            </>
          ) : (
            <>
              I = P / (V·cosφ) = {totalVA.toFixed(0)} / ({voltage}·
              {data.initialPowerFactor.toFixed(2)}) = {currentA.toFixed(2)} A
            </>
          )}
          <br />
          <span className="text-muted-foreground/60">
            NB 777 Art. 4.1 — Cálculo de corriente nominal
          </span>
        </div>
      </div>

      {/* Botón calcular */}
      <Button
        type="button"
        data-ocid="form.calculate_button"
        onClick={onCalculate}
        disabled={isCalculating || !data.name.trim() || totalVA === 0}
        className="w-full h-12 text-sm font-semibold gap-2"
      >
        {isCalculating ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Calculando según NB 777…
          </>
        ) : (
          <>
            <Calculator size={16} />
            Calcular según NB 777
          </>
        )}
      </Button>

      {!data.name.trim() && (
        <p
          data-ocid="form.name_error"
          className="text-xs text-destructive text-center"
        >
          El nombre del proyecto es obligatorio
        </p>
      )}
      {totalVA === 0 && data.name.trim() && (
        <p
          data-ocid="form.loads_error"
          className="text-xs text-destructive text-center"
        >
          Agrega al menos una carga eléctrica en el Paso 3
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────

function validateStep(step: number, data: FormState): string | null {
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

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function FormPage() {
  const { projectId } = useParams({ strict: false }) as {
    projectId?: string;
  };
  const navigate = useNavigate();
  const isNew = !projectId || projectId === "nuevo";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM);
  const [savedProjectId, setSavedProjectId] = useState<string | undefined>(
    isNew ? undefined : projectId,
  );
  const [isSaving, setIsSaving] = useState(false);

  const { data: existingProject, isLoading: loadingProject } = useGetProject(
    isNew ? undefined : projectId,
  );

  const createProject = useCreateProject();
  const updateProject = useUpdateProjectInput();
  const calculateProject = useCalculateProject();

  // Pre-fill form if editing
  useEffect(() => {
    if (existingProject) {
      setFormData(fromProjectInput(existingProject.input));
      setSavedProjectId(existingProject.id);
    }
  }, [existingProject]);

  const handleChange = (patch: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const input = toProjectInput(formData);
      if (savedProjectId) {
        await updateProject.mutateAsync({
          id: savedProjectId,
          input,
        });
        toast.success("Borrador guardado");
      } else {
        const createdId = await createProject.mutateAsync(input);
        setSavedProjectId(createdId);
        toast.success("Proyecto guardado");
      }
    } catch {
      toast.error("Error al guardar. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    const err = validateStep(step, formData);
    if (err) {
      toast.error(err);
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
        params: { projectId: pid },
      });
    } catch {
      toast.error("Error en el cálculo. Revisa los datos ingresados.");
    }
  };

  const isCalculating =
    calculateProject.isPending ||
    createProject.isPending ||
    updateProject.isPending;

  if (loadingProject) {
    return (
      <Layout
        showBack
        backLabel="Proyectos"
        backTo="/"
        headerSubtitle="Cargando…"
      >
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      showBack
      backLabel="Proyectos"
      backTo="/"
      headerSubtitle={isNew ? "Nuevo proyecto" : "Editar proyecto"}
    >
      <div className="flex flex-col gap-4 pb-24">
        {/* Banner edición */}
        {!isNew && (
          <div
            data-ocid="form.edit_banner"
            className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded px-3 py-2"
          >
            <CheckCircle2 size={12} className="text-accent shrink-0" />
            <p className="text-xs text-foreground/80">
              Actualizando proyecto existente:{" "}
              <strong>{formData.name || projectId}</strong>
            </p>
          </div>
        )}

        {/* Step indicator */}
        <StepIndicator current={step} total={4} />

        {/* Step content */}
        <div data-ocid={`form.step_${step}`}>
          {step === 1 && <Step1 data={formData} onChange={handleChange} />}
          {step === 2 && <Step2 data={formData} onChange={handleChange} />}
          {step === 3 && <Step3 data={formData} onChange={handleChange} />}
          {step === 4 && (
            <Step4
              data={formData}
              onCalculate={handleCalculate}
              isCalculating={isCalculating}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between gap-2 z-20">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-ocid="form.prev_button"
            onClick={handlePrev}
            disabled={step === 1}
            className="gap-1 text-xs"
          >
            <ChevronLeft size={14} /> Anterior
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="form.save_draft_button"
            onClick={handleSaveDraft}
            disabled={isSaving || !formData.name.trim()}
            className="gap-1 text-xs"
          >
            <Save size={12} />
            {isSaving ? "Guardando…" : "Guardar borrador"}
          </Button>

          {step < 4 ? (
            <Button
              type="button"
              size="sm"
              data-ocid="form.next_button"
              onClick={handleNext}
              className="gap-1 text-xs"
            >
              Siguiente <ChevronRight size={14} />
            </Button>
          ) : (
            <div className="w-20" />
          )}
        </div>
      </div>
    </Layout>
  );
}
