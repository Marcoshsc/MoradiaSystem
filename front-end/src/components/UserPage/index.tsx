import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Avatar from "../../images/user-avatar.png";
import Phone from "../../images/phone.png";
import { ImLocation } from "react-icons/im";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineMail,
  AiFillEdit,
  AiFillCheckSquare,
} from "react-icons/ai";
import CardSale from "../CardSales";
import { AuthContext } from "../../contexts/AuthContenxt";
import { useHistory } from "react-router";
import { api } from "../../api/axios";

const UserPage = ({ isEdit }: { isEdit: boolean }) => {
  const { user, refresh } = useContext(AuthContext);

  const [editDescription, setEditDescription] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [editName, setEditName] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone || "");
    setLocation(user.location);
    setDescription(user.description);
    setEmail(user.email);
    setImage(user.image || "");
  }, [user]);

  if (!user) {
    return null;
  }

  const editUser = async (info: {
    newName?: string;
    newPhone?: string;
    newLocation?: string;
    newDescription?: string;
    newEmail?: string;
    newImage?: string;
  }) => {
    await api.put(`/user/${user.id}`, {
      name: info.newName || name,
      phone: info.newPhone || phone,
      location: info.newLocation || location,
      description: info.newDescription || description,
      email: info.newEmail || email,
      image: info.newImage || image,
    });
    await refresh();
  };

  const handleEditDescription = () => {
    setEditDescription(true);
  };

  const handleSaveDescription = () => {
    editUser({});
    setEditDescription(false);
  };

  const handleEditInfo = () => {
    setEditInfo(true);
  };

  const handleSaveInfo = (location: string, phone: string, email: string) => {
    editUser({ newLocation: location, newPhone: phone, newEmail: email });
    setEditInfo(false);
  };

  const handleEditName = () => {
    setEditName(true);
  };

  const handleSaveName = (name: string, image: string) => {
    editUser({ newName: name, newImage: image });
    setEditName(false);
  };

  const Header = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
      if (!user) return;
      setName(user.name);
      setImage(user.image || "");
    }, []);

    return (
      <div className={styles.header}>
        {isEdit && editName ? (
          <input value={image} onChange={handleChange(setImage)} className={styles.inputEdit} />
        ) : (
          <img src={image === "" ? Avatar : image} className={styles.avatar} alt="avatar" />
        )}
        {isEdit && editName ? (
          <input value={name} onChange={handleChange(setName)} className={styles.inputEdit} />
        ) : (
          <div className={styles.nameUser}>{user.name}</div>
        )}
        {isEdit ? (
          editName ? (
            <div onClick={() => handleSaveName(name, image)} className={styles.iconButton}>
              <AiFillCheckSquare size={30} />
            </div>
          ) : (
            <div onClick={handleEditName} className={styles.iconButton}>
              <AiFillEdit size={30} />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    );
  };

  const CardInfo = () => {
    const history = useHistory();

    const handleAddPlace = () => {
      history.push("/addplace");
    };

    return editInfo ? (
      <EditCardInfo onSubmitInfo={handleSaveInfo} />
    ) : (
      <div className={styles.userInfo}>
        <div className={styles.cardInfo}>
          <div className={styles.cardColumn}>
            <div className={styles.cardItem}>
              <ImLocation color="#BDBDBD" />
              {user.location}
            </div>
            <div className={styles.cardItem}>
              <AiFillHome color="#BDBDBD" />
              {`Anúncio de casas para aluguel: ${user.number_rent}`}
            </div>
            <div className={styles.cardItem}>
              <AiOutlineHome color="#BDBDBD" />
              {`Anúncio de casas para venda: ${user.number_sell}`}
            </div>
          </div>
          <div className={styles.cardColumn}>
            <div className={styles.cardItem}>
              <AiOutlinePhone color="#BDBDBD" />
              {user.phone}
            </div>
            <div className={styles.cardItem}>
              <img src={Phone} className={styles.phone} alt="phone" />
              {user.phone}
            </div>
            <div className={styles.cardItem}>
              <AiOutlineMail color="#BDBDBD" />
              {user.email}
            </div>
          </div>
        </div>
        {isEdit && (
          <>
            <button className={styles.buttonEdit} onClick={handleEditInfo}>
              Editar informações
            </button>
            <button className={styles.buttonEdit} onClick={handleAddPlace}>
              Adicionar imóvel
            </button>
          </>
        )}
      </div>
    );
  };
  const handleChange = (callback: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      callback(e.target.value);
    };
  };

  const EditCardInfo = ({
    onSubmitInfo,
  }: {
    onSubmitInfo(location: string, phone: string, email: string, description: string): void;
  }) => {
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
      if (!user) return;
      setPhone(user.phone || "");
      setLocation(user.location);
      setEmail(user.email);
    }, []);

    return (
      <div className={styles.userInfo}>
        <div className={styles.cardInfo}>
          <div className={styles.cardColumn}>
            <div className={styles.cardItem}>
              <ImLocation color="#BDBDBD" />
              <input value={location} onChange={handleChange(setLocation)} />
            </div>
          </div>
          <div className={styles.cardColumn}>
            <div className={styles.cardItem}>
              <AiOutlinePhone color="#BDBDBD" />
              <input value={phone} onChange={handleChange(setPhone)} />
            </div>
            <div className={styles.cardItem}>
              <AiOutlineMail color="#BDBDBD" />
              <input value={email} onChange={handleChange(setEmail)} />
            </div>
          </div>
        </div>
        <button className={styles.buttonSave} onClick={() => onSubmitInfo(location, phone, email, description)}>
          Salvar informações
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.description}>
        {editDescription ? (
          <textarea value={description} onChange={handleChange(setDescription)} rows={8} />
        ) : (
          <p>{user.description}</p>
        )}
        {isEdit &&
          (editDescription ? (
            <button className={styles.buttonSave} onClick={handleSaveDescription}>
              Salvar descrição
            </button>
          ) : (
            <button className={styles.buttonEdit} onClick={handleEditDescription}>
              Editar descrição
            </button>
          ))}
      </div>
      <CardInfo />
      {user.place.map((el) => (
        <CardSale element={el} isEdit={isEdit} isContract={false} />
      ))}
    </div>
  );
};

export default UserPage;
