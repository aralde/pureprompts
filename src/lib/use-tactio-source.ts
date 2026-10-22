import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function useIsTactioSource(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get('source') === 'tactio',
    () => false,
  );
}
