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
        var data = response.data.items;
        var details = [];
        data.map((_data)=>{
            var curr_date = new Date().toISOString();
            var milestone_date = _data.milestone.due_on;
            var finished = _data.closed_at;
            var assignee = _data.assignees.map((data)=>data.login);
            var title = _data.title;
            var git_data = {
                tile:title,
                status:"",
                assignees:assignee
            }
            if(curr_date>milestone_date && finished !=="null"){
                git_data.status="not completed"
                details.push(git_data)
            }
            else if(curr_date===milestone_date){
                git_data.status="completed the issue today",
                details.push(git_data)
            }
            else if(curr_date<milestone_date){
                var date2 = new Date(milestone_date);
                var date = new Date(curr_date);
                git_data.status="complete the issue in " + dayDifference(date2,date) + " days",
                details.push(git_data)
            }
        })
        console.log(details)
    }
getIssuesPrivate()
