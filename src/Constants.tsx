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
  { name: "Circuit name", attributeType: "Circuit", attributeCategory: "Item", dataType: "string" },
  { name: "Device name", attributeType: "Device", attributeCategory: "Item", dataType: "string" },
  { name: "Adjacent devices", attributeType: "Device", attributeCategory: "Item", dataType: "list<string>" },
  { name: "Circuit name", attributeType: "Circuit", attributeCategory: "Impact", dataType: "string" },
  { name: "Device Impacts count", attributeType: "Device", attributeCategory: "Impact", dataType: "number" },
];

export const functions: Function[] = [
  { name: "Suffix", parameters: "", inputDataType: "string", outputDataType: "string" },
  { name: "Sub-string", parameters: "", inputDataType: "string", outputDataType: "string" },
  { name: "Split", parameters: "", inputDataType: "string", outputDataType: "list<string>" },
  { name: "Count", parameters: "", inputDataType: "list<string>", outputDataType: "number" },
  { name: "Add", parameters: "", inputDataType: "number", outputDataType: "number" },
  { name: "Multiply", parameters: "", inputDataType: "number", outputDataType: "number" },
];

export const validators: Validator[] = [
  { name: "Equals", operandsDataTypes: [["string", "string"]] },
  { name: "Not equals", operandsDataTypes: [["string", "string"]] },
  { name: "Contains", operandsDataTypes: [["string", "string"], ["list<string>", "string"]] },
];

export const operators: Operator[] = [
  { id: uuid(), value: "AND", name: "AND - All conditions directly under this group should be satisfied" },
  { id: uuid(), value: "OR", name: "OR - At least one condition directly under this group should be satisified" },
  { id: uuid(), value: "IF", name: "IF - Choose subsequent condition to evaluate based on the outcome of a condition" },
];