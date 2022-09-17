const express = require('express')


const cards = require('./modules/cards')
const spells = require('./modules/spells')
const effects = require('./modules/effects')

const app = express()

app.set('views engine', 'ejs')
app.set('views', 'frontend')
app.use(express.static('frontend'))


app.get(`/`, (req, res) => {

    // res.send(`works`)
    res.render(`play.ejs`)
    // res.sendFile()

})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

