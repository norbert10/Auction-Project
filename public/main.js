let slidePosition = 0;
const slides = document.getElementsByClassName('carousel-slide');
const totalSlides = slides.length;
console.log(slides);

document.getElementById('nxtbtn').addEventListener('click', function(){
    moveToNextSlide();
})

document.getElementById('prevbtn').addEventListener('click', function(){
    moveToPrevSlide();
})

function updateSlidePosition(){
    for(let slide of slides){
        slide.classList.remove('visible');
        slide.classList.add('hidden');
    }
    slides[slidePosition].classList.add('visible');
}

function moveToNextSlide(){
    if(slidePosition==totalSlides - 1){
        slidePosition = 0;
    }else{
        slidePosition++;
    }
    updateSlidePosition();
}
function moveToPrevSlide(){
    if(slidePosition == 0){
        slidePosition = totalSlides - 1;
    }else{
        slidePosition--;
    }
    updateSlidePosition();
}