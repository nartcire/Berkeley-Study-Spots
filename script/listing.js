//retrieve the name of the listing from the page URL
const urlParams = new URLSearchParams(window.location.search);
const pageID = urlParams.get("value");

generateListingHTML(pageID);

async function generateListingHTML(pageID) {
  let listing;

  await axios
    .get(`http://localhost:5020/${pageID}`)
    .then((res) => {
      listing = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  const listingObj = listing[0];
  let listingHTML = "";

  const checkMark = "/photos/general/checkmark.png";
  const xMark = "/photos/general/xmark.png";

  wifi = listingObj.wifi ? checkMark : xMark;
  foodDrink = listingObj.foodDrink ? checkMark : xMark;
  quietSpace = listingObj.quietSpace ? checkMark : xMark;
  onCampus = listingObj.onCampus ? checkMark : xMark;
  outlets = listingObj.outlets ? checkMark : xMark;
  restrooms = listingObj.restrooms ? checkMark : xMark;
  public = listingObj.public ? checkMark : xMark;

  listingHTML += `
        <div class="left-section">
            <div class="general-info">
                <img class="study-spot-img" src="${listingObj.img}"
                    alt="${listingObj.imgAlt}">
                <div class="listing-name">
                    ${listingObj.name}
                </div>
                <div class="listing-address">
                    ${listingObj.address}
                </div>
                <img class="star-rating-img" src="/photos/ratings/rating-${
                  listingObj.numOfStars * 10
                }.png" alt="star rating">
            </div>
            <div class="yelp-section">
                <a
                    href="${listingObj.yelpLink}">Link
                    to Yelp
                </a>
            </div>
        </div>
        <div class="right-section">
            <div class="amenities">
                <div class="amenities-title">
                    Amenities
                </div>
                <div class="amenity">
                    <img class="mark" src="${wifi}" alt="photo of a mark">
                    Wifi
                </div>
                <div class="amenity">
                    <img class="mark" src="${foodDrink}" alt="photo of a mark">
                    Food/Drink
                </div>
                <div class="amenity">
                    <img class="mark" src="${quietSpace}" alt="photo of a mark">
                    Quiet Space
                </div>
                <div class="amenity">
                    <img class="mark" src="${onCampus}" alt="photo of a mark">
                    On Campus
                </div>
                <div class="amenity">
                    <img class="mark" src="${outlets}" alt="photo of a mark">
                    Outlets
                </div>
                <div class="amenity">
                    <img class="mark" src="${restrooms}" alt="photo of a mark">
                    Restrooms
                </div>
                <div class="amenity">
                    <img class="mark" src="${public}" alt="photo of a mark">
                    Public
                </div>
            </div>

            <div>
                <hr>
            </div>

            <div class="google-map">
                <iframe
                    src="${listingObj.googleEmbed}"
                    width="450" height="240" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    `;

  document.querySelector(".individual-listing").innerHTML = listingHTML;
}
