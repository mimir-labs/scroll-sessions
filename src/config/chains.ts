// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'viem';
import { scroll } from 'viem/chains';
import { type Config } from 'wagmi';

import { WALLET_CONNECT_PROJECT_ID } from '@mimir-wallet/constants';

type ChainBlockExplorer = {
  name: string;
  url: string;
  apiUrl: string | undefined;
};

export type CustomChain = Chain & {
  blockExplorers: {
    [key: string]: ChainBlockExplorer;
    default: ChainBlockExplorer;
  };
  shortName: string;
  iconUrl: string;
  nativeCurrencyIcon: string;
};

export const supportedChains = [
  { ...scroll, shortName: 'scr', iconUrl: '/chain-icons/534352.webp', nativeCurrencyIcon: '/token-icons/ETH.webp' }
] as [CustomChain, ...CustomChain[]];

export function initMimirConfig(): Config {
  return getDefaultConfig({
    appName: 'Leaderboard(Scroll)',
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: supportedChains,
    syncConnectedChain: true,
    appIcon: 'https://safe.mimir.global/images/logo-circle.png'
  });
}
