import Config from './../Config';

class SendDecoys {

    static filesName() {
        return ['128kbits', '512kbits', '2mbits'];

    }

    static fileSize() {
        return [131072.0, 524288.0, 2097152.0];
    }

    constructor() {
        
    }

    run() {

        let files = SendDecoys.filesName();
        let fileSize = SendDecoys.fileSize();

        do {

            var t1 = new Date();
            var t2 = t1;

            var delay = 0;

            var item = files.shift();
            var itemSize = fileSize.shift();

            $('#print-res ').append(item + ' - - ' + itemSize + '<br/>')

            var jqxhr = $.ajax("decoys/" + item)
                    .done(function () {
                        console.log('hecho');
                    })
                    .fail(function () {
                        console.log("error");
                    })
                    .always(function () {
                        console.log('midiendo');
                        t2 = new Date();
                        delay = t2 - t1;

                        console.log('Demora en ' + item + ': ' + delay)

                        //enviar ajax
                        //console.log('verdadro ' + (delay < Config.umbral) + ' ------ ' + (files.length != 0));


                    });

        } while (delay < Config.umbral && files.length != 0);

        return jqxhr;

    }
}


export default SendDecoys;
