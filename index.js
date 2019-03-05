// Import outside libraries
const Phaser = require('phaser');
// Local Modules
const SerialPortReader = require('./SerialPortReader');

//TEST

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
};

const serial = new SerialPortReader();

let graphics;
let serialMessage;

// Phaser setup
function create() {
  graphics = this.add.graphics({
    fillStyle: { color: 0xeeeeee },
    lineStyle: { width: 3, color: 0xeeeeee}
  });

}

function update(totalTime, deltaTime) {
  // console.log(serialMessage);
  graphics.clear();

  graphics.save();
  graphics.lineStyle(5, 0xeeeeee, 1.0);
  console.log(serialMessage);
  if(serialMessage == "PU"){
    graphics.fillStyle(0xFFF000, 1.0);
    graphics.fillCircle(200, 200, 12);
  }
  if(serialMessage == "PD"){
    graphics.fillStyle(0xFFFF00, 1.0);
    graphics.fillCircle(200, 300, 12);
  }
  if(serialMessage == "LR"){
    graphics.fillStyle(0xFFFFF0, 1.0);
    graphics.fillCircle(300, 100, 12);
  }
  if(serialMessage == "LL"){
    graphics.fillStyle(0xFF00FF, 1.0);
    graphics.fillCircle(300, 200, 12);
  }
  if(serialMessage == "FL"){
    graphics.fillStyle(0xFF0FFF, 1.0);
    graphics.fillCircle(100, 100, 12);
  }
    graphics.fillCircle(400, 300, 12);
    graphics.restore();
}



function onSerialMessage(msg) {
  // Put your serial reading code in here. msg will be a string
  serialMessage = msg;
  console.log(msg);
}


config.scene = {
  create: create,
  update: update
}

let game;
  
// Exported Module so game can be initialized elseware
const GameManager = {
  init: () => {

    // Set serial port listener. To keep the code clean we use a helper function defined above
    serial.setListener(onSerialMessage);
    // The openPort function takes a callback function for finding the correct arduino from a list
    // and whatever you want your delimiter to be between packets
    serial.openPort(p => /Arduino/.test(p.manufacturer), ':');
    
    game = new Phaser.Game(config);
  },
};

module.exports = GameManager;
