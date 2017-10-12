var $ = require("jquery");
import Config from './Config';
import TCPUPWorker from './class/TCPUPWorker';
import SendDecoys from './class/SendDecoys';
var io = require("socket.io-client");
//var bs = require('bootstrap') ;
import 'bootstrap/dist/css/bootstrap.min.css';
var e = require('./newcss.css');

var socket = io();

var files = ['128kbits', '512kbits', '2mbits'];

var fileSize = [131072.0, 524288.0, 2097152.0];


let THREAD_PACK_SIZE = 3; // consecutivos
let PACKS_PER_THREAD = 2; // Paralelos

let ARCHIVO_PRUEBA = '114Kbits-S'

//Límite de espera 10 seg
var umbral = 10000;

$(document).ready(() => {



    $('#btn').click(function () {
        var def = $.Deferred();
        $.when(def).then(function () {
            console.log('Paso 01');
            var obj = new SendDecoys();
            var def = obj.run();

            return def;

        }).then(function () {
            console.log('Paso 02');

            var obj = new TCPUPWorker();

            var d = $.Deferred();
            d.then(function () {
                console.log('Envío y Recepción de paquetes terminado');
                obj.run()
            })
                    .then(function () {
                        console.log('Calculando')
                        setTimeout(function () {
                            obj.resolve();
                        }, 90000)
                        console.log('Cáculo terminado');
                    })
            d.resolve();
            return d
            console.log('dddddddd');
        }).then(function () {
            // bajada
        });
        def.resolve();

    });







});
