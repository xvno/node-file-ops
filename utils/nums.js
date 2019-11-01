module.exports = {
    simplerFileSize(bytes) {
        const digitMark = ' KMGTP'.split('');
        let inNum = parseFloat(bytes);
        if (isNaN(inNum) || typeof inNum !== 'number' || inNum <= 0) {
            return NaN;
        } else {
            let times = 0;
            let pre = inNum;
            let ret = 0;
            while ((ret = pre / 1000) >= 1.0) {
                times++;
                pre = ret;
            }
            pre = pre.toFixed(2);
            let regulated = `${pre} ${digitMark[times]}`;
            return regulated;
        }
    },
    simplerTimespan(timespan) {
        const digitMark = ['ms', 's', 'min', 'hour(s)', 'day(s)'];
        const digitAcc = [1000, 60, 60, 24];

        let inNum = parseFloat(timespan);
        if (isNaN(inNum) || typeof inNum !== 'number' || inNum <= 0) {
            return NaN;
        } else {
            let times = 0;
            let digi = digitAcc[times];
            let pre = inNum;
            let ret = 0;
            while ((ret = pre / digi) >= 1.0) {
                times++;
                digi = digitAcc[times];
                pre = ret;
            }
            pre = pre.toFixed(2);
            let regulated = `${pre} ${digitMark[times]}`;
            return regulated;
        }
    }
};
