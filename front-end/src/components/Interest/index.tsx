import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { Interest } from "../../models/interest";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";

const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Interest[]>([]);
  const { user } = useContext(AuthContext);
  const { push } = useHistory();
  useEffect(() => {
    const fetchPlaces = async () => {
      if (user) {
        const response = await api.get("/interest/" + user.id);

        setPlaces(response.data);
      }
    };
    fetchPlaces();
  }, []);

  function handleRefuse(id: number) {
    api.delete(`/interest/${id}`).then((e) => {
      push("/places");
    });
  }

  return (
    <div className={styles.container}>
      {places.map((el) => {
        return <PlaceCard onRefuse={handleRefuse} element={el} />;
      })}
    </div>
  );
};

export default PlacesList;
