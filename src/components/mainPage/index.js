import { useEffect, useState } from "react";
import { useAlchemyState } from "../../context/alchemyState";
import { ethers } from "ethers";
import NftContainer from "../nft-container";
import "./index.css";

export default function MainPage() {
  const { ethereum } = window;
  const [balance, setBalance] = useState(undefined);
  const { account, setAccount, alchemy, isSet } = useAlchemyState();
  const [totalNFT, setTotalNFT] = useState([]);
  const [isLoading, setLoading] = useState(false)

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      console.log("Make sure you have metamask");
      return;
    }
    setLoading(true);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      // console.log("Found an Authorised Account-->", account);
      setAccount(account);
    } else {
      // console.log("No authorized found");
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
      console.log("Connected", accounts[0]);
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
    setLoading(true)
    console.log(isLoading)
    
    const ownerAddr = "0x3a2548af0f22204eec8da7b2d002f0b01f9cdab8";
    // Print total NFT count returned in the response:
   // const ownerAddr= account;
    const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);
    console.log(nftsForOwner)
    const numberOfNFT = nftsForOwner.totalCount;
    console.log(nftsForOwner?.ownedNfts)
    
    setTotalNFT(nftsForOwner?.ownedNfts)
    
    setLoading(false)
    
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    if (isSet && account) {
      fetchBalance();
    }
  }, [isSet, account]);

  function disconnect() {
    try {
      setAccount("");
    } catch (err) {
      alert(err);
    }
  }

  if (isLoading) return "Loading...";

  return (
    <div className="flex flex-col items-center bg-neutral-100 min-h-screen ">
      {account && balance && (
        <div className="balance-card">
         <div className="balance-info">Balance of your account in : {balance} eth</div>
        <button
        onClick={ disconnect}
        className="py-2 text-lg font-semibold text-white rounded-lg w-60 bg-amber-500 hover:bg-amber-600"
      >
       Disconnect
      </button>
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
      {/* { active && 
      <div className="flex flex-col justify-between mt-10 mb-5 w-10/12 rounded-xl bg-white p-4 sm:flex-row">
        <div className="break-words">
          Account: <b>{account}</b>
          <Balance account={account} chainId={chainId}/>
        </div>
        
        <div>
          <button onClick={disconnect} className="py-2 text-lg font-semibold text-white rounded-lg w-48 bg-amber-500 hover:bg-amber-600">
            Disconnect
          </button>
        </div>

      </div> } */}

      {account && totalNFT && (
        <div className="nft-card-container">
          {totalNFT.map((item, index) => (
            <NftContainer key={index}
            image= {item?.media[0]?.gateway}
            nftTitle={item?.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}
