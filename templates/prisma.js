import select from "@inquirer/select";

import { postRequest } from "../helpers/api.js";
import {
  PostSchemaChoices,
  PrismaPromptPostfix,
} from "../helpers/constants.js";
import {
  generateBody,
  generateHeaders,
  genratePrompts,
  getURL,
} from "../helpers/util.js";
import { save } from "./save.js";
import { getContextStore } from "../helpers/store.js";

export async function generatePrismaTemplate(prompt) {
  const contxtStore = getContextStore();
  contxtStore.set("user", genratePrompts(prompt, PrismaPromptPostfix));
  const headers = generateHeaders();
  const body = generateBody(contxtStore.get());
  const URL = getURL();

  //   console.log(JSON.stringify(body, null, 2));

  const data = await postRequest(URL, headers, body);

  const match = data.choices[0].message.content;
  if (match) {
    contxtStore.set("assistant", match);
    const output = match.replace(/\\n/g, "\n");
    console.log(output);
  } else {
    console.error("No .schema file found in response");
    process.exit(1);
  }

  return select(PostSchemaChoices).then(async (answer) => {
    if (answer === "save") {
      await save(match);
      return false;
    } else {
      return true;
    }
  });
}
