<script setup lang="ts">
import { NCard, NButton, NImage, NTag, NIcon, NSpin, NGrid, NGi, NDivider, NTooltip, NModal } from 'naive-ui'
import { Link48Regular, MusicNote2Play20Filled, ChevronDown12Regular, ChevronUp12Regular, Open16Filled } from '@vicons/fluent'
import { watch, ref, inject, computed } from 'vue'
import { type StructuredContent, type IWME, type Part } from '@/libraries/wme'
import { type Thing, type ISOCK, type MusicAlbum } from '@/libraries/sock';

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const loading = ref(false)
const tracksCollapsed = ref(true)
const structuredContent = ref(null as null | StructuredContent)
const albumModalOpen = ref(false)
const modalAlbum = ref(null as null | MusicAlbum)
const thing = ref(null as null | Thing)
const wme = inject('wme') as IWME
const sock = inject('sock') as ISOCK

watch(() => props.name, async (value) => {
  loading.value = true
  tracksCollapsed.value = true
  wme.accessToken = localStorage.getItem('access_token') || ''

  try {
    const structuredContents = await wme.getStructuredContents(value)

    if (structuredContents.length > 0) {
      structuredContent.value = structuredContents[0]
    } else {
      structuredContent.value = null
    }
  } catch (err: any) {
    console.error(err)
  }

  thing.value = null

  try {
    thing.value = await sock.getThing(value)
  } catch (err: any) {
    console.error(err)
  }

  loading.value = false
})
function getFacts() {
  if (!structuredContent.value?.infobox) return []

  const infoBox = structuredContent.value.infobox[0]

  if (!infoBox.has_parts) return []

  const sections = infoBox.has_parts.map(section => section.has_parts || []).flat()

  if (!sections) return []

  return sections
}
const facts = computed(() => {
  return getFacts().
  filter(part => part.type == 'field' && part.name && part.value).
  filter(part => !part.name?.toLowerCase().includes('discography')).
  slice(0, 5)
})
const abstractSize = 395
const abstract = computed(() => {
  if (!structuredContent.value?.abstract) return ''

  return structuredContent.value?.abstract?.length > abstractSize ? 
    `${structuredContent.value?.abstract?.slice(0, abstractSize - 1)}...` : structuredContent.value?.abstract
})
const [entityTypeDefault, entityTypeSinger] = [0, 1]
const entityType = computed(() => {
  let isSinger = !!thing.value?.has_occupation?.
    find((occupation) => occupation.name.toLowerCase().includes('singer') || occupation.name.toLowerCase().includes('musician'))
  

  if (isSinger) {
    return entityTypeSinger
  }

  return entityTypeDefault
})
const singerFacts = computed(() => {
  const facts = getFacts()
  const genres: Array<Part> = []

  if (thing.value?.genres) {
    genres.push({
      name: 'Genres:',
      type: 'field',
      value: thing.value.genres.join(', ')
    })
  }

  return [
    ...facts.filter(part => part.name?.toLowerCase().includes('born')),
    ...facts.filter(part => part.name?.toLowerCase().includes('spouse')).map(part => {
      return {
        ...part,
        value: part.type == 'list' ? part?.values?.join(', ') : part.value
      }
    }),
    ...facts.filter(part => part.name?.toLowerCase().includes('partner')),
    ...genres
  ]
})
const singerAwards = computed(() => {
  const awards = getFacts().filter(part => part.name?.toLowerCase().includes('awards'))

  if (awards.length == 0) return null

  const award = awards[0]

  if (!award.links) return null

  const list = thing.value?.awards?.slice(0, 3).join(', ')

  return {
    ...award.links[0],
    list: list ? `${list}, ` : '',
  }
})
const albums = computed(() => {
  if (!thing.value?.albums) return null

  const albums = thing.value.albums.filter(album => album?.image && album?.image?.content_url)
  const names = albums.map((album) => album?.name ? album?.name.toLowerCase() : '')
  const result = albums.filter((album, index) => !names.includes(album?.name ? album?.name?.toLowerCase() : '', index + 1))
  
  result.sort((a, b) => {
    if (!a?.album_release?.date_published || !b?.album_release?.date_published) return 0
    return new Date(b.album_release.date_published).getTime() - new Date(a.album_release.date_published).getTime()
  })

  return result
})
const modalTracks = computed(() => {
  const tracks = modalAlbum.value?.tracks?.filter(track => track?.duration).
    filter(track => !track?.name.toLowerCase().includes('html element'))
  
    if (!tracks) return []
  
  const names = tracks.map((track) => track?.name ? track?.name.toLowerCase() : '')
  return tracks.
    filter((track, index) => !names.includes(track?.name ? track?.name?.toLowerCase() : '', index + 1)).
    map((track) => {
      return {
        ...track,
        name: track?.name ? track?.name.replace(/_/g, ' ') : ''
      }
    })
})
const tracks = computed(() => {
  if (!thing.value?.albums) return null

  const tracks = thing.value.albums.
    map(album => album.tracks?.map((track) => {
      return {...track, in_album: album}
    })).
    flat().
    filter(track => track?.duration).
    filter(track => !track?.name.toLowerCase().includes('html element'))
  const names = tracks.map((track) => track?.name ? track?.name.toLowerCase() : '')
  return tracks.
    filter((track, index) => !names.includes(track?.name ? track?.name?.toLowerCase() : '', index + 1)).
    map((track) => {
      return {
        ...track,
        name: track?.name ? track?.name.replace(/_/g, ' ') : '',
        date_published: track?.in_album?.album_release?.date_published?.match(/\d{4}/)?.[0] || '',
      }
    })
})
const tracksRowHeight = 96
const tracksHeigh = computed(() => {
  if (!tracks.value) return 0

  if (tracksCollapsed.value) {
    return tracks.value.length > 1 ? tracksRowHeight * 2 : tracksRowHeight
  }

  return Math.ceil(tracks.value.length / 2) * tracksRowHeight
})
</script>

<template>
  <div class="wme-app-knowledge-panel">
    <div v-if="loading" class="wme-app-knowledge-panel-spinner">
      <n-spin size="large"/>
    </div>
    <n-card :title="structuredContent.name" v-if="structuredContent && !loading">
      <template v-if="structuredContent.image" #cover>
        <n-image :src="structuredContent.image.content_url" object-fit="cover" class="wme-app-knowledge-panel-image"/>
      </template>
      <b><i>{{ structuredContent.description }}</i></b>
      <p class="wme-app-knowledge-panel-abstract" >{{ abstract }}</p>
      <div class="wme-app-knowledge-panel-facts-default" v-if="entityType == entityTypeDefault">
        <p v-for="fact in facts" class="wme-app-knowledge-panel-fact" v-bind:key="fact.name">
          <i class="wme-app-knowledge-panel-fact-name">{{ fact.name?.endsWith(':') ? fact.name : `${fact.name}:` }}</i>
          <b class="wme-app-knowledge-panel-fact-value">{{ fact.value }}</b>
        </p>
      </div>
      <div class="wme-app-knowledge-panel-facts-default" v-if="entityType == entityTypeSinger">
        <p v-for="fact in singerFacts" class="wme-app-knowledge-panel-fact" v-bind:key="fact.name">
          <i class="wme-app-knowledge-panel-fact-name">{{ fact.name?.endsWith(':') ? fact.name : `${fact.name}:` }}</i>
          <b class="wme-app-knowledge-panel-fact-value">{{ fact.value }}</b>
        </p>
        <p v-if="singerAwards">
          <i class="wme-app-knowledge-panel-fact-name">Awards:</i>
          <b class="wme-app-knowledge-panel-fact-value">{{ singerAwards.list }}<a :href="singerAwards.url" target="_blank">{{ singerAwards.text }}</a></b>
        </p>
      </div>
      <div v-if="tracks" class="wme-app-knowledge-panel-track-wrapper">
        <h4><b><i>Songs</i></b></h4>
        <div class="wme-app-knowledge-panel-track-slider" :style="{overflow: 'hidden', height: `${tracksHeigh}px`}">
          <n-grid :cols="2" :x-gap="10">
            <n-gi v-for="track in tracks" :key="track?.name">
              <div class="wme-app-knowledge-panel-track">
                <div class="wme-app-knowledge-panel-track-content">
                  <n-image v-if="track?.image && track?.image?.content_url" class="wme-app-knowledge-panel-track-image" :width="80" :height="80" :preview-disabled="true" :src="track?.image?.content_url" object-fit="cover" />
                  <div v-if="!track?.image || !track?.image?.content_url" class="wme-app-knowledge-panel-track-song-image-placeholder" >
                    <n-icon class="wme-app-knowledge-panel-track-song-icon" :component="MusicNote2Play20Filled" size="40" />
                  </div>
                  <div class="wme-app-knowledge-panel-track-description">
                    <p>
                      <n-tooltip>
                        <template #trigger>
                          {{ track?.name }}
                        </template>
                        {{ track?.name }}
                      </n-tooltip>
                    </p>
                    <p>{{ track?.duration }}</p>
                    <p>
                      <n-tooltip>
                        <template #trigger>
                          {{ track?.date_published }} · {{ track?.in_album?.name }}
                        </template>
                        {{ track?.date_published }} · {{ track?.in_album?.name }}
                      </n-tooltip>
                    </p>
                  </div>
                </div>
                <n-divider class="wme-app-knowledge-panel-track-divider"/>
              </div>
            </n-gi>
          </n-grid>
        </div>
        <n-button v-if="tracks.length > 6" circle class="wpe-app-knowledge-panel-track-show-button" :on-click="() => tracksCollapsed = !tracksCollapsed">
          <n-icon size="small" :component="tracksCollapsed ? ChevronDown12Regular : ChevronUp12Regular" />
        </n-button>
      </div>
      <h4 v-if="albums"><b><i>Albums</i></b></h4>
      <n-grid :cols="3" v-if="albums" :x-gap="10" :y-gap="10">
        <n-gi v-for="album in albums" :key="album.name">
          <n-card :bordered="false" class="wpe-app-knowledge-panel-album-card">
            <template #header>
              <div class="wpe-app-knowledge-panel-album-title" @click="() => {if (album.tracks) {modalAlbum = album; albumModalOpen = true}}">
                <n-tooltip>
                  <template #trigger>
                    {{ album.name }}
                  </template>
                  {{ album.name }}
                </n-tooltip>
              </div>
            </template>
            <template v-if="album.image" #cover>
              <n-image :preview-disabled="true" :src="album.image?.content_url" object-fit="cover" />
            </template>
            {{ album?.album_release?.date_published ? album?.album_release?.date_published : 'n/a' }}
            <a target="_blank" :href="album.url" class="wpe-app-knowledge-panel-album-card-link">
              <n-icon class="wpe-app-knowledge-panel-album-card-link-icon" :component="Open16Filled" :size="15"/>
            </a>
          </n-card>
        </n-gi>
      </n-grid>
      <template #footer>
        <n-tag round>
          <a :href="structuredContent.url" target="_blank">Wikipedia</a>
          <template #icon>
            <n-icon :component="Link48Regular" />
          </template>
        </n-tag>
      </template>
    </n-card>
    <n-modal v-model:show="albumModalOpen" :mask-closable="true" :close-on-esc="true" >
      <n-card :title="modalAlbum?.name" class="wme-app-knowledge-panel-album-modal">
        <p>{{ modalAlbum?.album_release?.date_published }}</p>
        <n-grid :cols="2" :x-gap="10">
            <n-gi v-for="track in modalTracks" :key="track?.name">
              <div class="wme-app-knowledge-panel-track">
                <div class="wme-app-knowledge-panel-track-content">
                  <n-image v-if="track?.image && track?.image?.content_url" class="wme-app-knowledge-panel-track-image" :width="80" :height="80" :preview-disabled="true" :src="track?.image?.content_url" object-fit="cover" />
                  <div v-if="!track?.image || !track?.image?.content_url" class="wme-app-knowledge-panel-track-song-image-placeholder" >
                    <n-icon class="wme-app-knowledge-panel-track-song-icon" :component="MusicNote2Play20Filled" size="40" />
                  </div>
                  <div class="wme-app-knowledge-panel-track-description">
                    <p>
                      <n-tooltip>
                        <template #trigger>
                          {{ track?.name }}
                        </template>
                        {{ track?.name }}
                      </n-tooltip>
                    </p>
                    <p>{{ track?.duration }}</p>
                  </div>
                </div>
              </div>
            </n-gi>
          </n-grid>
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.wme-app-knowledge-panel {
  width: 475px;
  margin-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .wme-app-knowledge-panel {
    width: 340px;
  }
}

.wme-app-knowledge-panel-fact-name {
  margin-right: 5px;
}

.wme-app-knowledge-panel-image {
  width: 100%;
  min-height: 250px;
  max-height: 350px;
}

.wme-app-knowledge-panel-image img {
  object-position: 50% 0;
}

.wme-app-knowledge-panel .n-card__footer {
  display: flex;
  justify-content: flex-end;
}

.wme-app-knowledge-panel .n-card__footer a:visited, .wme-app-knowledge-panel .n-card__footer a {
  color: white !important;
  text-decoration: none;
}

.wme-app-knowledge-panel-spinner {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wpe-app-knowledge-panel-album-card .n-card-header {
  padding: 5px 0 5px 0;
}

.wpe-app-knowledge-panel-album-card .n-card__content {
  padding: 0 0 0 0;
}

.wpe-app-knowledge-panel-album-card .n-image {
  border-radius: 10px;
  overflow: hidden;
}

.wme-app-knowledge-panel a:visited, .wme-app-knowledge-panel a {
  color: white !important;
}

.wme-app-knowledge-panel-track-slider {
  transition: height 0.5s ease;
}

.wme-app-knowledge-panel-track-wrapper {
  position: relative;
}

.wpe-app-knowledge-panel-track-show-button {
  background-color: rgb(24, 24, 28) !important;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.wme-app-knowledge-panel-track-divider.n-divider {
  margin: 0;
}

.wme-app-knowledge-panel-awards-list {
  margin-top: 0;
}

.wme-app-knowledge-panel-track-content {
  display: flex;
  padding-bottom: 5px;
}

.wme-app-knowledge-panel-track-image, .wme-app-knowledge-panel-track-song-image-placeholder {
  margin-right: 10px;
}

.wme-app-knowledge-panel-track-description {
  flex: 1 auto;
}

.wme-app-knowledge-panel-track p {
  margin: 0 0 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.wpe-app-knowledge-panel-album-card .n-card-header__main, .wpe-app-knowledge-panel-album-card .n-card__content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 135px;
  display: block;
}

.wme-app-knowledge-panel-track {
  height: 96px;
}

.wme-app-knowledge-panel-track-song-image-placeholder {
  height: 80px;
  width: 80px;
  min-width: 80px;
  position: relative;
  background-color: rgb(36 36 41);
}

.wme-app-knowledge-panel-track-song-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wpe-app-knowledge-panel-album-card img {
  object-position: 50% 0;
  min-width: 135px; /* need a media query for smaller screens */
  max-height: 135px;
  min-height: 135px;
}

.wpe-app-knowledge-panel-album-card {
  position: relative;
}

.wpe-app-knowledge-panel-album-card .wpe-app-knowledge-panel-album-card-link {
  position: absolute;
  top: -2px;
  right: -2px;
}

.wpe-app-knowledge-panel-album-card-link-icon {
  background-color: rgb(16, 16, 20);
  border-radius: 4px;
}

.wpe-app-knowledge-panel-album-title {
  cursor: pointer;
}

.wme-app-knowledge-panel-album-modal {
  max-width: 500px;
}

.wme-app-knowledge-panel-album-modal .n-card-header {
  padding-bottom: 0;
}
</style>
