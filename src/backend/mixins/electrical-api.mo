import Types "../types/electrical";
import ElectricalLib "../lib/electrical";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

mixin (
  projects : Map.Map<Text, Types.Project>,
  nextId   : { var value : Nat },
) {

  /// Creates a new project with the given input and returns its generated ID.
  public func createProject(input : Types.ProjectInput) : async Text {
    let id = "proj-" # nextId.value.toText();
    nextId.value += 1;
    let now = Time.now();
    let project : Types.Project = {
      id        = id;
      name      = input.name;
      createdAt = now;
      updatedAt = now;
      input     = input;
      result    = null;
    };
    projects.add(id, project);
    id;
  };

  /// Runs the full NB 777 calculation for a project and persists the result.
  public func calculateProject(projectId : Text) : async ?Types.CalculationResult {
    switch (projects.get(projectId)) {
      case null null;
      case (?proj) {
        let result = ElectricalLib.calculate(projectId, proj.input);
        let updated : Types.Project = {
          proj with
          result    = ?result;
          updatedAt = Time.now();
        };
        projects.add(projectId, updated);
        ?result;
      };
    };
  };

  /// Returns the project with the given ID, or null if not found.
  public query func getProject(id : Text) : async ?Types.Project {
    projects.get(id);
  };

  /// Returns all stored projects as an array.
  public query func listProjects() : async [Types.Project] {
    let list = List.empty<Types.Project>();
    projects.forEach(func(_k, v) { list.add(v) });
    list.toArray();
  };

  /// Deletes a project by ID. Returns true if deleted, false if not found.
  public func deleteProject(id : Text) : async Bool {
    switch (projects.get(id)) {
      case null false;
      case (?_) {
        projects.remove(id);
        true;
      };
    };
  };

  /// Updates the input of an existing project and clears any cached result.
  /// Returns true if updated, false if not found.
  public func updateProjectInput(id : Text, input : Types.ProjectInput) : async Bool {
    switch (projects.get(id)) {
      case null false;
      case (?proj) {
        let updated : Types.Project = {
          proj with
          input     = input;
          result    = null;
          updatedAt = Time.now();
        };
        projects.add(id, updated);
        true;
      };
    };
  };
};
