import React from "react";
import PartialCompleteGif from "../assets/warning.gif";

const PartialTransferComplete = () => {
    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[52vh]">
            <span class="flex flex-wrap justify-center items-center scale-[150%]">
                <img src={PartialCompleteGif} alt="Partial Transfer Complete" />
            </span>
        </div>
    );
};

export default PartialTransferComplete;
