const { json } = require('body-parser');
const db= require('mongoose');
const {Schema} = db;
const express = require('express')
const app = express();
var name=" ";
var author=" ";
var year=" ";
var tags=" ";
var genre=" ";
var category=" ";



//mongoosee


db.set('strictQuery',true);
db.connect('mongodb://localhost:27017/book_api',function(){
    try {
        
    } catch (error) {
        console.log(err);
    };
})
const book = new Schema({
    Name:String,
    Author_name:String,
    Category:String,
    Genre:String,
    Tags:String,
    year:Number,

}//schema for book info
,{
    collection:"books",
}//to reach the pre made collection in databse 
)

const book_model = db.model("book_model",book);

// const newbook = new book_model({
//     Name:name,
//     Author_name:author,
//     Category:category,
//     Tags:tags,
//     Genre:genre,
//     year:2008,
// })
//for printig the databse data
// book_model.find({},(err,r)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log(JSON.stringify(r))
//     console.log('%s',r)
// })

//end



app.use(express.urlencoded({extended:false}));
app.post("/add", (req,res,next)=>{
   
    name = req.query.name,
    author = req.query.author;
    year = req.query.year;
    tags =req.query.tags ;
    genre = req.query.genre;
    category =req.query.category;
    console.log(req.query.name)
    next()
   
},(req,res,next)=>{
    const newbook =  new book_model({
        Name:name,
        Author_name:author,
        Category:category,
        Tags:tags,
        Genre:genre,
        year:year,
    });
    newbook.save();
}

)//for addig data to mongodb


app.get('/all',(req,res)=>{
    var books;
      book_model.find({},(err,r)=>{
        if(err) console.log(err);
       res.json(r);
      })
      
}) //get all data from the mongodb


app.get("/find/name/:name",(req,res)=>{
    const option= req.params.name;
   
    book_model.find({Name:option},(err,r)=>{
        if(err) console.log(err)
        res.json(r);
    })
})//for finding with name


app.get("/find/tag/:tag",(req,res)=>{
    const option= req.params.tag;
   
    book_model.find({tag:option},(err,r)=>{
        if(err) console.log(err)
        res.json(r);
    })
})//for finding with tag


app.get("/find/author/:author",(req,res)=>{
    const option= req.params.author;
   
    book_model.find({Author_name:option},(err,r)=>{
        if(err) console.log(err)
        res.json(r);
    })
})//for finding with author name


app.get("/find/category/:category",(req,res)=>{
    const option= req.params.category;
   
    book_model.find({Category:option},(err,r)=>{
        if(err) console.log(err)
        res.json(r);
    })
})//for finding with category


app.get("/find/genre/:genre",(req,res)=>{
    const option= req.params.genre;
   
    book_model.find({Genre:option},(err,r)=>{
        if(err) console.log(err)
        res.json(r);
    })
})//for finding with genre



app.listen(3000,()=>{
console.log('port listening on port :3000');
})