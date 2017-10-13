import Config from './../Config';
var numeral = require('numeral');

class ReceiveDecoys {

    static filesName() {
        return [8192, 32768, 76800];

    }

    static fileSize() {
        return [131072.0, 524288.0, 2097152.0];
    }

    constructor() {

    }

    async run() {

        let files = ReceiveDecoys.filesName();
        let fileSize = ReceiveDecoys.fileSize();

        do {

            var item = files.shift();
            var itemSize = fileSize.shift();
            $('#print-res ').append(item + ' - - ' + itemSize + '<br/>')
            let response = await this.execute(item)
            this.delay = response.t2-response.t1;
            
            console.log('Subiendo ' + item + ' (Bytes)');
            console.log('t1=' + response.t1.getTime() + ' ms')
            console.log('t2=' + response.t2.getTime() + ' ms')
            console.log('Tiempo de demora =' + this.delay + ' ms')
            console.log('=======================================================');

        } while (this.delay < Config.umbral && files.length != 0);

    }

    async execute(size) {

        this.delay = 0;
        var t1 = new Date();
        var t2 = t1;
        return $.ajax(
                {
                    url: "upload",
                    processData: false,
                    method: "POST",
                    data: ReceiveDecoys.getBytes(size)
                })
                .then(() => {
                    t2 = new Date();
                    return {t1: t1, t2: t2};
                })
                .fail(function () {
                    console.log("error");
                })
    }

    static getBytes(size) {

        var buffer = new ArrayBuffer(size);
        var longInt8View = new Uint8Array(buffer);

        return buffer;
    }

}


export default ReceiveDecoys;
