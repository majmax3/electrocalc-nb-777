import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LuminaireLoad {
    typ: string;
    unitPowerW: number;
    quantity: bigint;
}
export type Timestamp = bigint;
export interface PowerOutletLoad {
    voltage: number;
    efficiency: number;
    name: string;
    powerKW: number;
    isWetArea: boolean;
    cosPhi: number;
}
export interface EnergyEstimate {
    dailyUsageHours: number;
    dailyKWh: number;
    estimatedMonthlyCostBs: number;
    monthlyKWh: number;
}
export interface CalculationResult {
    circuits: Array<CircuitDesign>;
    shortCircuitFormulaSteps: Array<FormulaStep>;
    transformer?: TransformerResult;
    asciiFloorPlan: string;
    energyEstimate: EnergyEstimate;
    totalInstalledPowerVA: number;
    projectId: ProjectId;
    materialsList: Array<[string, bigint, string]>;
    temperatureFactor: number;
    shortCircuitCurrentA: number;
    input: ProjectInput;
    asciiSingleLineDiagram: string;
    globalWarnings: Array<string>;
    groupingFactor: number;
    demandFormulaSteps: Array<FormulaStep>;
    lineCurrentA: number;
    powerFactorCompensation: PowerFactorCompensation;
    maxDemandVA: number;
}
export interface TransformerResult {
    formulaSteps: Array<FormulaStep>;
    primaryCurrentA: number;
    selectedKVA: number;
    requiredKVA: number;
    secondaryCurrentA: number;
    isExistingAdequate?: boolean;
}
export interface CircuitDesign {
    id: string;
    totalPowerVA: number;
    formulaSteps: Array<FormulaStep>;
    correctedCurrentA: number;
    voltageDropPct: number;
    cableSectionMm2: number;
    description: string;
    compliesNB777: boolean;
    warnings: Array<string>;
    itmAmperes: bigint;
    circuitType: CircuitType;
    nominalCurrentA: number;
    points: bigint;
}
export interface ProjectInput {
    installationType: InstallationType;
    luminaires: Array<LuminaireLoad>;
    existingTransformerKVA?: number;
    transformerMode: TransformerMode;
    floors: bigint;
    name: string;
    ambientTempC: number;
    powerOutlets: Array<PowerOutletLoad>;
    totalAreaM2: number;
    distanceToTransformerM: number;
    conductorType: ConductorType;
    voltageSystem: VoltageSystem;
    initialPowerFactor: number;
    commonOutlets: Array<CommonOutletLoad>;
}
export interface CommonOutletLoad {
    quantity: bigint;
}
export type ProjectId = string;
export interface ConductorType {
    insulation: ConductorInsulation;
    material: ConductorMaterial;
}
export interface Project {
    id: ProjectId;
    result?: CalculationResult;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    input: ProjectInput;
}
export interface PowerFactorCompensation {
    reactiveKVAR: number;
    formulaSteps: Array<FormulaStep>;
    suggestedBankKVAR: number;
    needed: boolean;
    capacitorMicroFarads: number;
}
export interface FormulaStep {
    result: number;
    expression: string;
    name: string;
    nb777Ref: string;
    unit: string;
    substitution: string;
}
export enum CircuitType {
    lighting = "lighting",
    power = "power",
    common = "common"
}
export enum ConductorInsulation {
    pvc = "pvc",
    xlpe = "xlpe"
}
export enum ConductorMaterial {
    aluminum = "aluminum",
    copper = "copper"
}
export enum InstallationType {
    residential = "residential",
    industrial = "industrial"
}
export enum TransformerMode {
    own = "own",
    existing = "existing"
}
export enum VoltageSystem {
    tri220 = "tri220",
    tri380 = "tri380",
    mono220 = "mono220"
}
export interface backendInterface {
    calculateProject(projectId: string): Promise<CalculationResult | null>;
    createProject(input: ProjectInput): Promise<string>;
    deleteProject(id: string): Promise<boolean>;
    getProject(id: string): Promise<Project | null>;
    listProjects(): Promise<Array<Project>>;
    updateProjectInput(id: string, input: ProjectInput): Promise<boolean>;
}
