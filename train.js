const dotenv = require("dotenv");
dotenv();

const openai = require("openai")(process.env.OPEN_API_KEY);

// Set up the dataset configuration
const datasetConfig = {
  name: "My Dataset",
  description: "A dataset of prompts and completions",
  files: [
    {
      purpose: "fine-tuning",
      url: "https://your-bucket.s3.amazonaws.com/your-file.jsonl",
      contentType: "application/json",
    },
  ],
  fineTuningPrompt: "This is a prompt used for fine-tuning.",
  fineTuningModel: "text-davinci-002",
  language: "en",
  client: "openai",
};

// Create a new dataset from the JSONL file
openai.datasets.createFineTuneDataset(datasetConfig, (err, dataset) => {
  if (err) throw err;

  console.log("Dataset created:", dataset.id);

  // Fine-tune a pre-existing model on the new dataset
  const fineTuneConfig = {
    model: "text-davinci-002",
    dataset: dataset.id,
    epochs: 3,
    batchSize: 4,
    learningRate: 1e-5,
  };

  openai.completions.fineTune(fineTuneConfig, (err, result) => {
    if (err) throw err;

    console.log("Model trained:", result.id);
  });
});
