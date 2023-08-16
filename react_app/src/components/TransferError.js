import React from "react";
import ErrorGif from "../assets/error.gif";

const TransferError = () => {
    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[52vh]">
            <span class="flex flex-wrap justify-center items-center">
                <div className="text-center px-10 py-5 text-4xl w-full">
                    Error Completing the Request!
                </div>
                <img src={ErrorGif} alt="loading..." />
            </span>
        </div>
    );
};

export default TransferError;
