
/* =========================================
   THE NORTH REMEMBERS
   A JOURNEY THROUGH WESTEROS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const screens = Array.from(document.querySelectorAll(".screen"));
    const nextButtons = document.querySelectorAll(".next-screen");
    const restartButton = document.getElementById("restart-button");

    const menuButtons = document.querySelectorAll(".menu-button");
    const closeMenuButton = document.querySelector(".close-menu");
    const navigationOverlay = document.getElementById("navigation-overlay");
    const navigationButtons = document.querySelectorAll(".scene-navigation button");

    const snowContainer = document.getElementById("snow-container");
    const mapMarkers = document.querySelectorAll(".map-marker");
    const locationDisplay = document.getElementById("location-display");

    let currentScreen = 1;
    let isTransitioning = false;

    /* =====================================
       SCREEN TRANSITIONS
       ===================================== */

    function showScreen(screenNumber) {

        const targetNumber = Number(screenNumber);

        if (
            targetNumber < 1 ||
            targetNumber > screens.length ||
            targetNumber === currentScreen ||
            isTransitioning
        ) {
            return;
        }

        const targetScreen = document.getElementById(
            `screen-${targetNumber}`
        );

        if (!targetScreen) return;

        isTransitioning = true;

        const oldScreen = document.getElementById(
            `screen-${currentScreen}`
        );

        oldScreen.classList.remove("active");
        oldScreen.classList.add("leaving");

        targetScreen.classList.add("active");

        currentScreen = targetNumber;

        updateScreenIndicators();

        window.setTimeout(() => {
            oldScreen.classList.remove("leaving");
            isTransitioning = false;
        }, 1200);

        closeNavigation();
    }

    /* =====================================
       UPDATE SCREEN INDICATORS
       ===================================== */

    function updateScreenIndicators() {

        screens.forEach((screen, index) => {

            const indicator = screen.querySelector(".side-indicator");

            if (!indicator) return;

            const dots = indicator.querySelectorAll("span");

            dots.forEach((dot, dotIndex) => {

                dot.classList.toggle(
                    "active-dot",
                    dotIndex === index
                );

            });

        });
    }

    /* =====================================
       NEXT SCREEN BUTTONS
       ===================================== */

    nextButtons.forEach(button => {

        button.addEventListener("click", () => {

            const nextScreen = button.dataset.next;

            showScreen(nextScreen);

        });

    });

    /* =====================================
       RESTART JOURNEY
       ===================================== */

    if (restartButton) {

        restartButton.addEventListener("click", () => {

            showScreen(1);

        });

    }

    /* =====================================
       NAVIGATION MENU
       ===================================== */

    function openNavigation() {

        navigationOverlay.classList.add("open");
        document.body.style.overflow = "hidden";

    }

    function closeNavigation() {

        navigationOverlay.classList.remove("open");
        document.body.style.overflow = "hidden";

    }

    menuButtons.forEach(button => {

        button.addEventListener("click", openNavigation);

    });

    if (closeMenuButton) {

        closeMenuButton.addEventListener("click", closeNavigation);

    }

    navigationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const destination = button.dataset.go;

            showScreen(destination);

        });

    });

    navigationOverlay.addEventListener("click", event => {

        if (event.target === navigationOverlay) {

            closeNavigation();

        }

    });

    /* =====================================
       WESTEROS MAP INTERACTIONS
       ===================================== */

    const locationDescriptions = {

        "WINTERFELL": "THE ANCIENT HOME OF HOUSE STARK",

        "THE WALL": "THE LAST DEFENCE OF THE REALM",

        "KING'S LANDING": "THE SEAT OF THE IRON THRONE"

    };

    mapMarkers.forEach(marker => {

        marker.addEventListener("click", () => {

            const location = marker.dataset.location;

            if (locationDisplay) {

                locationDisplay.textContent =
                    locationDescriptions[location] || location;

            }

            mapMarkers.forEach(item => {

                item.style.background = "rgba(10, 12, 15, .9)";
                item.style.color = "#e0c99b";

            });

            marker.style.background = "#c5a46a";
            marker.style.color = "#090b0e";

        });

    });

    /* =====================================
       KEYBOARD NAVIGATION
       ===================================== */

    document.addEventListener("keydown", event => {

        if (navigationOverlay.classList.contains("open")) {

            if (event.key === "Escape") {

                closeNavigation();

            }

            return;

        }

        if (event.key === "ArrowRight") {

            if (currentScreen < screens.length) {

                showScreen(currentScreen + 1);

            }

        }

        if (event.key === "ArrowLeft") {

            if (currentScreen > 1) {

                showScreen(currentScreen - 1);

            }

        }

    });

    /* =====================================
       CINEMATIC SNOWFALL
       ===================================== */

    function createSnowfall() {

        if (!snowContainer) return;

        const snowCount = window.innerWidth < 600 ? 45 : 85;

        for (let i = 0; i < snowCount; i++) {

            const snowflake = document.createElement("span");

            snowflake.classList.add("snowflake");

            const size = Math.random() * 3 + 1;

            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;

            snowflake.style.opacity = Math.random() * 0.7 + 0.2;

            snowflake.style.animationDuration =
                `${Math.random() * 12 + 9}s`;

            snowflake.style.animationDelay =
                `${Math.random() * -20}s`;

            snowContainer.appendChild(snowflake);

        }

    }

    createSnowfall();

    /* =====================================
       INITIAL PAGE STATE
       ===================================== */

    screens.forEach((screen, index) => {

        screen.classList.toggle("active", index === 0);

        screen.classList.remove("leaving");

    });

    updateScreenIndicators();

    document.body.style.overflow = "hidden";

    console.log(
        "The North Remembers — The journey through Westeros has begun."
    );

});
