import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import KnowledgePanelReadMore from '@/components/KnowledgePanelReadMore.vue'

describe('knowledge panel read more smoke testing', async () => {
  test('test that knowledge panel read more link can render', async () => {
    const url = 'https://en.wikipedia.org/wiki/WME'
    const text = 'click me'
    const wrapper = mount(KnowledgePanelReadMore, {
      props: {
        url,
        text
      }
    })

    expect(wrapper.text()).toContain(text)

    const html = wrapper.html()
    expect(html).toContain(url)
  })
})
