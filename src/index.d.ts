import { BrowserConfig } from './config.client';

export {};

declare global {
  interface Window {
    ENV: BrowserConfig;
  }
  interface SmsClient {
    sendSms(phone: string, message: string): Promise<string>;
  }
}
