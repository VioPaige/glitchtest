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
        icon.innerHTML = `<img src="Images/Cards/${this.Values.name}.png" width="86">`

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

let s = new Card("Rat", 1, 1, 1, [{
    desc: `Give <b>1</b> <span style="color:rgb(255, 0, 255);">poison</span> to any enemy this attacks. (Triggers 3 times MAX)`,
    iter: 3,
    efct: "diseased:1"
}], "Images/Cards/Rat.png")

let htmlcards = {
    htmlcard1: s.makeCard(true, undefined),
    htmlcard2: s.makeCard(true, undefined),
    htmlcard3: s.makeCard(true, undefined),
    htmlcard4: s.makeCard(true, undefined),
    htmlcard5: s.makeCard(false, 1),
    htmlcard6: s.makeCard(false, 2),
    htmlcard7: s.makeCard(false, 3)
}

document.addEventListener('DOMContentLoaded', () => {

    let slot2 = document.getElementById('opSLOT2') 
    // slot2.appendChild(htmlcards.htmlcard2)

    for (let i = 1; i < 8; i++) {

        if (i < 5) {

            let slot = document.getElementById(`opSLOT${i}`)
            slot.appendChild(htmlcards[`htmlcard${i}`])

        } else {

            let slot = document.getElementById(`handdiv`)
            slot.appendChild(htmlcards[`htmlcard${i}`])

        }

    }


})