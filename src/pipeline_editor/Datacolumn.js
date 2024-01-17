import Button from "react-bootstrap/Button";
import { useState } from "react";

function Datacolumn(props) {
  // const [data, setData] = useState(props.column_data);
  const siblings = props.siblings;
  const setter = props.setter;
  const data = props.column_data;
  const [numLocFields, setNumLocFields] = useState(
    props.local_fields ? Object.keys(props.local_fields).length : 0,
  );

  const delete_field = (fieldName, fieldSet) => {
    delete fieldSet[fieldName];
    return fieldSet;
  };
  const save_caption = (fieldName, fieldCaption) => {
    props.setter(
      props.siblings.map((s) => {
        return s.name == data.name
          ? {
              ...s,
              local_fields: {
                ...s.local_fields,
                [fieldName]: {
                  ...s.local_fields[fieldName],
                  caption: fieldCaption,
                },
              },
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
              local_fields: {
                ...s.local_fields,
                [fieldName]: {
                  ...s.local_fields[fieldName],
                  edit_type: fieldType,
                },
              },
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
                  {[...f.criteria, []].map((c, n) => {
                    return (
                      <td key={n}>
                        <input
                          onChange={(e) => {
                            let newfields = null;
                            if (n != Object.entries(data.fields).length) {
                              newfields = Object.entries(data.fields).map(
                                ([, d]) => {
                                  return d.name == f.name
                                    ? {
                                        ...f,
                                        criteria: f.criteria.map((cc, k) => {
                                          return k != n
                                            ? cc
                                            : [{ op: e.target.value }];
                                        }),
                                      }
                                    : d;
                                },
                              );
                            } else {
                              newfields = Object.entries(data.fields);
                              newfields.push([{ op: e.target.value }]);
                            }

                            console.log(newfields);
                            let newsiblings = siblings.map((s) => {
                              return s.name == data.name
                                ? { ...data, fields: newfields }
                                : s;
                            });
                            console.log(newsiblings);
                            setter(newsiblings);
                          }}
                          value={c[0] ? c[0].op : ""}
                          // disabled={!f.editable}
                        ></input>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <>
              {props.local_fields ? (
                <>
                  <tr>
                    <th className="break" colSpan={3}></th>
                  </tr>
                  <tr>
                    <th colSpan={3} className="local_fields">
                      <h5>
                        <b>Pipeline-only fields (not saved to PITS)</b>
                      </h5>
                    </th>
                  </tr>

                  <tr>
                    <th>Field</th>

                    <th>Field Type</th>
                    <th></th>
                  </tr>
                  {Object.entries(props.local_fields).map(([n, f]) => (
                    <tr key={n}>
                      <td>
                        <input
                          value={f.caption}
                          className="local_field_input"
                          placeholder="Field Name"
                          onChange={(e) => {
                            save_caption(f.name, e.target.value);
                          }}
                        ></input>
                      </td>
                      <td>
                        <select
                          value={f.edit_type}
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
                                return s.name == data.name
                                  ? {
                                      ...s,
                                      local_fields: delete_field(
                                        f.name,
                                        s.local_fields,
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
                    <td colSpan={3} className="local_fields_add_button">
                      <Button
                        onClick={() => {
                          console.log(
                            "add field",
                            "local_fields",
                            props.local_fields,
                            "siblings",
                            props.siblings,
                            "column name",
                            data.name,
                          );
                          let newsibligns = props.siblings.map((s) => {
                            return s.name == data.name
                              ? {
                                  ...s,
                                  local_fields: {
                                    ...s.local_fields,
                                    ["local_field" + numLocFields]: {
                                      caption: "",
                                      edit_type: "string",
                                      name: "local_field" + numLocFields,
                                      editable: true,
                                      edit: true,
                                    },
                                  },
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
                                    local_fields: {
                                      ...s.local_fields,
                                      ["local_field" +
                                      numLocFields +
                                      Object.entries(props.local_fields)
                                        .length]: {
                                        caption: "",
                                        type: "string",
                                        name:
                                          "local_field" +
                                          numLocFields +
                                          Object.entries(props.local_fields)
                                            .length,
                                        editable: true,
                                        edit: true,
                                      },
                                    },
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
