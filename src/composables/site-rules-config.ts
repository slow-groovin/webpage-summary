import {
  BLACKLIST,
  SITE_CUSTOMIZATION,
  WHITELIST,
} from "@/src/constants/storage-key";
import { DefaultConfig } from "../constants/default-config";
import type {
  BlackList,
  SiteCumstomizationItem,
  WhiteList,
} from "../types/config/site-rules";
import useWxtStorage from "./useWxtStorage";

/**
 * Reactive whitelist config.
 */
export function useWhitelist() {
  const { state: whitelist, ...other } = useWxtStorage<WhiteList>(
    WHITELIST,
    DefaultConfig.WHITELIST
  );
  return { whitelist, ...other };
}

/**
 * Reactive blacklist config.
 */
export function useBlacklist() {
  const { state: blacklist, ...other } = useWxtStorage<BlackList>(
    BLACKLIST,
    DefaultConfig.BLACKLIST
  );
  return { blacklist, ...other };
}

/**
 * Reactive site customization config.
 */
export function useSiteCustomization() {
  const { state: siteCustomization, ...other } = useWxtStorage<
    SiteCumstomizationItem[]
  >(SITE_CUSTOMIZATION, DefaultConfig.SITE_CUSTOMIZATION);
  return { siteCustomization, ...other };
}
