import React, { useState } from "react";
import "./Login.css";
import { ReactComponent as InfoButton } from "../../assets/info.svg";

export default function TryModal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                <InfoButton />
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Information: </h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicin</p>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
