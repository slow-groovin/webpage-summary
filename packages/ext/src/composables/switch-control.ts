import { ref } from "vue";

/**
 * enable once, hide/show multi
 * example: summary panel, need to be enable(v-if) once, and can be hide/show(v-show) to storage the summary result
 */
export function useEnableOnceAndToggleHide(opt?: { initIsEnable?: boolean }) {
  const isEnable = ref(!!opt?.initIsEnable)
  const isShow = ref(true)
  let onceFlag = true
  function tryEnableOrShow() {
    if (onceFlag && isEnable.value===false) {
      isEnable.value = true
      onceFlag = false
    }else{
      isShow.value=true
    }
  }
  function toggleShow(control?: boolean) {
    if (typeof control === 'boolean') {
      isShow.value = control
    } else {
      isShow.value = !isShow.value
    }
  }
  return { isEnable, isShow, tryEnableOrShow, toggleShow }
}