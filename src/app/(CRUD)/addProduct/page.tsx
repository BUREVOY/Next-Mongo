"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";

export default function AddTopic() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [remainings, setRemainings] = useState("");

  let supplier = [{ company, remainings }];

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    if (!name || !price) {
      alert("name and price are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, price, supplier }),
      });

      if (res.ok) {
        router.push("/products");
        router.refresh();
      } else {
        throw new Error("Failed to create a Product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     onChange={(e) => setName(e.target.value)}
    //     value={name}
    //     type="text"
    //     placeholder="Product name"
    //   />

    //   <input
    //     onChange={(e) => setPrice(e.target.value)}
    //     value={price}
    //     type="text"
    //     placeholder="Product price"
    //   />
    //   <input
    //     onChange={(e) => setCompany(e.target.value)}
    //     value={company}
    //     type="text"
    //     placeholder="Product Company"
    //   />
    //   <input
    //     onChange={(e) => setRemainings(e.target.value)}
    //     value={remainings}
    //     type="text"
    //     placeholder="Product Remainings"
    //   />

    //   <button type="submit">Add Product</button>
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
        label="Name"
        rules={[{ required: true, message: "Please input your product name!" }]}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Price"
        rules={[{ required: true, message: "Please input your Price!" }]}
      >
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </Form.Item>

      <Form.Item label="Company">
        <Input value={company} onChange={(e) => setCompany(e.target.value)} />
      </Form.Item>

      <Form.Item label="Remainings">
        <Input
          value={remainings}
          onChange={(e) => setRemainings(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          ADD Product
        </Button>
      </Form.Item>
    </Form>
  );
}
