import { Select } from "@material-ui/core";
import Fuse from "fuse.js";
import React, { FC, useEffect, useState } from "react";
import { useMemo } from "react";
import { api } from "../../api/axios";
import { Place } from "../../models/place";
import PlaceCard from "./PlaceCard";
import styles from "./PlacesList.module.scss";

const PlacesList: FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filtered, setFiltered] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(0);
  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await api.get("/place");
      console.log(response.data);

      setPlaces(response.data);
      setFiltered(response.data);
    };
    fetchPlaces();
  }, []);

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,

      // Search in `author` and in `tags` array
      keys: ["location", "name"],
    };
    return new Fuse(places, options);
  }, [places]);

  function handleSearch(search: string) {
    const r = fuse.search(search).map((i) => i.item);
    console.log(r);

    setFiltered(r);
    setSearch(search);
    if (search === "") {
      setFiltered(places);
    }
    handle(0);
  }

  function handle(select: number) {
    setSelect(select);
    let l: Place[] = [];
    if (select === 1) {
      l = filtered.filter((p) => p.status === "SELL");
    }

    if (select === 2) {
      l = filtered.filter((p) => p.status === "RENT");
    }

    if (select === 0) {
      l = places;
    }

    setFiltered(l);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          padding: "5px",
        }}
      >
        <input
          value={search}
          placeholder="Pesquisa"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "20%", border: "1px solid green" }}
        />
        <Select native value={select} onChange={(e) => handle(Number(e.target.value))}>
          <option value={0}></option>
          <option value={1}>SELL</option>
          <option value={2}>RENT</option>
        </Select>
      </div>

      <div className={styles.container}>
        {filtered.map((el) => (
          <PlaceCard element={el} />
        ))}
      </div>
    </>
  );
};

export default PlacesList;
