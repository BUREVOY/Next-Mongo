// "use client";
import RemoveBtn from "@/components/DeleteComponents/deleteComps";
import User from "@/components/User/user";
import { ItemType } from "@/models/item";
import { UsersType } from "@/models/user";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "../../node_modules/next/link";
import styles from "./page.module.scss";
import { Button } from "antd";

const testEndPoint = "http://localhost:3000/api/change";
const usersEndPoint = "http://localhost:3000/api/users";

const getItems = async () => {
  try {
    const res = await fetch(usersEndPoint, {
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
export default async function Home() {
  const { user } = await getItems();

  return (
    <main className={styles.main}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div>
          <h1>Users</h1>
        </div>
        <div>
          <Link href={"/addUser"}>
            <Button type="primary" danger style={{ opacity: 0.8 }}>
              <PlusOutlined />
            </Button>
          </Link>
        </div>
      </div>

      {user.map((i: UsersType, key: number) => (
        // <div key={key}>
        //   {i.name} and {i.description} with id {i._id}
        // </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "12px",
            padding: 12,
            borderRadius: 12,
            textAlign: "center",
            background: "rgb(215, 215, 215)",
          }}
        >
          <User _id={i._id} contact={i.contact} name={i.name} key={i._id} />
          <div>
            <Link href={`/editUser/${i._id}`}>
              <Button type="primary" style={{ opacity: 0.8 }}>
                <EditOutlined />
              </Button>
            </Link>
            <RemoveBtn id={i._id} aim={"users"} />
          </div>
        </div>
      ))}
    </main>
  );
}
