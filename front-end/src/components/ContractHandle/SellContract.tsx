import { Button, TextField, Typography } from "@material-ui/core";
import React, { FC, PropsWithChildren, useContext } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { Interest } from "../../models/interest";
import styles from "./styles.module.scss";

interface SellContractProps {
  element: Interest;
}

const SellContract: FC<SellContractProps> = (props: PropsWithChildren<SellContractProps>) => {
  const interest = props.element;
  const { refresh } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendContract = async () => {
      await api.post("/sellcontract", {
        value: interest.proposed_value,
        id_place: interest.place.id,
        id_user: interest.id_user,
      });
      await refresh();
    };
    sendContract();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Contrato de venda</h1>
      <div className={styles.item}>
        <Typography>Value</Typography>
        <TextField variant="outlined" disabled defaultValue={interest.proposed_value} placeholder="Rent value" />
      </div>
      <Button className={styles.submit} variant="contained" color="primary" type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default SellContract;
