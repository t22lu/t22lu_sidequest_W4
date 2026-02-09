let wordData;
let currentWave = 0;
let words = [];

function preload() {
  wordData = loadJSON("words.json");
}

function setup() {
  createCanvas(600, 400);
  loadWave(currentWave);
}

function loadWave(waveIndex) {
  words = [];
  let wave = wordData.waves[waveIndex];

  for (let i = 0; i < wave.length; i++) {
    words.push({
      text: wave[i],
      x: random(50, width - 50),
      y: -i * 40,
      speed: 1 + waveIndex,
    });
  }
}

function draw() {
  background(30);

  fill(255);
  textSize(20);

  for (let word of words) {
    word.y += word.speed;
    text(word.text, word.x, word.y);
  }
}

function keyTyped() {
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].text[0] === key) {
      words[i].text = words[i].text.substring(1);

      if (words[i].text.length === 0) {
        words.splice(i, 1);
      }
      break;
    }
  }

  // next wave
  if (words.length === 0) {
    currentWave++;
    if (currentWave < wordData.waves.length) {
      loadWave(currentWave);
    }
  }
}
