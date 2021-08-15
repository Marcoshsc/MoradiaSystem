import { useState } from "react";
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

const UserPage = ({ isEdit }: { isEdit: boolean }) => {
  const [editDescription, setEditDescription] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [editName, setEditName] = useState(false);
  const mokedDescription =
    "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido Lorem Ipsum é simplesmente uma  simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido";

  const handleEditDescription = () => {
    setEditDescription(true);
  };

  const handleSaveDescription = () => {
    setEditDescription(false);
  };

  const handleEditInfo = () => {
    setEditInfo(true);
  };

  const handleSaveInfo = () => {
    setEditInfo(false);
  };

  const handleEditName = () => {
    setEditName(true);
  };

  const handleSaveName = () => {
    setEditName(false);
  };

  const Header = () => (
    <div className={styles.header}>
      <img src={Avatar} className={styles.avatar} alt="avatar" />
      {isEdit && editName ? (
        <input defaultValue="Usuário" className={styles.inputEdit} />
      ) : (
        <div>Usuário</div>
      )}
      {isEdit ? (
        editName ? (
          <div onClick={handleSaveName} className={styles.iconButton}>
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

  const CardInfo = () =>
    editInfo ? (
      <EditCardInfo />
    ) : (
      <div className={styles.userInfo}>
        <div className={styles.cardInfo}>
          <div className={styles.cardColumn}>
            <div className={styles.cardItem}>
              <ImLocation color="#BDBDBD" />
              Nova união, MG
            </div>
            <div className={styles.cardItem}>
              <AiFillHome color="#BDBDBD" />
              Anúncio de casas para aluguel: 3
            </div>
            <div className={styles.cardItem}>
              <AiOutlineHome color="#BDBDBD" />
              Anúncio de casas para aluguel: 5
            </div>
          </div>
          <div className={styles.cardColumn}>
            <div className={styles.cardItem}>
              <AiOutlinePhone color="#BDBDBD" />
              (31) 98541-8469
            </div>
            <div className={styles.cardItem}>
              <img src={Phone} className={styles.phone} alt="phone" />
              (31) 3596-7800
            </div>
            <div className={styles.cardItem}>
              <AiOutlineMail color="#BDBDBD" />
              usuario@email.com
            </div>
          </div>
        </div>
        {isEdit && (
          <button className={styles.buttonEdit} onClick={handleEditInfo}>
            Editar informações
          </button>
        )}
      </div>
    );

  const EditCardInfo = () => (
    <div className={styles.userInfo}>
      <div className={styles.cardInfo}>
        <div className={styles.cardColumn}>
          <div className={styles.cardItem}>
            <ImLocation color="#BDBDBD" />
            <input defaultValue="Nova união, MG" />
          </div>
          <div className={styles.cardItem}>
            <AiFillHome color="#BDBDBD" />
            Anúncio de casas para aluguel:{" "}
            <input defaultValue="3" className={styles.smallInput} />
          </div>
          <div className={styles.cardItem}>
            <AiOutlineHome color="#BDBDBD" />
            Anúncio de casas para aluguel:
            <input defaultValue="5" className={styles.smallInput} />
          </div>
        </div>
        <div className={styles.cardColumn}>
          <div className={styles.cardItem}>
            <AiOutlinePhone color="#BDBDBD" />
            <input defaultValue="(31) 98541-8469" />
          </div>
          <div className={styles.cardItem}>
            <img src={Phone} className={styles.phone} alt="phone" />
            <input defaultValue="(31) 3596-7800" />
          </div>
          <div className={styles.cardItem}>
            <AiOutlineMail color="#BDBDBD" />
            <input defaultValue=" usuario@email.com" />
          </div>
        </div>
      </div>
      <button className={styles.buttonSave} onClick={handleSaveInfo}>
        Salvar informações
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.description}>
        {editDescription ? (
          <textarea defaultValue={mokedDescription} rows={8} />
        ) : (
          <p>{mokedDescription}</p>
        )}
        {isEdit &&
          (editDescription ? (
            <button
              className={styles.buttonSave}
              onClick={handleSaveDescription}
            >
              Salvar descrição
            </button>
          ) : (
            <button
              className={styles.buttonEdit}
              onClick={handleEditDescription}
            >
              Editar descrição
            </button>
          ))}
      </div>
      <CardInfo />
      <CardSale isEdit={isEdit} isContract={false} />
    </div>
  );
};

export default UserPage;
