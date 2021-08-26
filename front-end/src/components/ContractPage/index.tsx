import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import { RentContract, SellContract } from "../../models/contract";
import styles from "./styles.module.scss";

const ContractPage = () => {
  const { user } = useContext(AuthContext);

  const [sellContracts, setSellContracts] = useState<SellContract[]>([]);
  const [rentContracts, setRentContracts] = useState<RentContract[]>([]);

  const getContracts = async () => {
    const responseSell = await api.get("/sellcontract");
    const responseRent = await api.get("/rentcontract");
    setSellContracts(responseSell.data);
    setRentContracts(responseRent.data);
  };

  useEffect(() => {
    getContracts();
  }, [user]);

  const handleDeleteRentContract = (id: number) => {
    return () => {
      const deleteContract = async () => {
        await api.delete(`/rentcontract/${id}`);
        getContracts();
      };
      deleteContract();
    };
  };

  const handleDeleteSellContract = (id: number) => {
    return () => {
      const deleteContract = async () => {
        await api.delete(`/sellcontract/${id}`);
        getContracts();
      };
      deleteContract();
    };
  };

  const RentContractItem = ({ element }: { element: RentContract }) => {
    return (
      <div className={styles.item}>
        <h1 className={styles.itemTitle}>Contrato de aluguel</h1>
        <p>{`Inicio: ${element.start}`}</p>
        <p>{`Fim: ${element.end}`}</p>
        <p>{`Criado em: ${element.created_at}`}</p>
        <p>{`Valor: ${element.value}`}</p>
        <p>{`Nome Alugante: ${element.user.name}`}</p>
        <p>{`Telefone Alugante: ${element.user.phone}`}</p>
        <p>{`Email Alugante: ${element.user.email}`}</p>
        <p>{`Imóvel: ${element.place.name}`}</p>
        <Button onClick={handleDeleteRentContract(element.id)} variant="contained" color="primary">
          Deletar
        </Button>
      </div>
    );
  };

  const SellContractItem = ({ element }: { element: SellContract }) => {
    return (
      <div className={styles.item}>
        <h1 className={styles.itemTitle}>Contrato de venda</h1>
        <p>{`Criado em: ${element.created_at}`}</p>
        <p>{`Valor: ${element.value}`}</p>
        <p>{`Nome Comprador: ${element.user.name}`}</p>
        <p>{`Telefone Comprador: ${element.user.phone}`}</p>
        <p>{`Email Comprador: ${element.user.email}`}</p>
        <p>{`Imóvel: ${element.place.name}`}</p>
        <Button onClick={handleDeleteSellContract(element.id)} variant="contained" color="primary">
          Deletar
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {sellContracts.map((el) => (
        <SellContractItem key={el.id} element={el} />
      ))}
      {rentContracts.map((el) => (
        <RentContractItem key={el.id} element={el} />
      ))}
    </div>
  );
};

export default ContractPage;
