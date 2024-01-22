import { Modal, Button } from "react-bootstrap";

export default function ErrorDialog(props) {
  return (
    <div className="modal show errorDialog">
      <Modal
        show={props.show}
        size="sm"
        centered
        onHide={() => props.setter(false)}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
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
