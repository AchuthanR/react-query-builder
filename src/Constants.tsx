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

export const singleConditionOperators = ["NONE"] as const;
export const groupConditionOperators = ["AND", "OR"] as const;
export const conditionalOperators = ["IF"] as const;

type SingleConditionOperatorValues =
  (typeof singleConditionOperators)[number];
type GroupConditionOperatorValues =
  (typeof groupConditionOperators)[number];
type ConditionalOperatorValues =
  (typeof conditionalOperators)[number];

export type OperatorValues =
  | SingleConditionOperatorValues
  | GroupConditionOperatorValues
  | ConditionalOperatorValues;

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
