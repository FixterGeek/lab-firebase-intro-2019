//nodes
let image = document.getElementById('preview')
let fileInput = document.getElementById('file')
let modal = document.querySelector('.modal')
let tache = document.getElementById('tache')
let subirButton = document.getElementById('subir')
let resultsContainer = document.getElementById('results')
let src

//defaults listeners
tache.addEventListener('click', function(){
    clearModal()
})

// FIREBASE LISTENERS
//

// SEARCH FOR MEMES
//

//al dar click a subir meme
subirButton.addEventListener('click', function(){
    let meme = {
        title: document.getElementById('title').value,
        tags: document.getElementById('tags').value,
        link:src
    }
    subirButton.disabled = true
    subirButton.style = "background:grey"
    console.log(meme)
    //UPLOAD TO FIREBASE
    //

    //after upload
    clearModal()
    drawResults([meme])
    
})

//al dar click a crear
document.querySelector('.upload')
.addEventListener('click', function(){
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

    array.forEach(function(el, index){
        let figure = document.createElement('figure')
        figure.innerHTML = `
            <img src="${el.link}" alt="${index}">
        `
        resultsContainer.prepend(figure)
    })
}