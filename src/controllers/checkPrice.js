const nightmare = require('nightmare')()

const checkPrice=  async (req,res)=> {
    try {
        const data =(req.body);
        console.log(data);
        var name= data.Name
        var email=data.Email
        var url =data.Url
        var expected_price=data.Price

      const priceString = await nightmare.goto(url)
                                         .wait("#priceblock_ourprice")
                                         .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                         .end()
      console.log(priceString)
    //   const priceNumber = parseFloat(priceString.replace('₹', ''))
      var price1
      for (let index = 0; index < priceString.length; index++) {
          if(index>1){
                price1=price1+priceString[index]
          }
          
      }
      const priceNumber = parseFloat(price1)
    //   console.log(price1)
      console.log(priceNumber)
      console.log(name)
      console.log(email)


    } catch (e) {
      
      throw e
    }
    res.send()
  }
  module.exports= checkPrice;
