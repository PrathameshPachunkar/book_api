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
      
})



app.listen(3000,()=>{
console.log('port listening on port :3000');
})