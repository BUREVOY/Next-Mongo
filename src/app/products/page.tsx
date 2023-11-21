import RemoveBtn from "@/components/DeleteComponents/deleteComps";
import Product from "@/models/product";
import mongoose from "mongoose";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import s from "./products.module.scss";
import { Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

const productsEndPoint = "http://localhost:3000/api/products";

const getItems = async () => {
  try {
    const res = await fetch(productsEndPoint, {
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
// const { product } = await getItems();
// const getItems = async () => {
//   const cursor = Product.find().cursor();
//   const productsArray: any = [];

//   await cursor.eachAsync((product: any) => {
//     // Обработка каждого продукта
//     productsArray.push(product);
//     console.log("Received product:", product);
//   });

//   return { product: productsArray };
// };

const ProductsPage = async () => {
  const { product } = await getItems();

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
          <h1>Products</h1>
        </div>
        <div>
          <Link href={"/addProduct"}>
            <Button type="primary" danger style={{ opacity: 0.8 }}>
              <PlusOutlined />
            </Button>
          </Link>
        </div>
      </div>
      {product.map((i: any, key: number) => (
        <div>
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 12,
              background: "rgb(215, 215, 215)",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: "flex",

                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",

                // margin: "0 auto",
              }}
            >
              <div style={{ marginRight: 12, fontWeight: 900 }}>{i.name}</div>
              <div style={{ marginRight: 12 }}>{i.price}₽</div>
              <div style={{ marginRight: 12 }}> {i._id}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                margin: 12,
              }}
            >
              {i.supplier.map((s: any, index: number) => (
                <div>
                  {index > 0 ? "  and  " : ""} {s.company} with{" "}
                  <b>{s.remainings} </b>
                </div>
              ))}
            </div>
            <div>
              <Link href={`/editProduct/${i._id}`}>
                <Button type="primary" style={{ opacity: 0.8 }}>
                  <EditOutlined />
                </Button>
              </Link>
              <RemoveBtn id={i._id} aim={"products"} />
            </div>
          </div>
        </div>

        // <User _id={i._id} contact={i.contact} name={i.name} key={i._id} />
      ))}
    </main>
  );
};

export default ProductsPage;
