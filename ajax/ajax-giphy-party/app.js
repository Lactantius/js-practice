console.log("Let's get this party started!");

const key = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const endpoint = "https://api.giphy.com/v1/gifs/search";

async function getGif(endpoint, searchString, key) {
  const gif = await axios.get(endpoint, {
    params: { q: searchString, limit: 1, api_key: key },
  });
  insertGif(gif.data.data[0].images.original.url);
}

function insertGif(url) {
  const img = document.createElement("img");
  img.src = url;
  document.querySelector("#gif-container").append(img);
}

/** Search button */
document.querySelector("#gif-form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const searchBox = document.querySelector("#search-box");
  const searchString = searchBox.value;
  getGif(endpoint, searchString, key);
  searchBox.value = "";
});

/** Remove button */
document
  .querySelector("#remove-btn")
  .addEventListener("click", () =>
    document.querySelectorAll("img").forEach((img) => img.remove())
  );
