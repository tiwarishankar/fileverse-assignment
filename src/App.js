import React, { useEffect } from "react";
import MainPage from "./components/mainPage";
import NavBar from "./components/navbar";
import { Network, Alchemy } from 'alchemy-sdk';
import { useAlchemyState } from "./context/alchemyState";
import NftContainer from "./components/nft-container";
function App() {
  const {setAlchemy, setIsSet} = useAlchemyState();
  useEffect(()=>{
    const settings = {
      apiKey: "yMicluO0FzEdpgQUS87MJGn-cW3RlWve",
      network: Network.ETH_MAINNET,
  };
    const instance = new Alchemy(settings);
    setAlchemy(instance)
    setIsSet(true)
  },[])
  return (   
      <div className="">
       <NavBar/>
       <MainPage/>
    </div>
  );
}

export default App;
