import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import axios from 'axios';
require('dotenv').config()
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const repo=process.env.repo
function dayDifference(date1, date2) {  
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
 }
async function getIssuesPrivate() {
        const username = process.env.gitname
        const password = process.env.password
        const headers = {
            "Authorization" : "Token "+process.env.token
        }
        const url = "https://api.github.com/search/issues?q=repo:"+username+"/"+repo+ " type:issue"
        const response = await axios.get(url, {
            "method": "GET",
            "headers": headers
        })
        console.log(response)
        
    }
getIssuesPrivate()
