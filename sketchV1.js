// Constanten en variabelen
const straal = 400
const diameter = straal * 2
const offset = 60 // Voor de tekst vanboven
const aantalPuntenPerFrame = 100
let aantalPuntenGeplaatst = 0
let aantalPuntenInCirkel = 0
let pi

function setup() {
    createCanvas(diameter, diameter+offset)
    background(50)
    noStroke()
    textSize(40)
    
    // Initiele ellips tekenen
    ellipseMode(CORNER)
    fill(100)
    ellipse(0, offset, diameter, diameter)
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
    }

    // Bereken pi; formule uitgelegd in CodingTrain video gelinkt op Github
    pi = 4 * aantalPuntenInCirkel / aantalPuntenGeplaatst

    // Bovenste witte rechthoek om de tekst van de vorige frame weg te doen
    fill(255)
    rect(0, 0, width, offset)
    fill(0)
    text(pi, 15, 45)
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