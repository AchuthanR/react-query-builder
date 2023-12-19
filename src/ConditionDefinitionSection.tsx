import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Condition,
} from "./Constants";
import { v4 as uuid } from '@lukeed/uuid';

function ConditionDefinitionSection({ addCondition }: { addCondition: (condition: Condition) => void }) {
  const [conditionName, setConditionName] = useState<string>("");
  
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Condition Definition</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={(e) => {
                e.preventDefault();
                addCondition({ id: uuid(), name: conditionName });
                setConditionName("");
            }}>
                <Form.Group className="mb-3" controlId="formConditionName">
                    <Form.Label>Condition</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter condition name"
                        value={conditionName}
                        onChange={(e) => setConditionName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ConditionDefinitionSection;
