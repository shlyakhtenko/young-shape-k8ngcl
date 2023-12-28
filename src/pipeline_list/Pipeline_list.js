import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, FormLabel } from "react-bootstrap";
import { LoginContext } from "../App";

async function get_pipelines(eventCode, loginToken) {
  const headers = { authorization: "Basic " + loginToken };
  const response = await fetch(
    "https://docs.ipam.ucla.edu/cocytus/get_pipelines.php?event_code=" +
      eventCode,
    {
      method: "GET",
      headers: headers,
      mode: "cors",
    },
  );
  const data = await response.json();
  console.log("get_pipelines returning:", data);
  return data;
}

export default function PipelineList() {
  //const [pipelines, setPipelines] = useState([]);
  const pipelines = [];
  const loginToken = useContext(LoginContext);
  const program_code = useParams().programCode;

  useEffect(() => {
    let ps = async () => await get_pipelines(program_code, loginToken);
    //setPipelines(ps);
  });

  return (
    {console.log("pipelines", pipelines)}
    <div>
      <h1>{program_code}: Available Pipelines</h1>
      <Form>
        <Form.Group>
          <FormLabel>Select Pipeline</FormLabel>
          <Form.Select>
            {console.log("pipelines", pipelines)}
            {pipelines.map((pipeline) => (
              <option key={pipeline.name} value={pipeline.name}>
                {pipeline.caption}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
