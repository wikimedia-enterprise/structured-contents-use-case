import { describe, expect, test } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, provide } from 'vue'
import KnowledgePanel from '@/components/KnowledgePanel.vue'
import type { IWME, StructuredContent } from '@/libraries/wme'

const structuredContentName = 'Ninja'
const structuredContentAccessToken = '...access token...'
const structuredContent = {
  name: structuredContentName,
  url: 'https://en.wikipedia.org/wiki/Ninja',
  image: {
    content_url:
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Hokusai-sketches---hokusai-manga-vol6-crop.jpg'
  },
  abstract: '...abstract...',
  description: '...description...'
}
class WMEMock implements IWME {
  private _accessToken: string = ''

  get accessToken(): string {
    return this._accessToken
  }

  set accessToken(accessToken: string) {
    expect(accessToken).toEqual(structuredContentAccessToken)
    this._accessToken = accessToken
  }

  async getStructuredContents(name: string): Promise<StructuredContent[]> {
    expect(this.accessToken).toEqual(structuredContentAccessToken)
    expect(name).toEqual(structuredContentName)
    return [structuredContent]
  }
}

describe('knowledge panel smoke testing', async () => {
  const KnowledgePanelWrapper = defineComponent({
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    setup() {
      provide('wme', new WMEMock())
    },
    template: `<knowledge-panel :name="name" />`,
    components: {
      KnowledgePanel
    }
  })
  localStorage.setItem('access_token', structuredContentAccessToken)

  test('smoke test for auth modal', async () => {
    const wrapper = mount(KnowledgePanelWrapper)
    await wrapper.setProps({ name: structuredContentName })
    await flushPromises()
    const html = wrapper.html()
    expect(html).toContain(structuredContent.name)
    expect(html).toContain(structuredContent.url)
    expect(html).toContain(structuredContent.image.content_url)
    expect(html).toContain(structuredContent.abstract)
    expect(html).toContain(structuredContent.description)
  })
})
