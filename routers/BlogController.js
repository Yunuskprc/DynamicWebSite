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



router.get('/Bitkilerimiz',(req,res)=>{
    db.query('select *from iletisim',[],function(err,resultiletisim,field){
        if(err) throw err;

        if(resultiletisim.length > 0){
            db.query('select *from bitki_kategori',[],function(error,result,field){
                if(error) throw error;
        
                if(result.length > 0){
                    db.query('select *from bitki_urun',[],function(error1,resultProje,field){
                        if(error1) throw error1;

                        if(resultProje.length > 0){
                            console.log(resultProje)
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }
                    })
                }else{
                    db.query('select *from bitki_urun',[],function(error1,resultProje,field){
                        if(error1) throw error1;

                        if(resultProje.length > 0){
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            result = []
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }
                    })
                }
            })
        }else{
            db.query('select *from bitki_kategori',[],function(error,result,field){
                if(error) throw error;
        
                if(result.length > 0){
                    db.query('select *from bitki_urun',[],function(error1,resultProje,field){
                        if(error1) throw error1;

                        if(resultProje.length > 0){
                            resultiletisim = []
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            resultiletisim = []
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }
                    })
                }else{
                    db.query('select *from bitki_urun',[],function(error1,resultProje,field){
                        if(error1) throw error1;

                        if(resultProje.length > 0){
                            resultiletisim = []
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            result = []
                            resultiletisim = []
                            res.render('BlogBitki',{resultiletisim,result,resultProje})
                        }
                    })
                }
            })
        }
    })
    
})


router.get('/Bitkilerimiz/:kategoriAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd;
    console.log(kategoriAd)
    db.query('select *from iletisim',[],function(err,resultiletisim,field){
        if(err) throw err;

        if(resultiletisim.length > 0){
            db.query('select *from bitki_kategori',[],function(error,result,field){
                
                if(error) throw error;

                if(result.length > 0){
                    db.query('select *from bitki_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }else{
                    db.query('select *from bitki_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    result = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    result = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    result = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    result = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }

            })
        }else{
            db.query('select *from bitki_kategori',[],function(error,result,field){
                
                if(error) throw error;

                if(result.length > 0){
                    db.query('select *from bitki_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }else{
                    db.query('select *from bitki_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from bitki_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogBitki',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }

            })
        }

    })
})



router.get('/KentselTasarimlar',(req,res)=>{
    db.query('select *from iletisim',[],function(error,resultiletisim,field){
        if(error) throw error;

        if(resultiletisim.length > 0){
            db.query('select *from kentseltasarim_kategori',[],function(error,result,field){
                if(error) throw error;

                if(result.length > 0){
                    db.query('select *from kentseltasarim_urun',[],function(error,resultProje,field){
                        if(error) throw error;

                        if(resultProje.length > 0){
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }
                    })
                }else{
                    db.query('select *from kentseltasarim_urun',[],function(error,resultProje,field){
                        if(error) throw error;

                        if(resultProje.length > 0){
                            result = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            result = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }
                    })
                }

            })
        }else{
            db.query('select *from kentseltasarim_kategori',[],function(error,result,field){
                if(error) throw error;

                if(result.length > 0){
                    db.query('select *from kentseltasarim_urun',[],function(error,resultProje,field){
                        if(error) throw error;

                        if(resultProje.length > 0){
                            resultiletisim = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            resultiletisim = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }
                    })
                }else{
                    db.query('select *from kentseltasarim_urun',[],function(error,resultProje,field){
                        if(error) throw error;

                        if(resultProje.length > 0){
                            result = []
                            resultiletisim = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }else{
                            resultProje = []
                            resultiletisim = []
                            result = []
                            res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                        }
                    })
                }

            })
        }
    })
})


router.get('/KentselTasarimlar/:kategoriAd',(req,res)=>{
    const kategoriAd = req.params.kategoriAd;
    db.query('select *from iletisim',[],function(err,resultiletisim,field){
        if(err) throw err;

        if(resultiletisim.length > 0){
            db.query('select *from kentseltasarim_kategori',[],function(error,result,field){
                
                if(error) throw error;

                if(result.length > 0){
                    db.query('select *from kentseltasarim_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }else{
                    db.query('select *from kentseltasarim_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    result = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    result = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    result = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    result = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }

            })
        }else{
            db.query('select *from kentseltasarim_kategori',[],function(error,result,field){
                
                if(error) throw error;

                if(result.length > 0){
                    db.query('select *from kentseltasarim_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }else{
                    db.query('select *from kentseltasarim_kategori where kategoriAd=?',[kategoriAd],function(error2,resultKategori,field){
                        if(error2) throw error2;

                        if(resultKategori.length > 0){
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }else{
                            db.query('select *from kentseltasarim_urun where kategoriId=?',[resultKategori[0].kategoriId],function(error3,resultProje,field){
                                if(error3) throw error3;

                                if(resultProje.length  > 0){
                                    resultKategori = []
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }else{
                                    resultProje = []
                                    resultKategori = []
                                    result = []
                                    resultiletisim = []
                                    res.render('BlogKentselTasarim',{resultiletisim,result,resultProje})
                                }

                            })
                        }

                    })
                }

            })
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
