import Vue from 'vue'

var appOptions = require('./player/main.vue');
window.addEventListener("load", function(){
    var app = new Vue(appOptions).$mount('#app');
}, false);

