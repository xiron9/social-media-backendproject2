require("dotenv").config();
const { GoogleGenAI } =require("@google/genai");

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}


//abstraction
async function generateCaption(base64ImageFile){
 const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: contents,
  config:{
    systemInstruction:`
    you are an expert in generating caption for images.
    you will be given an image and you need to generate a caption for it.
    you generatesingle caption for the image.
    your caption should be short and concise.
    you use hastags and emojis in the caption.
    `
  }
});
   return response.text;
}

module.exports=generateCaption