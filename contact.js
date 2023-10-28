document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        let isValid = true;
        let errorMessage = "";

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (name.trim() === "") {
            isValid = false;
            errorMessage = "Please enter your name.";
        } else if (!emailPattern.test(email)) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
        } else if (subject.trim() === "") {
            isValid = false;
            errorMessage = "Please enter a subject.";
        } else if (message.trim() === "") {
            isValid = false;
            errorMessage = "Please enter a message.";
        }

        if (!isValid) {
            // Display validation error message to the user
            document.getElementById("error-message").textContent = errorMessage;
            return;
        }else {
            // Clear the form fields on successful submission
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
        }
        const formData = {
            name,
            email,
            subject,
            message
        };

        try {
            const response = await fetch('/save-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 200) {
                alert("Form data submitted successfully!");
                // Reset the form to provide feedback
                contactForm.reset();
            } else {
                alert("Error submitting form data.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting form data.");
        }
    });
});
