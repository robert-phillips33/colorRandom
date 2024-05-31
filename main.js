//// global variables
var hexChars = 'ABCDEF0123456789';
var savedPalettes = [];
var palette = {};
//// document.query selector's
// buttons
var newPaletteBtn = document.querySelector('#newPalette');
var savePaletteBtn = document.querySelector('#savePalette');
var savedPaletteSection = document.querySelector('#savedPalettes');
// colors
var colors = {
  color0: document.querySelector('#color0'),
  color1: document.querySelector('#color1'),
  color2: document.querySelector('#color2'),
  color3: document.querySelector('#color3'),
  color4: document.querySelector('#color4'),
};

var swatchContainer = document.querySelector('container');

//// event listiner's
newPaletteBtn.addEventListener('click', randomizePaletteColors);
window.addEventListener('load', randomizePaletteColors);
swatchContainer.addEventListener('click', lockUnlockColor);
savePaletteBtn.addEventListener('click', savePalette);
savedPaletteSection.addEventListener('click', deleteSavedPalette);



function savePalette (event) {
  savedPalettes.push(palette);
  palette = {};
  randomizePaletteColors();
  updateDomSavedPalettes();
}

function updateDomSavedPalettes() {
  var savedPaletteHTML = '<h2>Saved Palettes</h2>'

  if (!savedPalettes.length) {
    savedPaletteHTML += '<p>Saved Palettes will show here!</p>';
  }

  savedPaletteSection.innerHTML = savedPaletteHTML;
  for (let i = 0; i < savedPalettes.length; i++) {
    var miniPaletteGroup = makeMiniPaletteGroup(savedPalettes[i]);
    savedPaletteSection.appendChild(miniPaletteGroup);
  }
}




function makeMiniPaletteGroup(palette) {
  var miniPaletteGroup = document.createElement('div');
  miniPaletteGroup.classList.add('mini-palette-group');

  var miniPalette = document.createElement('div');
  miniPalette.classList.add('mini-palette');
  miniPaletteGroup.appendChild(miniPalette);
  miniPaletteGroup.appendChild(makeDeleteButton(palette.id));

  for (let i = 0; i < 5; i++) {
    var miniSwatch = makeMiniSwatch(palette.colors[i].hexCode);
    miniPalette.appendChild(miniSwatch);
  }
  return miniPaletteGroup;
}



function makeMiniSwatch(hexCode) {
  var miniSwatch = document.createElement('box');
  miniSwatch.classList.add('mini-swatch');
  miniSwatch.style.backgroundColor = hexCode;

  return miniSwatch;
}


function deleteSavedPalette (event){
  if(event.target.classList.contains('delete-button')){
    for (var i = 0; i < savedPalettes.length; i ++){
      if (savedPalettes[i].id === Number(event.target.id)){
        savedPalettes.splice(i,1)
      }
    }
    updateDomSavedPalettes()  
  }
}




function makeDeleteButton(id) {
  var deleteButton = document.createElement('img');
  deleteButton.classList.add('delete-button');
  deleteButton.src = './assets/delete.png';
  deleteButton.alt = 'delete button';
  deleteButton.id = id;
  return deleteButton;
}





function lockUnlockColor(event) {
  if (event.target.classList.contains('lock')) {
    var lockID = event.target.parentNode.parentNode.id;
    // updates JS palette
    var targetColorIndex = Number(lockID.slice(-1));
    var targetColor = palette.colors[targetColorIndex];
    targetColor.locked = !targetColor.locked;
    // updates DOM colors
    var colorDiv = colors[lockID];
    var images = colorDiv.querySelectorAll('img');
    for (let i = 0; i < images.length; i += 1) {
      images[i].classList.toggle('hidden');
    }
  }
}

// palette -> {id: randomInt, colors: []}
function updateDOMPalette() {
  for (var i = 0; i < 5; i++) {
    var colorDiv = colors[`color${i}`];

    var box = colorDiv.querySelector('box');
    var heading = colorDiv.querySelector('h3');

    var currentHexCode = palette.colors[i].hexCode;

    box.style.backgroundColor = currentHexCode;
    heading.innerText = currentHexCode;
  }
}
// palette -> {id: randomInt, colors: []}
function randomizePaletteColors() {
  if (!palette.id) palette = { id: Date.now(), colors: [] };

  for (var i = 0; i < 5; i++) {
    // <><><><><> if no color @ index OR color is unlocked....
    if (!palette.colors[i] || !palette.colors[i].locked) {
      palette.colors[i] = createRandomColor();
    }
  }

  updateDOMPalette();
}
// color -> { hexCode: "#123abc", locked: false }
function createRandomColor() {
  return { hexCode: generateRandomHexCode(), locked: false };
}

function generateRandomHexCode() {
  var hexCode = '#';

  for (var i = 0; i < 6; i++) {
    hexCode += generateRandomHexChar();
  }

  return hexCode;
}

function generateRandomHexChar() {
  return hexChars[Math.floor(Math.random() * hexChars.length)];
}
