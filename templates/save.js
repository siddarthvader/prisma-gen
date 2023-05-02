import { input } from "@inquirer/prompts";
import { writeToFile } from "../helpers/util.js";

export async function save(content) {
  const filename = await input({
    message: "Write the name of the file to save the schema to",
  });

  console.log({ filename });

  await writeToFile(filename, content);
}
