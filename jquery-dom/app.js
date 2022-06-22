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

// For movie ratings

const titleAttrs = {
  id: "title-input",
  type: "text",
  placeholder: "What movie are you rating?",
};

const ratingAttrs = {
  id: "rating-input",
  type: "number",
  min: 0,
  max: 10,
  placeholder: "Stars",
};

const titleInput = $("<input>").attr(titleAttrs);
const ratingInput = $("<input>").attr(ratingAttrs);

const form = $("<form>")
  .append(titleInput)
  .append(ratingInput)
  .append($("<input>").attr("type", "submit"));
$("#movie-ratings").prepend(form);

form.on("submit", function (evt) {
  evt.preventDefault();

  const $removeButton = $("<button>").addClass("remove-btn").text("X");
  const $li = $("<li>")
    .text(`${titleInput.val()}: ${ratingInput.val()} stars`)
    .addClass("rating")
    .append($removeButton);
  $("#ratings-list").append($li);
});

$("#ratings-list").on("click", ".remove-btn", function () {
  $(this).parent().remove();
});
