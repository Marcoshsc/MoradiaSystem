import { Button, TextField, Typography } from "@material-ui/core";
import React, { FC, PropsWithChildren, useContext, useState } from "react";
import { useHistory } from "react-router";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { Interest1 } from "../../models/interest";
import styles from "./styles.module.scss";

interface RentContractProps {
  element: Interest1;
}

const RentContract: FC<RentContractProps> = (props: PropsWithChildren<RentContractProps>) => {
  const interest = props.element;
  const { refresh } = useContext(AuthContext);
  const { push } = useHistory();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendContract = async () => {
      await api.post("/rentcontract", {
        start: new Date(start),
        end: new Date(end),
        value: interest.proposed_value,
        id_place: interest.place.id,
        id_user: interest.id_user,
      });
      await refresh();
      push("/contracts");
    };
    sendContract();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.title}>Contrato de aluguel</h1>
      <div className={styles.item}>
        <Typography>Data de inicio</Typography>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      </div>
      <div className={styles.item}>
        <Typography>Data de fim</Typography>
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      <div className={styles.item}>
        <Typography>Valor pago mensal</Typography>
        <TextField variant="outlined" disabled defaultValue={interest.proposed_value} placeholder="Rent value" />
      </div>
      <Button className={styles.submit} variant="contained" color="primary" type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default RentContract;
