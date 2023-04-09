import cron from 'node-cron';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import puppeteer from "puppeteer"
import genPrompt from "./prompts.js";
import CreateImage from "./openjourney.js";
dotenv.config()
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }


async function login(username,password,page){
      await page.type('[name=username]', username);

      await page.type('[name=password]', password);
      await page.evaluate(()=>{
        document.querySelector("._acap").click()
          console.log("ok")
        })
}
async function genPost(page){
      await page.evaluate(()=>{
        const btn = document.querySelectorAll(".x19c4wfv")[3]
        btn.click()
          console.log("ok")
        })

      await delay(5000)
      const prompt = await genPrompt()
      const url = await CreateImage(`${prompt[0]},digital art,manga,colourful,vibrant.`)


      const matchingButton = await page.waitForSelector("input[type='file']")


      await delay(5000)
      await matchingButton.uploadFile(`./image.jpg`);
      await delay(5000)
      await page.evaluate(()=>{
          const btn = document.querySelectorAll(".x1yc6y37")[1]
          btn.click()
            console.log("ok")
          })
      await delay(5000)
      await page.evaluate(()=>{
          const btn = document.querySelectorAll(".x1yc6y37")[1]
          btn.click()
            console.log("ok")
          })
      await delay(5000)
      console.log(prompt)
      await page.type("[aria-label='Write a caption...']", `${prompt[1]}
      [prompt : ${prompt[0]}]
      .
      .
      #aiart #art #ai #digitalart #generativeart #artificialintelligence #machinelearning #nft #aiartcommunity #abstractart #aiartists #neuralart #vqgan #ganart #contemporaryart #deepdream #artist #artoftheday #newmediaart #nightcafestudio #aiartist #modernart #neuralnetworks #neuralnetworkart #abstract #styletransfer #stylegan #digitalartist #artbreeder`);
      
     
}
async function post(page){
  await page.type('[name="creation-location-input"]',`India`)
  await page.mouse.click(10,10);
  await delay(10000)
  await page.evaluate(()=>{
    const btn = document.querySelectorAll(".x1yc6y37")[1]
    btn.click()
      })
}

async function postCreate(){
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36")
await page.goto('https://instagram.com/',{ waitUntil: 'domcontentloaded' });
await page.setViewport({width: 400, height: 700});

    
await delay(10000)

await login("","",page)

await delay(10000)

const task = cron.schedule('0 */2 * * *', async () => {
        
  await genPost(page)

  await delay(10000)

  await post(page)

  await delay(10000)

  await page.goto('https://www.instagram.com/accounts/onetap/?next=%2F');

});

task.start();


}
postCreate()
export default postCreate