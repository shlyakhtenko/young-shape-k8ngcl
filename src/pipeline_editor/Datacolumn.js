import Button from "react-bootstrap/Button";
import { useState } from "react";

function Datacolumn(props) {
  // const [data, setData] = useState(props.column_data);
  const siblings = props.siblings;
  const setter = props.setter;
  const data = props.column_data;
  const [numLocFields, setNumLocFields] = useState(0);

  const save_caption = (fieldName, fieldCaption) => {
    props.setter(
      props.siblings.map((s) => {
        return s.name == data.name
          ? {
              ...s,
              local_fields: props.local_fields.map((lf) => {
                if (lf.name == fieldName) {
                  return {
                    ...lf,
                    caption: fieldCaption,
                  };
                } else {
                  return lf;
                }
              }),
            }
          : s;
      }),
    );
  };

  const save_type = (fieldName, fieldType) => {
    props.setter(
      props.siblings.map((s) => {
        return s.name == data.name
          ? {
              ...s,
              local_fields: props.local_fields.map((lf) => {
                if (lf.name == fieldName) {
                  return {
                    ...lf,
                    type: fieldType,
                  };
                } else {
                  return lf;
                }
              }),
            }
          : s;
      }),
    );
  };

  return (
    <div className="column">
      <label>
        Column:
        <input
          key="column_name"
          value={data.caption}
          onChange={(e) => {
            //console.log(siblings);
            let newsiblings = siblings.map((s) => {
              return s.name == data.name
                ? { ...data, caption: e.target.value }
                : s;
            });
            //console.log(newsiblings);
            setter(newsiblings);
            //setter((siblings) => ({ ...data, caption: e.target.value }));
          }}
        ></input>
      </label>

      <div>
        <table className="fieldTable">
          <thead>
            <tr>
              <th>Field</th>
              {props.use_field ? <th>Display?</th> : ""}
              {props.edit_field ? <th>Edit?</th> : ""}
              <th>Criteria</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.fields).map(([, f]) => {
              return (
                <tr key={"tr_" + f.name}>
                  <td>{f.caption}</td>
                  {props.use_field ? (
                    <td>
                      <input
                        key={data.name + "_" + f.name + "_use"}
                        type="checkbox"
                        checked={f.display_on_card}
                        onChange={(e) => {
                          let newfields = Object.entries(data.fields).map(
                            ([, d]) => {
                              return d.name == f.name
                                ? { ...f, display_on_card: e.target.checked }
                                : d;
                            },
                          );
                          let newsiblings = siblings.map((s) => {
                            return s.name == data.name
                              ? { ...data, fields: newfields }
                              : s;
                          });
                          setter(newsiblings);
                        }}
                      />
                    </td>
                  ) : (
                    ""
                  )}

                  {props.edit_field ? (
                    <td>
                      <input
                        key={data.name + "_" + f.name + "_edit"}
                        type="checkbox"
                        checked={f.edit ? 1 : 0}
                        disabled={!f.editable || f.primary_key}
                        onChange={(e) => {
                          let newfields = Object.entries(data.fields).map(
                            ([, d]) => {
                              return d.name == f.name
                                ? { ...f, edit: e.target.checked }
                                : d;
                            },
                          );
                          //console.log(newfields);
                          let newsiblings = siblings.map((s) => {
                            return s.name == data.name
                              ? { ...data, fields: newfields }
                              : s;
                          });
                          //console.log(newsiblings);
                          setter(newsiblings);
                          props.output_setter([]);
                        }}
                      />
                    </td>
                  ) : (
                    ""
                  )}

                  <td>
                    <input
                      key={data.name + "_" + f.name + "_criteria"}
                      onChange={(e) => {
                        let newfields = Object.entries(data.fields).map(
                          ([, d]) => {
                            return d.name == f.name
                              ? { ...f, criteria: [[{ op: e.target.value }]] }
                              : d;
                          },
                        );
                        console.log(newfields);
                        let newsiblings = siblings.map((s) => {
                          return s.name == data.name
                            ? { ...data, fields: newfields }
                            : s;
                        });
                        console.log(newsiblings);
                        setter(newsiblings);
                      }}
                      value={f.criteria[0][0] ? f.criteria[0][0].op : ""}
                      // disabled={!f.editable}
                    ></input>
                  </td>
                </tr>
              );
            })}
            <>
              {props.local_fields ? (
                <>
                  <tr>
                    <th colSpan={3}>Local Fields (not saved to PITS)</th>
                  </tr>
                  <tr>
                    <th>Field</th>

                    <th>Field Type</th>
                    <th></th>
                  </tr>
                  {props.local_fields.map((f) => (
                    <tr key={f.name}>
                      <td>
                        <input
                          value={f.caption}
                          placeholder="Field Name"
                          onChange={(e) => {
                            save_caption(f.name, e.target.value);
                          }}
                        ></input>
                      </td>
                      <td>
                        <select
                          value={f.type}
                          onChange={(e) => save_type(f.name, e.target.value)}
                        >
                          <option value="string">Short text or Number</option>
                          <option value="textarea">Long text</option>
                          <option value="select_yesno">Yes/No</option>
                        </select>
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => {
                            props.setter(
                              props.siblings.map((s) => {
                                console.log(
                                  "will set local_fields to ",
                                  s.local_fields.filter(
                                    (lf) => lf.name != f.name,
                                  ),
                                );

                                return s.name == data.name
                                  ? {
                                      ...s,
                                      local_fields: s.local_fields.filter(
                                        (lf) => lf.name != f.name,
                                      ),
                                    }
                                  : s;
                              }),
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3}>
                      <Button
                        onClick={() => {
                          console.log(
                            "add field",
                            "siblings",
                            props.siblings,
                            "column name",
                            data.name,
                          );
                          let newsibligns = props.siblings.map((s) => {
                            return s.name == data.name
                              ? {
                                  ...s,
                                  local_fields: [
                                    ...(s.local_fields ? s.local_fields : []),
                                    {
                                      caption: "",
                                      type: "string",
                                      name: "local_field" + numLocFields,
                                      editable: true,
                                      edit: true,
                                    },
                                  ],
                                }
                              : s;
                          });
                          setNumLocFields((n) => n + 1);
                          console.log(
                            "siblings",
                            props.siblings,
                            "newsibligs",
                            newsibligns,
                          );
                          props.setter(
                            props.siblings.map((s) => {
                              return s.name == data.name
                                ? {
                                    ...s,
                                    local_fields: [
                                      ...props.local_fields,
                                      {
                                        caption: "",
                                        type: "string",
                                        name: "local_field" + numLocFields,
                                        editable: true,
                                        edit: true,
                                      },
                                    ],
                                  }
                                : s;
                            }),
                          );
                        }}
                      >
                        Add Field
                      </Button>
                    </td>
                  </tr>
                </>
              ) : null}
            </>
          </tbody>
        </table>
        {props.remove_button ? (
          <Button
            onClick={() => {
              let newsiblings = siblings.filter((s) => {
                if (props.keep_column) {
                  console.log(
                    "Datacolumn:",
                    "s.name=",
                    s.name,
                    "keep_column=",
                    props.keep_column,
                  );
                  return s.name != data.name || s.name == props.keep_column;
                } else {
                  return s.name != data.name;
                }
              });
              setter(newsiblings);
            }}
          >
            Delete Column
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
//
export default Datacolumn;
