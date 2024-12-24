const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

canvas.width = 1024 * dpr;
canvas.height = 624 * dpr;

const MAP_ROWS = 40;
const MAP_COLS = 40;

const MAP_WIDTH = 16 * MAP_COLS;
const MAP_HEIGHT = 16 * MAP_ROWS;

const MAP_SCALE = dpr + 3;

const VIEWPORT_WIDTH = canvas.width / MAP_SCALE;
const VIEWPORT_HEIGHT = canvas.height / MAP_SCALE;

const VIEWPORT_CENTER_X = VIEWPORT_WIDTH / 2;
const VIEWPORT_CENTER_Y = VIEWPORT_HEIGHT / 2;

const MAX_SCROLL_X = MAP_WIDTH - VIEWPORT_WIDTH;
const MAX_SCROLL_Y = MAP_HEIGHT - VIEWPORT_HEIGHT;

const layersData = {
  l_Grass_Tiles_1_Blob_TEST: l_Grass_Tiles_1_Blob_TEST,
  l_Bridge_Wood: l_Bridge_Wood,
  l_Water_Tile_1: l_Water_Tile_1,
  l_Grass_Tiles_1: l_Grass_Tiles_1,
  l_Path_Decoration: l_Path_Decoration,
  l_Stone_Clif_1_Tile: l_Stone_Clif_1_Tile,
  l_Water_Middle_Anim_1: l_Water_Middle_Anim_1,
  l_Fish_Animated_Tile: l_Fish_Animated_Tile,
  l_Barn: l_Barn,
  l_Waterfall_1: l_Waterfall_1,
  l_Bridge_Stone_Horizontal: l_Bridge_Stone_Horizontal,
  l_Chicken_Coop: l_Chicken_Coop,
  l_Boats: l_Boats,
  l_House_3_6: l_House_3_6,
  l_Lanter_Posts: l_Lanter_Posts,
  l_Benches: l_Benches,
  l_House_1_6: l_House_1_6,
  l_Horse_Stable_1: l_Horse_Stable_1,
  l_Tent_Small: l_Tent_Small,
  l_House_Abandoned_1_1: l_House_Abandoned_1_1,
  l_Anvil_Anim: l_Anvil_Anim,
  l_Furnace_Anim: l_Furnace_Anim,
  l_Fence_Big: l_Fence_Big,
  l_Pig_03: l_Pig_03,
  l_Chicken_15: l_Chicken_15,
  l_FarmLand_Tile: l_FarmLand_Tile,
  l_Flowers: l_Flowers,
  l_Outdoor_Decor: l_Outdoor_Decor,
  l_Big_Fruit_Tree: l_Big_Fruit_Tree,
  l_Small_Fruit_Tree: l_Small_Fruit_Tree,
  l_Spruce_Tree_Small: l_Spruce_Tree_Small,
  l_Fountain: l_Fountain,
  l_Oak_Tree: l_Oak_Tree,
  l_Oak_Tree_Small: l_Oak_Tree_Small,
  l_Golden_Chest_Anim: l_Golden_Chest_Anim,
  l_Golden_Jeweled_Chest_Anim: l_Golden_Jeweled_Chest_Anim,
  l_Collisions: l_Collisions,
};

// const frontRendersLayersData = {
//   l_Front_Renders: l_Front_Randers,
// };

const tilesets = {
  l_Grass_Tiles_1_Blob_TEST: {
    imageUrl: "./images/Grass_Tiles_1_Blob_TEST.png",
    tileSize: 16,
  },
  l_Bridge_Wood: { imageUrl: "./images/Bridge_Wood.png", tileSize: 16 },
  l_Water_Tile_1: { imageUrl: "./images/Water_Tile_1.png", tileSize: 16 },
  l_Grass_Tiles_1: { imageUrl: "./images/Grass_Tiles_1.png", tileSize: 16 },
  l_Path_Decoration: { imageUrl: "./images/Path_Decoration.png", tileSize: 16 },
  l_Stone_Clif_1_Tile: {
    imageUrl: "./images/Stone_Cliff_1_Tile.png",
    tileSize: 16,
  },
  l_Water_Middle_Anim_1: {
    imageUrl: "./images/Water_Middle_Anim_1.png",
    tileSize: 16,
  },
  l_Fish_Animated_Tile: {
    imageUrl: "./images/Fish_Animated_Tile.png",
    tileSize: 16,
  },
  l_Barn: { imageUrl: "./images/Barn.png", tileSize: 16 },
  l_Waterfall_1: { imageUrl: "./images/Waterfall_1.png", tileSize: 16 },
  l_Bridge_Stone_Horizontal: {
    imageUrl: "./images/Bridge_Stone_Horizontal.png",
    tileSize: 16,
  },
  l_Chicken_Coop: { imageUrl: "./images/Chicken_Coop.png", tileSize: 16 },
  l_House_3_6: { imageUrl: "./images/House_3_6.png", tileSize: 16 },
  l_Lanter_Posts: { imageUrl: "./images/Lanter_Posts.png", tileSize: 16 },
  l_Benches: { imageUrl: "./images/Benches.png", tileSize: 16 },
  l_House_1_6: { imageUrl: "./images/House_1_6.png", tileSize: 16 },
  l_Horse_Stable_1: { imageUrl: "./images/Horse_Stable_1.png", tileSize: 16 },
  l_Tent_Small: { imageUrl: "./images/Tent_Small.png", tileSize: 16 },
  l_House_Abandoned_1_1: {
    imageUrl: "./images/House_Abandoned_1_1.png",
    tileSize: 16,
  },
  l_Anvil_Anim: { imageUrl: "./images/Anvil_Anim.png", tileSize: 16 },
  l_Furnace_Anim: { imageUrl: "./images/Furnace_Anim.png", tileSize: 16 },
  l_Fence_Big: { imageUrl: "./images/Fence_Big.png", tileSize: 16 },
  l_Pig_03: { imageUrl: "./images/Pig_03.png", tileSize: 16 },
  l_Chicken_15: { imageUrl: "./images/Chicken_15.png", tileSize: 16 },
  l_FarmLand_Tile: { imageUrl: "./images/FarmLand_Tile.png", tileSize: 16 },
  l_Flowers: { imageUrl: "./images/Flowers.png", tileSize: 16 },
  l_Outdoor_Decor: { imageUrl: "./images/Outdoor_Decor.png", tileSize: 16 },
  l_Big_Fruit_Tree: { imageUrl: "./images/Big_Fruit_Tree.png", tileSize: 16 },
  l_Small_Fruit_Tree: {
    imageUrl: "./images/Small_Fruit_Tree.png",
    tileSize: 16,
  },
  l_Spruce_Tree_Small: {
    imageUrl: "./images/Spruce_Tree_Small.png",
    tileSize: 16,
  },
  l_Fountain: { imageUrl: "./images/Fountain.png", tileSize: 16 },
  l_Oak_Tree: { imageUrl: "./images/Oak_Tree.png", tileSize: 16 },
  l_Oak_Tree_Small: { imageUrl: "./images/Oak_Tree_Small.png", tileSize: 16 },
  l_Golden_Chest_Anim: {
    imageUrl: "./images/Golden_Chest_Anim.png",
    tileSize: 16,
  },
  l_Golden_Jeweled_Chest_Anim: {
    imageUrl: "./images/Golden_Jeweled_Chest_Anim.png",
    tileSize: 16,
  },
  l_Collisions: { imageUrl: "./images/public", tileSize: 16 },
};

// Tile setup
const collisionBlocks = [];
const blockSize = 16; // Assuming each tile is 16x16 pixels

collisions.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1) {
      collisionBlocks.push(
        new CollisionBlock({
          x: x * blockSize,
          y: y * blockSize,
          size: blockSize,
        })
      );
    }
  });
});

const renderLayer = (tilesData, tilesetImage, tileSize, context) => {
  tilesData.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        const srcX =
          ((symbol - 1) % (tilesetImage.width / tileSize)) * tileSize;
        const srcY =
          Math.floor((symbol - 1) / (tilesetImage.width / tileSize)) * tileSize;

        context.drawImage(
          tilesetImage, // source image
          srcX,
          srcY, // source x, y
          tileSize,
          tileSize, // source width, height
          x * 16,
          y * 16, // destination x, y
          16,
          16 // destination width, height
        );
      }
    });
  });
};

const renderStaticLayers = async (layersData) => {
  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  const offscreenContext = offscreenCanvas.getContext("2d");

  for (const [layerName, tilesData] of Object.entries(layersData)) {
    const tilesetInfo = tilesets[layerName];
    if (tilesetInfo) {
      try {
        const tilesetImage = await loadImage(tilesetInfo.imageUrl);
        renderLayer(
          tilesData,
          tilesetImage,
          tilesetInfo.tileSize,
          offscreenContext
        );
      } catch (error) {
        console.error(`Failed to load image for layer ${layerName}:`, error);
      }
    }
  }

  // Optionally draw collision blocks and platforms for debugging
  // collisionBlocks.forEach(block => block.draw(offscreenContext));

  return offscreenCanvas;
};
// END - Tile setup

// Change xy coordinates to move player's default position
const player = new Player({
  x: 144,
  y: 496,
  size: 15,
});

const monstersSprites = {
  walkDown: {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    frameCount: 4,
  },
  walkUp: {
    x: 16,
    y: 0,
    width: 16,
    height: 16,
    frameCount: 4,
  },
  walkLeft: {
    x: 32,
    y: 0,
    width: 16,
    height: 16,
    frameCount: 4,
  },
  walkRight: {
    x: 48,
    y: 0,
    width: 16,
    height: 16,
    frameCount: 4,
  },
};

const monsters = [
  new Monster({
    x: 160,
    y: 544,
    size: 15,
    imageSrc: "./images/bamboo.png",
    sprites: monstersSprites,
  }),
  new Monster({
    x: 80,
    y: 304,
    size: 15,
    imageSrc: "./images/bamboo.png",
    sprites: monstersSprites,
  }),
  new Monster({
    x: 64,
    y: 512,
    size: 15,
    imageSrc: "./images/bamboo.png",
    sprites: monstersSprites,
  }),
  new Monster({
    x: 144,
    y: 440,
    size: 15,
    imageSrc: "./images/dragon.png",
    sprites: monstersSprites,
  }),
  new Monster({
    x: 48,
    y: 272,
    size: 15,
    imageSrc: "./images/dragon.png",
    sprites: monstersSprites,
  }),
  new Monster({
    x: 144,
    y: 608,
    size: 15,
    imageSrc: "./images/dragon.png",
    sprites: monstersSprites,
  }),
];

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastTime = performance.now();
let frontRendersCanvas;

const hearts = [
  new Heart({
    x: 10,
    y: 10,
  }),
  new Heart({
    x: 32,
    y: 10,
  }),
  new Heart({
    x: 54,
    y: 10,
  }),
];

const leafs = [
  new Sprite({
    x: 128,
    y: 496,
    velocity: {
      x: 0.08,
      y: 0.08,
    },
  }),
];

let elapsedTime = 0;

function animate(backgroundCanvas) {
  // Calculate delta time
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  elapsedTime += deltaTime;

  if (elapsedTime > 1.5) {
    leafs.push(
      new Sprite({
        x: Math.random() * 150,
        y: Math.random() * 600,
        velocity: {
          x: 0.08,
          y: 0.08,
        },
      })
    );
    elapsedTime = 0;
  }

  // Update player position
  player.handleInput(keys);
  player.update(deltaTime, collisionBlocks);

  const horizontalScrollDistance = Math.min(
    Math.max(0, player.center.x - VIEWPORT_CENTER_X),
    MAX_SCROLL_X
  );

  const verticalScrollDistance = Math.min(
    Math.max(0, player.center.y - VIEWPORT_CENTER_Y),
    MAX_SCROLL_Y
  );

  // Render scene
  c.save();
  c.scale(MAP_SCALE, MAP_SCALE);
  c.translate(-horizontalScrollDistance, -verticalScrollDistance);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(backgroundCanvas, 0, 0);
  player.draw(c);

  //render out our monsters
  for (let i = monsters.length - 1; i >= 0; i--) {
    const monster = monsters[i];
    monster.update(deltaTime, collisionBlocks);
    monster.draw(c);

    // Detect for collision
    if (
      player.attackBox.x + player.attackBox.width >= monster.x &&
      player.attackBox.x <= monster.x + monster.width &&
      player.attackBox.y + player.attackBox.height >= monster.y &&
      player.attackBox.y <= monster.y + monster.height &&
      player.isAttacking &&
      !player.hasHitEnemy
    ) {
      monster.receiveHit();
      player.hasHitEnemy = true;

      if (monster.health <= 0) {
        monsters.splice(i, 1);
      }
    }

    // Collision for player getting hit
    if (
      player.x + player.width >= monster.x &&
      player.x <= monster.x + monster.width &&
      player.y + player.height >= monster.y &&
      player.y <= monster.y + monster.height &&
      !player.isInvincible
    ) {
      player.receiveHit();

      const filledHearts = hearts.filter((heart) => heart.currentFrame === 4);

      if (filledHearts.length > 0) {
        filledHearts[filledHearts.length - 1].currentFrame = 0;
      }

      if (filledHearts.length <= 1) {
        console.log("game over");
      }
    }
  }

  // c.drawImage(frontRendersCanvas, 0, 0);

  for (let i = leafs.length - 1; i >= 0; i--) {
    const leaf = leafs[i];
    leaf.update(deltaTime);
    leaf.draw(c);

    if (leaf.alpha <= 0) {
      leafs.splice(i, 1);
    }
  }

  c.restore();

  c.save();
  c.scale(MAP_SCALE, MAP_SCALE);
  hearts.forEach((heart) => {
    heart.draw(c);
  });
  c.restore();

  requestAnimationFrame(() => animate(backgroundCanvas));
}

const startRendering = async () => {
  try {
    const backgroundCanvas = await renderStaticLayers(layersData);
    // frontRendersCanvas = await renderStaticLayers(frontRendersLayersData);
    if (!backgroundCanvas) {
      console.error("Failed to create the background canvas");
      return;
    }

    animate(backgroundCanvas);
  } catch (error) {
    console.error("Error during rendering:", error);
  }
};

startRendering();
