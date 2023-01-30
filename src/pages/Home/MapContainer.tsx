import { PropsWithChildren } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';

export const DEFAULT_LATITUDE = 42.3601;
export const DEFAULT_LANGITUDE = -71.0589;
export const DEFAULT_ZOOM = 10;

export const MapContainer: React.FC<PropsWithChildren<{}>> = props => {
  return (
    <LeafletMapContainer
      center={[DEFAULT_LATITUDE, DEFAULT_LANGITUDE]}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      className="flex-1"
    >
      {props.children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </LeafletMapContainer>
  );
};
