// Constanten en variabelen
const straal = 400
const diameter = straal * 2
const offset = 120 // Voor de tekst vanboven
const aantalPuntenPerFrame = 10
let aantalPuntenGeplaatst = 0
let aantalPuntenInCirkel = 0
let bestePi = 0

function setup() {
    createCanvas(diameter, diameter+offset)
    background(50)
    noStroke()
    textSize(40)
    
    // Initiele ellips tekenen
    ellipseMode(CORNER)
    fill(100)
    ellipse(0, offset, diameter, diameter)

    // Pi waarde
    fill(255)
    rect(0, 0, width, offset)
    fill(0)
    text("Pi: " + Math.PI, 15, 105)
}

function draw() {
    
    // Meerdere punten per frame, om pi sneller te benaderen
    for (let i = 0; i < aantalPuntenPerFrame; i++) {

        // Maak punt coordinaten aan
        puntX = random(width)
        puntY = random(offset, height)

        // Check of het punt OP de cirkel is
        if (puntNietOpCirkel()) {

            // Als het punt niet OP de cirkel ligt, check of het wel of niet IN de cirkel ligt
            if (puntInCirkel()) {
                stroke(255, 0, 0)
                aantalPuntenInCirkel++
            } else {
                stroke(0, 0, 255)
            }

            // Teken het punt
            tekenPunt()
        }

        // Bereken pi; formule uitgelegd in CodingTrain video gelinkt op Github
        let pi = 4 * aantalPuntenInCirkel / aantalPuntenGeplaatst

        // Behoud van best pi, uitgelehd in CodingTrain video gelinkt op Github
        let bestePiVerschil = abs(Math.PI - bestePi)
        let piVerschil = abs(Math.PI - pi)
        if (piVerschil < bestePiVerschil) {
            bestePiVerschil = piVerschil
            bestePi = pi
        }
    }

    // Bovenste witte rechthoek om de tekst van de vorige frame weg te doen
    fill(255)
    rect(0, 0, width, offset/2)
    fill(0)
    text("Pi record: " + bestePi, 15, 45)
}

function puntNietOpCirkel() {
    return dist(width/2, diameter/2+offset, puntX, puntY) != straal
}

function puntInCirkel() {
    return dist(width/2, diameter/2+offset, puntX, puntY) < straal
}

function tekenPunt() {
    strokeWeight(5)
    point(puntX, puntY)
    aantalPuntenGeplaatst++
    noStroke()
}