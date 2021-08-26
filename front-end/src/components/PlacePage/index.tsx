import React, { FC, useEffect, useState } from "react";
import Avatar from "../../images/user-avatar.png";
import { FaBath, FaBed } from "react-icons/fa";
import { MdAttachMoney, MdPlace } from "react-icons/md";
import { BiArea, BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import { Place } from "../../models/place";
import { api } from "../../api/axios";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContenxt";

const PlacePage: FC<{}> = () => {
  const { id } = useParams() as any;
  const { user } = useContext(AuthContext);
  const [place, setPlace] = useState<Place>();
  const [declareInterest, setDeclareInterest] = useState(false);
  const [value, setValue] = useState(0);
  const { push } = useHistory();
  useEffect(() => {
    const getPlace = async () => {
      const response = await api.get(`/place/${id}`);
      setPlace(response.data);
    };
    getPlace();
  }, [id]);

  function handleInterest() {
    api
      .post(`/interest`, {
        proposed_value: value,
        id_place: place?.id,
        id_user: user?.id,
      })
      .then((e) => {
        setDeclareInterest(false);
      });
  }

  function handleBack() {
    push("/places");
  }

  if (!place) return null;

  return (
    <>
      <div className={clsx(declareInterest ? styles.modal : styles.interestNone)}>
        <div className={styles.interest}>
          <input value={value} onChange={(e) => setValue(Number(e.target.value))} placeholder="Valor de interesse" />
          <button onClick={() => handleInterest()}>confirmar</button>
          <button className={styles.back} onClick={() => setDeclareInterest(false)}>
            voltar
          </button>
        </div>
      </div>
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
            <div onClick={handleBack} className={styles.actionItem1}>
              <BiArrowBack />
            </div>
            <div className={styles.actionItem2}>
              <button onClick={() => setDeclareInterest(true)}>Declarar interesse</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
