import React from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import Input from "./Input";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { FaUserAlt } from "react-icons/fa";
import { BsFillLockFill } from "react-icons/bs";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContenxt";
import { useHistory } from "react-router-dom";
const Panel: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { singIn } = useContext(AuthContext);
  const { push } = useHistory();
  function handleEmail(input: string) {
    setEmail(input);
  }

  function handlePassword(input: string) {
    setPassword(input);
  }

  function handleSingIn() {
    singIn(email, password).then((e) => {
      if (!e) setError(!e);
      else push("/places");
    });
  }

  return (
    <div className={styles.panel}>
      <Logo />
      <Input callback={handleEmail} placeholder="Usuário" Icon={FaUserAlt} />
      <Input
        callback={handlePassword}
        placeholder="Senha"
        Icon={BsFillLockFill}
      />
      <button className={styles.buttonAccess} onClick={handleSingIn}>
        Acessar
      </button>
      {error && <p>Login inválido</p>}
      <p>
        Naõ possui conta? <span>Registre-se agora</span>
      </p>
    </div>
  );
};

export default Panel;
