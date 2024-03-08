function arrayControl(array){
    const filteredObj = {};
    for (const key in array) {
        if (array[key] !== 'null') {
            filteredObj[key] = array[key];
        }
    }
    return filteredObj;
}


module.exports = arrayControl;

