document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");
    const fileName = document.getElementById("fileName");
    
   resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            fileName.textContent = "📄 " + file.name;

        } else {

            fileName.textContent = "No file selected";

        }

    });
  
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

        status.textContent = "Analyzing resume... Please wait.";

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

                const result = await response.json();

                status.innerHTML = `
                    <h3>Resume Analysis</h3>

                    <p><strong>Candidate:</strong>
                    ${result.candidateName}</p>

                    <p><strong>Education:</strong><br>
                    ${result.education.join("<br>")}</p>

                    <p><strong>Skills:</strong><br>
                    ${result.skills.join(", ")}</p>

                    <p><strong>Projects:</strong><br>
                    ${result.projects.join("<br>")}</p>

                    <p><strong>Certifications:</strong><br>
                    ${result.certifications.join("<br>")}</p>

                    <p><strong>Experience:</strong><br>
                    ${result.experience.join("<br>")}</p>

                    <p><strong>Strengths:</strong><br>
                    ${result.strengths.join("<br>")}</p>

                    <p><strong>Areas for Improvement:</strong><br>
                    ${result.improvementAreas.join("<br>")}</p>

                    <p><strong>Resume Score:</strong>
                    ${result.resumeScore}/100</p>

                    <p><strong>Suggested Skills:</strong><br>
                    ${result.suggestedSkills.join("<br>")}</p>

                    <p><strong>Suitable Career Roles:</strong><br>
                    ${result.suitableRoles.join("<br>")}</p>
                `;

            } else {

                status.textContent =
                    "Something went wrong while analyzing the resume.";

            }

        } catch (error) {

            console.error(error);

            status.textContent =
                "Could not connect to n8n.";

        }

    });

});