export const SingleConditionCombinatorValue = "NONE";
export const GroupConditionCombinatorValues = ["AND", "OR"] as const;
export const IfThenElseConditionCombinatorValue = "IF";

type SingleConditionCombinatorValuesType =
  typeof SingleConditionCombinatorValue;
type GroupConditionCombinatorValuesType =
  (typeof GroupConditionCombinatorValues)[number];
type IfThenElseConditionCombinatorValuesType =
  typeof IfThenElseConditionCombinatorValue;

type CombinatorValues =
  | SingleConditionCombinatorValuesType
  | GroupConditionCombinatorValuesType
  | IfThenElseConditionCombinatorValuesType;

export type Combinator = {
  id: number;
  value: CombinatorValues;
  name: string;
};

export type SingleConditionCombinator = {
  id: number;
  value: SingleConditionCombinatorValuesType;
  name: string;
};

export type GroupConditionCombinator = {
  id: number;
  value: GroupConditionCombinatorValuesType;
  name: string;
};

export type IfThenElseConditionCombinator = {
  id: number;
  value: IfThenElseConditionCombinatorValuesType;
  name: string;
};

export type Condition = { id: number; name?: string };

export type SingleConditionQuery = {
  id: number;
  combinator: SingleConditionCombinatorValuesType;
  condition: Condition | undefined;
};

export type GroupConditionQuery = {
  id: number;
  combinator: GroupConditionCombinatorValuesType;
  conditions: Query[];
};

export type IfThenElseConditionQuery = {
  id: number;
  combinator: IfThenElseConditionCombinatorValuesType;
  ifCondition: Query;
  thenCondition: Query;
  elseCondition: Query;
};

export type Query =
  | SingleConditionQuery
  | GroupConditionQuery
  | IfThenElseConditionQuery;

export type Path = (string | [string, number])[];
