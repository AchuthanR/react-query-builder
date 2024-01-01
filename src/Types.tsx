import { conditionalOperators, groupConditionOperators, singleConditionOperators } from "./Constants";

export type RuleDetails = {
  ruleName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  detectConflictsWithinSameRequest: boolean;
  itemTypes: string[];
  conflictTypes: string[];
};

export type AttributeType = {
  name: string;
  category: string;
};

export type Attribute = {
  name: string;
  attributeType: string;
  attributeCategory: string;
  dataType: string;
};

export type Function = {
  name: string;
  parameters: string;
  inputDataType: string;
  outputDataType: string;
};

export type Validator = {
  name: string;
  operandsDataTypes: [string, string][];
};

export type Condition = {
  name: string;
  thisItemAttribute: Attribute;
  existingItemAttribute: Attribute;
  thisItemFunctions: Function[];
  existingItemFunctions: Function[];
  validator: Validator;
  validationInput: string;
};

export type OperatorValues =
  | (typeof singleConditionOperators)[number]
  | (typeof groupConditionOperators)[number]
  | (typeof conditionalOperators)[number];

export type Operator = {
  id: string;
  value: OperatorValues;
  name: string;
};

export type Condition1 = { id: string; name: string };

export type Evaluator = {
  id: string;
  operator: OperatorValues;
  condition?: Condition1 | undefined;
  subNodes?: Evaluator[];
  evaluation?: Evaluator;
  conditionalSubNodes?: Evaluator[];
};

export type Path = (string | [string, number])[];
