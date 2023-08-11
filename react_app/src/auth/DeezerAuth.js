const DEEZER_APPLICATION_ID = "625604"; //process.env.REACT_APP_CLIENT_ID;
const DEEZER_CLIENT_SECRET = "1864b188dcd7e63cf386d506753e00ac"; //process.env.REACT_APP_CLIENT_SECRET;
const DEEZER_AUTHORIZE_ENDPOINT = "https://connect.deezer.com/oauth/auth.php"; // obtained from Deezer API docs
const DEEZER_REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/DeezerSuccess/"; //process.env.REACT_APP_REDIRECT_URL; // once logged in -> redirect to home
const DEEZER_SPACE_DELIMITER = ",";
const SCOPES = [
    "basic_access",
    "email",
    // "offline_access",
    "manage_library",
    "manage_community",
    "delete_library",
    "listening_history",
];
const DEEZER_SCOPES_URL_PARAM = SCOPES.join(DEEZER_SPACE_DELIMITER);

module.exports = {
    DEEZER_APPLICATION_ID,
    DEEZER_CLIENT_SECRET,
    DEEZER_AUTHORIZE_ENDPOINT,
    DEEZER_REDIRECT_URL_AFTER_LOGIN,
    DEEZER_SCOPES_URL_PARAM,
};
