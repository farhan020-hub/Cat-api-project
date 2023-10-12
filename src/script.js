document.addEventListener("DOMContentLoaded", () => {
    const catContainer = document.getElementsByClassName(".cat-container");
    const catImage = document.getElementById("cat-image");
    const newCatButton = document.getElementById("new-cat-button");
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");
    const likesCount = document.getElementById("likes-count");
  
    // Initialize like and dislike counts
    let likeCount = 0;
    let dislikeCount = 0;
    let currentLikeCount = 0; // Keep track of the current like count for the displayed cat
  
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
  
    // Function to update the displayed like count
    function updateLikeCount() {
      likesCount.textContent = `Likes: ${currentLikeCount}`;
    }
  
    // Add click event listeners to like and dislike buttons
    likeButton.addEventListener("click", () => {
      voteCat(1);
    });
  
    dislikeButton.addEventListener("click", () => {
      voteCat(-1);
    });
  
    // Function to like for the current cat image
    function voteCat(value) {
      // Your Cat API key
      const apiKey = "live_FAhOGMgdfgR2q8m21nLaaniHQk4cIJcdVQ90VJY7mq1pTa5hbKanhW1R0k67z8IS";
  
      // Example request body:
      const requestBody = {
       
        "image_id":"id of the image",
        "sub_id":"optional unique id of your user",
        "value": value,
      };
  
      // Headers including the 'x-api-key' header
      const headers = {
        "content-type": "application/json",
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
            // Successful vote
            console.log("Vote successful");
            currentLikeCount += value; // Update the current like count
            updateLikeCount(); // Update the display like count
          } else {
            // Handle errors
            console.error("Error voting:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error voting:", error);
        });
    }
  
    // Fetch and display a random cat image on page load
    fetchRandomCat();
  
    // Add a click event listener to the "Get New Cat" button
    newCatButton.addEventListener("click", () => {
      fetchRandomCat();
    });
  });
  