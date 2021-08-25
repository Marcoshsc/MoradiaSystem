import React, { FC, useEffect, useState } from "react";
import Avatar from "../../images/user-avatar.png";
import { FaBath, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdPlace } from "react-icons/md";
import { BiArea, BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import { Place } from "../../models/place";
import { api } from "../../api/axios";

const url2 = "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png";

const PlacePage: FC<{}> = () => {
  const { id } = useParams() as any;
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    const getPlace = async () => {
      const response = await api.get(`/place/${id}`);
      setPlace(response.data);
    };
    getPlace();
  }, [id]);

  if (!place) return null;

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <div className={styles.status}>
          <p>{place.status}</p>
        </div>
        <img src={place.image} alt="Place" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p>{place.name}</p>
        </div>
        <div className={styles.infos}>
          <div className={styles.infosItem}>
            <FaBath />
            <p>{`${place.bathrooms} banheiros`}</p>
          </div>
          <div className={styles.infosItem}>
            <BiArea />
            <p>65m²</p>
          </div>
          <div className={styles.infosItem}>
            <FaBed />
            <p>{`${place.rooms} quartos`}</p>
          </div>
          <div className={styles.infosItem}>
            <MdAttachMoney />
            <p>{place.value}</p>
          </div>
        </div>
        <div className={styles.description}>
          <p>{place.description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <MdPlace />
            <p>{place.location}</p>
          </div>
          <div className={styles.footerItem}>
            <img
              src={place.user.image === undefined || place.user.image === "" ? Avatar : place.user.image}
              alt="User avatar"
            />
            <p>{place.user.name}</p>
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
