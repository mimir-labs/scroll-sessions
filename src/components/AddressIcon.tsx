// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import jazzicon from '@metamask/jazzicon';
import { Avatar } from '@nextui-org/react';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { zeroAddress } from 'viem';
import { useChains } from 'wagmi';

import { CustomChain } from '@mimir-wallet/config';

import AddressIconJazz from './AddressIconJazz';

interface Props {
  address?: string | null | undefined;
  ensImage?: string | null;
  size?: number;
  src?: string;
  isToken?: boolean;
}

function AddressIcon({ ensImage, size = 24, src, isToken, address }: Props): React.ReactElement {
  if (isToken) {
    address ||= zeroAddress;
  }

  const icon = useMemo(() => (address ? jazzicon(size, parseInt(address.slice(2, 10), 16)) : null), [size, address]);
  const iconRef = useRef<HTMLDivElement>(null);
  const [chain] = useChains();

  useLayoutEffect(() => {
    const { current } = iconRef;

    if (icon) {
      current?.appendChild(icon);

      return () => {
        try {
          current?.removeChild(icon);
        } catch {
          /* empty */
        }
      };
    }

    return () => 0;
  }, [icon]);

  let iconSrc = src || ensImage;

  if (address) {
    if (address === zeroAddress) {
      if (isToken) {
        iconSrc = (chain as CustomChain).nativeCurrencyIcon;
      }
    }
  }

  return (
    <span className='relative'>
      <Avatar
        src={iconSrc || undefined}
        style={{ width: size, height: size, background: 'transparent' }}
        fallback={<AddressIconJazz address={address} size={size} ensImage={ensImage} />}
      />
    </span>
  );
}

export default React.memo(AddressIcon);
