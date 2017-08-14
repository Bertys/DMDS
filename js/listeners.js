///////Listeners////////////////file:///android_asset/www/index.html

function goPerfil(){
    location.replace('./perfil.html');
}
function goCampanas(){
    location.replace('./index.html');
}
function goEnvios(){
    location.replace('./envios.html');
}
function goDetalles(){
    location.replace('./detalles.html');
}
function logout(){
    if (typeof x !== 'undefined') {
    var xhr = new XMLHttpRequest();
    var url = "http://dmds-users-dev.planisys.net/api/v1/logout/";
    xhr.open("POST", url, true);
    console.log("Deslogueado correctamente.");
    // location.replace("http://mobile1.planisys.net/index.html");
        document.cookie = "pPage=0";
        localStorage.removeItem("nuevo");
    location.replace('./index.html');
}
}
$('#buthover').click(function(e) {
          logout();
        });