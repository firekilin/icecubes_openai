// 設定安全碼
const config = { 
  channelAccessToken: "",
  channelSecret: "",
  token:""  //token.csv id

}

let botEcho = (reToken, userMsg)=>{
	var url = 'https://api.line.me/v2/bot/message/reply';
	var opt = {
		'headers': {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': 'Bearer ' + config.channelAccessToken,
		},
		'method': 'post',
		'payload': JSON.stringify({
				'replyToken': reToken,
				'messages': userMsg
				})
	};
	var res = UrlFetchApp.fetch(url, opt);
	return res;
}

let doPost = (e)=>{ 
  const event = JSON.parse(e.postData.contents).events[0];
  const reToken = event.replyToken;
  
	if (typeof reToken === 'undefined') return;

  if (event.type === "message") {

    const message = event.message;
  
    if (message.type == "text" && message.text === "冰塊系統")
    {
       showtime (event);
       return;
    }
    
    if (message.type == "text" && message.text.split(",")[0]==="請問"){
      chat(event,message.text.split(",")[1]);
      return;
    }
    if (message.type == "text" && message.text.split(",")[0]==="產圖"){
      if(message.text.split(",").length==2){
        image(event,message.text.split(",")[1],1,"1024x1024");
      }else if (message.text.split(",").length==3){
        image(event,message.text.split(",")[1],parseInt(message.text.split(",")[2]),"1024x1024");
      }else if (message.text.split(",").length==4){
        image(event,message.text.split(",")[1],parseInt(message.text.split(",")[2]),message.text.split(",")[3]);
      }
      return;
    }
    if (message.type == "text" && message.text.split(",")[0]==="token"){
      savetoken(event,message.text.split(",")[1]);
      return;
    }
    if (event.source.type=='user'){
      if (message.type == "image"){
        getmessagecontent(event,event.message.id);
      }else if(message.type == "text"){
        chat(event,message.text);

      }
    }
  }
  if (event.type === "postback"){
    const postback = event.postback;

      
    if (postback.data === "說明")
    {
      info (event);
    }
 
  }
  

	//return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


//系統顯示
let showtime =  (event) => {
  botEcho (event.replyToken, [
    {
      "type": "flex",
      "altText": "冰塊說明",
      "contents": { "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "nano",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "使用說明",
                  "color": "#ffffff",
                  "align": "start",
                  "size": "md",
                  "gravity": "center"
                }
              ],
              "backgroundColor": "#27D190",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "說明",
                        "data": "說明"
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                }
              ]
            },
            "styles": { "footer": { "separator": false } }
          },
          {
            "type": "bubble",
            "size": "nano",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "作者",
                  "color": "#ffffff",
                  "align": "start",
                  "size": "md",
                  "gravity": "center"
                }
              ],
              "backgroundColor": "#F77C59",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "uri",
                        "label": "抖內",
                        "uri": "https://p.ecpay.com.tw/8E29ABF"
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "作者",
                        "data": "作者"
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                }
              ],
              "spacing": "md",
              "paddingAll": "12px"
            },
            "styles": { "footer": { "separator": false } }
          }
        ] }
    }
  ]);
}

//作者
let auther = (event) =>{
  botEcho (event.replyToken, [{ type: "text",
    text: `
   作者：
    安安我是冰塊
    可以私訊我 製作有趣的東西
    盡量小且便利（不清楚也可以問問看）
    若我喜歡可以免費ＸＤ 
    不過我會放抖內按鈕
    此程式希望協助到各位
    
    信箱:wl00161839@gmail.com
    ` }]);
}

//說明
let info = (event) => {
  botEcho (event.replyToken, [{ type: "text",
    text: `
    傳   [請問,{內容}]
      取得 chatGPT 回應

    傳   [產圖,{內容},{數量},{大小}]
      內容:隨意
      數量:0-10
      大小:1024x1024
      用逗點間隔
      取得 DALL 產圖
      
    傳   [token,{內容}]
      保存各自 token
      以使用者來保存
      
    若在群組內 請先加入冰塊機器人好友 並傳送token 將會綁定使用者 在群組中也可以使用 (要同機器人)`
  }]);
}
//getheader
let getheader = async(event)=>{
  let testfile=await  DriveApp.getFileById(config.token);
  var fileBlob =await testfile.getBlob();
  var alldata = fileBlob.getDataAsString().split("\r\n");
  let token=null;
  for(let i=0;i< alldata.length;i++){
      if(alldata[i].split(",")[0]===event.source.userId){
        token=alldata[i].split(",")[1];
      }
  }
  if(token!=null){
    let header={
            "authorization": "Bearer "+token,
            "content-type": "application/json",
        };
      return header;
  }else{
    return null;
  }
 
}

//chatGPT
let chat=(event,message) =>{
  let body = JSON.stringify({
    'model': 'gpt-3.5-turbo',
    'messages': [
      {
        'role': 'user',
        'content': message
      }
    ]
  });
  openai(event,"chat",body);
}

let image = (event,message,imgnum,imgsize) =>{
  let body=JSON.stringify({
    "prompt": message,
    "n": imgnum,
    "size": imgsize
  });
  openai(event,"image",body);
  
}

let openai =async (event,type,body)=>{
  let sendtype="";
  if(type==="chat"){
    sendtype="v1/chat/completions";
  }else if(type==="image"){
    sendtype="v1/images/generations";
  }else{
      botEcho (event.replyToken, [{ type: "text",
      text: "失敗"
    }]);
    return 
  }

  //取得api回傳
  let header=await getheader(event);

  if(header){
     let getresponse=await  UrlFetchApp.fetch("https://api.openai.com/"+sendtype, {
      "method":"post",
      "headers": header,
      "payload": body
    });
    let resopnsetojson=JSON.parse(getresponse.getContentText());
    if(type==="chat"){
      let returnmessage=resopnsetojson.choices[0].message.content;
      botEcho (event.replyToken, [{ type: "text",
        text: returnmessage
      }]);
    }else if(type==="image"){
      botEcho (event.replyToken, [trunbackimg(resopnsetojson)]);
    }else{
        botEcho (event.replyToken, [{ type: "text",
        text: "失敗"
      }]);
      return ;
    }
  }else{
    botEcho (event.replyToken, [{ type: "text",
      text: `
請註冊token,輸入 [token,{內容}]
      
註冊網址
https://platform.openai.com/account/api-keys`
    }]);
    return;
  }
}

let trunbackimg = (resopnsetojson)=>{
  let img=resopnsetojson.data;
  let imgdatalist=[];
  for(let i =0;i<img.length;i++){
    imgdatalist.push({
            "type": "bubble",
            "size": "nano",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "圖片"+(i+1),
                  "color": "#ffffff",
                  "align": "start",
                  "size": "md",
                  "gravity": "center"
                }
              ],
              "backgroundColor": "#27D190",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "uri",
                        "label": "圖片"+(i+1),
                        "uri": img[i].url
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                }
              ]
            },
            "styles": { "footer": { "separator": false } }
          })
  }
  let message={
      "type": "flex",
      "altText": "圖片列表",
      "contents": { "type": "carousel",
        "contents":imgdatalist }
    }
  return message;
}

let savetoken =async (event,token)=>{
  let testfile=await  DriveApp.getFileById(config.token);
  var fileBlob =await testfile.getBlob();
  var alldata =await fileBlob.getDataAsString().split("\r\n");
  var alldatasave="";
  var userdatasave="";
  var having=false;
  for(let i=0;i< alldata.length;i++){
      if(alldata[i].split(",")[0]===event.source.userId){
        userdatasave=alldata[i].split(",")[0]+","+token;
        having=true;
      }else{
        alldatasave+=alldata[i]+"\r\n";
      }
  }
  if(!having){
    userdatasave=event.source.userId+","+token;
  }
  alldatasave+=userdatasave;
  await testfile.setContent(alldatasave);
  botEcho (event.replyToken, [{ type: "text",
        text: "完成註冊token"
      }]);
      return;
}



//取得照片並改png 成1024等等
async function  getmessagecontent(event,messageId){
  var url = `https://api-data.line.me/v2/bot/message/${messageId}/content`;
	var opt = {
		'headers': {
			'Authorization': 'Bearer ' + config.channelAccessToken,
		},
		'method': 'get'
	};
	var res = await UrlFetchApp.fetch(url, opt);
  const imageBlob = await res.getBlob();
  let folder=DriveApp.createFolder("icecubesTemp");
  let filename = {
    title: "imgaddtext",
    "parents": [{'id':folder.getId()}],
  };

  file = Drive.Files.insert(filename, imageBlob);
  if(typeof file.mimeType ==='undefined' || (!file.mimeType.toLocaleLowerCase().includes("image/jpeg") && !file.mimeType.toLocaleLowerCase().includes("image/png"))){
    Drive.Files.remove(file.getId());
    return;
  }

  const object = {
    title: filename.title, // Title of created Slides.
    width: { unit: "pixel", size: 1024 },
    height: { unit: "pixel", size:  1024},
  };

  const presentationId = DocsServiceApp.createNewSlidesWithPageSize(object);
  const s = SlidesApp.openById(presentationId);
  const slide = s.getSlides()[0];
  slide.insertImage(imageBlob);
  s.saveAndClose();

  const obj = Slides.Presentations.Pages.getThumbnail(
    presentationId,
    slide.getObjectId(),
    {
      "thumbnailProperties.thumbnailSize": "LARGE",
      "thumbnailProperties.mimeType": "PNG",
    }
  );
  const imgurl = obj.contentUrl.replace(/=s\d+/, "=s" + 1024);
  await sendReportToSteve(event,imgurl);
  var file2 = DriveApp.getFileById(presentationId);
  file2.moveTo(folder);
  Drive.Files.remove(file.getId());
  Drive.Files.remove(file2.getId());
  Drive.Files.remove(folder.getId());
}



let sendReportToSteve = async (event,url)=> {
  let testfile=UrlFetchApp.fetch(url);
  var url = "https://api.openai.com/v1/images/variations";
  var form = {
    image : testfile.getBlob(),
    n : "1",
    size : "1024x1024",
  };
  await uploadFile(event,url,form);
  return true;
}

let uploadFile = async(event,url,form) =>{
    //取得api回傳
    //取得api回傳
  let header=await getheader(event);

  if(header){
      var options = {
        headers:{
          'Content-Disposition': 'attachment; filename="test.PNG"',
          'Authorization': header['authorization'],
        },
        method : "POST",
        payload : form
      };
      var response = UrlFetchApp.fetch(url,options);
      botEcho (event.replyToken, [trunbackimg(JSON.parse(response))]);
      return true;
  }else{
    botEcho (event.replyToken, [{ type: "text",
      text: `
請註冊token,輸入 [token,{內容}]
      
註冊網址
https://platform.openai.com/account/api-keys`
    }]);
    return;
  }
 
}











