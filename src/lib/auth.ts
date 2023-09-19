export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface IAuth {
  login(req: LoginRequest): Promise<LoginResponse>
}

export class Auth implements IAuth {
  constructor(private url: string = 'https://auth.enterprise.wikimedia.com/v1') {}

  async login(req: LoginRequest): Promise<LoginResponse> {
    const res = await fetch(`${this.url}/login`, {
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
}
