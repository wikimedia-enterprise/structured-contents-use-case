import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { WME } from '@/libraries/wme'

const url = 'http://test.com/v1'
const accessToken = '...access token...'
const name = 'Ninja'
const structuredContents = [
  {
    name: 'Ninja',
    url: 'https://en.wikipedia.org/wiki/Ninja',
    image: {
      content_url:
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Hokusai-sketches---hokusai-manga-vol6-crop.jpg',
      width: 903,
      height: 1675
    },
    abstract: '...abstract...',
    description: '...description...'
  }
]
const structuredContentsHandler = rest.post(
  `${url}/structured-contents/${name}`,
  async (req, res, ctx) => {
    expect(await req.json()).toEqual({
      limit: 1,
      fields: ['name', 'url', 'image', 'infoboxes', 'description', 'abstract', 'sections']
    })
    return res(ctx.status(200), ctx.json(structuredContents))
  }
)
const server = setupServer(structuredContentsHandler)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

describe('wme library smoke testing', async () => {
  const wme = new WME(url)

  test('test get/set accessToken methods', async () => {
    wme.accessToken = accessToken
    expect(wme.accessToken).toEqual(accessToken)
  })

  test('test getStructuredContents method', async () => {
    // This is required in Node.
    global.URLSearchParams = require('url').URLSearchParams

    const res = await wme.getStructuredContents(name)
    expect(res).toEqual(structuredContents)
  })
})
