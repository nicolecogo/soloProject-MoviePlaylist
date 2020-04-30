import React from 'react';
import { useSelector } from 'react-redux';
import SpotifyApi from '../../Services/SpotifyApi';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
import './SpotifyButton.css';

function SpotifyButton({ title, songs }) {
  const auth = useSelector((state) => state.authentication);

  const notify = () => toast(title + ' Playlist Imported Successfully');
  toast.configure();

  const magicHappening = async () => {
    const playlist = await SpotifyApi.createPlaylist(
      auth.spotifyId,
      title,
      auth.spotifyToken
    );
    const songIds = await SpotifyApi.searchSongs(songs, auth.spotifyToken);
    await SpotifyApi.addSongs(songIds, playlist.id, auth.spotifyToken);
    console.log('playlist imported successfully');
    await notify();
  };

  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
      </Tooltip>
    );
  }

  return (
    auth.spotifyToken
    ? 
      <Button className="spotifyButton"
      onClick={magicHappening}
      variant="outline-primary"
      >
        {' '}
        Import playlist on Spotify
      </Button>
    : <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button className="spotifyButton"
          onClick={magicHappening}
          variant="outline-primary"
          disabled
          >
          {' '}
          Login to import playlist on Spotify
        </Button>
      </OverlayTrigger>
  );
}

export default SpotifyButton;
