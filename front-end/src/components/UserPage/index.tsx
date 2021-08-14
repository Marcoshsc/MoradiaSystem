import React, { useState } from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import Avatar from "../../images/user-avatar.png";
import Phone from "../../images/phone.png";
import MenuImg from "../../images/menu.png";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { ImLocation } from "react-icons/im";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineMail,
} from "react-icons/ai";

const UserPage: FC = () => {
  const history = useHistory();

  const CardInfo = () => (
    <div className={styles.cardInfo}>
      <div className={styles.cardColumn}>
        <div className={styles.cardItem}>
          <ImLocation color="#BDBDBD" />
          Nova união, MG
        </div>
        <div className={styles.cardItem}>
          <AiFillHome color="#BDBDBD" />
          Anúncio de casas para aluguel: 3
        </div>
        <div className={styles.cardItem}>
          <AiOutlineHome color="#BDBDBD" />
          Anúncio de casas para aluguel: 5
        </div>
      </div>
      <div className={styles.cardColumn}>
        <div className={styles.cardItem}>
          <AiOutlinePhone color="#BDBDBD" />
          (31) 98541-8469
        </div>
        <div className={styles.cardItem}>
          <img src={Phone} className={styles.phone} />
          (31) 3596-7800
        </div>
        <div className={styles.cardItem}>
          <AiOutlineMail color="#BDBDBD" />
          usuario@email.com
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Avatar} className={styles.avatar} />
        <div>Usuário</div>
      </div>
      <p className={styles.description}>
        Lorem Ipsum é simplesmente uma simulação de texto da indústria
        tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
        quando um impressor desconhecido Lorem Ipsum é simplesmente uma
        simulação de texto da indústria tipográfica e de impressos, e vem sendo
        utilizado desde o século XVI, quando um impressor desconhecido
      </p>
      <CardInfo />
    </div>
  );
};

export default UserPage;
