import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Condition, Combinator, Path, SingleConditionQuery } from "./Constants";

export default function SingleConditionEvaluate({
  combinators,
  conditions,
  query,
  path,
  deleteNestedQuery,
}: {
  combinators: Combinator[];
  conditions: Condition[];
  query: SingleConditionQuery | undefined;
  path: Path;
  deleteNestedQuery: (path: Path) => void;
}) {
  const [selectedCondition, setSelectedCondition] = useState<
    number | undefined
  >(query?.condition?.id);

  return (
    <Card>
      <Card.Body className="p-2 d-flex flex-row gap-2">
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle split variant="outline-primary border-right-0" />
          <Dropdown.ItemText className="border border-primary rounded-right text-primary">
            Evaluate
          </Dropdown.ItemText>
          <Dropdown.Menu>
            <Dropdown.Header>Add a parent Evaluate</Dropdown.Header>
            {combinators.map((combinator) => (
              <Dropdown.Item key={combinator.id} as="button">
                {"Evaluate " + combinator.name}
              </Dropdown.Item>
            ))}
            {path.length !== 0 && Array.isArray(path[path.length - 1]) && (
              <>
                <Dropdown.Header>Add sibling Evaluate</Dropdown.Header>
                <Dropdown.Item as="button">Add Evaluate above</Dropdown.Item>
                <Dropdown.Item as="button">Add Evaluate below</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Select
          className="w-auto"
          aria-label="Condition"
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(Number(e.target.value))}
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
            onClick={() => deleteNestedQuery(path)}
          >
            X
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
