import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Attachment from "./attachment";

//import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormLabel from "react-bootstrap/FormLabel";

export default function PartCard(props) {
  const [editor, setEditor] = useState(false);
  const [modal, setModal] = useState(false);
  //setEditor(false);

  return (
    <>
      <Card className="Card">
        <Card.Body onDoubleClick={() => setModal(true)}>
          <Card.Title>
            {Object.entries(props.data).map(([name, c]) => {
              return c.display_on_card ? (
                <div
                  key={name}
                  className={c.editable ? "Editable" : "notEditable"}
                >
                  <span className="caption">{c.caption}:</span>{" "}
                  <span className="value">
                    {c.edit_type != "select_yesno"
                      ? c.value
                      : c.value == null
                        ? ""
                        : c.value == 1
                          ? "Yes"
                          : "No"}
                  </span>
                </div>
              ) : (
                <div key={name}></div>
              );
            })}
          </Card.Title>
          <Card.Body>
            {Object.entries(props.data).map(([name, c]) => {
              return !c.display_on_card && c.edit ? (
                <div
                  key={name}
                  className={c.editable ? "Editable" : "notEditable"}
                >
                  <span className="caption">{c.caption}:</span>{" "}
                  <span className="value">
                    {c.edit_type != "select_yesno"
                      ? c.value
                      : c.value == null
                        ? ""
                        : c.value == 1
                          ? "Yes"
                          : "No"}
                  </span>
                </div>
              ) : (
                <div key={name}></div>
              );
            })}
          </Card.Body>
        </Card.Body>
      </Card>
      <CardEditor show={editor} setter={setEditor} />
      <CardModal
        show={modal}
        setter={setModal}
        data={props.data}
        card_id={props.card_id}
        update_card_data_function={props.update_card_data_function}
      />
    </>
  );
}

function CardEditor(props) {
  return (
    <div>
      <Modal show={props.show} onHide={() => props.setter(false)}>
        CardEditor
        <Modal.Header closeButton></Modal.Header>
      </Modal>
    </div>
  );
}

function get_attachments(
  token,
  setter,
  catd_id,
  pipeline,
  program_code,
  raiseError,
) {
  const headers = { authorization: "Basic " + token };
  const url =
    "https://docs.ipam.ucla.edu/cocytus/data_source.php?pipeline=" +
    pipeline +
    "&programcode=" +
    program_code;
  fetch(url, { mode: "cors", method: "GET", headers })
    .then((response) => {
      console.log("url", url);
      response
        .json()
        .then((data) => {
          //console.log("Got data:", data);
          setter(data);
          return;
        })
        .catch((err) => {
          raiseError(
            <div>
              <h1>JSON conversion error</h1>
              <h2>{"" + err}</h2>
              <div>{"url: " + url} </div>
              <div>
                Check your login credentials and whether the pipline name is
                valid
              </div>
            </div>,
          );
        });
    })
    .catch((err) => {
      raiseError(
        <div>
          <h1>Data load error</h1>
          <h2>{"" + err}</h2>
          <div>{"url: " + url} </div>
          <div>
            Check your login credentials and whether the pipline name is valid
          </div>
        </div>,
      );
    });
}

function CardModal(props) {
  var [field_values, setFieldValues] = useState(props.data);
  var [attachmentsLoaded, setAttachmentsLoaded] = useState(false);
  var [attachments, setAttachments] = useState([]);
  var [dragOver, setDragOver] = useState(false);

  if (!attachmentsLoaded) {
    setAttachmentsLoaded(true);

    get_attachments(
      props.token,
      setAttachments,
      props.card_id,
      props.pipeline,
      props.program_code,
      console.log,
    );
  }

  return (
    <div className="modal show cardModal">
      <Modal
        show={props.show}
        size="lg"
        onHide={() => {
          props.setter(false);
          setFieldValues(props.data);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="cardModalTitle">
            {Object.entries(props.data).map(([name, c]) => {
              return c.display_on_card && !c.edit ? (
                <div key={name}>
                  <span className="value">{c.value}</span>
                </div>
              ) : (
                <div key={name}></div>
              );
            })}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {Object.entries(field_values).map(([name, c]) => {
              return c.edit ? (
                <div key={name}>
                  <Form.Group className="mb-3">
                    <FormLabel>{c.caption}</FormLabel>
                    {c.edit_type == "select_yesno" ? (
                      <Form.Select
                        value={c.value}
                        onChange={(e) => {
                          setFieldValues({
                            ...field_values,
                            [name]: {
                              ...field_values[name],
                              value: e.target.value,
                            },
                          });
                        }}
                      >
                        <option value={null}>Unknown</option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </Form.Select>
                    ) : (
                      <Form.Control
                        as={c.edit_type == "textarea" ? "textarea" : "input"}
                        rows={4}
                        id={name}
                        value={c.value ? c.value : ""}
                        onChange={
                          (e) => {
                            setFieldValues({
                              ...field_values,
                              [name]: {
                                ...field_values[name],
                                value: e.target.value,
                              },
                            });
                          }
                          //(e) => props.save_function(name, e.target.value)
                        }
                      />
                    )}
                  </Form.Group>
                </div>
              ) : (
                <div key={name}></div>
              );
            })}
          </Form>
          <FormLabel>Attachments</FormLabel>
          <div className="attachments">
            {attachments.map((a) => {
              return (
                <Attachment
                  key={a.id}
                  name={a.name}
                  icon_url={a.icon_url}
                  id={a.id}
                  url={a.url}
                  type={a.type}
                  date={a.date}
                />
              );
            })}
          </div>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Drop files or emails here"
          >
            <div
              className={"dropArea" + (dragOver ? " dragOver" : "")}
              onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={(e) => {
                e.stopPropagation();
                e.preventDefault();
                let formData = null;
                console.log(e);
                Object.entries(e.dataTransfer.items).forEach(([k, item]) => {
                  if (item.kind == "file") {
                    formData = new FormData();
                    formData.append("attachment", item.getAsFile());
                    formData.append("card_id", props.card_id);
                    formData.append("pipeline", props.pipeline);
                    formData.append("program_code", props.program_code);
                    formData.append("userid", props.data.userid.value);
                    const headers = { authorization: "Basic " + props.token };
                    const url =
                      "https://docs.ipam.ucla.edu/cocytus/upload_attachment.php";
                    fetch(url, {
                      body: formData,
                      mode: "cors",
                      method: "POST",
                      headers: headers,
                    }).then((response) => {
                      response.text().then((data) => console.log(data));
                    });
                  }
                });
              }}
            ></div>
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.setter(false);
              console.log(field_values);
              props.update_card_data_function(field_values);
              /*Object.entries(field_values).map(([name, c]) => {
                props.save_function(name, c.value);
              });*/
            }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              props.setter(false);
              setFieldValues(props.data);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
