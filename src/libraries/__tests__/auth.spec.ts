import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { Auth } from '@/libraries/auth'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const url = 'http://test.com/v1'
const loginRequest = {
  username: 'john.doe',
  password: '{|XcVp7z@<q|N)m'
}
const loginResponse = {
  access_token: '...access token...',
  refresh_token: '...refresh token...',
  expires_in: 3600
}
const loginHandler = rest.post(`${url}/login`, async (req, res, ctx) => {
  const body = await req.json()
  expect(body).toEqual(loginRequest)
  return res(ctx.status(200), ctx.json(loginResponse))
})
const refreshTokenRequest = {
  refresh_token: '...refresh token...',
  username: 'john.doe'
}
const refreshTokenResponse = {
  access_token: '...access token...',
  expires_in: 3600
}
const refreshTokenHandler = rest.post(`${url}/token-refresh`, async (req, res, ctx) => {
  const body = await req.json()
  expect(body).toEqual(refreshTokenRequest)
  return res(ctx.status(200), ctx.json(refreshTokenResponse))
})
const server = setupServer(loginHandler, refreshTokenHandler)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

describe('auth library smoke testing', () => {
  const auth = new Auth(url)

  test('test login method', async () => {
    const res = await auth.login(loginRequest)
    expect(res).toEqual(loginResponse)
  })

  test('test refreshToken method', async () => {
    const res = await auth.refreshToken(refreshTokenRequest)
    expect(res).toEqual(refreshTokenResponse)
  })
})
