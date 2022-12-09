$(document).ready(function () {
  $("#search").click(function (e) {
    e.preventDefault();
    $(".image").remove();
    $("h3").remove();
    var searchText = $("#searchBar");
    var url;
    const images = [];
    if (searchText.val() !== "") {
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8da25d44d9152ac7c834437d02cc3d4a&text=${searchText.val()}&content_type=0&per_page=3&page=1&format=json&nojsoncallback=1`;
      $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
          if (response.photos.photo.length === 0) {
            const h3 = "<h3>No Image found</h3>";
            $("#images").append(h3);
          } else {
            $.each(response.photos.photo, function (index, photo) {
              images.push(
                `<img src='https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg' alt="${photo.title}" />`
              );
            });
          }
        },
        error: function (error) {
          console.log(error);
        },
      }).done(function () {
        $.each(images, function (index, img) {
          const div = `<div class="col-md-4 image" id="image${index}"></div>`;
          $("#images").append(div);
          $(`#image${index}`).append(img);
        });
      });
    }
  });
});
