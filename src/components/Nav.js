import React, { useEffect, useState, useRef } from 'react'
import { gmailLogin, logOut, saveMeme } from '../services/firebase'
import Modal from './Modal'

export default function () {

    //hooks everywhere
    //state
    let [show, setShow] = useState(false)
    let [user, setUser] = useState(null)
    let [link, setLink] = useState(null)
    let [meme, setMeme] = useState({})
    //refs
    let inputRef = useRef()
    //life cicles:
    useEffect(() => {
        let userInText = localStorage.getItem('user')
        let user = JSON.parse(userInText)
        setUser(user)
    }, [user])
    //
    //kind of method
    function login() {
        gmailLogin()
            .then(user => {
                setUser(user)
            })
    }

    function openModal() {
        if (!localStorage.getItem('user')) return alert("inicia sesión")
        let input = inputRef.current
        input.click()
        input.onchange = e => {
            let fr = new FileReader()
            fr.readAsDataURL(e.target.files[0])
            fr.onload = () => {
                setLink(fr.result)
                setShow(true)
            }
        }

    }

    function onChange(e) {
        let m = { ...meme }
        m[e.target.name] = e.target.value
        setMeme(m)
        //console.log(meme)
    }

    function sendMeme() {
        //console.log(meme)
        let m = { ...meme, link }
        saveMeme(m)
        setShow(false)
    }
    //

    //methods. kindof

    //
    return (
        <div>
            <nav>
                <figure><img src="https://firebasemx.com/static/media/firemx.018fbe39.png" alt="" /></figure>
                <div className="categories">
                    <button>
                        Reactions
            </button>
                    <button>
                        Entertainment
        </button>
                    <button>
                        Sports
        </button>
                    <button>
                        Stickers
        </button>
                    <button>
                        Artists
        </button>
                    <button>
                        icon
        </button>
                </div>
                <div
                    onClick={openModal}
                    className="upload">
                    <button>
                        Upload
        </button>
                    <button>
                        Create
        </button>
                </div>
                <div className="user">
                    <img id="photoURL" src={user ? user.photoURL : "https://media.giphy.com/avatars/default3.gif"} alt="" />
                    <span onClick={user ? logOut : login} id="username" >
                        {user ? user.displayName : "Login"}
                    </span>
                </div>

            </nav>
            {show && <Modal
                sendMeme={sendMeme}
                onChange={onChange}
                link={link}
                setShow={setShow} />}
            <input ref={inputRef} accept="image/*" hidden id="file" type="file" />
        </div>
    )
}