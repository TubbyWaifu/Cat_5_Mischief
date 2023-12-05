document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('image');

    document.addEventListener('mousemove', function (e) {
        // Calculate the percentage of mouse position within the window
        const xPercent = (e.clientX / window.innerWidth) * 100;

        // Change image source based on the horizontal position of the cursor
        if (xPercent < 43.33) {
            // If the cursor is on the left third of the screen
            image.src = 'imgs/cat_eyes_left.png'; // Change this to the path of your left image
        } else if (xPercent < 60.00) {
            // If the cursor is in the middle third of the screen
            image.src = 'imgs/cat_eyes_up.png'; // Change this to the path of your middle image
        } else {
            // If the cursor is on the right third of the screen
            image.src = 'imgs/cat_eyes_right.png'; // Change this to the path of your right image
        }
    });
});


$(document).ready(function () {
    const container = $('.container');
    let isShooting = false;
    let score = 0;

    // Function to handle shooting animation
    function handleShootingAnimation(e) {
        if (!isShooting) {
            isShooting = true;

            const shootingImage = $('<img>').attr('src', 'imgs/cat_paw_leap.png').addClass('shooting-image');
            container.append(shootingImage);

            const startPosition = {
                left: container.width() / 2 - shootingImage.width() / 2,
                top: container.height() - shootingImage.height(),
            };
            shootingImage.css(startPosition);

            const targetPosition = {
                left: e.clientX - container.offset().left - shootingImage.width() / 2,
                top: e.clientY - container.offset().top - shootingImage.height(),
            };

            shootingImage.animate(targetPosition, 50, 'linear', function () {
                shootingImage.animate(startPosition, 50, 'linear', function () {
                    shootingImage.remove();
                    isShooting = false;
                });
            });
        }
    }

    // Handle shooting animation on document click
    $(document).on('click', function (e) {
        handleShootingAnimation(e);

        // Randomly spread out clickable images after each successful click
        // spreadOutClickableImages();
    });

    // Add clickable images with scoring logic
    let clickableImages = [
        { src: 'imgs/mouse_idle.png', score: 10 },



        // Add more images as needed
    ];



    // Function to spread out clickable images randomly
    function spreadOutClickableImages() {

        $('.clickable-image').remove();
        const originalSrc = 'imgs/mouse_idle.png';
        const hoverSrc = 'imgs/mouse_scared.png';

        let count = $('<img>')
        clickableImages.forEach(function (image) {

            const clickableImage = $('<img>')

                .attr('src', image.src)
                .addClass('clickable-image')
                .data('score', image.score)
                .css({
                    position: 'absolute',
                    top: Math.random() * (container.height() - 800),
                    left: Math.random() * (container.width() - 0),
                })

                .hover(
                    function () {
                        // Mouse over - change the image source to the hover image
                        $(this).attr('src', hoverSrc);
                    },
                    function () {
                        // Mouse out - change the image source back to the original image
                        $(this).attr('src', originalSrc);
                    }
                );

            container.append(clickableImage);
        });

        // Attach click event handler to the new clickable images
        $('.clickable-image').on('click', function () {
            const clickedImage = $(this);
            const imageScore = parseInt(clickedImage.data('score'), 10);

            // Update the score
            score += imageScore;
            updateScore();

            playClickSound();

            // Randomly spread out clickable images again after a successful click
            spreadOutClickableImages();
        });
    }

    function playClickSound() {
        // Get the audio element
        const clickSound = document.getElementById('clickSound');

        // Play the sound
        if (clickSound) {
            clickSound.play();
        }
    }

    // Initial random positioning of clickable images
    spreadOutClickableImages();

    function updateScore() {
        $('#score').text('Score: ' + score);
    }
});


