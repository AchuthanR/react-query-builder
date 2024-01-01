import { Attribute, AttributeType, Function, Operator, Validator } from "./Types";
import { v4 as uuid } from '@lukeed/uuid';

export const singleConditionOperators = ["NONE"] as const;
export const groupConditionOperators = ["AND", "OR"] as const;
export const conditionalOperators = ["IF"] as const;

export const attributeCategories: string[] = ["Request", "Item", "Impact"];

export const attributeTypes: AttributeType[] = [
  { name: "Circuit", category: "Item" },
  { name: "Device", category: "Item" },
  { name: "Cable", category: "Item" },
  { name: "Hub", category: "Item" },
  { name: "Ring", category: "Item" },
  { name: "Video Channel", category: "Item" },
  { name: "Cell Site", category: "Item" },
  { name: "Circuit", category: "Impact" },
  { name: "Device", category: "Impact" },
  { name: "Video Channel", category: "Impact" },
  { name: "Application", category: "Impact" },
];

export const attributes: Attribute[] = [
  { id: uuid(), name: "Circuit name", type: "Circuit", category: "Item", dataType: "string" },
  { id: uuid(), name: "Device name", type: "Device", category: "Item", dataType: "string" },
  { id: uuid(), name: "Adjacent devices", type: "Device", category: "Item", dataType: "list<string>" },
  { id: uuid(), name: "Circuit name", type: "Circuit", category: "Impact", dataType: "string" },
  { id: uuid(), name: "Device Impacts count", type: "Device", category: "Impact", dataType: "number" },
];

export const functions: Function[] = [
  { id: uuid(), name: "Suffix", parameters: null, inputDataType: "string", outputDataType: "string" },
  { id: uuid(), name: "Sub-string", parameters: null, inputDataType: "string", outputDataType: "string" },
  { id: uuid(), name: "Split", parameters: null, inputDataType: "string", outputDataType: "list<string>" },
  { id: uuid(), name: "Count", parameters: null, inputDataType: "list<string>", outputDataType: "number" },
  { id: uuid(), name: "Add", parameters: null, inputDataType: "number", outputDataType: "number" },
  { id: uuid(), name: "Multiply", parameters: null, inputDataType: "number", outputDataType: "number" },
];

export const validators: Validator[] = [
  { id: uuid(), name: "Equals", operandsDataTypes: [["string", "string"]] },
  { id: uuid(), name: "Not equals", operandsDataTypes: [["string", "string"]] },
  { id: uuid(), name: "Contains", operandsDataTypes: [["string", "string"], ["list<string>", "string"]] },
  { id: uuid(), name: "Greater than", operandsDataTypes: [["number", "number"]] },
];

export const operators: Operator[] = [
  { id: uuid(), value: "AND", name: "AND - All conditions directly under this group should be satisfied" },
  { id: uuid(), value: "OR", name: "OR - At least one condition directly under this group should be satisified" },
  { id: uuid(), value: "IF", name: "IF - Choose subsequent condition to evaluate based on the outcome of a condition" },
];