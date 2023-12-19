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
  id: number;
  value: OperatorValues;
  name: string;
};

export type Condition = { id: number; name: string };

export type Evaluator = {
  id: number;
  operator: OperatorValues;
  condition?: Condition | undefined;
  subNodes?: Evaluator[];
  evaluation?: Evaluator;
  conditionalSubNodes?: Evaluator[];
};

export type Path = (string | [string, number])[];
