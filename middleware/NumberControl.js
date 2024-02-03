function kontrolEt(str) {
    var regex = /^[0-9]+$/;
    if (str.length > 0 && str.length == 11 && str[0] === '0' && regex.test(str.slice(1))) {
        return true;
    } else {
        return false;
    }
}

module.exports = kontrolEt;