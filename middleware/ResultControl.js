function arrayControl(array){
    const filteredObj = {};
    for (const key in array) {
        if (array[key] !== 'null') {
            filteredObj[key] = array[key];
        }
    }
    console.log(filteredObj)
    return filteredObj;
}

const data = {
    resim1: 'images[]-1709726476283-129355134.jpg',
    resim2: 'images[]-1709726476285-381860482.jpg',
    resim3: 'images[]-1709726476285-293079501.jpg',
    resim4: 'images[]-1709726476285-100927854.jpg',
    resim5: 'images[]-1709726476285-518417339.jpg',
    resim6: 'images[]-1709726476285-513474002.jpg',
    resim7: 'images[]-1709726476285-119692576.jpg',
    resim8: 'null',
    resim9: 'null'
};

module.exports = arrayControl;

