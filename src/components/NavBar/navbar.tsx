import React from "react";
import Link from "../../../node_modules/next/link";
import s from "@/components/NavBar/navbar.module.scss";
import { Button } from "antd";

const NavBar: React.FC = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      className={s.back}
    >
      <Link href={"/"} className={s.a}>
        <Button type="primary" size="middle" style={{ opacity: 0.8 }}>
          main
        </Button>
      </Link>
      <Link href={"/products"} className={s.a}>
        <Button type="primary" size="middle" style={{ opacity: 0.8 }}>
          products
        </Button>
      </Link>
      <Link href={"/orders"} className={s.a}>
        <Button type="primary" size="middle" style={{ opacity: 0.8 }}>
          orders
        </Button>
      </Link>
    </nav>
  );
};
//className={s.name}
export default NavBar;
