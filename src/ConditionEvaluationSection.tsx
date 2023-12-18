import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Evaluate from "./Evaluate";
import {
  GroupConditionCombinator,
  IfThenElseConditionCombinator,
  Combinator,
  Condition,
  Query,
  Path,
  GroupConditionCombinatorValues,
  IfThenElseConditionCombinatorValue,
  SingleConditionQuery,
  GroupConditionQuery,
  IfThenElseConditionQuery,
} from "./Constants";

function ConditionEvaluationSection() {
  const initialQuery: Query = {
    id: 1,
    combinator: "AND",
    conditions: [
      {
        id: 2,
        combinator: "NONE",
        condition: { id: -1 },
      },
      {
        id: 3,
        combinator: "AND",
        conditions: [
          {
            id: 4,
            combinator: "NONE",
            condition: { id: -1 },
          },
        ],
      },
      {
        id: 5,
        combinator: "NONE",
        condition: undefined,
      },
      {
        id: 6,
        combinator: "AND",
        conditions: [
          {
            id: 7,
            combinator: "NONE",
            condition: undefined,
          },
        ],
      },
      {
        id: 8,
        combinator: "IF",
        ifCondition: {
          id: 9,
          combinator: "AND",
          conditions: [
            {
              id: 10,
              combinator: "NONE",
              condition: undefined,
            },
          ],
        },
        thenCondition: {
          id: 12,
          combinator: "NONE",
          condition: { id: -1 },
        },
        elseCondition: {
          id: 13,
          combinator: "NONE",
          condition: { id: -1 },
        },
      },
    ],
  };

  const groupConditionCombinators: GroupConditionCombinator[] = [
    { id: 1, value: "AND", name: "and" },
    { id: 2, value: "OR", name: "or" },
  ];

  const ifThenElseConditionCombinators: IfThenElseConditionCombinator[] = [
    { id: 3, value: "IF", name: "if then else" },
  ];

  const combinators: Combinator[] = [
    ...groupConditionCombinators,
    ...ifThenElseConditionCombinators,
  ];

  const conditions: Condition[] = [
    { id: 1, name: "Same device name" },
    { id: 2, name: "This Item's country is USA" },
    { id: 3, name: "Existing Item's country is USA" },
    { id: 4, name: "Same state" },
    { id: 5, name: "Same country" },
  ];

  const [query, setQuery] = useState<Query>(initialQuery);

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

  function deleteNestedQuery(path: Path) {
    let current = query;
    for (let i = 0; i < path.length - 1; i++) {
      if (current && typeof current === "object") {
        const ele = path[i];
        let key: string;
        let index: number = -1;
        if (Array.isArray(ele)) {
          key = ele[0];
          index = ele[1];
        } else {
          key = ele;
        }
        if (isGroupConditionQuery(current) && index !== -1) {
          current = current.conditions[index];
        } else if (isIfThenElseConditionQuery(current)) {
          if (key === "ifCondition") {
            current = current.ifCondition;
          } else if (key === "thenCondition") {
            current = current.thenCondition;
          } else if (key === "elseCondition") {
            current = current.elseCondition;
          }
        }
      }
    }

    const lastKey = path[path.length - 1];
    if (current && typeof current === "object") {
      let key: string;
      let index: number = -1;
      if (Array.isArray(lastKey)) {
        key = lastKey[0];
        index = lastKey[1];
      } else {
        key = lastKey;
      }
      if (isGroupConditionQuery(current) && index !== -1) {
        const updatedConditions = [...current.conditions];
        updatedConditions.splice(index, 1);
        current.conditions = updatedConditions;
      } else if (isIfThenElseConditionQuery(current)) {
        const singleConditionEvaluate: SingleConditionQuery = {
          id: 10,
          combinator: "NONE",
          condition: undefined,
        };
        if (key === "ifCondition") {
          current.ifCondition = singleConditionEvaluate;
        } else if (key === "thenCondition") {
          current.thenCondition = singleConditionEvaluate;
        } else if (key === "elseCondition") {
          current.elseCondition = singleConditionEvaluate;
        }
      }
    }

    setQuery(query);
  }

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Condition Evaluation</Accordion.Header>
          <Accordion.Body>
            <Evaluate
              groupConditionCombinators={groupConditionCombinators}
              ifThenElseConditionCombinators={ifThenElseConditionCombinators}
              combinators={combinators}
              conditions={conditions}
              query={query}
              path={[]}
              deleteNestedQuery={deleteNestedQuery}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ConditionEvaluationSection;
