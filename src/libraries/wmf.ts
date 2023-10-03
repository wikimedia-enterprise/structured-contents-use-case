export interface IWMF {
  getSuggestions(query: string): Promise<any[]>
}

export class WMF implements IWMF {
  constructor(private _url: string = 'https://en.wikipedia.org/w/api.php') {}

  async getSuggestions(query: string): Promise<any[]> {
    const body = new URLSearchParams()
    body.append('action', 'opensearch')
    body.append('search', query)
    body.append('namespace', '0')
    body.append('limit', '10')
    body.append('format', 'json')
    body.append('formatversion', '2')
    body.append('origin', '*')
    const res = await fetch(this._url, {
      method: 'POST',
      body,
      redirect: 'follow'
    })

    return res.json()
  }
}
