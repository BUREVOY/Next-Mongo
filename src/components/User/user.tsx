import { UsersType } from "@/models/user";
import React from "react";
import s from "@/components/User/user.module.scss";

const User: React.FC<UsersType> = ({ _id, contact, name }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div className={s.name}>{name}</div>
      <div style={{ marginRight: 12 }}>{contact}</div>
      <div>{_id}</div>
    </div>
  );
};

export default User;
