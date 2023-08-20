import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TransferLoading from "./TransferLoading";
import TransferComplete from "./TransferComplete";
import TransferError from "./TransferError";
import PartialTransferComplete from "./PartialTransferComplete";

const TransferFromSpotify = () => {
    const { playlistId } = useParams();
    const { destinationValue } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [responseFromBE, setResponseFromBE] = useState({});

    let url = `http://localhost:8000/api/TransferFromSpotify/${destinationValue}/${playlistId}/${localStorage.getItem(
        "SpotifyToken"
    )}/`;

    const getDataFromSpotify = async () => {
        if (destinationValue === "toDeezer") {
            url = url + localStorage.getItem("DeezerAccessToken");
        }
        if (destinationValue === "toYoutubeMusic") {
            url = url + localStorage.getItem("YoutubeMusicAccessToken");
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
                setResponseFromBE(response);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataFromSpotify();
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
            ) : responseFromBE.status === 207 &&
              responseFromBE.data &&
              responseFromBE.data.CurrentSuccessfulTransfers > 0 ? (
                <div>
                    <div className="text-gray-400 bg-gray-900 body-font text-center px-10 py-5 text-4xl w-full">
                        Partial Transfer Complete for{" "}
                        {responseFromBE.data.CurrentSuccessfulTransfers} of{" "}
                        {responseFromBE.data.TotalSongs} Songs
                    </div>
                    <PartialTransferComplete />
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

export default TransferFromSpotify;
