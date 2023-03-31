import postCreate from "./post_create/action.js"
import cron from 'node-cron';
// Run program at 3pm and 8pm
cron.schedule('0 3.5,20 * * *', () => {
    postCreate()
});



const url = `https://post-create.onrender.com/`
cron.schedule('0 */14 * * * *', () => {

axios.get(link_to_site, { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
    .then((req,res) => {console.log(`hit`)})
    .catch((err)=>{
    // console.log(err)
    })

});