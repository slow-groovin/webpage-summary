import {useTitle, UseTitleOptions} from "@vueuse/core";
import {MaybeRef, MaybeRefOrGetter} from "vue";
import { browser } from "wxt/browser";

export function useExtInfo() {
	const name = browser.i18n.getMessage('extName')
	const version = import.meta.env.VITE_EXT_VERSION
  const iconUrl='/icon/64.png'
	return {
		name,
		version,
    iconUrl
	}
}
