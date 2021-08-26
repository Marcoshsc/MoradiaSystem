import React, { FC, PropsWithChildren } from "react";
import Avatar from "../../../images/user-avatar.png";
import styles from "./PlaceCard.module.scss";
import { FaBath, FaBed } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Interest } from "../../../models/interest";

interface PlaceCardProps {
  element: Interest;
  onRefuse: (id: number) => void;
  onAccept: (id: number) => void;
}

const PlaceCard: FC<PlaceCardProps> = (
  props: PropsWithChildren<PlaceCardProps>
) => {
  const history = useHistory();
  const place = props.element;

  return (
    <div className={styles.container}>
      <div className={styles.placeImage}>
        <img src={place.place.image} alt="Place Url" />
      </div>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <p>{place.place.name}</p>
        </div>
        <div className={styles.status}>
          <p>{place.place.status}</p>
        </div>
      </div>
      <div className={styles.roomAndUserInfo}>
        <div className={styles.roomInfo}>
          <div className={styles.roomInfoItem}>
            <FaBed />
            <p>{`${place.place.rooms} quartos`}</p>
          </div>
          <div className={styles.roomInfoItem}>
            <FaBath />
            <p>{`${place.place.bathrooms} banheiros`}</p>
          </div>
        </div>
        <div className={styles.userInfo}>
          <p>{place.place.user.name}</p>
          <img
            src={
              place.place.user.image === undefined ||
              place.place.user.image === ""
                ? Avatar
                : place.place.user.image
            }
            alt="User avatar"
          />
        </div>
      </div>
      <div className={styles.description}>
        <p>{place.place.description}</p>
      </div>
      <div className={styles.city}>
        <MdPlace />
        <p>{place.place.location}</p>
      </div>
      <div className={styles.city}>
        R$
        <p>{place.proposed_value}</p>
      </div>
      <button className={styles.buttonAccept}>Aceitar</button>
      <button className={styles.buttonRefuse}>Recusar</button>
    </div>
  );
};

export default PlaceCard;
