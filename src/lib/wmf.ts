export interface IWMF {
  getSuggestions(query: string): Promise<any[]>
}

export class WMF implements IWMF {
  private url: string

  constructor(url: string = 'https://en.wikipedia.org/w/api.php') {
    this.url = url
  }

  async getSuggestions(query: string): Promise<any[]> {
    const body = new URLSearchParams()
    body.append('action', 'opensearch')
    body.append('search', query)
    body.append('namespace', '0')
    body.append('limit', '10')
    body.append('format', 'json')
    body.append('formatversion', '2')
    body.append('origin', '*')
    const res = await fetch(this.url, {
      method: 'POST',
      body,
      redirect: 'follow'
    })

    return res.json()
  }
}
