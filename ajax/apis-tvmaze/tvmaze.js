"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchTerm) {
  const res = await axios.get("https://api.tvmaze.com/search/shows", {
    params: { q: searchTerm },
  });
  return res.data.map((show) => ({
    id: show.show.id,
    name: show.show.name,
    summary: show.show.summary,
    image: show.show.image.medium ?? "https://tinyurl.com/tv-missing",
  }));
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image}"
              alt="${show.name}"
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button data-show-id="${show.id}" class="btn btn-primary Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const episodes = await axios.get(
    `https://api.tvmaze.com/shows/${id}/episodes`
  );
  return episodes.data.map((episode) => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));
}

/** Given an array of episodes, add them to the DOM */

function populateEpisodes(episodes) {
  $episodesArea.show();
  const $episodesList = $("#episodes-list");

  for (let episode of episodes) {
    const $episode = $("<li>")
      .text(
        `${episode.name} (Season ${episode.season}, episode ${episode.number})`
      )
      .attr("data-episode-id", episode.id);

    $episodesList.append($episode);
  }
}

/** Handle episodes show request */
$showsList.on("click", ".Show-getEpisodes", function () {
  console.log($(this).text());
  searchForEpisodesAndDisplay($(this).data("show-id"));
});

async function searchForEpisodesAndDisplay(id) {
  const episodes = await getEpisodesOfShow(id);

  populateEpisodes(episodes);
}
