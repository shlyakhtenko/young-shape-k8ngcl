import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Login(props) {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.setLoginToken(btoa(loginName + ":" + loginPassword));
        }}
      >
        Login
      </Button>
    </Form>
  );
}
