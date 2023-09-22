export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface RefreshTokenRequest {
  username: string
  refresh_token: string
}

export interface RefreshTokenResponse {
  access_token: string
  expires_in: number
}

export interface IAuth {
  login(req: LoginRequest): Promise<LoginResponse>
  refreshToken(req: RefreshTokenRequest): Promise<RefreshTokenResponse>
}

export class Auth implements IAuth {
  constructor(private _url: string = 'https://auth.enterprise.wikimedia.com/v1') {}

  async login(req: LoginRequest): Promise<LoginResponse> {
    const res = await fetch(`${this._url}/login`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body: any = await res.json()

    if (res.status !== 200) {
      throw new Error(body.message)
    }

    return body as LoginResponse
  }

  async refreshToken(req: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const res = await fetch(`${this._url}/token-refresh`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body: any = await res.json()

    if (res.status !== 200) {
      throw new Error(body.message)
    }

    return body as RefreshTokenResponse
  }
}
