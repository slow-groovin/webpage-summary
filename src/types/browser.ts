import { Runtime } from "wxt/browser";

export type PortListener=(message:unknown,port:Runtime.Port)=>void