import { Modal, Button } from "react-bootstrap";

export default function ErrorDialog(props) {
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
