import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";

type InputProps = {
  Icon: IconType;
  placeholder: string;
  callback: (input: string) => void;
};
const Input: FC<InputProps> = ({ Icon, placeholder, callback }: InputProps) => {
  const [value, setValue] = useState("");
  function handleChange(input: string) {
    setValue(input);
  }

  useEffect(() => {
    callback(value);
  }, [callback, value]);
  return (
    <div className={styles.inputContainer}>
      <Icon color="#217032" size={30} />
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        type={placeholder === "Senha" ? "password" : "text"}
      />
    </div>
  );
};

export default Input;
