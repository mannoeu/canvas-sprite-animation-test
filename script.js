const controller = document.querySelector("select#animation");

let playerState = "idle";

controller.addEventListener("change", function (e) {
  playerState = e.target.value;
  gameFrame = 0;
});

const canvas = document.getElementById("root");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 200);
const CANVAS_HEIGHT = (canvas.height = 200);

let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 15,
    width: 64,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/idle.png";
      return image;
    },
  },
  {
    name: "jump_and_fall",
    frames: 14,
    width: 144,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/jump_and_fall.png";
      return image;
    },
  },
  {
    name: "run",
    frames: 8,
    width: 96,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/run.png";
      return image;
    },
  },
  {
    name: "roll",
    frames: 15,
    width: 180,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/roll.png";
      return image;
    },
  },
  {
    name: "shield",
    frames: 7,
    width: 96,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/shield.png";
      return image;
    },
  },
  {
    name: "attack",
    frames: 22,
    width: 144,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/attack.png";
      return image;
    },
  },
  {
    name: "death",
    frames: 15,
    width: 96,
    height: 64,
    image: () => {
      let image = new Image();
      image.src = "./assets/sprites/death.png";
      return image;
    },
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
    width: state.width,
    height: state.height,
    image: state.image(),
  };

  for (let j = 0; j < state.frames; j++) {
    let positionX = j * frames.width;
    let positionY = 0;

    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;

  let frameX = spriteAnimations[playerState].width * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    spriteAnimations[playerState].image,
    frameX,
    frameY,
    spriteAnimations[playerState].width,
    spriteAnimations[playerState].height,
    0,
    0,
    spriteAnimations[playerState].width,
    spriteAnimations[playerState].height
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
