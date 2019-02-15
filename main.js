//nodes
let photoURL = document.getElementById('photoURL')
let username = document.getElementById('username')
let searching = document.getElementById('searching')
let image = document.getElementById('preview')
let fileInput = document.getElementById('file')
let modal = document.querySelector('.modal')
let tache = document.getElementById('tache')
let subirButton = document.getElementById('subir')
let resultsContainer = document.getElementById('results')
let src
let user

// FIREBASE INITIALIZE AND REFS
let firestore = firebase.firestore()
let memesRef = firestore.collection('memes')


//FIREBASE AUX FUNCTIONS
function writeMeme(object){
    let id = memesRef.doc().id
    memesRef.doc(id).set(object)
}

// consultas
function searchFor(string){
    console.log("buscando", string)
    memesRef.where('tags', "==", string)
    .get()
    .then(function(snap){
        if(snap.empty) alert("Sin resultados") 
        snap.forEach(doc=>{
            resultsContainer.innerHTML = ""
            let figure = document.createElement('figure')
            figure.innerHTML = `
                <img src="${doc.data().link}" alt="${doc.data().title}" />
            `
            resultsContainer.appendChild(figure)
        })
    })
}


//FIREBASE LOGIN
function gmailLogin(){
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result) {
            user = result.user
            setUser()
    })

}



// FIREBASE LISTENERS

//USER LISTENER
firebase.auth().onAuthStateChanged(function(u){
    if(!u) console.log("Recuerda loguearte para publicar")
   else {
        user = u
        setUser()
    }
})

//MEMES LISTENER
memesRef.onSnapshot(function(snap){
    snap.forEach(function(doc){
        drawResults([doc.data()])
    })
})
//

// SEARCH FOR MEMES
//

//defaults listeners
searching.addEventListener('keydown', function(e){
    if(e.key == "Enter"){
        searchFor(e.target.value)
    }
})

username.addEventListener('click', function(){
    if(!user){
        gmailLogin()
    }else{
        logout()
    }
})

tache.addEventListener('click', function(){
    clearModal()
})

//al dar click a subir meme
subirButton.addEventListener('click', function(){
    let meme = {
        title: document.getElementById('title').value,
        tags: document.getElementById('tags').value,
        link:src
    }
    subirButton.disabled = true
    subirButton.style = "background:grey"
    //console.log(meme)
    //UPLOAD TO FIREBASE
    writeMeme(meme)
    //

    //after upload
    clearModal()
    //drawResults([meme])
    
})

//al dar click a crear
document.querySelector('.upload')
.addEventListener('click', function(){
    //FIREBASE
    if(!user) return alert("Inicia Sesión")
    
    fileInput.click()
})
//al seleccionar la imagen
fileInput.addEventListener('change', function(){
    modal.style="display:flex"
    let fr = new FileReader()
    fr.readAsDataURL(fileInput.files[0])
    fr.onload = function(){
        src = fr.result
        image.src = src
    }
})

//aux functions
function clearModal(){
    fileInput.value = null
    modal.style="display:none"
    subirButton.disabled = false
    subirButton.style = "linear-gradient(to right, purple, blueviolet)"
}

function drawResults(array){
  // OPTIONAL
  //resultsContainer.innerHTML = ""
  //
    array.forEach(function(el, index){
        let figure = document.createElement('figure')
        figure.innerHTML = `
            <img src="${el.link}" alt="${index}">
        `
        resultsContainer.prepend(figure)
    })
}

function setUser(){
    if(!user) {
        document.querySelector('.user').innerHTML = `
        <img id="photoURL" src="https://media.giphy.com/avatars/default3.gif" alt="">
        <span id="username" >
            Login
        </span>
        `
        username = document.getElementById('username')
        username.addEventListener('click', function(){
            if(!user){
                gmailLogin()
            }else{
                logout()
            }
        })
        return
    }

    photoURL.src = user.photoURL
    username.innerText = user.displayName
}

function logout(){
    user = undefined
    setUser()
    firebase.auth().signOut()
}