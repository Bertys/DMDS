//var superAdmin=true;
var language;
var myPag;
var userEmail;
var urlP;
var nIntentos=0;
var pregSec;
var resSec;
var idAuth;
var tokenAuth;
var pswAuth;
var pswRAuth;

var usrAuxMeu;
var pswAuxMeu;

//////////////////START////////////////////////////
$(document).ready(function() {
//    console.log(localStorage.getItem("nuevo")==null);
    $("#b1").removeClass("hidden");
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });
    
        if(localStorage.getItem("nuevo")==null){
            console.log('entra n=n');
            example2.openDialog('dialog1');
        }else if(localStorage.getItem("nuevo")=='Bueno'){
            startPageLogin(localStorage.getItem("usrAuxMeu"),localStorage.getItem("pswAuxMeu"));
        }else{
//            inicioCampanas();
            console.log('elese');
        }
    
    
    myPag=0;
//        language=getCookie('language');
        if(language==undefined){
            language='es';
        }

//        myScript(language,myPag);

        urlP=document.URL;


//console.log(languages.es[1].welcome);

        loadWizzard();


    $('#butLogin').click(function(e) {
        var user = $("#user").val();
        var password = $("#password").val();
        var passwordsha256 = CryptoJS.SHA256(password);
        var ppssww = passwordsha256.toString();
        startPageLogin(user,ppssww);
        userEmail=user;
        document.cookie = "userEmail="+userEmail;
        e.preventDefault();
    });
     

        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload();
            }
        }

        $('#helper').hide();

});
/////////////////////////////////////
///////FINAL DEL DOCUMENT READY//////
/////////////////////////////////////


//////COOKIES/////////
function writeCookie(name,value,mins) {
	//deleteCookie(name);
    var date, expires;
    if (mins) {
        date = new Date();
        date.setTime(date.getTime()+(mins*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function deleteCookie(name){
	 document.cookie = name + '=; path=/;';
}
function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return undefined;
}



///////////////WIZARD////////////////
function loadWizzard(){
	var str = readCookie('wizzard_save');
	if(str != undefined && str.length>2){
		var js = JSON.parse(str);
		wiz = new WizzardDMDS(js);
	} else{
		wiz = new WizzardDMDS();
	}
	if(typeof afterLoad !== "undefined") afterLoad();
	afterLoad = undefined;
    //console.log("afterloadwizard");
}
function afterLoad() {
    // code to execute
//    console.log('Se cargaron las cookies.');
}



//////////CODIGO MIO ///////////

var token;
var permissions;


function startPageLogin(usr,psw){

nIntentos++;
usrAuxMeu=usr;
pswAuxMeu=psw;


    // Sending and receiving data in JSON format using POST mothod
var xhr = new XMLHttpRequest();
var url = "http://dmds-users-dev.planisys.net/api/v1/auth/login";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);

        token=json.token;
        permissions=JSON.stringify(json.permissions);

        console.log("Te has logueado correctamente con: "+usr+" y tu token es: "+json.token);
        console.log('La respuesta del servidor ha sido:');
        console.log(json);

        localStorage.setItem("token", token);
        document.cookie = "token="+token;
        document.cookie = "permissions="+permissions;
        document.cookie = "language="+json.lang;
        // loadCookie();
//        localStorage

//        history.pushState({urlPath:'./login.html'},"page 2",'./login.html');
//        history.pushState({urlPath:'file:///android_asset/www/index.html'},"page 2",'file:///android_asset/www/dmdsapp/index.html');

        localStorage.setItem("nuevo", "Bueno");
        localStorage.setItem("usrAuxMeu", usrAuxMeu);
        localStorage.setItem("pswAuxMeu", pswAuxMeu);
        inicioCampanas();
//        location.replace('./campanas.html');
        /*setTimeout(function(){
        }, 2000);*/

    }else if (xhr.readyState == 4 && xhr.status !== 200){
        console.log("Tu login es incorrecto, vuelve a intentarlo.");
        alert("Tu login es incorrecto, vuelve a intentarlo.");
        //control de fallos del mail

        $('#helper').show();
        $('#helper').html('Tienes problemas?<br>');
        localStorage.removeItem("nuevo");
        getAuth(1,"user/id/"+userEmail);

        }else{
            console.log("Entra login else.");
//        alert("Tu login es incorrecto, vuelve a intentarlo.");
        }
    //console.log(xhr.readyState +"/"+xhr.status);
}
var data = JSON.stringify({"username":usr,"password":psw});
xhr.send(data);

}
function getJson(json){
   console.log(json);
}

///////////////////////////////////////////////////////////////

//////Click login al presionar Enter ////////////
function runScript(e) {
    if (e.keyCode == 13) {
        var tb = document.getElementById("password");
        $( "#butLogin" ).trigger( "click" );
//        eval(tb.value);
        return false;
    }
}
