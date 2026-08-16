document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");

    analyzeBtn.addEventListener("click", async function () {

        if (resumeInput.files.length === 0) {
            status.textContent = "Please select a PDF resume first.";
            return;
        }

        const file = resumeInput.files[0];

        if (file.type !== "application/pdf") {
            status.textContent = "Please upload a PDF file.";
            return;
        }

        status.textContent = "Uploading resume... Please wait.";

        const formData = new FormData();
        formData.append("resume", file);

        try {

            const response = await fetch(
                "https://nitiyaah.app.n8n.cloud/webhook-test/52937b1b-241f-4057-bf7f-e6728b1e3bb4",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (response.ok) {
                status.textContent =
                    "Resume successfully sent to n8n!";
            } else {
                status.textContent =
                    "Something went wrong while sending the resume.";
            }

        } catch (error) {

            console.error(error);

            status.textContent =
                "Could not connect to n8n.";
        }

    });

});