//Function that generates the HTML for the listings to be shown on the index webpage
async function showListings() {
  let listings;

  await axios
    .get("http://localhost:5020")
    .then((res) => {
      listings = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  let listingHTML = "";

  listings.forEach((listing) => {
    const displayBool = checkFilter(listing);

    if (!displayBool) {
      return;
    }

    const wifi = listing.wifi ? "Yes" : "No";
    const foodDrink = listing.foodDrink ? "Yes" : "No";
    const quietSpace = listing.quietSpace ? "Yes" : "No";
    const starRating = `/photos/ratings/rating-${listing.numOfStars * 10}.png`;

    listingHTML += `
            <div class="left_right_listing">
                <a href="listing.html?value=${listing.ID}" class="listing">
                    <img src="${listing.img}" alt="${listing.imgAlt}">

                    <div class="listing_information">

                        <div class="listing_top">
                            <div class="listing_title">
                                ${listing.name}
                            </div>
                            <div class="listing_stars">
                                <img src="${starRating}">
                            </div>
                        </div>

                        <div class="listing_bottom">
                            <div>
                                Wifi: ${wifi}
                            </div>
                            <div>
                                Food/Drink Allowed: ${foodDrink}
                            </div>
                            <div>
                                Quiet Space: ${quietSpace}
                            </div>
                            <div>
                                Address: ${listing.address}
                            </div>
                        </div>
                    </div>
                </a>

                <a href="${listing.googleLink}" class="listing_location_icon" target="_blank">
                    <img src="/photos/general/location_icon.png"/>
                </a>
            </div>
        `;
  });

  document.querySelector(".listing-section").innerHTML = listingHTML;
}

//Call function to show listing
showListings();

//Give each amenities filter an event listener for onclick to reload the listings when toggled
const filters = document.querySelectorAll(".amenities input");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    showListings();
  });
});

//Give each star rating filter an event listener for onclock to reload the listings when toggled

const starRatings = document.querySelectorAll("input[name='star-ratings']");

starRatings.forEach((starRating) => {
  starRating.addEventListener("click", () => {
    showListings();
  });
});

//Give the name filter input element an event listener for onpress to reload the listings whenever text is inputed into the text box

const nameFilter = document.querySelector(".name-search");

nameFilter.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === 13) {
    showListings();
  }
});

//Function to check whether or not a listing should be displayed based on the filters that are checked on
function checkFilter(listing) {
  //Find the star rating
  const ratings = document.querySelectorAll("input[name='star-ratings']");
  let starFilter = 0;
  let nameFilter = document.querySelector(".name-search").value;

  ratings.forEach((rating) => {
    if (rating.checked) {
      starFilter = Number(rating.value);
      return;
    }
  });

  const wifiFilter = document.querySelector("#wifi").checked;
  const foodDrinkFilter = document.querySelector("#food-drink").checked;
  const quietSpaceFilter = document.querySelector("#quiet-space").checked;
  const onCampusFilter = document.querySelector("#on-campus").checked;
  const outletsFilter = document.querySelector("#outlets").checked;
  const restroomsFilter = document.querySelector("#restrooms").checked;
  const publicFilter = document.querySelector("#public").checked;

  const nameBool = listing.name
    .toLowerCase()
    .includes(nameFilter.toLowerCase());
  const starBool = starFilter <= listing.numOfStars;
  const wifiBool = !wifiFilter || listing.wifi;
  const foodDrinkBool = !foodDrinkFilter || listing.foodDrink;
  const quietSpaceBool = !quietSpaceFilter || listing.quietSpace;
  const onCampusBool = !onCampusFilter || listing.onCampus;
  const outletsBool = !outletsFilter || listing.outlets;
  const restroomsBool = !restroomsFilter || listing.restrooms;
  const publicBool = !publicFilter || listing.public;

  return (
    nameBool &&
    starBool &&
    wifiBool &&
    foodDrinkBool &&
    quietSpaceBool &&
    onCampusBool &&
    outletsBool &&
    restroomsBool &&
    publicBool
  );
}
