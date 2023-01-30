import React, { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { useAppDispatch, useAppSelector } from '@app/store';
import { mapActions } from '../../store/slices/map.slice';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export const SearchResult: React.FC = () => {
  const map = useAppSelector(state => state.map);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { searchResult, selectedPlaceId } = map;

  const content = useMemo(() => {
    if (!map.searchText) {
      return (
        <div className="mt-5 p-2 text-center text-gray-400">
          Search something
        </div>
      );
    }

    if (map.searching) {
      return (
        <div className="mt-5 p-2 text-center text-gray-400">Searching...</div>
      );
    }

    if (map.error) {
      return <div className="p-2">{map.error}</div>;
    }

    if (searchResult.length === 0) {
      return (
        <div className="mt-5 p-2 text-center text-gray-400">No result</div>
      );
    }

    return searchResult.map((item, index) => (
      <div
        key={index}
        className={clsx(
          'flex flex-col border-b-gray-300 border-b p-2 cursor-pointer',
          selectedPlaceId === item.place_id && 'bg-gray-100'
        )}
        onClick={() => {
          navigate('/?q=' + map.searchText + '&selected=' + item.place_id, {
            replace: true,
          });
          dispatch(
            mapActions.updateState({
              selectedPlaceId: item.place_id,
            })
          );
        }}
      >
        <div>{item.display_name}</div>
        <div className="text-gray-500">{item.type}</div>
        <button
          className="border border-blue-500 px-1 flex-1 mt-1 hover:bg-blue-100 cursor-pointer rounded"
          onClick={e => {
            e.stopPropagation();
            navigate(
              `/detail?osmtype=${item.osm_type.toUpperCase()[0]}&osmid=${
                item.osm_id
              }&class=${item.class}`
            );
          }}
        >
          Detail
        </button>
      </div>
    ));
  }, [
    map.searchText,
    map.searching,
    map.error,
    searchResult,
    dispatch,
    selectedPlaceId,
    navigate,
  ]);

  return <div>{content}</div>;
};
