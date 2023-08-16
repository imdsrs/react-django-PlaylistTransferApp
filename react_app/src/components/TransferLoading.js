import React from "react";
import LoadingGif from "../assets/loadingDark.gif";

const TransferLoading = () => {
    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[66vh]">
            <span class="flex flex-wrap justify-center items-center">
                <div className="text-center px-10 py-5 text-4xl w-full">
                    Transfer in Progress...
                </div>
                <img src={LoadingGif} alt="loading..." />
            </span>
        </div>
    );
};

export default TransferLoading;
