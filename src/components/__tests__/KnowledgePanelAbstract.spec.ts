import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import KnowledgePanelAbstract from '@/components/KnowledgePanelAbstract.vue'

describe('knowledge panel abstract smoke testing', async () => {
  test('test that knowledge panel abstract can render', async () => {
    const abstract =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nisl nisl lacinia nisl, nec ultricies nisl nisl nec nisl. Donec auctor, nisl eget ultricies ultricies, nisl nisl lacinia nisl, nec ultricies nisl nisl nec nisl.'
    const url = 'https://en.wikipedia.org/wiki/WME'
    const abstractTextSize = 10
    const wrapper = mount(KnowledgePanelAbstract, {
      props: {
        abstract,
        url,
        abstractTextSize
      }
    })

    const text = wrapper.text()
    expect(text).toContain(abstract.slice(0, abstractTextSize - 1) + '...')

    const html = wrapper.html()
    expect(html).toContain(url)
  })
})
