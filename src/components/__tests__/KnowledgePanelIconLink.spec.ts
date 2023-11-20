import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import KnowledgePanelIconLink from '../KnowledgePanelIconLink.vue'

describe('knowledge panel icon link smoke testing', async () => {
  test('smoke test for knowledge panel icon link', async () => {
    const url = 'https://en.wikipedia.org/'
    const text = 'Wikipedia'
    const target = '_self'
    const wrapper = mount(KnowledgePanelIconLink, {
      props: {
        url,
        text,
        target
      }
    })

    const a = wrapper.find('a')
    expect(a.attributes('href')).toBe(url)
    expect(a.attributes('target')).toBe(target)
    expect(a.text()).toBe(text)
  })
})
