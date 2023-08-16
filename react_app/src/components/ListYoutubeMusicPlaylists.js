import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListYoutubeMusicPlaylists = () => {
    const { destinationValue } = useParams();
    const [profile, setProfile] = useState({});
    const [playlists, setPlaylists] = useState({});

    const API_KEY =
        "515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com";

    const getData = async (endpoint, setFunction) => {
        await axios
            .get(endpoint, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "YoutubeMusicAccessToken"
                    )}`, // pass Youtube Music token to header
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setFunction(response.data);
                // console.log("response::", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PROFILE_ENDPOINT =
        "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=" +
        API_KEY;
    const PLAYLISTS_ENDPOINT =
        "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=" +
        API_KEY;

    useEffect(() => {
        getData(PROFILE_ENDPOINT, setProfile);
        getData(PLAYLISTS_ENDPOINT, setPlaylists);
    }, []);

    return (
        <div class="text-gray-400 bg-gray-900 body-font">
            {/* <h1>{destinationValue}</h1> */}
            {console.log("profile::", profile)}
            {profile.items &&
                profile.items[0].snippet.title &&
                profile.items[0].snippet.thumbnails.default.url && (
                    <div className="flex justify-end items-end text-sm">
                        Youtube Music logged in as&nbsp;
                        <br />
                        {profile.items[0].snippet.title}&nbsp;
                        <img
                            src={
                                profile.items[0].snippet.thumbnails.default.url
                            }
                            referrerpolicy="no-referrer"
                            alt="profile"
                            className="rounded-full h-10 w-10"
                        />
                    </div>
                )}

            {console.log("playlists", playlists)}
            {playlists.items && (
                <div className="playlists mt-10">
                    <span className="text-4xl">Your playlists are:</span>
                    <div className="mt-12">
                        {playlists.items.map((playlists, index) => {
                            return (
                                <div>
                                    <div
                                        key={index}
                                        className="playlists w-full text-center"
                                    >
                                        <span className="flex items-center justify-center">
                                            <img
                                                src={
                                                    playlists.snippet.thumbnails
                                                        .default.url
                                                }
                                                alt="profile"
                                                className="w-[5%] h-[5%] rounded-3xl"
                                            />
                                            &nbsp;&nbsp;
                                            <span className="text-lg">
                                                {playlists.snippet.title} by{" "}
                                                {playlists.snippet.channelTitle}
                                                {playlists.snippet.localized
                                                    .description && (
                                                    <div className="flex justify-center items-center">
                                                        <span className="text-xs">
                                                            {
                                                                playlists
                                                                    .snippet
                                                                    .localized
                                                                    .description
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {playlists.contentDetails
                                                    .itemCount && (
                                                    <div className="flex justify-center items-center">
                                                        <span className="text-xs underline">
                                                            Tracks
                                                            Available:&nbsp;
                                                            {
                                                                playlists
                                                                    .contentDetails
                                                                    .itemCount
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </span>
                                        </span>
                                        <span>
                                            <a
                                                href={`https://music.youtube.com/playlist?list=${playlists.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-300"
                                            >
                                                Open Playlist on Youtube Music
                                            </a>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link
                                                to={`/TransferFromYoutubeMusic/${destinationValue}/${playlists.id}`}
                                                class="text-indigo-400"
                                            >
                                                Transfer to&nbsp;
                                                {destinationValue === "toDeezer"
                                                    ? "Deezer"
                                                    : destinationValue ===
                                                      "toYoutubeMusic"
                                                    ? "Youtube Music"
                                                    : destinationValue ===
                                                      "toSpotify"
                                                    ? "Spotify"
                                                    : destinationValue ===
                                                      "toAppleMusic"
                                                    ? "Apple Music"
                                                    : "NO OPTION"}
                                            </Link>
                                        </span>
                                    </div>
                                    <br />
                                    <hr className="w-1/2 m-auto	" />
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListYoutubeMusicPlaylists;
