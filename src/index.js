var $ = require("jquery");
import Config from './Config';
//import TCPUPWorker from './class/TCPUPWorker';
//import SendDecoys from './class/SendDecoys';
import ReceiveDecoys from './class/ReceiveDecoys';
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

    $('#btn').click(() => {

        (new ReceiveDecoys()).run().then(() => {
            console.log('WAZAWAZA')
        });
//        let promise = (new SendDecoys())
//                .run()
//                .then(function () {
//                    console.log('Subida');
//                    return (new TCPUPWorker()).run()
//                })
//                .then(v => {
//                    console.log('---------------' + JSON.stringify(v))
//                }).then(() => {
//                    console.log('Bajada');
//                });
    });
});
