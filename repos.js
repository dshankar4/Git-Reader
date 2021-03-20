import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import axios from 'axios';
require('dotenv').config()
const repo=process.env.repo
async function getIssuesPrivate() {
    const username = process.env.gitname
    const password = process.env.password
    const headers = {
        "Authorization" : "Token "+process.env.token
    }
    const url = "https://api.github.com/repos/"+username+"/"+repo
    const response = await axios.get(url, {
        "method": "GET",
        "headers": headers
    })
    console.log(response.data)

}
getIssuesPrivate()
