$(function () {
  console.log("Ready for jQuery");
});

// Center image
$("img").addClass("image-center");

// Remove last paragraph
$("p").get(-1).remove();

// Change title font-size
$("h1").css("font-size", Math.floor(Math.random() * 100));

// Add an li
$("ol").append($("<li>").text("Important Stuff"));

// Replace contents of aside
$("aside").empty().append($("<p>").text("That list was lame. Sorry"));

// Change background color on input
$("input").on("change", function () {
  const [red, green, blue] = [
    $("input").eq(0).val(),
    $("input").eq(2).val(),
    $("input").eq(1).val(),
  ];

  $("body").css("background-color", `rgb(${red}, ${green}, ${blue})`);
});

// Listener to remove image
$("img").on("click", function (evt) {
  evt.target.remove();
});
