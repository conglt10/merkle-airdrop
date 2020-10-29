import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import ConnectWallet from 'components/ConnectWallet';
import Status from 'components/Status';
import Claim from 'components/Claim';
import homeMobile from 'assets/images/Dual-Phone.gif';
import telegram from 'assets/images/telegram.svg';
import twitter from 'assets/images/twitter.svg';
import medium from 'assets/images/medium.svg';
import discord from 'assets/images/discord.svg';
import github from 'assets/images/github.svg';
import serviceShape1 from 'assets/images/service-shape-1.png';
import serviceShape2 from 'assets/images/service-shape-2.png';
import serviceShape3 from 'assets/images/service-shape-3.png';
import logo from 'assets/images/logo.png';
import { DollarOutlined, GiftOutlined, MobileOutlined } from '@ant-design/icons';
import { BackTop, Spin } from 'antd';
import { connectMetaMask } from 'utils/connectMetaMask';
import { useSelector } from 'react-redux';

import './App.css';

import './assets/scss/style-landing-page.scss';

function App() {
  const loading = useSelector(state => state.loading);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let [mainmenuArea, setMainmenuArea] = useState('');
  useEffect(() => {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 75) {
        setMainmenuArea('mainmenu-area');
      } else {
        setMainmenuArea('');
      }
    });

    if (window.ethereum._metamask.isEnabled()) {
      connectMetaMask();
    }
  }, []);

  return (
    <div className='landing-page-style'>
      <BackTop />
      <Navbar light expand='md' className={`navbar-menu ${mainmenuArea}`}>
        <div className='container'>
          <NavbarBrand href='/'>
            <img src={logo} alt='logo' title='logo' className='style-logo' />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto menu-landing-page' navbar>
              <NavItem></NavItem>
              <NavItem></NavItem>
              <NavItem></NavItem>
            </Nav>
            <ConnectWallet />
          </Collapse>
        </div>
      </Navbar>
      <div className='header-area'>
        <div className='vcenter'>
          <div className='container'>
            <div className='row row-middle'>
              <div className='col-12 col-sm-8 col-md-7 left-header-area'>
                <Status />
                <div className='space-30 hidden-xs'></div>
                <Claim />
              </div>
              <div className='col-12 col-sm-8 col-md-5 box-image-mobile'>
                <img src={homeMobile} className='home-mobile' alt='home-mobile'></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spin spinning={loading} size='large' tip='Loading...'></Spin>
      <section className='section-padding-top feature-area'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h2 className='page-title'> Features</h2>
              <div className='space-60'></div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-4'>
              <div className='feature-box service-box-two'>
                <div className='feature-icon' style={{ backgroundImage: `url(${serviceShape1})` }}>
                  <DollarOutlined />
                </div>
                <h3 className='feature-title'>PHONE Token</h3>
                <p>
                  PHONE is a token used for Staking. User needs to buy PHONE to put it in pools,
                  it's like raw materials.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4'>
              <div className='feature-box service-box-two'>
                <div className='feature-icon' style={{ backgroundImage: `url(${serviceShape2})` }}>
                  <GiftOutlined />
                </div>
                <h3 className='feature-title'>Staking Receive Rewards</h3>
                <p>
                  Staker will receive rewards through each block. This reward will be paid by iPhone
                  token (ERC-20).
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-md-4'>
              <div className='feature-box service-box-two'>
                <div className='feature-icon' style={{ backgroundImage: `url(${serviceShape3})` }}>
                  <MobileOutlined />
                </div>
                <h3 className='feature-title'>Mint NFTS</h3>
                <p>
                  With iPhone token, we can use it to mint new iPhone NFT cards, which can be used
                  to change your phone looks on home page, and also you can list those on NTF
                  markets, too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className='footer'>
        <div className='container'>
          <div className='row justify-content-end'>
            <div className='col-12 col-md-6 name-team'>
              <div className='footer-copyright'>© 2020 - PhoneFarm Project</div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='icons row justify-content-center'>
                <div className='col-1 icon'>
                  <a href='https://t.me/phonefarmfinance'>
                    <img src={telegram} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://discord.gg/aBApkPx'>
                    <img src={discord} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://twitter.com/PhonefarmF'>
                    <img src={twitter} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://medium.com/@phonefarm.finance'>
                    <img src={medium} alt='' width='36px' />
                  </a>
                </div>
                <div className='col-1 icon'>
                  <a href='https://github.com/PhoneFarm-Project'>
                    <img src={github} alt='' width='36px' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
