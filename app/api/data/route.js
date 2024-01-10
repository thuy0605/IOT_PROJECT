import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ltsvrhaebjairkyiocij.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c3ZyaGFlYmphaXJreWlvY2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NTIzNjcsImV4cCI6MjAxNzQyODM2N30.GPAad2EZdKa0n8fGhZiVQCgV01vNu8dwN4wRWj-MLV4"
);

export async function GET() {
  const temperature = await supabase.from("temperature").select();
  const humidity = await supabase.from("humidity").select();
  const co2 = await supabase.from("co2").select();
  const sensorData = {
    temperature: [],
    humidity: [],
    co2: [],
  };

  temperature.data
    .map((item) => ({
      created_at: item.created_at,
      value: item.value,
    }))
    .map(({ created_at, value }) =>
      sensorData.temperature.push([created_at, value])
    );

  humidity.data
    .map((item) => ({
      created_at: item.created_at,
      value: item.value,
    }))
    .map(({ created_at, value }) =>
      sensorData.humidity.push([created_at, value])
    );

  co2.data
    .map((item) => ({
      created_at: item.created_at,
      value: item.value,
    }))
    .map(({ created_at, value }) => sensorData.co2.push([created_at, value]));

  return NextResponse.json(sensorData);
}
