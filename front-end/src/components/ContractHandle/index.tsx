import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../api/axios";
import { Interest1 } from "../../models/interest";
import RentContract from "./RentContract";
import SellContract from "./SellContract";

const ContractHandle: FC = () => {
  const { idInterest } = useParams() as any;

  const [interest, setInterest] = useState<Interest1>();

  useEffect(() => {
    const getInterest = async () => {
      const response = await api.get(`/interest/${idInterest}`);
      setInterest(response.data);
    };
    getInterest();
  }, [idInterest]);

  if (!interest) return null;

  console.log(interest);

  return interest.place.status === "RENT" ? <RentContract element={interest} /> : <SellContract element={interest} />;
};

export default ContractHandle;
