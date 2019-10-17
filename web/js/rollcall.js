// modified at 2019/10/17

var setCookie = function(cname, cvalue, exdays) {
    // cookie example: "question1=answer1;expires=Thu, 01 Jan 1970 00:00:00 UTC"
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
};

var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
};

$(document).ready(function(){
    $('#submitBtn').on('click', function(){
        const idElement = document.getElementById("studentId"),
            id = idElement.value;
        let submit = getCookie("submit");
        if (submit == ""){
            $.ajax({
                type: "POST",
                url: location.origin + "/addID",
                cache: false,
                data: JSON.stringify({
                    no: id
                }),
                contentType: "application/json",
                error: function(e){
                    alert("something wrong");
                    console.log(e);
                },
                success: function(data){
                    setCookie("submit", encodeURIComponent(id), 30);
                    //location.href = "https://aipoll.nctu.me";
                }
            });
        }
        else{
            console.log("fail");
        }
    });
});