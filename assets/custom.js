jQuery(document).ready(function ($) {
    $(".clickyboxes li a").each(function() {
        if($(this).attr("class").indexOf("active") != -1) {
            $(this).closest(".selector-wrapper").find("label").find("span").text($(this).text())
        }
        $(this).click(function() {
            $(this).closest(".selector-wrapper").find("label").find("span").text($(this).text())
        })
    })

    $(".option_field.ring-sizes").append($(".keyideas.price"));
    $(".ring_quantity").append($(".quantity-wrapper"));

    setTimeout(() => {
        if($(".keyideas.price").length > 0) {
            $(".line-item-property__field").show();
            $(".options--shape").closest(".option--color-metal-shape").hide();
        }
    }, 500);

    $(".radio_boxes label").each(function() {
        $(this).click(function(){
            $(this).closest(".line-item-property__field").find("label").find("span").text($(this).text());
            $(this).closest(".radio_boxes").find("label").each(function() {
                $(this).removeClass("selected")
            })
            $(this).addClass("selected");
        })
    })

    $(".radio_boxes.ring_size_selector label").each(function() {
        $(this).click(function() {
            var ring_size = $(this).text()
            $(".allsizes").val(ring_size)
        })
    })
});