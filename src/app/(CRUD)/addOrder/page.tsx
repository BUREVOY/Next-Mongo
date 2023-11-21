"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";

export default function AddTopic() {
  const [user, setUser] = useState("");
  const [product, setProduct] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    if (!user || !product) {
      alert("user and product are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user, product }),
      });

      if (res.ok) {
        router.push("/orders");
        router.refresh();
      } else {
        throw new Error("Failed to create an order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     onChange={(e) => setUser(e.target.value)}
    //     value={user}
    //     type="text"
    //     placeholder="Order User"
    //   />

    //   <input
    //     onChange={(e) => setProduct(e.target.value)}
    //     value={product}
    //     type="text"
    //     placeholder="Order Product"
    //   />

    //   <button type="submit">Add Order</button>
    // </form>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: 36 }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="User"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input value={user} onChange={(e) => setUser(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Product"
        rules={[{ required: true, message: "Please input your contact!" }]}
      >
        <Input value={product} onChange={(e) => setProduct(e.target.value)} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          ADD Order
        </Button>
      </Form.Item>
    </Form>
  );
}
