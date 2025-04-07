// Video Switching Between Two Videos
const video = document.getElementById("hero-video");
const videos = [
    "assests/videos/videoonespeed.mp4",
    "assests/videos/lambodriving.mp4"
];
let currentVideoIndex = 0;

video.addEventListener("ended", () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    video.src = videos[currentVideoIndex];
    video.play();
});

// Play sound on button click
function playSound(soundFile) {
    const sound = new Audio(`assests/sounds/${soundFile}.mp3`);
    sound.play();
}

// Array of Best Seller images (Updated with new paths)
const bestSellerImages = [
    "car2.png",  // New Image 1
    "car12.png", // New Image 3
    "car9.png"   // New Image 4
];

let currentBestSellerIndex = 0;

// Function to change the Best Seller image on click
function changeBestSellerImage() {
    const bestSellerImg = document.getElementById("best-seller-image");
    
    // Move to the next image in the array
    currentBestSellerIndex = (currentBestSellerIndex + 1) % bestSellerImages.length;

    // Update the image source to the new one
    bestSellerImg.src = bestSellerImages[currentBestSellerIndex];
}
