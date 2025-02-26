import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!email) {
      newErrors.email = "Email is required.";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    // Return true if no errors, else false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p className="error-message" key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="login-form">
        <label className="input-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </label>
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label className="input-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </label>
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" className="submit-button">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
