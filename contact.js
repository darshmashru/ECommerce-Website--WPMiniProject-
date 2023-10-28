document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function(event) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        let isValid = true;

        // Simple email validation using a regular expression
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (name.trim() === "") {
            isValid = false;
            alert("Please enter your name.");
        }

        if (!emailPattern.test(email)) {
            isValid = false;
            alert("Please enter a valid email address.");
        }

        if (subject.trim() === "") {
            isValid = false;
            alert("Please enter a subject.");
        }

        if (message.trim() === "") {
            isValid = false;
            alert("Please enter a message.");
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
