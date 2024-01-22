import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useContext, lazy } from "react";
import { get_card_data } from "./card_data";
import { ReactSortable } from "react-sortablejs";
import { Button, Breadcrumb } from "react-bootstrap";
//import PartCard from "./Card";

const PartCard = lazy(() => import("./Card.js"));
import { LoginContext } from "../App";
import ErrorDialog from "../ErrorDialog";

import { set } from "local-storage";

function verify(operator, value) {
  //console.log("verifying", operator, value);
  if (operator == null) return true;
  let op = operator.op;
  if (op == null) return true;
  op = op.trim();

  if (op.substring(0, 1) == "") return true;
  if (op.substring(0, 1) == "=") {
    let val = op.substring(1).trim();
    if (val == "NULL") return value == null || value == "";

    if (val == "TRUE" || val == "1") return value == true;
    if (val == "FALSE" || val == "0") return value == false;
    return value == val;
  }
  if (op.substring(0, 1) == "!") {
    op = op.substring(1).trim();
    if (op.substring(0, 1) == "=") {
      let val = op.substring(1).trim();
      if (val == "NULL") return value != null && value != "";
      if (val == "TRUE" || val == "1") return value != true;
      if (val == "FALSE" || val == "0") return value != false;
      return value != val;
    }
  }
}

function verify_card_with_details(card_data, column) {
  let and_conditions = [];

  const num_or_fields = Object.entries(card_data)
    .map(([, v]) => v.criteria.length)
    .reduce((a, b) => Math.max(a, b), 0);

  for (let i = 0; i < num_or_fields; i++) {
    and_conditions.push(
      Object.entries(card_data)
        .map(([_, f]) => {
          if (
            column.fields[f.name] == null ||
            column.fields[f.name].criteria[i] == null
          )
            return { val: true, reason: "" };
          let val = verify(column.fields[f.name].criteria[i][0], f.value);

          return {
            val: val,
            reason: val
              ? ""
              : " " +
                f.caption +
                " must " +
                column.fields[f.name].criteria[i][0].op,
          };
        })
        .reduce(
          (a, b) => {
            return {
              val: a.val && b.val,
              reason: a.reason + b.reason,
            };
          },
          { val: true, reason: "" },
        ),
    );
  }
  return and_conditions.reduce(
    (a, b) => {
      return {
        val: a.val || b.val,
        reason: a.reason + b.reason,
      };
    },
    { val: false, reason: "" },
  );
}

function verify_card(card_data, column) {
  let and_conditions = [];

  const num_or_fields = Object.entries(card_data)
    .map(([, v]) => v.criteria.length)
    .reduce((a, b) => Math.max(a, b), 0);

  for (let i = 0; i < num_or_fields; i++) {
    and_conditions.push(
      Object.entries(card_data)
        .map(([_, f]) => {
          if (column.fields[f.name] == null) return true;
          if (column.fields[f.name].criteria[i] == null) {
            /*console.log(
              "examinning f.name=",
              f.name,
              "criteria=",
              column.fields[f.name].criteria,
              "i=",
              i,
              "value = ",
              f.value,
            ); */
            return true;
          }
          //console.log(column.fields[f.name].criteria[i])
          /* console.log(
            "examinning f.name=",
            f.name,
            "criteria=",
            column.fields[f.name].criteria[i][0],
            "i=",
            i,
            "value = ",
            f.value,
          ); */

          return verify(column.fields[f.name].criteria[i][0], f.value);
        })
        .reduce((a, b) => a && b, true),
    );
  }
  return and_conditions.reduce((a, b) => a || b, false);
}

export default function Pipeline() {
  let params = useParams();
  const loginToken = useContext(LoginContext);
  const [columns, setColumns] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [pipelineCaption, setPipelineCaption] = useState(params.pipelineName);
  const [column_cards, setColumn_cards] = useState([]);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [errorMessage2, setErrorMessage2] = useState("");

  let save_one_card = (card_id, column, callback, card_data = null) => {
    const headers = {
      //authorization: "Basic " + loginToken,
      "Content-Type": "application/json",
    };
    setTimeout(() => {
      setErrorMessage2("");
    }, 3000);
    const url =
      "https://docs.ipam.ucla.edu/cocytus/save_card.php?ipam_id=" +
      loginToken.ipam_id +
      "&session_token=" +
      loginToken.session_token +
      "&pipeline=" +
      params.pipelineName +
      "&programcode=" +
      params.programCode;
    let new_card = card_data;
    if (!new_card) new_card = column_cards.find((c) => c.card_id == card_id);
    const body = JSON.stringify({ ...new_card, target_column: column });
    callback("Saving...");
    console.log("save_one_card", card_id, column, body);
    fetch(url, {
      mode: "cors",
      headers: headers,
      body: body,
      method: "POST",
    })
      .then((response) => {
        response.text().then((txt) => {
          console.log("saved card got response", txt);
          callback("Saved.");
        });
      })
      .catch((error) => {
        callback("Save error.");
        console.log("save_one_card save error:  ", error);
      });
  };

  let setup_data = (card_data) => {
    console.log("setup_data", card_data);
    setColumn_cards(card_data.cards);
    console.log("got column data", card_data.columns);
    setColumns(card_data.columns);
    setPipelineCaption(card_data.pipelineCaption);
  };

  let raiseError = (message) => {
    console.log("raiseError", message);
    setErrorDialog(true);
    setErrorMessage(message);
  };

  if (!loaded) {
    get_card_data(
      params.pipelineName,
      params.programCode,
      loginToken,
      setup_data,
      raiseError,
    );
    setLoaded(true);
  }
  //const [columns, setColumns] = useState(card_data.columns);

  return (
    <>
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        setter={setErrorDialog}
      />
      <div className="Pipeline">
        <div
          className={"ErrorMessage " + (errorMessage2 == "" ? "hidden" : "")}
        >
          {errorMessage2}
        </div>

        <div className="top_bar">
          <Breadcrumb className="Breadcrumb">
            <Breadcrumb.Item href="/malebolge">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={"/malebolge/workshop/" + params.programCode}>
              {params.programCode}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{pipelineCaption}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="saveStatus">
            Data status: {saveStatus}
            <Button
              className="SaveButton"
              size="sm"
              onClick={() => {
                const headers = {
                  //authorization: "Basic " + loginToken,
                  "Content-Type": "application/json",
                };
                const url =
                  "https://docs.ipam.ucla.edu/cocytus/save_cards.php?ipam_id=" +
                  loginToken.ipam_id +
                  "&session_token=" +
                  loginToken.session_token +
                  "&pipeline=" +
                  params.pipelineName +
                  "&programcode=" +
                  params.programCode;
                const body = JSON.stringify(column_cards);

                console.log(
                  "saving column_cards before fetch url=",
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
                    setSaveStatus("Saved.");
                    console.log("Saving pipline. Got response: " + text);
                  });
                });
                //console.log(JSON.stringify(save_data));
              }}
            >
              Save All Cards
            </Button>
          </div>
        </div>
        <div className="Columns">
          {columns.map((c) => {
            return (
              <div className="columnContainer" key={c.name}>
                <h2>
                  {c.caption}
                  <span className="cardCount">
                    (
                    {
                      column_cards.filter((cc) => cc.target_column == c.name)
                        .length
                    }
                    )
                  </span>
                  <span className="cardCount newCards">
                    {column_cards.filter(
                      (cc) => cc.target_column == c.name && cc.brand_new,
                    ).length > 0
                      ? " [" +
                        column_cards.filter(
                          (cc) => cc.target_column == c.name && cc.brand_new,
                        ).length +
                        " new]"
                      : ""}{" "}
                  </span>
                </h2>
                <ReactSortable
                  className="column"
                  id={c.name}
                  key={c.name}
                  group={{
                    name: c.name,
                    pull: c.pull,
                    put: c.put,
                  }}
                  onMove={(e) => {
                    console.log("onMove", e);
                    const card = column_cards.find(
                      (c) => c.card_id == e.dragged.id,
                    );
                    const target_column = columns.find(
                      (cc) => cc.name == e.to.id,
                    );
                    console.log("column = ", target_column);
                    const res = verify_card_with_details(
                      card.card_data,
                      target_column,
                    );
                    if (!res.val) {
                      console.log(res);
                      e.preventDefault();
                      e.stopPropagation();
                      setErrorMessage2(
                        "The card cannoted be moved.\n" +
                          'In column "' +
                          target_column.caption +
                          '", the following condtions must be satisfied: ' +
                          res.reason,
                      );

                      //setErrorDialog(true);

                      return false;
                    }
                    setErrorMessage2("");
                    return true;
                  }}
                  onEnd={(e) => {
                    save_one_card(e.item.id, e.to.id, setSaveStatus);

                    setColumn_cards((l) =>
                      l.map((cc) => {
                        return cc.card_id == e.item.id
                          ? {
                              ...cc,
                              brand_new: false,
                            }
                          : cc;
                      }),
                    );
                  }}
                  list={column_cards.filter((cc) => {
                    return cc.target_column == c.name;
                  })}
                  setList={(newlist, callback = null) => {
                    console.log(
                      "Sortable setlist newlist =",
                      newlist,
                      "callback",
                      callback,
                    );
                    console.log("Newlist", newlist);
                    console.log(
                      "got new list",
                      newlist,
                      "for column",
                      c.name,
                      "will update with",
                      newlist.map((cc) => {
                        return {
                          ...cc,
                          target_column: c.name,
                        };
                      }),
                    );

                    setColumn_cards((x) => {
                      return x.map((card) => {
                        return newlist
                          .map((z) => z.card_id)
                          .includes(card.card_id)
                          ? {
                              ...card,
                              target_column: c.name,
                            }
                          : card;
                      });
                    });
                    //if (callback != null) callback(newlist);
                  }}
                >
                  {column_cards
                    .filter((x) => x.target_column == c.name)
                    .map((ccc) => {
                      return (
                        <div key={ccc.card_id} id={ccc.card_id}>
                          <PartCard
                            data={ccc.card_data}
                            criteria_satisfied={verify_card(ccc.card_data, c)}
                            card_id={ccc.card_id}
                            wilted={ccc.wilted}
                            brand_new={ccc.brand_new}
                            loginToken={loginToken}
                            pipeline_name={params.pipelineName}
                            program_code={params.programCode}
                            email_templates={c.email_templates}
                            update_card_data_function={(new_card_data) => {
                              setColumn_cards(
                                column_cards.map((card) => {
                                  return card.card_id != ccc.card_id
                                    ? card
                                    : {
                                        ...card,
                                        card_data: new_card_data,
                                        brand_new: false,
                                      };
                                }),
                              );
                              save_one_card(
                                ccc.card_id,
                                ccc.target_column,
                                setSaveStatus,
                                {
                                  ...ccc,
                                  card_data: new_card_data,
                                  brand_new: false,
                                },
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                </ReactSortable>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
