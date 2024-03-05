const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../data/db');
const { mode } = require('crypto-js');
const path = require('path');
const fs = require('fs');
const NumberControl = require('../middleware/NumberControl');
const { render } = require('ejs');
const resultControl = require('../middleware/ResultControl')

router.get('/',(req,res)=>{
    db.query('SELECT proje_urun_resim.resimArkaPlan, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId order by urunId desc limit 8',[],function(error,result,field){
        if(error) throw error;
        if(result.length > 0){
            db.query('select *from iletisim',[],function(error2,resultiletisim,field){
                if(error2) throw error2;
                if(resultiletisim.length > 0){
                    res.render('main',{result,resultiletisim})
                }else{
                    resultiletisim = [];
                    res.render('main',{result,resultiletisim})
                }
            })
        }else{
            db.query('select *from iletisim',[],function(error2,resultiletisim,field){
                if(error2) throw error2;
                if(resultiletisim.length > 0){
                    result = [];
                    res.render('main',{result,resultiletisim})
                }else{
                    result = [];
                    resultiletisim = [];
                    res.render('main',{result,resultiletisim})
                }
            })
            
        }
    })
})

router.get('/Projelerimiz',(req,res)=>{
    // proje sayfası kodları burada olacak
    db.query('select *from proje_kategori',[],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            db.query('select *from iletisim',[],function(error2,resultiletisim,field){
                if(error2) throw error2;
                if(resultiletisim.length > 0){
                    db.query('SELECT proje_urun_resim.resimArkaPlan, proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId',[],function(error3,resultProje,field){
                        if(error3) throw error3;

                        if(resultProje.length>0){
                            res.render('BlogProje',{result,resultiletisim,resultProje})
                        }else{
                            resultProje = [];
                            res.render('BlogProje',{result,resultiletisim,resultProje})   
                        }
                    })
                    
                }else{
                    db.query('SELECT proje_urun_resim.resimArkaPlan, proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId',[],function(error3,resultProje,field){
                        if(error3) throw error3;

                        if(resultProje.length>0){
                            res.render('BlogProje',{result,resultiletisim,resultProje})
                        }else{
                            resultProje = [];
                            resultiletisim = [];
                            res.render('BlogProje',{result,resultiletisim,resultProje})   
                        }
                    })
                }
            })
        }else{
            db.query('select *from iletisim',[],function(error2,resultiletisim,field){
                if(error2) throw error2;
                if(resultiletisim.length > 0){
                    db.query('SELECT proje_urun_resim.resimArkaPlan, proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId',[],function(error3,resultProje,field){
                        if(error3) throw error3;

                        if(resultProje.length>0){
                            result = [];
                            res.render('BlogProje',{result,resultiletisim,resultProje})
                        }else{
                            result = [];
                            resultProje = [];
                            res.render('BlogProje',{result,resultiletisim,resultProje})   
                        }
                    })
                }else{
                    db.query('SELECT proje_urun_resim.resimArkaPlan, proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId',[],function(error3,resultProje,field){
                        if(error3) throw error3;

                        if(resultProje.length>0){
                            result = [];
                            resultiletisim = [];
                            res.render('BlogProje',{result,resultiletisim,resultProje})
                        }else{
                            result = [];
                            resultProje = [];
                            resultiletisim = [];
                            res.render('BlogProje',{result,resultiletisim,resultProje})   
                        }
                    })
                }
            })
            
        }
    })
})


router.get('/Projelerimiz/:kategoriAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd;
    db.query('select *from proje_kategori',[],function(err1,result,field){
        if(err1) throw err1;

        if(result.length>0){
            db.query('select *from iletisim',[],function(error,resultiletisim,field){
                if(error) throw error;
        
                if(resultiletisim.length>0){
                    db.query('select *from proje_kategori where kategoriAd=?',[kategoriAd],function(err,resultKategori,field){
                        if(err) throw err;
                
                        if(resultKategori.length>0){
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;
        
                                if(resultProje.length > 0){
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }else{
                                    resultProje = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }
                            })
                        }else{
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;

                                if(resultProje.length > 0){
                                    res.render('BlogProje',{result,resultProje,resultiletisim})
                                }else{
                                    resultProje = []
                                    res.render('BlogProje',{result,resultProje,resultiletisim})   
                                }
                            })
                        }
                    })
                }else{
                    db.query('select *from proje_kategori where kategoriAd=?',[kategoriAd],function(err,resultKategori,field){
                        if(err) throw err;
                
                        if(resultKategori.length>0){
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;
        
                                if(resultProje.length > 0){
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }else{
                                    resultProje = [];
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }
                            })
                        }else{
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;

                                if(resultProje.length > 0){
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultProje,resultiletisim})
                                }else{
                                    resultProje = [];
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultProje,resultiletisim})   
                                }
                            })
                        }
                    })
                }
            })
        }else{
            db.query('select *from iletisim',[],function(error,resultiletisim,field){
                if(error) throw error;
        
                if(resultiletisim.length>0){
                    db.query('select *from proje_kategori where kategoriAd=?',[kategoriAd],function(err,resultKategori,field){
                        if(err) throw err;
                
                        if(resultKategori.length>0){
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;
        
                                if(resultProje.length > 0){
                                    result = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }else{
                                    resultProje = [];
                                    result = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }
                            })
                        }else{
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;

                                if(resultProje.length > 0){
                                    result = [];
                                    res.render('BlogProje',{result,resultProje,resultiletisim})
                                }else{
                                    resultProje = []
                                    result = [];
                                    res.render('BlogProje',{result,resultProje,resultiletisim})   
                                }
                            })
                        }
                    })
                }else{
                    db.query('select *from proje_kategori where kategoriAd=?',[kategoriAd],function(err,resultKategori,field){
                        if(err) throw err;
                
                        if(resultKategori.length>0){
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;
        
                                if(resultProje.length > 0){
                                    result = [];
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }else{
                                    resultProje = [];
                                    result = [];
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultiletisim,resultProje})
                                }
                            })
                        }else{
                            db.query('SELECT proje_urun_resim.resimArkaPlan,proje_urun.kategoriId, proje_urun.projeAd, proje_urun.projeAciklama, proje_urun.urunId from proje_urun INNER JOIN proje_urun_resim ON proje_urun.urunId = proje_urun_resim.urunId where kategoriId=?',[resultKategori[0].kategoriId],function(error2,resultProje,field){
                                if(error2) throw error2;

                                if(resultProje.length > 0){
                                    result = [];
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultProje,resultiletisim})
                                }else{
                                    resultProje = [];
                                    result = [];
                                    resultiletisim = [];
                                    res.render('BlogProje',{result,resultProje,resultiletisim})   
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    
    
})


router.get('/Projelerimiz/:kategoriAd/:projeAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd
    const projeAd = req.params.projeAd
    let kategoriId;
    let urunId;
    db.query('select *from iletisim',[],function(err,resultiletisim,field){
        if(err) throw err;

        if(resultiletisim.length > 0){
            db.query('select *from proje_kategori where kategoriAd=?',[kategoriAd],function(error,resultKategori,field){
                if(error) throw error;

                db.query('select *from proje_urun where kategoriId=? and projeAd=?',[resultKategori[0].kategoriId,projeAd],function(error1,resultProjeId,field){
                    if(error1) throw error1;

                    db.query('select *from proje_urun where urunId=?',[resultProjeId[0].urunId],function(error2,resultProje,field){
                        if(error2) throw error2;
                        if(resultProje.length > 0){
                            db.query('select *from proje_urun_resim where urunId=?',[resultProjeId[0].urunId],function(error3,resultResim,field){
                                if(error3) throw error3;

                                if(resultResim.length > 0){
                                    resultResim=resultControl(resultResim[0])
                                    console.log(resultResim)
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }else{
                                    resultResim = []
                                    resultResim=resultControl(resultResim[0])
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }
                            })
                        }else{
                            db.query('select *from proje_urun_resim where urunId=?',[resultProjeId[0].urunId],function(error3,resultResim,field){
                                if(error3) throw error3;

                                if(resultResim.length > 0){
                                    resultProje = []
                                    resultResim=resultControl(resultResim[0])
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }else{
                                    resultProje = []
                                    resultResim = []
                                    resultResim=resultControl(resultResim[0])
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }
                            })
                        }
                    })
                })
            })
        }else{
            db.query('select *from proje_kategori where kategoriAd=?',[kategoriAd],function(error,resultKategori,field){
                if(error) throw error;

                db.query('select *from proje_urun where kategoriId=? and projeAd=?',[resultKategori[0].kategoriId,projeAd],function(error1,resultProjeId,field){
                    if(error1) throw error1;

                    db.query('select *from proje_urun where urunId=?',[resultProjeId[0].urunId],function(error2,resultProje,field){
                        if(error2) throw error2;
                        if(resultProje.length > 0){
                            db.query('select *from proje_urun_resim where urunId=?',[resultProjeId[0].urunId],function(error3,resultResim,field){
                                if(error3) throw error3;                                
                                if(resultResim.length > 0){
                                    resultResim=resultControl(resultResim[0])
                                    resultiletisim = []
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }else{
                                    resultResim = []
                                    resultiletisim = []
                                    resultResim=resultControl(resultResim[0])
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }
                            })
                        }else{
                            db.query('select *from proje_urun_resim where urunId=?',[resultProjeId[0].urunId],function(error3,resultResim,field){
                                if(error3) throw error3;

                                if(resultResim.length > 0){
                                    resultProje = []
                                    resultResim=resultControl(resultResim[0])
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }else{
                                    resultProje = []
                                    resultResim = []
                                    resultResim=resultControl(resultResim[0])
                                    res.render('BlogProjeDetay',{resultProje,resultiletisim,resultResim})
                                }
                            })
                        }
                    })
                })
            })
        }
    })
})



router.get('/BitkiYonetim',(req,res)=>{
    db.query('select *from bitki_kategori',[],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            res.render('deneme',{result})
        }else{
            result = [];
            res.render('ilgiliBlogSayfaAdı',{result})
        }
    })
})

router.get('/BitkiYonetim/:kategoriAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd;

    db.query('Select kategoriId from bitki_kategori where kategoriAd=?',[kategoriAd],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            let kategoriId = result[0].kategoriId;
            db.query('select *from bitki_urun where kategoriId=?',[kategoriId],function(error2,result2,field){
                if(error2) throw error2;

                if(result2.length > 0){
                    res.render('deneme2',{result2,kategoriAd})
                }else{
                    result2 = [];
                    res.render('deneme2',{result2,kategoriAd})
                }
            })
        }else{
            result = [];
            res.render('İlgiliBlogSayfaAdı',{result,kategoriAd})
        }
    })
})


router.get('BitkiYonetim/:kategoriAd/:bitkiAd',(req,res) => {
    const kategoriAd = req.params.kategoriAd;
    const bitkiAd = req.params.bitkiAd;
    let kategoriId;
    let urunId;

    db.query('select kategoriId from bitki_kategori where kategoriAd=?',[kategoriAd],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            kategoriId = result[0].kategoriId;
            db.query('selecet urunId from bitki_urun where kategoriId=? and bitkiAd=?',[kategoriId,bitkiAd],function(error2,result2,field){
                if(error2) throw error2;

                if(result2.length > 0){
                    urunId = result2[0].urunId;
                    db.query('select *from bitki_urun where urunId=?',[urunId],function(error3,result3,field3){
                        if(error3) throw error3;

                        if(result3.length > 0){
                            res.render('ilgiliBlogSayfaAdı',{result3,kategoriAd,bitkiAd})
                        }else{
                            result3=[];
                            res.render('ilgiliBlogSayfaAd',{result3,kategoriAd,bitkiAd})
                        }
                    })
                }else{
                    result2 = [];
                    res.render('ilgiliBlogSayfaAd',{result2,kategoriAd,bitkiAd})
                }
            })
        }else{
            result = [];
            res.render('ilgiliBlogSayfaAd',{result,kategoriAd,bitkiAd})
        }
    })
})


router.get('/KenteselTasarim',(req,res)=>{
    db.query('select *from kentseltasarim_kategori',[],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            res.render('deneme',{result})
        }else{
            result = [];
            res.render('ilgiliBlogSayfaAdı',{result})
        }
    })
})

router.get('/KenteselTasarim/:kategoriAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd;

    db.query('Select kategoriId from kentseltasarim_kategori where kategoriAd=?',[kategoriAd],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            let kategoriId = result[0].kategoriId;
            db.query('select *from kentseltasarim_kategori where kategoriId=?',[kategoriId],function(error2,result2,field){
                if(error2) throw error2;

                if(result2.length > 0){
                    res.render('deneme2',{result2,kategoriAd})
                }else{
                    result2 = [];
                    res.render('deneme2',{result2,kategoriAd})
                }
            })
        }else{
            result = [];
            res.render('İlgiliBlogSayfaAdı',{result,kategoriAd})
        }
    })
})

router.get('/KenteselTasarim/:kategoriAd/:bitkiAd',(req,res) => {
    const kategoriAd = req.params.kategoriAd;
    const bitkiAd = req.params.bitkiAd;
    let kategoriId;
    let urunId;

    db.query('select kategoriId from kentseltasarim_kategori where kategoriAd=?',[kategoriAd],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            kategoriId = result[0].kategoriId;
            db.query('selecet urunId from kentseltasarim_urun where kategoriId=? and bitkiAd=?',[kategoriId,bitkiAd],function(error2,result2,field){
                if(error2) throw error2;

                if(result2.length > 0){
                    urunId = result2[0].urunId;
                    db.query('select *from kentseltasarim_urun where urunId=?',[urunId],function(error3,result3,field3){
                        if(error3) throw error3;

                        if(result3.length > 0){
                            res.render('ilgiliBlogSayfaAdı',{result3,kategoriAd,bitkiAd})
                        }else{
                            result3=[];
                            res.render('ilgiliBlogSayfaAd',{result3,kategoriAd,bitkiAd})
                        }
                    })
                }else{
                    result2 = [];
                    res.render('ilgiliBlogSayfaAd',{result2,kategoriAd,bitkiAd})
                }
            })
        }else{
            result = [];
            res.render('ilgiliBlogSayfaAd',{result,kategoriAd,bitkiAd})
        }
    })
})



router.get('/Portfoy',(req,res)=>{
    db.query('select *from portfoy',[],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            res.render('ilgiliBlogSayfaAdı',{result})
        }else{
            result = [];
            res.render('ilgiliBlogSaygaAdı',{result})
        }
    })
})


router.get('/Iletisim',(req,res)=>{
    db.query('Select *from iletisim',[],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            res.render('ilgiliBlogSaufaAdı',{result})
        }else{
            result = [];
            res.render('ilgiliblogsayfaAdı',{result})
        }
    })
})


router.get('/WebGunlugu',(req,res)=>{
    db.query('select *from webgunlugu',[],function(error,result,field){
        if(error) throw error;

        if(result.length>0){
            res.render('ilgiliblogsayfaadı',{result})
        }else{
            result = [];
            res.render('ilgiliblogsayfaAdı',{result})
        }
    })
})

module.exports = router;
