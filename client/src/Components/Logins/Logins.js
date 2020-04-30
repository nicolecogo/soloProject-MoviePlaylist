import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSpotifyToken,
  setSpotifyId,
} from '../../Actions/authenticationActions';
import './logins.css';
import Button from 'react-bootstrap/Button';

function Logins() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);
  const loginURL = 'http://localhost:3001/login';

  const loginAgain = () => dispatch(setSpotifyToken(''));
  useEffect(() => {
    const queryStr = window.location.search;
    const token = new URLSearchParams(queryStr).get('token');
    const user = new URLSearchParams(queryStr).get('user');
    console.log(token);
    if (token && user) {
      dispatch(setSpotifyToken(token));
      dispatch(setSpotifyId(user));
    }
  }, []);

  return (
    <div className="Logins">
      {!auth.spotifyToken && (
        <Button variant="success" href={loginURL}>
          Spotify Log In
        </Button>
      )}
      {auth.spotifyToken && (
        <Button variant="success" onClick={loginAgain}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default Logins;
