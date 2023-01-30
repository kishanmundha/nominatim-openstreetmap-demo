import { Header } from '@app/components/Header';
import { useAppQuery } from '@app/hooks/useAppQuery';
import { LatLngTuple } from 'leaflet';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface PlaceAddress {
  localname: string;
  place_id: number;
  osm_id: number;
  osm_type: 'R';
  place_type: 'country';
  class: 'boundary';
  type: 'administrative';
  admin_level: number;
  rank_address: number;
  distance: 0;
  isaddress: boolean;
}

interface LinkedPlace {
  localname: string;
  place_id: number;
  osm_id: number;
  osm_type: 'N';
  place_type: null;
  class: 'place';
  type: 'country';
  admin_level: number;
  rank_address: null;
  distance: 0;
  isaddress: null;
}

interface Place {
  place_id: number;
  parent_place_id: number;
  osm_type: 'R';
  osm_id: number;
  category: 'boundary';
  type: 'administrative';
  admin_level: 2;
  localname: string;
  names: {
    [key: string]: string;
  };
  addresstags: {
    country: string;
  };
  housenumber: null;
  calculated_postcode: null;
  country_code: string;
  indexed_date: string;
  importance: number;
  calculated_importance: number;
  extratags?: {
    [key: string]: string;
  };
  calculated_wikipedia: string;
  icon: string;
  rank_address: 4;
  rank_search: 4;
  isarea: true;
  centroid: {
    type: 'Point';
    coordinates: LatLngTuple;
  };
  geometry: {
    type: 'MultiPolygon';
    coordinates: LatLngTuple[][][];
  };
  address: PlaceAddress[];
  linked_places: LinkedPlace[];
}

interface QueryParams {
  osmtype?: string | null;
  osmid?: string | null;
  class?: string | null;
}

export const DetailPage: React.FC = () => {
  const { search } = useLocation();
  const query = useMemo<QueryParams>(() => {
    const _query = new URLSearchParams(search);
    return {
      osmid: _query.get('osmid'),
      osmtype: _query.get('osmtype'),
      class: _query.get('class'),
    };
  }, [search]);

  const { data, isLoading } = useAppQuery<Place>(async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/details?osmtype=${query.osmtype}&osmid=${query.osmid}&class=${query.class}&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`
    );

    return response.json();
  });

  return (
    <div>
      <Header />
      {isLoading ? <div className="p-2">Loading...</div> : null}
      {!isLoading && (
        <>
          <h3 className="text-2xl m-1">{data?.localname}</h3>
          <div className="flex flex-row gap-x-1 p-1">
            <div className="border p-2">
              <div className="text-lg font-bold">Population</div>
              <div>{data?.extratags?.population}</div>
            </div>
            <div className="border p-2">
              <div className="text-lg font-bold">Population year</div>
              <div>{data?.extratags?.['census:population']}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
