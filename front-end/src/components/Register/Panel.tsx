import React, { ChangeEventHandler, useContext } from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContenxt";
import { registerService } from "../../api/userService";
import { useHistory } from "react-router-dom";

const Panel: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const { handleSetUser } = useContext(AuthContext);
  const { push } = useHistory();
  function handleField(callback: (value: string) => void) {
    return (e: any) => {
      callback(e.target.value);
    };
  }

  function handleRegister() {
    registerService(name, email, phone, location, password).then((data) => {
      handleSetUser(data);
      push("/places");
    });
  }
  return (
    <div className={styles.panel}>
      <Logo />
      <input placeholder="Nome" value={name} onChange={handleField(setName)} />
      <input
        placeholder="Email"
        value={email}
        onChange={handleField(setEmail)}
      />
      <input
        placeholder="Senha"
        value={password}
        type="password"
        onChange={handleField(setPassword)}
      />
      <input placeholder="Tel" value={phone} onChange={handleField(setPhone)} />
      <input
        placeholder="Localização"
        value={location}
        onChange={handleField(setLocation)}
      />
      <button onClick={handleRegister} className={styles.buttonAccess}>
        Registrar
      </button>
      <p>
        <span>Voltar a tela de login</span>
      </p>
    </div>
  );
};

export default Panel;
