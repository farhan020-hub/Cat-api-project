document.addEventListener("DOMContentLoaded", () => {

    // getting elements by their ID
    const catImage = document.getElementById("cat-image");
    const newCatButton = document.getElementById("new-cat-button");
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");
    const likesCount = document.getElementById("likes-count");
    const favoriteButton = document.getElementById("favorite-button");
    const shareButton = document.getElementById("share-button");

    // Initialize like and dislike counts
    let likeCount = 0;
    let dislikeCount = 0;
    let currentLikeCount = 0; // Keep track of the current like count for the displayed cat
    let isFavorited = false; // Initial state

    // Function to fetch a random cat image and reset like count
    function fetchRandomCat() {
        fetch(
            "https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_FAhOGMgdfgR2q8m21nLaaniHQk4cIJcdVQ90VJY7mq1pTa5hbKanhW1R0k67z8IS"
        )
            .then((resp) => resp.json())
            .then((data) => {
                // Get a random cat image from the response
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomCat = data[randomIndex];

                // Reset like counts when fetching a new image
                likeCount = 0;
                dislikeCount = 0;
                currentLikeCount = 0;

                // Update the UI to display the new like counts
                updateLikeCount();

                // Set the cat image source
                catImage.src = randomCat.url;
            })
            .catch((error) => {
                console.error("Error fetching cat image:", error);
            });

    }
    fetchRandomCat();

    // Add a click event listener to the "Get New Cat" button
    newCatButton.addEventListener("click", () => {
        fetchRandomCat();
    });

    // Function to update the displayed like count
    function updateLikeCount() {
        likesCount.textContent = `Likes: ${currentLikeCount}`;
    }

    // Add click event listeners to like and dislike buttons
    likeButton.addEventListener("click", () => {
        likeCat(1);
    });

    dislikeButton.addEventListener("click", () => {
        likeCat(-1);
    });

    // Function to vote for the current cat image
    function likeCat(value) {
        // Your Cat API key
        const apiKey = "live_FAhOGMgdfgR2q8m21nLaaniHQk4cIJcdVQ90VJY7mq1pTa5hbKanhW1R0k67z8IS";

    //  requestbody
        const requestBody = {
            image_id: "id_of_the_image",
            sub_id: "optional_unique_id_of_your_user",
            value: value,
        };

        // Headers including the 'x-api-key' header
        const headers = {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
        };

        // Make the POST request with headers
        fetch("https://api.thecatapi.com/v1/votes", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    // Successful like
                    console.log("like successful");
                    currentLikeCount += value; // Update the current like count
                    updateLikeCount(); // Update the displayed like count
                } else {
                    // Handle errors
                    console.error("Error liking:", response.status);
                }
            })
            .catch((error) => {
                console.error("Error liking:", error);
            });
    }

    // Function to handle favoriting/unfavoriting
    function toggleFavorite() {
        // Simulate API request success or failure
        const isApiRequestSuccessful = true;

        if (isApiRequestSuccessful) {
            // Toggle the favorited state
            isFavorited = !isFavorited;

            // Update the UI based on the favorited state
            if (isFavorited) {
                favoriteButton.textContent = "Unfavorite"; // Change button text

            } else {
                favoriteButton.textContent = "Favorite";

            }
        } else {
            // Handle API request failure, e.g., display an error message
            console.error("API request to favorite/unfavorite image failed");
        }
    }

    // Add click event listener to the favorite button
    favoriteButton.addEventListener("click", toggleFavorite);

    // Sharing to twitter functionality
    // Function to open Twitter share dialog(NOTE: LOGIN BEFORE BEING ABLE TO SHARE)
    function shareOnTwitter() {
        // Specify the text and image URL you want to share
        const text = "Check out this adorable cat!";
        const imageUrl = catImage.src; // Use the currently displayed cat image URL

        // Construct the Twitter share URL with the text and image
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
        )}&url=${encodeURIComponent(imageUrl)}`;

        // Open a new window or tab with the Twitter share URL
        window.open(twitterShareUrl, "_blank");
    }

    shareButton.addEventListener("click", () => {
        // Call the function to open the Twitter share dialog
        shareOnTwitter();


    });
});
