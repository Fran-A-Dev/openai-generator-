const openai = require("../config/openaiConfig");

const generateMeta = async (req, res) => {
  const { title } = req.body;

  const description = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Come up with a description for a YouTube video called ${title}`,
      },
    ],
    max_tokens: 100,
  });

  console.log(description.choices[0].message);

  const tags = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `come up with 10 keywords for a YouTube video called ${title}`,
      },
    ],
    max_tokens: 100,
  });

  res.status(200).json({
    description: description.choices[0].message,
    tags: tags.choices[0].message,
  });
};

const generateImage = async (req, res) => {
  const image = await openai.images.generate({
    prompt: req.body.prompt,
    n: 1,
    size: "1024x1024",
  });

  res.json({
    url: image.data[0].url,
  });
};

module.exports = { generateMeta, generateImage };
