import "./styles.css";
import { useState } from "react";
import {
  compute_wips,
  compute_inputs,
  compute_outputs,
} from "./column_helpers.js";
import Datacolumn from "./Datacolumn.js";
import get_data_sources from "./available_queries.js";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
//import { Routes, Route } from 'react-router-dom';

export default function PipelineEditor(props) {
  let target_pipeline = null;
  if (props.pipeline != "new") {
    let params = useParams();
    target_pipeline = params.pipelineName;
  } else {
    target_pipeline = "Pipeline";
  }

  const [pipelineName, setPipelineName] = useState(target_pipeline); // pipelineID
  const [pipeline, setPipeline] = useState(target_pipeline);

  const data_sources = get_data_sources();
  const [data_source, setDataSource] = useState(data_sources[0]);
  const [query, setQuery] = useState(data_source.available_queries[0]);
  const [inputs, setInputs] = useState(compute_inputs(query));
  //const [wips, setWIPS] = useState([compute_wips(query, 'wip1','Work in Progress')]);
  const [wips, setWIPS] = useState([]);
  const [outputs, setOutputs] = useState([
    // compute_outputs(query, wips, "output", "Output Column"),
  ]);

  const [selectOptions, setSelectOptions] = useState(
    data_source.available_queries.map((q) => {
      return { value: q.name, label: q.caption };
    }),
  );

  return (
    <div className="App">
      <h1>Pipeline Editor</h1>
      <label className="pipelineName">
        Pipeline name:
        <Form.Control
          type="text"
          value={pipeline}
          onChange={(e) => {
            setPipeline(e.target.value);
            setPipelineName(e.target.value.split(" ").join("_"));
          }}
        />
      </label>
      <div className="preamble">
        <hr />
        <label>
          Datasource:
          <Select
            className="data_selector"
            defaultValue={{
              value: data_source.name,
              label: data_source.caption,
            }}
            options={data_sources.map((ds) => {
              return { value: ds.name, label: ds.caption };
            })}
            onChange={(val) => {
              let new_data_source = data_sources.filter((ds) => {
                return ds.name == val.value;
              })[0];
              setDataSource(new_data_source);
              setSelectOptions(
                new_data_source.available_queries.map((q) => {
                  return { value: q.name, label: q.caption };
                }),
              );
            }}
          ></Select>
        </label>
        <hr />
        <label>
          Query:
          <Select
            className="data_selector"
            value={selectOptions[0]}
            options={selectOptions}
            onChange={(val) => {
              let newquery = data_source.available_queries.filter((qn) => {
                return qn.name == val.value;
              })[0];
              setQuery(newquery);
              setInputs(compute_inputs(newquery));
              setWIPS([]);
              setOutputs([
                //compute_outputs(newquery, [], "output", "Output Column"),
              ]);
            }}
          ></Select>
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
                  siblings={inputs}
                  setter={setInputs}
                  key="inputs"
                  use_field={false}
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
                      use_field={true}
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
        onClick={() => {
          let save_data = {
            name: pipelineName,
            caption: pipeline,
            inputs: inputs,
            wips: wips,
            outputs: outputs,
          };
          console.log(save_data);
        }}
      >
        Save
      </Button>
      <hr />
    </div>
  );
}
