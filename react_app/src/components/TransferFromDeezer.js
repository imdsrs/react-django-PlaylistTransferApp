import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransferFromDeezer = () => {
    const { playlistId } = useParams();
    const { destinationValue } = useParams();
    let url = `http://localhost:8000/api/TransferFromDeezer/${destinationValue}/${playlistId}/${localStorage.getItem(
        "DeezerAccessToken"
    )}/`;

    const getDataFromDeezer = async () => {
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
        getDataFromDeezer();
    }, []);
    return (
        <div>
            <h1>
                {playlistId}
                {destinationValue}
                <h1>Test TransferFromSpotify to {destinationValue}</h1>
            </h1>
        </div>
    );
};

export default TransferFromDeezer;
