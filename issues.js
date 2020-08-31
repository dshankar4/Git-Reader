import axios from 'axios';
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function dayDifference(date1, date2) {  
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
 }
async function getIssuesPrivate() {
        const username = username
        const password = password
        const headers = {
            "Authorization" : `Token `
        }
        const url = "https://api.github.com/search/issues?q=repo:dshankar4/E-Commerce type:issue"
        const response = await axios.get(url, {
            "method": "GET",
            "headers": headers
        })
        var data = response.data.items;
        data.map((_data)=>{
            var curr_date = new Date().toISOString();
            var milestone_date = _data.milestone.due_on;
            var finished = _data.closed_at;
            var assignee = _data.assignees;
            var title = _data.title;
            console.log(title)
            if(curr_date>milestone_date && finished !=="null"){
                console.log("issue has not been completed")
            }
            else if(curr_date===milestone_date){
                console.log("complete the issue today")
            }
            else if(curr_date<milestone_date){
                var date2 = new Date(milestone_date);
                var date = new Date(curr_date);
                console.log("complete the issue in",dayDifference(date2,date))
            }
        })
    }
getIssuesPrivate()
