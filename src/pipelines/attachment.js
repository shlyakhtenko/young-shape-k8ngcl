import { useState } from "react";
import { Modal } from "react-bootstrap";



export default function Attachment(props) {
  const [display, setDisplay] = useState(false);
  return (
    <>
      <div className="modal show attachmentModal">
        <Modal show={props.display} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="attachmentModalTitle">
              <div>
                {props.type == "email" ? "Subject: " : "File name: "}{" "}
                {props.name}
              </div>
              <div>Date: {props.date}</div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body></Modal.Body>
        </Modal>
      </div>
      <div className="attachment" onClick={() => setDisplay(true)}>
        <img src={props.icon_url}></img>
        <div>{props.name}</div>
        <div>{props.date}</div>
      </div>
    </>
  );
}
