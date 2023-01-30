import { useAppSelector } from '@app/store';
import { useEffect, useMemo } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

const limeOptions = { color: 'lime' };

export const SelectedPlacePolygone: React.FC = () => {
  const map = useMap();
  const { searchResult, selectedPlaceId } = useAppSelector(state => state.map);
  const selectedResult = useMemo(() => {
    return searchResult.find(x => x.place_id === selectedPlaceId);
  }, [searchResult, selectedPlaceId]);

  useEffect(() => {
    if (selectedResult) {
      map.panTo([selectedResult.lat, selectedResult.lon]);
      console.log(selectedResult);
      const bounds = new LatLngBounds(
        [selectedResult.boundingbox[0], selectedResult.boundingbox[2]],
        [selectedResult.boundingbox[1], selectedResult.boundingbox[3]]
      );
      map.fitBounds(bounds);
    }
  }, [selectedResult, map]);

  if (!selectedResult) {
    return null;
  }

  if (!selectedResult.geojson?.coordinates) {
    return null;
  }

  return (
    <>
      {selectedResult.geojson.coordinates.map((item, index) => {
        return (
          <Polyline key={index} pathOptions={limeOptions} positions={item} />
        );
      })}
    </>
  );
};
