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
            "Gives <b>drunk</b> and <b>courage:2</b> to target.",
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
    }  ,
    Adrenaline: () => {
        return new Spell(
            "Adrenaline",
            3,
            "Gives Adrenaline Rush to target",
            (target) => {
    
                console.log(`as described`)
    
            }
        )
    } 
}