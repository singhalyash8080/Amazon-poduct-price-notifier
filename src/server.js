const app = require('./app')
const cron = require('node-cron');
const checkPrice = require('./checkPrice')

cron.schedule('* * * * *', async () => {
    await checkPrice()
    console.log('running a task every minute');
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up on port ` + port)
})