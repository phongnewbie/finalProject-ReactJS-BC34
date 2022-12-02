import React from "react";
import { Form, Button } from "react-bootstrap";
import "./main.css";
export default function AllBody() {
  return (
    <div className="w-25  float-right border border-warning p-2 mt-2">
      <Form>
        <Form.Group
          className="mb-3 text-white"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Tài Khoản</Form.Label>
          <Form.Control type="text" placeholder="Tài Khoản" />
        </Form.Group>
        <Form.Group
          className="mb-3 text-white"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Mật Khẩu</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className="" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
