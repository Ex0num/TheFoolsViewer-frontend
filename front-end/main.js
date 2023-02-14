// -------------- LOADING DE PAGINA -------------- //
mostrarSubtitulos();

// ----
let imagen_lol = document.getElementById("imagen-lol");
let subtitulo_lol = document.getElementById("imagen-lol-subtitulo");

let imagen_val = document.getElementById("imagen-val");
let subtitulo_val = document.getElementById("imagen-val-subtitulo");

let imagen_csgo = document.getElementById("imagen-csgo");
let subtitulo_csgo = document.getElementById("imagen-csgo-subtitulo");
// -----

// Fixeo de animaciones en LOAD de pagina
function mostrarSubtitulos()
{
    setTimeout(() => 
    {
        subtitulo_lol.removeAttribute("hidden");
        subtitulo_val.removeAttribute("hidden");
        subtitulo_csgo.removeAttribute("hidden");
    }, 1000);
}

// SweetAlert
setTimeout(() => 
{
    swal("¡Estamos en pre-alpha!", "Recuerda que estamos iniciando en este proyecto y todo tipo de error podrá ser reportado en el repositorio de Github. https://github.com/Ex0num/TheFoolsViewer/issues o comunicado al Discord EXONUM#5778", "info");
}, 1000);

imagen_lol.addEventListener("click", () => {window.location.href = './vistas/lol/league-of-legends.html'});
// imagen_val.addEventListener("click", () => {window.location.href = './vistas/val/league-of-legends.html'});
// imagen_csgo.addEventListener("click", () => {window.location.href = './vistas/csgo/league-of-legends.html'});