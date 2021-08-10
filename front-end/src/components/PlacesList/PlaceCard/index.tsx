import React, { FC } from "react";
import styles from "./PlaceCard.module.scss";
import { FaBath, FaBed } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useHistory } from "react-router-dom";

const url =
  "https://magicfloridaimoveis.com.br/wp-content/uploads/2018/12/261694-o-que-e-melhor-alugar-ou-comprar-imovel-nos-eua-1200x800.jpg";
const url2 = "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png";

const PlaceCard: FC = () => {
  const history = useHistory();

  const handleClick = () => {
    console.log("here");
    history.push("/places/22");
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.placeImage}>
        <img src={url} alt="Place Url" />
      </div>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <p>Casa do campo</p>
        </div>
        <div className={styles.status}>
          <p>VENDE-SE</p>
        </div>
      </div>
      <div className={styles.roomAndUserInfo}>
        <div className={styles.roomInfo}>
          <div className={styles.roomInfoItem}>
            <FaBed />
            <p>{`4 quartos`}</p>
          </div>
          <div className={styles.roomInfoItem}>
            <FaBath />
            <p>{`5 banheiros`}</p>
          </div>
        </div>
        <div className={styles.userInfo}>
          <p>nome_usuario</p>
          <img src={url2} alt="User avatar" />
        </div>
      </div>
      <div className={styles.description}>
        <p>
          Lorem Ipsum simplesmente Lorem Ipsum simplesmente Lorem Ipsum simplesmente Lorem Ipsum simplesmente Lorem
          Ipsum simplesmente Lorem Ipsum simplesmente Lorem Ipsum simplesmente Lorem Ipsum simplesmente Lorem Ipsum
          simplesmente Lorem Ipsum simplesmente Lorem Ipsum simplesmente{" "}
        </p>
      </div>
      <div className={styles.city}>
        <MdPlace />
        <p>Nova uniao, MG</p>
      </div>
    </div>
  );
};

export default PlaceCard;
