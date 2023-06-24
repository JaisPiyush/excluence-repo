
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ExButton from "@components/ExButton";



const Home: NextPage = () => {


  return (
    <div>
      <ExButton isPrimary={true}>
        Group
      </ExButton>
    </div>
  );
};

export default Home;
