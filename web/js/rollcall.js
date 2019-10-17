$(document).ready(function(){
    $('#submitBtn').on('click', function(){
        const idElement = document.getElementById("studentId"),
            id = idElement.value;
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
                location.href = "https://aipoll.nctu.me";
            }
        });
    });
});