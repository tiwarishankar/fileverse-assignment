import React from "react";
import './index.css'
import Card from 'react-bootstrap/Card';

export default function NftContainer({image, nftTitle}){
        return (
            <div className="nft-card">
            { image &&  <img
                  src={image}
                  alt="img-blur-shadow"
                  className="nft-img"
                /> 
            }
                <div>
                  {nftTitle}
              </div>
            </div>
    )
}