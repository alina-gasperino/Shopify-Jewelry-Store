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
    $('.template-suffix-stud .option_slider .product-block-options__inner').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        infinite: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
        ]
    });
    function updateClickableButtons() {
        $(".prev_var").each(function() {
            var slickSlider = $(this).parent().find(".slick-slider");
            var isDisabled = slickSlider.find(".slick-prev").attr("aria-disabled") === "true";
            $(this).toggleClass("slick-disabled", isDisabled);
        });
        $(".next_var").each(function() {
            var slickSlider = $(this).parent().find(".slick-slider");
            var isDisabled = slickSlider.find(".slick-next").attr("aria-disabled") === "true";
            $(this).toggleClass("slick-disabled", isDisabled);
        });
    }
    
    updateClickableButtons();

    $(".prev_var, .next_var").click(function() {
        const isPrev = $(this).hasClass("prev_var");
        const slickSlider = $(this).parent().find(".slick-slider");    
        if (slickSlider.length) {
            slickSlider.find("." + (isPrev ? "slick-prev" : "slick-next")).click();
        }
        updateClickableButtons();
    });

    $(".product-block-options__inner .product-block-options__item").each(function() {
        $(this).click(function() {
            $(this).siblings().removeClass("selected");
            $(this).addClass("selected");
        })
    })

    $(".go_to_product").each(function() {
        $(this).click(function() {
            var url = $(this).attr("url");
            var metal = $(this).parent().find(".product-block-options--swatch").find(".product-block-options__item.selected").text();
            var carat = $(this).parent().find(".option_slider").find(".product-block-options__item.selected").text();
            if(metal.length > 0 && carat.length > 0) {
                $(this).parent().find("select.valuable_selector").find('option').each(function() {
                    var option_label = $(this).text();
                    if(option_label.indexOf(metal) != -1 && option_label.indexOf(carat) != -1) {
                        var var_id = $(this).val();
                        url = url + "?variant=" + var_id;
                    }
                })
            }
            console.log(url);
            window.location.href = url;
        })
    })
});