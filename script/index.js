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

filters = document.querySelectorAll(".amenities input");

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        showListings();
    });
});


//Function to check whether or not a listing should be displayed based on the filters that are checked on
function checkFilter(listing) {
    wifiFilter = document.querySelector("#wifi").checked;
    foodDrinkFilter = document.querySelector("#food-drink").checked;
    quietSpaceFilter = document.querySelector("#quiet-space").checked;
    onCampusFilter = document.querySelector("#on-campus").checked;
    outletsFilter = document.querySelector("#outlets").checked;
    restroomsFilter = document.querySelector("#restrooms").checked;
    publicFilter = document.querySelector("#public").checked;

    wifiBool = !wifiFilter || listing.wifi;
    foodDrinkBool = !foodDrinkFilter || listing.foodDrink;
    quietSpaceBool = !quietSpaceFilter || listing.quietSpace;
    onCampusBool = !onCampusFilter || listing.onCampus;
    outletsBool = !outletsFilter || listing.outlets;
    restroomsBool = !restroomsFilter || listing.restrooms;
    publicBool = !publicFilter || listing.public;

    return wifiBool && foodDrinkBool && quietSpaceBool && onCampusBool && outletsBool && restroomsBool && publicBool;
}