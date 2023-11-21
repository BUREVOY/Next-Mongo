import RemoveBtn from "@/components/DeleteComponents/deleteComps";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import s from "./orders.module.scss";
import { Button } from "antd";

const ordersEndPoint = "http://localhost:3000/api/orders";

const getItems = async () => {
  try {
    const res = await fetch(ordersEndPoint, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error fetching`);
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching catched", error);
  }
};

const OrdersPage = async (): Promise<React.JSX.Element> => {
  const { order } = await getItems();

  return (
    <main className={s.main}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div>
          <h1>Orders</h1>
        </div>
        <div>
          <Link href={"/addOrder"}>
            <Button type="primary" danger style={{ opacity: 0.8 }}>
              <PlusOutlined />
            </Button>
          </Link>
        </div>
      </div>

      {order?.map((i: any, key: number) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            margin: "12px",
            padding: 12,
            borderRadius: 12,
            textAlign: "center",
            background: "rgb(215, 215, 215)",
          }}
        >
          <div
            style={{
              display: "flex",

              flexDirection: "row",
            }}
          >
            <div style={{ fontWeight: 900, marginRight: 24 }}>
              {i.user.name}
            </div>
            <div>{i.product.name}</div>
          </div>
          <div>
            <Link href={`/editOrder/${i._id}`}>
              <Button type="primary" style={{ opacity: 0.8 }}>
                <EditOutlined />
              </Button>
            </Link>
            <RemoveBtn id={i._id} aim={"orders"} />
          </div>
        </div>
      ))}
    </main>
  );
};
export default OrdersPage;
