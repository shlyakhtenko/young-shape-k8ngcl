import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
//import InputGroup from "react-bootstrap/InputGroup";
//import FloatingLabel from "react-bootstrap/FloatingLabel";
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
                  <span className="value">{c.value}</span>
                </div>
              ) : (
                <></>
              );
            })}
          </Card.Title>
          <Card.Text>
            {Object.entries(props.data).map(([name, c]) => {
              return !c.display_on_card && c.editable ? (
                <div
                  key={name}
                  className={c.editable ? "Editable" : "notEditable"}
                >
                  <span className="caption">{c.caption}:</span>{" "}
                  <span className="value">{c.value}</span>
                </div>
              ) : (
                <></>
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
      <CardEditor show={editor} />
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
      <Modal show={props.show}>CardEditor</Modal>
    </div>
  );
}

function CardModal(props) {
  var [field_values, setFieldValues] = useState(props.data);

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
              return c.display_on_card ? (
                <div key={name}>
                  <span className="value">{c.value}</span>
                </div>
              ) : (
                <></>
              );
            })}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {Object.entries(field_values).map(([name, c]) => {
              return c.editable ? (
                <div key={name}>
                  <Form.Group className="mb-3" controlId={name}>
                    <FormLabel controlId={name}>{c.caption}</FormLabel>
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
                        value={c.value}
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
                <></>
              );
            })}
          </Form>
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
