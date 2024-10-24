import { BrowserConfig } from './config.client';

export {};

declare global {
  interface Window {
    ENV: BrowserConfig;
  }
}
