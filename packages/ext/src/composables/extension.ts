import {useTitle, UseTitleOptions} from "@vueuse/core";
import {MaybeRef, MaybeRefOrGetter} from "vue";

export function useExtInfo() {
	const name = import.meta.env.VITE_EXT_NAME
	const version = import.meta.env.VITE_EXT_VERSION
  const iconUrl='/icon/64.png'
	return {
		name,
		version,
    iconUrl
	}
}
