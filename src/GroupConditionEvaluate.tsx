import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Evaluate from "./Evaluate";
import {
  GroupConditionCombinator,
  IfThenElseConditionCombinator,
  Combinator,
  Condition,
  Path,
  GroupConditionQuery,
} from "./Constants";

export default function GroupConditionEvaluate({
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
  query: GroupConditionQuery;
  path: Path;
  deleteNestedQuery: (path: Path) => void;
}) {
  const [selectedCombinator, setSelectedCombinator] = useState<
    string | undefined
  >(
    combinators.find((combinator) => combinator.value === query.combinator)
      ?.value
  );

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header className="p-2 d-flex flex-row gap-2">
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
            aria-label="Combinator"
            value={selectedCombinator}
            onChange={(e) => setSelectedCombinator(e.target.value)}
          >
            {groupConditionCombinators.map((combinator) => (
              <option key={combinator.id} value={combinator.value}>
                {combinator.name}
              </option>
            ))}
          </Form.Select>

          <div className="ml-auto d-flex flex-row align-items-center gap-2">
            {path.length !== 0 && (
              <Button
                variant="outline-danger"
                onClick={() => deleteNestedQuery(path)}
              >
                X
              </Button>
            )}
            <Accordion.Button className="p-2 w-auto bg-transparent shadow-none" />
          </div>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-2 d-flex flex-column gap-2">
            {query.conditions.map((condition, index) => (
              <Evaluate
                key={condition.id}
                groupConditionCombinators={groupConditionCombinators}
                ifThenElseConditionCombinators={ifThenElseConditionCombinators}
                combinators={combinators}
                conditions={conditions}
                query={condition}
                path={[...path, ["conditions", index]]}
                deleteNestedQuery={deleteNestedQuery}
              />
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
