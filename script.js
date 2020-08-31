const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const apiKey = 'JkugdlMj4YsxoWCvulKG_C2LCEYqpoKTEb-uGpD9OLk'
const count = 30;
const query = 'plants';
const orientation = 'landscape';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}&orientation=${orientation}`;

// Check to see if images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }    
}

// Helper Function
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links & photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // run fucntion for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listenr, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside <a>, then put in imgage container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        
        
    } catch (error) {
        // Catch Error Here
        console.log(error);
        
    }
}

// looking for scrolling near bottom of page to load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
    
});


// on load
getPhotos();