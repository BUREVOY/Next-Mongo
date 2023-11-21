"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";

export default function EditOrderForm({ id, user, product }: any) {
  const [newUser, setNewUser] = useState(user);
  const [newProduct, setNewProduct] = useState(product);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newUser, newProduct }),
      });

      if (!res.ok) {
        throw new Error("Failed to update orders");
      }

      router.push("/orders");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     onChange={(e) => setNewUser(e.target.value)}
    //     value={newUser}
    //     type="text"
    //     placeholder="Order User"
    //   />

    //   <input
    //     onChange={(e) => setNewProduct(e.target.value)}
    //     value={newProduct}
    //     type="text"
    //     placeholder="Order Product"
    //   />

    //   <button>Update Order</button>
    // </form>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: 36 }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item label="User">
        <Input value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      </Form.Item>

      <Form.Item label="Product">
        <Input
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          EDIT Order
        </Button>
      </Form.Item>
    </Form>
  );
}
