interface Image {
  content_url: string
}

interface InfoBox {
  name: string
  type: string
}

interface Part {
  type: string
  name?: string
  value?: string
  has_parts?: Part[]
}

interface StructuredContent {
  name: string
  url: string
  image?: Image
  infobox?: InfoBox
}

interface IWME {
  getStructuredContents(name: string): Promise<StructuredContent[]>
}

class WME implements IWME {
  async getStructuredContents(name: string): Promise<StructuredContent[]> {
    return []
  }
}
