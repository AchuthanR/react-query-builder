import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Attribute,
  Condition1,
  Condition,
  Function,
  Validator,
} from "./Types";
import ConditionDefinition from "./ConditionDefinition";
import { v4 as uuid } from '@lukeed/uuid';

function ConditionDefinitionSection({ applicableItemTypes, addCondition }
  : {
      applicableItemTypes: string[] | null,
      addCondition: (condition: Condition1) => void
  }) {
  const [conditionName, setConditionName] = useState<string>("");

  const [condition, setCondition] = useState<Condition>({
    id: uuid(),
    name: null,
    thisItemAttribute: {
      name: null,
      category: null,
      type: null,
      dataType: null,
    },
    thisItemFunctions: null,
    existingItemAttribute: null,
    existingItemFunctions: null,
    validator: {
      name: null,
      operandsDataTypes: null,
    },
    validationInput: null,
  });

  const updateConditionName = (newName: string) => {
    let newCondition = { ...condition };
    newCondition.name = newName;
    setCondition(newCondition);
  }

  const updateCondition = (whichItem: string, newAttribute: Attribute | null, newFunctions: Function[] | null, newValidator: Validator, newValidationInput: string | null) => {
    if (whichItem === "Latest Request") {
      let newCondition = { ...condition };
      newCondition.thisItemAttribute = newAttribute;
      newCondition.thisItemFunctions = newFunctions;
      newCondition.validator = newValidator;
      newCondition.validationInput = newValidationInput;
      setCondition(newCondition);
    }
    else if (whichItem === "Existing Request") {
      let newCondition = { ...condition };
      newCondition.existingItemAttribute = newAttribute;
      newCondition.existingItemFunctions = newFunctions;
      newCondition.validator = newValidator;
      newCondition.validationInput = newValidationInput;
      setCondition(newCondition);
    }
  };

  const updateValidator = (newValidator: Validator, newValidationInput: string | null) => {
    let newCondition = { ...condition };
    newCondition.validator = newValidator;
    newCondition.validationInput = newValidationInput;
    setCondition(newCondition);
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Condition Definition</Accordion.Header>
          <Accordion.Body>
            <ConditionDefinition
              condition={condition}
              applicableItemTypes={applicableItemTypes}
              updateConditionName={updateConditionName}
              updateCondition={updateCondition}
              updateValidator={updateValidator} />
            
            <Accordion className="mt-5">
              <Accordion.Item eventKey="0">
                <Accordion.Header>JSON</Accordion.Header>
                <Accordion.Body>
                  <pre>{JSON.stringify(condition, null, 4)}</pre>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addCondition({ id: uuid(), name: conditionName });
                setConditionName("");
              }}
              className="mt-5">
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
