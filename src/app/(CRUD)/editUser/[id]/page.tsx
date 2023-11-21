// import EditTopicForm from "@/components/EditTopicForm";

import EditUserForm from "@/components/EditUser/editUser";

const getUserById = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditUser({ params }: any) {
  const { id } = params;
  const { user } = await getUserById(id);
  const { name, contact } = user;

  return <EditUserForm id={id} name={name} contact={contact} />;
}
