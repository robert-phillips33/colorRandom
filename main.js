//// <> GLOBAL VARIABLES <> ////
var hexChars = 'ABCDEF0123456789';
var savedPalettes = [];
var featurePalette = { id: Date.now(), colors: [] };
//// <> DOM NODES <> ////
//- buttons -//
var newPaletteBtn = document.querySelector('#newPalette');
var savePaletteBtn = document.querySelector('#savePalette');
//- feature palette color divs -//
var colors = {
  color0: document.querySelector('#color0'),
  color1: document.querySelector('#color1'),
  color2: document.querySelector('#color2'),
  color3: document.querySelector('#color3'),
  color4: document.querySelector('#color4'),
};
//- containers -//
var swatchContainer = document.querySelector('container');
var savedPaletteSection = document.querySelector('#savedPalettes');
//// <> EVENT LISTENERS <> ////
//- load -//
window.addEventListener('load', randomizePaletteColors);
//- click -//
newPaletteBtn.addEventListener('click', randomizePaletteColors);
swatchContainer.addEventListener('click', lockUnlockColor);
savePaletteBtn.addEventListener('click', savePalette);
savedPaletteSection.addEventListener('click', deleteSavedPalette);
//// <> FUNCTIONS <> ////
//- saved palette functions -//
function updateDomSavedPalettes() {
  var savedPaletteHTML = '<h2>Saved Palettes</h2>';

  if (!savedPalettes.length) {
    savedPaletteHTML += '<p>Saved Palettes will show here!</p>';
  }

  savedPaletteSection.innerHTML = savedPaletteHTML;
  for (var i = 0; i < savedPalettes.length; i++) {
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

  for (var i = 0; i < 5; i++) {
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

function makeDeleteButton(id) {
  var deleteButton = document.createElement('img');
  deleteButton.classList.add('delete-button');
  deleteButton.src = './assets/delete.png';
  deleteButton.alt = 'delete button';
  deleteButton.id = id;
  return deleteButton;
}
//- click handler functions -//
function savePalette() {
  savedPalettes.push(featurePalette);
  resetFeaturePalette();
  randomizePaletteColors();
  updateDomSavedPalettes();
}

function deleteSavedPalette(event) {
  if (event.target.classList.contains('delete-button')) {
    for (var i = 0; i < savedPalettes.length; i++) {
      if (savedPalettes[i].id === Number(event.target.id)) {
        savedPalettes.splice(i,1);
      }
    }

    updateDomSavedPalettes();
  }
}

function updateDOMLocks(colorDiv) {
  var images = colorDiv.querySelectorAll('img');
  for (let i = 0; i < images.length; i++) {
    images[i].classList.toggle('hidden');
  }
}

function lockUnlockColor(event) {
  if (event.target.classList.contains('lock')) {
    var lockID = event.target.parentNode.parentNode.id;
    var targetColorIndex = Number(lockID.slice(-1));
    var targetColor = featurePalette.colors[targetColorIndex];
    targetColor.locked = !targetColor.locked;
    updateDOMLocks(colors[lockID]);
  }
}
//- featurePalette functions -//
function updateDOMPalette() {
  for (var i = 0; i < 5; i++) {
    var colorDiv = colors[`color${i}`];

    var box = colorDiv.querySelector('box');
    var heading = colorDiv.querySelector('h3');

    var currentHexCode = featurePalette.colors[i].hexCode;

    box.style.backgroundColor = currentHexCode;
    heading.innerText = currentHexCode;
  }
}

function resetFeaturePalette() {
  var paletteColors = [...featurePalette.colors];
  featurePalette = { id: Date.now(), colors: paletteColors };
}

function randomizePaletteColors() {
  for (var i = 0; i < 5; i++) {
    if (!featurePalette.colors[i] || !featurePalette.colors[i].locked) {
      featurePalette.colors[i] = createRandomColor();
    }
  }

  updateDOMPalette();
}

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
