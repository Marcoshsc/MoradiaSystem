import React, { FC } from "react";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";

const PlacesList: FC = () => {
  return (
    <div className={styles.container}>
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
    </div>
  );
};

export default PlacesList;
