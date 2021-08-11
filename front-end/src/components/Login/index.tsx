import React from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import Panel from "./Panel";

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <Panel />
    </div>
  );
};

export default Login;
