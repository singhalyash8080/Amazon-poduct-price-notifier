const nightmare = require('nightmare')()
const fs = require('fs')

const checkPrice = async (req, res) => {
  try {
    const data = (req.body);
    console.log(data);
    var name = data.name
    var email = data.email
    var url = data.url
    var expectedPrice = data.price

    // const priceString = await nightmare.goto(url)
    //   .wait("#priceblock_ourprice")
    //   .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    //   .end()

    // var price1 = ''
    // for (let index = 0; index < priceString.length; index++) {
    //   if (index > 1 && priceString[index] != ',') {
    //     price1 += priceString[index]
    //   }

    // }

    // const priceNumber = parseFloat(price1)
    // console.log(priceNumber)

    if (!fs.existsSync('./public')) {
      fs.mkdirSync('./public');
      console.log('directory created')
    }

    console.log(name)
    console.log(email)
    console.log(url)
    console.log(expectedPrice)

    fs.writeFileSync("./public/" + Date.now() + ".txt", name + "," + email + "," + url + "," + expectedPrice);


  } catch (e) {

    throw e
  }
  res.send()
}
module.exports = checkPrice;
