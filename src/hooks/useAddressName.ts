// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Address } from 'abitype';

import { useMemo } from 'react';
import { isAddress } from 'viem';
import { useEnsName } from 'wagmi';

export function useAddressName(
  address?: string | null,
  disableEns?: boolean,
  fallback?: React.ReactNode
): React.ReactNode {
  const { data: ensName } = useEnsName({ address: disableEns ? undefined : (address as Address) || undefined });

  return useMemo(() => {
    if (!address) {
      return fallback;
    }

    if (!isAddress(address)) {
      return fallback;
    }

    const defaultName = fallback || `${address.slice(0, 6)}...${address.slice(-4)}`;

    return ensName || defaultName;
  }, [address, ensName, fallback]);
}
