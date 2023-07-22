let listingHTML = '';

listings.forEach((listing) => {
    wifi = listing.wifi ? "Yes" : "No";
    foodDrink = listing.foodDrink ? "Yes" : "No";
    quietSpace = listing.quietSpace ? "Yes" : "No";


    listingHTML += `
        <div class="listing">
            <img src="${listing.img}" alt="${listing.imgAlt}">

            <div class="listing_information">
                <div class="listing_top">
                    <div class="listing_title">
                        ${listing.name}
                    </div>
                    <div class="listing_stars">
                        &#9733;
                        &#9733;
                        &#9733;
                        &#9733;
                        &#9733;
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