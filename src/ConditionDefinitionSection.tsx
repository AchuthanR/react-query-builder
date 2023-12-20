import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Condition,
} from "./Constants";
import { v4 as uuid } from '@lukeed/uuid';
import { Card } from "react-bootstrap";

function ConditionDefinitionSection({ addCondition }: { addCondition: (condition: Condition) => void }) {
  const [conditionName, setConditionName] = useState<string>("");

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Condition Definition</Accordion.Header>
          <Accordion.Body>
            <Card className="mb-5">
              <Card.Header>
                <Form.Group className="d-flex flex-row align-items-center gap-3" controlId="formConditionName">
                  <Form.Label className="m-0">Condition 1</Form.Label>
                  <Form.Control
                    className="w-auto"
                    type="text"
                    placeholder="Enter condition name" />
                </Form.Group>
              </Card.Header>
              <Card.Body className="d-flex flex-row">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-row">
                    <Card className="p-3 d-flex flex-row align-items-center gap-3" style={{ width: "100px" }}>
                      This Item
                    </Card>
                    <Card className="p-3 d-flex flex-row align-items-center gap-3">
                      <div className="d-flex flex-column">
                        <Form.Group className="mb-3" controlId="formAttributeCategory">
                          <Form.Label>Attribute category</Form.Label>
                          <Form.Select size="sm" aria-label="Select attribute category">
                            <option>Select attribute category</option>
                            <option value="1">Request</option>
                            <option value="2">Item</option>
                            <option value="3">Impact</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAttributeName">
                          <Form.Label>Attribute name</Form.Label>
                          <Form.Select size="sm" aria-label="Select attribute name">
                            <option>Select attribute name</option>
                            <option value="1">Device name</option>
                            <option value="2">Circuit name</option>
                            <option value="3">Cable name</option>
                            <option value="4">Adjacent devices</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </Card>
                    <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>
                    <Card className="p-3 d-flex flex-row align-items-center gap-3">
                      <div className="d-flex flex-column">
                        <Form.Group className="mb-3" controlId="formFunction">
                          <Form.Label>Function</Form.Label>
                          <Form.Select size="sm" aria-label="Select a function">
                            <option>Select a function</option>
                            <option value="1">Suffix</option>
                            <option value="2">Sub-string</option>
                            <option value="3">Trim spaces</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                          <Form.Label>Input</Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Enter input" />
                        </Form.Group>
                      </div>
                    </Card>
                    <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>
                    <Card className="p-3 d-flex flex-row align-items-center gap-3">
                      <div className="d-flex flex-column">
                        <Form.Group className="mb-3" controlId="formFunction">
                          <Form.Label>Function</Form.Label>
                          <Form.Select size="sm" aria-label="Select a function">
                            <option>Select a function</option>
                            <option value="1">Suffix</option>
                            <option value="2">Sub-string</option>
                            <option value="3">Trim spaces</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                          <Form.Label>Input</Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Enter input" />
                        </Form.Group>
                      </div>
                    </Card>
                    <Button variant="outline-success" className="ml-1 mr-1 align-self-center">+</Button>
                  </div>
                  <div className="d-flex flex-row">
                    <Card className="p-3 d-flex flex-row align-items-center gap-3" style={{ width: "100px" }}>
                      Existing Item
                    </Card>
                    <Card className="p-3 d-flex flex-row align-items-center gap-3">
                      <div className="d-flex flex-column">
                        <Form.Group className="mb-3" controlId="formAttributeCategory">
                          <Form.Label>Attribute category</Form.Label>
                          <Form.Select size="sm" aria-label="Select attribute category">
                            <option>Select attribute category</option>
                            <option value="1">Request</option>
                            <option value="2">Item</option>
                            <option value="3">Impact</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAttributeName">
                          <Form.Label>Attribute name</Form.Label>
                          <Form.Select size="sm" aria-label="Select attribute name">
                            <option>Select attribute name</option>
                            <option value="1">Device name</option>
                            <option value="2">Circuit name</option>
                            <option value="3">Cable name</option>
                            <option value="4">Adjacent devices</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </Card><p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>
                    <Card className="p-3 d-flex flex-row align-items-center gap-3">
                      <div className="d-flex flex-column">
                        <Form.Group className="mb-3" controlId="formFunction">
                          <Form.Label>Function</Form.Label>
                          <Form.Select size="sm" aria-label="Select a function">
                            <option>Select a function</option>
                            <option value="1">Suffix</option>
                            <option value="2">Sub-string</option>
                            <option value="3">Trim spaces</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                          <Form.Label>Input</Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Enter input" />
                        </Form.Group>
                      </div>
                    </Card>
                    <Button variant="outline-success" className="ml-1 mr-1 align-self-center">+</Button>
                  </div>
                </div>
                <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>
                <Card>
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <Form.Group className="mb-3" controlId="formValidator">
                      <Form.Label>Validate</Form.Label>
                      <Form.Select size="sm" aria-label="Select a function">
                        <option>Select a validator</option>
                        <option value="1">Equals</option>
                        <option value="2">Not equals</option>
                        <option value="3">Contains</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formInput">
                      <Form.Label>Input</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Enter input" />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>

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
