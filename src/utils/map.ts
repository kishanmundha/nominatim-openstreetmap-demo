import { SearchResultItem } from '@app/store/slices/map.slice';

export function swapCoordinates<T>(coordinates: T): T {
  if (!coordinates) {
    return coordinates;
  }

  const c = coordinates as any;

  if (!Array.isArray(c[0])) {
    return [c[1], c[0]] as T;
  }

  return c.map((x: any) => swapCoordinates(x));
}

export async function search(q: string): Promise<SearchResultItem[]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&format=json&polygon_geojson=1`
  );

  const data: any[] = await response.json();

  return data
    .filter(x => x.type === 'administrative')
    .map(x => ({
      ...x,
      boundingbox: x.boundingbox.map(Number) as [
        number,
        number,
        number,
        number
      ],
      lat: Number(x.lat),
      lon: Number(x.lon),
      geojson: !x.geojson
        ? undefined
        : {
            ...x.geojson,
            coordinates: swapCoordinates(x.geojson.coordinates),
          },
    }));
}

export function getRecents(): string[] {
  return JSON.parse(localStorage.getItem('nominatim-recent-searches') || '[]');
}

export function saveToRecent(q: string) {
  let recents = getRecents().filter(x => x !== q);
  recents.unshift(q);
  localStorage.setItem('nominatim-recent-searches', JSON.stringify(recents));
}
