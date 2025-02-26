import { defineAppConfig } from 'wxt/sandbox';

// Define types for your config
declare module 'wxt/sandbox' {
  export interface WxtAppConfig {
    version: string;
  }
}

export default defineAppConfig({
  version: '0.1.4',
});