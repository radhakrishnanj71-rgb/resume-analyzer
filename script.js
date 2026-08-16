document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");
    const fileName = document.getElementById("fileName");
    const resetBtn = document.getElementById("resetBtn");


    // When PDF is selected
    resumeInput.addEventListener("change", function () {

        if (this.files && this.files.length > 0) {

            fileName.textContent =
                "📄 " + this.files[0].name;

            status.innerHTML = `
                <p>✅ PDF selected successfully.</p>
                <p>Now click <strong>Analyze Resume</strong>.</p>
            `;

        } else {

            fileName.textContent = "No file selected";

        }

    });


    // Analyze Resume
    analyzeBtn.addEventListener("click", async function () {

        if (!resumeInput.files || resumeInput.files.length === 0) {

            status.innerHTML =
                "<p>⚠️ Please select a PDF resume first.</p>";

            return;
        }


        const file = resumeInput.files[0];

        if (file.type !== "application/pdf") {

            status.innerHTML =
                "<p>⚠️ Please select a PDF file.</p>";

            return;
        }


        status.innerHTML = `
            <h3>⏳ Analyzing Resume...</h3>
            <p>Please wait...</p>
        `;


        const formData = new FormData();

        formData.append("resume", file);


        try {

            const response = await fetch(
                "https://nitiyaah.app.n8n.cloud/webhook/52937b1b-241f-4057-bf7f-e6728b1e3bb4",
                {
                    method: "POST",
                    body: formData
                }
            );


            if (!response.ok) {

                throw new Error(
                    "n8n returned status " + response.status
                );

            }


            const result = await response.json();


            status.innerHTML = `

                <div class="analysis-result">

                    <h2>📄 Resume Analysis</h2>

                    <div class="section">
                        <h3>👤 Candidate</h3>
                        <p>${result.candidateName}</p>
                    </div>

                    <div class="section">
                        <h3>🎓 Education</h3>
                        <p>${result.education.join("<br>")}</p>
                    </div>

                    <div class="section">
                        <h3>💻 Skills</h3>
                        <p>${result.skills.join(", ")}</p>
                    </div>

                    <div class="section">
                        <h3>📂 Projects</h3>
                        <p>${result.projects.join("<br>")}</p>
                    </div>

                    <div class="section">
                        <h3>📜 Certifications</h3>
                        <p>${result.certifications.join("<br>")}</p>
                    </div>

                    <div class="section">
                        <h3>💼 Experience</h3>
                        <p>${result.experience.join("<br>")}</p>
                    </div>

                    <div class="section">
                        <h3>⭐ Strengths</h3>
                        <p>${result.strengths.join("<br>")}</p>
                    </div>

                    <div class="section">
                        <h3>🔧 Areas for Improvement</h3>
                        <p>${result.improvementAreas.join("<br>")}</p>
                    </div>

                    <div class="section score">
                        <h3>📊 Resume Score</h3>
                        <p>${result.resumeScore}/100</p>
                    </div>

                    <div class="section">
                        <h3>🚀 Suggested Skills</h3>
                        <p>${result.suggestedSkills.join("<br>")}</p>
                    </div>

                    <div class="section">
                        <h3>💼 Suitable Career Roles</h3>
                        <p>${result.suitableRoles.join("<br>")}</p>
                    </div>

                </div>

            `;

        } catch (error) {

            console.error(error);

            status.innerHTML = `
                <h3>❌ Error</h3>
                <p>Could not connect to n8n.</p>
                <p>${error.message}</p>
            `;

        }

    });


    // Reset
    resetBtn.addEventListener("click", function () {

        resumeInput.value = "";

        fileName.textContent = "No file selected";

        status.innerHTML = `
            <h3>📄 Resume Analysis</h3>
            <p>Your AI analysis will appear here.</p>
        `;

    });

});
