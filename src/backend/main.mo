import Types "types/electrical";
import ElectricalMixin "mixins/electrical-api";
import Map "mo:core/Map";
import Text "mo:core/Text";

actor ElectroCalc {
  let projects = Map.empty<Text, Types.Project>();
  let nextId = { var value : Nat = 0 };

  include ElectricalMixin(projects, nextId);
};
