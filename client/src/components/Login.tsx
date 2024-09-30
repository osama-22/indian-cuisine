import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button, Input, makeStyles } from "@fluentui/react-components";
import { MailRegular, PasswordRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1rem",
  },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const styles = useStyles();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.token;
      login(token);
      navigate("/");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div className={styles.fieldsContainer}>
        <Input
          type="email"
          placeholder="Email"
          contentBefore={<MailRegular />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          contentBefore={<PasswordRegular />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button appearance="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
