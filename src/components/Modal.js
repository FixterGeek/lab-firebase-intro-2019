import React from 'react'

export default function () {

    return (
        <div>
            <div style={{ display: "flex" }} className="modal">
                <div id="tache">X</div>
                <div className="modal-form">
                    <h2>Sube tu hermoso meme</h2>
                    <img id="preview" />
                    <br />
                    <input id="title" name="title" placeholder="título" type="text" />
                    <br />
                    <input id="tags" placeholder="TAGS: amlo bliss firebase polloyon" name="tags" type="text" />
                    <button id="subir">Subir</button>
                </div>
            </div>

            <input accept="image/*" hidden id="file" type="file" />
        </div>

    )
}