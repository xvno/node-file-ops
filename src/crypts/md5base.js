const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const hash = crypto.createHash('md5');
let updatable = true;
let digest = '';
module.exports = {
    update(str) {
        if (str && typeof str === 'string' && str.length > 0) {
            if (updatable) {
                hash.update(str);
            } else {
                return digest;
            }
        }
    },

    digest(digestType = 'hex') {
        if (updatable) {
            updatable = false;
            return (digest = hash.digest(digestType));
        } else {
            return digest;
        }
    },

    getStrMD5(str, digestType = 'hex') {
        if (str && typeof str === 'string' && str.length > 0) {
            let h = crypto.createHash('md5');
            h.update(str);
            return h.digest(digestType);
        } else {
            throw new Error('Invalid input: string expected!');
        }
    },

    getFileMD5(filePath, cb) {
        let h = crypto.createHash('md5');
        let resolvedFilePath = path.resolve(filePath);
        fs.access(resolvedFilePath, fs.constants.R_OK, function(err) {
            if (err) {
                throw err;
            }
            let length = 0;
            let rStream = fs.createReadStream(resolvedFilePath);
            rStream.on('data', function(data) {
                // console.log(data);
                length += data.length;
                h.update(data);
            });
            rStream.on('end', function() {
                cb(h.digest('hex'), length);
            });
        });
    }
};
