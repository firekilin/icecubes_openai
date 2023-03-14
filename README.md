# icecubes_bagels_openai

### 待製作相關程式畫面及更多
### [抖內](https://p.ecpay.com.tw/8E29ABF)

## npm install

## npm start 

```
    //執行chatgpt
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "維尼熊 大頭照"}]
    });
    
    //執行openai Dell 畫圖
    const completion2 = await openai.createImage({
      prompt:chattoeng,
      n:1,
      size:"1024x1024"
    });

```
