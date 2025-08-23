import { Browser } from "wxt/browser";

export type PortListener = (message: unknown, port: Browser.runtime.Port) => void