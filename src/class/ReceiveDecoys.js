import Config from './../Config';

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
            console.log('demora en ' + item + ': ' + this.delay);

        } while (this.delay < Config.umbral && files.length != 0);

    }

    async execute(size) {

        this.delay = 0;
        var t1 = new Date().getTime();
        var t2 = t1;
        return $.ajax(
                {
                    url: "upload",
                    processData: false,
                    method: "POST",
                    data: ReceiveDecoys.getBytes(size)
                })
                .done(() => {
                    t2 = new Date().getTime();
                    this.delay = t2 - t1;
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
