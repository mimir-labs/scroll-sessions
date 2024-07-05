// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Link, Navbar, NavbarContent } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

import Logo from '@mimir-wallet/assets/images/logo.png';
import { ButtonEnable, ButtonLinear } from '@mimir-wallet/components';

function BaseContainer(): React.ReactElement {
  const { isConnected } = useAccount();

  return (
    <main id='mimir-main' className='bg-main-background min-h-dvh text-foreground text-small'>
      <Navbar maxWidth='full' isBordered className='bg-white'>
        <NavbarContent justify='start' className='w-auto'>
          <Link href='/'>
            <img src={Logo} alt='mimir' className='w-[87px]' />
          </Link>
        </NavbarContent>
        <NavbarContent justify='end' className='text-small w-auto gap-2.5'>
          {isConnected ? (
            <ConnectButton
              showBalance={{ smallScreen: false, largeScreen: true }}
              chainStatus={{ smallScreen: 'icon', largeScreen: 'icon' }}
            />
          ) : (
            <ButtonEnable Component={ButtonLinear} color='primary' radius='full' withConnect />
          )}
        </NavbarContent>
      </Navbar>
      <Outlet />
    </main>
  );
}

export default BaseContainer;
