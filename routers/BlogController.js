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
    // anasayfa kodları burada olacak
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
                    console.log(kategoriAd,kategoriId,projeAd,urunId)

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


module.exports = router;