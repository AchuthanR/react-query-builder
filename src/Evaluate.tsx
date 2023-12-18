import {
  GroupConditionCombinator,
  IfThenElseConditionCombinator,
  Combinator,
  Condition,
  Query,
  Path,
  SingleConditionCombinatorValue,
  GroupConditionCombinatorValues,
  IfThenElseConditionCombinatorValue,
  SingleConditionQuery,
  GroupConditionQuery,
  IfThenElseConditionQuery,
} from "./Constants";
import SingleConditionEvaluate from "./SingleConditionEvaluate";
import GroupConditionEvaluate from "./GroupConditionEvaluate";
import IfThenElseConditionEvaluate from "./IfThenElseConditionEvaluate ";

export default function Evaluate({
  groupConditionCombinators,
  ifThenElseConditionCombinators,
  combinators,
  conditions,
  query,
  path,
  deleteNestedQuery,
}: {
  groupConditionCombinators: GroupConditionCombinator[];
  ifThenElseConditionCombinators: IfThenElseConditionCombinator[];
  combinators: Combinator[];
  conditions: Condition[];
  query: Query | undefined;
  path: Path;
  deleteNestedQuery: (path: Path) => void;
}) {
  function isSingleConditionQuery(query: Query): query is SingleConditionQuery {
    return query.combinator === SingleConditionCombinatorValue;
  }

  function isGroupConditionQuery(query: Query): query is GroupConditionQuery {
    return (
      GroupConditionCombinatorValues.find(
        (value) => value === query.combinator
      ) !== undefined
    );
  }

  function isIfThenElseConditionQuery(
    query: Query
  ): query is IfThenElseConditionQuery {
    return query.combinator === IfThenElseConditionCombinatorValue;
  }

  return (
    <>
      {(!query || isSingleConditionQuery(query)) && (
        <SingleConditionEvaluate
          combinators={combinators}
          conditions={conditions}
          query={query}
          path={path}
          deleteNestedQuery={deleteNestedQuery}
        />
      )}
      {query && isGroupConditionQuery(query) && (
        <GroupConditionEvaluate
          groupConditionCombinators={groupConditionCombinators}
          ifThenElseConditionCombinators={ifThenElseConditionCombinators}
          combinators={combinators}
          conditions={conditions}
          query={query}
          path={path}
          deleteNestedQuery={deleteNestedQuery}
        />
      )}
      {query && isIfThenElseConditionQuery(query) && (
        <IfThenElseConditionEvaluate
          groupConditionCombinators={groupConditionCombinators}
          ifThenElseConditionCombinators={ifThenElseConditionCombinators}
          combinators={combinators}
          conditions={conditions}
          query={query}
          path={path}
          deleteNestedQuery={deleteNestedQuery}
        />
      )}
    </>
  );
}
