import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormLabel from "react-bootstrap/FormLabel";

import $ from "jquery";
import ReactSummernote from "../summernote/summer-note.js";
//import "../summernote/summernote.js";

function makeFieldButton(buttonText, buttonTip, fieldText) {
  var fieldButton = function (context) {
    var ui = $.summernote.ui;
    var button = ui.button({
      contents: '<b class = "fa fa-child"/>' + buttonText,

      click: function () {
        var node = document.createElement("input");
        node.type = "button";
        node.value = fieldText;
        $(node).addClass("field_button");
        context.invoke("insertNode", node);
      },
    });
    return button.render();
  };
  return fieldButton;
}

export default function CardEditor(props) {
  var buttons = {};
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [cc, setCc] = useState("");
  var toolbar = [
    ["style", ["bold", "italic", "underline", "clear", "strikethrough"]],
    ["para", ["ul", "ol", "paragraph"]],
    ["color", ["color"]],
  ];

  Object.entries(props.card_data).forEach(([name, c]) => {
    if (c.editable == true || c.display_on_card == true) {
      toolbar.push(["Field:" + name, [name]]);
      buttons[name] = makeFieldButton(
        c.caption,
        c.caption,
        "[" + c.caption + "]",
      );
    }
  });

  toolbar.push(["Data-collection-url", ["data-collection-url"]]);
  buttons["data-collection-url"] = makeFieldButton(
    "Upload link",
    "Upload link",
    "[Upload Link]",
  );

  return (
    <Modal size="xl" show={props.show} onHide={() => props.setter(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Email Editor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <FloatingLabel
            controlId="floatingSelect"
            label="Select a template to load"
          >
            <Form.Select placeholder="Choose  template" onChange={() => {}}>
              {props.email_templates?.map((email_template) => (
                <option value={email_template.name} key={email_template.name}>
                  {email_template.caption}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <hr />
          <FormLabel>Email message:</FormLabel>
          <FloatingLabel controlId="floatingInput" label="Subject">
            <Form.Control value={subject}></Form.Control>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Cc">
            <Form.Control value={cc}></Form.Control>
          </FloatingLabel>
          {
            <ReactSummernote
              options={{
                height: 350,
                dialogsInBody: true,
                toolbar: toolbar,
                buttons: buttons,
              }}
              value={message}
              onChange={(value) => {
                setMessage(value);
              }}
            />
          }
        </>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            props.setter(false);
            console.log(message);
          }}
        >
          Send Email
        </Button>
        <Button variant="secondary" onClick={() => props.setter(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
