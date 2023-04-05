import axios from "axios"
import cheerio from "cheerio"
import { Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

const promptChoice = ["creature-prompts","character","environment-prompts"]

async function genPrompt(){
    const url = `https://artprompts.org/${promptChoice[Math.floor(Math.random()*3)]}/`
    const promptText = axios.get(url)
        .then(async (res)=>{
        const html = res.data
        const $ = cheerio.load(html) 
        const promptDiv = $(".et_pb_text_inner p") 
        const prompt = promptDiv.find("span").text()
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `return me a quirky instagram caption related to ${prompt}`,
            temperature: 0,
            max_tokens:30
          });
        // console.log(prompt)
        const text = [prompt.slice(0,-1),response.data.choices[0].text.slice(2)]
        return text
    }
    ).catch((err)=> console.log(err))
    return promptText
}
// let text  = await genPrompt()
// console.log(text)
export default genPrompt


