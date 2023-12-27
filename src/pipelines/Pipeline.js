import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { get_card_data } from "./card_data";
import { ReactSortable } from "react-sortablejs";
import { Button } from "react-bootstrap";
import PartCard from "./Card";
import { LoginContext } from "../App";
import Modal from "react-bootstrap/Modal";

function ErrorDialog(props) {
  return (
    <div className="modal show">
      <Modal show={props.show}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <h1>Error</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.message}</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => props.setter(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
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
      <h1>
        {pipelineCaption} for {params.programCode}
        {console.log("Columns", columns, "Cards", column_cards)}
        <Button
          onClick={() => {
            console.log("Saving", column_cards);
          }}
        >
          Save
        </Button>{" "}
      </h1>

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
                key={c.name}
                group={{
                  name: c.name,
                  pull: c.pull,
                  put: c.put,
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
                      <div key={ccc.card_id}>
                        <PartCard
                          data={ccc.card_data}
                          card_id={ccc.card_id}
                          id={ccc.card_id}
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
                          }}
                          field_update_function={(field_name, field_value) => {
                            console.log(
                              "cardid",
                              ccc.card_id,
                              "updateing field",
                              field_name,
                              " to value ",
                              field_value,
                            );
                            setColumn_cards(
                              column_cards.map((card) => {
                                return card.card_id != ccc.card_id
                                  ? card
                                  : {
                                      ...card,
                                      card_data: {
                                        ...card.card_data,
                                        [field_name]: {
                                          ...card.card_data[field_name],
                                          value: field_value,
                                        },
                                      },
                                    };
                              }),
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
