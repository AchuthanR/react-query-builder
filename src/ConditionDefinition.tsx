import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import {
  Attribute,
  Function,
  Validator,
  Condition,
} from "./Types";
import { attributeCategories, attributeTypes, attributes, functions, validators } from "./Constants";

function ConditionDefinition({
    condition,
    applicableItemTypes,
    updateConditionName,
    updateCondition,
    updateValidator,
  } : {
    condition: Condition,
    applicableItemTypes: string[] | null,
    updateConditionName: (newName: string) => void,
    updateCondition: (whichItem: string, newAttribute: Attribute | null, newFunctions: Function[] | null, newValidator: Validator, newValidationInput: string | null) => void,
    updateValidator: (newValidator: Validator, newValidationInput: string | null) => void;
  }) {
  const [thisItemIncluded, setThisItemIncluded] = useState<boolean>(!!condition.thisItemAttribute);
  const [existingItemIncluded, setExistingItemIncluded] = useState<boolean>(!!condition.existingItemAttribute);

  const addFunction = (whichItem: string) => {
    let newFunction = {
      name: null,
      parameters: null,
      inputDataType: null,
      outputDataType: null,
    };
    let newValidator: Validator = {
      id: undefined,
      name: null,
      operandsDataTypes: null,
    };
    if (whichItem === "This Item") {
      let newFunctions = condition.thisItemFunctions ? [...condition.thisItemFunctions] : [];
      newFunctions.push(newFunction);
      updateCondition(whichItem, condition.thisItemAttribute, newFunctions, newValidator, null);
    }
    else if (whichItem === "Existing Item") {
      let newFunctions = condition.existingItemFunctions ? [...condition.existingItemFunctions] : [];
      newFunctions.push(newFunction);
      updateCondition(whichItem, condition.existingItemAttribute, newFunctions, newValidator, null);
    }
  };

  const deleteFunction = (whichItem: string, index: number) => {
    let newValidator: Validator = {
      id: undefined,
      name: null,
      operandsDataTypes: null,
    };
    if (whichItem === "This Item" && condition.thisItemFunctions) {
      let newFunctions = [...condition.thisItemFunctions];
      newFunctions.splice(index, 1);
      updateCondition(whichItem, condition.thisItemAttribute, newFunctions, newValidator, null);
    }
    else if (whichItem === "Existing Item" && condition.existingItemFunctions) {
      let newFunctions = [...condition.existingItemFunctions];
      newFunctions.splice(index, 1);
      updateCondition(whichItem, condition.existingItemAttribute, newFunctions, newValidator, null);
    }
  };

  return (
    <Card className="mb-5">
      <Card.Header className="d-flex flex-row justify-content-between">
        <Form.Group className="d-flex flex-row align-items-center gap-3" controlId="formConditionName">
          <Form.Label className="m-0">Add condition</Form.Label>
          <Form.Control
            className="w-auto"
            type="text"
            placeholder="Enter condition name"
            value={condition.name ?? undefined}
            onChange={(e) => updateConditionName(e.target.value)} />
        </Form.Group>
        <div>
          <Button variant="success">Save</Button>
          <Button variant="outline-danger" className="ml-2">Cancel</Button>
        </div>
      </Card.Header>
      <Card.Body className="d-flex flex-row align-items-center">
        <div className="d-flex flex-column gap-1">
          {[{
            whichItem: "This Item",
            itemIncluded: thisItemIncluded,
            attribute: condition.thisItemAttribute,
            functions: condition.thisItemFunctions,
          },
          {
            whichItem: "Existing Item",
            itemIncluded: existingItemIncluded,
            attribute: condition.existingItemAttribute,
            functions: condition.existingItemFunctions,
          }].map((objForItem, index) => (
            <div key={index} className="d-flex flex-row">
              <Card className="p-3 d-flex flex-row align-items-center gap-3" style={{ width: "100px" }}>
                <Form.Check
                  label={objForItem.whichItem}
                  name="itemIncluded"
                  type="checkbox"
                  checked={objForItem.whichItem === "This Item" ? thisItemIncluded : existingItemIncluded}
                  onChange={(e) => {
                    if (objForItem.whichItem === "This Item") {
                      setThisItemIncluded(e.target.checked);
                    }
                    else if (objForItem.whichItem === "Existing Item") {
                      setExistingItemIncluded(e.target.checked);
                    }
                    let newValidator: Validator = {
                      id: undefined,
                      name: null,
                      operandsDataTypes: null,
                    };
                    if (!e.target.checked) {
                      updateCondition(objForItem.whichItem, null, null, newValidator, null);
                    }
                    else {
                      let newAttribute: Attribute = {
                        name: null,
                        type: null,
                        category: null,
                        dataType: null,
                      };
                      updateCondition(objForItem.whichItem, newAttribute, null, newValidator, null);
                    }
                  }}
                />
              </Card>

              {objForItem.itemIncluded && (
                <>
                  <Card className="p-3 d-flex flex-row align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <Form.Group className="mb-3" controlId="formAttributeCategory">
                        <Form.Label>Attribute category</Form.Label>
                        <Form.Select
                          size="sm"
                          value={objForItem.attribute?.category ?? "-1"}
                          onChange={(e) => {
                            if (objForItem.attribute) {
                              let newAttribute: Attribute = {
                                ...objForItem.attribute,
                                id: undefined,
                                name: null,
                                type: null,
                                category: e.target.value !== "-1" ? e.target.value : null,
                                dataType: null,
                              };
                              let newValidator: Validator = {
                                id: undefined,
                                name: null,
                                operandsDataTypes: null,
                              };
                              updateCondition(objForItem.whichItem, newAttribute, null, newValidator, null);
                            }
                          }}
                          aria-label="Select attribute category">
                          <option value="-1">Select attribute category</option>
                          {attributeCategories.map((attributeCategory, index) => (
                            <option key={index} value={attributeCategory}>{attributeCategory}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formAttributeType">
                        <Form.Label>Attribute type</Form.Label>
                        <Form.Select
                          size="sm"
                          value={objForItem.attribute?.type ?? "-1"}
                          onChange={(e) => {
                            if (objForItem.attribute) {
                              let newAttribute: Attribute = {
                                ...objForItem.attribute,
                                id: undefined,
                                name: null,
                                type: e.target.value !== "-1" ? e.target.value : null,
                                dataType: null,
                              };
                              let newValidator: Validator = {
                                id: undefined,
                                name: null,
                                operandsDataTypes: null,
                              };
                              updateCondition(objForItem.whichItem, newAttribute, null, newValidator, null);
                            }
                          }}
                          disabled={!objForItem.attribute?.category || objForItem.attribute?.category === "-1"}
                          aria-label="Select attribute type">
                          <option value="-1">Select attribute type</option>
                          {attributeTypes.filter(attributeType => applicableItemTypes?.includes(attributeType.name) && attributeType.category === objForItem.attribute?.category).map((attributeType, index) => (
                            <option key={index} value={attributeType.name}>{attributeType.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formAttributeName">
                        <Form.Label>Attribute name</Form.Label>
                        <Form.Select
                          size="sm"
                          value={objForItem.attribute?.id ?? "-1"}
                          onChange={(e) => {
                            if (objForItem.attribute) {
                              let attribute = attributes.find(attribute => attribute.id === e.target.value);
                              let newAttribute: Attribute;
                              if (attribute) {
                                newAttribute = {
                                  ...objForItem.attribute,
                                  id: attribute.id,
                                  name: attribute.name,
                                  dataType: attribute.dataType,
                                };
                              }
                              else {
                                newAttribute = {
                                  ...objForItem.attribute,
                                  id: undefined,
                                  name: null,
                                  dataType: null,
                                };
                              }
                              let newValidator: Validator = {
                                id: undefined,
                                name: null,
                                operandsDataTypes: null,
                              };
                              updateCondition(objForItem.whichItem, newAttribute, null, newValidator, null);
                            }
                          }}
                          disabled={(!objForItem.attribute?.category || objForItem.attribute.category === "-1") || (!objForItem.attribute?.type || objForItem.attribute.type === "-1")}
                          aria-label="Select attribute name">
                          <option value="-1">Select attribute name</option>
                          {attributes.filter(attribute => attribute.category === objForItem.attribute?.category && attribute.type === objForItem.attribute?.type).map((attribute) => (
                            <option key={attribute.id} value={attribute.id}>{attribute.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </Card>
                  <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>

                  {objForItem.functions?.map((func, index) => (
                    <>
                      <Card className="p-3 d-flex flex-row align-items-center gap-3">
                        <div className="d-flex flex-column">
                          <CloseButton
                            onClick={() => deleteFunction(objForItem.whichItem, index)}
                            disabled={objForItem.functions ? (index !== objForItem.functions.length - 1) : true}
                            style={{ position: "absolute", top: "8px", right: "8px" }} />
                          <Form.Group className="mb-3" controlId="formFunction">
                            <Form.Label>Function</Form.Label>
                            <Form.Select
                              size="sm"
                              value={func.id ?? "-1"}
                              onChange={(e) => {
                                if (objForItem.functions) {
                                  let selectedFunction = functions.find(f => f.id === e.target.value);
                                  let newFunctions = [...objForItem.functions];
                                  let newFunction: Function;
                                  if (selectedFunction) {
                                    newFunction = {
                                      ...selectedFunction,
                                      id: selectedFunction.id,
                                      name: selectedFunction.name,
                                      parameters: null,
                                      inputDataType: selectedFunction.inputDataType,
                                      outputDataType: selectedFunction.outputDataType,
                                    };
                                  }
                                  else {
                                    newFunction = {
                                      id: undefined,
                                      name: null,
                                      parameters: null,
                                      inputDataType: null,
                                      outputDataType: null,
                                    };
                                  }
                                  newFunctions.splice(index, 1, newFunction);
                                  let newValidator: Validator = {
                                    id: undefined,
                                    name: null,
                                    operandsDataTypes: null,
                                  };
                                  updateCondition(objForItem.whichItem, objForItem.attribute, newFunctions, newValidator, null);
                                }
                              }}
                              disabled={objForItem.functions ? (index !== objForItem.functions.length - 1) : true}
                              aria-label="Select a function">
                              <option value="-1">Select a function</option>
                              {functions.filter(f => {
                                if (index === 0 && objForItem.attribute?.dataType === f.inputDataType) {
                                  return true;
                                }
                                else if (index !== 0 && objForItem.functions?.[index - 1].outputDataType === f.inputDataType) {
                                  return true;
                                }
                                else {
                                  return false;
                                }
                              }).map((f) => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label>Input</Form.Label>
                            <Form.Control
                              size="sm"
                              type="text"
                              placeholder="Enter input"
                              value={func.parameters ?? ""}
                              onChange={(e) => {
                                if (objForItem.functions) {
                                  let newFunctions = [...objForItem.functions];
                                  let newFunction: Function = {
                                    ...func,
                                    parameters: e.target.value,
                                  };
                                  newFunctions.splice(index, 1, newFunction);
                                  updateCondition(objForItem.whichItem, objForItem.attribute, newFunctions, condition.validator, condition.validationInput);
                                }
                              }} />
                          </Form.Group>
                        </div>
                      </Card>
                      <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>
                    </>
                  ))}

                  <Button
                    variant="outline-success"
                    onClick={() => addFunction(objForItem.whichItem)}
                    disabled={
                      (!objForItem.attribute?.name || objForItem.attribute.name === null)
                      || (!!objForItem.functions?.length && !objForItem.functions[objForItem.functions.length - 1].id)}
                    className="ml-1 mr-1 align-self-center">+</Button>
                </>
              )}
            </div>
          ))}
        </div>

        <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>

        <Card>
          <Card.Body className="d-flex flex-column justify-content-center">
            <Form.Group className="mb-3" controlId="formValidator">
              <Form.Label>Validate</Form.Label>
              <Form.Select
                size="sm"
                value={condition.validator?.id ?? "-1"}
                onChange={(e) => {
                  let foundValidator = validators.find(validator => validator.id === e.target.value);
                  let newValidator: Validator;
                  if (foundValidator) {
                    newValidator = foundValidator;
                  }
                  else {
                    newValidator = {
                      id: undefined,
                      name: null,
                      operandsDataTypes: null,
                    };
                  }
                  updateValidator(newValidator, condition.validationInput);
                }}
                aria-label="Select a validator">
                <option value="-1">Select a validator</option>
                {validators.filter(validator => {
                  let firstOperandDataType: string | null | undefined;
                  if (condition.thisItemFunctions && condition.thisItemFunctions?.length > 0) {
                    firstOperandDataType = condition.thisItemFunctions[condition.thisItemFunctions.length - 1].outputDataType;
                  }
                  else if (condition.thisItemAttribute) {
                    firstOperandDataType = condition.thisItemAttribute.dataType;
                  }
                  else {
                    firstOperandDataType = undefined;
                  }

                  let secondOperandDataType: string | null | undefined;
                  if (condition.existingItemFunctions && condition.existingItemFunctions?.length > 0) {
                    secondOperandDataType = condition.existingItemFunctions[condition.existingItemFunctions.length - 1].outputDataType;
                  }
                  else if (condition.existingItemAttribute) {
                    secondOperandDataType = condition.existingItemAttribute.dataType;
                  }
                  else {
                    secondOperandDataType = undefined;
                  }

                  if (validator.operandsDataTypes?.find(dataTypes =>
                    (dataTypes[0] === firstOperandDataType && dataTypes[1] === secondOperandDataType)
                    || (secondOperandDataType === undefined && dataTypes[0] === firstOperandDataType)
                    || (firstOperandDataType === undefined && dataTypes[1] === secondOperandDataType))) {
                    return true;
                  }
                  else {
                    return false;
                  }
                }).map((validator) => (
                  <option key={validator.id} value={validator.id}>{validator.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInput">
              <Form.Label>Input</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter input"
                value={condition.validationInput ?? ""}
                onChange={(e) => updateValidator(condition.validator, e.target.value)} />
            </Form.Group>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default ConditionDefinition;
