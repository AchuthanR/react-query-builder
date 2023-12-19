import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ConditionDefinitionSection from "./ConditionDefinitionSection";
import ConditionEvaluationSection from "./ConditionEvaluationSection";
import { Condition } from "./Constants";
import { v4 as uuid } from '@lukeed/uuid';

function App() {
  const [conditions, setConditions] = useState<Condition[]>([
    { id: uuid(), name: "Same device name" },
    { id: uuid(), name: "This Item's country is USA" },
    { id: uuid(), name: "Existing Item's country is USA" },
    { id: uuid(), name: "Same state" },
    { id: uuid(), name: "Same country" },
  ]);

  const addCondition = (condition: Condition) => {
    setConditions([...conditions, condition]);
  }

  return (
    <div className="d-flex flex-column gap-5">
      <ConditionDefinitionSection addCondition={addCondition} />
      <ConditionEvaluationSection conditions={conditions} />
    </div>
  );
}

export default App;
