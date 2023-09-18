<script setup lang="ts">
import { NCard, NImage, NTag, NIcon } from 'naive-ui'
import { Link48Regular } from '@vicons/fluent'

const structuredContents = [
  {
    "url": "https://en.wikipedia.org/wiki/Squirrel",
    "abstract": " Squirrels are members of the family Sciuridae, a family that includes small or medium-size rodents. The squirrel family includes tree squirrels, ground squirrels, and flying squirrels. Squirrels are indigenous to the Americas, Eurasia, and Africa, and were introduced by humans to Australia. The earliest known fossilized squirrels date from the Eocene epoch, and among other living rodent families, the squirrels are most closely related to the mountain beaver and to the dormice.",
    "image": {
      "content_url": "https://upload.wikimedia.org/wikipedia/commons/6/68/Sciuridae.jpg",
      "width": 600,
      "height": 600
    },
    "name": "Squirrel",
    "infobox": [
      {
        "name": "Pp-semi-indef",
        "type": "infobox",
        "has_parts": [
          {
            "type": "section",
            "has_parts": [
              {
                "type": "field",
                "value": "Squirrels Temporal range: Late Eocene – Recent PreꞒ Ꞓ O S D C P T J K Pg N",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Eocene",
                    "text": "Eocene"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Precambrian",
                    "text": "PreꞒ"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Cambrian",
                    "text": "Ꞓ"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Ordovician",
                    "text": "O"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Silurian",
                    "text": "S"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Devonian",
                    "text": "D"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Carboniferous",
                    "text": "C"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Permian",
                    "text": "P"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Triassic",
                    "text": "T"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Jurassic",
                    "text": "J"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Cretaceous",
                    "text": "K"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Paleogene",
                    "text": "Pg"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Neogene",
                    "text": "N"
                  }
                ]
              },
              {
                "type": "image",
                "images": [
                  {
                    "content_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Sciuridae.jpg/250px-Sciuridae.jpg",
                    "height": 250,
                    "width": 250
                  }
                ]
              },
              {
                "type": "field",
                "value": "Various members of the family Sciuridae",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Prevost's_squirrel",
                    "text": "Callosciurus prevostii"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Siberian_chipmunk",
                    "text": "Eutamias sibiricus"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/American_red_squirrel",
                    "text": "Tamiasciurus hudsonicus"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Fox_squirrel",
                    "text": "Sciurus niger"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Urocitellus_columbianus",
                    "text": "Urocitellus columbianus"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Smith's_bush_squirrel",
                    "text": "Paraxerus cepapi"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Cape_ground_squirrel",
                    "text": "Geosciurus inauris"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Marmot",
                    "text": "Marmota"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Black-tailed_prairie_dog",
                    "text": "Cynomys ludovicianus"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Callosciurus prevostii Eutamias sibiricus Tamiasciurus hudsonicus",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Prevost's_squirrel",
                    "text": "Callosciurus prevostii"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Siberian_chipmunk",
                    "text": "Eutamias sibiricus"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/American_red_squirrel",
                    "text": "Tamiasciurus hudsonicus"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Sciurus niger Urocitellus columbianus Paraxerus cepapi",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Fox_squirrel",
                    "text": "Sciurus niger"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Urocitellus_columbianus",
                    "text": "Urocitellus columbianus"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Smith's_bush_squirrel",
                    "text": "Paraxerus cepapi"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Geosciurus inauris Marmota sp. Cynomys ludovicianus",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Cape_ground_squirrel",
                    "text": "Geosciurus inauris"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Marmot",
                    "text": "Marmota"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Black-tailed_prairie_dog",
                    "text": "Cynomys ludovicianus"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Scientific classification",
                "images": [
                  {
                    "content_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_edit-ltr.svg/15px-OOjs_UI_icon_edit-ltr.svg.png",
                    "alternative_text": "Edit this classification",
                    "height": 15,
                    "width": 15
                  }
                ],
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Taxonomy_(biology)",
                    "text": "Scientific classification"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Template:Taxonomy/Sciuridae",
                    "text": "Edit this classification",
                    "images": [
                      {
                        "content_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_edit-ltr.svg/15px-OOjs_UI_icon_edit-ltr.svg.png",
                        "alternative_text": "Edit this classification",
                        "height": 15,
                        "width": 15
                      }
                    ]
                  }
                ]
              },
              {
                "name": "Domain:",
                "type": "field",
                "value": "Eukaryota",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Eukaryote",
                    "text": "Eukaryota"
                  }
                ]
              },
              {
                "name": "Kingdom:",
                "type": "field",
                "value": "Animalia",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Animal",
                    "text": "Animalia"
                  }
                ]
              },
              {
                "name": "Phylum:",
                "type": "field",
                "value": "Chordata",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Chordate",
                    "text": "Chordata"
                  }
                ]
              },
              {
                "name": "Class:",
                "type": "field",
                "value": "Mammalia",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Mammal",
                    "text": "Mammalia"
                  }
                ]
              },
              {
                "name": "Order:",
                "type": "field",
                "value": "Rodentia",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Rodent",
                    "text": "Rodentia"
                  }
                ]
              },
              {
                "name": "Suborder:",
                "type": "field",
                "value": "Sciuromorpha",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Sciuromorpha",
                    "text": "Sciuromorpha"
                  }
                ]
              },
              {
                "name": "Family:",
                "type": "field",
                "value": "Sciuridae Fischer de Waldheim, 1817",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Squirrel",
                    "text": "Sciuridae"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Johann_Fischer_von_Waldheim",
                    "text": "Fischer de Waldheim"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Type genus",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Type_genus",
                    "text": "Type genus"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Sciurus Linnaeus, 1758",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Sciurus",
                    "text": "Sciurus"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Carl_Linnaeus",
                    "text": "Linnaeus"
                  }
                ]
              },
              {
                "type": "field",
                "value": "Subfamilies and tribes"
              },
              {
                "type": "field",
                "value": "Subfamily Ratufinae Subfamily Sciurillinae Subfamily Sciurinae Tribe Sciurini Tribe Pteromyini Subfamily Callosciurinae Tribe Callosciurini Tribe Funambulini Subfamily Xerinae Tribe Xerini Tribe Protoxerini Tribe Marmotini",
                "links": [
                  {
                    "url": "https://en.wikipedia.org/wiki/Ratufinae",
                    "text": "Ratufinae"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Sciurillinae",
                    "text": "Sciurillinae"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Sciurinae",
                    "text": "Sciurinae"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Sciurini",
                    "text": "Sciurini"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Pteromyini",
                    "text": "Pteromyini"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Callosciurinae",
                    "text": "Callosciurinae"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Callosciurini",
                    "text": "Callosciurini"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Funambulini",
                    "text": "Funambulini"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Xerinae",
                    "text": "Xerinae"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Xerini",
                    "text": "Xerini"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Protoxerini",
                    "text": "Protoxerini"
                  },
                  {
                    "url": "https://en.wikipedia.org/wiki/Marmotini",
                    "text": "Marmotini"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
const structuredContent = structuredContents[0];
const infoBox = structuredContent.infobox[0];
const sections = infoBox.has_parts[0].has_parts;
const facts = sections.filter(part => part.type == 'field' && part.name && part.value);
</script>

<template>
  <div class="wme-app-knowledge-panel">
    <n-card :title="structuredContent.name">
      <template v-if="structuredContent.image" #cover>
        <n-image :src="structuredContent.image.content_url" object-fit="cover" class="wme-app-knowledge-panel-image"/>
      </template>
      <p>{{ structuredContent.abstract }}</p>
      <p v-for="fact in facts" class="wme-app-knowledge-panel-fact">
        <i class="wme-app-knowledge-panel-fact-name">{{ fact.name }}</i>
        <b class="wme-app-knowledge-panel-fact-value">{{ fact.value }}</b>
      </p>
      <template #footer>
        <n-tag round>
          <a :href="structuredContent.url" target="_blank">Wikipedia</a>
          <template #icon>
            <n-icon :component="Link48Regular" />
          </template>
        </n-tag>
      </template>
    </n-card>
  </div>
</template>

<style>
.wme-app-knowledge-panel {
  width: 475px;
  margin-bottom: 20px;
}

.wme-app-knowledge-panel-fact-name {
  margin-right: 5px;
}

.wme-app-knowledge-panel-image {
  max-height: 250px;
}

.wme-app-knowledge-panel-image img {
  object-position: 50% 0;
}

.wme-app-knowledge-panel .n-card__footer {
  display: flex;
  justify-content: flex-end;
}

.wme-app-knowledge-panel .n-card__footer a:visited {
  color: white !important;
}
</style>
