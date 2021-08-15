import React, { useState } from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import Avatar from "../../images/user.png";
import MenuImg from "../../images/menu.png";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const NavBar: FC = () => {
  const [index, setIndex] = useState(
    Number.parseInt(localStorage.getItem("index")!)
  );
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChangeTab = (indexSelected: number) => {
    setIndex(indexSelected);
    localStorage.setItem("index", indexSelected.toString());
    switch (indexSelected) {
      case 0:
        history.push("/places");
        break;
      case 1:
        history.push("/user");
        break;
      case 2:
        history.push("/contracts");
        break;
    }
  };

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return history.location.pathname === "/login" ? (
    <></>
  ) : (
    <div className={styles.navbar}>
      <div className={styles.itensWrapper}>
        <div className={styles.navitens}>
          <div onClick={() => handleChangeTab(0)}>imóveis</div>
          <div onClick={() => handleChangeTab(1)}>usuário</div>
          <div onClick={() => handleChangeTab(2)}>contratos</div>
        </div>
        <div
          className={styles.itemSelected}
          style={{ marginLeft: index * 90 }}
        ></div>
      </div>
      <div className={styles.navuser}>
        <div className={styles.username}>Bem vindo, usuário</div>
        <img src={Avatar} className={styles.avatar} alt="avatar"></img>
        <img
          src={MenuImg}
          className={styles.menu}
          onClick={handleClickMenu}
          alt="menu"
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Apagar conta</MenuItem>
          <MenuItem onClick={handleCloseMenu} className={styles.logout}>
            Sair
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
