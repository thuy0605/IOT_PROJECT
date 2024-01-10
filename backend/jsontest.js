const mqtt = require("mqtt");
const fs = require("fs");
const { time } = require("console");
const { createClient } = require("@supabase/supabase-js");

//Create supabase client
const supabase = createClient(
  "https://ltsvrhaebjairkyiocij.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c3ZyaGFlYmphaXJreWlvY2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NTIzNjcsImV4cCI6MjAxNzQyODM2N30.GPAad2EZdKa0n8fGhZiVQCgV01vNu8dwN4wRWj-MLV4"
);

// MQTT Broker configurations
const mqttBrokerUrl =
  "mqtt://5bfa7e97494f4b4eb2bb2dd9dd092ac0.s2.eu.hivemq.cloud/";
const mqttOptions = {
  username: "jimihautamaki",
  password: "Iotgroup2",
  port: 8883,
  protocol: "mqtts",
};

// MQTT topics to subscribe
const temperatureTopic = "pigroup2/temperature";
const humidityTopic = "pigroup2/humidity";
const co2Topic = "pigroup2/co2";

// File to store sensor data
const sensorDataFile = "SensorData.txt";

// Object to store sensor data
let sensorData = {
  temperature: [],
  humidity: [],
  co2: [],
};

// Create MQTT client
const client = mqtt.connect(mqttBrokerUrl, mqttOptions);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(temperatureTopic, (err) => {
    if (err) {
      console.error("Error subscribing to temperature topic:", err);
    } else {
      console.log("Subscribed to temperature topic");
    }
  });
  client.subscribe(humidityTopic, (err) => {
    if (err) {
      console.error("Error subscribing to humidity topic:", err);
    } else {
      console.log("Subscribed to humidity topic");
    }
  });
  client.subscribe(co2Topic, (err) => {
    if (err) {
      console.error("Error subscribing to CO2 topic:", err);
    } else {
      console.log("Subscribed to CO2 topic");
    }
  });
});

client.on("message", async (topic, message) => {
  const dataValue = parseFloat(message.toString());

  if (!isNaN(dataValue)) {
    await updateSensorData(topic, dataValue);
  } else {
    console.log("Invalid data received:", message.toString());
  }
});

function formatTimestamp() {
  const now = new Date();
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  return `${day}-${month}-${year}/${hours}:${minutes}`;
}

async function updateSensorData(dataType, value) {
  const timestamp = formatTimestamp();
  console.log(`${dataType}, ${value}, ${timestamp}`);
  sensorData[dataType.split("/")[1]].push([timestamp, value]);

  //Insert datatype to supabase table
  if (dataType === temperatureTopic) {
    const { error } = await supabase
      .from("temperature")
      .insert({ value, created_at: timestamp });
    console.log(`supabase ${temperatureTopic} error`, error);
  }

  if (dataType === humidityTopic) {
    const { error } = await supabase
      .from("humidity")
      .insert({ value, created_at: timestamp });
    console.log(`supabase ${humidityTopic} error`, error);
  }

  if (dataType === co2Topic) {
    const { error } = await supabase
      .from("co2")
      .insert({ value, created_at: timestamp });
    console.log(`supabase ${co2Topic} error`, error);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  client.end(() => {
    console.log("Disconnected from MQTT broker");
    process.exit();
  });
});

// const { data } = await supabase.from("temperature").select();
// console.log("jsontest temperature.data", data);
