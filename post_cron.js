import postCreate from "./post_create/action.js"
import cron from 'node-cron';
import express from "express"
// Run program at 3pm and 8pm
cron.schedule('0 12,17 * * *', () => {
    postCreate()
});



const url = `https://post-create.onrender.com/`
cron.schedule('0 */14 * * * *', () => {

axios.get(url, { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
    .then((req,res) => {console.log(`hit`)})
    .catch((err)=>{
    // console.log(err)
    })

});

const app = express()
const PORT = process.env.PORT||5000
app.get("/",(req,res)=>{
    res.json(
        `cron job is running! at ${PORT}`
    )
})

app.listen(PORT,()=>{
    console.log( `cron job is running! at ${PORT}`)
})