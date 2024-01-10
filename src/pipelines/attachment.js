import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileViewer from "react-file-viewer";

export default function Attachment(props) {
  const [showModal, setShowModal] = useState(false);
  const url =
    "https://" +
    "docs.ipam.ucla.edu" +
    props.url +
    "&ipam_id=" +
    props.ipam_id +
    "&session_token=" +
    props.session_token;
  const date = new Date(props.date);
  return (
    <>
      {showModal ? (
        <div className="modal show attachmentModal">
          <Modal
            show={showModal}
            size="xl"
            onHide={() => setShowModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="attachmentModalTitle">
                Attachment Display
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div>
                <div>Name: {props.name}</div>
                <div>Date: {props.date}</div>
                <div className="attachmentViewer">
                  <FileViewer
                    zoom={203}
                    fileType={props.type.split("/")[1]}
                    filePath={url}
                    onError={() => setShowModal(false)}
                  ></FileViewer>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
      <div className="attachment" onDoubleClick={() => setShowModal(true)}>
        <img src={props.icon_url}></img>
        <div className="attachmentName">{props.name}</div>
        <div className="attachmentDate">
          {1 +
            date.getMonth() +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear() +
            " " +
            (date.getHours() % 12) +
            ":" +
            date.getMinutes() +
            (date.getHours() >= 12 ? "PM" : "AM")}
        </div>
      </div>
    </>
  );
}
