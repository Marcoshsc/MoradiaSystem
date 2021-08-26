import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { Place } from "../../models/place";
import { Interest } from "../../models/interest";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";

const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Interest[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await api.get("/interest/pendent/" + user?.id);
      if (response.data) {
        setPlaces(response.data);
      }
    };
    fetchPlaces();
  }, []);

  function handleOnRefuse(id: number) {}

  function handleOnAccept(id: number) {}
  return (
    <div className={styles.container}>
      {places.map((el) => (
        <PlaceCard
          onRefuse={handleOnRefuse}
          onAccept={handleOnAccept}
          element={el}
        />
      ))}
    </div>
  );
};

export default PlacesList;
