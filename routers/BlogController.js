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

router.get('/',(req,res)=>{
    res.render('main')
})

router.get('/Projeler',(req,res)=>{
    // proje sayfası kodları burada olacak
    db.query('select *from proje_kategori',[],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            res.render('deneme',{result})
            //res.json({ success: true, message: 'Get isteği başarılı bir şekilde alındı' })
        }else{
            result = [];
            res.render('deneme',{result})
           // res.json({ success: false, message: 'Veritabanında kategori bulunamadı' })
        }
    })
})


router.get('/Projeler/:kategoriAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd;
    db.query('select kategoriId from proje_kategori where kategoriAd=?',[kategoriAd],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            let kategoriId = result[0].kategoriId;
            console.log(kategoriAd,kategoriId);
            db.query('select *from proje_urun where kategoriId=?',[kategoriId],function(error2,result2,field2){
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
            res.render('deneme2',{result,kategoriAd})
        }
    })
})

router.get('/Projeler/:kategoriAd/:projeAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd
    const projeAd = req.params.projeAd
    let kategoriId;
    let urunId;

    db.query('select kategoriId from proje_kategori where kategoriAd = ?',[kategoriAd],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            kategoriId = result[0].kategoriId;

            db.query('select urunId from proje_urun where projeAd = ? and kategoriId=?',[projeAd,kategoriId],function(error2,result2,field){
                if(error2) throw error2;
        
                if(result2.length > 0){
                    urunId = result2[0].urunId;
                    db.query('select *from proje_urun where kategoriId=? and urunId=?',[kategoriId,urunId],function(error3,result3,field3){
                        db.query('select *from proje_urun_resim where urunId=?',[urunId],function(error4,result4,field4){
                            res.render('deneme3',{result3,result4})
                        })
                    })
                }else{
                    // hata mesajı göndermek lazım
                }
            })
        }else{
            // hata mesajı göndermek lazım
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
                    console.log(result2);
                    res.render('deneme2',{result2,kategoriAd})
                }else{
                    console.log(result2);
                    result2 = [];
                    console.log(result2);
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