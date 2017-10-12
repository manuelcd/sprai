var fs = require('fs')

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = function (size = '', path = 'decoys') {
    var data = ""
    let ext = 'zip';
    
    if (path == 'decoys') {
        ext = 'jpg';
    }
    
    
    data =  fs.readFileSync('./static/'+ path +'/' + size + '.' + ext);
    
    return data.toString('base64');
};

