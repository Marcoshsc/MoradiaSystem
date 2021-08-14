import React, { useState } from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import Avatar from "../../images/image-login.png";
import { useHistory } from "react-router-dom";

const NavBar: FC = () => {
  const [index, setIndex] = useState(0);
  const history = useHistory();

  const handleChangeMenu = (indexSelected: number) => {
    setIndex(indexSelected);
    switch (indexSelected) {
      case 0:
        history.push("/places");
        break;
      case 1:
        history.push("/users");
        break;
      case 2:
        history.push("/contracts");
        break;
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.itensWrapper}>
        <div className={styles.navitens}>
          <div onClick={() => handleChangeMenu(0)}>imóveis</div>
          <div onClick={() => handleChangeMenu(1)}>usuário</div>
          <div onClick={() => handleChangeMenu(2)}>contratos</div>
        </div>
        <div
          className={styles.itemSelected}
          style={{ marginLeft: index * 90 }}
        ></div>
      </div>
      <div className={styles.navuser}>
        <div className={styles.username}>Bem vindo, usuário</div>
        <img src={Avatar} className={styles.avatar}></img>
        <img src={Avatar} className={styles.avatar}></img>
      </div>
    </div>
  );
};

export default NavBar;
