import { GenerateLocation, OpenAIConfig } from "./constants.js";
import fs from "fs";
export function generateHeaders() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
  };

  return headers;
}

export function getURL() {
  const url = `${OpenAIConfig.OPENAI_API_ENDPOINT}`;
  return url;
}

export function genratePrompts(prompt, postfix) {
  return `${prompt} ${postfix}`;
}

export function generateBody(messages) {
  //   console.log(JSON.stringify(messages, null, 2));
  return {
    messages,
    temperature: 0.5,
    max_tokens: 1024,
    n: 1,
    model: "gpt-3.5-turbo",
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  };
}

export async function writeToFile(schemaName, content) {
  //   console.log(content);
  const fileName = `${GenerateLocation.folder}/${schemaName}.prisma`;

  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log(`Schema saved to ${fileName}`);
  });
}
