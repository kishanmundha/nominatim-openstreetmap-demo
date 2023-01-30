import React, { useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { useAppDispatch, useAppSelector } from '@app/store';
import clsx from 'clsx';
import { mapActions } from '@app/store/slices/map.slice';
import { useNavigate } from 'react-router-dom';
import { getRecents, saveToRecent } from '@app/utils/map';

interface RecentProps {
  onSearch: (searchText: string) => void;
}

export const Recent: React.FC<RecentProps> = props => {
  const map = useAppSelector(state => state.map);
  const dispatch = useAppDispatch();
  const onSearch = props.onSearch;
  const navigate = useNavigate();

  const content = useMemo(() => {
    if (!map.recentSearches.length) {
      return (
        <div className="mt-5 p-2 text-center text-gray-400">
          No recent search
        </div>
      );
    }

    return map.recentSearches.map((item, index) => (
      <div
        key={index}
        className={clsx(
          'flex flex-col border-b-gray-300 border-b p-2 cursor-pointer hover:bg-gray-100'
        )}
        onClick={() => {
          navigate('/?q=' + item, { replace: true });
          saveToRecent(item);
          dispatch(
            mapActions.updateState({
              selectedPlaceId: null,
              recentSearches: getRecents(),
            })
          );
          onSearch(item);
        }}
      >
        <div>{item}</div>
      </div>
    ));
  }, [map.recentSearches, navigate, dispatch, onSearch]);

  return (
    <div className="flex flex-col">
      <button
        className="border border-blue-500 text-blue-500 px-2 py-1 rounded m-2"
        type="button"
        onClick={() => {
          dispatch(
            mapActions.updateState({
              showRecent: false,
            })
          );
        }}
      >
        Back to result
      </button>
      {content}
    </div>
  );
};
