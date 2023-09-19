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
  getStructuredContents(name: string): Promise<StructuredContent[]>
}

export class WME implements IWME {
  constructor(private url: string = 'https://api.enterprise.wikimedia.com/v2') {}

  async getStructuredContents(name: string): Promise<StructuredContent[]> {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch(`${this.url}/structured-contents/${name}`, {
      method: 'POST',
      body: JSON.stringify({
        limit: 1,
        fields: [
          'name',
          'url',
          'image',
          'infobox',
          'abstract'
        ]
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return res.json()
  }
}
