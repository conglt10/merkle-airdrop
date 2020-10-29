import React from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import logoIcon from 'assets/images/logo-icon.png';
import BN from 'bn.js';
import './style.css';

export default function Claim() {
  const dispatch = useDispatch();
  const phoneToken = process.env.REACT_APP_PHONE_TOKEN_ADDRESS;
  const address = useSelector(state => state.walletAddress);
  const tranche = useSelector(state => state.tranche);
  const instanceAirdropContract = useSelector(state => state.instanceAirdropContract);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const getProof = async () => {
    try {
      const response = await fetch(`${serverUrl}/proof/${tranche}/${address}`);
      if (response.status === 400) {
        return false;
      }

      const result = await response.json();

      return result.proof;
    } catch (err) { }
  };

  const claim = async () => {
    try {
      if (!address) {
        message.error('Please connect MetaMask');
        return;
      }

      const isClaimed = await instanceAirdropContract.methods.claimed(tranche, address).call();

      if (isClaimed) {
        message.error('You have already claimed');
        return;
      }

      const proof = await getProof();
      if (!proof) {
        message.error('You have not completed all step');
        return;
      }

      dispatch(actions.setLoading(true));

      let response = await fetch(`${serverUrl}/tranche`);
      response = await response.json();
      const amount = new BN(response.amount);

      const result = await instanceAirdropContract.methods
        .claimWeek(address.toLowerCase(), tranche, amount, proof)
        .send({ from: address });
      if (result.status) {
        message.success('Receive Airdrop successfully');
      }
      dispatch(actions.setLoading(false));
    } catch (err) {
      dispatch(actions.setLoading(false));
      if (err.code === 4001) {
        return;
      }
      message.error('Claim has failed');
    }
  };

  return (
    <div>
      <a className='btn-icon wow fadeIn' href='#' onClick={() => claim()}>
        <span className='btn-content'>
          <span className='icon'>
            <img src={logoIcon} alt='logo-icon' />
          </span>
          Get airdrop tokens
          <strong>Claim</strong>
        </span>
      </a>

      <ol className='add-token'>
        <li>
          Open MetaMask, in <strong>Assets</strong> tab, click <strong>Add Token</strong>
        </li>
        <li>
          Choose <strong>Custom Token</strong>
        </li>
        <li>Fill PHONE Token address: {phoneToken.toLowerCase()}</li>
      </ol>
    </div>
  );
}
