$(function(){
    $("#choicesButton").on("click", function(){
        //alert("Hi");
        let lilength = $("#choices li").length;
        let lirandom = Math.floor(Math.random()*lilength);
        $("#choicesH1").text($("#choices li").eq(lirandom).text());

        //利用attr改變img元件的src，變成li的title
        $("#choicesImg").attr("src", $("#choices li").eq(lirandom).attr("title"));
        
    })
});