import dotenv from "dotenv";

import { welcome } from "./templates/welcome.js";
import { generatePrismaTemplate } from "./templates/prisma.js";

dotenv.config();

async function init() {
  const prompt = await welcome();

  const next = await generatePrismaTemplate(prompt);

  if (next) {
    init();
  }
}

await init();
