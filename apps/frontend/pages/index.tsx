import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { Web3Auth } from "@web3auth/modal";


const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
  chainId: 80001, // Polygon chain id
}

//Initialize within your constructor


const Home: NextPage = () => {
  const {data} = useSession();

  let web3auth: Web3Auth;
  console.log('Session', data)

  console.log(data)
  if(typeof window !== "undefined"){
    web3auth = new Web3Auth({
      clientId: process.env['NEXT_PUBLIC_WEB3AUTH_CLIENT_ID'] as string, // Get your Client ID from Web3Auth Dashboard
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x89", // Use 0x13881 for Mumbai Testnet
      },
      
    })
    web3auth.initModal().then(() => {});

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
        onClick={() => {
          // signIn('discord_bot')
          web3auth.connect().then(() => {})
    
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
