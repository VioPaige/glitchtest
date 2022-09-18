class Card {
    constructor(name, atk, def, cost, pow, iconpath) {

        // this.Values = {}
        this.Values = { name, atk, def, cost, pow, iconpath }

    }
    makeCard = (onboard, handtag) => {
    
        let card = document.createElement('card')

        if (onboard) card.classList = "card active"
        else if (handtag%2 == 0) card.classList = "card right active"
        else card.classList = "card left active"

        let name = document.createElement('div')
        name.innerText = this.Values.name.toUpperCase()
        name.classList = "cardname"

        let icon = document.createElement('div')
        icon.classList = "cardicon"
        icon.innerHTML = `<img src="/Images/Cards/${this.Values.name}.png" width="86">`

        let desc = document.createElement('div')
        desc.classList = "carddesc"
        desc.innerHTML = this.Values.pow[0].desc

        let stats = document.createElement('div')
        stats.classList = "cardstats"

        let attack = document.createElement('div')
        attack.classList = "attackstat stat"
        attack.innerText = this.Values.atk

        let defense = document.createElement('div')
        defense.classList = "defensestat stat"
        defense.innerText = this.Values.def
        
        let cost = document.createElement('div')
        cost.classList = "coststat stat"
        cost.innerText = this.Values.cost

        stats.appendChild(attack)
        stats.appendChild(defense)
        stats.appendChild(cost)

        card.appendChild(name)
        card.appendChild(icon)
        card.appendChild(desc)
        card.appendChild(stats)

        console.log(card)
    
        return card

    }
}

let ratcard = new Card("Rat", 1, 1, 1, [{
    desc: `Give <b>1</b> <span style="color:rgb(255, 0, 255);">poison</span> to any enemy this attacks. (Triggers 3 times MAX)`,
    iter: 3,
    efct: "diseased:1"
}], "/Images/Cards/Rat.png")

let mousecard = new Card("Mouse", 1, 1, 0, [{
    desc: "-"
}], "/Images/Cards/Mouse.png")

let batcard = new Card("Bat", 2, 3, 5, [{
    desc: "Flying",
    iter: -1,
    efct: "flying:-1"
}])

let beercard = new Card("Beer", "-", "-", 2, [{
    desc: `Gives <span style="color:rgb(255, 255, 0);">drunk</span> and <span style="color:rgb(255, 150, 0);">courage:2</span> to target.`,
    iter: 2,
    efct: ""
}], "/Images/Cards/Beer.png")

let adrenalinecard = new Card("Adrenaline", "-", "-", 3, [{
    desc: `Gives <span style="">Adrenaline</span> Rush to target`,
}], "/Images/Cards/Adrenaline.png")

let rockthrowcard = new Card("Rock Throw", "-", "-", 4, [{
    desc: `100% chance to hit first enemy, if hit, 75% chance to hit 2nd enemy, 50% 3rd, and 25% 4th. 2 <span style="color:rgb(255, 0, 0);">ATK</span> per hit.`
}])


// let htmlcards = {
//     htmlcard1: ratcard.makeCard(true, undefined),
//     htmlcard2: mousecard.makeCard(true, undefined),
//     htmlcard3: batcard.makeCard(true, undefined),
//     htmlcard4: ratcard.makeCard(true, undefined),
//     htmlcard5: beercard.makeCard(false, 1),
//     htmlcard6: adrenalinecard.makeCard(false, 2),
//     htmlcard7: rockthrowcard.makeCard(false, 3)
// }

document.addEventListener('DOMContentLoaded', () => {

    // let slot2 = document.getElementById('opSLOT2') 
    // slot2.appendChild(htmlcards.htmlcard2)

    // for (let i = 1; i < 8; i++) {

    //     if (i < 5) {

    //         let slot = document.getElementById(`opSLOT${i}`)
    //         slot.appendChild(htmlcards[`htmlcard${i}`])

    //     } else {

    //         let slot = document.getElementById(`handdiv`)
    //         slot.appendChild(htmlcards[`htmlcard${i}`])

    //     }

    // }


})

function newCardClass(info) {
    // console.log(`making newCardClass`)
    if (!info.atk) info.atk = "-"
    // console.log(`making newCardClass pt2`)
    if (!info.def) info.def = "-"
    // console.log(`making newCardClass pt3`)
    if (!info.pow) info.pow = []
    if (info.pow.length == 0)
        if (info.description) info.pow = [{ desc: info.description }]
        else info.pow = [{ desc: "-" }]
    // console.log(`making newCardClass pt4`)
    let c = new Card(
        info.name,
        info.atk,
        info.def,
        info.cost,
        info.pow,
        `/Images/Cards/${info.name}.png`
    )

    return c

}