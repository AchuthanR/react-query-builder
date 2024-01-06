import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import RuleDetailsSection from "./RuleDetailsSection";
import ConditionDefinitionSection from "./ConditionDefinitionSection";
import ConditionEvaluationSection from "./ConditionEvaluationSection";
import { Condition1, RuleDetails } from "./Types";
import { v4 as uuid } from '@lukeed/uuid';

function App() {
  const [ruleDetails, setRuleDetails] = useState<RuleDetails>({
    ruleName: null,
    description: null,
    startDate: null,
    endDate: null,
    status: null,
    detectConflictsWithinSameRequest: null,
    itemTypes: ["Circuit", "Device"],
    conflictCategories: null,
  });

  const [conditions, setConditions] = useState<Condition1[]>([
    { id: uuid(), name: "Same device name" },
    { id: uuid(), name: "This Item's country is USA" },
    { id: uuid(), name: "Existing Item's country is USA" },
    { id: uuid(), name: "Same state" },
    { id: uuid(), name: "Same country" },
  ]);

  const updateField = (field: string, value: string) => {
    if (field === "ruleName") {
      let newRuleDetails = { ...ruleDetails };
      newRuleDetails.ruleName = value;
      setRuleDetails(newRuleDetails);
    }
    else if (field === "description") {
      let newRuleDetails = { ...ruleDetails };
      newRuleDetails.description = value;
      setRuleDetails(newRuleDetails);
    }
    else if (field === "startDate") {
      let newRuleDetails = { ...ruleDetails };
      newRuleDetails.startDate = value;
      setRuleDetails(newRuleDetails);
    }
    else if (field === "endDate") {
      let newRuleDetails = { ...ruleDetails };
      newRuleDetails.endDate = value;
      setRuleDetails(newRuleDetails);
    }
  };

  const updateStatus = (status: string) => {
    let newRuleDetails = { ...ruleDetails };
    newRuleDetails.status = status;
    setRuleDetails(newRuleDetails);
  };

  const updateDetectConflictsWithinSameRequest = (value: boolean) => {
    let newRuleDetails = { ...ruleDetails };
    newRuleDetails.detectConflictsWithinSameRequest = value;
    setRuleDetails(newRuleDetails);
  };
  
  const updateItemTypes = (itemType: string, updateAction: string) => {
    if (updateAction === "add") {
      let newRuleDetails = { ...ruleDetails };
      if (newRuleDetails.itemTypes) {
        newRuleDetails.itemTypes.push(itemType);
      }
      else {
        newRuleDetails.itemTypes = [itemType];
      }
      setRuleDetails(newRuleDetails);
    }
    else if (updateAction === "remove") {
      let newRuleDetails = { ...ruleDetails };
      if (newRuleDetails.itemTypes) {
        newRuleDetails.itemTypes = newRuleDetails.itemTypes.filter(type => type !== itemType);
        setRuleDetails(newRuleDetails);
      }
    }
  };

  const updateConflictCategories = (conflictType: string, updateAction: string) => {
    if (updateAction === "add") {
      let newRuleDetails = { ...ruleDetails };
      if (newRuleDetails.conflictCategories) {
        newRuleDetails.conflictCategories.push(conflictType);
      }
      else {
        newRuleDetails.conflictCategories = [conflictType];
      }
      setRuleDetails(newRuleDetails);
    }
    else if (updateAction === "remove") {
      let newRuleDetails = { ...ruleDetails };
      if (newRuleDetails.conflictCategories) {
        newRuleDetails.conflictCategories = newRuleDetails.conflictCategories.filter(type => type !== conflictType);
        setRuleDetails(newRuleDetails);
      }
    }
  };

  const addCondition = (condition: Condition1) => {
    setConditions([...conditions, condition]);
  }

  return (
    <div className="d-flex flex-column gap-5">
      <RuleDetailsSection
        ruleDetails={ruleDetails}
        updateField={updateField}
        updateStatus={updateStatus}
        updateDetectConflictsWithinSameRequest={updateDetectConflictsWithinSameRequest}
        updateItemTypes={updateItemTypes}
        updateConflictCategories={updateConflictCategories} />
      
      <ConditionDefinitionSection
        applicableItemTypes={ruleDetails.itemTypes}
        addCondition={addCondition} />
      
      <ConditionEvaluationSection conditions={conditions} />
    </div>
  );
}

export default App;
