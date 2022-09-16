const express = require('express')


const cards = require('./modules/cards')
const spells = require('./modules/spells')
const effects = require('./modules/effects')

const app = express()



app.get(`/`, (req, res) => {

    res.send(`works`)

})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

