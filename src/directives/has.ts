import type { Directive, DirectiveBinding } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const has: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()
    const permission = binding.value as string
    
    if (!authStore.hasPermission(permission)) {
      el.style.display = 'none'
    }
  }
}

export default has
