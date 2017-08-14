//var superAdmin=true;
var language;
var myPag;
var userEmail;
var urlP;

var pregSec;
var resSec;
var idAuth;
var tokenAuth;
var pswAuth;
var pswRAuth;

var usrAuxMeu;
var pswAuxMeu;

var a,b,c,d,e,f,x,y,z;
var permissions,language;
//////////////////START////////////////////////////
$(document).ready(function() {
//    console.log(localStorage.getItem("nuevo")==null);
    $("#campanas").removeClass("hidden");
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });
    
        
    inicioCampanas();
     listenerCampanas();
    myPag=0;
//        language=getCookie('language');
        if(language==undefined){
            language='es';
        }

//        myScript(language,myPag);

        urlP=document.URL;


//console.log(languages.es[1].welcome);

        loadWizzard();


     

        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload();
            }
        }


});
/////////////////////////////////////
///////FINAL DEL DOCUMENT READY//////
/////////////////////////////////////


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

function listenerCampanas(){
            $('#aDashboard').click(function(e) {
        location.replace('./dashboard.html');
        e.preventDefault();
    });
}

//////////CODIGO MIO ///////////
$('#goBack').click(function(e) {
    location.replace('./index.html');
        });