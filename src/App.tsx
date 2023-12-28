import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ConditionDefinitionSection from "./ConditionDefinitionSection";
import ConditionEvaluationSection from "./ConditionEvaluationSection";
import { Attribute, AttributeType, Condition1, Function, Validator } from "./Constants";
import { v4 as uuid } from '@lukeed/uuid';

function App() {
  const attributeCategories: string[] = ["Request", "Item", "Impact"];

  const attributeTypes: AttributeType[] = [
    { name: "Circuit", category: "Item" },
    { name: "Device", category: "Item" },
    { name: "Cable", category: "Item" },
    { name: "Hub", category: "Item" },
    { name: "Ring", category: "Item" },
    { name: "Video Office", category: "Item" },
    { name: "Cell Site", category: "Item" },
    { name: "Circuit", category: "Impact" },
    { name: "Device", category: "Impact" },
    { name: "Video Channel", category: "Impact" },
    { name: "Application", category: "Impact" },
  ];

  const attributes: Attribute[] = [
    { name: "Circuit name", attributeType: "Circuit", attributeCategory: "Item", dataType: "string" },
    { name: "Device name", attributeType: "Device", attributeCategory: "Item", dataType: "string" },
    { name: "Adjacent devices", attributeType: "Device", attributeCategory: "Item", dataType: "list<string>" },
    { name: "Circuit name", attributeType: "Circuit", attributeCategory: "Impact", dataType: "string" },
    { name: "Device Impacts count", attributeType: "Device", attributeCategory: "Impact", dataType: "number" },
  ];

  const functions: Function[] = [
    { name: "Suffix", parameters: "", inputDataType: "string", outputDataType: "string" },
    { name: "Sub-string", parameters: "", inputDataType: "string", outputDataType: "string" },
    { name: "Split", parameters: "", inputDataType: "string", outputDataType: "list<string>" },
    { name: "Count", parameters: "", inputDataType: "list<string>", outputDataType: "number" },
    { name: "Add", parameters: "", inputDataType: "number", outputDataType: "number" },
    { name: "Multiply", parameters: "", inputDataType: "number", outputDataType: "number" },
  ];

  const validators: Validator[] = [
    { name: "Equals", operandsDataTypes: [["string", "string"]] },
    { name: "Not equals", operandsDataTypes: [["string", "string"]] },
    { name: "Contains", operandsDataTypes: [["string", "string"], ["list<string>", "string"]] },
  ];

  const [conditions, setConditions] = useState<Condition1[]>([
    { id: uuid(), name: "Same device name" },
    { id: uuid(), name: "This Item's country is USA" },
    { id: uuid(), name: "Existing Item's country is USA" },
    { id: uuid(), name: "Same state" },
    { id: uuid(), name: "Same country" },
  ]);

  const addCondition = (condition: Condition1) => {
    setConditions([...conditions, condition]);
  }

  return (
    <div className="d-flex flex-column gap-5">
      <ConditionDefinitionSection
        attributeCategories={attributeCategories}
        attributeTypes={attributeTypes}
        attributes={attributes}
        functions={functions}
        validators={validators}
        addCondition={addCondition} />
      <ConditionEvaluationSection conditions={conditions} />
    </div>
  );
}

export default App;
