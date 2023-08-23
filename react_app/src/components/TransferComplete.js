import React from "react";
import CompleteGif from "../assets/completeDark.gif";

const TransferComplete = () => {
    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[52vh]">
            <span class="flex flex-wrap justify-center items-center scale-[150%]">
                <img className="" src={CompleteGif} alt="Transfer Complete" />
            </span>
        </div>
    );
};

export default TransferComplete;
