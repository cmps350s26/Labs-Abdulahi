import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1 className="red">My First Next JS React = {2 + 5} </h1>
      <h1>My First Next JS React = {2 + 5} </h1>
      <label htmlFor=""></label>

      {[1, 2, 3].map(n => <li>{n}</li>)}


    </>
  );
}

