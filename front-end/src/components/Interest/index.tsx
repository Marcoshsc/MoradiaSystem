import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { Place } from "../../models/place";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";

const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPlaces = async () => {
      if (user) {
        const response = await api.get("/interest/" + user.id);

        setPlaces(response.data);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className={styles.container}>
      {places.map((el) => {
        return <PlaceCard element={el} />;
      })}
    </div>
  );
};

export default PlacesList;
