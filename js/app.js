import SmoothScroll from "./smoothScroll.js";

const scrollable = document.querySelector('.scrollable');
const mediaSection = document.getElementById('media__section');
const imageslider = document.querySelector('.image__slider');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

let imageIndex = 0;
let imageWidth;

const sliderImages = [...document.querySelectorAll('.slider__image__wrapper')]
function cloneImages(imagesArray, numberOfClones){
    let parent = imagesArray[0].parentElement;    
    for( let i = 0; i < numberOfClones; i++){
        imagesArray.forEach(image => {
            let clone = image.cloneNode(true);
            parent.appendChild(clone)
        });
    }
    imageWidth = imagesArray[0].getBoundingClientRect().width;
    parent.style.transform = `translateX(-${(imageWidth * 4) + imageIndex }px)`
}

cloneImages(sliderImages, 2);

let animating = false;
function navigateSlider(direction){
    if(!animating){
        animating = true;
        if(direction === 'LEFT'){        
            imageslider.style.transform = `translateX(-${((imageWidth * 4) + (imageWidth * imageIndex)) - (imageWidth)}px)`
            imageIndex--;
            reset()
        }
    
        if(direction === 'RIGHT'){
            imageslider.style.transform = `translateX(-${((imageWidth * 4) + (imageWidth * imageIndex)) + (imageWidth)}px)`
            imageIndex++;
            reset()
        }
    }

    function reset(){
        setTimeout(() => {
            imageslider.style.transition = '0s';
            imageIndex = imageIndex < 0 ? 3 : imageIndex;
            imageIndex = imageIndex > 3 ? 0 : imageIndex;
            imageslider.style.transform = `translateX(-${((imageWidth * 4) + (imageWidth * imageIndex))}px)`
            setTimeout(() => {
                imageslider.style.transition = '0.5s';
                animating = false
            },100)
        },500)
    }
}
leftBtn.addEventListener('click', () => navigateSlider('LEFT'));
rightBtn.addEventListener('click',() => navigateSlider('RIGHT'));



const animationObjects = {mediaSection};

new SmoothScroll(scrollable, animationObjects);