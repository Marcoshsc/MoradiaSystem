import React from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import Input from "./Input";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { FaUserAlt } from "react-icons/fa";
import { BsFillLockFill } from "react-icons/bs";
const Panel: FC = () => {
  return (
    <div className={styles.panel}>
      <Logo />
      <Input placeholder="Usuário" Icon={FaUserAlt} />
      <Input placeholder="Senha" Icon={BsFillLockFill} />
      <button className={styles.buttonAccess}>Acessar</button>
      <p>
        Naõ possui conta? <span>Registre-se agora</span>
      </p>
    </div>
  );
};

export default Panel;
