import "./styles.css";
import { useState, useContext } from "react";
import { LoginContext } from "../App";

import {
  compute_wips,
  compute_inputs,
  compute_outputs,
} from "./column_helpers.js";

import Datacolumn from "./Datacolumn.js";
import { Breadcrumb } from "react-bootstrap";

//import Select from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
//import { Routes, Route } from 'react-router-dom';

export default function PipelineEditor(props) {
  let target_pipeline = null;

  const token = useContext(LoginContext);

  //const [pipeline_data, setPipelineData] = useState(get_pipeline_data());

  const [data_sources, set_data_sources] = useState([]);
  const [data_source, setDataSource] = useState(null);

  const [inputs, setInputs] = useState([]);
  const [query, setQuery] = useState({});
  const [wips, setWIPS] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [outputs, setOutputs] = useState([
    // compute_outputs(query, wips, "output", "Output Column"),
  ]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [pipeline_data, setPipelineData] = useState(null);

  let pipelineName = null;
  let setPipelineName = null;

  if (props.pipeline != "new") {
    let params = useParams();
    target_pipeline = params.pipelineName;
    //pipeline_data = get_pipeline_data().find((x) => x.name == target_pipeline);

    [pipelineName, setPipelineName] = useState(target_pipeline); // pipelineID
  } else {
    target_pipeline = "Pipeline";
    //pipeline_data = get_pipeline_data()[0];
    [pipelineName, setPipelineName] = useState(""); // pipelineID
  }

  const [pipeline, setPipeline] = useState(target_pipeline);

  const load_query_data = () => {
    const url =
      "https://docs.ipam.ucla.edu/cocytus/get_data_sources.php?ipam_id=" +
      token.ipam_id +
      "&session_token=" +
      token.session_token;
    const headers = {};
    //const headers = { authorization: "Basic " + token };
    fetch(url, { mode: "cors", headers: headers, method: "GET" }).then(
      (response) => {
        response.json().then((data) => {
          console.log("pipeline_editor: got data", data);
          let new_pipeline_data = null;
          if (props.pipeline != "new") {
            new_pipeline_data = data.pipelines.find(
              (x) => x.name == target_pipeline,
            );

            console.log(
              "pipeine editor: new_pipeline_data",
              new_pipeline_data,
              "data.pipelines",
              data.pipelines,
              "looking for ",
              target_pipeline,
            );
          } else {
            new_pipeline_data = {
              name: "new",
              caption: "New Pipeline",
              data_source: data.data_sources[0].name,
              query: data.data_sources[0].available_queries[0].name,
              inputs: compute_inputs(data.data_sources[0].available_queries[0]),
              local_fields: data.local_fields ? data.local_fields : [],
            };
          }

          setPipelineData(new_pipeline_data);

          set_data_sources(data.data_sources);

          let new_data_source = data.data_sources.find(
            (x) => x.name == new_pipeline_data.data_source,
          );
          console.log("new_data_source", new_data_source, "loaded=", loaded);
          setDataSource(new_data_source);
          setQuery(
            new_data_source.available_queries.find(
              (x) => x.name == new_pipeline_data.inputs[0].query,
            ),
          );
          setSelectOptions(
            new_data_source.available_queries.map((q) => {
              return { value: q.name, label: q.caption };
            }),
          );
          setInputs(new_pipeline_data.inputs);
          if (props.pipeline != "new") {
            setWIPS(new_pipeline_data.wips);
            setOutputs(new_pipeline_data.outputs);
            setPipeline(new_pipeline_data.caption);
          } else {
            setPipeline("");
            setWIPS([]);
            setOutputs([]);
          }
          setLoaded(true);
        });
      },
    );
  };

  if (!loaded) {
    load_query_data();
  }

  /* console.log(
    "done with setup",
    "target_pipeline",
    target_pipeline,
    "pipeline_data",
    pipeline_data,
    "data_sources",
    data_sources,
    "data_source",
    data_source,
    "inputs",
    inputs,
    "query",
    query,
    "wips",
    wips,
    "outputs",
    outputs,
    "selectOptions",
    selectOptions,
    "pipeline",
    pipeline,
    "loaded",
    loaded,
    "pipelineName",
    pipelineName,
  ); */

  return (
    <div className="App">
      <nav>
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item href="/malebolge/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Editing pipeline: {pipeline}</Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <h1>Pipeline Editor</h1>
      {data_source && pipeline_data ? (
        <>
          <label className="pipelineName">
            Pipeline name:
            <Form.Control
              type="text"
              value={pipeline}
              onChange={(e) => {
                setPipeline(e.target.value);
                setPipelineName(encodeURIComponent(e.target.value));
                //setPipelineName(e.target.value.split(" ").join("_"));
              }}
            />
          </label>
          <div className="preamble">
            <label>
              Datasource:
              <Form.Select
                className="data_selector"
                defaultValue={data_source.name}
                onChange={(ev) => {
                  let val = ev.target.value;
                  let new_data_source = data_sources.filter((ds) => {
                    return ds.name == val;
                  })[0];
                  setDataSource(new_data_source);
                  setInputs(
                    compute_inputs(new_data_source.available_queries[0]),
                  );
                  setWIPS([]);
                  setOutputs([]);
                  setSelectOptions(
                    new_data_source.available_queries.map((q) => {
                      return { value: q.name, label: q.caption };
                    }),
                  );
                }}
              >
                {data_sources.map((ds) => {
                  return (
                    <option key={ds.name} value={ds.name}>
                      {ds.caption}
                    </option>
                  );
                })}
              </Form.Select>
            </label>
            <label>
              Query:
              <Form.Select
                className="data_selector"
                //value={selectOptions[0]}
                defaultValue={
                  //(pipeline_data.inputs[0].query)
                  query.name
                  /*label: data_source.available_queries.find(
                (q) => q.name == pipeline_data.inputs[0].query,
              ).caption,*/
                }
                onChange={(e) => {
                  let val = e.target.value;
                  let newquery = data_source.available_queries.filter((qn) => {
                    return qn.name == val;
                  })[0];
                  setQuery(newquery);
                  setInputs(compute_inputs(newquery));
                  setWIPS([]);
                  setOutputs([
                    //compute_outputs(newquery, [], "output", "Output Column"),
                  ]);
                }}
              >
                {console.log(query)}
                {selectOptions.map((q) => {
                  return (
                    <option key={q.value} value={q.value}>
                      {q.label}
                    </option>
                  );
                })}
              </Form.Select>
            </label>
          </div>
          <table className="columntable">
            <thead>
              <tr>
                <th>
                  <h2>Inputs</h2>
                  <h4>New cards appear here</h4>
                </th>
                <th>
                  <h2>
                    To-Do&apos;s{" "}
                    <Button
                      onClick={() => {
                        setWIPS([
                          ...wips,
                          compute_wips(query, "wip" + wips.length + 1, ""),
                        ]);
                      }}
                    >
                      Add Column
                    </Button>
                  </h2>
                  <h4>Cards you are working on appear here</h4>
                </th>
                <th>
                  <h2>
                    Done{" "}
                    <Button
                      onClick={() => {
                        setOutputs([
                          ...outputs,
                          compute_outputs(
                            query,
                            wips,
                            "outputs" + outputs.length + 1,
                            "",
                          ),
                        ]);
                      }}
                    >
                      Add Column
                    </Button>
                  </h2>
                  <h4>All cards should end up here</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="columnset">
                    <Datacolumn
                      column_data={inputs[0]}
                      local_fields={
                        inputs[0].local_fields ? inputs[0].local_fields : {}
                      }
                      siblings={inputs}
                      setter={setInputs}
                      key="inputs"
                      use_field={true}
                      edit_field={false}
                    />
                  </div>
                </td>
                <td>
                  <div className="columnset">
                    {wips.map((w) => {
                      return (
                        <Datacolumn
                          column_data={{
                            ...w,
                            fields: w.fields,
                          }}
                          siblings={wips}
                          setter={setWIPS}
                          remove_button
                          key={w.name}
                          output_setter={setOutputs}
                          use_field={false}
                          edit_field={true}
                        />
                      );
                    })}
                  </div>
                </td>
                <td>
                  <div className="columnset">
                    {outputs.map((o) => {
                      return (
                        <Datacolumn
                          column_data={o}
                          siblings={outputs}
                          remove_button
                          //keep_column={"output"}
                          setter={setOutputs}
                          key={o.name}
                          use_field={false}
                          edit_field={false}
                        />
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <Button
            disabled={outputs.length == 0 || pipeline == ""}
            onClick={() => {
              let save_data = {
                data_source: data_source.name,
                query: query.name,
                name: pipelineName,
                caption: pipeline,
                inputs: inputs,
                wips: wips,
                outputs: outputs,
                local_fields: pipeline_data.local_fields,
              };
              const headers = {
                //  authorization: "Basic " + token,
                "Content-Type": "application/json",
              };
              const url =
                "https://docs.ipam.ucla.edu/cocytus/save_pipeline.php?ipam_id=" +
                token.ipam_id +
                "&session_token=" +
                token.session_token;
              const body = JSON.stringify(save_data);

              console.log(
                "saving pipline before fetch url=",
                url,
                "body=",
                body,
                "headers=",
                headers,
              );
              fetch(url, {
                headers: headers,
                body: body,
                mode: "cors",
                method: "POST",
              }).then((response) => {
                response.text().then((text) => {
                  //console.log("Saving pipline. Got response: " + text);
                  alert("Saved. Got response: " + text);
                });
              });
              //console.log(JSON.stringify(save_data));
            }}
          >
            Save
          </Button>
          <hr />
        </>
      ) : (
        <div>Loading data sources...</div>
      )}
    </div>
  );
}
