import React, { FC, useEffect, useState } from "react";
import { useContext } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { Place } from "../../models/place";
import { Interest } from "../../models/interest";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";
import { useHistory } from "react-router-dom";

const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Interest[]>([]);
  const { user } = useContext(AuthContext);
  const { push } = useHistory();
  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await api.get("/interest/pendent/" + user?.id);
      if (response.data) {
        setPlaces(response.data);
      }
    };
    fetchPlaces();
  }, []);

  function handleOnRefuse(id: number) {
    api.delete(`/interest/${id}`).then((e) => {
      push("/places");
    });
  }

  function handleOnAccept(id: number) {
    api.post(`/interest/${id}/accept`).then((e) => {
      // push("/contract/" + id);
    });
  }
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
