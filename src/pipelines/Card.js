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
              return !c.display_on_card && c.editable ? (
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
                <div key={name}></div>
              );
            })}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {Object.entries(field_values).map(([name, c]) => {
              return c.editable ? (
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
