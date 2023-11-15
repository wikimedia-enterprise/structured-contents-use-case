import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import KnowledgePanelSectionSelector from '../KnowledgePanelSectionSelector.vue'

describe('knowledge panel section selector smoke testing', async () => {
  test('smoke test for knowledge section selector', async () => {
    const parts = [
      { name: 'Abstract', type: 'section', has_parts: [] },
      { name: 'History', type: 'section', has_parts: [] }
    ]
    const wrapper = mount(KnowledgePanelSectionSelector, {
      props: {
        parts
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.html()).not.empty
  })
})
