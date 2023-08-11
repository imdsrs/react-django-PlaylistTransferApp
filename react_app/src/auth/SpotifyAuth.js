const SPOTIFY_CLIENT_ID = "8796a12d8a1f448bb5a8da54e9e207aa"; //process.env.REACT_SPOTIFY_APP_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = "68ade19fb63d4dac82756818ee73b234"; //process.env.REACT_SPOTIFY_APP_CLIENT_SECRET;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"; // obtained from Spotify API docs
const SPOTIFY_REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/SpotifySuccess";
//process.env.REACT_SPOTIFY_APP_REDIRECT_URL; // once logged in -> redirect to home
const SPOTIFY_SPACE_DELIMITER = "%20";
const SPOTIFY_SCOPES = [
    "user-top-read", // for getting the user's top tracks and artists
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
];
const SPOTIFY_SCOPES_URL_PARAM = SPOTIFY_SCOPES.join(SPOTIFY_SPACE_DELIMITER);

module.exports = {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_AUTHORIZE_ENDPOINT,
    SPOTIFY_REDIRECT_URL_AFTER_LOGIN,
    SPOTIFY_SCOPES_URL_PARAM,
};
