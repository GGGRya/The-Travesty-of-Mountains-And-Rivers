// The Travesty of Mountains and Rivers

let n = 2;
let c = 0;
let s = 0;
let patterns = {};
let MandR = [];
let nUpper = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
let hold = 0;
let allMount = "大凡天下名山五千三百七十，居地，大凡六萬四千五十六里。";
let loc;
let open, txt, end, ending;
let sel;
let slid, stp;
let classics = [
  "南山經 Southern Mountains",
  "西山經 Western Mountains",
  "北山經 Northern Mountains",
  "東山經 Easthern Mountains",
  "中山經 Central Mountains",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(15);
  textFont("Songti TC");
  sel = createSelect();
  slid = createSlider(0, 120, 0);
  slid.style("width", "220px");
  MandR = [
    mountainSouth,
    mountainWest,
    mountainNorth,
    mountainEast,
    mountainCentral,
  ];
  sel.option(classics[0]);
  sel.option(classics[1]);
  sel.option(classics[2]);
  sel.option(classics[3]);
  sel.option(classics[4]);
  sel.selected(classics[0]);
  sel.changed(myClassics);
}
function myClassics() {
  for (let i = 0; i < 5; i++) {
    if (sel.value() == classics[i]) c = i;
  }
  n = 2;
  draw();
}
function draw() {
  sel.position(20, height / 10);
  slid.position(windowWidth - 240, height / 10);
  s = floor(map(slid.value(), 0, 120, 0, MandR[c].Top.length - 1));
  open = MandR[c].Top[s];
  txt = MandR[c].Then[s];
  end = MandR[c].End[s];
  ending = MandR[c].ending;
  hold = floor(map(windowWidth, 60, 1440, 0, 90));
  if (windowWidth >= 480 && windowHeight >= 520) {
    background(255);
    slid.show();
    sel.show();
    for (let i = 0; i < 8; i++) {
      createPattern();
      text("其" + nUpper[n] + "  " + gibberish(), 20, height * 0.4 + i * 20);
      n++;
    }
    drawMountains();
    fill(0);
    textAlign(LEFT);
    lines(open, height * 0.225);
    lines(end, height * 0.75);
    lines(ending, height * 0.88);
    noLoop();
  } else {
    background(0);
    fill(255);
    lines(allMount, height * 0.45);
    slid.hide();
    sel.hide();
  }
}

function lines(lines, start) {
  let Line = [];
  let Char = lines.split("");
  for (let i = 0; i < lines.length; i++) {
    if (/[；，、; , 。]$/.test(Char[i + 1])) {
      Char[i] = join([Char[i], Char[i + 1]], "");
      Char[i + 1] = " ";
      if (i % (hold + 1) == hold) {
        Char.splice(i + 1, 1);
        Char.push("");
      }
    }
    Line.push(Char[i]);

    text(
      Line[i],
      20 + (i % (hold + 1)) * 15,
      start + floor(i / (hold + 1)) * 20
    );
  }
}
function mouseClicked() {
  n = 2;
  draw();
}

function createPattern() {
  for (let i = 0; i < txt.length; i++) {
    let gram = txt.substring(i, i + n - 1);
    let nextChar = txt[i + n - 1];
    if (!(gram in patterns)) {
      patterns[gram] = [];
    }
    patterns[gram].push(nextChar);
  }
}

function gibberish() {
  let then = txt.substring(0, n - 1);
  while (!/[。]$/.test(then) && then.length < hold) {
    let gram = then.slice(-(n - 1));
    let opts = patterns[gram];
    let pick = random(opts);
    if (
      then.length >= hold - 1 &&
      !/[；，、; ,]$/.test(then.charAt(then.length - 1))
    )
      then += " ...";
    else {
      then += pick;
      if (then.length >= hold) then += " ...";
    }
  }
  return then;
}

function drawMountains() {
  for (let i = 0; i < width; i+=1.5) {  
    for (let j = 0; j < 4; j++) {
      stroke(0, 15);
      let l=(map(slid.value(), 0, 100, 0, MandR[c].Top.length - 1));
      line(i-j*2,  j*20+noise(l+i/240) * height-height/6*j+height/12, i-j*2, j*20+noise(l+i/240) * height+height/6);
  }
}
}
function drawRivers() {}
function windowResized() {
  n = 2;
  resizeCanvas(windowWidth, windowHeight);
}
