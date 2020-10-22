import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import './style.css';
import { useSelector } from 'react-redux';

export default function Status() {
  const address = useSelector(state => state.walletAddress);
  const web3 = useSelector(state => state.web3);
  const [twitter, setTwitter] = useState('exception');
  const [following, setFollowing] = useState('exception');
  const [retweet, setRetweet] = useState('exception');
  const [telegram, setTelegram] = useState('exception');

  useEffect(() => {
    async function getStatus() {
      if (address && web3) {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(`${serverUrl}/status/${address}`);
        let result = await response.json();

        parseStatus(result);
      }
    }
    getStatus();
  });

  const parseStatus = result => {
    result.twitter = result.twitter ? '' : 'exception';
    result.following = result.following ? '' : 'exception';
    result.telegram = result.telegram ? '' : 'exception';
    result.retweet = result.retweet ? '' : 'exception';

    setTwitter(result.twitter);
    setFollowing(result.following);
    setTelegram(result.telegram);
    setRetweet(result.retweet);
  };

  return (
    <div>
      <div className='progress-status'>
        <span className='title-status'>Your Twitter account</span>
        <Progress type='circle' percent={100} width={40} status={twitter} />
      </div>
      <div className='progress-status'>
        <span className='title-status'>Following us on Twitter</span>
        <Progress type='circle' percent={100} width={40} status={following} />
      </div>
      <div className='progress-status'>
        <span className='title-status'>Retweet our campaign tweet with 2 friends mention</span>
        <Progress type='circle' percent={100} width={40} status={retweet} />
      </div>
      <div className='progress-status'>
        <span className='title-status'>Join our Telegram Channel</span>
        <Progress type='circle' percent={100} width={40} status={telegram} />
      </div>
    </div>
  );
}
