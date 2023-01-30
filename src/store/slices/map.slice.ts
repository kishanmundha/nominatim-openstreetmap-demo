import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLngTuple } from 'leaflet';

export interface SearchResultResponseItem {
  place_id: number;
  licence: string;
  osm_type: 'node' | 'way';
  osm_id: number;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: 'place' | 'highway' | 'amenity';
  type:
    | 'city'
    | 'suburb'
    | 'village'
    | 'locality'
    | 'hamlet'
    | 'unclassified'
    | 'hospital'
    | 'administrative';
  importance: number;
  icon?: string;
  geojson?: {
    type: 'MultiPolygon';
    coordinates: LatLngTuple[][][];
  };
}

const mockData: SearchResultResponseItem[] = [];

export interface SearchResultItem {
  place_id: number;
  licence: string;
  osm_type: 'node' | 'way';
  osm_id: number;
  boundingbox: [number, number, number, number];
  lat: number;
  lon: number;
  display_name: string;
  class: 'place' | 'highway' | 'amenity';
  type:
    | 'city'
    | 'suburb'
    | 'village'
    | 'locality'
    | 'hamlet'
    | 'unclassified'
    | 'hospital'
    | 'administrative';
  importance: number;
  icon?: string;
  geojson?: {
    type: 'MultiPolygon';
    coordinates: LatLngTuple[][][];
  };
}

interface MapState {
  initialized: boolean;
  searchText: string;
  searching: boolean;
  error: false | string;
  searchResult: SearchResultItem[];
  selectedPlaceId: number | null;
  showRecent: boolean;
  recentSearches: string[];
}

const initialState: MapState = {
  initialized: false,
  searchText: '',
  searching: false,
  error: false,
  searchResult: mockData.map(x => ({
    ...x,
    boundingbox: x.boundingbox.map(Number) as [number, number, number, number],
    lat: Number(x.lat),
    lon: Number(x.lon),
  })),
  selectedPlaceId: null,
  showRecent: false,
  recentSearches: [],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<MapState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const mapActions = mapSlice.actions;
