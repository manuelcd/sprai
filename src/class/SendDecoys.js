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

    async run() {

        let files = SendDecoys.filesName();
        let fileSize = SendDecoys.fileSize();

        do {

            let item = files.shift();
            let itemSize = fileSize.shift();
            $('#print-res ').append(item + ' - - ' + itemSize + '<br/>')
            let response = await this.execute(item)
            console.log('demora en ' + item + ': ' + this.delay);

        } while (this.delay < Config.umbral && files.length != 0);

    }

    async execute(item) {

        this.delay = 0;
        var t1 = new Date().getTime();
        var t2 = t1;
        return $.ajax("decoys/" + item)
                .done(() => {
                    t2 = new Date().getTime();
                    this.delay = t2 - t1;
                })
                .fail(function () {
                    console.log("error");
                })
    }
}


export default SendDecoys;
