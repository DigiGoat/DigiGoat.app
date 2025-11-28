import * as Bootstrap from 'bootstrap';

declare global {
  interface Window {
    clarity: ((command: 'set', parameter: string, arguments?: Record<string, string> | string) => void) | never;
  }

}

declare module 'bootstrap' {
  const bootstrap: typeof Bootstrap;
}
