var exp=require("express");
var path=require("path");
var bp=require("body-parser");
var mysql=require("mysql");
var pp=require("./confi/passportt");
var passport=require("passport");
var nodemailer = require('nodemailer');
const { getMaxListeners } = require("process");
const e = require("express");

var app=exp();
app.set("view engine","ejs");
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.get("/download",function(req,res){
    res.download(__dirname+"/rohit.pdf")
})
var x;
app.get("/login",function(req,res){
        res.sendFile(path.join(__dirname,"pages","loginn.html"))
  });

app.get("/signup",function(req,res){
        res.sendFile(path.join(__dirname,"pages","signup.html"))
    })

app.get("/",function(req,res){
      res.sendFile(path.join(__dirname,"pages","index.html"))
    
})

app.get("/l",function(req,res){
    res.sendFile(path.join(__dirname,"pages","r.html"))
})

app.use(exp.static(__dirname+"/public"))

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"student"
    });

    
    app.post("/cdd",function(req,res){
            let p,y;
            p=req.body.a;
            y=req.body.b;
            // var sql1="select first from table3 where email='"+x+"'";
            // con.query(sql1,function(err,result){
            //     if(err) throw err
            //      namee=result[0].first;
            // });

                var sql="select email,password,first from table3 where email='"+p+"' && password='"+y+"'";
                con.query(sql,function(err,result){
                    if(err)throw err;
                      if(result.length>0){
                          x=result[0].first;
                        res.render("index1",{email:x})
                      }
                      else{
                             res.render("error");
                      }
                 });
                
        });


    var z1,random;
    app.post("/cd",function(req,res){
       
            let x,y,w,p,q,o;
            x=req.body.a;
            y=req.body.b;
            z1=req.body.c;
            w=req.body.d;
            p=req.body.e;
            q=req.body.f;
            o=req.body.k;
           var  sql1="select * from table3 where email='"+z1+"' or mobile='"+w+"'";
           con.query(sql1,function(err,result){
               if(err) throw err
               if(result.length>0){
                res.sendFile(path.join(__dirname,"pages","signup1.html"))
             }
             else{
                var sql="insert into table3(first,last,email,mobile,password,repassword,security) values('"+x+"','"+y+"','"+z1+"','"+w+"','"+p+"','"+q+"','"+o+"')";
                con.query(sql,function(err,result){
                    if(err)throw err;
                    // console.log("data inserted");
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: '',
                          pass: ''
                        }
                      });
                       random = Math.floor(Math.random()*100000)+1;
                      var mailOptions = {
                        from: '',
                        to: z1,
                        subject: 'Email Varification OTP',
                        text:  'thank you ' + x + y + ' for visiting my website your one time password(OTP) is '+random
                      };
                         transporter.sendMail(mailOptions, function(error, info){ 
                      });
                      res.sendFile(path.join(__dirname,"pages","otp.html"))                
                });           
             }
           })
        
         });
   
    
    var ott;
    app.post("/otpp",function(req,res){
         ott=req.body.ot;
         if(random==ott)
      {    
          res.sendFile(path.join(__dirname,"pages","rr.html"));
      }
      else{
        res.sendFile(path.join(__dirname,"pages","otp1.html"));
      }
         });
     let a,c;
      
    app.post("/adm",function(req,res){
        let s,d,f,g,h,j,c;
        a=req.body.question_number;
        s=req.body.question_text;
        d=req.body.Choice1;
        f=req.body.Choice2;
        g=req.body.Choice3;
        h=req.body.Choice4;
        j=req.body.correct_choice;
        c=Number(a)
             console.log("connect");
        var sql="insert into takequiz(is_correct,question_text,question_number,choice1,choice2,choice3,choice4) values('"+j+"','"+s+"','"+a+"','"+d+"','"+f+"','"+g+"','"+h+"')";
        con.query(sql,function(err,result){
            if(err)throw err;
            console.log("data inserted");
        });
        res.render("again",{question:c+1})

    });

    app.post("/takequiz",function(req,res){
        let x;
        x=req.body.courses;
        
       let a=1;
       let b=2;
       let c=3;
       let d=4;
       if(a==x)
       {
              res.render("quiz1",{ad1:'HTML'});
       }
       if(d==x)
       {
              res.render("quiz4",{ad1:'BOOTSTRAP'});
       }
       if(b==x)
       {
              res.render("quiz2",{ad1:'JAVASCRIPT'});
       }
       if(c==x)
       {
              res.render("quiz3",{ad1:'CSS'});
       }
     
    

    });

app.get("/startquiz",function(req,res){
   
        var sql="select question_text,choice1,choice2,choice3,choice4,question_number from takequiz where question_number=1";
        con.query(sql,function(err,result){
            if(err)throw err;
            
            if(result.length>0){
                res.render("startquiz",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
            }
            else{
               
            }
        });

});

var answer=0;
var temp1=0;
app.post("/cho",function(req,res){
    let j;
    j=req.body.choice;
    
    var sql1="select is_correct from takequiz where question_number=1";
       var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=2";
       con.query(sql,function(err,result){
           if(err)throw err;
          
           if(result.length>0){
               res.render("startquiz1",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
           }
           
       });
       con.query(sql1,function(err,result){
           if(err)throw err;
           
           if(result[0].is_correct==j){
            answer=answer+1;
        }
       });

});


app.post("/cho1",function(req,res){
    let j;
    j=req.body.choice;
   
    
       var sql1="select is_correct from takequiz where question_number=2";
       var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=3";
       con.query(sql,function(err,result){
           if(err)throw err;
           
           if(result.length>0){
               res.render("startquiz2",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
           }
       });
       con.query(sql1,function(err,result){
        if(err)throw err;
        if(result[0].is_correct==j){
         answer=answer+1;
     }
    });

});

app.post("/cho2",function(req,res){
    let j;
    j=req.body.choice;
   
    
    var sql1="select is_correct from takequiz where question_number=3";
       var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=4";
       con.query(sql,function(err,result){
           if(err)throw err;
           
           if(result.length>0){
               res.render("startquiz3",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
           }
       });
       con.query(sql1,function(err,result){
        if(err)throw err;
        if(result[0].is_correct==j){
         answer=answer+1;
     }
    });


});

app.post("/cho3",function(req,res){
    let j;
    j=req.body.choice;
    
   
    
    var sql1="select is_correct from takequiz where question_number=4";
       var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=5";
       con.query(sql,function(err,result){
           if(err)throw err;
           
           if(result.length>0){
               res.render("startquiz4",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
           }
       });
       con.query(sql1,function(err,result){
        if(err)throw err;
        if(result[0].is_correct==j){
         answer=answer+1;
     }
    });


});

app.post("/cho4",function(req,res){
    let j;
    j=req.body.choice;
    
   
    var sql1="select is_correct from takequiz where question_number=5";
      // var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=5";
       con.query(sql1,function(err,result){
           if(err)throw err;
           if(result[0].is_correct==j)
           {  
                 answer=answer+1;
               
           }
           temp1=answer;
           answer=0;
           res.redirect("/res");
        
       });
       
       


});

app.get("/res",function(req,res){
    res.render("ss",{email:x});
})

app.get("/check",function(req,res){
  if(temp1==5){
    res.render("checkr",{ad:temp1,email:x})
  }
  else{
  res.render("check",{ad:temp1,email:x})
  }

})



app.get("/startquizj",function(req,res){
    
    var sql="select question_text,choice1,choice2,choice3,choice4,question_number from takequiz where question_number=6";
    con.query(sql,function(err,result){
        if(err)throw err;
        
        if(result.length>0){
            res.render("startquizj",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
        }
        else{
           
        }
    });

});

var answerj=0;
var tempj1=0;
app.post("/choj",function(req,res){
let j;
j=req.body.choice;


var sql1="select is_correct from takequiz where question_number=6";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=7";
   con.query(sql,function(err,result){
       if(err)throw err;
      
       if(result.length>0){
           res.render("startquizj1",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
       
   });
   con.query(sql1,function(err,result){
       if(err)throw err;
       
       if(result[0].is_correct==j){
        answerj=answerj+1;
    }
   });

});

app.post("/choj1",function(req,res){
let j;
j=req.body.choice;



   var sql1="select is_correct from takequiz where question_number=7";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=8";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizj2",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerj=answerj+1;
 }
});

});

app.post("/choj2",function(req,res){
let j;
j=req.body.choice;


var sql1="select is_correct from takequiz where question_number=8";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=9";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizj3",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerj=answerj+1;
 }
});


});

app.post("/choj3",function(req,res){
let j;
j=req.body.choice;



var sql1="select is_correct from takequiz where question_number=9";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=10";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizj4",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerj=answerj+1;
 }
});


});

app.post("/choj4",function(req,res){
let j;
j=req.body.choice;

var sql1="select is_correct from takequiz where question_number=10";
  // var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=5";
   con.query(sql1,function(err,result){
       if(err)throw err;
       if(result[0].is_correct==j)
       {  
             answerj=answerj+1;
           
       }
       tempj1=answerj;
       answerj=0;
       res.redirect("/res1");
    
   });
   
   


});

app.get("/res1",function(req,res){
res.render("ss1",{email:x});
})
app.get("/check1",function(req,res){
    if(tempj1==5){
        res.render("checkr",{ad:tempj1,email:x})
      }
      else{
      res.render("check1",{ad:tempj1,email:x})
      }
})

app.get("/startquizc",function(req,res){
    
    var sql="select question_text,choice1,choice2,choice3,choice4,question_number from takequiz where question_number=11";
    con.query(sql,function(err,result){
        if(err)throw err;
        
        if(result.length>0){
            res.render("startquizc",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
        }
        else{
           
        }
    });

});
var answerc=0;
var tempc1=0;
app.post("/choc",function(req,res){
let j;
j=req.body.choice;


var sql1="select is_correct from takequiz where question_number=11";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=12";
   con.query(sql,function(err,result){
       if(err)throw err;
      
       if(result.length>0){
           res.render("startquizc1",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
       
   });
   con.query(sql1,function(err,result){
       if(err)throw err;
       
       if(result[0].is_correct==j){
        answerc=answerc+1;
    }
   });

});

app.post("/choc1",function(req,res){
let j;
j=req.body.choice;



   var sql1="select is_correct from takequiz where question_number=12";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=13";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizc2",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerc=answerc+1;
 }
});

});

app.post("/choc2",function(req,res){
let j;
j=req.body.choice;



var sql1="select is_correct from takequiz where question_number=13";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=14";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizc3",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerc=answerc+1;
 }
});
});

app.post("/choc3",function(req,res){
let j;
j=req.body.choice;

var sql1="select is_correct from takequiz where question_number=14";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=15";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizc4",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerc=answerc+1;
 }
});


});
app.post("/choc4",function(req,res){
let j;
j=req.body.choice;


var sql1="select is_correct from takequiz where question_number=15";
  // var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=5";
   con.query(sql1,function(err,result){
       if(err)throw err;
       if(result[0].is_correct==j)
       {  
             answerc=answerc+1;
           
       }
       tempc1=answerc;
       answerc=0;
       res.redirect("/resc");
    
   });
   
   


});

app.get("/resc",function(req,res){
res.render("ssc",{email:x});
})
app.get("/checkc",function(req,res){
    if(tempc1==5){
        res.render("checkr",{ad:tempc1,email:x})
      }
      else{
      res.render("checkc",{ad:tempc1,email:x})
      }
})

app.get("/startquizb",function(req,res){
    
    var sql="select question_text,choice1,choice2,choice3,choice4,question_number from takequiz where question_number=16";
    con.query(sql,function(err,result){
        if(err)throw err;
        
        if(result.length>0){
            res.render("startquizb",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
        }
        else{
           
        }
    });

});
var answerb=0;
var tempb1=0;
app.post("/chob",function(req,res){
let j;
j=req.body.choice;


var sql1="select is_correct from takequiz where question_number=16";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=17";
   con.query(sql,function(err,result){
       if(err)throw err;
      
       if(result.length>0){
           res.render("startquizb1",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
       
   });
   con.query(sql1,function(err,result){
       if(err)throw err;
       
       if(result[0].is_correct==j){
        answerb=answerb+1;
    }
   });

});

app.post("/chob1",function(req,res){
let j;
j=req.body.choice;



   var sql1="select is_correct from takequiz where question_number=17";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=18";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizb2",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerb=answerb+1;
 }
});

});

app.post("/chob2",function(req,res){
let j;
j=req.body.choice;



var sql1="select is_correct from takequiz where question_number=18";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=19";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizb3",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerb=answerb+1;
 }
});


});

app.post("/chob3",function(req,res){
let j;
j=req.body.choice;



var sql1="select is_correct from takequiz where question_number=19";
   var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=20";
   con.query(sql,function(err,result){
       if(err)throw err;
       
       if(result.length>0){
           res.render("startquizb4",{all:result[0].question_text,cho1:result[0].choice1,cho2:result[0].choice2,cho3:result[0].choice3,cho4:result[0].choice4,qq:result[0].question_number})
       }
   });
   con.query(sql1,function(err,result){
    if(err)throw err;
    if(result[0].is_correct==j){
     answerb=answerb+1;
 }
});


});
app.post("/chob4",function(req,res){
let j;
j=req.body.choice;


var sql1="select is_correct from takequiz where question_number=20";
  // var sql="select question_text,choice1,choice2,choice3,choice4,question_number,is_correct from takequiz where question_number=5";
   con.query(sql1,function(err,result){
       if(err)throw err;
       if(result[0].is_correct==j)
       {  
             answerb=answerb+1;
           
       }
       tempb1=answerb;
       answerb=0;
       res.redirect("/resb");
    
   });
   
   


});

app.get("/resb",function(req,res){
res.render("ssb",{email:x});
})
app.get("/checkb",function(req,res){
    if(tempb1==5){
        res.render("checkr",{ad:tempb1,email:x})
      }
      else{
      res.render("checkb",{ad:tempb1,email:x})
      }
})
    
        app.post("/cddd",function(req,res){
            let x,y;
            x=req.body.c;
            y=req.body.d;
                console.log("ok");
                var sql="select * from table4 where email='"+x+"' && password='"+y+"'";
                con.query(sql,function(err,result){
                    if(err)throw err;
                    if(result.length>0){
                        res.sendFile(path.join(__dirname,"pages","admin.html"))
                    }
                    else{
                        res.sendFile(path.join(__dirname,"pages","error.html"))
                    }
                });

        });
        app.get("/forget",function(req,res){
            res.sendFile(path.join(__dirname,"pages","forget.html"))
        });

        app.get("/hom",function(req,res){
            
            res.render("index1",{email:x});
            
            })
        
        
       
        app.get("/admin",function(req,res){
            res.sendFile(path.join(__dirname,"pages","adminlogin.html"))
        })
        app.get("/admi",function(req,res){
            res.sendFile(path.join(__dirname,"pages","adminn.html"))
        })
        app.get("/progress",function(req,res){
            res.render("progress",{email:x});
        })
        app.get("/material",function(req,res){
            res.render("video",{email:x})
        })
        app.get("/quiz",function(req,res){
            res.render("quiz",{email:x});
        })
        app.get("/bm",function(req,res){
            res.render("beforematerial",{email:x});
        })
        app.get("/bm1",function(req,res){
            res.render("pdf",{email:x});
        })
        app.get("/bm11",function(req,res){
            res.render("video2",{email:x});
        })
        app.get("/bm12",function(req,res){
            res.render("video3",{email:x});
        })
        app.get("/bm13",function(req,res){
            res.render("video4",{email:x});
        })
       
       app.get("/k",function(req,res){
           res.sendFile(__dirname+"/timework.pdf")
       })
       app.get("/k1",function(req,res){
        res.sendFile(__dirname+"/blood.pdf")
    })
    app.get("/k2",function(req,res){
        res.sendFile(__dirname+"/direction.pdf")
    })
    app.get("/k3",function(req,res){
        res.sendFile(__dirname+"/number.pdf")
    })
   app.get("/k4",function(req,res){
       res.download(__dirname+"/timework.pdf")
   })
   app.get("/k5",function(req,res){
    res.download(__dirname+"/blood.pdf")
})
app.get("/k6",function(req,res){
    res.download(__dirname+"/direction.pdf")
})
app.get("/k7",function(req,res){
    res.download(__dirname+"/number.pdf")
})

        let l,random1;
        app.post("/h",function(req,res){
            l=req.body.e;

            console.log("ok");
                var sql="select * from table3 where email='"+l+"'";
                con.query(sql,function(err,result){
                    if(err)throw err;
                    if(result.length>0){
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: '',
                              pass: ''
                            }
                          });
                           random1 = Math.floor(Math.random()*100000)+1;
                          var mailOptions = {
                            from: '',
                            to: l,
                            subject: 'Forget Password OTP',
                            text:  'thank you for visiting my website you want to forget your password your one time password(OTP) is '+random1
                          };     
                          transporter.sendMail(mailOptions, function(error, info){       
                          });
                          
                       res.sendFile(path.join(__dirname,"pages","reload.html"))
                    }
                    else{
                        res.render("this",{email:l})
                    }
                });

        });
        var ott1;
        app.post("/otpp1",function(req,res){
             ott1=req.body.ot1;
             if(random1==ott1)
          {    
              res.sendFile(path.join(__dirname,"pages","correction.html"));
          }
          else{
            res.sendFile(path.join(__dirname,"pages","otp11.html"));
          }
             });
    
    
      
        

        
        app.post("/cor",function(req,res){
            let t,u;
            t=req.body.g;
            u=req.body.f;
                var sql="UPDATE `table3` SET `password`='"+t+"',`repassword`='"+u+"' WHERE email='"+l+"'";
                con.query(sql,function(err,result){
                    if(err)throw err;
                    console.log(result.length)
                    if(u.length>0){
                        res.sendFile(path.join(__dirname,"pages","red.html"))
                    }
                    else{
                        res.send("there will be any technical error try again");
                    }

                });
        });
       
        app.get("/google",passport.authenticate('google',{scope:['profile','email']}));
       app.get("/users/google/auth/callback",function(req,res){
      res.redirect("/homw")
      });
      app.get("/homw",function(req,res){
          res.render("index11")
      })

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, function() {
    console.log("Server started.......");
  });