export const PrismaPromptPostfix =
  "Generate a valid .prisma file strictly containing datasource, generator, and models are defined earlier.";

export const OpenAIConfig = {
  OPENAI_API_ENDPOINT: "https://api.openai.com/v1/chat/completions",
};

export const GenerateLocation = {
  folder: "generated",
};

export const PostSchemaChoices = {
  message: "Select next step.",
  choices: [
    {
      name: "save",
      value: "save",
      description: "Save the schema to a file",
    },
    {
      name: "continue",
      value: "continue",
      description: "Continue improving schema",
    },
  ],
};
