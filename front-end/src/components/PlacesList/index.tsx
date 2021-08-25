import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { api } from "../../api/axios";
import { Place } from "../../models/place";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";

const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await api.get("/place");
      setPlaces(response.data);
    };
    fetchPlaces();
  }, []);

  return (
    <div className={styles.container}>
      {places.map((el) => (
        <PlaceCard element={el} />
      ))}
    </div>
  );
};

export default PlacesList;
