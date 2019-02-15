//nodes
let image = document.getElementById('preview')
let fileInput = document.getElementById('file')
let modal = document.querySelector('.modal')
let tache = document.getElementById('tache')
let src
//defaults listeners
tache.addEventListener('click', function(){
    fileInput.value = null
    modal.style="display:none"
})

//listeners
document.querySelector('.upload')
.addEventListener('click', function(){
    fileInput.click()
})
fileInput.addEventListener('change', function(){
    modal.style="display:flex"
    let fr = new FileReader()
    fr.readAsDataURL(fileInput.files[0])
    fr.onload = function(){
        src = fr.result
        image.src = src
    }
})