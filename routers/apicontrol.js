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


router.post('/Projelerimiz/KategoriAdi',(req,res)=>{
    let kategoriId = req.body.degisken;

    db.query('select *from proje_kategori where kategoriId=?',[kategoriId],function(err,data,field){
        if(err) 
        throw err;

        if(data.length > 0){
            res.json({ data: data[0].kategoriAd });
        }else{
            res.json({succes:false, message:'Veri Bulunamadı'})
        }
    })
})


router.post('/Bitkilerimiz',(req,res)=>{

    let urunId = req.body.urunId;
    let kategoriId = req.body.kategoriId;

    db.query('select *from bitki_urun where urunId=? and kategoriId=?',[urunId,kategoriId],function(error,result,field){
        if(error) throw error;

        if(result.length > 0){
            console.log('\n\n\nBunu arıyorum',result[0])
            res.json({ data: result[0] });
        }else{
            res.json({succes:false, message:'Veri Bulunamadı'})
        }
    })

})

module.exports = router;