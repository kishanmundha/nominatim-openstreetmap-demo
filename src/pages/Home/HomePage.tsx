import React, { useCallback, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

import { SearchForm } from './SearchForm';
import { SearchResult } from './SearchResult';
import { MapContainer } from './MapContainer';
import { SelectedPlacePolygone } from './SelectedPlacePolygone';
import { Header } from '@app/components/Header';
import { store, useAppSelector } from '@app/store';
import { mapActions } from '@app/store/slices/map.slice';
import { Recent } from './Recent';
import { useDispatch } from 'react-redux';
import { getRecents, search } from '@app/utils/map';

export const HomePage: React.FC = () => {
  const { showRecent } = useAppSelector(state => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(mapActions.updateState({ recentSearches: getRecents() }));
  }, []);

  const handleSearch = useCallback(
    async (searchText: string) => {
      try {
        dispatch(
          mapActions.updateState({
            searchText: searchText,
            error: false,
            searching: true,
            showRecent: false,
          })
        );

        const data = await search(searchText);
        dispatch(
          mapActions.updateState({
            searching: false,
            searchResult: data,
          })
        );
      } catch (error) {
        dispatch(
          mapActions.updateState({
            error: 'Something went wrong',
            searching: false,
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="">
        <Header />
        <div>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden border-t-gray-300 border-t">
        <div className="flex-1 md:max-w-md overflow-y-scroll">
          {!showRecent ? <SearchResult /> : <Recent onSearch={handleSearch} />}
        </div>
        <div className="flex-1 flex border border-black">
          <MapContainer>
            <SelectedPlacePolygone />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
