import { copyTextToClipboard } from '@app/utils/common';

export const Header: React.FC = () => {
  return (
    <div className="flex flex-row items-center bg-blue-100">
      <div className="p-2 flex-1">Nominatim OpenStreetMap Demo</div>
      <button
        className="mr-2 border border-blue-500 px-2 rounded text-blue-500"
        onClick={() => {
          copyTextToClipboard(window.location.href);
          setTimeout(() => {
            alert('Copied to clipboard');
          });
        }}
      >
        Share
      </button>
    </div>
  );
};
