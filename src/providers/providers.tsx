// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Config } from 'wagmi';

import { ToastRoot } from '@mimir-wallet/components';

import WalletProvider from './WalletProvider';

function Providers({ config, children }: { config: Config; children: React.ReactNode }) {
  return (
    <WalletProvider config={config}>
      {children}
      <ToastRoot />
    </WalletProvider>
  );
}

export default Providers;
