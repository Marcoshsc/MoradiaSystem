import { useState } from "react";
import styles from "./styles.module.scss";
import { ImLocation } from "react-icons/im";
import { BiBath, BiBed } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CardSale = ({
  isEdit,
  isContract,
}: {
  isEdit: boolean;
  isContract: boolean;
}) => {
  const [editInfo, setEditInfo] = useState(false);
  const mokedDescription =
    "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido Lorem Ipsum é simplesmente uma  simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido";

  const mockedTitle = "Casa na região do subúrbio";

  const mockedAvatar =
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";

  const handleEditInfo = () => {
    setEditInfo(true);
  };

  const handleSaveInfo = () => {
    setEditInfo(false);
  };

  const handleDeleteInfo = () => {};

  const handleDeleleContract = () => {};

  const EditButtons = () => (
    <div className={styles.actionsButtons}>
      {editInfo ? (
        <button className={styles.buttonSave} onClick={handleSaveInfo}>
          Salvar edição
        </button>
      ) : (
        <>
          <div onClick={handleEditInfo}>
            <AiFillEdit color="#36ff15" size={30} />
          </div>
          <div onClick={handleDeleteInfo}>
            <AiFillDelete color="red" size={30} />
          </div>
        </>
      )}
    </div>
  );

  const EditCardInfo = () => (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <img src={mockedAvatar} className={styles.avatar} alt="avatar" />
        <div className={styles.cardInfo}>
          <input defaultValue={mockedTitle} />
          <textarea defaultValue={mockedTitle} rows={8} />
          <div className={styles.cardItem}>
            <ImLocation color="#BDBDBD" />
            <input defaultValue="Nova união, MG" />
          </div>
        </div>
        <div className={styles.cardFeatures}>
          <div className={styles.feature}>
            <BiBed color="#BDBDBD" size="30" />
            <input className={styles.smallInput} defaultValue="4" /> quartos
          </div>
          <div className={styles.feature}>
            <BiBath color="#BDBDBD" size="30" />
            <input className={styles.smallInput} defaultValue="5" /> banheiros
          </div>
        </div>
      </div>
      <div className={styles.cardActions}>
        {/* Existe também o styles.labelRent */}
        <select name="select">
          <option value="valor1" selected>
            ALUGA-SE
          </option>
          <option value="valor2" selected>
            VENDE-SE
          </option>
        </select>
        <EditButtons />
      </div>
    </div>
  );

  return editInfo ? (
    <EditCardInfo />
  ) : (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <img src={mockedAvatar} className={styles.avatar} alt="avatar" />
        <div className={styles.cardInfo}>
          <h2>{mockedTitle}</h2>
          <p>{mokedDescription}</p>
          <div className={styles.cardItem}>
            <ImLocation color="#BDBDBD" />
            Nova união, MG
          </div>
        </div>
        <div className={styles.cardFeatures}>
          <div className={styles.feature}>
            <BiBed color="#BDBDBD" size="30" />4 quartos
          </div>
          <div className={styles.feature}>
            <BiBath color="#BDBDBD" size="30" />5 banheiros
          </div>
        </div>
      </div>
      <div className={styles.cardActions}>
        {/* Existe também o styles.labelRent */}
        <div className={styles.labelSale}>ALUGA-SE</div>
        {isEdit && <EditButtons />}
        {isContract && (
          <button
            className={styles.buttonRemove}
            onClick={handleDeleleContract}
          >
            Remover interesse
          </button>
        )}
      </div>
    </div>
  );
};

export default CardSale;
