import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ImLocation } from "react-icons/im";
import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Place } from "../../models/place";
import { MdAttachMoney } from "react-icons/md";
import { api } from "../../api/axios";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/AuthContenxt";

const CardSale = ({ isEdit, isContract, element }: { isEdit: boolean; isContract: boolean; element: Place }) => {
  const [editInfo, setEditInfo] = useState(false);
  const history = useHistory();
  const { refresh } = useContext(AuthContext);

  const handleEditInfo = () => {
    setEditInfo(true);
  };

  const handleSaveInfo = () => {
    setEditInfo(false);
  };

  const handleDeleleContract = () => {};

  const EditButtons = ({ submit }: { submit(): void }) => {
    const handleSubmit = () => {
      submit();
      handleSaveInfo();
    };

    const handleDelete = () => {
      const deletePlace = async () => {
        await api.delete(`/place/${element.id}`);
        await refresh();
      };
      deletePlace();
    };

    return (
      <div className={styles.actionsButtons}>
        {editInfo ? (
          <button onClick={handleSubmit} className={styles.buttonSave}>
            Salvar edição
          </button>
        ) : (
          <>
            <div onClick={handleEditInfo}>
              <AiFillEdit color="#36ff15" size={30} />
            </div>
            <div onClick={handleDelete}>
              <AiFillDelete color="red" size={30} />
            </div>
          </>
        )}
      </div>
    );
  };

  const EditCardInfo = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [value, setValue] = useState("");
    const [area, setArea] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [rooms, setRooms] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<"SELL" | "RENT">("RENT");

    useEffect(() => {
      setName(element.name);
      setDescription(element.description);
      setImage(element.image);
      setValue(element.value.toString());
      setArea(element.area.toString());
      setBathrooms(element.bathrooms.toString());
      setRooms(element.rooms.toString());
      setLocation(element.location);
      setStatus(element.status as "SELL" | "RENT");
    }, []);

    const handleChange = (callback: (value: string) => void) => {
      return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        callback(e.target.value);
      };
    };

    const handleSubmit = () => {
      const savePlace = async () => {
        await api.put(`/place/${element.id}`, {
          name,
          rooms: Number.parseInt(rooms),
          bathrooms: Number.parseInt(bathrooms),
          area: Number.parseInt(area),
          value: Number.parseFloat(value),
          location,
          description,
          status,
          image,
        });
        await refresh();
        history.push("/user/edit");
      };
      savePlace();
    };

    return (
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <img src={image} className={styles.avatar} alt="avatar" />
          <div className={styles.cardInfo}>
            <input value={name} onChange={handleChange(setName)} />
            <textarea value={description} onChange={handleChange(setDescription)} rows={8} />
            <div className={styles.cardItem}>
              <ImLocation color="#BDBDBD" />
              <input value={location} onChange={handleChange(setLocation)} />
            </div>
          </div>
          <div className={styles.cardFeatures}>
            <div className={styles.feature}>
              <BiBed color="#BDBDBD" size="30" />
              <input className={styles.smallInput} value={rooms} onChange={handleChange(setRooms)} /> quartos
            </div>
            <div className={styles.feature}>
              <BiBath color="#BDBDBD" size="30" />
              <input className={styles.smallInput} value={bathrooms} onChange={handleChange(setBathrooms)} /> banheiros
            </div>
            <div className={styles.feature}>
              <BiArea color="#BDBDBD" size="30" />
              <input className={styles.smallInput} value={area} onChange={handleChange(setArea)} /> m2 de area
            </div>
            <div className={styles.feature}>
              <MdAttachMoney color="#BDBDBD" size="30" />
              R$
              <input className={styles.smallInput} value={value} onChange={handleChange(setValue)} />
              ,00
            </div>
          </div>
        </div>
        <div className={styles.cardActions}>
          {/* Existe também o styles.labelRent */}
          <select name="select" value={status} onChange={(e) => setStatus(e.target.value as "RENT" | "SELL")}>
            <option value="RENT" selected>
              ALUGA-SE
            </option>
            <option value="SELL" selected>
              VENDE-SE
            </option>
          </select>
          <EditButtons submit={handleSubmit} />
        </div>
      </div>
    );
  };

  return editInfo ? (
    <EditCardInfo />
  ) : (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <img src={element.image} className={styles.avatar} alt="avatar" />
        <div className={styles.cardInfo}>
          <h2>{element.name}</h2>
          <p>{element.description}</p>
          <div className={styles.cardItem}>
            <ImLocation color="#BDBDBD" />
            {element.location}
          </div>
        </div>
        <div className={styles.cardFeatures}>
          <div className={styles.feature}>
            <BiBed color="#BDBDBD" size="30" />
            {`${element.rooms} quartos`}
          </div>
          <div className={styles.feature}>
            <BiBath color="#BDBDBD" size="30" />
            {`${element.bathrooms} banheiros`}
          </div>
          <div className={styles.feature}>
            <BiArea color="#BDBDBD" size="30" />
            {`${element.area} m2 de área`}
          </div>
          <div className={styles.feature}>
            <MdAttachMoney color="#BDBDBD" size="30" />
            {`R$${element.value},00`}
          </div>
        </div>
      </div>
      <div className={styles.cardActions}>
        {/* Existe também o styles.labelRent */}
        <div className={styles.labelSale}>
          {element.status === "RENT" ? "ALUGA-SE" : element.status === "RENT" ? "VENDE-SE" : "LIQUIDADO"}
        </div>
        {isEdit && <EditButtons submit={() => {}} />}
        {isContract && (
          <button className={styles.buttonRemove} onClick={handleDeleleContract}>
            Remover interesse
          </button>
        )}
      </div>
    </div>
  );
};

export default CardSale;
