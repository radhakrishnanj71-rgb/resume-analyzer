document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");
    const fileName = document.getElementById("fileName");


    // Show selected PDF filename
    resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            fileName.textContent = "📄 " + file.name;

        } else {

            fileName.textContent = "No file selected";

        }

    });


    // Analyze Resume
    analyzeBtn.addEventListener("click", async function () {

        if (resumeInput.files.length === 0) {

            status.textContent =
                "Please select a PDF resume first.";

            return;
        }


        const file = resumeInput.files[0];


        if (file.type !== "application/pdf") {

            status.textContent =
                "Please upload a PDF file.";

            return;
        }


        status.innerHTML = `
            <h3>⏳ Analyzing Resume...</h3>
            <p>Please wait while AI analyzes your resume.</p>
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

            console.log("n8n response:", result);


            // Safely convert any value to displayable text
            function formatValue(value) {

                if (
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {
                    return "";
                }

                if (Array.isArray(value)) {
                    return value.join("<br>");
                }

                return String(value);
            }


            // Create section only when information exists
            function createSection(title, value) {

                const content = formatValue(value);

                if (!content.trim()) {
                    return "";
                }

                return `
                    <div class="section">
                        <h3>${title}</h3>
                        <p>${content}</p>
                    </div>
                `;
            }


            status.innerHTML = `

                <div class="analysis-result">

                    <h2>📄 Resume Analysis</h2>

                    ${createSection(
                        "👤 Candidate",
                        result.candidateName
                    )}

                    ${createSection(
                        "🎓 Education",
                        result.education
                    )}

                    ${createSection(
                        "💻 Skills",
                        result.skills
                    )}

                    ${createSection(
                        "📂 Projects",
                        result.projects
                    )}

                    ${createSection(
                        "📜 Certifications",
                        result.certifications
                    )}

                    ${createSection(
                        "💼 Experience",
                        result.experience
                    )}

                    ${createSection(
                        "⭐ Strengths",
                        result.strengths
                    )}

                    ${createSection(
                        "🔧 Areas for Improvement",
                        result.improvementAreas
                    )}

                    ${createSection(
                        "🚀 Suggested Skills",
                        result.suggestedSkills
                    )}

                    ${createSection(
                        "💼 Suitable Career Roles",
                        result.suitableRoles
                    )}

                    ${createSection(
                        "📊 Resume Score",
                        result.resumeScore !== undefined
                            ? result.resumeScore + "/100"
                            : ""
                    )}

                </div>

            `;


        } catch (error) {

            console.error("n8n Error:", error);

            status.innerHTML = `
                <h3>❌ Could not connect to n8n</h3>
                <p>
                    ${error.message}
                </p>
            `;

        }

    });

});
