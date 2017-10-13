import Config from './../Config';
var numeral = require('numeral');

class SendDecoys {

    static filesName() {
        return ['128kbits', '512kbits', '2mbits'];

    }

    static fileSize() {
        return [131072.0, 524288.0, 2097152.0];
    }

    constructor() {
        console.log('[[[[ ----Descarga de señuelos--- ]]]]');
    }

    async run() {

        let files = SendDecoys.filesName();
        let fileSize = SendDecoys.fileSize();

        do {

            let item = files.shift();
            let itemSize = fileSize.shift();
            $('#print-res ').append(item + ' - - ' + itemSize + '<br/>')
            let response = await this.execute(item)
            this.delay = response.t2-response.t1;
            
            console.log('Descargando ' + item + ' (' + itemSize + ').');
            console.log('t1=' + response.t1.getTime() + ' ms')
            console.log('t2=' + response.t2.getTime() + ' ms')
            console.log('Tiempo de demora =' + this.delay + ' ms')
            console.log('=======================================================');
        } while (this.delay < Config.umbral && files.length != 0);
        
        
        return 'algún resuldado';

    }

    async execute(item) {

        this.delay = 0;
        var t1 = new Date();
        var t2 = t1;
        return $.ajax("decoys/" + item)
                .then(() => {
                    
                    t2 = new Date();
                    return {t1: t1, t2: t2};
                })
                .fail(function () {
                    console.log("error");
                })
    }
}


export default SendDecoys;
