//// global variables
var hexChars = 'ABCDEF0123456789'
var savedPalettes = [];
var mainPalette = {};
//// document.queery selector's 
// buttons
var newPaletteBtn = document.querySelector("#newPalette");
var savePaletteBtn = document.querySelector('#savePalette');
// colors
var colors = {
    color1: document.querySelector('#color1'),
    color2: document.querySelector('#color2'),
    color3: document.querySelector('#color3'),
    color4: document.querySelector('#color4'),
    color5: document.querySelector('#color5'),
}






//// event listiner's
newPaletteBtn.addEventListener("click", randomizeMainPalette)
window.addEventListener("load", randomizeMainPalette)

//// function's
function updateDOMColorSwatch(element, hexCode) {
    element.style.backgroundColor = hexcode
}


// {id: randomInt, colors: []}
function randomizeMainPalette() {
    // later, we will need to check for locked colors
    mainPalette = createRandomPalette();
    console.log('main palette:', mainPalette)
    for (var i = 0; i < Object.keys(colors).length; i++) {
        var colorDiv = colors[Object.keys(colors)[i]];

        var box = colorDiv.querySelector('box');
        console.log('box: ', i, box)
        var header = colorDiv.querySelector('h3');
        console.log('h3: ', i, header)

        var currentHexCode = mainPalette.colors[i].hexCode;

        box.style.backgroundColor = currentHexCode;
        header.innerText = currentHexCode;
    }
}
// palette -> {id: randomInt, colors: []}
function createRandomPalette() {
    var colors = [];

    for (var i = 0; i < 5; i++) {
        colors.push(createRandomColor());
    }

    return { id: Date.now(), colors: colors }
}
// color -> { hexCode: "#123abc", locked: false }
function createRandomColor() {
    return { hexCode: generateRandomHexCode(), locked: false }
}

function generateRandomHexCode() {
    var hexCode = '#';

    for (var i = 0; i < 6; i++) {
        hexCode += generateRandomHexChar();
    }

    return hexCode;
}

function generateRandomHexChar() {
    return hexChars[Math.floor(Math.random() * hexChars.length)]
}







