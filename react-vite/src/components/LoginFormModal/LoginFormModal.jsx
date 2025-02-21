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
  const navigate = useNavigate()

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
      await dispatch(fetchCart())
      await dispatch(getFavorites())
      navigate('/items')
      closeModal();
    }
  };

  const demoUser = async (e) =>{ 
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password"
      }))
      if (serverResponse) { 
        setErrors(serverResponse)
      }else {
        await dispatch(fetchCart())
        await dispatch(getFavorites())

        navigate('/items')
        closeModal()
      }
  }

  return (
    <div className="main-login">
      <h1>Log In</h1>
      <div>
      {errors.email && <p className="error-mesa">{errors.email}</p>}
      {errors.password && <p className="error-mes">{errors.password}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={demoUser}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
