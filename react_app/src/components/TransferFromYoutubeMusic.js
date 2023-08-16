import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TransferLoading from "./TransferLoading";
import TransferComplete from "./TransferComplete";
import TransferError from "./TransferError";

const TransferFromYoutubeMusic = () => {
    const { playlistId } = useParams();
    const { destinationValue } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [responseFromBE, setResponseFromBE] = useState({});

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
                setResponseFromBE(response);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataFromYoutubeMusic();
    }, []);

    useEffect(() => {
        setIsLoading(!isLoading);
    }, [responseFromBE]);

    return (
        <div>
            {/* {playlistId}
            {destinationValue} */}
            {console.log("responseFromBE:", responseFromBE)}
            {console.log("isLoading:", isLoading)}
            {isLoading ? (
                <TransferLoading />
            ) : responseFromBE.status === 200 && responseFromBE.data ? (
                <div>
                    <div className="text-gray-400 bg-gray-900 body-font text-center px-10 py-5 text-4xl w-full">
                        Transfer Complete for{" "}
                        {responseFromBE.data.CurrentSuccessfulTransfers} of{" "}
                        {responseFromBE.data.TotalSongs} Songs
                    </div>
                    <TransferComplete />
                </div>
            ) : (
                responseFromBE.data && (
                    <div>
                        <div className="text-gray-400 bg-gray-900 body-font text-center px-10 py-5 text-4xl w-full">
                            {responseFromBE.data.CurrentSuccessfulTransfers} of{" "}
                            {responseFromBE.data.TotalSongs} Songs Transfered
                        </div>
                        <TransferError />
                    </div>
                )
            )}
        </div>
    );
};

export default TransferFromYoutubeMusic;
