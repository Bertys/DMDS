Vue.use(VueMaterial)


Vue.material.registerTheme({
  default: {
    primary: 'blue-grey',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  },
})

var campanas= [];
var envios= [];
var enviosTot= [];
var detEnvKey= [];
var detEnvVal= [];

var example2 = new Vue({
  el: '#file-list',
  data: {
    parentMessage: 'Campana',
    listCamp: campanas,
    listEnv: envios,
    listEnvTot: enviosTot,
    detallesEnvKey: detEnvKey,
    detallesEnvVal: detEnvVal
  },
  methods: {
//      cargarNuevo: function() {
//          myFunction();
//  }
      openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    },
      dateFormat(data){
      var mifecha = moment(data).format('DD/MM/YY');  
          return mifecha;
      }
  }
})


//setTimeout(myFunction, 3000);
