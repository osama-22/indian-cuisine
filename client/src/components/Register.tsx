import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, makeStyles } from "@fluentui/react-components";
import {
  MailRegular,
  PasswordRegular,
  SlideTextPersonRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1rem",
  },
});

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const styles = useStyles();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      const token = response.data.token;
      alert("Registration successful!");
      login(token); // Update user context
      navigate("/"); // Redirect to home or desired page
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error registering user.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>New user</h1>
      <div className={styles.fieldsContainer}>
        <Input
          type="text"
          placeholder="Name"
          contentBefore={<SlideTextPersonRegular />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        Register
      </Button>
    </form>
  );
};

export default Register;
