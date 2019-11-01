const crypto = require('crypto');
let hash = crypto.createHash('md5');
hash.update('Mary has a cute lamb.');

// let sum = hash.digest('hex');
// console.log(sum);

hash.update('The quick fox jumps over the lazy dog.');
hash.update('To be or not to be, this is a question!');

let sum = hash.digest('hex');
sum = hash.digest('hex');
console.log(sum);
