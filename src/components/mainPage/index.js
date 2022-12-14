import { useEffect, useState } from "react";
import { useAlchemyState } from "../../context/alchemyState";
import { ethers } from "ethers";
import NftContainer from "../nft-container";
import "./index.css";
import LoaderComponent from "../LoaderComponent";

export default function MainPage(){
  const { ethereum } = window;
  const [balance, setBalance] = useState(undefined);
  const { account, setAccount, alchemy, isSet } = useAlchemyState();
  const [totalNFT, setTotalNFT] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      console.log("Make sure you have metamask");
      return;
    }
    setLoading(true);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      setAccount(account);
    } else {
      console.log("No authorized found");
    }
    setLoading(false);
  };
  const connectWallet = async () => {
    setLoading(true);
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain" + chainId);
      const mainnnetId = "0x1";
      if (chainId !== mainnnetId) {
        console.log("hioiasdf");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const convertToEthers = (bal) => {
    const val = ethers.utils.formatEther(bal._hex);
    setBalance(val);
  };

  const fetchBalance = async () => {
    if (!ethereum) return;
    alchemy.core.getBalance(account, "latest").then(convertToEthers);
    await fetchNFT();
  };

  const fetchNFT = async () => {
    setLoading(true);
    const ownerAddr = account;
    const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);
    const numberOfNFT = nftsForOwner.totalCount;
    console.log(nftsForOwner?.ownedNfts);
    setTotalNFT(nftsForOwner?.ownedNfts);
    setLoading(false);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    if (isSet && account) {
      fetchBalance();
    }
  }, [isSet, account]);


  if (isLoading) return <LoaderComponent/>;
  
  return (
    <div className="flex flex-col items-center bg-neutral-100 min-h-screen ">
      {account && balance && (
        <div className="balance-card">
          <div className="balance-info">
            Balance of your account in : {balance} eth
          </div>
        </div>
      )}
      {!account && (
        <div className="m-60">
          <button
            onClick={connectWallet}
            className="py-2 text-lg font-semibold text-white rounded-lg w-60 bg-amber-500 hover:bg-amber-600"
          >
            Connect to MetaMask
          </button>
        </div>
      )}
      {account && totalNFT && (
        <div className="nft-card-container">
          {totalNFT.map((item, index) => (
            <NftContainer
              key={index}
              image={item?.media[0]?.gateway}
              nftTitle={item?.title}
            />
          ))}
        </div>
      )}
      {totalNFT.length===0 && account && 
       <div className="no-nft-card-container">
       No NFT Found
     </div>
      }
    </div>
  );
}
