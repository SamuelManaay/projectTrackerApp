// import logo from './logo.svg';
import './Login.css';
// import axios from 'axios';
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom';

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();


  function TryLogin(e) {
    e.preventDefault();
    let request = {
      email: document.getElementById('empID').value,
      password: document.getElementById('exampleInputPassword1').value,
    }
    if (request.email == "sam" && request.password == "sam") {
        history.push('dashboard')
    }
    else {
      setShow(true)
    }

  }

  return (
    <div className="center">

      <form onSubmit={(e) => TryLogin(e)}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incorrect Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Can't find Employee</Modal.Body>
      </Modal>

        <div class="mb-3">
          <label for="empID" class="form-label">Employee ID</label>
          <input type="name" class="form-control" id="empID" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}


export default Login;
