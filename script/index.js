//Function that generates the HTML for the listings to be shown on the index webpage
function showListings() {
    let listingHTML = '';

    listings.forEach((listing) => {
        displayBool = checkFilter(listing);

        if (!displayBool) {
            return;
        }

        wifi = listing.wifi ? "Yes" : "No";
        foodDrink = listing.foodDrink ? "Yes" : "No";
        quietSpace = listing.quietSpace ? "Yes" : "No";
        starRating = `/photos/ratings/rating-${listing.numOfStars * 10}.png`;



        listingHTML += `
            <div class="listing">
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
            </div>
        `;
    });

    document.querySelector(".listing-section").innerHTML = listingHTML;
}

showListings();


//Give each amenities filter an event listening for onclick to reload the listings when toggled
const filters = document.querySelectorAll(".amenities input");

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        showListings();
    });
});

//Give each of the star rating filters and event listener for clicks to relead the listings when toggeled
const starRatings = document.querySelectorAll('input[name="star-ratings"]');

starRatings.forEach((starRating) => {
    starRating.addEventListener('click', () => {
        showListings();
    });
});


//Function to check whether or not a listing should be displayed based on the filters that are checked on
function checkFilter(listing) {
    //Find the star rating
    const ratings = document.querySelectorAll("input[name='star-ratings']");
    let starFilter = 0;

    ratings.forEach((rating) => {
        if (rating.checked) {
            starFilter = Number(rating.value);
            return;
        }
    })

    const wifiFilter = document.querySelector("#wifi").checked;
    const foodDrinkFilter = document.querySelector("#food-drink").checked;
    const quietSpaceFilter = document.querySelector("#quiet-space").checked;
    const onCampusFilter = document.querySelector("#on-campus").checked;
    const outletsFilter = document.querySelector("#outlets").checked;
    const restroomsFilter = document.querySelector("#restrooms").checked;
    const publicFilter = document.querySelector("#public").checked;

    const starBool = starFilter <= listing.numOfStars;
    const wifiBool = !wifiFilter || listing.wifi;
    const foodDrinkBool = !foodDrinkFilter || listing.foodDrink;
    const quietSpaceBool = !quietSpaceFilter || listing.quietSpace;
    const onCampusBool = !onCampusFilter || listing.onCampus;
    const outletsBool = !outletsFilter || listing.outlets;
    const restroomsBool = !restroomsFilter || listing.restrooms;
    const publicBool = !publicFilter || listing.public;

    return starBool && wifiBool && foodDrinkBool && quietSpaceBool && onCampusBool && outletsBool && restroomsBool && publicBool;
}