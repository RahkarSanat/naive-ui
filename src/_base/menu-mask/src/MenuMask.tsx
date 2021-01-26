import { h, ref, onBeforeUnmount, defineComponent, Transition } from 'vue'
import { useStyle } from '../../../_mixins'
import type { MenuMaskRef } from './interface'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseMenuMask',
  setup () {
    useStyle('BaseMenuMask', style)
    const messageRef = ref<string | null>(null)
    let timerId: number | null = null
    const uncontrolledShowRef = ref(false)
    onBeforeUnmount(() => {
      if (timerId !== null) {
        window.clearTimeout(timerId)
      }
    })
    const exposedRef: MenuMaskRef = {
      showOnce (message: string, duration = 1500) {
        if (timerId) window.clearTimeout(timerId)
        uncontrolledShowRef.value = true
        messageRef.value = message
        timerId = window.setTimeout(() => {
          uncontrolledShowRef.value = false
          messageRef.value = null
        }, duration)
      }
    }
    return {
      message: messageRef,
      show: uncontrolledShowRef,
      ...exposedRef
    }
  },
  render () {
    return (
      <Transition name="n-fade-in-transition">
        {{
          default: () =>
            this.show ? (
              <div class="n-base-menu-mask">{this.message}</div>
            ) : null
        }}
      </Transition>
    )
  }
})
