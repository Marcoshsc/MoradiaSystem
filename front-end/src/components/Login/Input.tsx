import React from "react";
import { FC } from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.scss";

type InputProps = {
  Icon: IconType;
  placeholder: string;
};
const Input: FC<InputProps> = ({ Icon, placeholder }: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <Icon color="#217032" size={30} />
      <input placeholder={placeholder} />
    </div>
  );
};

export default Input;
