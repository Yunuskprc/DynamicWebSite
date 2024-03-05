data = [{
    resim1:'deneme',
    resim2:'deneme2',
    resim3:'deneme3'
}]

function denemeee(){
    let sayac = 0;
    console.log(data[0].length)
    for(i=1;i<=data.length;i++){
        sayac = 'resim'+i

        console.log(data[0][sayac])
    }
}

denemeee();