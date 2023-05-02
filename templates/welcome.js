import { input } from "@inquirer/prompts";

export async function welcome() {
  return await input({
    message: "Write prompts to generate Prisma Schema",
  });
}
