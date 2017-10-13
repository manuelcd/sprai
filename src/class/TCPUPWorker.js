import Config from './../Config';
class TCPUPWorker {

    constructor(cfg) {
        this.cfg = cfg;
    }

    exec(func) {
        this.func = func;
    }

    async run() {

        this.measures = [];

        // Forma síncrona
        for (var i = 0; i < this.cfg.THREAD_PACK_SIZE; i++) {

            this.measures[i] = [];
//            console.log('subPaso: ' + i);
            await this.executeSec(i)
//             console.log('paso: ' + i)
        }

        return {
            measures: this.measures,
            threads: this.cfg.THREAD_PACK_SIZE,
            pckg: this.cfg.PACKS_PER_THREAD,
            fileSize: this.cfg.ARCHIVO_PRUEBA};


    }

    async resolve() {
        console.log(JSON.stringify(this.measures))
    }

    async executeSec(i) {
        let promises = []

        for (var j = 0; j < this.cfg.PACKS_PER_THREAD; j++) {
            promises.push(this.executePararel(this.cfg.ARCHIVO_PRUEBA, i, j));
        }

        return Promise.all(promises).then(() => {

            console.log('=======================================================================')
        });
    }

    async executePararel(path, i, j) {

        var tt = [];
        tt.push((new Date()).getTime());
        return $.ajax("resources/" + path)
                .done(() => {
                    tt.push((new Date()).getTime())
                    console.log('Hilo' + i + ' Pqt' + j);
                    console.log('t1=' + tt[0] + ' ms')
                    console.log('t2=' + tt[1] + ' ms')
                    console.log('--------------------------------------')
                    
                    this.measures[i].push(tt);

                });
    }

    static friedlyConsoleForm(times) {

    }

}

export default TCPUPWorker;
