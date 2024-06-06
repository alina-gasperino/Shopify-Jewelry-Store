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

    $(".option_field.ring-sizes").append($(".keyideas.price"))

    setTimeout(() => {
        if($(".keyideas.price").length > 0) {
            $(".line-item-property__field").show()
        }
    }, 500);

});