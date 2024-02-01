const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../data/db');
const { mode } = require('crypto-js');

router.get('/bitkiyonetim',(req,res)=>{

    if(req.session.user == null){
        res.redirect('/login')
    }else{
        res.render('AdminBitkiYönetim')
    }
    
})

router.post('/bitkiyonetim/kategoriEkle',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        let kategoriAdi = req.body.kategoriEkle;
        console.log(kategoriAdi)
        db.query('insert into bitki_kategori (kategoriAd) values (?)',[kategoriAdi],function(error,result,field){
            if(error) throw error;
            console.log(1)
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})

router.get('/iletisim',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        res.render('AdminİletişimBilgiYönetim')
    }
    
})

module.exports = router;