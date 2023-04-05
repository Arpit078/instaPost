import cron from 'node-cron';
import postCreate from './post_create/action.js';
import express from "express"
const app = express()
app.get("/",(req,res)=>{
  res.send("hello the server is running")
})
// Run the task every 4 hours
const task = cron.schedule('0 */4 * * *', () => {
  // Perform your task here
    postCreate()
    console.log("posted")
});

task.start();

app.listen(5000,()=>{
  console.log("listening on 5000")
})