//////
var search=0;
var contCampMost=1;
//$(document).ready(function() {
function inicioCampanas(){
 loadWizzard();
    myPag=1;
    
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("userEmail");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    

      z=28;
      a=14;
      y='Default';
      c='PLANISYS Production';
        
    localStorage.idDmDsSel = a;
    localStorage.nameDmDsSel = c;
    localStorage.idGroupSel = z;
    localStorage.nameGroupSel = y;

    
//    console.log(b);
    $('#userName').html(b);
    $('#h2p1').html("<br />Lista de Campañas: '"+c+"'");
    
//    console.log("Tu token es: "+x);
    cargarCampanas();
}


function gotoEnvios2(id,name){
    
        console.log('id '+id);
        campanaId=id;
        localStorage.campanaId=campanaId;
        localStorage.campanaName=name;
    
    history.pushState({urlPath:'./envios.html'},"page 4",'./envios.html');
    location.replace('./envios.html');
}
function gotoStats2(id,name){
    
        console.log('id '+id);
        campanaId=id;
        localStorage.campanaId=campanaId;
        localStorage.campanaName=name;
    
    location.replace('./stats.html');
}

function cargarMas(){
    var ajx;
    var aux=contCampMost*6;
    if(aux<=totalCampanas){
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':aux,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,'order_dir':wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
    contCampMost++;
    }else{
        document.getElementById('butCarMas').setAttribute('disabled', true);
    }
}
    
    
function cargarCampanas(){
    var ajx
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);

}




function printCampanas(pag){
	if(typeof pag === "undefined") {
        pag = 0;
    console.log(wiz.Campanas);

        for(i=0;i<=wiz.Campanas.length-1;i++){
            campanas.push(wiz.Campanas[i]);
        }

	}else {
        wiz.Perfil[0].info.pagina=pag;
        var start=wiz.Perfil[0].info.pagina*wiz.Perfil[0].info.numReg;
        var data={'start' : start, 'length' : wiz.Perfil[0].info.numReg, 'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
        ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
    }
    if(totalEnvios<=6){
        document.getElementById('butCarMas').setAttribute('disabled', true);
    }
}




function changeOrderCamp(){

    var e = document.getElementById("orderByCamp");
    var tt = e.options[e.selectedIndex].value;
    wiz.Perfil[0].info.Orderby=tt;
    var xx=$('#checkboxCamp').checked;
    if(xx){
        wiz.Perfil[0].info.orderDir='asc';
    }else{
        wiz.Perfil[0].info.orderDir='desc';
    }

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
}


function searchCampanas(){

    var str = $('#inputSearch').val();
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);
    
    for(i=0;i<=wiz.Campanas.length-1;i++){
            campanas.shift();
        }
    
//    alert(str);
    var data={'search':str,'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
}






//////////////IMPRESION DEL PERFIL UNA VEZ GUARDADO COMO OBJETO EN EL WIZ////////////
function printPerfil(){
    console.log(wiz.Perfil);
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
