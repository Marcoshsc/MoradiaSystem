import { Button, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { FC, useContext, useState } from "react";
import { useHistory } from "react-router";
import { api } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContenxt";
import styles from "./styles.module.scss";

const AddPlacePage: FC = () => {
  const history = useHistory();
  const { user, refresh } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [area, setArea] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"SELL" | "RENT">("RENT");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const savePlace = async () => {
      await api.post("/place", {
        name,
        rooms: Number.parseInt(rooms),
        bathrooms: Number.parseInt(bathrooms),
        area: Number.parseInt(area),
        value: Number.parseFloat(value),
        location,
        description,
        status,
        image,
        id_user: user.id,
      });
      await refresh();
      history.push("/user/edit");
    };
    savePlace();
  };

  const handleChange = (callback: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      callback(e.target.value);
    };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar imóvel</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.item}>
          <Typography>Nome: </Typography>
          <TextField
            variant="outlined"
            placeholder="Nome do imóvel"
            className={styles.input}
            value={name}
            onChange={handleChange(setName)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Descrição: </Typography>
          <TextField
            variant="outlined"
            placeholder="Descrição do imóvel"
            className={styles.input}
            value={description}
            onChange={handleChange(setDescription)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Imagem: </Typography>
          <TextField
            variant="outlined"
            placeholder="URL da imagem do imóvel"
            className={styles.input}
            value={image}
            onChange={handleChange(setImage)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Área em m²: </Typography>
          <TextField
            variant="outlined"
            placeholder="Área do imóvel"
            className={styles.input}
            value={area}
            onChange={handleChange(setArea)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Valor: </Typography>
          <TextField
            variant="outlined"
            placeholder="Valor do imóvel"
            className={styles.input}
            value={value}
            onChange={handleChange(setValue)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Banheiros: </Typography>
          <TextField
            variant="outlined"
            placeholder="Número de banheiros do imóvel"
            className={styles.input}
            value={bathrooms}
            onChange={handleChange(setBathrooms)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Quartos: </Typography>
          <TextField
            variant="outlined"
            placeholder="Número de quartos do imóvel"
            className={styles.input}
            value={rooms}
            onChange={handleChange(setRooms)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Localização: </Typography>
          <TextField
            variant="outlined"
            placeholder="Localização do imóvel"
            className={styles.input}
            value={location}
            onChange={handleChange(setLocation)}
          />
        </div>
        <div className={styles.item}>
          <Typography>Status: </Typography>
          <Select
            className={styles.input}
            value={status}
            variant="outlined"
            onChange={(e) => setStatus(e.target.value as "SELL" | "RENT")}
          >
            <MenuItem value={"SELL"}>Vende-se</MenuItem>
            <MenuItem value={"RENT"}>Aluga-se</MenuItem>
          </Select>
        </div>
        <div className={styles.submit}>
          <Button variant="contained" color="primary" className={styles.submit} type="submit">
            ENVIAR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPlacePage;
