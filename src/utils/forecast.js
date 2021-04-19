const request=require('request')



const forecast=(latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=dfd558b1e200f331355d767bb8af74cc&query='+latitude + ',' + longitude 

    request({url,json:true}, (error,{body})=>{
         if(error)
         {
             callback('unable to connect to weather service',undefined)
         }
         else if(body.error)
         {
             callback('unable to find locations',undefined)
         }
         
            else{callback(undefined,body.current.weather_descriptions[0] + ' ,it is currently  ' +body.current.temperature + ' degree out. there is a '+body.current.feelslike +' degree in and Humidity is '+body.current.humidity +'%' )
        }

})
}


module.exports=forecast