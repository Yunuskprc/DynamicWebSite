const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../data/db');
const { mode } = require('crypto-js');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const NumberControl = require('../middleware/NumberControl');
const { render } = require('ejs');


// multer ile resim depolama
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Web Proje/public/image');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg');
    },
});
const upload = multer({ storage: storage});



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
                result=[]
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

router.get('/portfoy',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        db.query('select *from portfoy where id=1',[],function(error,result,field){
            if(error) throw error;
            if(result.length > 0){
                res.render('AdminPortföyYönetim',{result})
            }else{
                result = [];
                res.render('AdminPortföyYönetim',{result})
            }
        })
       
    }
})

router.get('/WebGunlugu',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        res.render('AdminWebGunluguYonetim')
    }
    
})

router.get('/kentseltasarim',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login');
    }else{
        db.query('select *from kentseltasarim_kategori',[],function(error,result,field){
            if(error) throw error;
            if(result.length > 0){
                res.render('AdminKentselDönüşüm',{result})
            }else{
                result=[]
                res.render('AdminKentselDönüşüm',{result})
                
            }
        })
    }
})

router.get('/projeyonetim',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }else{
        db.query('select *from proje_kategori',[],function(error,result,field){
            if(error) throw error;
            if(result.length > 0){
                res.render('AdminProjeYonetim',{result})
            }else{
                result=[]
                res.render('AdminProjeYonetim',{result})
                
            }
        })
    }
})


// post metot
// bitki yönetim
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



// iletisim post
router.post('/iletisim/telNo',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let telNo = req.body.telNo;
        if(NumberControl(telNo)){
            db.query('update iletisim set telNo=? where id=1',[telNo],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else{
            res.json({ success: false, message: 'Hatalı Veri Girişi!!'});
        }
    }
})

router.post('/iletisim/mail',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let mail = req.body.mail;
        db.query('update iletisim set mail=? where id=1',[mail],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
        })
    }
})

router.post('/iletisim/instagram',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let instagram = req.body.instagram;
        db.query('update iletisim set instagram=? where id=1',[instagram],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
        })
    }
})

router.post('/iletisim/facebook',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let facebook = req.body.facebook;
        db.query('update iletisim set facebook=? where id=1',[facebook],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
        })
    }
})

router.post('/iletisim/twitter',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let twitter = req.body.twitter;
        db.query('update iletisim set twitter=? where id=1',[twitter],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
        })
    }
})

router.post('/iletisim/linkedin',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let linkedin = req.body.linkedin;
        db.query('update iletisim set linkedin=? where id=1',[linkedin],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
        })
    }
})

router.post('/iletisim/telNo2',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login'); 
    }else{
        let telNo2 = req.body.telNo2;
        if(NumberControl(telNo2)){
            db.query('update iletisim set telNo2=? where id=1',[telNo2],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else{
            res.json({ success: false, message: 'Hatalı Veri Girişi!!'});
        }
    }
})

router.post('/iletisim/delete',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login');
    }else{
        let infoNumber = req.body.deleteinfo;
        if(infoNumber == 1){
            db.query('update iletisim set telNo=\'00000000000\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else if(infoNumber == 2){
            db.query('update iletisim set mail=\'https://example\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else if(infoNumber == 3){
            db.query('update iletisim set instagram=\'https://example\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else if(infoNumber == 4){
            db.query('update iletisim set facebook=\'https://example\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else if(infoNumber == 5){
            db.query('update iletisim set telNo2=\'00000000000\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else if(infoNumber == 6){
            db.query('update iletisim set twitter=\'https://example\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }else if(infoNumber == 7){
            db.query('update iletisim set linkedin=\'https://example\' where id=1',[],function(error,result,field){
                if(error) throw error;
                res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
            })
        }
    }
})
      

// portfoy
router.post('/portfoy/infoUpdate',(req,res)=>{
    if(req.session.user == null){
        res.redirect('/login')
    }else{
        var ad = req.body.adSoyad;
        const sehir = req.body.sehir;
        let biografi = req.body.biografi;
        let universite = req.body.universite;
        let bolum = req.body.bolum;
        let calismaYeri = req.body.calismaYeri;

        db.query('update portfoy set adSoyad=?, sehir=?, biografi=?, universite=?, bolum=?, calismaYeri=? where id=1',[ad,sehir,biografi,universite,bolum,calismaYeri],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.'});
        })
    }
})

// web günlüğü
router.post('/webgunlugu/sendMakale', upload.single('image'), async (req, res) => {
    if (req.session.user == null) {
      res.redirect('/login');
    } else {
      try {
        if (!req.file) {
          // Dosya yüklenmediği durumda işlemleri ele alabilirsiniz.
          console.log('Dosya yüklenmedi.');
          throw new Error('Dosya yüklenmedi.');
        }
  
        const resimPath = req.file.filename;
        let baslik = req.body.baslik;
        let icerik = req.body.icerik;
        let kaynakca = req.body.kaynakca;
  
        db.query(
          'INSERT INTO webgunlugu (baslik, icerik, kaynakca, resimYol) VALUES (?, ?, ?, ?)',
          [baslik, icerik, kaynakca, resimPath],
          function (error, result, field) {
            if (error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
          }
        );
      } catch (error) {
        console.error('Hata:', error);
        res.status(400).json({ success: false, message: error.message || 'Bir hata oluştu.' });
      }
    }
  });


//kentsel tasarım
router.post('/kentseltasarim/kategoriEkle',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }else{
        let kategoriEkle = req.body.kategoriEkle;
        db.query('insert into kentseltasarim_kategori (kategoriAd) values (?)',[kategoriEkle],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})

router.post('/kentseltasarim/kategoriSil',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }else{
        let kategoriId = req.body.kategoriSil;
        db.query('delete from kentseltasarim_kategori where kategoriId=?',[kategoriId],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})

router.post('/kentseltasarim/urunEkle',upload.single('image'),async (req, res) => {

    if(req.session.user == null){
        res.redirect('/login')
    }else{
        const resimPath = req.file.filename;
        let kategoriId = req.body.kategoriSec;
        let urunAd = req.body.urunAd;
        let urunAciklama = req.body.urunAciklama;

        db.query('insert into kentseltasarim_urun (kategoriId,urunAd,urunAciklama,urunResimYol) values (?,?,?,?)',[kategoriId,urunAd,urunAciklama,resimPath],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
    
})

router.post('/kentseltasarim/kategoriChnage',(req,res)=>{
    let kategoriId = req.body.kategoriId;

    db.query('select urunId,urunAd from kentseltasarim_urun where kategoriId=?',[kategoriId],function(error,result,field){
        if(error) throw error;
        if(result.length > 0){
            res.json({ success: true, message: 'POST isteği başarıyla alındı.',result:result});
        }else{
            result = [];
            res.json({ success: true, message: 'POST isteği başarıyla alındı.',result:result });
        }
    })
})

router.post('/kentseltasarim/urunSil', (req, res) => {
    if (req.session.user == null) {
        res.redirect('/login');
    } else {
        let urunSilKategori = req.body.urunSilKategori;
        let urunSilUrun = req.body.urunSilUrun;
        
        db.query('select urunResimYol from kentseltasarim_urun where urunId = ? and kategoriId = ?', [urunSilUrun, urunSilKategori], function (error, result, field){
            if(error) throw error;
            if(result.length > 0){
                db.query('delete from kentseltasarim_urun where urunId = ? and kategoriId = ?', [urunSilUrun, urunSilKategori], function (error, result2, field) {
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


// proje yonetim
router.post('/projeyonetim/kategoriEkle',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }else{
        let kategoriAd = req.body.kategoriEkle;
        db.query('insert into proje_kategori (kategoriAd) values (?)',[kategoriAd],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})

router.post('/projeyonetim/kategoriSil',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    }else{
        let kategoriId = req.body.kategoriSil;
        db.query('delete from proje_kategori where kategoriId=?',[kategoriId],function(error,result,field){
            if(error) throw error;
            res.json({ success: true, message: 'POST isteği başarıyla alındı.' });
        })
    }
})

router.post('/projeyonetim/projeEkle',upload.array('images[]',10),(req,res)=>{
    
    if(!req.session.user){
        res.redirect('/login');
    }else{

        let projeYeri = req.body.projeYeri;
        let projeTipi = req.body.projeTipi;
        let isSahibi = req.body.isSahibi;
        let isVeren = req.body.isVeren;
        let baslangicTarih = req.body.baslangicTarih;
        let bitisTarih = req.body.bitisTarih;
        let arsaAlani = req.body.arsaAlani;
        let kategoriSec = req.body.kategoriSec;
        let projeAd = req.body.projeAd;
        let projeAciklama = req.body.projeAciklama;
        const resimPaths = req.files.map(file => file.filename);
        const resimler = [];

        if(resimPaths.length > 10){
            res.json({ success: false, message: '10\'dan fazla resim seçildi.' });
            return;
        }

        for(let i=0;i<10;i++){
            if(resimPaths.length > i){
                resimler[i] = resimPaths[i];
            }else{
                resimler[i] = "null";
            }
        }
        
        db.query('insert into proje_urun (kategoriId,projeYeri,projeTipi,isSahibi,isVeren,baslangicTarih,birisTarih,arsaAlani,projeAd,projeAciklama) values (?,?,?,?,?,?,?,?,?,?)',[kategoriSec,projeYeri,projeTipi,isSahibi,isVeren,baslangicTarih,bitisTarih,arsaAlani,projeAd,projeAciklama],function(error,result,field){
            if(error) throw error;
            const urunId = result.insertId;
            db.query('insert into proje_urun_resim (urunId,resimArkaPlan,resim1,resim2,resim3,resim4,resim5,resim6,resim7,resim8,resim9) values (?,?,?,?,?,?,?,?,?,?,?)',[urunId,resimler[0],resimler[1],resimler[2],resimler[3],resimler[4],resimler[5],resimler[6],resimler[7],resimler[8],resimler[9]],function(error2,result2,field2){
                if(error) throw error;
                res.json({success:true, message:'Post isteği başarılı bir şekilde alındı.'});
            })
        })
    }
})

router.post('/projeyonetim/kategoriChnage',(req,res)=>{
   
    if(!req.session.user){
        res.redirect('/login')
    }else{
        let kategoriId = req.body.kategoriId;
        db.query('select urunId,projeAd from proje_urun where kategoriId=?',[kategoriId],function(error,result,field){
            if(error) throw error;
            if(result.length > 0){
                res.json({ success: true, message: 'POST isteği başarıyla alındı.',result:result});
            }else{
                result = [];
                res.json({ success: true, message: 'POST isteği başarıyla alındı.',result:result });
            }
        })
    }
})

router.post('/projeyonetim/urunSil', (req, res) => {
    if (req.session.user == null) {
        res.redirect('/login');
    } else {
        let urunSilKategori = req.body.urunSilKategori;
        let urunSilUrun = req.body.urunSilUrun;
        
        db.query('select *from proje_urun_resim where urunId = ? ', [urunSilUrun], function (error, result, field){
            if(error) throw error;
            if(result.length > 0){


                db.query('delete from proje_urun_resim where urunId = ?',[urunSilUrun],function(error2,result2,field2){
                    if(error2) throw error2;

                    db.query('delete from proje_urun where urunId = ? and kategoriId = ?', [urunSilUrun, urunSilKategori], function (error3, result3, fiel3) {
                        if (error3) throw error3;
    
                        for(let i =0;i<10;i++){
                            if(i==0){
                                if(result[0].resimArkaPlan == 'null'){
                                    break;
                                }else{
                                    const imagePath = path.join(__dirname, '../public/image', result[0].resimArkaPlan);
                                    if (fs.existsSync(imagePath)) {
                                        fs.unlinkSync(imagePath);
                                    }
                                }
                            }else{
                                if(result[0][`resim${i}`] == 'null'){
                                    break;
                                }else{
                                    const imagePath = path.join(__dirname, '../public/image', result[0][`resim${i}`]);
                                    if (fs.existsSync(imagePath)) {
                                        fs.unlinkSync(imagePath);
                                    }
                                }
                            }
                        }

                        res.json({success:true, message:'Post isteği başarılı bir şekilde alındı.'})
                    })

                })


                
            }else{
                // buraya bir şeyler yazabiliriz.
            }
        })
        
        
    }
});

module.exports = router;