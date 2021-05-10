$(function(){
    let currentQuiz = null;
    //按鈕按下觸發
    $("#startButton").on("click",function(){
        if(currentQuiz==null){
            //初始
            currentQuiz=0;
            //印出第一個問題
            $("#question").text(questions[0].question);
            //清空選項，若不做最後重新開始時結果仍會存在
            $("#options").empty();
            //foreach尋訪印出選項
            questions[0].answers.forEach(function(element, index, array){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>
                ${element[0]}</label><br><br>`);
            });
            //把按鈕文字改成Next
            $("#startButton").attr("value","Next");
        }else{
            //非初始
            //尋訪選項
            $.each($(":radio"),function(i,val){
                //如果這個選項被勾選就執行
                if(val.checked){
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //如果值不是數字就表示已經走到最後，應該印出結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");
                    }else{
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element, index, array){
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    //因為是單選，若是已經找到勾選的就跳出迴圈
                    return false;
                }
            });
        }
    });
});