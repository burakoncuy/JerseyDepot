import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchCart } from "../../redux/cart";
import { getFavorites } from "../../redux/favorite";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      await dispatch(fetchCart());
      await dispatch(getFavorites());
      navigate('/items');
      closeModal();
    }
  };

  const demoUser = async (e) =>{ 
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password"
      })
    );

    if (serverResponse) { 
      setErrors(serverResponse);
    } else {
      await dispatch(fetchCart());
      await dispatch(getFavorites());
      navigate('/items');
      closeModal();
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>

      <div className="login-errors">
        {errors.email && <p className="login-error">{errors.email}</p>}
        {errors.password && <p className="login-error">{errors.password}</p>}
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">Log In</button>
        <button onClick={demoUser} className="demo-button">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
