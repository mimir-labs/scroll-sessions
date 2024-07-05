// Copyright 2023-2024 dev.mimir authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useLayoutEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);

  useLayoutEffect(() => {
    const mediaQuery = matchMedia(query);

    function onMediaQueryChange(): void {
      setMatches(mediaQuery.matches);
    }

    mediaQuery.addEventListener('change', onMediaQueryChange);

    return (): void => {
      mediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, [query]);

  return matches;
}
