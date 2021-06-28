module.exports = {
    port: process.env.PORT || 3000,
    //db: process.env.MONGODB || 'mongodb://localhost:27017/mydb',
    db: process.env.MONGODB || 'mongodb+srv://omar_fuvz:Fuentes2021@clustercrud.4lqo5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    
    urlParser : {
        useNewUrlParser: true,
        useUnifiedTopology : true,
        useFindAndModify : false,
        useCreateIndex : true,
    }
}