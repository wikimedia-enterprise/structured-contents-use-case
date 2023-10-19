export interface Image {
  content_url: string
}

export interface InfoBox {
  name: string
  type: string
  has_parts?: Part[]
}

export interface Link {
  url: string
  text: string
}

export interface Part {
  type: string
  name?: string
  value?: string
  values?: string[]
  has_parts?: Part[]
  links?: Link[]
}

export interface StructuredContent {
  name?: string
  url?: string
  image?: Image
  infobox?: InfoBox[]
  abstract?: string
  description?: string
}

export interface IWME {
  get accessToken(): string
  set accessToken(accessToken: string)
  getStructuredContents(name: string): Promise<StructuredContent[]>
}

export class WME implements IWME {
  private _accessToken: string = ''

  constructor(private _url: string = 'https://api.enterprise.wikimedia.com/v2') {}

  get accessToken(): string {
    return this._accessToken
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken
  }

  async getStructuredContents(name: string): Promise<StructuredContent[]> {
    const res = await fetch(`${this._url}/structured-contents/${name}`, {
      method: 'POST',
      body: JSON.stringify({
        limit: 1,
        fields: ['name', 'url', 'image', 'infobox', 'description', 'abstract']
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._accessToken}`
      }
    })

    return res.json()
  }
}
