import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import {Magic} from 'magic-sdk';


const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
  chainId: 80001, // Polygon chain id
}

const Home: NextPage = () => {
  const {data} = useSession();

  let magic : Magic;

  console.log(data)
  if(typeof window !== "undefined"){

    magic = new Magic("pk_live_85C6F4B87F5AAAD0", {
        network: customNodeOptions
    });

  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://thirdweb.com/">thirdweb</a>!
        </h1>

        <div className={styles.connect}>
          {/* <ConnectWallet /> */}
          <button
        onClick={async () => {
          console.log(await magic.auth.loginWithEmailOTP({
            email: 'iampiyushjaiswal103@gmail.com',
            showUI: true
          }))
        }}
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
