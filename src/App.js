import "./styles.css";
import PipelineEditor from "./pipeline_editor/PipelineEditor.js";
import Assignments from "./assignments/Assignment.js";
import Pipeline from "./pipelines/Pipeline.js";
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login.js";
import PipelineList from "./pipeline_list/Pipeline_list.js";

export const LoginContext = createContext();

export default function App() {
  const [loginToken, setLoginToken] = useState(false);

  if (!loginToken) {
    return <Login setLoginToken={setLoginToken} />;
  }
  return (
    <LoginContext.Provider value={loginToken}>
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
        <Route path="/workshop/:programCode/" element={<PipelineList />} />
        <Route
          path="/workshop/:programCode/:pipelineName"
          element={<Pipeline />}
        />
      </Routes>
    </LoginContext.Provider>
  );
}
