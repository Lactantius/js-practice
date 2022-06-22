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

const $form = $("<form>")
  .addClass("pure-form")
  .append(titleInput)
  .append(ratingInput)
  .append(
    $("<button>")
      .attr("type", "submit")
      .addClass("pure-button pure-button-primary")
      .text("Rate it!")
  );
$("#movie-ratings").prepend($form);

$form.on("submit", function (evt) {
  evt.preventDefault();

  const $removeButton = $("<button>")
    .addClass("pure-button remove-btn")
    .text("X");

  const $rating = $("<span>")
    .text(`${titleInput.val()}: ${ratingInput.val()} stars`)
    .addClass("rating");

  const $li = $("<li>").append($rating).append($removeButton);
  $("#ratings-list").append($li);

  $("input").val("");
});

$("#ratings-list").on("click", ".remove-btn", function () {
  $(this).parent().remove();
});
