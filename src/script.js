document.addEventListener("DOMContentLoaded", () => {
    const catContainer = document.querySelector(".cat-container");
    const catImage = document.getElementById("cat-image");
    const newCatButton = document.getElementById("new-cat-button");

    // Function to fetch a random cat image
    function fetchRandomCat() {
        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then((resp) => resp.json())
            .then((data) => {
                // Get a random cat image from the response
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomCat = data[randomIndex];

                // Set the cat image source
                catImage.src = randomCat.url;
            })
            .catch((error) => {
                console.error("Error fetching cat image:", error);
            });
    }

    // Fetch and display a random cat image on page load
    fetchRandomCat();

    // Add a click event listener to the "Get New Cat" button
    newCatButton.addEventListener("click", () => {
        fetchRandomCat();
    });
});
