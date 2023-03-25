export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Storm = 'storm'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor'
}

export interface Entry {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
}

export interface EntriesProp {
  entries: Entry[],
}