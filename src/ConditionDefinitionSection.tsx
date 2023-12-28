import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Attribute,
  AttributeType,
  Condition1,
  Condition,
  Function,
  Validator,
} from "./Constants";
import ConditionDefinition from "./ConditionDefinition";
import { v4 as uuid } from '@lukeed/uuid';

function ConditionDefinitionSection({ attributeCategories, attributeTypes, attributes, functions, validators, addCondition }
  : {
      attributeCategories: string[],
      attributeTypes: AttributeType[],
      attributes: Attribute[],
      functions: Function[],
      validators: Validator[],
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
              attributeCategories={attributeCategories}
              attributeTypes={attributeTypes}
              attributes={attributes}
              functions={functions}
              validators={validators}
              condition={condition}
              updateConditionName={updateConditionName}
              updateAttribute={updateAttribute}
              updateFunctions={updateFunctions}
              updateValidator={updateValidator}
              updateValidationInput={updateValidationInput} />

            <div className="mt-5">
              <h5>JSON</h5>
              <pre>{JSON.stringify(condition, null, 4)}</pre>
            </div>

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
