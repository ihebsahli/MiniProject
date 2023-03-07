import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actionCreator";
import { useNavigate } from "react-router-dom";

import "../auth/signup.css";

export const SignUp = () => {

  const registerState = useSelector(state => state.newReducer.register)
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (registerState.loaded && registerState.data);
  }, [registerState])


  const handleAdduser = () => {
    const isValid = handleValidation();
    if (isValid) {
      dispatch(register(email, role, password));
      navigate(`/login`);

      // redirect to the list of reservations page
    }
  };

  const handleValidation = () => {
    let isValid = true;
    if (email.trim() === "") {
      isValid = false;
      alert("Email field is required.");
    }
    if (password.trim() === "") {
      isValid = false;
      alert("Password field is required.");
    }
    return isValid;
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            className="inputregister custom-input"
            value={email}
            required="required"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Your Email..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Role</label>
          <input
            className="inputregister custom-input"
            value={role}
            required="required"
            onChange={(e) => setRole(e.target.value)}
            type="role"
            placeholder="Your Role..."
            id="role"
            name="role"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="inputregister custom-input"
            value={password}
            required="required"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn-hover color-7 custom-btn" onClick={handleAdduser}>
          Sign Up
        </button>
      </form>
      {registerState.error && <span>erreur d'ajout</span>}
      <a className="link-btn" href="/login">
        Already have an account? Login here.
      </a>
    </div>
  );
};

export default SignUp;