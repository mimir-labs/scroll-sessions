// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Route, Routes } from 'react-router-dom';

import BaseContainer from './container/BaseContainer';
import PageLeaderboard from './pages/leaderboard';

function App(): React.ReactElement {
  return (
    <Routes>
      <Route element={<BaseContainer />}>
        <Route index element={<PageLeaderboard />} />
      </Route>
    </Routes>
  );
}

export default App;
