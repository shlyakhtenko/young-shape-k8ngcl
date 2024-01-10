import "../styles.css";
import { useState, useContext } from "react";
import { LoginContext } from "../App";

import Select from "react-select";
export default function Assignments() {
  const [programCode, setProgramCode] = useState(null);
  const [pipeline, setPipeline] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [workshopsLoaded, setWorkshopsLoaded] = useState(false);
  const [pipelinesLoaded, setPipelinesLoaded] = useState(false);
  const loginToken = useContext(LoginContext);

  if (!workshopsLoaded) {
    fetch(
      "https://docs.ipam.ucla.edu/cocytus/get_programs.php?ipam_id=" +
        loginToken.ipam_id +
        "&session_token=" +
        loginToken.session_token,
      {
        mode: "cors",
        method: "GET",
      },
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setWorkshops(data);
        setWorkshopsLoaded(true);
      });
    });
  }
  if (!pipelinesLoaded) {
    fetch(
      "https://docs.ipam.ucla.edu/cocytus/get_pipelines.php?ipam_id=" +
        loginToken.ipam_id +
        "&session_token=" +
        loginToken.session_token,
      {
        mode: "cors",
        method: "GET",
      },
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setPipelines(data);
        setPipelinesLoaded(true);
      });
    });
  }

  return (
    <div>
      <h1>Assignments</h1>
      <Select
        options={workshops.map((v) => {
          return {
            label: v.ProgramCode + ": " + v.ProgramName,
            value: v.ProgramCode,
          };
        })}
        onChange={(v) => {
          setProgramCode(v.value);
        }}
      ></Select>
      <Select
        options={pipelines.map((v) => {
          return { label: v.caption, value: v.name };
        })}
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
