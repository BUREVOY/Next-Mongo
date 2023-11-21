"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";

export default function EditUserForm({ id, name, contact }: any) {
  const [newName, setNewName] = useState(name);
  const [newContact, setNewContact] = useState(contact);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newContact }),
      });

      if (!res.ok) {
        throw new Error("Failed to update users");
      }

      router.push("/");
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
    //     placeholder="User Name"
    //   />

    //   <input
    //     onChange={(e) => setNewContact(e.target.value)}
    //     value={newContact}
    //     type="text"
    //     placeholder="User Contact"
    //   />

    //   <button>Update User</button>
    // </form>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: 36 }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item label="New Username">
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </Form.Item>

      <Form.Item label="New Contact">
        <Input
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          EDIT User
        </Button>
      </Form.Item>
    </Form>
  );
}
