import Config from './../Config';
class TCPUPWorker {

    exec(func) {
        this.func = func;
    }

    async run() {
        
        this.measures = [];
        this.measures2 = [];
        
        var tthis = this;
        
        console.log('Entró a Run');
        
        // Forma síncrona
        for (var i = 0; i < Config.THREAD_PACK_SIZE; i++) {
            tthis.measures[i] = [];
            console.log('t1:' + i)
            console.log('iteración Pack_size' + i)
            for (var j = 0; j < Config.PACKS_PER_THREAD; j++) {

                var tt = [];

                tt.push((new Date()).getTime());
                (function (ii, ttt) {
                    $.ajax("resources/" + Config.ARCHIVO_PRUEBA)
                            .then(function (u, h, o) {
                                console.log('En paralelo')
                                return o;
                            }).done(function () {
                        console.log('t2:' + ii)

                        ttt.push((new Date()).getTime());
                        tthis.measures[ii].push(ttt)

                    });
                }(i, tt))

            }
        }
    }

    async resolve() {
        console.log(JSON.stringify(this.measures))
    }

}

export default TCPUPWorker;
