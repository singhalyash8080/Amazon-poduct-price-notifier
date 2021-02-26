const nightmare = require('nightmare')()

const checkPrice=  async (req,res)=> {
    try {
      const priceString = await nightmare.goto("https://www.amazon.in/RASCO-Hand-Stitched-Football-Size/dp/B07X1D2C8N/ref=sr_1_1_sspa?dchild=1&qid=1614361585&refinements=p_n_pct-off-with-tax%3A2665401031&s=sports&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFJRU9MUE5YTEtFQ00mZW5jcnlwdGVkSWQ9QTA5OTY3NTYzNVpCUUlPN0pZMkFDJmVuY3J5cHRlZEFkSWQ9QTA0MjMwMjBWWE5LSjZMSU5MVEkmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==")
                                         .wait("#priceblock_ourprice")
                                         .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                         .end()
      console.log(priceString)  
      const priceNumber = parseFloat(priceString.replace('₹', ''))
      console.log(priceNumber)


    } catch (e) {
      
      throw e
    }
    res.send()
  }
  module.exports= checkPrice;
