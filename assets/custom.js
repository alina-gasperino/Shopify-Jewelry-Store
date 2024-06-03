jQuery(document).ready(function ($) {
    $(".clickyboxes li a").each(function() {
        if($(this).attr("class").indexOf("active") != -1) {
            $(this).closest(".selector-wrapper").find("label").find("span").text($(this).text())
        }
        $(this).click(function() {
            console.log($(this).text())
            $(this).closest(".selector-wrapper").find("label").find("span").text($(this).text())
        })
    })
});