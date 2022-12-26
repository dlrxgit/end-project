class _extra {
    videoElement = null;
    musicFadeIn = 500;
    skippedIntro = false;
    backgroundToggler = false;
    shouldIgnoreVideo = false;
    effects = ['animate__flash', 'animate__rubberBand', 'animate__swing', 'animate__tada', 'animate__jello', 'animate__bounceIn'];
    description = ['anime fan', 'manga enjoyer', "phonk listener", "rock believer", 'frontend dev', 'aspire to inspire'];
    currentYear = new Date().getFullYear();

    getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
}

const extra = new _extra();