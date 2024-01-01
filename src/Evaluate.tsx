import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {
  Operator,
  Condition1,
  Evaluator,
  Path,
  OperatorValues,
} from "./Types";
import { singleConditionOperators, groupConditionOperators, conditionalOperators, operators } from "./Constants";

export default function Evaluate({
  conditions,
  evaluator,
  path,
  addByPath,
  deleteByPath,
  addParentByPath,
  updateConditionByPath,
  updateOperatorByPath,
}: {
  conditions: Condition1[];
  evaluator: Evaluator;
  path: Path;
  addByPath: (path: Path) => void;
  deleteByPath: (path: Path) => void;
  addParentByPath: (path: Path, type: OperatorValues) => void;
  updateConditionByPath: (path: Path, condition: Condition1) => void;
  updateOperatorByPath: (path: Path, operator: OperatorValues) => void;
}) {
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
            value={evaluator.operator}
            onChange={(e) => {
              updateOperatorByPath(path, e.target.value as OperatorValues);
            }}
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
            value={evaluator.condition?.id + "," + evaluator.condition?.name}
            onChange={(e) => {
              const [id, name] = e.target.value.split(",");
              let newCondition: Condition1 = {
                id: id,
                name: name
              };
              updateConditionByPath(path, newCondition);
            }}
          >
            <option value={undefined}>Select a condition</option>
            {conditions.map((condition) => (
              <option key={condition.id} value={[condition.id, condition.name]}>
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
              conditions={conditions}
              evaluator={subNode}
              path={[...path, ["subNodes", index]]}
              addByPath={addByPath}
              deleteByPath={deleteByPath}
              addParentByPath={addParentByPath}
              updateConditionByPath={updateConditionByPath}
              updateOperatorByPath={updateOperatorByPath}
            />
          ))}
        </Card.Body>
      )}

      {isConditionalEvaluator(evaluator) && (
        <Card.Body className="pl-2 pr-5 pt-3 pb-3 d-flex flex-column gap-3">
          {evaluator.evaluation && (
            <div className="d-flex flex-row gap-2">
              <p className="m-0 mt-3" style={{ width: "100px" }}>
                when
              </p>
              <Evaluate
                conditions={conditions}
                evaluator={evaluator.evaluation}
                path={[...path, "evaluation"]}
                addByPath={addByPath}
                deleteByPath={deleteByPath}
                addParentByPath={addParentByPath}
                updateConditionByPath={updateConditionByPath}
                updateOperatorByPath={updateOperatorByPath}
              />
            </div>
          )}
          {evaluator.conditionalSubNodes && (
            <div className="d-flex flex-row align-items-center gap-2">
              <p className="m-0" style={{ width: "100px" }}>
                is satisfied, then
              </p>
              <Evaluate
                conditions={conditions}
                evaluator={evaluator.conditionalSubNodes[0]}
                path={[...path, "conditionalSubNodes"]}
                addByPath={addByPath}
                deleteByPath={deleteByPath}
                addParentByPath={addParentByPath}
                updateConditionByPath={updateConditionByPath}
                updateOperatorByPath={updateOperatorByPath}
              />
            </div>
          )}
          {evaluator.subNodes && (
            <div className="d-flex flex-row align-items-center gap-2">
              <p className="m-0" style={{ width: "100px" }}>
                is not satisfied, then
              </p>
              <Evaluate
                conditions={conditions}
                evaluator={evaluator.subNodes[0]}
                path={[...path, "subNodes"]}
                addByPath={addByPath}
                deleteByPath={deleteByPath}
                addParentByPath={addParentByPath}
                updateConditionByPath={updateConditionByPath}
                updateOperatorByPath={updateOperatorByPath}
              />
            </div>
          )}
        </Card.Body>
      )}
    </Card>
  );
}
