class Spell {
    constructor(name, cost, description, effect) {

        // this.Values = {}
        this.Values = { name, cost, description, effect }

    }
}


module.exports = {
    Beer: () => {
        return new Spell(
            "Beer",
            2,
            "Gives <span style=\"color: #ff00a5;\">drunk:2</span> and <span style=\"color: orange;\">courage:2</span> to target.",
            (target) => {
    
                console.log(`target becomes drunk and courageous`)
    
            }
        )
    },
    "Rock Throw": () => {
        return new Spell(
            "Rock Throw",
            4,
            "75% chance to hit first enemy, if hit, 75% chance to hit 2nd enemy, etc.",
            (target) => {
    
                console.log(`as described`)
    
            }
        )
    },
    Adrenaline: () => {
        return new Spell(
            "Adrenaline",
            3,
            "Gives <span style=\"color: pink;\">Adrenaline Rush</span> to target",
            (target) => {
    
                console.log(`as described`)
    
            }
        )
    } ,
    "Black Death": () => {
        return new Spell(
            "Black Death",
            7,
            "Gives <span style=\"color: grey;\">diseased:2</span> to target, proceeds to any neigbouring cards (nondiagonal), continues until space.",
            (target) => {

                console.log(`as described`)

            }
        )
    }
}