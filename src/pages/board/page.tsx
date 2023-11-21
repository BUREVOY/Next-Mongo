// import Image from 'next/image'
// import connectDB from "../../app/api";
import Item from "../../models/item";
import styles from "./page.module.css";

// connectDB();

export default function Board({ items }: any) {
  return (
    <>
      <div>Board pages</div>
      <ul>
        {items.map((item: any) => (
          <li key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
export async function getStaticProps() {
  // Получаем данные из базы данных
  const items = await Item.find({}, "_id name description");

  return {
    props: { items: JSON.parse(JSON.stringify(items)) },
  };
}
