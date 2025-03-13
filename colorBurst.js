document.addEventListener("DOMContentLoaded", function () {
    // Poetry display on hover
    document.querySelectorAll(".image-container").forEach(container => {
        const img = container.querySelector(".holi-image");
        const poetryText = container.getAttribute("data-poetry");

        if (img && poetryText) {
            const card = container.querySelector(".poetry-card");
            const textDiv = card.querySelector(".poetry-text");
            textDiv.innerHTML = poetryText; // Use innerHTML to preserve HTML tags
        }
    });

    // Custom Rainbow Cursor Effect
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        cursor.style.opacity = "1"; // Cursor show on movement
    });

    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0"; // Hide cursor when mouse leaves the screen
    });
});