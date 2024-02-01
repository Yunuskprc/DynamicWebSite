const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../data/db');
const { mode } = require('crypto-js');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');


// multer ile resim depolama
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Web Proje/public/image');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
});
const upload = multer({ storage: storage });



//get metod
router.get('/bitkiyonetim',(req,res)=>{

    if(req.session.user == null){
        res.redirect('/login')
    }else{
        db.query('select *from bitki_kategori',[],function(error,result,field){
            if(error) throw error;
            if(result.length > 0){
                res.render('AdminBitkiYönetim',{result})
            }else{
                result = [];
                res.render('AdminBitkiYönetim',{result})
            }
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



// post metot
router.post('/bitkiyonetim/kategoriEkle',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        let kategoriAdi = req.body.kategoriEkle;
        db.query('insert into bitki_kategori (kategoriAd) values (?)',[kategoriAdi],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})

router.post('/bitkiyonetim/kategoriSil',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        let kategoriId = req.body.kategoriSil;
        db.query('delete from bitki_kategori where kategoriId=?',[kategoriId],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})


router.post('/bitkiyonetim/urunEkle',upload.single('image'),async (req, res) => {

    if(req.session.user == null){
        res.redirect('/login')
    }else{
        let kategoriId = req.body.kategoriSec;
        let urunAd = req.body.urunAd;
        let urunAciklama = req.body.urunAciklama;
        let imageFileName = req.file.filename;
    
        db.query('insert into bitki_urun (kategoriId,urunAd,urunAciklama,urunResimYol) values (?,?,?,?)',[kategoriId,urunAd,urunAciklama,imageFileName],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
    


    
});
  






module.exports = router;