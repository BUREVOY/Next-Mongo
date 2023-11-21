"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";

export default function AddTopic() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    if (!name || !contact) {
      alert("name and contact are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, contact }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a User");
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
    //     placeholder="User name"
    //   />

    //   <input
    //     onChange={(e) => setContact(e.target.value)}
    //     value={contact}
    //     type="text"
    //     placeholder="User contact"
    //   />

    //   <button type="submit">Add User</button>
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
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Contact"
        rules={[{ required: true, message: "Please input your contact!" }]}
      >
        <Input value={contact} onChange={(e) => setContact(e.target.value)} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          ADD User
        </Button>
      </Form.Item>
    </Form>
  );
}
