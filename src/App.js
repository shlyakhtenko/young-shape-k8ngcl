import "./styles.css";
import PipelineEditor from "./pipeline_editor/PipelineEditor.js";
import Assignments from "./assignments/Assignment.js";
import Pipeline from "./pipelines/Pipeline.js";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="/pipeline_manager/new"
        element={<PipelineEditor pipeline={"new"} />}
      />
      <Route
        path="/pipeline_manager/edit/:pipelineName"
        element={<PipelineEditor />}
      />
      <Route path="/" element={<Assignments />} />
      <Route
        path="/workshop/:programCode/:pipelineName"
        element={<Pipeline />}
      />
    </Routes>
  );
}
