import Image from "next/image";
import styles from "./page.module.css";
import { Checkout } from "@/components";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <div>
        <Checkout/>
      </div>
    </main>
  );
}
