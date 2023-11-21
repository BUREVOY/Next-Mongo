"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";

export default function EditProductForm({ id, name, price, supplier }: any) {
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [company, setNewCompany] = useState(supplier.company);
  const [remainings, setNewRemainings] = useState(supplier.remainings);

  let newSupplier = [{ company, remainings }];

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newPrice, newSupplier }),
      });

      if (!res.ok) {
        throw new Error("Failed to update users");
      }

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     onChange={(e) => setNewName(e.target.value)}
    //     value={newName}
    //     type="text"
    //     placeholder="Product Name"
    //   />

    //   <input
    //     onChange={(e) => setNewPrice(e.target.value)}
    //     value={newPrice}
    //     type="text"
    //     placeholder="Product Price"
    //   />
    //   <input
    //     onChange={(e) => setNewCompany(e.target.value)}
    //     value={company}
    //     type="text"
    //     placeholder="Product Company"
    //   />
    //   <input
    //     onChange={(e) => setNewRemainings(e.target.value)}
    //     value={remainings}
    //     type="text"
    //     placeholder="Product Remainings"
    //   />

    //   <button>Update Product</button>
    // </form>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: 36 }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item label="Name">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </Form.Item>

      <Form.Item label="Price">
        <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
      </Form.Item>

      <Form.Item label="Company">
        <Input
          value={company}
          onChange={(e) => setNewCompany(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Remainings">
        <Input
          value={remainings}
          onChange={(e) => setNewRemainings(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          EDIT Product
        </Button>
      </Form.Item>
    </Form>
  );
}
