import "../styles.css";
import { useState } from "react";
import Select from "react-select";
export default function Assignments() {
  const [programCode, setProgramCode] = useState(null);
  const [pipeline, setPipeline] = useState(null);

  let workshops = [
    { label: "GSIWS1", value: "GSIWS1" },
    { label: "GSIWS2", value: "GSIWS2" },
    { label: "GSIWS3", value: "GSIWS3" },
  ];

  let pipelines = [
    { label: "Collect Titles", value: "talk_titles" },
    { label: "Confirm Speakers", value: "confirm_speakers" },
  ];

  return (
    <div>
      <h1>Assignments</h1>
      <Select
        options={workshops}
        onChange={(v) => {
          setProgramCode(v.value);
        }}
      ></Select>
      <Select
        options={pipelines}
        onChange={(val) => {
          setPipeline(val.value);
        }}
      ></Select>
      <ul>
        <li>
          <a href={"/pipeline_manager/edit/" + pipeline}>
            Run Pipeline Manager for {pipeline}
          </a>
        </li>
        <li>
          <a href="pipeline_manager/new/">New Pipeline</a>
        </li>
        <li>
          <a href={"/workshop/" + programCode + "/" + pipeline}>
            Pipeline {pipeline} for {programCode}
          </a>
        </li>
      </ul>
    </div>
  );
}
