import { computed, onMounted, onUnmounted } from "vue";
import { storage, StorageItemKey } from "wxt/storage";

import {useAsyncState, UseAsyncStateOptions} from '@vueuse/core'

/**
 * https://github.com/wxt-dev/examples/blob/main/examples/vue-storage-composable/entrypoints/popup/App.vue
 * @param key
 * @param initialValue
 * @param opts
 */
export default function <T>(
	key: StorageItemKey,
	initialValue: T,
	opts?: UseAsyncStateOptions<true, T | null>,
) {
	const {
		state,
		execute: _, // Don't include "execute" in returned object
		...asyncState
	} = useAsyncState<T, [], true>(
		() => storage.getItem(key,{fallback:initialValue}),
		initialValue ,
		opts,
	);

	// Listen for changes
	let unwatch: (() => void) | undefined;
	onMounted(() => {
		unwatch = storage.watch<T>(key, async (newValue) => {
			state.value = newValue ?? initialValue;
		});
	});
	onUnmounted(() => {
		unwatch?.();
	});

	return {
		// Use a writable computed ref to write updates to storage
		state: computed({
			get() {
				return state.value;
			},
			set(newValue) {
				void storage.setItem(key, newValue);
				state.value = newValue;
			},
		}),
		...asyncState,
	};
}