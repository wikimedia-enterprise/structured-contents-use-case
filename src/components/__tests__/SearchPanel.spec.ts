import { describe, expect, test } from 'vitest'
import { defineComponent, provide } from 'vue'
import { mount } from '@vue/test-utils'
import type { IWMF } from '@/libraries/wmf'
import SearchPanel from '@/components/SearchPanel.vue'

const wmfQuery = 'Ninja'
const wmfSuggestions = ['Ninja', []]
class WMFMock implements IWMF {
  async getSuggestions(query: string): Promise<any[]> {
    expect(query).toEqual(wmfQuery)
    return wmfSuggestions
  }
}

describe('search panel smoke testing', () => {
  const SearchPanelWrapper = defineComponent({
    setup() {
      provide('wmf', new WMFMock())
    },
    template: `<search-panel />`,
    components: {
      SearchPanel
    }
  })

  test('smoke test for search panel', async () => {
    const wrapper = mount(SearchPanelWrapper)
    const input = wrapper.find('input[type="text"]')
    await input.setValue(wmfQuery)
    expect(wrapper.html()).not.toBe('')
  })
})
