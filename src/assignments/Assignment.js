import "../styles.css";
import { useState, useContext } from "react";
import { LoginContext } from "../App";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

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
      <Container>
        <Row>
          <h2>Program Management</h2>
          <ListGroup>
            <ListGroup.Item>
              Select program:
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
              <Button
                disabled={programCode == null ? true : false}
                href={"/workshop/" + programCode}
              >
                See Pipelines
              </Button>
            </ListGroup.Item>
          </ListGroup>
          <h2>Pipeline Management</h2>
          <ListGroup>
            <ListGroup.Item>
              Select pipeline:
              <Select
                options={pipelines.map((v) => {
                  return { label: v.caption, value: v.name };
                })}
                onChange={(val) => {
                  setPipeline(val.value);
                }}
              ></Select>
              <Button
                disabled={pipeline == null ? true : false}
                href={"/pipeline_manager/edit/" + pipeline}
              >
                Edit Pipeline
              </Button>{" "}
              <Button variant="success" href="pipeline_manager/new/">
                New Pipeline
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Container>
    </div>
  );
}
