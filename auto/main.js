$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>")

    let topicCount =topic.length;
    let millisecsPerDay = 24*60*60*1000;
    for(let i=0; i<topicCount; i++){
        $("#courseTable").append("<tr>");
        $("#courseTable").append(`<td>${i+1}</td>`);
        $("#courseTable").append(`<td>${(new Date(startDate.getTime()+7*i*millisecsPerDay)).toLocaleDateString()}</td>`);
        $("#courseTable").append(`<td>${topic[i]}</td>`);
        $("#courseTable").append("</tr>");

    }
})

