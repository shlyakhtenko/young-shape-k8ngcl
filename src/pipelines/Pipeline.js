import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { get_card_data } from "./card_data";
import { ReactSortable } from "react-sortablejs";
import { Button, Breadcrumb } from "react-bootstrap";
import PartCard from "./Card";
import { LoginContext } from "../App";
import ErrorDialog from "../ErrorDialog";

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

  let save_one_card = (card_id, column, callback, card_data = null) => {
    const headers = {
      authorization: "Basic " + loginToken,
      "Content-Type": "application/json",
    };
    const url =
      "https://docs.ipam.ucla.edu/cocytus/save_card.php?pipeline=" +
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
    <div className="Pipeline">
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        setter={setErrorDialog}
      />
      <div className="top_bar">
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={"/workshop/" + params.programCode}>
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
                authorization: "Basic " + loginToken,
                "Content-Type": "application/json",
              };
              const url =
                "https://docs.ipam.ucla.edu/cocytus/save_cards.php?pipeline=" +
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
                onEnd={(e) => {
                  save_one_card(e.item.id, e.to.id, setSaveStatus);
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
                          card_id={ccc.card_id}
                          update_card_data_function={(new_card_data) => {
                            setColumn_cards(
                              column_cards.map((card) => {
                                return card.card_id != ccc.card_id
                                  ? card
                                  : {
                                      ...card,
                                      card_data: new_card_data,
                                    };
                              }),
                            );
                            save_one_card(
                              ccc.card_id,
                              ccc.target_column,
                              setSaveStatus,
                              { ...ccc, card_data: new_card_data },
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
  );
}
