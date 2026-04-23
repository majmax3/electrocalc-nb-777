import Types "../types/electrical";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";

module {

  // ─── Voltage helpers ───────────────────────────────────────────────────────

  public func nominalVoltage(vs : Types.VoltageSystem) : Float {
    switch vs {
      case (#mono220) 220.0;
      case (#tri220)  220.0;
      case (#tri380)  380.0;
    };
  };

  public func isThreePhase(vs : Types.VoltageSystem) : Bool {
    switch vs {
      case (#mono220) false;
      case (#tri220)  true;
      case (#tri380)  true;
    };
  };

  // ─── Temperature correction factor (NB 777 Table 13) ──────────────────────

  // Ft = sqrt((Tmax - ambient) / (Tmax - 40))
  // XLPE: Tmax = 90°C, PVC: Tmax = 75°C
  public func temperatureFactor(ambientTempC : Float, insulation : Types.ConductorInsulation) : Float {
    let tmax : Float = switch insulation { case (#xlpe) 90.0; case (#pvc) 75.0 };
    if (ambientTempC >= tmax) return 0.01; // degenerate — very hot
    Float.sqrt((tmax - ambientTempC) / (tmax - 40.0));
  };

  // ─── Grouping / bundling correction factor (NB 777 Table 14) ──────────────

  public func groupingFactor(circuitCount : Nat) : Float {
    if (circuitCount <= 1) return 1.0;
    if (circuitCount == 2) return 0.8;
    if (circuitCount == 3) return 0.7;
    if (circuitCount == 4) return 0.65;
    if (circuitCount == 5) return 0.6;
    if (circuitCount == 6) return 0.57;
    0.50; // 7+
  };

  // ─── Total installed power (VA) ────────────────────────────────────────────

  public func totalInstalledPowerVA(
    luminaires    : [Types.LuminaireLoad],
    commonOutlets : [Types.CommonOutletLoad],
    powerOutlets  : [Types.PowerOutletLoad],
  ) : Float {
    let lumPower = luminaires.foldLeft(0.0, func(acc, l) {
      acc + l.quantity.toFloat() * l.unitPowerW
    });
    let comPower = commonOutlets.foldLeft(0.0, func(acc, c) {
      acc + c.quantity.toFloat() * 100.0 // 100 VA per NB 777
    });
    let pwrPower = powerOutlets.foldLeft(0.0, func(acc, p) {
      acc + (p.powerKW * 1000.0 / p.efficiency)
    });
    lumPower + comPower + pwrPower;
  };

  // ─── Maximum demand (NB 777 Table 5) ──────────────────────────────────────

  public func maxDemandVA(input : Types.ProjectInput) : (Float, [Types.FormulaStep]) {
    let total = totalInstalledPowerVA(input.luminaires, input.commonOutlets, input.powerOutlets);

    switch (input.installationType) {
      case (#residential) {
        // NB 777 Tabla 5 – residential simultaneity tiers
        let demand : Float =
          if (total <= 3000.0) {
            total * 1.0;
          } else if (total <= 8000.0) {
            3000.0 + (total - 3000.0) * 0.35;
          } else {
            3000.0 + 5000.0 * 0.35 + (total - 8000.0) * 0.25;
          };

        let step : Types.FormulaStep = {
          name         = "Demanda Máxima Residencial";
          expression   = "Primeros 3000 VA al 100%, 3001–8000 VA al 35%, resto al 25%";
          substitution = "P_total = " # floatToText(total) # " VA";
          result       = demand;
          unit         = "VA";
          nb777Ref     = "NB 777 Tabla 5";
        };
        (demand, [step]);
      };
      case (#industrial) {
        // Industrial: 80% demand factor on total; motors counted at 100%
        let motorPower = input.powerOutlets.foldLeft(0.0, func(acc, p) {
          acc + (p.powerKW * 1000.0 / p.efficiency)
        });
        let nonMotor = total - motorPower;
        let demand = nonMotor * 0.8 + motorPower * 1.0;

        let step : Types.FormulaStep = {
          name         = "Demanda Máxima Industrial";
          expression   = "Dem = P_no_motores × 0.80 + P_motores × 1.00";
          substitution = "P_no_motores = " # floatToText(nonMotor) # " VA, P_motores = " # floatToText(motorPower) # " VA";
          result       = demand;
          unit         = "VA";
          nb777Ref     = "NB 777 Art. 3.6 – Factor de demanda industrial";
        };
        (demand, [step]);
      };
    };
  };

  // ─── Line current ──────────────────────────────────────────────────────────

  public func lineCurrentA(powerVA : Float, vs : Types.VoltageSystem, cosPhi : Float) : (Float, Types.FormulaStep) {
    let v = nominalVoltage(vs);
    if (isThreePhase(vs)) {
      let i = powerVA / (Float.sqrt(3.0) * v * cosPhi);
      let step : Types.FormulaStep = {
        name         = "Corriente Nominal Trifásica";
        expression   = "I = P / (√3 × V × cosφ)";
        substitution = "I = " # floatToText(powerVA) # " / (√3 × " # floatToText(v) # " × " # floatToText(cosPhi) # ")";
        result       = i;
        unit         = "A";
        nb777Ref     = "NB 777 Art. 4.2";
      };
      (i, step);
    } else {
      let i = powerVA / (v * cosPhi);
      let step : Types.FormulaStep = {
        name         = "Corriente Nominal Monofásica";
        expression   = "I = P / (V × cosφ)";
        substitution = "I = " # floatToText(powerVA) # " / (" # floatToText(v) # " × " # floatToText(cosPhi) # ")";
        result       = i;
        unit         = "A";
        nb777Ref     = "NB 777 Art. 4.2";
      };
      (i, step);
    };
  };

  // ─── Corrected current ─────────────────────────────────────────────────────

  public func correctedCurrentA(nominalI : Float, ft : Float, fa : Float) : Float {
    if (ft * fa <= 0.0) return nominalI;
    nominalI / (ft * fa);
  };

  // ─── Cable section selection (NB 777 Table 8, copper 75°C) ─────────────────

  public func selectCableSection(correctedI : Float, material : Types.ConductorMaterial) : Float {
    let i = switch material {
      case (#copper)   correctedI;
      case (#aluminum) correctedI * 1.2; // aluminium needs larger section
    };
    if (i <= 13.0)  return 1.5;
    if (i <= 17.5)  return 2.5;
    if (i <= 24.0)  return 4.0;
    if (i <= 32.0)  return 6.0;
    if (i <= 41.0)  return 10.0;
    if (i <= 57.0)  return 16.0;
    if (i <= 76.0)  return 25.0;
    if (i <= 96.0)  return 35.0;
    if (i <= 115.0) return 50.0;
    95.0; // fallback for very large loads (use 95mm² — practical limit)
  };

  // ─── Voltage drop ──────────────────────────────────────────────────────────

  public func voltageDropPct(
    lengthM   : Float,
    currentA  : Float,
    sectionMm2: Float,
    cosPhi    : Float,
    vs        : Types.VoltageSystem,
    material  : Types.ConductorMaterial,
  ) : (Float, Types.FormulaStep) {
    let rho : Float = switch material { case (#copper) 0.0175; case (#aluminum) 0.028 };
    // R_total [Ω] = ρ [Ω·mm²/m] × L [m] / A [mm²]
    let rTotal = rho * lengthM / sectionMm2;
    // X_total [Ω] = 0.08 mΩ/m × L [m] = 0.00008 Ω/m × L
    let xTotal = 0.00008 * lengthM;
    let sinPhi = Float.sqrt(1.0 - cosPhi * cosPhi);
    let v = nominalVoltage(vs);

    let dvPct : Float = if (isThreePhase(vs)) {
      Float.sqrt(3.0) * currentA * (rTotal * cosPhi + xTotal * sinPhi) / v * 100.0;
    } else {
      2.0 * currentA * (rTotal * cosPhi + xTotal * sinPhi) / v * 100.0;
    };

    let formulaExpr = if (isThreePhase(vs)) {
      "ΔV% = √3 × I × (R·cosφ + X·sinφ) / V × 100"
    } else {
      "ΔV% = 2 × I × (R·cosφ + X·sinφ) / V × 100"
    };

    let step : Types.FormulaStep = {
      name         = "Caída de Tensión";
      expression   = formulaExpr;
      substitution = "L=" # floatToText(lengthM) # "m, I=" # floatToText(currentA) # "A, A=" # floatToText(sectionMm2) # "mm², cosφ=" # floatToText(cosPhi);
      result       = dvPct;
      unit         = "%";
      nb777Ref     = "NB 777 Art. 15";
    };
    (dvPct, step);
  };

  // ─── ITM selection ─────────────────────────────────────────────────────────

  public func selectITM(correctedI : Float) : Nat {
    let minRating = correctedI * 1.25;
    let sizes : [Nat] = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];
    switch (sizes.find(func(s : Nat) : Bool { s.toFloat() >= minRating })) {
      case (?s) s;
      case null  200; // largest standard
    };
  };

  // ─── Short-circuit current ─────────────────────────────────────────────────

  public func shortCircuitCurrentA(
    vs                    : Types.VoltageSystem,
    transformerKVA        : Float,
    transformerImpedancePct: Float,
    lineLengthM           : Float,
    sectionMm2            : Float,
    material              : Types.ConductorMaterial,
  ) : (Float, [Types.FormulaStep]) {
    let v = nominalVoltage(vs);
    let vPhase = v / Float.sqrt(3.0);

    // Z_trafo = (Vcc%/100) × (V/√3)² / (kVA×1000/3)   [Ω per phase]
    let zTrafo = (transformerImpedancePct / 100.0) * (vPhase * vPhase) / (transformerKVA * 1000.0 / 3.0);

    let rho : Float = switch material { case (#copper) 0.0175; case (#aluminum) 0.028 };
    let zLine = rho * lineLengthM / sectionMm2;

    let zt = zTrafo + zLine;
    let icc = v / (Float.sqrt(3.0) * zt);

    let step1 : Types.FormulaStep = {
      name         = "Impedancia del Transformador";
      expression   = "Z_trafo = (Vcc%/100) × (V/√3)² / (S/3)";
      substitution = "Z_trafo = (" # floatToText(transformerImpedancePct) # "/100) × (" # floatToText(vPhase) # ")² / (" # floatToText(transformerKVA) # "×1000/3)";
      result       = zTrafo;
      unit         = "Ω";
      nb777Ref     = "NB 777 Art. 4.5";
    };
    let step2 : Types.FormulaStep = {
      name         = "Impedancia de la Línea";
      expression   = "Z_línea = ρ × L / A";
      substitution = "Z_línea = " # floatToText(rho) # " × " # floatToText(lineLengthM) # " / " # floatToText(sectionMm2);
      result       = zLine;
      unit         = "Ω";
      nb777Ref     = "NB 777 Art. 4.5";
    };
    let step3 : Types.FormulaStep = {
      name         = "Corriente de Cortocircuito";
      expression   = "Icc = V / (√3 × Zt)";
      substitution = "Icc = " # floatToText(v) # " / (√3 × " # floatToText(zt) # ")";
      result       = icc;
      unit         = "A";
      nb777Ref     = "NB 777 Art. 4.5";
    };
    (icc, [step1, step2, step3]);
  };

  // ─── Power factor compensation ─────────────────────────────────────────────

  public func powerFactorCompensation(
    activePowerW  : Float,
    initialCosPhi : Float,
    targetCosPhi  : Float,
    vs            : Types.VoltageSystem,
  ) : Types.PowerFactorCompensation {
    let phi1 = Float.arccos(initialCosPhi);
    let phi2 = Float.arccos(targetCosPhi);
    let tan1 = Float.sin(phi1) / initialCosPhi;
    let tan2 = Float.sin(phi2) / targetCosPhi;
    let qcKVAR = activePowerW * (tan1 - tan2) / 1000.0;
    let needed = initialCosPhi < targetCosPhi;
    let v = nominalVoltage(vs);
    let omega = 2.0 * Float.pi * 50.0; // Bolivia: 50 Hz
    let cFarads = if (needed and qcKVAR > 0.0) {
      (qcKVAR * 1000.0) / (omega * v * v)
    } else { 0.0 };
    let cMicroFarads = cFarads * 1_000_000.0;

    // Round up suggested bank to nearest 5 kVAR
    let bankKVAR = if (needed and qcKVAR > 0.0) {
      let r = Float.ceil(qcKVAR / 5.0) * 5.0;
      if (r < 2.5) 2.5 else r;
    } else { 0.0 };

    let step1 : Types.FormulaStep = {
      name         = "Potencia Reactiva Compensadora";
      expression   = "Qc = P × (tan(φ1) - tan(φ2))";
      substitution = "Qc = " # floatToText(activePowerW / 1000.0) # " kW × (" # floatToText(tan1) # " - " # floatToText(tan2) # ")";
      result       = qcKVAR;
      unit         = "kVAR";
      nb777Ref     = "NB 777 Art. 8.3";
    };
    let step2 : Types.FormulaStep = {
      name         = "Capacitancia Requerida";
      expression   = "C = Qc / (ω × V²)";
      substitution = "C = " # floatToText(qcKVAR * 1000.0) # " / (" # floatToText(omega) # " × " # floatToText(v) # "²)";
      result       = cMicroFarads;
      unit         = "μF";
      nb777Ref     = "NB 777 Art. 8.3";
    };

    {
      needed               = needed;
      reactiveKVAR         = if (qcKVAR > 0.0) qcKVAR else 0.0;
      capacitorMicroFarads = cMicroFarads;
      suggestedBankKVAR    = bankKVAR;
      formulaSteps         = [step1, step2];
    };
  };

  // ─── Transformer sizing ────────────────────────────────────────────────────

  public func transformerResult(
    activePowerW     : Float,
    reactivePowerVAR : Float,
    compensatedKVAR  : Float,
    existingKVA      : ?Float,
    vs               : Types.VoltageSystem,
  ) : Types.TransformerResult {
    let qNet = reactivePowerVAR - compensatedKVAR * 1000.0;
    let sKVA = Float.sqrt(activePowerW * activePowerW + qNet * qNet) / 1000.0;
    let sWithReserve = sKVA * 1.18;

    let stdSizes : [Float] = [10.0, 15.0, 25.0, 30.0, 50.0, 75.0, 100.0, 150.0, 200.0, 250.0, 315.0, 400.0, 500.0, 630.0, 1000.0];
    let selectedKVA = switch (stdSizes.find(func(s : Float) : Bool { s >= sWithReserve })) {
      case (?s) s;
      case null  1000.0;
    };

    let v = nominalVoltage(vs);
    let vPrimary = 6000.0; // typical MT Bolivia
    let iPrimary  = selectedKVA * 1000.0 / (Float.sqrt(3.0) * vPrimary);
    let iSecondary = selectedKVA * 1000.0 / (Float.sqrt(3.0) * v);

    let isAdequate : ?Bool = switch existingKVA {
      case (?ekva) ?(ekva >= sWithReserve);
      case null    null;
    };

    let step1 : Types.FormulaStep = {
      name         = "Potencia Aparente Total";
      expression   = "S = √(P² + Q_neto²)";
      substitution = "S = √(" # floatToText(activePowerW / 1000.0) # "² + " # floatToText(qNet / 1000.0) # "²) kVA";
      result       = sKVA;
      unit         = "kVA";
      nb777Ref     = "NB 777 Cap. 6";
    };
    let step2 : Types.FormulaStep = {
      name         = "Potencia con Reserva (18%)";
      expression   = "S_reserva = S × 1.18";
      substitution = "S_reserva = " # floatToText(sKVA) # " × 1.18";
      result       = sWithReserve;
      unit         = "kVA";
      nb777Ref     = "NB 777 Cap. 6";
    };
    let step3 : Types.FormulaStep = {
      name         = "Corriente Secundaria";
      expression   = "I_sec = S / (√3 × V_sec)";
      substitution = "I_sec = " # floatToText(selectedKVA) # " kVA × 1000 / (√3 × " # floatToText(v) # ")";
      result       = iSecondary;
      unit         = "A";
      nb777Ref     = "NB 777 Cap. 6";
    };

    {
      requiredKVA        = sWithReserve;
      selectedKVA        = selectedKVA;
      primaryCurrentA    = iPrimary;
      secondaryCurrentA  = iSecondary;
      isExistingAdequate = isAdequate;
      formulaSteps       = [step1, step2, step3];
    };
  };

  // ─── Circuit design helpers ────────────────────────────────────────────────

  func buildCircuit(
    id          : Text,
    desc        : Text,
    ctype       : Types.CircuitType,
    points      : Nat,
    powerVA     : Float,
    input       : Types.ProjectInput,
    ft          : Float,
    fa          : Float,
    maxDvPct    : Float,
    extraWarn   : [Text],
  ) : Types.CircuitDesign {
    let vs     = input.voltageSystem;
    let cosPhi = input.initialPowerFactor;
    let lengthM = input.distanceToTransformerM;

    let (nomI, currentStep) = lineCurrentA(powerVA, vs, cosPhi);
    let corrI = correctedCurrentA(nomI, ft, fa);
    let section = selectCableSection(corrI, input.conductorType.material);
    let itm = selectITM(corrI);
    let (dvPct, dvStep) = voltageDropPct(lengthM, corrI, section, cosPhi, vs, input.conductorType.material);

    var warnings = List.fromArray(extraWarn);
    if (dvPct > maxDvPct) {
      warnings.add("⚠️ Caída de tensión " # floatToText(dvPct) # "% supera límite NB 777 de " # floatToText(maxDvPct) # "%");
    };

    let complies = dvPct <= maxDvPct;

    {
      id               = id;
      description      = desc;
      circuitType      = ctype;
      points           = points;
      totalPowerVA     = powerVA;
      nominalCurrentA  = nomI;
      correctedCurrentA = corrI;
      cableSectionMm2  = section;
      voltageDropPct   = dvPct;
      itmAmperes       = itm;
      compliesNB777    = complies;
      warnings         = warnings.toArray();
      formulaSteps     = [currentStep, dvStep];
    };
  };

  public func designLightingCircuits(
    luminaires    : [Types.LuminaireLoad],
    input         : Types.ProjectInput,
    ft            : Float,
    fa            : Float,
    circuitIdBase : Nat,
  ) : [Types.CircuitDesign] {
    // Flatten luminaires into individual points
    let points = List.empty<(Text, Float)>();
    luminaires.forEach(func(l) {
      var i = 0;
      label addLoop while (i < l.quantity) {
        points.add((l.typ, l.unitPowerW));
        i += 1;
      };
    });
    let allPoints = points.toArray();

    let circuits = List.empty<Types.CircuitDesign>();
    var idx = 0;
    var circNum = circuitIdBase;

    while (idx < allPoints.size()) {
      // Take up to 15 points per circuit
      let batchEnd = Nat.min(idx + 15, allPoints.size());
      let batch = allPoints.sliceToArray(idx, batchEnd);
      let totalPower = batch.foldLeft(0.0, func(acc, p) { acc + p.1 });
      let points_count = batch.size();
      let desc = "Iluminación C" # circNum.toText();

      let circuit = buildCircuit(
        "C" # circNum.toText(), desc, #lighting,
        points_count, totalPower, input, ft, fa, 3.0, []
      );
      circuits.add(circuit);
      idx := batchEnd;
      circNum += 1;
    };
    circuits.toArray();
  };

  public func designCommonOutletCircuits(
    outlets       : [Types.CommonOutletLoad],
    input         : Types.ProjectInput,
    ft            : Float,
    fa            : Float,
    circuitIdBase : Nat,
  ) : [Types.CircuitDesign] {
    // Flatten to individual outlets (100 VA each)
    var totalQty = outlets.foldLeft(0, func(acc, o) { acc + o.quantity });

    let circuits = List.empty<Types.CircuitDesign>();
    var remaining = totalQty;
    var circNum = circuitIdBase;

    while (remaining > 0) {
      let batch = Nat.min(remaining, 10);
      let totalPower = batch.toFloat() * 100.0;
      let desc = "Tomas Comunes C" # circNum.toText();

      let circuit = buildCircuit(
        "C" # circNum.toText(), desc, #common,
        batch, totalPower, input, ft, fa, 3.0, []
      );
      circuits.add(circuit);
      remaining -= batch;
      circNum += 1;
    };
    circuits.toArray();
  };

  public func designPowerOutletCircuits(
    powerOutlets  : [Types.PowerOutletLoad],
    input         : Types.ProjectInput,
    ft            : Float,
    fa            : Float,
    circuitIdBase : Nat,
  ) : [Types.CircuitDesign] {
    let circuits = List.empty<Types.CircuitDesign>();
    var circNum = circuitIdBase;

    powerOutlets.forEach(func(p) {
      let powerVA = p.powerKW * 1000.0 / p.efficiency;
      let extra = if (p.isWetArea) {
        ["⚠️ Área húmeda: Diferencial 30 mA requerido (NB 777 Art. 5.4)"]
      } else { [] };

      let circuit = buildCircuit(
        "C" # circNum.toText(), "Fuerza: " # p.name, #power,
        1, powerVA, input, ft, fa, 5.0, extra
      );
      circuits.add(circuit);
      circNum += 1;
    });
    circuits.toArray();
  };

  // ─── ASCII diagrams ────────────────────────────────────────────────────────

  public func asciiSingleLineDiagram(circuits : [Types.CircuitDesign], input : Types.ProjectInput) : Text {
    let totalItm = if (circuits.size() > 0) {
      let maxI = circuits.foldLeft(0.0, func(acc, c) {
        if (c.correctedCurrentA > acc) c.correctedCurrentA else acc
      });
      // Main ITM protects all circuits
      let sumI = circuits.foldLeft(0.0, func(acc, c) { acc + c.correctedCurrentA });
      selectITM(sumI);
    } else { 63 };

    var lines = "┌─────────────────────────────────────────┐\n";
    lines #= "│         TABLERO GENERAL                  │\n";
    lines #= "│  Instalación: " # installTypeText(input.installationType) # "\n";
    lines #= "│  Sistema: " # vsText(input.voltageSystem) # "\n";
    lines #= "│  [ITM Principal: " # totalItm.toText() # " A]              │\n";
    lines #= "└──────────────┬──────────────────────────────┘\n";
    lines #= "               │\n";
    lines #= "    ┌──────────┴──────────────────────────┐\n";
    circuits.forEach(func(c) {
      let typeChar = switch (c.circuitType) {
        case (#lighting) "💡";
        case (#common)   "🔌";
        case (#power)    "⚡";
      };
      lines #= "    │ " # c.id # ": " # typeChar # " " # c.description # "\n";
      lines #= "    │     ITM:" # c.itmAmperes.toText() # "A  Cable:" # floatToText(c.cableSectionMm2) # "mm²  ΔV:" # floatToText(c.voltageDropPct) # "%\n";
    });
    lines #= "    └─────────────────────────────────────┘\n";
    lines;
  };

  public func asciiFloorPlan(circuits : [Types.CircuitDesign], input : Types.ProjectInput) : Text {
    let floors = input.floors;
    var plan = "PLANO DE CIRCUITOS – " # floors.toText() # " piso(s), " # floatToText(input.totalAreaM2) # " m²\n";
    plan #= "═══════════════════════════════════════════\n";

    var f = 1;
    label floorLoop while (f <= floors) {
      plan #= "\n┌──── PISO " # f.toText() # " ───────────────────────────┐\n";
      // Assign circuits to floor roughly evenly
      let circuitsPerFloor = if (floors == 0) circuits.size() else (circuits.size() + floors - 1) / floors;
      let start = (f - 1) * circuitsPerFloor;
      let end_  = Nat.min(start + circuitsPerFloor, circuits.size());
      var ci = start;
      while (ci < end_) {
        let c = circuits[ci];
        let typeLabel = switch (c.circuitType) {
          case (#lighting) "ILUM";
          case (#common)   "TOMA";
          case (#power)    "FUERZ";
        };
        plan #= "│  [" # c.id # "] " # typeLabel # ": " # c.description # "\n";
        plan #= "│       " # c.points.toText() # " pts, " # floatToText(c.totalPowerVA) # " VA\n";
        ci += 1;
      };
      plan #= "└──────────────────────────────────────────┘\n";
      f += 1;
    };
    plan;
  };

  // ─── Materials list ────────────────────────────────────────────────────────

  public func materialsList(
    circuits    : [Types.CircuitDesign],
    pfComp      : Types.PowerFactorCompensation,
    transformer : ?Types.TransformerResult,
  ) : [(Text, Nat, Text)] {
    // Accumulate cable per section in a map (section → total metres)
    // and ITM counts
    let cableMap  = List.empty<(Float, Float)>(); // (section, meters)
    let itmMap    = List.empty<(Nat, Nat)>();      // (rating, count)
    var diffCount = 0;

    circuits.forEach(func(c) {
      // Cable: assume 3 conductors × length; use distanceToTransformerM as proxy
      // We double-count a representative run length; backend doesn't know layout so we store 50m default
      let runLength = 50.0;
      // Update cable map
      var found = false;
      cableMap.mapInPlace(func(entry) : (Float, Float) {
        if (entry.0 == c.cableSectionMm2) { found := true; (entry.0, entry.1 + runLength) }
        else entry
      });
      if (not found) cableMap.add((c.cableSectionMm2, runLength));

      // ITM map
      var itmFound = false;
      itmMap.mapInPlace(func(entry) : (Nat, Nat) {
        if (entry.0 == c.itmAmperes) { itmFound := true; (entry.0, entry.1 + 1) }
        else entry
      });
      if (not itmFound) itmMap.add((c.itmAmperes, 1));

      // Differential for wet areas
      let hasWet = c.warnings.any(func(w : Text) : Bool { w.contains(#text "húmeda") });
      if (hasWet) diffCount += 1;
    });

    let result = List.empty<(Text, Nat, Text)>();

    // Cables
    cableMap.forEach(func(entry : (Float, Float)) {
      let meters = Float.ceil(entry.1);
      let metersNat : Nat = Int.abs(meters.toInt());
      result.add((
        "Cable THW-90 " # floatToText(entry.0) # " mm²",
        metersNat,
        "Metro(s) – conductor cobre"
      ));
    });

    // ITMs
    itmMap.forEach(func(entry : (Nat, Nat)) {
      result.add((
        "Interruptor termomagnético " # entry.0.toText() # " A",
        entry.1,
        "Unidad – ITM para tablero"
      ));
    });

    // Differentials
    if (diffCount > 0) {
      result.add(("Interruptor diferencial 30 mA", diffCount, "Unidad – protección áreas húmedas"));
    };

    // Power factor capacitors
    if (pfComp.needed and pfComp.suggestedBankKVAR > 0.0) {
      let bankKVARNat : Nat = Int.abs(Float.ceil(pfComp.suggestedBankKVAR).toInt());
      result.add((
        "Banco de capacitores automático " # bankKVARNat.toText() # " kVAR",
        1,
        "Unidad – compensación FP según NB 777 Art. 8.3"
      ));
    };

    // Transformer
    switch transformer {
      case (?t) {
        let kvaInt : Nat = Int.abs(Float.ceil(t.selectedKVA).toInt());
        result.add((
          "Transformador " # kvaInt.toText() # " kVA",
          1,
          "Unidad – 6000V/BT, según NB 777 Cap. 6"
        ));
      };
      case null {};
    };

    result.toArray();
  };

  // ─── Energy estimate ───────────────────────────────────────────────────────

  public func energyEstimate(maxDemandVA : Float, cosPhi : Float) : Types.EnergyEstimate {
    let pActiveKW = maxDemandVA * cosPhi / 1000.0;
    let dailyKWh   = pActiveKW * 8.0;
    let monthlyKWh = dailyKWh * 30.0;
    let costBs     = monthlyKWh * 0.59; // SINEC tarifa residencial Bolivia

    {
      dailyUsageHours          = 8.0;
      dailyKWh                 = dailyKWh;
      monthlyKWh               = monthlyKWh;
      estimatedMonthlyCostBs   = costBs;
    };
  };

  // ─── Full calculation orchestration ───────────────────────────────────────

  public func calculate(projectId : Text, input : Types.ProjectInput) : Types.CalculationResult {
    let ft = temperatureFactor(input.ambientTempC, input.conductorType.insulation);
    let totalPower = totalInstalledPowerVA(input.luminaires, input.commonOutlets, input.powerOutlets);
    let (demand, demandSteps) = maxDemandVA(input);
    let cosPhi = input.initialPowerFactor;
    let (lineI, lineStep) = lineCurrentA(demand, input.voltageSystem, cosPhi);

    // Estimate total circuit count for grouping factor
    let estCircuits =
      (input.luminaires.foldLeft(0, func(a, l) { a + l.quantity }) + 14) / 15
      + (input.commonOutlets.foldLeft(0, func(a, o) { a + o.quantity }) + 9) / 10
      + input.powerOutlets.size();
    let fa = groupingFactor(estCircuits);

    let corrI = correctedCurrentA(lineI, ft, fa);

    // Circuit base IDs
    let lightStart  = 1;
    let lightCircuits = designLightingCircuits(input.luminaires, input, ft, fa, lightStart);
    let commonStart = lightStart + lightCircuits.size();
    let commonCircuits = designCommonOutletCircuits(input.commonOutlets, input, ft, fa, commonStart);
    let powerStart = commonStart + commonCircuits.size();
    let powerCircuits = designPowerOutletCircuits(input.powerOutlets, input, ft, fa, powerStart);

    let allCircuits = lightCircuits.concat(commonCircuits.concat(powerCircuits));

    let activePowerW   = demand * cosPhi;
    let sinPhi         = Float.sqrt(1.0 - cosPhi * cosPhi);
    let reactivePowerVAR = demand * sinPhi;

    let fpComp = powerFactorCompensation(activePowerW, cosPhi, 0.95, input.voltageSystem);

    let needsTransformer = switch (input.installationType) {
      case (#industrial) true;
      case (#residential) switch (input.transformerMode) {
        case (#own) true;
        case (#existing) false;
      };
    };
    let transformer : ?Types.TransformerResult = if (needsTransformer) {
      let existKVA : ?Float = switch (input.transformerMode) {
        case (#existing) input.existingTransformerKVA;
        case (#own)      null;
      };
      ?transformerResult(activePowerW, reactivePowerVAR, fpComp.reactiveKVAR, existKVA, input.voltageSystem);
    } else { null };

    // Short-circuit using main cable section
    let mainSection = selectCableSection(corrI, input.conductorType.material);
    let trafoKVA : Float = switch transformer {
      case (?t) t.selectedKVA;
      case null 100.0; // assume 100 kVA public transformer
    };
    let (icc, iccSteps) = shortCircuitCurrentA(
      input.voltageSystem, trafoKVA, 4.0,
      input.distanceToTransformerM, mainSection, input.conductorType.material
    );

    let materials = materialsList(allCircuits, fpComp, transformer);

    let singleLine = asciiSingleLineDiagram(allCircuits, input);
    let floorPlan  = asciiFloorPlan(allCircuits, input);

    // Global warnings
    let globalWarnings = List.empty<Text>();
    if (cosPhi < 0.95) {
      switch (input.installationType) {
        case (#industrial) globalWarnings.add("⚠️ FP = " # floatToText(cosPhi) # " < 0.95 — Compensación obligatoria (NB 777 Art. 8.3 / RTDE)");
        case (#residential) {};
      };
    };
    allCircuits.forEach(func(c : Types.CircuitDesign) {
      if (not c.compliesNB777) {
        globalWarnings.add("❌ Circuito " # c.id # " no cumple NB 777: " # c.description);
      };
    });
    // Verify ITM breaking capacity vs Icc
    let minBreakKA : Float = switch (input.installationType) {
      case (#residential) 5000.0;
      case (#industrial)  10000.0;
    };
    if (icc > minBreakKA) {
      globalWarnings.add("⚠️ Icc = " # floatToText(icc / 1000.0) # " kA — verificar poder de corte de ITMs (mín. " # floatToText(minBreakKA / 1000.0) # " kA)");
    };

    let energy = energyEstimate(demand, cosPhi);

    {
      projectId              = projectId;
      input                  = input;
      maxDemandVA            = demand;
      totalInstalledPowerVA  = totalPower;
      lineCurrentA           = lineI;
      temperatureFactor      = ft;
      groupingFactor         = fa;
      circuits               = allCircuits;
      powerFactorCompensation = fpComp;
      transformer            = transformer;
      asciiSingleLineDiagram = singleLine;
      asciiFloorPlan         = floorPlan;
      materialsList          = materials;
      globalWarnings         = globalWarnings.toArray();
      energyEstimate         = energy;
      demandFormulaSteps     = demandSteps;
      shortCircuitCurrentA   = icc;
      shortCircuitFormulaSteps = iccSteps;
    };
  };

  // ─── Private helpers ───────────────────────────────────────────────────────

  func floatToText(f : Float) : Text {
    // Format to 2 decimal places
    let scaled = (f * 100.0).toInt();
    let abs_scaled = Int.abs(scaled);
    let intPart  = abs_scaled / 100;
    let fracPart = abs_scaled % 100;
    let sign = if (f < 0.0) "-" else "";
    let fracStr = if (fracPart < 10) "0" # fracPart.toText() else fracPart.toText();
    sign # intPart.toText() # "." # fracStr;
  };

  func installTypeText(it : Types.InstallationType) : Text {
    switch it { case (#residential) "Residencial"; case (#industrial) "Industrial" };
  };

  func vsText(vs : Types.VoltageSystem) : Text {
    switch vs {
      case (#mono220) "220V Monofásico";
      case (#tri220)  "220V Trifásico";
      case (#tri380)  "380V Trifásico";
    };
  };
};
