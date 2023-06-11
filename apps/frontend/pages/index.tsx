import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { Header } from "../components/header/Header";
import { Box , Tabs, Tab} from "@mui/material";
import { useState } from "react";
import DiscordServers from "../components/dashboard/DiscordServers";


const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
  chainId: 80001, // Polygon chain id
}

//Initialize within your constructor


const Home: NextPage = () => {
  // const {data} = useSession();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  function getTabPanel() {
    switch(value) {
      case 2:
        return <DiscordServers />;
    }
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <Box sx={{width: '100%'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Created"  />
              <Tab label="Collected"  />
              <Tab label="Discord Servers" />
              <Tab label="Discord Roles" />
        </Tabs>
          </Box>
        </Box>
        <Box sx={{
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          paddingY: '2rem'
          }}>
          {
            getTabPanel()
          }
        </Box>
      </main>
    </div>
  );
};

export default Home;
