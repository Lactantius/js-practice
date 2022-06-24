console.log("Let's get this party started!");

const key = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const endpoint = "https://api.giphy.com/v1/gifs/search";

async function getGif(endpoint, searchString, key) {
  const gif = await axios.get(endpoint, {
    params: { q: searchString, limit: 1, api_key: key },
  });
  addGif(gif.data.data[0].images.original.url);
}

function addGif(url) {
  const img = document.createElement("img");
  img.src = url;
  document.querySelector("#gif-container").append(img);
}
