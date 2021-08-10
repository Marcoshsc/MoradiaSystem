import React, { FC } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdPlace } from "react-icons/md";
import { BiArea, BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router";
import styles from "./styles.module.scss";

const url =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
const url2 = "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png";

const PlacePage: FC<{}> = () => {
  const { id } = useParams() as any;
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <div className={styles.status}>
          <p>VENDE-SE</p>
        </div>
        <img src={url} alt="Place" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p>Casa do campo</p>
        </div>
        <div className={styles.infos}>
          <div className={styles.infosItem}>
            <FaBath />
            <p>5 banheiros</p>
          </div>
          <div className={styles.infosItem}>
            <BiArea />
            <p>65m²</p>
          </div>
          <div className={styles.infosItem}>
            <FaBed />
            <p>4 quartos</p>
          </div>
          <div className={styles.infosItem}>
            <MdAttachMoney />
            <p>A combinar</p>
          </div>
        </div>
        <div className={styles.description}>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum{" "}
          </p>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <MdPlace />
            <p>Rua da olaria, 8 - Centro, Nova União - MG, 34990-000</p>
          </div>
          <div className={styles.footerItem}>
            <img src={url2} alt="User avatar" />
            <p>Nome_usuario</p>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.actionItem1}>
            <BiArrowBack />
          </div>
          <div className={styles.actionItem2}>
            <button>Declarar interesse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
