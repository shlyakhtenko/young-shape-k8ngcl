import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function Card(props) {
  const [editor, setEditor] = useState(false);
  const [modal, setModal] = useState(false);
  console.log(setEditor);

  const save_card_field = (card_id, field_name, field_value) => {
    let new_cards = props.all_cards.map((card) => {
      return card.card_id != card_id
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
    });
    props.setter(new_cards);
  };
  return (
    <>
      <div className="Card" onDoubleClick={() => setModal(true)}>
        {Object.entries(props.data).map(([name, c]) => {
          return c.display_on_card || c.editable ? (
            <div key={name} className={c.editable ? "Editable" : "notEditable"}>
              <span className="caption">{c.caption}:</span>{" "}
              <span className="value">{c.value}</span>
            </div>
          ) : null;
        })}
      </div>
      <CardEditor show={editor} />
      <CardModal
        show={modal}
        setter={setModal}
        data={props.data}
        card_id={props.id}
        save_function={save_card_field}
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
    <div className="modal show">
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>
            {Object.entries(props.data).map(([name, c]) => {
              return c.display_on_card ? (
                <div key={name}>
                  <span className="value">{c.value}</span>
                </div>
              ) : null;
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
                    onChange={(e) =>
                      props.save_function(props.card_id, name, e.target.value)
                    }
                  />
                </FloatingLabel>
              </div>
            ) : null;
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
