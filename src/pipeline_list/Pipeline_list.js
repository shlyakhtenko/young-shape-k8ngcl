import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../App";
import { Navigate } from "react-router-dom";
import ErrorDialog from "../ErrorDialog";

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
          console.log("get_pipelines returning:", data);
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
    <div>
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        setter={setErrorDialog}
      />
      <h1>{program_code}: Available Pipelines</h1>
      <ul>
        {console.log("pipelines", pipelines)}
        {pipelines.map((pipeline) => {
          return (
            <li key={pipeline.name}>
              <a href={"/workshop/" + program_code + "/" + pipeline.name}>
                {pipeline.caption}
              </a>{" "}
              ({pipeline.num_cards} cards)
            </li>
          );
        })}
      </ul>
    </div>
  );
}
