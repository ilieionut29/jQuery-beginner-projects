$(function () {
    
    function currentDate() {
        let currentDate = new Date().toLocaleString();
        let formatDate = currentDate.replace(","," - ");
        $("#date").html(formatDate);
    }
    setInterval(currentDate, 500);

    var myIndex = 0;
    function carousel() {
        let x = $(".slide");
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
        }
        myIndex++;
        if (myIndex > x.length) {
         myIndex = 1
        }    
        x[myIndex-1].style.display = "block";  
        setTimeout(carousel, 7000); 
    }
    carousel();

    $("#text-zone").keyup(function() {
        let max = 100;
        let textLenght = $(this).val().length;
        if (textLenght >= max) {
          $("#char-num").text("You have reached the limit!");
         } else {
          let char = max - textLenght;
          $("#char-num").text("Characters remaining: " + char);
        }
    });

    let sendMsg = $("#send-button");
    $(sendMsg).prop("disabled", true).addClass("send-off");

    $("#text-zone").keyup(function() {
        if ($(this).val() != 0) { 
            $(sendMsg).prop("disabled", false).addClass("send-on");
         } else {
            $(sendMsg).removeClass("send-on");
            $(sendMsg).prop("disabled", true).addClass("send-off");
        }
    });
     
    let content = $("#content");
    let sendButton = $(".fa-paper-plane");
    if(localStorage.getItem("#content")) { 
        content.html(localStorage.getItem("#content"));
    }
   
    $(sendButton).click(function () { 
        let textLog = $("#text-zone").val() 
        if (textLog != 0 || textLog != "" ) {
            let newList = $("<ul></ul>").addClass("list");
            let newItem = $("<li></li>").addClass("item");
            let check = $("<i></i>").addClass("far fa-circle check un-check");
            let newText = $("<p></p>").text(textLog).addClass("text");
            let newTrash = $("<div>♻️</div>").addClass("trash");
            let newLine = $("<hr>").addClass("line")
            let newSpace1 = $("<div></div>").addClass("just-space");
            let newSpace2 = $("<div></div>").addClass("just-space");
            content.prepend(newList);
            newList.append(newItem);
            newItem.append(check);
            newItem.append(newText);
            newText.html(textLog);
            newItem.append(newTrash);
            newList.append(newSpace1);
            newList.prepend(newSpace2);
            newList.append(newLine);

            new Audio("done.mp3").play();
            $("#text-zone").val("");
            $("#char-num").text("Characters remaining: 100");
            $(sendMsg).removeClass("send-on");
            localStorage.setItem("#content", content.html());
        }
    });

    $("#text-zone").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
        }
    });

    $(".box").click(".trash", function (e) {
        if (!e.target.classList.contains("trash"))
          return;
        $(e.target).parent("div.list").remove();
        $(e.target).closest(".list").remove();
        new Audio("del.mp3").play();
        localStorage.setItem("#content", content.html());
    });
    
    $("#content").click(".check un-check", function (e) {
        if (!e.target.classList.contains("check")) 
        return;
        $(e.target).toggleClass("far fa-circle");
        $(e.target).toggleClass("far fa-check-circle");
        $(e.target).siblings("p").toggleClass("text-check");
        $(e.target).siblings("p").toggleClass("text");
        new Audio("check.mp3").play();
        localStorage.setItem("#content", content.html());
    });

    $(".fa-refresh").click(function () {
        localStorage.clear();
        location.reload();
    });
});

