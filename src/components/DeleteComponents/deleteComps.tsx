"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function RemoveBtn({ id, aim }: any) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/${aim}?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <Button
      onClick={removeTopic}
      type="primary"
      danger
      style={{ opacity: 0.8 }}
    >
      <DeleteOutlined />
    </Button>
  );
}
