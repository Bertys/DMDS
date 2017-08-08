var x;
var y;
var z;
var a;
var b;
var c;
var cookie;
var d;
var e;
var f;
var language;
var myPag;
var campanasPerPage=6;

var contEnvMost=1;


$(document).ready(function() {
    $("#b2").removeClass("hidden");
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });

    loadWizzard();
    myPag=2;

    c=getCookie('userEmail');
    x=getCookie('token');
    z=getCookie('idGroupSel');
    a=getCookie('idDmDsSel');
    b=getCookie('campanaId');
    cookie=getCookie('wizzard_save');
    d=getCookie('nameDmDsSel');
    e=getCookie('nameGroupSel');
    f=getCookie('campanaName');
    language=getCookie('language');




    $('#userName').html(c);
    $('#h2p2').html("<br />Lista de envios de: '"+f+"'");

      startEnvios();
//      enviosMostrados();

      window.onpopstate = function(event) {
        if(event && event.state) {
        location.reload();
        }
      }
      
});
////////FIN DEL DOCUMENT READY/////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
/////LISTENERS CUANDO XA CUANDO YA SE MOSTRARON LOS ENVIOS////////////////////
function enviosMostrados() {

  document.getElementById("logo").addEventListener("click", function(){
      history.pushState({urlPath:'./index.html'},"page 5",'./index.html');
      location.replace('./index.html');
  });
  
  document.getElementById("perfil").addEventListener("click", function(){
      history.pushState({urlPath:'./perfil.html'},"page 5",'./perfil.html');
      location.replace('./perfil.html');
  });

  document.getElementById("butWizard").addEventListener("click", function(){
       history.pushState({urlPath:'http://mobile1.planisys.net/wiz/'},"page 5",'http://mobile1.planisys.net/wiz/');
      location.replace('http://mobile1.planisys.net/wiz/');
  });

//////////////////LOGout////////////////////////////
document.getElementById("logout2").addEventListener("click", function(){
    if (typeof x !== 'undefined') {
    var xhr = new XMLHttpRequest();
    var url = "http://dmds-users-dev.planisys.net/api/v1/logout/";
    xhr.open("POST", url, true);
    console.log("Deslogueado correctamente.");
    history.pushState({urlPath:'./index.html'},"page 5",'./index.html');
    location.replace('./index.html');
}
});

$('#goBack2').click(function(e) {
    window.history.back();
        });

    
    
    
    /*$('#butDmds').click(function(e) {
      location.replace('./dmds.html');
        });*/

    $('#butUsers').click(function(e) {
      location.replace('./users.html');
        });

   $('#anavCampanas').click(function(e) {
      location.replace('./campanas.html');
        });

    $('#anavEnvios').click(function(e) {
      location.replace('./envios.html');
        });
$('#anavMailer').click(function(e) {
//      history.pushState({urlPath:'../mosaico/index.html'},'../mosaico/index.html');
      location.replace('../mosaico/index.html');
        });
     document.getElementById('orderByEnv').addEventListener("change", changeOrderEnv);
     document.getElementById('numRegEnv').addEventListener("change", changeNumRegEnv);
}



/////////////////////////////////////////////////////////////////////////////
/////////START D LOS METODOS PARA MOSTRAR LOS ENVIOS/////////////////////////
/////////////////////////////////////////////////////////////////////////////
var ajx
function startEnvios(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}


function changeNumRegEnv(){

    var e = document.getElementById("numRegEnv");
    var tt = e.options[e.selectedIndex].value;
    wiz.Perfil[0].info.numReg=tt;

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}

function changeOrderEnv(){

    var e = document.getElementById("orderByEnv");
    var tt = e.options[e.selectedIndex].value;
    wiz.Perfil[0].info.Orderby=tt;
    var xx=$('#checkboxEnv').checked;
    if(xx){
        wiz.Perfil[0].info.orderDir='asc';
    }else{
        wiz.Perfil[0].info.orderDir='desc';
    }

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}

function searchEnvios(){

    var str = $('.input-searchbox').val();

    var data={'search':str,'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}




function gotoDetalles(id,name){
  
    if(id!=0){
        console.log('id '+id);
        envioId=id;
        document.cookie = "envioId="+envioId;
        document.cookie = "envioName="+name;
    
    history.pushState({urlPath:'./envios.html'},"page 5",'./detalles.html');
    location.replace('./detalles.html');
}
    }



function cargarMasE(){
    var ajx;
    var aux=contEnvMost*6;
    if(aux<=totalEnvios){
        console.log(aux);
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':aux,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
    contEnvMost++;
    }else{
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
}

function printEnvios(pag){
	if(typeof pag === "undefined"){
        pag = 0;
    console.log(wiz.envios);
 for(i=0;i<=wiz.envios.length-1;i++){
            envios.push(wiz.envios[i]);
        }
    if(wiz.envios.length==0){
        envios.push({info:{envio:{nombre:"La campaña seleccionada no tiene envíos."},id:0}})
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
	}
//    else{
//        wiz.Perfil[0].info.pagina=pag;
//        var start=wiz.Perfil[0].info.pagina*wiz.Perfil[0].info.numReg;
//        var data={'start' : start, 'length' : wiz.Perfil[0].info.numReg, 'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
//        ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
//    }

    if(totalEnvios<=6){
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
}
