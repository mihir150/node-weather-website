
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partial')
//setup handelbars engine and view locations
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath )

app.use(express.static(publicDirectoryPath))
//setup static directory to serve
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'mihir'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',name:'mihir'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help me',name:'mihir'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>file</h1>')

// })
// app.get('/help',(req,res)=>{

//     res.send({
//         name:'andrew',
//         age:21
//     })
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')

// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error)
        {
            return res.send({error})
        }
        forecast( latitude,longitude, (error, forecastdata) => {
            if(error)
            {
                return res.send({ error })
            }
            res.send({
                forecast:forecastdata,
                location:location,
                address:req.query.address,
                
            })
    
          })
        })
    })

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'mihir',
        errormessage:'help article not found'})

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'mihir',
        errormessage:'page not found'})

})
app.listen(port,()=>{
    console.log('server is up on port '+ port)
})