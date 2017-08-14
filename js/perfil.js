var x,y,a,t;

var language;
var auxPerf;
var myPag;


$(document).ready(function() {
    $("#b4").removeClass("hidden");
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });

    loadWizzard();
    myPag=4;

    $("#header").css("display", "block");
    $("#footer").css("display", "block");
//    $("#menuPerfil").css("display", "block");

    x=getCookie('token');
    y=getCookie('userEmail');
    a=getCookie('userId');
    t=getCookie('userPerfil');
    language=getCookie('language');
    $('#userName').html(y);

//    changeLanguage();
//    myScript(language,myPag);
      
//    auxPerf=JSON.parse(t);

    document.getElementById('secLev').addEventListener("change", changeSecLevel);
    document.getElementById('langCh').addEventListener("change", changeLang);
  
        window.onpopstate = function(event) {    
            if(event && event.state) {
            location.reload(); 
            }
        }
       
        $( ".md-active" ).trigger( "click" );
        
});
/////FIN del DOCUMENT READY/////////////////////////





///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
$('#changePsw').click(function(e) {
  var ok=0;
  var psw=document.getElementById("passwordPwd").value;
  var psw2=document.getElementById("pswrepeat").value;  
    if(psw!==psw2){
        alert('Error, los psws no coinciden');
    }else if(psw!==psw2){
        ok=1;
    }
    
    if(ok==1){
    var url = "http://dmds-users-dev.planisys.net/api/v1/user/"+a;
         var xhr = new XMLHttpRequest();
xhr.open("PUT", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", x);

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);

        console.log(json);
        console.log('Se ha actualizado la contraseña correctamente.');


    }else if (xhr.readyState == 4 && xhr.status !== 200){
        console.log("Algun error pasa.");
    }
    //console.log(xhr.readyState +"/"+xhr.status);
}

var data = JSON.stringify({"first_name":auxPerf.first_name,"last_name":auxPerf.last_name, "email":auxPerf.email, "password":psw,"password_confirmation": psw2});
xhr.send(data);
}
      });


///////////CAMBIAR EL NIVEL DE SEGURIDAD////////////////////////////
function changeSecLevel(){

    var elem = document.getElementById("secLev");
    var tt = elem.options[elem.selectedIndex].value;
    
    
     switch(tt){
        case 'Basic':
    
        var x = 'Se ha cambiado al nivel de seguridad a Basico.';
        console.log(x);
        $( "#secLevel" ).detach();
        break;
             
        case 'Medium':
    
            var x = 'Se ha cambiado al nivel de seguridad a Medio con funcionalidad SMS.';
            console.log(x);
            $('#secLevel').append(
                $('<input>', {
                type: 'text',
                class: 'your-class',
                placeholder: 'Pon tu nº de Telf'
                })    
            );   
            var r= $('<input type="button" class="selectsM" value="Submit Telf"/>');
            $("#secLevel").append(r); 
        break;
             
        case 'High':
    
            var x = 'Se ha cambiado al nivel de seguridad a High con funcionalidad por Token.';
            console.log(x);
            $("#secLevel").empty();
        break;
}
}


///////////CAMBIAR EL LENGUAJE////////////////////////////
function changeLang(){

    var elem = document.getElementById("langCh");
    var tt = elem.options[elem.selectedIndex].value;
}