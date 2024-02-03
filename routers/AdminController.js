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
                res.render('AdminBitkiYönetim')
                res.render('AdminBitkiYönetim')
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
        const resimPath = req.file.filename;
        let kategoriId = req.body.kategoriSec;
        let urunAd = req.body.urunAd;
        let urunAciklama = req.body.urunAciklama;

        db.query('insert into bitki_urun (kategoriId,urunAd,urunAciklama,urunResimYol) values (?,?,?,?)',[kategoriId,urunAd,urunAciklama,resimPath],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
    
})

router.post('/bitkiyonetim/kategoriChnage',(req,res)=>{
    let kategoriId = req.body.kategoriId;

    db.query('select urunId,urunAd from bitki_urun where kategoriId=?',[kategoriId],function(error,result,field){
        if(error) throw error;
        if(result.length > 0){
            res.json({ success: true, message: 'POST isteği başarıyla alındı.',result:result});
        }else{
            result = [];
            res.json({ success: true, message: 'POST isteği başarıyla alındı.',result:result });
        }
    })
})

router.post('/bitkiyonetim/urunSil', (req, res) => {
    if (req.session.user == null) {
        res.redirect('/login');
    } else {
        let urunSilKategori = req.body.urunSilKategori;
        let urunSilUrun = req.body.urunSilUrun;
        console.log(urunSilUrun, " ", urunSilKategori);
        
        db.query('select urunResimYol from bitki_urun where urunId = ? and kategoriId = ?', [urunSilUrun, urunSilKategori], function (error, result, field){
            if(error) throw error;
            if(result.length > 0){
                db.query('delete from bitki_urun where urunId = ? and kategoriId = ?', [urunSilUrun, urunSilKategori], function (error, result2, field) {
                    if (error) throw error;
                    if (result[0].urunResimYol) {
                        const imagePath = path.join(__dirname, '../public/image', result[0].urunResimYol);
                        if (fs.existsSync(imagePath)) {
                            fs.unlinkSync(imagePath);
                            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
                        }
                    }
                    
                })
            }else{
                // buraya bir şeyler yazabiliriz.
            }
        })
        
    }
});



module.exports = router;