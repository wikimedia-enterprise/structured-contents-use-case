import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import KnowledgePanelSectionText from '@/components/KnowledgePanelSectionText.vue'

describe('knowledge panel section text smoke testing', async () => {
  test('test that knowledge panel section text can render', async () => {
    const url = 'https://en.wikipedia.org/wiki/WME'
    const textSize = 100
    const section = {
      name: 'Marriages, law school, and early career (1966–1973)',
      type: 'section',
      has_parts: [
        {
          type: 'paragraph',
          value:
            'Biden ran for the 4th district seat on the New Castle County Council in 1970 on a liberal platform that included support for public housing in the suburbs. The seat had been held by Republican Henry R. Folsom, who was running in the 5th District following a reapportionment of council districts. Biden won the general election, defeating Republican Lawrence T. Messick, and took office on January 5, 1971. He served until January 1, 1973, and was succeeded by Democrat Francis R. Swift. During his time on the county council, Biden opposed large highway projects, which he argued might disrupt Wilmington neighborhoods.'
        },
        {
          type: 'paragraph',
          value:
            'Biden had not openly supported or opposed the Vietnam War until he ran for Senate and opposed Richard Nixon\'s conduct of the war. While studying at the University of Delaware and Syracuse University, Biden obtained five student draft deferments from conscription at a time when most draftees were sent to the war. Based on a physical examination, he was given a conditional medical deferment in 1968; in 2008, a spokesperson for Biden said his having had "asthma as a teenager" was the reason for the deferment.'
        },
        {
          name: 'Death of wife and daughter',
          type: 'section',
          has_parts: [
            {
              type: 'paragraph',
              value:
                'A few weeks after Biden was elected senator, his wife Neilia and one-year-old daughter Naomi were killed in an automobile accident while Christmas shopping in Hockessin, Delaware on December 18, 1972. Neilia\'s station wagon was hit by a semi-trailer truck as she pulled out from an intersection. Their sons Beau (aged 3) and Hunter (aged 2) had been in the car, and were taken to hospital with non-life-threatening injuries, Beau with a broken leg and other wounds and Hunter with a minor skull fracture and other head injuries. Biden considered resigning to care for them, but Senate Majority Leader Mike Mansfield persuaded him not to. The accident filled Biden with anger and religious doubt. He wrote that he "felt God had played a horrible trick" on him, and he had trouble focusing on work.'
            }
          ]
        }
      ]
    }
    const wrapper = mount(KnowledgePanelSectionText, {
      props: {
        url,
        section,
        textSize
      }
    })

    const text = wrapper.text()
    expect(text).toContain(section.has_parts[0].value?.slice(0, textSize - 1))
  })
})
