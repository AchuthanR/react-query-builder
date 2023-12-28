import Button from "react-bootstrap/Button";
import { Card, CloseButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  AttributeType,
  Attribute,
  Function,
  Validator,
  Condition,
} from "./Constants";

function ConditionDefinition({
    attributeCategories,
    attributeTypes,
    attributes,
    functions,
    validators,
    condition,
    updateConditionName,
    updateAttribute,
    updateFunctions,
    updateValidator,
    updateValidationInput
  } : {
    attributeCategories: string[],
    attributeTypes: AttributeType[],
    attributes: Attribute[],
    functions: Function[],
    validators: Validator[],
    condition: Condition,
    updateConditionName: (newName: string) => void,
    updateAttribute: (whichItem: string, newAttribute: Attribute) => void,
    updateFunctions: (whichItem: string, newFunctions: Function[]) => void,
    updateValidator: (newValidator: Validator) => void;
    updateValidationInput: (newValidationInput: string) => void;
  }) {
  const addFunction = (whichItem: string) => {
    let newFunction = {
      name: "-1",
      parameters: "",
      inputDataType: "",
      outputDataType: "",
    };
    if (whichItem === "This Item") {
      let newAddedFunctions = [...condition.thisItemFunctions];
      newAddedFunctions.push(newFunction);
      updateFunctions(whichItem, newAddedFunctions);
    }
    else if (whichItem === "Existing Item") {
      let newAddedFunctions = [...condition.existingItemFunctions];
      newAddedFunctions.push(newFunction);
      updateFunctions(whichItem, newAddedFunctions);
    }
  };

  const deleteFunction = (whichItem: string, index: number) => {
    if (whichItem === "This Item") {
      let newAddedFunctions = [...condition.thisItemFunctions];
      newAddedFunctions.splice(index, 1);
      updateFunctions(whichItem, newAddedFunctions);
    }
    else if (whichItem === "Existing Item") {
      let newAddedFunctions = [...condition.existingItemFunctions];
      newAddedFunctions.splice(index, 1);
      updateFunctions(whichItem, newAddedFunctions);
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
            value={condition.name}
            onChange={(e) => updateConditionName(e.target.value)} />
        </Form.Group>
        <div>
          <Button variant="success">Save</Button>
          <Button variant="outline-danger" className="ml-2">Cancel</Button>
        </div>
      </Card.Header>
      <Card.Body className="d-flex flex-row">
        <div className="d-flex flex-column gap-1">
          {[{
            whichItem: "This Item",
            selectedAttribute: condition.thisItemAttribute,
            functions: condition.thisItemFunctions,
          },
          {
            whichItem: "Existing Item",
            selectedAttribute: condition.existingItemAttribute,
            functions: condition.existingItemFunctions,
          }].map((objForItem, index) => (
            <div key={index} className="d-flex flex-row">
              <Card className="p-3 d-flex flex-row align-items-center gap-3" style={{ width: "100px" }}>
                {objForItem.whichItem}
              </Card>
              <Card className="p-3 d-flex flex-row align-items-center gap-3">
                <div className="d-flex flex-column">
                  <Form.Group className="mb-3" controlId="formAttributeCategory">
                    <Form.Label>Attribute category</Form.Label>
                    <Form.Select
                      size="sm"
                      value={objForItem.selectedAttribute.attributeCategory}
                      onChange={(e) => {
                        if (objForItem.selectedAttribute) {
                          let newSelectedAttribute = { ...objForItem.selectedAttribute };
                          newSelectedAttribute.attributeCategory = e.target.value;
                          updateAttribute(objForItem.whichItem, newSelectedAttribute);
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
                      value={objForItem.selectedAttribute.attributeType}
                      onChange={(e) => {
                        if (objForItem.selectedAttribute) {
                          let newSelectedAttribute = { ...objForItem.selectedAttribute };
                          newSelectedAttribute.attributeType = e.target.value;
                          updateAttribute(objForItem.whichItem, newSelectedAttribute);
                        }
                      }}
                      disabled={!objForItem.selectedAttribute.attributeCategory || objForItem.selectedAttribute.attributeCategory === "-1"}
                      aria-label="Select attribute type">
                      <option value="-1">Select attribute type</option>
                      {attributeTypes.filter(attributeType => attributeType.category === objForItem.selectedAttribute.attributeCategory).map((attributeType, index) => (
                        <option key={index} value={attributeType.name}>{attributeType.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAttributeName">
                    <Form.Label>Attribute name</Form.Label>
                    <Form.Select
                      size="sm"
                      value={objForItem.selectedAttribute.name + "," + objForItem.selectedAttribute.dataType}
                      onChange={(e) => {
                        if (objForItem.selectedAttribute) {
                          let newSelectedAttribute = { ...objForItem.selectedAttribute };
                          const [name, dataType] = e.target.value.split(",");
                          newSelectedAttribute.name = name;
                          newSelectedAttribute.dataType = dataType;
                          updateAttribute(objForItem.whichItem, newSelectedAttribute);
                        }
                      }}
                      disabled={(!objForItem.selectedAttribute.attributeCategory || objForItem.selectedAttribute.attributeCategory === "-1") || (!objForItem.selectedAttribute.attributeType || objForItem.selectedAttribute.attributeType === "-1")}
                      aria-label="Select attribute name">
                      <option value="-1">Select attribute name</option>
                      {attributes.filter(attribute => attribute.attributeCategory === objForItem.selectedAttribute.attributeCategory && attribute.attributeType === objForItem.selectedAttribute.attributeType).map((attribute, index) => (
                        <option key={index} value={[attribute.name, attribute.dataType]}>{attribute.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </Card>
              <p className="ml-1 mr-1 mt-auto mb-auto">{">"}</p>

              {objForItem.functions?.map((selectedFunction, index) => (
                <>
                  <Card className="p-3 d-flex flex-row align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <CloseButton onClick={() => deleteFunction(objForItem.whichItem, index)} style={{ position: "absolute", top: "8px", right: "8px" }} />
                      <Form.Group className="mb-3" controlId="formFunction">
                        <Form.Label>Function</Form.Label>
                        <Form.Select
                          size="sm"
                          value={selectedFunction.name + "," + selectedFunction.inputDataType + "," + selectedFunction.outputDataType}
                          onChange={(e) => {
                            if (objForItem.functions && selectedFunction) {
                              let newAddedFunctions = [...objForItem.functions];
                              let newAddedFunction = { ...selectedFunction };
                              const [name, inputDataType, outputDataType] = e.target.value.split(",");
                              newAddedFunction.name = name;
                              newAddedFunction.inputDataType = inputDataType;
                              newAddedFunction.outputDataType = outputDataType;
                              newAddedFunctions.splice(index, 1, newAddedFunction);
                              updateFunctions(objForItem.whichItem, newAddedFunctions);
                            }
                          }}
                          aria-label="Select a function">
                          <option value="-1">Select a function</option>
                          {functions.filter(func => {
                            if (index === 0 && objForItem.selectedAttribute.dataType === func.inputDataType) {
                              return true;
                            }
                            else if (index !== 0 && objForItem.functions[index - 1].outputDataType === func.inputDataType) {
                              return true;
                            }
                            else {
                              return false;
                            }
                          }).map((func, index) => (
                            <option key={index} value={[func.name, func.inputDataType, func.outputDataType]}>{func.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formInput">
                        <Form.Label>Input</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Enter input"
                          value={selectedFunction.parameters}
                          onChange={(e) => {
                            if (objForItem.functions && selectedFunction) {
                              let newAddedFunctions = [...objForItem.functions];
                              let newAddedFunction = { ...selectedFunction };
                              newAddedFunction.parameters = e.target.value;
                              newAddedFunctions.splice(index, 1, newAddedFunction);
                              updateFunctions(objForItem.whichItem, newAddedFunctions);
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
                disabled={!objForItem.selectedAttribute.name || objForItem.selectedAttribute.name === ""}
                className="ml-1 mr-1 align-self-center">+</Button>
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
                value={condition.validator.name}
                onChange={(e) => {
                  let foundValidator = validators.find(validator => validator.name === e.target.value);
                  if (foundValidator) {
                    let newValidator = foundValidator;
                    updateValidator(newValidator);
                  }
                }}
                aria-label="Select a validator">
                <option value="-1">Select a validator</option>
                {validators.filter(validator => {
                  let firstOperandDataType: string;
                  if (condition.thisItemFunctions?.length > 0) {
                    firstOperandDataType = condition.thisItemFunctions[condition.thisItemFunctions.length - 1].outputDataType;
                  }
                  else {
                    firstOperandDataType = condition.thisItemAttribute.dataType;
                  }

                  let secondOperandDataType: string;
                  if (condition.existingItemFunctions?.length > 0) {
                    secondOperandDataType = condition.existingItemFunctions[condition.existingItemFunctions.length - 1].outputDataType;
                  }
                  else {
                    secondOperandDataType = condition.existingItemAttribute.dataType;
                  }

                  if (validator.operandsDataTypes.find(dataTypes => dataTypes[0] === firstOperandDataType && dataTypes[1] === secondOperandDataType)) {
                    return true;
                  }
                  else {
                    return false;
                  }
                }).map((validator, index) => (
                  <option key={index} value={validator.name}>{validator.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInput">
              <Form.Label>Input</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter input"
                value={condition.validationInput}
                onChange={(e) => updateValidationInput(e.target.value)} />
            </Form.Group>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default ConditionDefinition;
