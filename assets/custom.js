jQuery(document).ready(function ($) {
    $(".clickyboxes li a").each(function() {
        if($(this).attr("class").indexOf("active") != -1) {
            $(this).closest(".selector-wrapper").find("label").find("span").text($(this).text())
        }
        $(this).click(function() {
            $(this).closest(".selector-wrapper").find("label").find("span").text($(this).text())
        })
    })

    var timer = setInterval(() => {
        if($(".keyideas.reviewprice").length > 0) {
            clearInterval(timer)
            $(".line-item-property__field").show();
            $(".options--shape").closest(".option--color-metal-shape").hide();
            $(".option_field.ring-sizes").append($(".keyideas.reviewprice"));
            $(".ring_quantity").append($(".quantity-wrapper"));
            $(".option-selectors").hide()
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

    $(".calendar").click(function() {
        $(".bookeasy-button-container button").click();
    })

    $('.template-suffix-studs .options--carat-total-weight').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        infinite: false
    });
    function updateClickableButtons() {
        $(".prev_var").toggleClass("slick-disabled", $(".options--carat-total-weight .slick-prev").attr("aria-disabled") === "true");
        $(".next_var").toggleClass("slick-disabled", $(".options--carat-total-weight .slick-next").attr("aria-disabled") === "true");
    }
    
    updateClickableButtons();
    
    $(".prev_var, .next_var").click(function() {
        const isPrev = $(this).hasClass("prev_var");
        $(".options--carat-total-weight ." + (isPrev ? "slick-prev" : "slick-next")).click();
        updateClickableButtons();
    });
});