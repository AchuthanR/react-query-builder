import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {
  Operator,
  Condition,
  Evaluator,
  Path,
  singleConditionOperators,
  groupConditionOperators,
  conditionalOperators,
  OperatorValues,
} from "./Constants";

export default function Evaluate({
  operators,
  conditions,
  evaluator,
  path,
  addByPath,
  deleteByPath,
  addParentByPath,
}: {
  operators: Operator[];
  conditions: Condition[];
  evaluator: Evaluator;
  path: Path;
  addByPath: (path: Path) => void;
  deleteByPath: (path: Path) => void;
  addParentByPath: (path: Path, type: OperatorValues) => void;
}) {
  const [selectedCondition, setSelectedCondition] = useState<
    string | undefined
  >(evaluator?.condition?.id);
  const [selectedOperator, setSelectedOperator] = useState<
    string | undefined
  >(
    operators.find((operator) => operator.value === evaluator.operator)
      ?.value
  );

  function isSingleConditionEvaluator(evaluator: Evaluator) {
    return (
      singleConditionOperators.find(
        (value) => value === evaluator.operator
      ) !== undefined
    );
  }

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

  let applicableOperators: Operator[] = [];
  if (isGroupConditionEvaluator(evaluator)) {
    applicableOperators = operators.filter(operator => groupConditionOperators.find(value => value === operator.value));
  }
  else if (isConditionalEvaluator(evaluator)) {
    applicableOperators = operators.filter(operator => conditionalOperators.find(value => value === operator.value));
  }
  
  return (
    <Card>
      {!isSingleConditionEvaluator(evaluator) && (
        <Card.Header className="p-2 d-flex flex-row gap-2">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle split variant="outline-primary border-right-0" />
            <Dropdown.ItemText className="border border-primary rounded-right text-primary">
              Evaluate
            </Dropdown.ItemText>
            <Dropdown.Menu>
              <Dropdown.Header>Add a parent Evaluate</Dropdown.Header>
              {operators.map((operator) => (
                <Dropdown.Item key={operator.id} as="button" onClick={() => addParentByPath(path, operator.value)}>
                  {"Evaluate " + operator.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Select
            className="w-auto"
            aria-label="Combinator"
            value={selectedOperator}
            onChange={(e) => setSelectedOperator(e.target.value)}
            disabled={applicableOperators.length <= 1}
          >
            {applicableOperators.map((operator) => (
              <option key={operator.id} value={operator.value}>
                {operator.name}
              </option>
            ))}
          </Form.Select>

          {isGroupConditionEvaluator(evaluator) && <Button variant="outline-success" onClick={() => addByPath(path)}>+</Button>}

          <Button
            variant="outline-danger"
            className="ml-auto"
            onClick={() => deleteByPath(path)}
          >
            X
          </Button>
        </Card.Header>
      )}

      {isSingleConditionEvaluator(evaluator) && (
        <Card.Body className="p-2 d-flex flex-row gap-2">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle split variant="outline-primary border-right-0" />
            <Dropdown.ItemText className="border border-primary rounded-right text-primary">
              Evaluate
            </Dropdown.ItemText>
            <Dropdown.Menu>
              <Dropdown.Header>Add a parent Evaluate</Dropdown.Header>
              {operators.map((operator) => (
                <Dropdown.Item key={operator.id} as="button" onClick={() => addParentByPath(path, operator.value)}>
                  {"Evaluate " + operator.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
  
          <Form.Select
            className="w-auto"
            aria-label="Condition"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
          >
            <option value={undefined}>Select a condition</option>
            {conditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </Form.Select>
  
          {path && Array.isArray(path[path.length - 1]) && (
            <Button
              variant="outline-danger"
              className="ml-auto"
              onClick={() => deleteByPath(path)}
            >
              X
            </Button>
          )}
        </Card.Body>
      )}

      {isGroupConditionEvaluator(evaluator) && (
        <Card.Body className="pl-5 pr-5 pt-3 pb-3 d-flex flex-column gap-3">
          {evaluator.subNodes?.map((subNode, index) => (
            <Evaluate
              key={subNode.id}
              operators={operators}
              conditions={conditions}
              evaluator={subNode}
              path={[...path, ["subNodes", index]]}
              addByPath={addByPath}
              deleteByPath={deleteByPath}
              addParentByPath={addParentByPath}
            />
          ))}
        </Card.Body>
      )}

      {isConditionalEvaluator(evaluator) && (
        <Card.Body className="pl-2 pr-5 pt-3 pb-3 d-flex flex-column gap-3">
          {evaluator.evaluation && (
            <div className="d-flex flex-row gap-2">
              <p className="m-0 mt-3" style={{ width: "40px" }}>
                if
              </p>
              <Evaluate
                operators={operators}
                conditions={conditions}
                evaluator={evaluator.evaluation}
                path={[...path, "evaluation"]}
                addByPath={addByPath}
                deleteByPath={deleteByPath}
                addParentByPath={addParentByPath}
              />
            </div>
          )}
          {evaluator.conditionalSubNodes && (
            <div className="d-flex flex-row align-items-center gap-2">
              <p className="m-0" style={{ width: "40px" }}>
                then
              </p>
              <Evaluate
                operators={operators}
                conditions={conditions}
                evaluator={evaluator.conditionalSubNodes[0]}
                path={[...path, "conditionalSubNodes"]}
                addByPath={addByPath}
                deleteByPath={deleteByPath}
                addParentByPath={addParentByPath}
              />
            </div>
          )}
          {evaluator.subNodes && (
            <div className="d-flex flex-row align-items-center gap-2">
              <p className="m-0" style={{ width: "40px" }}>
                else
              </p>
              <Evaluate
                operators={operators}
                conditions={conditions}
                evaluator={evaluator.subNodes[0]}
                path={[...path, "subNodes"]}
                addByPath={addByPath}
                deleteByPath={deleteByPath}
                addParentByPath={addParentByPath}
              />
            </div>
          )}
        </Card.Body>
      )}
    </Card>
  );
}
