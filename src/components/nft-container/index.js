import React from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function NftContainer({ image, nftTitle }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {nftTitle}
    </Tooltip>
  );

  return (
    <div className="nft-card">
      {image && <img src={image} alt="img-blur-shadow" className="nft-img" />}
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <div className="truncate">{nftTitle}</div>
      </OverlayTrigger>
    </div>
  );
}
