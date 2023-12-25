import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
//import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function PartCard(props) {
  const [editor, setEditor] = useState(false);
  const [modal, setModal] = useState(false);
  console.log("Ignore", setEditor);

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
        save_function={props.field_update_function}
      />
    </>
  );
}

function CardEditor(props) {
  if (!props.show) {
    return null;
  }
  return <div>CardEditor</div>;
}

function CardModal(props) {
  return (
    <div className="modal show cardModal">
      <Modal show={props.show}>
        <Modal.Header>
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
          {Object.entries(props.data).map(([name, c]) => {
            return c.editable ? (
              <div key={name}>
                <FloatingLabel
                  controlId={name}
                  label={c.caption}
                  className="mb-3"
                >
                  <Form.Control
                    as={c.edit_type == "textarea" ? "textarea" : "input"}
                    aria-label={c.caption}
                    value={c.value}
                    onChange={(e) => props.save_function(name, e.target.value)}
                  />
                </FloatingLabel>
              </div>
            ) : (
              <></>
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => props.setter(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
