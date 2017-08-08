var adWordsCode = '';
var wizUrl = 'http://dmds-users-dev.planisys.net/api/v1/';
var version = 1.01;
var wizGlobal;
var totalCampanas;
var totalEnvios;
var totalUsers;

//var language ='es';
//language = getCookie('language');
var WizzardDMDS = function(json){
	
	wizGlobal = this;
//	this.envio;
    this.DMDS = new Array();
    this.campanas = new Array();
    this.envios = new Array();
    this.users = new Array();
    this.perfil = new Array();
	if(typeof json === "object"){
		this.parseJson(json);
	}
//	console.log('ver: '+version);
}
WizzardDMDS.prototype.parseJson = function(json){
	this.DMDS = json.DMDS;
//	this.newEnvio(json.envio);
	
}
WizzardDMDS.prototype.saveWiz = function(){
	this.DMDS = [];
	this.campanas = [];
	this.envios = [];
	this.users = [];
    this.perfil = [];
	var jsonstr = JSON.stringify(this);
	writeCookie('wizzard_save',jsonstr);
}
WizzardDMDS.prototype.getInfo = function(url,data,callback){
		$.ajax({
		type:'GET',
		url:wizUrl+url,
		data:JSON.stringify(data),
		beforeSend: function (request)
    {
        request.setRequestHeader("Accept", 'application/json');
        request.setRequestHeader("Authorization", x);
    },
		dataType: 'json',
		success:function(data){
			//console.log(data);
			if(data.status == "err"){
				//errCallback('Ha habido un error, intentalo nuevamente');
				console.log(data);
                
			} else{
				callback(data);
			}
		},
		error:function(jqXHR,textStatus,errorThrown){
			console.log(errorThrown);
		}
	});
}
WizzardDMDS.prototype.postInfo = function(url,data,callback){
    
    
		$.ajax({
		type:'POST',
		url:wizUrl+url,
		data:JSON.stringify(data),
		beforeSend: function (request)
    {
//        request.setRequestHeader("Accept", 'application/json');
        request.setRequestHeader("Authorization", x);
    },
		dataType: 'json',
		success:function(data){
			//console.log(data);
			if(data.status == "err"){
				//errCallback('Ha habido un error, intentalo nuevamente');
				console.log(data);
                
			} else{
				callback(data);
			}
		},
		error:function(jqXHR,textStatus,errorThrown){
			console.log(errorThrown);
		}
	});
}
WizzardDMDS.prototype.putInfo = function(_url,_data,okCallback,errCallback){
	var _data = JSON.stringify(_data);
	//console.log(_data);
	console.log(_data);
	console.log(wizUrl+_url);
	$.ajax({
		type:'POST',
		url:wizUrl+_url,
		data:_data,
		beforeSend: function (request)
    {
        request.setRequestHeader("Accept", 'application/json');
        request.setRequestHeader("Authorization", x);
    },
		dataType: 'json',
		success:function(data){
			if(data.status == "err"){
				errCallback(data);
			} else{
				okCallback(data);
			}
		},
		error:function(jqXHR,textStatus,errorThrown){
			console.log(errorThrown);
		}
	});
}


WizzardDMDS.prototype.getCampanaById = function(_id){
	var j;
	var len = this.campanas.length;
	var ret;
	for(j=0;j<len;j++){
		if(this.campanas[j].info.id == _id){
			ret = this.campanas[j];
			break;
		}
	}
	return ret;
}
WizzardDMDS.prototype.getEnvioById = function(_id){
	var j;
	var len = this.envios.length;
	var ret;
	for(j=0;j<len;j++){
		if(this.envios[j].info.id == _id){
			ret = this.envios[j];
			break;
		}
	}
	return ret;
}
WizzardDMDS.prototype.getDmdsById = function(_id){
	var j;
	var len = this.DMDS.length;
	var ret;
	for(j=0;j<len;j++){
		if(this.DMDS[j].info.id == _id){
			ret = this.DMDS[j];
			break;
		}
	}
	return ret;
}
WizzardDMDS.prototype.getUserById = function(_id){
	var j;
	var len = this.users.length;
	var ret;
	for(j=0;j<len;j++){
		if(this.users[j].info.id == _id){
			ret = this.users[j];
			break;
		}
	}
	return ret;
}

WizzardDMDS.prototype.processDMDS = function(dmds){
    
	var len = dmds.data.length;
	var i;
	wiz.DMDS = new Array();
	for(i=0;i<len;i++){
		var obj = dmds.data[i];
		var dmdss = new WizzardDMDS.DMDS(obj);
		wiz.DMDS.push(dmdss);
	}
	printDMDS();
}

WizzardDMDS.prototype.processPerfil = function(perfil){
    

	wiz.Perfil = new Array();

		var obj = perfil;
		var aux = new WizzardDMDS.Perfil(obj);
		wiz.Perfil.push(aux);
    
    printPerfil();

}

WizzardDMDS.prototype.processCampanas = function(campana){
    
	var len = campana.data.length;
//    console.log(campana.recordsFiltered);
    
	var i;
	wiz.Campanas = new Array();
//    console.log('antes del for'+wiz.campanas);
	for(i=0;i<len;i++){
//        console.log('dentro del for namas');
		var obj = campana.data[i];
		var campanass = new WizzardDMDS.Campanas(obj);
		wiz.Campanas.push(campanass);
//        console.log('dentro del for'+wiz.campanas);
	}
//    wiz.Campanas.push({'recordsFiltered':campana.recordsFiltered});
//console.log(wiz.Campanas);
    totalCampanas=campana.recordsFiltered;
	printCampanas();
}


WizzardDMDS.prototype.processEnvios = function(envios){
    
totalEnvios=envios.recordsFiltered;
//    console.log(totalEnvios);
 
    var len = envios.data.length;
	var i;
	wiz.envios = new Array();
	for(i=0;i<len;i++){
		var obj = envios.data[i];
//        console.log(envios.data[i]);
		var envioss = new WizzardDMDS.Envios(obj);
		wiz.envios.push(envioss);
	}
	printEnvios();
    
    
    
    var lan = 10;
    var o;
	wiz.enviosTot = new Array();

		var obj = {
"ev_envio":envios.totals.ev_envio,
"ev_click":envios.totals.ev_click,
"ev_vista":envios.totals.ev_vista,
"ev_vista_unica":envios.totals.ev_vista_unica,
"ev_click_unico":envios.totals.ev_click_unico,
"ev_rebote":envios.totals.ev_rebote,
"ev_rebote_unico":envios.totals.ev_rebote_unico,
"ev_desuscripcion":envios.totals.ev_desuscripcion,
"ev_OR":envios.totals.ev_OR,
"ev_CTR":envios.totals.ev_CTR        
           };
		var campanastt = new WizzardDMDS.EnviosTot(obj);
		wiz.enviosTot.push(campanastt);

//    console.log(wiz.enviosTot);
    
//    printEnviosTot();
}
WizzardDMDS.prototype.processEnvios2 = function(envios2){
    
    var len = envios2.data.length;
	var i;
	wiz.envios = new Array();
	for(i=0;i<len;i++){
		var obj = envios2.data[i];
		var envioss = new WizzardDMDS.Envios(obj);
		wiz.envios.push(envioss);
	}
            startViewEnvio();
}
WizzardDMDS.prototype.processUsers = function(users){
    
	var len = users.data.length;
	var i;
	wiz.users = new Array();
	for(i=0;i<len;i++){
		var obj = users.data[i];
		var userss = new WizzardDMDS.Users(obj);
		wiz.users.push(userss);
	}
    totalUsers=users.recordsFiltered;
//	printUsers();
    processaUP();
}

WizzardDMDS.prototype.processUP = function(userPerfil){
    
    wiz.UP = new Array();
    var obj = userPerfil;
	var aux = new WizzardDMDS.UP(obj);
	wiz.UP.push(aux);
}


// - Campana

WizzardDMDS.DMDS = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
//        this.id = data.id;
	}
}

WizzardDMDS.Campanas = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
//        this.id = data.id;
	}
}
WizzardDMDS.EnviosTot = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
//        this.id = data.id;
	}
}
WizzardDMDS.Envios = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
//        this.id = data.id;
	}
}

WizzardDMDS.Users = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
//        this.id = data.id;
	}
}
WizzardDMDS.Perfil = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
	}
}
WizzardDMDS.UP = function(data){
	this.info = new Object();
	if(typeof data !== "undefined"){
		this.info = data;
	}
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}