export interface Image {
  content_url: string
}

export interface InfoBox {
  name: string
  type: string
  has_parts?: Part[]
}

export interface Part {
  type: string
  name?: string
  value?: string
  has_parts?: Part[]
}

export interface StructuredContent {
  name?: string
  url?: string
  image?: Image
  infobox?: InfoBox[]
  abstract?: string
}

export interface IWME {
  setAccessToken(accessToken: string): void
  getStructuredContents(name: string): Promise<StructuredContent[]>
}

export class WME implements IWME {
  private accessToken: string = ''

  constructor(private url: string = 'https://api.enterprise.wikimedia.com/v2') {}

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
  }

  async getStructuredContents(name: string): Promise<StructuredContent[]> {
    const res = await fetch(`${this.url}/structured-contents/${name}`, {
      method: 'POST',
      body: JSON.stringify({
        limit: 1,
        fields: ['name', 'url', 'image', 'infobox', 'abstract']
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`
      }
    })

    return res.json()
  }
}
