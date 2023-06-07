import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const {data} = useSession();
  console.log(data)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://thirdweb.com/">thirdweb</a>!
        </h1>

        <div className={styles.connect}>
          {/* <ConnectWallet /> */}
          <button
        onClick={() => signIn("discord_bot")}
        className={`${styles.mainButton} ${styles.spacerTop}`}
      >
        Connect Discord
      </button>
        </div>

        
      </main>
    </div>
  );
};

export default Home;
