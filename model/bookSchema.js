import mongoose from "mongoose"; 

const bookSchema = mongoose.Schema({

    bookId : {
        type : Number ,
        required : true 
    } ,

    title : {
        type : String ,
        required : true 
    } ,

    author : {
        type : String ,
        required : true 
    } ,

    category : {
        type : String ,
        enum : ['Fiction' , 'Non-Fiction' , 'Adventure' , 'Science']
       
         }
         ,

    bookAvailibility : {
        type : Boolean , 
        default : true 
    } 


})

const bookModel = mongoose.model('book',bookSchema) ; 

export default bookModel  ; 
