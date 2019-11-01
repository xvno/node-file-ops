const { simplerFileSize, simplerTimespan } = require('../../utils/nums');
const md5base = require('./md5base');
let startTS = Date.now();

const paths = [
    'raw/R1_600k.mp4',
    'raw/R5_600k.mp4',
    'raw/R10.mp4',
    'raw/A004C014_160226_R4RF.mov'
];
let len = paths.length;
let idx = 0;

function next() {
    if (idx < len) {
        let filePath = paths[idx++];
        md5base.getFileMD5(filePath, function(md5, fileSize = 0) {
            let duration = Date.now() - startTS;
            console.log(
                `${simplerFileSize(fileSize)}B - ${simplerTimespan(
                    duration
                )}: ${md5}`
            );
            next();
        });
    }
}

next();
