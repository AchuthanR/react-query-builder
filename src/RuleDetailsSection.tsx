import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { RuleDetails } from "./Types";

function RuleDetailsSection({ ruleDetails, updateField, updateStatus, updateDetectConflictsWithinSameRequest, updateItemTypes, updateConflictCategories } : {
    ruleDetails: RuleDetails,
    updateField: (field: string, value: string) => void,
    updateStatus: (status: string) => void,
    updateDetectConflictsWithinSameRequest: (value: boolean) => void,
    updateItemTypes: (itemType: string, updateAction: string) => void,
    updateConflictCategories: (conflictType: string, updateAction: string) => void,
  }) {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Rule details</Accordion.Header>
          <Accordion.Body>
            <Form>
              <div className="mb-3 d-flex flex-wrap gap-4">
                <Form.Group controlId="formRuleName">
                  <Form.Label>Rule name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter rule name"
                    className="w-auto"
                    value={ruleDetails.ruleName ?? undefined}
                    onChange={(e) => updateField("ruleName", e.target.value)} />
                </Form.Group>
                
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    className="w-auto"
                    value={ruleDetails.description ?? undefined}
                    onChange={(e) => updateField("description", e.target.value)} />
                </Form.Group>
                
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter start date"
                    className="w-auto"
                    value={ruleDetails.startDate ?? undefined}
                    onChange={(e) => updateField("startDate", e.target.value)} />
                </Form.Group>
                
                <Form.Group controlId="formEndDate">
                  <Form.Label>End date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter end date"
                    className="w-auto"
                    value={ruleDetails.endDate ?? undefined}
                    onChange={(e) => updateField("endDate", e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <br />
                  <Form.Check
                    inline
                    label="Active"
                    name="status"
                    type="radio"
                    checked={ruleDetails.status === "Active"}
                    onChange={() => updateStatus("Active")}
                  />
                  <Form.Check
                    inline
                    label="Inactive"
                    name="status"
                    type="radio"
                    checked={ruleDetails.status === "Inactive"}
                    onChange={() => updateStatus("Inactive")}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="formDetectSameRequestConflict">
                <Form.Check
                  inline
                  label="Detect conflicts within same request"
                  name="detectSameRequestConflict"
                  type="checkbox"
                  checked={ruleDetails.detectConflictsWithinSameRequest ?? undefined}
                  onChange={(e) => updateDetectConflictsWithinSameRequest(e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formApplicableItemTypes">
                <Form.Label>Applicable item types</Form.Label>
                <br />
                <Form.Check
                  inline
                  label="Circuit"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Circuit")}
                  onChange={(e) => updateItemTypes("Circuit", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Device"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Device")}
                  onChange={(e) => updateItemTypes("Device", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Cable"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Cable")}
                  onChange={(e) => updateItemTypes("Cable", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Hub"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Hub")}
                  onChange={(e) => updateItemTypes("Hub", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Ring"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Ring")}
                  onChange={(e) => updateItemTypes("Ring", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Video Channel"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Video Channel")}
                  onChange={(e) => updateItemTypes("Video Channel", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Cell Site"
                  name="itemTypes"
                  type="checkbox"
                  checked={ruleDetails.itemTypes?.includes("Cell Site")}
                  onChange={(e) => updateItemTypes("Cell Site", e.target.checked ? "add" : "remove")}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formApplicableConflictCategories">
                <Form.Label>Applicable conflict categories</Form.Label>
                <br />
                <Form.Check
                  inline
                  label="Maintenance"
                  name="conflictCategory"
                  type="checkbox"
                  checked={ruleDetails.conflictCategories?.includes("Maintenance")}
                  onChange={(e) => updateConflictCategories("Maintenance", e.target.checked ? "add" : "remove")}
                />
                <Form.Check
                  inline
                  label="Outage"
                  name="conflictCategory"
                  type="checkbox"
                  checked={ruleDetails.conflictCategories?.includes("Outage")}
                  onChange={(e) => updateConflictCategories("Outage", e.target.checked ? "add" : "remove")}
                />
              </Form.Group>
            </Form>

            <Accordion className="mt-5">
              <Accordion.Item eventKey="0">
                <Accordion.Header>JSON</Accordion.Header>
                <Accordion.Body>
                  <pre>{JSON.stringify(ruleDetails, null, 4)}</pre>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default RuleDetailsSection;
