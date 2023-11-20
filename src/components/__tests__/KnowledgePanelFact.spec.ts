import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import KnowledgePanelFact from '../KnowledgePanelFact.vue'

describe('knowledge panel fact smoke testing', async () => {
  test('smoke test for knowledge panel fact', async () => {
    const name = 'Born'
    const value = 'June 1, 1996'
    const wrapper = mount(KnowledgePanelFact, {
      props: {
        name,
        value
      }
    })

    const text = wrapper.text()
    expect(text).toContain(`${name}:`)
    expect(text).toContain(value)
  })
})
