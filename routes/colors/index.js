const express = require("express");
const Gpio = require('pigpio').Gpio;

const router = express.Router();
// This will depend on which ports of the PI the strips are hooked onto
// TODO: Set up a global settings database to save these to in case of 
  // change
const redLEDPort = 17;
const greenLEDPort = 22;
const blueLEDPort = 24;

const LED_CONFIG = {mode: Gpio.OUTPUT};

let redLED = new Gpio(redLEDPort, LED_CONFIG);
let greenLED = new Gpio(greenLEDPort, LED_CONFIG);
let blueLED = new Gpio(blueLEDPort, LED_CONFIG);

let redV = 'ff';
let greenV = 'ff';
let blueV = 'ff';

router.get("/", (req, res) => {
  // Send back the current color code
  const colorAvailable = true;
  const colorCode = parseInt(`#${redV}${greenV}${blueV}`, 16);
  console.log("Outbound color: ", colorCode);

  if (colorAvailable) {
    res.status(200).send({
      colorCode,
      message: "Current set color",
    });
  } else {
    res.status(500).send({
      message: "Could not get color; check the server logs",
    });
  }
});


router.post("/changeColor", (req, res) => {
  const newColor = req.body.colorCode;
  console.log("Inbound color: ", newColor);
  const parsedRGBArray = hexS.slice(1, hexS.length).match(/[s\S]{1,2}/g) || [redV, greenV, blueV];
  redV = parsedRGBArray[0];
  greenV = parsedRGBArray[1];
  blueV = parsedRGBArray[2];
  try {    
    redLED.pwmWrite(redV);
    greenLED.pwmWrite(greenV);
    blueLED.pwmWrite(blueV);
    
    res.status(200).send({
      message: "Color updated!"
    });
  } catch (e) {
    console.log("Could not update color");
    console.log(e);
  }
});

module.exports = router;
