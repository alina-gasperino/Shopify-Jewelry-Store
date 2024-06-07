document.addEventListener('DOMContentLoaded', () => {
    var free_account=Math.random().toString(36).slice(2, 10);
  
      $("table .product-option dt").each(function(){
        if($(this).text()=="Diamond:"){
             $(this).parents("tr").first().find('.cart-item__image-container').prepend(`<div class="${free_account}" style="display:none!important">Sample</div>`);
        }
      }); 
      
      setTimeout(() => {
        if(JSON.parse(localStorage.getItem("get-data")) && JSON.parse(localStorage.getItem("get-data")).sample){
          $('.cart-item__image-container .' + free_account).attr('style','position: absolute; top: 2px; left: 2px; background-color: var(--app-background-primary-color); padding: 2px 2px; border-radius: 3px; font-size: 10px; color: black; display: inline-block !important; visibility: visible !important;');
        }  
      }, 0);
  
    // Theme related issue
    if($(".column_quantity").length > 0){
      $(".main_content ").attr("id","main-cart-items");
      $(".column_quantity input").each(function(){
        var vid = $(this).attr("id").split(":")[0].split("_")[1];
          $(this).attr("data-quantity-variant-id",vid);
      });
    }
  
    // Theme End
  
  
    $("cart-items, .cart_items").addClass("key-loading");
    let loadCart = 0;
  
    $("body").on("click","[type='submit'][name='add']", function(){
      loadCart = 0;
      addedToCart();
    })
  
  $("body").on("click",".quantity__button", function(){
      $("cart-items").addClass("key-loading");
      $(this).closest("quantity-popover").addClass("current");
      loadCart = 0;
      setTimeout(function(){
        $(".cart-item__quantity").hide();
        LoadCartKey();
        hideProperties();
        addRingSize();
        LoadCartKey();
        LoadCartKey2();      
      },1500)
  })
  $("body").on("click","cart-remove-button, .cart_item__remove", function(){
    $("cart-items, .cart_items").addClass("key-loading");
    $(this).closest("quantity-popover").addClass("current");
    loadCart = 0;
    setTimeout(function(){
      LoadCartKey();
      LoadCartKey2()
      hideProperties();
      addRingSize();
      LoadCartKey();
      LoadCartKey2();
    },1500)
  
  })
  
  function addedToCart(){
    var prevNowPlaying = null;
    prevNowPlaying = setInterval(function () {
            if($("cart-drawer.drawer").hasClass("active")){
              $(".cart-item__quantity").hide();
              clearInterval(prevNowPlaying);
                LoadCartKey();
                hideProperties();
                addRingSize();
            }
        
    }, 500);  
  }
  
    function LoadCartKey(){
    
      fetch("/cart.json", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response) {
        return response.json();
      })
      .then(function(data) {
          let items = data['items'];
          let removeUrl1 = "/cart/change?id=";
          let removeUrl2 = "&quantity=0";
          let dim = [];
  
          for(let i=0; i < items.length; i++){
            let item = items[i];
            let prop = item.properties;
            if(prop.SKU){
              dim.push(prop.SKU);
            }
          }
            const valueCounts = {};
            dim.forEach(value => { 
              valueCounts[value] = (valueCounts[value] || 0) + 1;
            });
            //console.log("sss",valueCounts);
             for (const value in valueCounts) {
              if (valueCounts.hasOwnProperty(value)) {
                const counts = valueCounts[value];
                if(counts == 1){
                    removeFromCart(value);
                }
              }
            }
  
          
  
          for(let i=0; i < items.length; i++){
  
            
              let item = items[i];
              let prop = item.properties;
              var removeBtn = removeUrl1+item.key+removeUrl2;
              if(item.vendor == "Diamond Picker"){
                  $("input[data-quantity-variant-id='"+item.variant_id+"']").parent().hide();
              }
  
              if(prop.SKU !=""){
                $("#CartDrawer table.cart-items tr").each(function(){
                  if($(this).text().indexOf(prop.SKU) != -1)
                  {
            
                    if(!$(this).hasClass("keyideas-start-bundle") && !$(this).hasClass("keyideas-end-bundle")){
                      var remove_cart = [];
                      for(let j=0; j < items.length; j++){
                        var item_ = items[j];
                        var prop_ = item_.properties;
                        if(prop_.SKU == prop.SKU){
                          remove_cart.push(removeUrl1+item_.key+removeUrl2);
                        }
                      }
           
                      sideCartAction($(this),'start',removeBtn);
      
                        $("#CartDrawer table.cart-items tr").each(function(){
                          if($(this).text().indexOf(prop.SKU) != -1)
                          {
                              
                              if(!$(this).hasClass("keyideas-start-bundle") && !$(this).hasClass("keyideas-end-bundle")){
                                  
                                  sideCartAction($(this),'end',remove_cart[1]);
                                  return false;
                              }
              
                          }
                        });
      
                    }
                        if(document.getElementById("CartDrawer")){
                          setInterval(function(){
                            var cd = $("#CartDrawer").find(".remove-product").length;
                            loadCart++;
                            if(cd <=0 ){
                              if(loadCart<=100){
                                LoadCartKey();
                              }
                            }
      
                          },500);
                      }
      
                  }
                });
                hideProperties();
                $(".cart-item__quantity").show();
                
                $("cart-items").removeClass("key-loading");
  
  
              }
      
          }
      }).catch(function(error) {
             console.log('Error adding product to cart:', error);
             $("cart-items").removeClass("key-loading");
  
          });
      
          
           $("#CartDrawer-CartItems table .product-option dt").each(function(){
              if($(this).text()=="Diamond:" || $(this).text()=="SKU:" ){
                   $(this).parent().hide();
                   $(this).parents("tr").find("quantity-popover").hide();
              }
            });
      
      
      }
    hideProperties();
  function hideProperties(){ 
  if($("#CartDrawer-CartItems").length>=1){
    setInterval(function(){
      $("#CartDrawer-CartItems table .product-option dt").each(function(){
        if($(this).text()=="Diamond:" || $(this).text()=="DiamondSku:" ){
             $(this).parent().hide();
             $(this).parents("tr").first().find('.cart-item__image-container').prepend(`<div class="${free_account}" style="display:none!important">Sample</div>`);
             if($(this).parents("tr").find("quantity-popover .remove-product")<=0){
                $(this).parents("tr").find("quantity-popover").hide();
             }
        }
      });  
    },1000);
  }    
  }
      
      var p_side_cart = null;
      var removeBtn_ = null;
      function sideCartAction(cart,pos,removeBtn){
        if(pos=='start'){
          cart.addClass("keyideas-start-bundle");
          cart.find("quantity-popover").html(`<div style="width:14px;">
          <a  class="remove-product" href="javascript:void(0)" data_remove="${removeBtn}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="icon icon-remove">
          <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
          <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
          </svg></a></div>
          <div class="loading-overlay__spinner hidden" style="width:18px;">
              <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
              </svg>
          </div>
        `).show();
        p_side_cart = cart;
        removeBtn_ = removeBtn;
        }
        else if(pos=='end'){
          cart.addClass("keyideas-end-bundle");
          p_side_cart.find("quantity-popover .remove-product").attr("data_remove",removeBtn_+","+removeBtn)
          cart.append(`<span style="display:none;" class="remove-product" data_remove="${removeBtn+","+removeBtn_}"></span>`);
        }
      }
    
    function LoadCartKey2(){
      $("#main-cart-items table .product-option dt").each(function(){
        if($(this).text()=="SKU:"){
      
             var src = $(this).next().text();
             if(!$(this).parents("tr").first().hasClass("keyideas-start-bundle") && !$(this).parents("tr").first().hasClass("keyideas-end-bundle")){
              cartAction($(this),'start');
              $("#main-cart-items table .product-option dt").each(function(){
              if($(this).text()=="SKU:"){
                 if(!$(this).parents("tr").first().hasClass("keyideas-start-bundle") && !$(this).parents("tr").first().hasClass("keyideas-end-bundle")){
                   cartAction($(this),'end');
                   return false;
                  }
              }
            });
          }
        }
      });
    
        if(document.getElementById("CartDrawer")){
            setInterval(function(){
              var cd = $("#main-cart-items").find(".remove-product").length;
                loadCart++;
                if(cd <=0 ){
                  if(loadCart<=100){
                    LoadCartKey2();
                }
              }
          },500);
        } 
        
         
        $("#main-cart-items table .product-option dt").each(function(){
          if($(this).text()=="Diamond:" || $(this).text()=="SKU:" ){
            $(this).parents("tr").find("quantity-input").hide();
               $(this).parent().hide();
          }
        });      
    
    }
    
    var p_cart = null;
    function cartAction(cart,pos){
      cart.parent().hide();
      cart.parents("tr").find("quantity-popover").hide();
      let removeBtn = cart.parents("tr").find("cart-remove-button a").attr("href");
    
      if(pos=='start'){
          cart.parents("tr").first().addClass("keyideas-start-bundle");
          cart.parents("tr").first().find("quantity-popover").html(`<div style="width:14px;">
          <a  class="remove-product" href="javascript:void(0)" data_remove="${removeBtn}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="icon icon-remove">
          <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
          <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
          </svg></a></div>
          <div class="loading-overlay__spinner hidden" style="width:18px;">
              <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
              </svg>
          </div>
        `).show();
        p_cart = cart;
      }
      else if(pos=='end'){
        cart.parents("tr").first().addClass("keyideas-end-bundle");
        var prev_remove = p_cart.parents("tr").first().find("quantity-popover .remove-product").attr("data_remove");
        p_cart.parents("tr").first().find("quantity-popover .remove-product").attr("data_remove",prev_remove+","+removeBtn)
        //console.log(prev_remove);
        cart.append(`<span style="display:none;" class="remove-product" data_remove="${removeBtn+","+prev_remove}"></span>`);
        cart.parents("tr").first().find('.cart-item__image-container').prepend(`<div class="${free_account}" style="display:none!important">Sample</div>`);
      }    
  
    }
    
    
    
    
    
    LoadCartKey();
    LoadCartKey2();
    
  function removeFromCart(value){
  
   
    fetch("/cart.json", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json();
    })
    .then(function(data) {
        let items = data['items'];
        for(let i=0; i < items.length; i++){
            let item = items[i];
            let prop = item.properties;
            if(prop.SKU == value){
                  let key = item.key;
                  fetch(`/cart/change?id=${key}&quantity=0`, {
                    method: 'GET'
  
                  }).then(function(response) {
                    return response;
                  })
                  .then(function(data) {
                    window.location.reload();
                  });
  
              
            }
          }
        });
  
  }
  
    $("body").on("click", ".remove-product", function(){
    
        $(this).hide();
        $(this).parents("quantity-popover").first().find(".loading-overlay__spinner").removeClass("hidden");
    
        let removeItems = $(this).attr("data_remove");
        let carts = removeItems.split(",");
    
          fetch(carts[0], {
                    method: 'GET'
    
          }).then(function(response) {
            return response;
          })
          .then(function(data) {
                         fetch(carts[1], {
                                  method: 'GET'
    
                        }).then(function(response) {
                          return response;
                        })
                        .then(function(data) {
                                window.location.reload();
                        })
                        .catch(function(error) {
                          console.log('Error adding product to cart:', error);
                        });
    
    
          })
          .catch(function(error) {
            console.log('Error adding product to cart:', error);
          });
    
    });
    
    
    
    let RingSizes = `<div class="ring-sizes">
                                      
                              <select class="field allsizes">
                                    <option>3</option>
                                    <option>3.25</option>
                                    <option>3.5</option>
                                    <option>3.75</option>
                                    <option>4</option>
                                    <option>4.5</option>
                                    <option>4.35</option>
                                    <option>4.75</option>
                                    <option>5</option>
                                    <option>5.5</option>
                                    <option>5.35</option>
                                    <option>5.75</option>
                                    <option>6</option>
                                    <option>6.5</option>
                                    <option>6.35</option>
                                    <option>6.75</option>
                                    <option>7</option>
                                    <option>7.5</option>
                                    <option>7.35</option>
                                    <option>7.75</option>
                                    <option>8</option>
                                    <option>8.5</option>
                                    <option>8.35</option>
                                    <option>8.75</option>
                                    <option>9</option>
                                    <option>9.5</option>
                                    <option>9.35</option>
                                    <option>9.75</option>
                                    <option>10</option>
                                    <option>10.5</option>
                                    <option>10.35</option>
                                    <option>10.75</option>
                                    <option>11</option>
                                    <option>11.5</option>
                                    <option>11.35</option>
                                    <option>11.75</option>
                                    <option>12</option>
                                    <option>I don't know</option>
                              </select>
                     </div>`;
  addRingSize();
  function addRingSize(){                   
        $("#CartDrawer-CartItems table .product-option dt").each(function(){
            if($(this).text()=="Ring Size:"){
                var current_size = $(this).next().text();
                $(this).next().html(RingSizes);
                $(this).next().find(".ring-sizes .allsizes").val(current_size.trim());
            }
        });
        $("#main-cart-items table .product-option dt").each(function(){
            if($(this).text()=="Ring Size:"){
                var current_size = $(this).next().text();
                $(this).next().html(RingSizes);
                $(this).next().find(".ring-sizes .allsizes").val(current_size.trim());
            }
        });
  }   
    
    $("body").on("change", ".ring-sizes .allsizes", function(e){
        let ringSize = $(this).val();
        let cartIds = $(this).parents("tr").first().find(".remove-product").attr("data_remove");
        cartIds = cartIds.split(",")[0].split("=")[1].split("&")[0];
        var SKU = "";
        $(this).parents("tr").first().find(".product-option dt").each(function(){
          if($(this).text()=="SKU:" ){
            SKU = $.trim($(this).parent().find("dd").text());
          }
        });
  
          var requestData = {
              "id": cartIds,
              "properties": {
                  "Ring Size": ringSize,
                  "SKU": SKU
                   
              }
          } 
          fetch("/cart/change.js", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              window.location.reload();
            })
            .catch(error => {
              console.error('Error updating cart item property:', error);
            });
    
    
    
    });    
    
      $("body").on("change", ".ring-sizes .field.ring", function(e) {
               var element = $(this).find('option:selected'); 
               var ringSize = element.attr("vid"); 
               $("form[action='/cart/add']").find("[name='id']").val(ringSize);             
      }); 
  
    });