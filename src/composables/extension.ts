import {useTitle, UseTitleOptions} from "@vueuse/core";
import {MaybeRef, MaybeRefOrGetter} from "vue";
import { browser } from "wxt/browser";
import { useAppConfig } from "wxt/client";

const {version}=useAppConfig()
export function useExtInfo() {
	const name = browser.i18n.getMessage('extName')
  const iconUrl='/icon/64.png'
	return {
		name,
		version,
    iconUrl
	}
}
