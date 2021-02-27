const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio');
const axios = require('axios');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

require('dotenv').config({path:path.resolve(__dirname, '../.env') })


var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
}));

const scrapping = async (productURL) => {
    return new Promise((resolve) => {
        axios.get(productURL)
            .then((response) => {
                const $ = cheerio.load(response.data);

                const data = $('#priceblock_ourprice');


                data.each((i, w) => {
                    // console.log($(w).text())
                    resolve($(w).text())

                });


            }).catch(function (err) {
                console.log(err);
            })
    })
}

function promiseAllP(items, block) {
    var promises = [];
    items.forEach(function (item, index) {
        promises.push(function (item, i) {
            return new Promise(function (resolve, reject) {
                return block.apply(this, [item, index, resolve, reject]);
            });
        }(item, index))
    });
    return Promise.all(promises);
} //promiseAll


function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function (err, filenames) {
            if (err) return reject(err);
            promiseAllP(filenames,
                (filename, index, resolve, reject) => {
                    fs.readFile(path.resolve(dirname, filename), 'utf-8', function (err, content) {
                        if (err) return reject(err);
                        return resolve({ filename: filename, contents: content });
                    });
                })
                .then(results => {
                    return resolve(results);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    });
}


const checkPrice = async () => {


    readFiles('./public/')
        .then(files => {
            console.log("loaded ", files.length);
            files.forEach(async (item, index) => {
                const data = item.contents.split(",")
                // console.log(data)
                const url = data[2]
                const expectedPrice = data[3]
                const email = data[1]
                const name = data[0]
                let priceString

                try {

                    priceString = await scrapping(url)

                } catch (e) {
                    console.log(e)
                }

                var price1 = ''
                for (let index = 0; index < priceString.length; index++) {
                    if (index > 1 && priceString[index] != ',') {
                        price1 += priceString[index]
                    }

                }

                const priceNumber = parseFloat(price1)
                if (expectedPrice <= priceNumber) {

                    var mailOptions = {
                        from: 'singhal.yash8080@gmail.com',
                        to: email,
                        subject: 'Notification regarding product sale on Amazon',
                        text: 'Hey'+name+'! The product you were looking for is now under your desired price. Happy shopping.'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);

                            fs.unlink('./public/' + item.filename, (err) => {
                                if (err) {
                                    console.log('problem deleting file')
                                    return
                                }
                                else {
                                    console.log('file deleted')
                                }

                            })
                        }
                    });
                }

            });
        })
        .catch(error => {
            console.log(error);
        });

}

module.exports = checkPrice