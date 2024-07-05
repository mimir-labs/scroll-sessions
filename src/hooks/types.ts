// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Address } from 'viem';

export interface TokenMeta {
  chainId: number;
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
}

export interface TokenInfo extends TokenMeta {
  icon?: string | null;
}
