import React, { useEffect, useState } from 'react'
import { gmailLogin, logOut } from '../services/firebase'


export default function () {

    //hooks everywhere
    //state
    let [user, setUser] = useState(null)
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
    //

    //methods. kindof

    //
    return (<nav>
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
        <div className="upload">
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
    </nav>)
}