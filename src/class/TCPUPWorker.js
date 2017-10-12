import Config from './../Config';
class TCPUPWorker {

    exec(func) {
        this.func = func;
    }

    async run() {

        this.measures = [];
        
        // Forma síncrona
        for (var i = 0; i < Config.THREAD_PACK_SIZE; i++) {
            
            this.measures[i] = [];
//            console.log('subPaso: ' + i);
             await this.executeSec(i)
//             console.log('paso: ' + i)
        }
        
        return this.measures;
        
        
    }

    async resolve() {
        console.log(JSON.stringify(this.measures))
    }

    async executeSec(i) {
        let promises = []
        
        for (var j = 0; j < Config.PACKS_PER_THREAD; j++) {
            promises.push(this.executePararel(Config.ARCHIVO_PRUEBA, i, j));
        }

        return Promise.all(promises).then(() => {
           
            
        });
    }

    async executePararel(path, i, j) {
        
        var tt = [];
        tt.push((new Date()).getTime());
        return $.ajax("resources/" + path)
                .done(() => {
                    tt.push((new Date()).getTime())
                    this.measures[i].push(tt);

                });
    }

}

export default TCPUPWorker;
