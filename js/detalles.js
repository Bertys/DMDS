var c,x,z,a,b,d,g,f,h,o;

var language;
var pagina;
var numReg;
var myPag;

$(document).ready(function() {
    $("#b3").removeClass("hidden");
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });

    loadWizzard();
    myPag=3;

    c=getCookie('userEmail');
    x=getCookie('token');
    z=getCookie('idGroupSel');
    a=getCookie('idDmDsSel');
    b=getCookie('campanaId');
    d=getCookie('nameDmDsSel');
    g=getCookie('nameGroupSel');
    f=getCookie('campanaName');
    h=getCookie('envioId');
    o=getCookie('envioName');
      
    language=getCookie('language');
    pagina=getCookie('pagina');
    numReg=getCookie('numReg');
    
//myScript(language,myPag)
        

    $('#userName').html(c);
    $('#h2p3').html("Envío: "+o);

      startEnvios2();
//      envios2Mostrados();


      console.log('envio id: '+h+' envio name: '+o);
      
      window.onpopstate = function(event) {    
        if(event && event.state) {
        location.reload(); 
        }
      }

      
});
////////FIN DEL DOCUMENT READY///////////////////////////////



////////////////////////////////////////////////////////////////////////////////
/////LISTENERS XA CUANDO YA SE MOSTRARON LOS DETALLES DEL ENVIO/////////////////
function envios2Mostrados() {
    
  document.getElementById("logo").addEventListener("click", function(){
      history.pushState({urlPath:'./index.html'},"page 6",'./index.html');
      location.replace('./index.html');
  });
  document.getElementById("perfil").addEventListener("click", function(){
      history.pushState({urlPath:'./perfil.html'},"page 6",'./perfil.html');
      location.replace('./perfil.html');
});

//////////////////LOGout////////////////////////////
document.getElementById("logout3").addEventListener("click", function(){
    if (typeof x !== 'undefined') {
    var xhr = new XMLHttpRequest();
    var url = "http://dmds-users-dev.planisys.net/api/v1/logout/";
    xhr.open("POST", url, true);
    console.log("Deslogueado correctamente.");
    history.pushState({urlPath:'./index.html'},"page 6",'./index.html');
    location.replace('../index.html');
}
});

//    $('#goBack3').click(function(e) {
//        window.history.back();
//        });
    
    $('#butUsers').click(function(e) {
        history.pushState({urlPath:'./users.html'},"page 6",'./users.html');
        location.replace('./users.html');
        });
//    $('#butDmds').click(function(e) {
//      location.replace('./dmds.html');
//        });
   $('#anavCampanas').click(function(e) {
      history.pushState({urlPath:'./campanas.html'},"page 6",'./campanas.html');
      location.replace('./campanas.html');
        });
    $('#anavEnvios').click(function(e) {
      history.pushState({urlPath:'./envios.html'},"page 6",'./envios.html');
      location.replace('./envios.html');
        });
    $('#anavMailer').click(function(e) {
      history.pushState({urlPath:'../mosaico/index.html'},"page 6",'../mosaico/index.html');
      location.replace('../mosaico/index.html');
        });
    /*$('#anavViewer').click(function(e) {
      location.replace('./envios2.html');
        });*/
}


//////////////IMPRESION DEL PERFIL UNA VEZ GUARDADO COMO OBJETO EN EL WIZ////////////
function printPerfil(){
    console.log(wiz.Perfil);
}

/////////////////////////////////////////////////////////////////////////////
/////////START D LOS METODOS PARA MOSTRAR LOS DETALLES///////////////////////
/////////////////////////////////////////////////////////////////////////////
var ajx
function startEnvios2(){
    
    if(numReg==0){numReg=6;}
    var start=numReg*pagina;
    var obj={'userEmail': c,'token': x,'language':language,'numReg':numReg,'Orderby':'id','orderDir':'asc','start':start,'pagina':pagina};
    wiz.processPerfil(obj);
    
    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios2);

}

function startViewEnvio(){
    var auxOR;
    var auxCTR;
    var auxyl1;
    var auxyl2;
    
    for(i=0;i<wiz.envios.length;i++){
        if(wiz.envios[i].info.id==h){
            
            console.log(wiz.envios[i].info);

            auxyl1='<ul class="item-list floatL">';
            auxyl1+='<li class="inBl"><b>Nombre Campaña</b>: '+wiz.envios[i].info.campania.nombre+'</li>';
            auxyl1+='<li class="inBl"><b>Enviado el</b>: '+wiz.envios[i].info.timestamp+'</li>';
            auxyl1+='<li class="inBl"><b>Asunto</b>: '+wiz.envios[i].info.envio.asunto+'</li></ul><div class="clearer">&nbsp;</div>';
            
            auxyl1+='<div class="after-box"></div>';
            auxOR=wiz.envios[i].info.ev_OR;
            auxyl1+='<br><div id="myProgress1" class="">Open Rate: <div id="myBarOR">0%</div></div><br><br>';
            auxCTR=wiz.envios[i].info.ev_CTR;
            auxyl1+='<div id="myProgress2" class="">Click Rate: <div id="myBarCTR">0%</div></div>';
            
            auxyl1+='<div class="after-box"></div>';
            
            
            
//            auxyl2='<br><ul class="floatL width40"><li><b>Emails enviados</b>: '+wiz.envios[i].info.ev_envio+'</li>';
            var aa=wiz.envios[i].info.ev_envio;
//            auxyl2+='<br><li><b>Aperturas Totales</b>: '+wiz.envios[i].info.ev_vista+'</li>';
            var bb=wiz.envios[i].info.ev_vista;
//            auxyl2+='<br><li><b>Aperturas Unicas</b>: '+wiz.envios[i].info.ev_vista_unica+'</li>';
            var cc=wiz.envios[i].info.ev_vista_unica;
//            auxyl2+='<br><li><b>Clicks Totales</b>: '+wiz.envios[i].info.ev_click+'</li>';
            var dd=wiz.envios[i].info.ev_click;
//            auxyl2+='<br><li><b>Clicks Unicas</b>: '+wiz.envios[i].info.ev_click_unico+'</li>';
            var ee=wiz.envios[i].info.ev_click_unico;
//            auxyl2+='<br><li><b>Desuscripciones</b>: '+wiz.envios[i].info.ev_desuscripcion+'</li></ul>';
            var ff=wiz.envios[i].info.ev_desuscripcion;
            
//            auxyl2+='<ul class="floatR width40"><li><b>Conversiones Totales</b>: '+wiz.envios[i].info.ev_conversion+'</li>';
            var gg=wiz.envios[i].info.ev_conversion;
//            auxyl2+='<br><li><b>Conversiones Unicas</b>: '+wiz.envios[i].info.ev_conversion_unica+'</li>';
            var hh=wiz.envios[i].info.ev_conversion_unica;
//            auxyl2+='<br><li><b>Rebotes Totales</b>: '+wiz.envios[i].info.ev_rebote+'</li>';
            var ii=wiz.envios[i].info.ev_rebote;
//            auxyl2+='<br><li><b>Rebotes Duros</b>: '+wiz.envios[i].info.ev_rebote_hard+'</li>';
            var jj=wiz.envios[i].info.ev_rebote_hard;
//            auxyl2+='<br><li><b>Rebotes Blandos</b>: '+wiz.envios[i].info.ev_rebote_soft+'</li>';
            var kk=wiz.envios[i].info.ev_rebote_soft;
//            auxyl2+='<br><li><b>Feedback Loop</b>: '+wiz.envios[i].info.ev_fbl+'</li></ul>';
            var ll=wiz.envios[i].info.ev_fbl;
              
            
//            example2.detallesEnvKey=wiz.envios[i].info;
//            console.log(detEnvKey);
            detEnvKey.push({'key': 'Emails enviados:  ', 'value': wiz.envios[i].info.ev_envio});
            detEnvKey.push({'key': 'Aperturas Totales:  ', 'value': wiz.envios[i].info.ev_vista});
            detEnvKey.push({'key': 'Aperturas Unicas:  ', 'value': wiz.envios[i].info.ev_vista_unica});
            detEnvKey.push({'key': 'Clicks Totales:  ', 'value': wiz.envios[i].info.ev_click});
            detEnvKey.push({'key': 'Clicks Unicos:  ', 'value': wiz.envios[i].info.ev_click_unico});
            detEnvKey.push({'key': 'Desuscripciones:  ', 'value': wiz.envios[i].info.ev_desuscripcion});
            detEnvKey.push({'key': 'Conversiones Totales:  ', 'value': wiz.envios[i].info.ev_conversion});
            detEnvKey.push({'key': 'Conversiones Unicas:  ', 'value': wiz.envios[i].info.ev_conversion_unica});
            detEnvKey.push({'key': 'Rebotes Totales:  ', 'value': wiz.envios[i].info.ev_rebote});
            detEnvKey.push({'key': 'Rebotes Duros:  ', 'value': wiz.envios[i].info.ev_rebote_hard});
            detEnvKey.push({'key': 'Rebotes Blandos:  ', 'value': wiz.envios[i].info.ev_rebote_soft});
            detEnvKey.push({'key': 'Feedback Loop:  ', 'value': wiz.envios[i].info.ev_fbl});
            

            
            
//            auxyl2='<md-table-cell><b>Emails enviados</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_envio+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Aperturas Totales</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_vista+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Aperturas Unicas</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_vista_unica+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Clicks Totales</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_click+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Clicks Unicas</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_click_unico+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Desuscripciones</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_desuscripcion+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Conversiones Totales</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_conversion+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Conversiones Unicas</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_conversion_unica+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Rebotes Totales</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_rebote+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Rebotes Duros</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_rebote_hard+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Rebotes Blandos</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_rebote_soft+'</md-table-cell>';
//            auxyl2+='<md-table-cell><b>Feedback Loop</b>: </md-table-cell><md-table-cell md-numeric>'+wiz.envios[i].info.ev_fbl+'</md-table-cell>';
            
        
//            startCircles(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll);
//            startCharts(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll);
            startCharts2(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll);
        }
    }
    
    document.getElementById("listaenvios21").innerHTML = auxyl1;
//    document.getElementById("listaenvios22").innerHTML = auxyl2;
    move(auxOR,auxCTR);
//    setTimeout(function(){ startListy(); }, 2000);
}


/////////////////////////////////////////////////////////////////////////
/////////////////START DE LOS GRAFICOS CIRCULARES Y ANIMACIONES//////////
function startCircles(a,b,c,d,e,f,g,h,i,j,k,l){
    
    $("#titulin").html('Estadisticas sobre '+a+' e-mails enviados');
    if(a==0){
        a=1;
    }
    $("#test-circle-apTot").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Aperturas Totales',
                percent: b/a*100
           });
    
    $("#test-circle-apUn").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Aperturas Unicas',
                percent: c/a*100
           });
    
    $("#test-circle-clTot").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Clicks Totales',
                percent: d/a*100
           });
    
    $("#test-circle-clUn").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Clicks Unicos',
                percent: e/a*100
           });
    
    $("#test-circle-reTot").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Rebotes Totales',
                percent: i/a*100
           });
    
    $("#test-circle-reDu").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Rebotes Duros',
                percent: j/a*100
           });
    
    $("#test-circle-reBl").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Rebotes Blandos',
                percent: k/a*100
           });
    
    $("#test-circle-fblp").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Feedback Loop',
                percent: l/a*100
           });
    
    $("#test-circle-conv").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Conversiones',
                percent: h/a*100
           });
    
    $("#test-circle-dess").circliful({
                animationStep: 5,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 15,
                text: 'Desuscritos',
                percent: f/a*100
           });
}


function move(or,ctr) {
  var elem = document.getElementById("myBarOR");   
  var width = or;

    elem.style.width = width + '%'; 
    elem.innerHTML = width * 1  + '%';
    
    var elem2 = document.getElementById("myBarCTR");   
    var width2 = ctr;
    elem2.style.width = width2 + '%'; 
    elem2.innerHTML = width2 * 1  + '%';
}


/////////////////////PROBA HC DRILL//////////////////////
//////////////////////////////////////////////////////////

function startCharts(a,b,c,d,e,f,g,h,i,j,k,l){
    
    if(a==0){
        a=1;
    }
    
    // Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Histograma de Envío'
    },
    subtitle: {
        text: 'Estadisticas sobre '+a+' e-mails enviados'
    },
    xAxis: {
        categories: ['Datos'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Porcentaje (%)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' unidades'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
        x: 47,
        y: 55,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Aperturas Totales',
        data: [b/a*100]
    }, {
        name: 'Aperturas Unicas',
        data: [c/a*100]
    }, {
        name: 'Clicks Totales',
        data: [d/a*100]
    }, {
        name: 'Clicks Unicos',
        data: [e/a*100]
    }, {
        name: 'Rebotes Totales',
        data: [i/a*100]
    }, {
        name: 'Rebotes Duros',
        data: [j/a*100]
    }, {
        name: 'Rebotes Blandos',
        data: [k/a*100]
    }, {
        name: 'Feedback Loop',
        data: [l/a*100]
    }, {
        name: 'Conversiones',
        data: [h/a*100]
    }, {
        name: 'Desuscritos',
        data: [f/a*100]
    }]
});
}

function startCharts2(a,b,c,d,e,f,g,h,i,j,k,l){
    
    if(a==0){
        a=1;
    }
    
    // Create the chart
Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Histograma sobre '+a+' e-mails enviados'
    },
    xAxis: {
        title: {
            text: null
        },
        visible: false
    },
    yAxis: {
//        min: 0,
        title: {
            text: 'Porcentaje (%)',
            align: 'high'
        },
//        format: '{value:.2f}',
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' %'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        },
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        console.log('The value is: ' + this.y);
                    }
                }
            }
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
        x: 47,
        y: 40,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Aperturas Totales',
        data: [Math.round(b/a*100)]
    }, {
        name: 'Aperturas Unicas',
        data: [Math.round(c/a*100)]
    }, {
        name: 'Clicks Totales',
        data: [Math.round(d/a*100)]
    }, {
        name: 'Clicks Unicos',
        data: [Math.round(e/a*100)]
    },{
        name: 'Conversiones',
        data: [Math.round(h/a*100)]
    }]
});
    Highcharts.chart('container3', {
    chart: {
        type: 'bar'
    },
    title: {
        text: null
    },
    xAxis: {
        title: {
            text: null
        },
        visible: false
    },
    yAxis: {
        title: {
            text: 'Porcentaje (%)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' %'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        },
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        console.log('The value is: ' + this.y);
                    }
                }
            }
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
        x: 47,
        y: 0,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Rebotes Totales',
        data: [Math.round(i/a*100)]
    }, {
        name: 'Rebotes Duros',
        data: [Math.round(j/a*100)]
    }, {
        name: 'Rebotes Blandos',
        data: [Math.round(k/a*100)]
    },{
        name: 'Desuscritos',
        data: [Math.round(f/a*100)]
    },{
        name: 'Feedback Loop',
        data: [Math.round(l/a*100)]
    }]
});

}