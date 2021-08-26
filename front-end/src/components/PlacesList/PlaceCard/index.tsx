import React, { FC, PropsWithChildren } from "react";
import Avatar from "../../../images/user-avatar.png";
import styles from "./PlaceCard.module.scss";
import { FaBath, FaBed } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Place } from "../../../models/place";

interface PlaceCardProps {
  element: Place;
}

const PlaceCard: FC<PlaceCardProps> = (props: PropsWithChildren<PlaceCardProps>) => {
  const history = useHistory();
  const place = props.element;

  const handleClick = () => {
    history.push(`/places/${place.id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.placeImage}>
        <img src={place.image} alt="Place Url" />
      </div>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <p>{place.name}</p>
        </div>
        <div className={styles.status}>
          <p>{place.status === "RENT" ? "ALUGA-SE" : "VENDE-SE"}</p>
        </div>
      </div>
      <div className={styles.roomAndUserInfo}>
        <div className={styles.roomInfo}>
          <div className={styles.roomInfoItem}>
            <FaBed />
            <p>{`${place.rooms} quartos`}</p>
          </div>
          <div className={styles.roomInfoItem}>
            <FaBath />
            <p>{`${place.bathrooms} banheiros`}</p>
          </div>
        </div>
        <div className={styles.userInfo}>
          <p>{place.user.name}</p>
          <img
            src={place.user.image === undefined || place.user.image === "" ? Avatar : place.user.image}
            alt="User avatar"
          />
        </div>
      </div>
      <div className={styles.description}>
        <p>{place.description}</p>
      </div>
      <div className={styles.city}>
        <MdPlace />
        <p>{place.location}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
