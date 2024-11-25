$(function () {
  const api = "http://localhost:9009";

$("#categoryform").submit(function (ev) {
    ev.preventDefault();
    var record = $("#categoryform").serialize();
    $.ajax({
      type: "post",
      data: record,
      url: api + "/category",
      success: function (data) {
        console.log(data);
        $("#errmsg").html(data.message);
      },
      error: function (err) {},
    });
});

$("#brandform").submit(function (ev) {
  const api = "http://localhost:9009";

    ev.preventDefault();
    var record = $("#brandform").serialize();
    $.ajax({
      type: "post",
      data: record,
      url: "/brand",
      success: function (data) {
        console.log(data);
        $("#errmsg").html(data.message);
      },
      error: function (err) {},
    });
});

$(".category-filter").click(function (ev) {
  const api = "http://localhost:9009";
  ev.preventDefault();

  $.ajax({
    type: "post",
    data: { catid: $(this).attr("for") },
    url: api + "/filter-by-category",
    success: function (data) {
      console.log($(this).attr("for"));
      console.log(data);
      if (data.resultfromDb.length == 0) {
        $(".features_items").html("No Records Found");
      } else {
        var result = ``;
        data.resultfromDb.forEach((obj) => {
          console.log(obj);
          result =
            result +
            `
                    <div class="col-sm-4">
                    <div class="product-image-wrapper">
                      <div class="single-products">
                        <div class="productinfo text-center">
                          <img src="/public/products/${obj.filepath}" alt="" />
                          <h2>
                            <del>${obj.price}</del>
                          </h2>
                            <p>${obj.productname}</p>
                          <a href="#" class="btn btn-default add-to-cart"
                            ><i class="fa fa-shopping-cart"></i>Add to cart</a
                          >
                        </div>
                        <div class="product-overlay">
                          <div class="overlay-content">
                            <h2>
                             ${obj.price}
                            </h2>
                            <p><a href="/single-product/${obj._id}">${obj.productname}</a></p>
                            <a href="#" class="btn btn-default add-to-cart"
                              ><i class="fa fa-shopping-cart"></i>Add to cart</a
                            >
                          </div>
                        </div>
                      </div>
                      <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                          <li>
                            <a href="#"
                              ><i class="fa fa-plus-square"></i>Add to wishlist</a
                            >
                          </li>
                          <li>
                            <a href="#"
                              ><i class="fa fa-plus-square"></i>Add to compare</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                    `;
        });
        $(".features_items").html(result);
      }
    },
    error: function (err) {},
  });
});

$(".add-cart").click(function (ev) {
  const api = "http://localhost:9009";
  var id = $(this).attr("for");
  console.log(id);
  $.ajax({
    type: "POST",
    data: { proid: id },
    url: api + "/add-in-cart",
    success: function (data) {
      console.log(data);
      alert(data.msg);
      window.location.href = API + "/cart";
    },
    error: function (err) {},
  });
});


$(".delete-cart").click(function (e) {
  const api = "http://localhost:9009";
  e.preventDefault();
  console.log($(this));
  console.log($(this).attr("for"));

  var aTag = $(this);
  $.ajax({
    type: "POST",
    data: { proid: $(this).attr("for") },
    url: api + "/delete-from-cart",
    success: function (data) {
      console.log(data);
      aTag.parent().parent().fadeOut();
    },
    error: function (err) {},
  });
});

$("#productForm").submit(function (e) {
  const api = "http://localhost:9009";
  e.preventDefault();
  var categoryid = $("#categoryid").val();
  var brandid = $("#brandid").val();
  var productname = $("#productname").val();
  var price = $("#price").val();
  var discount = $("#discount").val();
  var description = $("#description").val();
  var filepath = $("#filepath");
  console.log(filepath);
  var filedata = filepath[0]["files"][0];
  var formObj = new FormData();
  formObj.append("categoryid", categoryid);
  formObj.append("brandid", brandid);
  formObj.append("productname", productname);
  formObj.append("price", price);
  formObj.append("discount", discount);
  formObj.append("description", description);
  formObj.append("filepath", filedata);

  $.ajax({
    type: "POST",
    data: formObj,
    url: api + "/product",
    contentType: false,
    processData: false,
    success: function (response) {
      console.log(response);
      $("#result").html(response.msg);
    },
    error: function (response) {
      console.log(response);
    },
  });
});


$("#registerForm").submit(function (ev) {
  const api = "http://localhost:9009";
  ev.preventDefault();
  var record = $("#registerForm").serialize();
  $.ajax({
    type: "post",
    data: record,
    url: api + "/register-action",
    success: function (data) {
      console.log(data);
      $("#register-err").html(data.message);
    },
    error: function (err) {},
  });
});

$("#loginForm").submit(function (ev) {
  const api = "http://localhost:9009";
  ev.preventDefault();
  var record = $("#loginForm").serialize();
  $.ajax({
    type: "post",
    data: record,
    url: api + "/login-action",
    success: function (data) {
      console.log(data);
      $("#login-err").html(data.message);
    },
    error: function (err) {},
  });
});


});