import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../App";
import { Navigate } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import ErrorDialog from "../ErrorDialog";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function PipelineList() {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loginToken = useContext(LoginContext);
  const program_code = useParams().programCode;
  const [loaded, setLoaded] = useState(false);

  let get_pipelines = (eventCode, loginToken) => {
    const headers = {
      //authorization: "Basic " + loginToken
    };
    fetch(
      "https://docs.ipam.ucla.edu/cocytus/get_pipelines.php?ipam_id=" +
        loginToken.ipam_id +
        "&session_token=" +
        loginToken.session_token +
        "&programcode=" +
        eventCode,
      {
        method: "GET",
        headers: headers,
        mode: "cors",
      },
    )
      .then((response) => {
        response.json().then((data) => {
          //console.log("get_pipelines returning:", data);
          setPipelines(data);
          setLoaded(true);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setErrorDialog(true);
      });
  };

  if (!loaded) get_pipelines(program_code, loginToken);

  return (
    <div className="pipelineList">
      {errorDialog ? (
        <ErrorDialog
          show={errorDialog}
          message={errorMessage}
          setter={setErrorDialog}
        />
      ) : null}
      <div className="top_bar">
        <nav>
          <Breadcrumb className="Breadcrumb">
            <Breadcrumb.Item href="/malebolge/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{program_code}</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
      </div>
      <Container>
        <Row>
          <h1>{program_code}: Available Pipelines</h1>
          <ListGroup>
            {console.log("pipelines", pipelines)}
            {pipelines.map((pipeline) => {
              return (
                <ListGroup.Item key={pipeline.name}>
                  <a
                    href={
                      "/malebolge/workshop/" +
                      program_code +
                      "/" +
                      pipeline.name
                    }
                  >
                    {pipeline.caption}
                  </a>
                  {" -- "}
                  Inputs: {pipeline.stats.inputs.total} cards, WIPS:{" "}
                  {pipeline.stats.wips.total} cards, Outputs:{" "}
                  {pipeline.stats.outputs.total} cards.
                  <ProgressBar>
                    <ProgressBar
                      variant="danger"
                      now={
                        (100 * pipeline.stats.inputs.brand_new) /
                        pipeline.stats.total
                      }
                      key={1}
                    />
                    <ProgressBar
                      striped
                      variant="danger"
                      now={
                        (100 *
                          (pipeline.stats.inputs.total -
                            pipeline.stats.inputs.brand_new)) /
                        pipeline.stats.total
                      }
                      key={2}
                    />
                    <ProgressBar
                      variant="warning"
                      now={
                        (100 * pipeline.stats.wips.total) / pipeline.stats.total
                      }
                      key={3}
                    />
                    <ProgressBar
                      variant="success"
                      now={
                        (100 * pipeline.stats.outputs.total) /
                        pipeline.stats.total
                      }
                      key={4}
                    />
                  </ProgressBar>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Row>
      </Container>
    </div>
  );
}
