import { describe, expect, test } from 'vitest'
import { defineComponent, provide } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { NMessageProvider } from 'naive-ui'
import AuthModal from '@/components/AuthModal.vue'
import type { IAuth, LoginResponse, RefreshTokenResponse } from '@/libraries/auth'

class AuthMock implements IAuth {
  async login(): Promise<LoginResponse> {
    return new Promise(() => {})
  }
  async refreshToken(): Promise<RefreshTokenResponse> {
    return new Promise(() => {})
  }
}

describe('auth modal smoke testing', () => {
  const ModalWrapper = defineComponent({
    setup() {
      provide('auth', new AuthMock())
    },
    template: `<html>
      <body>
        <n-message-provider>
          <suspense>
            <auth-modal />
          </suspense>
        </n-message-provider>
        <div class="n-modal-container"></div>
      </body>
    </html>`,
    components: {
      NMessageProvider,
      AuthModal
    }
  })

  test('test that auth modal can render', async () => {
    const wrapper = mount(ModalWrapper)
    await flushPromises()
    expect(wrapper.html()).not.toBe('')
  })
})
