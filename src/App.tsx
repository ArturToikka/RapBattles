import React from 'react';
import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react';
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from 'ton-core';
import WebApp from "@twa-dev/sdk";

console.log(React.version)
// 0QAkXdIpH5OIns5dH5XlWbWgCLxSAyz1LcdfMNsrGvCy_rJa

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Owner Address</b>
          <div className='Hint'>{owner_address?.toString()}</div>
          <b>Our contract Balance </b>
          {contract_balance &&
            <div className='Hint'>{fromNano(contract_balance)}</div>}
          <b>Recent sender </b>
          {recent_sender &&
            <div className='Hint'>{recent_sender.toString()}</div>}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
        <div>

          <a
            onClick={() => {
              showAlert();
            }}
          >
            Show Alert
          </a>
          <br/>

          {connected && (
            <a
              onClick={() => {
                sendIncrement();
              }}
            >
              Increment by 5
            </a>
          )}

          <br />

          {connected && (
            <a
              onClick={() => {
                sendDeposit();
              }}
            >
              Request deposit of 1 TON
            </a>
          )}

          <br />

          {connected && (
            <a
              onClick={() => {
                sendWithdrawalRequest();
              }}
            >
              Request withdawal of 0.01 TON
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
