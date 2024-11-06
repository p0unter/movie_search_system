// Your API key (Insert your YouTube API key here)
const API_KEY = ''; 

// Search query
const searchQuery = 'newly released movies'; // You can enter any search term here

// Use a proxy to avoid CORS issues
const url = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEY}`;

// API request
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Check the API response

        // Select a random video from the list of returned videos
        const randomIndex = Math.floor(Math.random() * data.items.length); // Randomly select a video
        const videoId = data.items[randomIndex].id.videoId; // Get the video ID

        // Create the video URL with autoplay and mute parameters
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

        // Create the iframe element
        const iframe = document.createElement('iframe');
        iframe.classList.add("iframe-style"); // Add a class for styling
        iframe.src = videoUrl;
        iframe.frameborder = '0';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;

        // Append the iframe to the page
        const contentDiv = document.body;
        if (contentDiv) {
            contentDiv.appendChild(iframe);
        } else {
            console.error('Content div not found!');
        }
    })
    .catch(error => console.error('Video could not be loaded:', error));
