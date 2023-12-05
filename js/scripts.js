document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('image');

    document.addEventListener('mousemove', function (e) {

        const xPercent = (e.clientX / window.innerWidth) * 100;


        if (xPercent < 43.33) {
            image.src = 'imgs/cat_eyes_left.png';
        } else if (xPercent < 60.00) {
            image.src = 'imgs/cat_eyes_up.png';
        } else {
            image.src = 'imgs/cat_eyes_right.png';
        }
    });
});


$(document).ready(function () {
    const container = $('.container');
    let isShooting = false;
    let score = 0;


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


    $(document).on('click', function (e) {
        handleShootingAnimation(e);
    });

    let clickableImages = [
        { src: 'imgs/mouse_idle.png', score: 10 },
    ];



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
                        $(this).attr('src', hoverSrc);
                    },
                    function () {
                        $(this).attr('src', originalSrc);
                    }
                );

            container.append(clickableImage);
        });


        $('.clickable-image').on('click', function () {
            const clickedImage = $(this);
            const imageScore = parseInt(clickedImage.data('score'), 10);

            score += imageScore;
            updateScore();

            playClickSound();

            spreadOutClickableImages();
        });
    }

    function playClickSound() {
        const clickSound = document.getElementById('clickSound');

        if (clickSound) {
            clickSound.play();
        }
    }

    spreadOutClickableImages();

    function updateScore() {
        $('#score').text('Score: ' + score);
    }
});


