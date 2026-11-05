document.addEventListener("DOMContentLoaded", function () {
  const howItWorks = document.getElementById("wedding-how-it-works");
  if (howItWorks) {
    howItWorks.addEventListener("show.bs.collapse", function () {
      howItWorks.classList.add("is-opening");
    });
    howItWorks.addEventListener("hide.bs.collapse", function () {
      howItWorks.classList.remove("is-opening");
    });
  }

  const root = document.getElementById("wedding-stories");
  if (!root) return;

  const photos = Array.from(root.querySelectorAll(".wedding-story-photos"), function (gallery) {
    return new Splide(gallery, {
      type: "fade",
      rewind: true,
      perPage: 1,
      heightRatio: 1.25,
      mediaQuery: "min",
      breakpoints: {
        768: { height: "100%", heightRatio: 0 },
      },
      arrows: false,
      pagination: gallery.querySelectorAll(".splide__slide").length > 1,
      autoplay: "pause",
      interval: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      // The story carousel controls pausing for both levels.
      resetProgress: true,
    }).mount();
  });

  const stories = new Splide(root, {
    type: "slide",
    rewind: true,
    perPage: 1,
    gap: "2rem",
    autoplay: true,
    interval: 15000,
    pagination: false,
    arrows: photos.length > 1,
    pauseOnHover: false,
    pauseOnFocus: false,
    resetProgress: false,
    noDrag: ".wedding-story-photos",
  });

  function pausePhotos() {
    photos.forEach(function (gallery) {
      gallery.Components.Autoplay.pause();
    });
  }

  function playActivePhotos() {
    pausePhotos();
    if (!document.hidden && !stories.Components.Autoplay.isPaused()) {
      photos[stories.index]?.Components.Autoplay.play();
    }
  }

  // Only the visible story's photos rotate. Keep its photo index between visits
  // so stories with more than three photos still show their full collection.
  stories.on("move autoplay:pause", pausePhotos);
  stories.on("moved autoplay:play", playActivePhotos);
  stories.mount();

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) pausePhotos();
    else playActivePhotos();
  });
});
