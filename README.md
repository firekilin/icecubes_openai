# icecubes_openai

### 1.google app script : line bot 利用 google app script 製作openai chatGPT & 產圖程式
### 2.基本串接openai node.js

### [line機器人](https://line.me/R/ti/p/%40125rxjzk)
### [拿錢砸我](https://p.ecpay.com.tw/8E29ABF)

--------------
## 1.google app script : line bot 利用 google app script 製作openai chatGPT & 產圖程式
### linebot: [icecube_chatGPT](https://liff.line.me/1645278921-kWRPP32q/?accountId=092byusf)

### 需求安裝
#### [DocsServiceApp](https://github.com/tanaikech/DocsServiceApp) :`108j6x_ZX544wEhGkgddFYM6Ie09edDqXaFwnW3RVFQCLHw_mEueqUHTW`
![image](https://user-images.githubusercontent.com/8066463/225524183-9f7bc0af-5c81-4355-8ba6-fbd9ee8d3505.png)



----------
## 2.基本串接openai node.js
### npm install
### npm start 

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
