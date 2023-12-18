import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Evaluate from "./Evaluate";
import {
  Operator,
  Condition,
  Evaluator,
  Path,
  groupConditionOperators,
  conditionalOperators,
} from "./Constants";

function ConditionEvaluationSection() {
  const initialEvaluator: Evaluator = {
    id: 1,
    operator: "AND",
    subNodes: [
      {
        id: 2,
        operator: "NONE",
        condition: undefined,
      },
      {
        id: 3,
        operator: "AND",
        subNodes: [
          {
            id: 4,
            operator: "NONE",
            condition: undefined,
          },
        ],
      },
      {
        id: 5,
        operator: "NONE",
        condition: undefined,
      },
      {
        id: 6,
        operator: "AND",
        subNodes: [
          {
            id: 7,
            operator: "NONE",
            condition: undefined,
          },
        ],
      },
      {
        id: 8,
        operator: "IF",
        evaluation: {
          id: 9,
          operator: "AND",
          subNodes: [
            {
              id: 10,
              operator: "NONE",
              condition: undefined,
            },
          ],
        },
        conditionalSubNodes: [{
          id: 12,
          operator: "NONE",
          condition: undefined,
        }],
        subNodes: [{
          id: 13,
          operator: "NONE",
          condition: undefined,
        }],
      },
    ],
  };
  
  const [evaluator, setEvaluator] = useState<Evaluator>(initialEvaluator);

  const operators: Operator[] = [
    { id: 1, value: "AND", name: "and" },
    { id: 2, value: "OR", name: "or" },
    { id: 3, value: "IF", name: "if then else" },
  ];

  const conditions: Condition[] = [
    { id: 1, name: "Same device name" },
    { id: 2, name: "This Item's country is USA" },
    { id: 3, name: "Existing Item's country is USA" },
    { id: 4, name: "Same state" },
    { id: 5, name: "Same country" },
  ];

  function isGroupConditionEvaluator(evaluator: Evaluator) {
    return (
      groupConditionOperators.find(
        (value) => value === evaluator.operator
      ) !== undefined
    );
  }

  function isConditionalEvaluator(evaluator: Evaluator) {
    return (
      conditionalOperators.find(
        (value) => value === evaluator.operator
      ) !== undefined
    );
  }

  const deleteByPath = (path: Path) => {
    let current = evaluator;
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
        if (isGroupConditionEvaluator(current) && index !== -1 && current.subNodes?.[index]) {
          current = current.subNodes[index];
        } else if (isConditionalEvaluator(current)) {
          if (key === "evaluation" && current.evaluation) {
            current = current.evaluation;
          } else if (key === "conditionalSubNodes" && current.conditionalSubNodes?.[0]) {
            current = current.conditionalSubNodes[0];
          } else if (key === "subNodes" && current.subNodes?.[0]) {
            current = current.subNodes[0];
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
      if (isGroupConditionEvaluator(current) && index !== -1 && current.subNodes) {
        const updatedConditions = [...current.subNodes];
        updatedConditions.splice(index, 1);
        current.subNodes = updatedConditions;
      } else if (isConditionalEvaluator(current)) {
        const singleConditionEvaluate: Evaluator = {
          id: 10,
          operator: "NONE",
          condition: undefined,
        };
        if (key === "evaluation") {
          current.evaluation = singleConditionEvaluate;
        } else if (key === "conditionalSubNodes" && current.conditionalSubNodes) {
          current.conditionalSubNodes[0] = singleConditionEvaluate;
        } else if (key === "subNodes" && current.subNodes) {
          current.subNodes[0] = singleConditionEvaluate;
        }
      }
    }

    setEvaluator(evaluator);
  }

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Condition Evaluation</Accordion.Header>
          <Accordion.Body>
            <Evaluate
              operators={operators}
              conditions={conditions}
              evaluator={evaluator}
              path={[]}
              deleteByPath={deleteByPath}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ConditionEvaluationSection;
