import "./styles.css";
import { useState } from "react";
import {
  compute_wips,
  compute_inputs,
  compute_outputs,
} from "./column_helpers.js";

import get_pipeline_data from "./available_pipelines.js";
import Datacolumn from "./Datacolumn.js";
import get_data_sources from "./available_queries.js";
//import Select from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
//import { Routes, Route } from 'react-router-dom';

export default function PipelineEditor(props) {
  let target_pipeline = null;
  let pipeline_data = null;
  if (props.pipeline != "new") {
    let params = useParams();
    target_pipeline = params.pipelineName;
    pipeline_data = get_pipeline_data().find((p) => p.name == target_pipeline);
  }

  if (pipeline_data == null) {
    target_pipeline = "Pipeline";

    var [pipelineName, setPipelineName] = useState(target_pipeline); // pipelineID
    var [pipeline, setPipeline] = useState(target_pipeline);

    var data_sources = get_data_sources();
    var [data_source, setDataSource] = useState(data_sources[0]);
    var [query, setQuery] = useState(data_source.available_queries[0]);
    var [inputs, setInputs] = useState(compute_inputs(query));
    //const [wips, setWIPS] = useState([compute_wips(query, 'wip1','Work in Progress')]);
    var [wips, setWIPS] = useState([]);
    var [outputs, setOutputs] = useState([
      // compute_outputs(query, wips, "output", "Output Column"),
    ]);

    var [selectOptions, setSelectOptions] = useState(
      data_source.available_queries.map((q) => {
        return { value: q.name, label: q.caption };
      }),
    );
  } else {
    [pipelineName, setPipelineName] = useState(target_pipeline); // pipelineID
    [pipeline, setPipeline] = useState(pipeline_data.caption);

    data_sources = get_data_sources();
    [data_source, setDataSource] = useState(
      data_sources.find((x) => x.name == pipeline_data.data_source),
    );
    [query, setQuery] = useState(
      data_source.available_queries.find(
        (x) => x.name == pipeline_data.inputs[0].query,
      ),
    );
    [inputs, setInputs] = useState(pipeline_data.inputs);
    //const [wips, setWIPS] = useState([compute_wips(query, 'wip1','Work in Progress')]);
    [wips, setWIPS] = useState(pipeline_data.wips);
    [outputs, setOutputs] = useState(pipeline_data.outputs);

    [selectOptions, setSelectOptions] = useState(
      data_source.available_queries.map((q) => {
        return { value: q.name, label: q.caption };
      }),
    );
  }

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
            if (pipelineName == "Pipeline") {
              setPipelineName(e.target.value.split(" ").join("_"));
            }
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
              setInputs(compute_inputs(new_data_source.available_queries[0]));
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
            data_source: data_source.name,
            name: pipelineName,
            caption: pipeline,
            inputs: inputs,
            wips: wips,
            outputs: outputs,
          };
          console.log(JSON.stringify(save_data));
        }}
      >
        Save
      </Button>
      <hr />
    </div>
  );
}
