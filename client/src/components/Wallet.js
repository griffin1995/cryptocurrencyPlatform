import React from "react";
import "./Wallet.scss"

export default function Wallet({walletName}) {
  return (
        <h1 as className="bi bi-wallet bg-secondary px-4 pb-2 pt-3 rounded mx-1 wallet w-100 text-center">
          {" " + walletName}
        </h1>
  );
}
