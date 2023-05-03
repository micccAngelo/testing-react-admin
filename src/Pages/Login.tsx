import { useEffect, useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ email, password });
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
    } catch (error) {
      notify("Invalid username or password");
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="container">
      <div className="line">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <img className="logo" src="Pharos_LQ 1.png" alt="Logo" />
          </div>
          <div className="fields">
            <input
              className="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="fields">
              <input
                className="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
          </div>

          <div className="field-remember">
            <label className="remember">
              <input
                className="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Tetap Masuk
            </label>
            <a href="#" className="forgot-password">Lupa Password?</a>
          </div>

          <div className="fields">
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
