import React, { useRef, useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from '../../api/axios';
import AuthContext from "../../context/AuthProvider";
import { Form, Button, Alert } from "react-bootstrap";


const LOGIN_URL = '/login';

export const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pass]);

  if (localStorage.token) {
    return <Navigate to='/reservation' />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, { email: email, password: pass },
        {
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
        }
      );
      localStorage.setItem('token', JSON.stringify(response?.data));
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pass, roles, accessToken });
      setEmail('');
      setPass('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            {/* <a href="#">Go to Home</a> */}
          </p>
        </section>
      ) : (
        <section>
          <div className="container">
            <div className="auth-form-container">
              {errMsg && (
                <Alert variant="danger" className="mb-3">
                  {errMsg}
                </Alert>
              )}
              <h2>Log In</h2>
              <br />
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    required="required"
                    onChange={(e) => setEmail(e.target.value)}
                    ref={userRef}
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={pass}
                    required="required"
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-hover color-7 custom-btn"
                >
                  Sign In
                </Button>
              </Form>
              <a className="link-btn" href="/signup">
                Don't have an account? Register here.
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )

}

export default Login;