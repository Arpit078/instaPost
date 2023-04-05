// import replicate from "node-replicate"
import fs from "fs"
import https from "https"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import genPrompt from "./prompts.js"
import Replicate from "replicate";
const replicate = new Replicate({
  // get your token from https://replicate.com/account
  auth: "726dcda293dcd6eaaa3fe372e5712867547f46fb",
});

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


async function CreateImage(prompt_text){

  const output = await replicate.run(
    "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
    {
      input: {
        prompt: prompt_text
      }
    }
  );
  

        
              //// URL of the image
            const url = output[0];
            https.get(url, (res) => {
            const path = "image.jpg";
            const writeStream = fs.createWriteStream(path);

            res.pipe(writeStream);

            writeStream.on("finish", () => {
              writeStream.close();
              console.log("Download Completed!");
            })
            })
            return url

        
      }





// let prompt = await genPrompt()
// let url = await CreateImage(prompt[0])
// console.log(prompt)
export default CreateImage


