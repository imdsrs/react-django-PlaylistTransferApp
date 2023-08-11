import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransferFromSpotify = () => {
    const { playlistId } = useParams();
    const { destinationValue } = useParams();
    let url = `http://localhost:8000/api/TransferFromSpotify/${destinationValue}/${playlistId}/${localStorage.getItem(
        "SpotifyToken"
    )}/`;

    const getDataFromSpotify = async () => {
        if (destinationValue === "toDeezer") {
            url = url + localStorage.getItem("DeezerAccessToken");
        }
        await axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "SpotifyToken"
                    )}`, // pass token to header
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataFromSpotify();
    }, []);

    return (
        <div>
            {playlistId}
            {destinationValue}
            <h1>Test TransferFromSpotify to {destinationValue}</h1>
        </div>
    );
};

export default TransferFromSpotify;
