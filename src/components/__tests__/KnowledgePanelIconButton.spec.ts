import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import KnowledgePanelIconButton from '../KnowledgePanelIconButton.vue'
import { ChevronRight12Regular } from '@vicons/fluent'
import { markRaw } from 'vue'

describe('knowledge panel icon button smoke testing', async () => {
  test('smoke test for knowledge panel icon button', async () => {
    const wrapper = mount(KnowledgePanelIconButton, {
      props: {
        icon: markRaw(ChevronRight12Regular)
      }
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })
})
