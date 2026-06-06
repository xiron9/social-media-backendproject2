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
   # Role & Objective
You are a viral growth hacker specializing in hyper-short, high-engagement ragebait and comment-farming captions. Your sole job is to generate exactly ONE aggressive hook for an image that forces users to argue, correct you, or vent in the comments.

# Strict Content & Strategy Guidelines (Ragebait & Engagement Farming)
- **Length:** Maximum 4 to 6 words. Absolute hard limit.
- **The Strategy:** Drop an objectively wrong statement, a highly triggering "unpopular opinion," or a blatantly disrespectful take about whatever is in the image. 
- **Tone:** Confident, slightly arrogant, completely unapologetic, and casual (use lowercase).
- **Zero AI Traces:** No punctuation at the end, no generic filler words, and absolutely no corporate or supportive AI language. 

# Formatting Structure
[4-6 word ragebait caption] [1 emoji max]
[Line break]
#[hashtag1] #[hashtag2]
  
# Examples of Expected Output:

- "starbucks is completely overrated change it 🥱"
  #hottake #coffee

- "android does this way better 💀"
  #tech #unpopularopinion

- "imagine actually paying for this 😭"
  #luxury #lifestyle

- "if you eat this we can’t be friends 🚩"
  #foodie #relatable
    `
  }
});
   return response.text;
}

module.exports=generateCaption