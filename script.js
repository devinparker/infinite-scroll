// Unsplash API
const apiKey = 'JkugdlMj4YsxoWCvulKG_C2LCEYqpoKTEb-uGpD9OLk'
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        // Catch Error Here
        console.log(error);
        
    }
}


// on load
getPhotos();