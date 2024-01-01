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
      applicableItemTypes: string[],
      addCondition: (condition: Condition1) => void
  }) {
  const [conditionName, setConditionName] = useState<string>("");

  const [condition, setCondition] = useState<Condition>({
    name: "",
    thisItemAttribute: {
      name: "",
      attributeCategory: "",
      attributeType: "",
      dataType: "",
    },
    thisItemFunctions: [],
    existingItemAttribute: {
      name: "",
      attributeCategory: "",
      attributeType: "",
      dataType: "",
    },
    existingItemFunctions: [],
    validator: {
      name: "",
      operandsDataTypes: [["", ""]],
    },
    validationInput: "",
  });

  const updateConditionName = (newName: string) => {
    let newCondition = { ...condition };
      newCondition.name = newName;
      setCondition(newCondition);
  }

  const updateAttribute = (whichItem: string, newAttribute: Attribute) => {
    if (whichItem === "This Item") {
      let newCondition = { ...condition };
      newCondition.thisItemAttribute = newAttribute;
      setCondition(newCondition);
    }
    else if (whichItem === "Existing Item") {
      let newCondition = { ...condition };
      newCondition.existingItemAttribute = newAttribute;
      setCondition(newCondition);
    }
  };

  const updateFunctions = (whichItem: string, newFunctions: Function[]) => {
    if (whichItem === "This Item") {
      let newCondition = { ...condition };
      newCondition.thisItemFunctions = newFunctions;
      setCondition(newCondition);
    }
    else if (whichItem === "Existing Item") {
      let newCondition = { ...condition };
      newCondition.existingItemFunctions = newFunctions;
      setCondition(newCondition);
    }
  };

  const updateValidator = (newValidator: Validator) => {
    let newCondition = { ...condition };
    newCondition.validator = newValidator;
    setCondition(newCondition);
  };

  const updateValidationInput = (newValidationInput: string) => {
    let newCondition = { ...condition };
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
              updateAttribute={updateAttribute}
              updateFunctions={updateFunctions}
              updateValidator={updateValidator}
              updateValidationInput={updateValidationInput} />
            
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
