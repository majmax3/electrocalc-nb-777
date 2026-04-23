// ─────────────────────────────────────────────
// Re-export backend types for use across the app
// ─────────────────────────────────────────────

export type {
  CalculationResult,
  CircuitDesign,
  CircuitType,
  CommonOutletLoad,
  ConductorInsulation,
  ConductorMaterial,
  ConductorType,
  EnergyEstimate,
  FormulaStep,
  InstallationType,
  LuminaireLoad,
  PowerFactorCompensation,
  PowerOutletLoad,
  Project,
  ProjectId,
  ProjectInput,
  Timestamp,
  TransformerMode,
  TransformerResult,
  VoltageSystem,
} from "../backend.d.ts";

export {
  CircuitType as CircuitTypeEnum,
  ConductorInsulation as ConductorInsulationEnum,
  ConductorMaterial as ConductorMaterialEnum,
  InstallationType as InstallationTypeEnum,
  TransformerMode as TransformerModeEnum,
  VoltageSystem as VoltageSystemEnum,
} from "../backend";

// ─────────────────────────────────────────────
// Etiquetas legibles en español
// ─────────────────────────────────────────────

export const INSTALLATION_TYPE_LABELS: Record<string, string> = {
  residential: "Residencial",
  industrial: "Industrial",
};

export const VOLTAGE_SYSTEM_LABELS: Record<string, string> = {
  mono220: "Monofásico 220V",
  tri220: "Trifásico 220V",
  tri380: "Trifásico 380V",
};

export const CONDUCTOR_MATERIAL_LABELS: Record<string, string> = {
  copper: "Cobre",
  aluminum: "Aluminio",
};

export const CONDUCTOR_INSULATION_LABELS: Record<string, string> = {
  xlpe: "XLPE (polietileno reticulado)",
  pvc: "PVC",
};

export const CIRCUIT_TYPE_LABELS: Record<string, string> = {
  lighting: "Iluminación",
  common: "Tomas comunes",
  power: "Fuerza",
};

export const TRANSFORMER_MODE_LABELS: Record<string, string> = {
  existing: "Transformador existente",
  own: "Transformador propio",
};
