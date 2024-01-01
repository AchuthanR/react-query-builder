import { conditionalOperators, groupConditionOperators, singleConditionOperators } from "./Constants";

export type RuleDetails = {
  ruleName: string | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null;
  detectConflictsWithinSameRequest: boolean | null;
  itemTypes: string[] | null;
  conflictTypes: string[] | null;
};

export type AttributeType = {
  name: string;
  category: string;
};

export type Attribute = {
  id?: string;
  name: string | null;
  type: string | null;
  category: string | null;
  dataType: string | null;
};

export type Function = {
  id?: string;
  name: string | null;
  parameters: string | null;
  inputDataType: string | null;
  outputDataType: string | null;
};

export type Validator = {
  id?: string;
  name: string | null;
  operandsDataTypes: [string, string][] | null;
};

export type Condition = {
  id: string;
  name: string | null;
  thisItemAttribute: Attribute | null;
  existingItemAttribute: Attribute | null;
  thisItemFunctions: Function[] | null;
  existingItemFunctions: Function[] | null;
  validator: Validator;
  validationInput: string | null;
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
  condition?: Condition1 | null;
  subNodes?: Evaluator[];
  evaluation?: Evaluator;
  conditionalSubNodes?: Evaluator[];
};

export type Path = (string | [string, number])[];
