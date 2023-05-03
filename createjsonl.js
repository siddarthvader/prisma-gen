import dotenv from "dotenv";

import fs from "fs";
import openai from "openai";

dotenv.config();

const title = "Godspeed microservices framework.";

async function train() {
  // Read the conversations from the exported file
  const conversations = JSON.parse(
    fs.readFileSync("./public/data/conversations.json")
  );

  const jsonlData = {};

  let chatIndex = 0;

  let prevRole = "user";
  conversations.forEach((convo) => {
    console.log(convo.title);
    if (convo.title === title) {
      //   console.log(convo.title);
      Object.keys(convo.mapping).map((map) => {
        // console.log(map);
        if (convo.mapping[map].message) {
          const role = convo.mapping[map].message.author.role;

          if (role === "user") {
            if (!jsonlData[chatIndex]) {
              jsonlData[chatIndex] = {
                prompt: "",
                answer: "",
              };
            }
            jsonlData[chatIndex].prompt =
              convo.mapping[map].message.content.parts;
            prevRole = "user";
          }

          if (role === "assistant") {
            if (!jsonlData[chatIndex]) {
              jsonlData[chatIndex] = {
                prompt: "",
                answer: "",
              };
            }
            jsonlData[chatIndex].answer +=
              convo.mapping[map].message.content.parts;

            if (prevRole === "user") {
              chatIndex++;
            }
            prevRole = "assistant";
          }
          //   console.log(convo.mapping[map].message.author.role);
          //   console.log(convo.mapping[map].message.author);
          //   console.log(convo.mapping[map].message.content.parts);
        }
      });
    }
  });

  //   console.log(jsonlData);
  writeToJSONL(jsonlData);

  //   // Set up the OpenAI API credentials
  //   openai.apiKey = process.env.OPEN_API_KEY;

  //   //   console.log(openai);

  //   // Call the OpenAI API to create a model
  //   const modelName = "godspeed-1";
  //   const modelId = await openai.models.create({
  //     engine: "davinci",
  //     trainingData: conversations,
  //     name: modelName,
  //   });

  //   console.log(`Model created with ID: ${modelId}`);
}

function writeToJSONL(data) {
  const file = fs.createWriteStream(
    "./public/generated/godspeed-microservice.jsonl"
  ); // 'a' flag appends to the file if it already exists

  Object.keys(data).forEach((key) => {
    const json = JSON.stringify(data[key]);
    console.log(data[key]);
    file.write(json + "\n"); // write each request on a new line
  });
  file.end();
}

train();
