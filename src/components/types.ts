// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ButtonProps as NextButtonProps } from '@nextui-org/react';
import type { Address } from 'abitype';
import type { To } from 'react-router-dom';
import type { Account, Chain, PublicClient, Transport, WalletClient } from 'viem';

export type IWalletClient = WalletClient<Transport, Chain, Account>;
export type IPublicClient = PublicClient<Transport, Chain>;

export type EnableClickHandler = (wallet: IWalletClient, client: IPublicClient) => void;

export interface ButtonProps extends Omit<NextButtonProps, 'size'> {
  ref?: React.Ref<HTMLButtonElement>;
  size?: NextButtonProps['size'] | 'tiny';
  to?: To;
}

export interface InputAddressProps {
  value?: string;
  disabled?: boolean;
  isSign?: boolean;
  label?: React.ReactNode;
  defaultValue?: Address;
  onChange?: (value: Address) => void;
  placeholder?: string;
  filtered?: Address[];
}

export type InputTokenType = {
  name: string;
  symbol: string;
  decimals: number;
  tokenAddress: Address;
  icon?: string | null;
  isFetched?: boolean;
  isFetching?: boolean;
};

export interface InputTokenProps {
  account?: Address;
  value?: Address;
  disabled?: boolean;
  showBalance?: boolean;
  label?: React.ReactNode;
  defaultValue?: Address;
  onChange?: (value: Address) => void;
  placeholder?: string;
  tokens: InputTokenType[];
}
