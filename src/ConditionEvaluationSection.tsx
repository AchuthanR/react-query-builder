import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Evaluate from "./Evaluate";
import {
  OperatorValues,
  Condition1,
  Evaluator,
  Path,
} from "./Types";
import { groupConditionOperators, conditionalOperators } from "./Constants";
import { v4 as uuid } from '@lukeed/uuid';

function ConditionEvaluationSection({ conditions }: { conditions: Condition1[] }) {
  const [evaluator, setEvaluator] = useState<Evaluator>({
    id: uuid(),
    operator: "NONE",
    condition: undefined,
  });

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

  const traverseByPath = (path: Path, current: Evaluator): Evaluator => {
    for (let i = 0; i < path.length; i++) {
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

    return current;
  }

  const addByPath = (path: Path) => {
    let newEvaluator = { ...evaluator };
    let current = traverseByPath(path, newEvaluator);
    const singleConditionEvaluate: Evaluator = {
      id: uuid(),
      operator: "NONE",
      condition: undefined,
    };
    current.subNodes?.splice(0, 0, singleConditionEvaluate);

    setEvaluator(newEvaluator);
  }

  const deleteByPath = (path: Path) => {
    let newEvaluator = { ...evaluator };
    const singleConditionEvaluate: Evaluator = {
      id: uuid(),
      operator: "NONE",
      condition: undefined,
    };

    if (path.length > 0) {
      let current = traverseByPath(path.slice(0, path.length - 1), newEvaluator);

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
          if (key === "evaluation") {
            current.evaluation = singleConditionEvaluate;
          } else if (key === "conditionalSubNodes" && current.conditionalSubNodes) {
            current.conditionalSubNodes[0] = singleConditionEvaluate;
          } else if (key === "subNodes" && current.subNodes) {
            current.subNodes[0] = singleConditionEvaluate;
          }
        }
      }
    }
    else {
      newEvaluator = singleConditionEvaluate;
    }

    setEvaluator(newEvaluator);
  }

  const getNewParent = (current: Evaluator, operator: OperatorValues) => {
    let newParent: Evaluator | undefined;
    
    if (groupConditionOperators.find((value) => value === operator) !== undefined) {
      newParent = {
        id: uuid(),
        operator: operator,
        subNodes: [
          current,
          {
            id: uuid(),
            operator: "NONE",
            condition: undefined,
          },
        ],
      };
    }
    else if (conditionalOperators.find((value) => value === operator) !== undefined) {
      newParent = {
        id: uuid(),
        operator: "IF",
        evaluation: current,
        conditionalSubNodes: [{
          id: uuid(),
          operator: "NONE",
          condition: undefined,
        }],
        subNodes: [{
          id: uuid(),
          operator: "NONE",
          condition: undefined,
        }],
      };
    }

    return newParent;
  }

  const addParentByPath = (path: Path, operator: OperatorValues) => {
    let newEvaluator = { ...evaluator };
    let current: Evaluator;
    if (path.length > 0) {
      current = traverseByPath(path.slice(0, path.length - 1), newEvaluator);

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
          let newParent = getNewParent(current.subNodes[index], operator);
          if (newParent) {
            const updatedConditions = [...current.subNodes];
            updatedConditions.splice(index, 1, newParent);
            current.subNodes = updatedConditions;
          }
        } else if (isConditionalEvaluator(current)) {
          if (key === "evaluation" && current.evaluation) {
            current.evaluation = getNewParent(current.evaluation, operator);
          } else if (key === "conditionalSubNodes" && current.conditionalSubNodes) {
            let newParent = getNewParent(current.conditionalSubNodes[0], operator);
            if (newParent) {
              current.conditionalSubNodes[0] = newParent;
            }
          } else if (key === "subNodes" && current.subNodes) {
            let newParent = getNewParent(current.subNodes[0], operator);
            if (newParent) {
              current.subNodes[0] = newParent;
            }
          }
        }
      }
    }
    else {
      let newParent = getNewParent(newEvaluator, operator);
      if (newParent) {
        newEvaluator = newParent;
      }
    }

    setEvaluator(newEvaluator);
  }

  const updateConditionByPath = (path: Path, condition: Condition1) => {
    let newEvaluator = { ...evaluator };
    let current = traverseByPath(path, newEvaluator);
    current.condition = condition;
    setEvaluator(newEvaluator);
  }

  const updateOperatorByPath = (path: Path, operator: OperatorValues) => {
    let newEvaluator = { ...evaluator };
    let current = traverseByPath(path, newEvaluator);
    current.operator = operator;
    setEvaluator(newEvaluator);
  }

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Condition Evaluation</Accordion.Header>
          <Accordion.Body>
            <Evaluate
              conditions={conditions}
              evaluator={evaluator}
              path={[]}
              addByPath={addByPath}
              deleteByPath={deleteByPath}
              addParentByPath={addParentByPath}
              updateConditionByPath={updateConditionByPath}
              updateOperatorByPath={updateOperatorByPath}
            />

            <Accordion className="mt-5">
              <Accordion.Item eventKey="0">
                <Accordion.Header>JSON</Accordion.Header>
                <Accordion.Body>
                  <pre>{JSON.stringify(evaluator, null, 4)}</pre>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ConditionEvaluationSection;
