const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function start() {
    
  try {
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "幫我翻譯成英文:維尼熊 大頭照"}]
    });

    console.log(completion.data.choices[0].message.content.substring(2));
    let chattoeng=completion.data.choices[0].message.content.substring(2);
    const completion2 = await openai.createImage({
      prompt:chattoeng,
      n:1,
      size:"1024x1024"
    });
    console.log(completion2.data.data[0]);
    image_url = completion2.data.data[0].url;
    console.log(image_url);

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
start();