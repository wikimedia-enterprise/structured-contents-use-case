import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { WMF } from '@/libraries/wmf'

const url = 'http://test.wikipedia.org/w/api.php'
const query = 'Ninja'
const suggestions = [
  'Ninja',
  [
    'Ninja',
    'Ninjago (TV series)',
    'Ninja Gaiden',
    'Ninja Turtles: The Next Mutation',
    'Ninja (gamer)',
    'Ninja Tune',
    'Ninja Gaiden (2004 video game)',
    'Ninjas in popular culture',
    'Ninja Sentai Kakuranger',
    'Ninja Hattori-kun'
  ]
]
const suggestionsHandler = rest.post(url, async (req, res, ctx) => {
  expect(await req.text()).contains(`search=${query}`)
  return res(ctx.status(200), ctx.json(suggestions))
})
const server = setupServer(suggestionsHandler)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

describe('wmf library smoke testing', async () => {
  const wmf = new WMF(url)

  test('test getSuggestions method', async () => {
    const res = await wmf.getSuggestions(query)
    expect(res).toEqual(suggestions)
  })
})
