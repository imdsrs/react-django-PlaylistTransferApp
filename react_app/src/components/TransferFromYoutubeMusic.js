import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransferFromYoutubeMusic = () => {
    const { playlistId } = useParams();
    const { destinationValue } = useParams();
    let url = `http://localhost:8000/api/TransferFromYoutubeMusic/${destinationValue}/${playlistId}/${localStorage.getItem(
        "YoutubeMusicAccessToken"
    )}/`;

    const getDataFromYoutubeMusic = async () => {
        if (destinationValue === "toSpotify") {
            url = url + localStorage.getItem("SpotifyToken");
        }
        await axios
            .get(url)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataFromYoutubeMusic();
    }, []);

    return (
        <div>
            {playlistId}
            {destinationValue}
        </div>
    );
};

export default TransferFromYoutubeMusic;
