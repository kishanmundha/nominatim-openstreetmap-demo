import React, { useCallback, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { useAppDispatch, useAppSelector } from '@app/store';
import { mapActions } from '@app/store/slices/map.slice';
import { getRecents, saveToRecent } from '@app/utils/map';
import { useNavigate } from 'react-router-dom';

interface SearchFormProps {
  onSearch: (searchText: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = props => {
  const [searchText, setSearchText] = React.useState('');
  const dispatch = useAppDispatch();
  const { searching, searchText: previousSearchText } = useAppSelector(
    state => state.map
  );
  const onSearch = props.onSearch;
  const navigate = useNavigate();
  const searchTextRef = React.useRef(searchText);
  searchTextRef.current = searchText;

  useEffect(() => {
    if (previousSearchText !== searchTextRef.current) {
      setSearchText(previousSearchText);
    }
  }, [previousSearchText]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate('/?q=' + searchText, { replace: true });
      saveToRecent(searchText);
      dispatch(
        mapActions.updateState({
          recentSearches: getRecents(),
        })
      );
      onSearch(searchText);
    },
    [navigate, searchText, onSearch, dispatch]
  );

  useEffect(() => {
    const _query = new URLSearchParams(window.location.search);
    const q = _query.get('q');
    const selected = _query.get('selected');

    if (q) {
      setSearchText(q);
      onSearch(q);
    }

    if (selected) {
      dispatch(
        mapActions.updateState({
          selectedPlaceId: Number(selected),
        })
      );
    }
  }, [onSearch, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="p-2 space-x-2">
      <input
        className="border-gray-300 border px-2 py-1 rounded"
        placeholder="Search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded disabled:bg-gray-500"
        type="submit"
        disabled={searching}
      >
        {searching ? 'Searching...' : 'Search'}
      </button>
      <button
        className="border border-blue-500 text-blue-500 px-2 py-1 rounded"
        type="button"
        onClick={() => {
          dispatch(
            mapActions.updateState({
              showRecent: true,
            })
          );
        }}
      >
        View recent searches
      </button>
    </form>
  );
};
