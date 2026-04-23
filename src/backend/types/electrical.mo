import Common "common";

module {
  public type Timestamp = Common.Timestamp;
  public type ProjectId = Common.ProjectId;

  // --- Enums / variants ---
  public type InstallationType = { #residential; #industrial };
  public type VoltageSystem = { #mono220; #tri220; #tri380 };
  public type ConductorMaterial = { #copper; #aluminum };
  public type ConductorInsulation = { #xlpe; #pvc };
  public type TransformerMode = { #existing; #own };
  public type CircuitType = { #lighting; #common; #power };

  // --- Conductor type ---
  public type ConductorType = {
    material : ConductorMaterial;
    insulation : ConductorInsulation;
  };

  // --- Load types ---
  public type LuminaireLoad = {
    typ : Text;
    quantity : Nat;
    unitPowerW : Float;
  };

  public type CommonOutletLoad = {
    quantity : Nat;
  };

  public type PowerOutletLoad = {
    name : Text;
    powerKW : Float;
    voltage : Float;
    cosPhi : Float;
    efficiency : Float;
    isWetArea : Bool;
  };

  // --- Project input ---
  public type ProjectInput = {
    name : Text;
    installationType : InstallationType;
    totalAreaM2 : Float;
    floors : Nat;
    voltageSystem : VoltageSystem;
    initialPowerFactor : Float;
    distanceToTransformerM : Float;
    ambientTempC : Float;
    conductorType : ConductorType;
    transformerMode : TransformerMode;
    existingTransformerKVA : ?Float;
    luminaires : [LuminaireLoad];
    commonOutlets : [CommonOutletLoad];
    powerOutlets : [PowerOutletLoad];
  };

  // --- Formula step (explicit math trace for NB 777) ---
  public type FormulaStep = {
    name : Text;
    expression : Text;
    substitution : Text;
    result : Float;
    unit : Text;
    nb777Ref : Text;
  };

  // --- Circuit design result ---
  public type CircuitDesign = {
    id : Text;
    description : Text;
    circuitType : CircuitType;
    points : Nat;
    totalPowerVA : Float;
    nominalCurrentA : Float;
    correctedCurrentA : Float;
    cableSectionMm2 : Float;
    voltageDropPct : Float;
    itmAmperes : Nat;
    compliesNB777 : Bool;
    warnings : [Text];
    formulaSteps : [FormulaStep];
  };

  // --- Power factor compensation ---
  public type PowerFactorCompensation = {
    needed : Bool;
    reactiveKVAR : Float;
    capacitorMicroFarads : Float;
    suggestedBankKVAR : Float;
    formulaSteps : [FormulaStep];
  };

  // --- Transformer sizing result ---
  public type TransformerResult = {
    requiredKVA : Float;
    selectedKVA : Float;
    primaryCurrentA : Float;
    secondaryCurrentA : Float;
    isExistingAdequate : ?Bool;
    formulaSteps : [FormulaStep];
  };

  // --- Energy estimate ---
  public type EnergyEstimate = {
    dailyUsageHours : Float;
    dailyKWh : Float;
    monthlyKWh : Float;
    estimatedMonthlyCostBs : Float;
  };

  // --- Full calculation result ---
  public type CalculationResult = {
    projectId : ProjectId;
    input : ProjectInput;
    maxDemandVA : Float;
    totalInstalledPowerVA : Float;
    lineCurrentA : Float;
    temperatureFactor : Float;
    groupingFactor : Float;
    circuits : [CircuitDesign];
    powerFactorCompensation : PowerFactorCompensation;
    transformer : ?TransformerResult;
    asciiSingleLineDiagram : Text;
    asciiFloorPlan : Text;
    materialsList : [(Text, Nat, Text)];
    globalWarnings : [Text];
    energyEstimate : EnergyEstimate;
    demandFormulaSteps : [FormulaStep];
    shortCircuitCurrentA : Float;
    shortCircuitFormulaSteps : [FormulaStep];
  };

  // --- Persisted project ---
  public type Project = {
    id : ProjectId;
    name : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
    input : ProjectInput;
    result : ?CalculationResult;
  };
};
