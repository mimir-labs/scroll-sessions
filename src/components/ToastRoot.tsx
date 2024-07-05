// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createPortal } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';

import TxError from './TxError';

function getMessage(value: unknown): React.ReactNode {
  if (typeof value === 'string') {
    return value.toString();
  }

  return <TxError error={value} />;
}

function ToastRoot() {
  return createPortal(
    <ToastContainer
      stacked
      autoClose={5000}
      closeOnClick
      draggable
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position='top-right'
      rtl={false}
      theme='light'
    />,
    document.body
  );
}

export function toastSuccess(message: string) {
  return toast.success(message);
}

export function toastError(error: unknown) {
  return toast.error(getMessage(error));
}

export function toastWarn(error: unknown) {
  return toast.warn(getMessage(error));
}

export default ToastRoot;
