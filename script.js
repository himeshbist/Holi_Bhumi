document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("letterModal");
    const letterCard = document.getElementById("letterCard");
    const openLetterBtn = document.getElementById("wishButton");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const audio = document.getElementById("backgroundMusic");
    let wasPlaying = false; // Track if audio was playing before tab switch

    // Ensure required elements exist
    if (!modal || !letterCard || !openLetterBtn || !closeModalBtn || !audio) {
        console.error("One or more required elements are missing.");
        return;
    }

    // ✅ Auto mute music jab user dusre tab pe jaye
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            wasPlaying = !audio.paused; // Store play state
            audio.pause();
        } else if (wasPlaying) {
            audio.play(); // Resume if it was playing before
        }
    });

    // Open Letter Modal
    openLetterBtn.addEventListener("click", () => {
        openModal();
    });

    // Close Letter Modal
    closeModalBtn.addEventListener("click", () => {
        closeModal();
    });

    function openModal() {
        modal.style.display = "flex"; // Show modal
        letterCard.innerHTML = ""; // Clear previous content

        // Restart and play audio
        audio.currentTime = 0;
        audio.play();

        // ✅ Stop music when user clicks outside modal
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Ensure modal content visibility
        document.querySelector(".modal-content").style.display = "block";

        // Start typing the message
        setTimeout(() => {
            typeWriter(letterCard, getMessage(), 0, addGalleryButton);
        }, 100);

        // Animate modal opening
        gsap.from(".modal-content", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
        });
    }

    function closeModal() {
        audio.pause(); // Pause audio
        audio.currentTime = 0; // Reset music

        // Animate modal closing
        gsap.to(".modal-content", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
            onComplete: () => {
                modal.style.display = "none"; // Hide modal
                letterCard.innerHTML = ""; // Clear content

                // Remove dynamically added elements like galleryButton
                const galleryButton = document.querySelector(".gallery-button");
                if (galleryButton) {
                    galleryButton.remove();
                }
            }
        });
    }

    function typeWriter(element, text, index, callback) {
        element.innerHTML = ""; // Clear the element before starting

        function writeChar(i) {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    let endIndex = text.indexOf(">", i);
                    element.innerHTML += text.substring(i, endIndex + 1);
                    i = endIndex + 1;
                } else {
                    const span = document.createElement("span");
                    span.textContent = text.charAt(i);
                    element.appendChild(span);
                    i++;
                }

                setTimeout(() => writeChar(i), 50); // Delay between characters
            } else if (callback) {
                setTimeout(callback, 500); // Call the callback after typing finishes
            }
        }

        writeChar(0); // Start typing from the first character
    }

    function addGalleryButton() {
        if (!document.querySelector(".gallery-button")) {
            const galleryButton = document.createElement("button");
            galleryButton.textContent = "View Gallery";
            galleryButton.className = "gallery-button";
            galleryButton.onclick = () => window.location.href = "gallery.html";

            letterCard.appendChild(document.createElement("br"));
            letterCard.appendChild(galleryButton);

            // Animate gallery button appearance
            gsap.from(galleryButton, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    }

    function getMessage() {
        return `🌸 गुलाल उड़ाए हवा में, बहार आई है,<br>
खुशबू लिए फिज़ा में, बहार आई है।<br><br>

सजने लगे हैं रंग में गली-मोहल्ले,<br>
होली की आज महकती बहार आई है।<br><br>

<b>"होली की ढेरों शुभकामनाएँ!" 🎉💖 </b>`;
    }
});
