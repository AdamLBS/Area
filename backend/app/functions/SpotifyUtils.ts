import { APIEventField } from 'types/events'

export interface Artist {
  name: string
}

export interface Track {
  artists: Artist[]
  name: string
}

export interface Item {
  artists: Artist[]
  name: string
  uri: string
  track: Track
}

export const useVariablesInFields = (
  fields: APIEventField<any>[],
  song: string,
  artists: Artist[]
) => {
  for (const field of fields) {
    if ((field.value as string).includes('$artist')) {
      let replaceValue = ''
      for (const artist of artists) {
        replaceValue += artist.name
        if (artists.length === 2 && artist === artists[0]) replaceValue += ' et '
        else if (artists.indexOf(artist) !== artists.length - 1) replaceValue += ', '
      }
      field.value = field.value.replace('$artist', replaceValue)
    }
    if ((field.value as string).includes('$song')) field.value = field.value.replace('$song', song)
  }
}
