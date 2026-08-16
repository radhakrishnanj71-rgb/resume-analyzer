document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");
    const fileName = document.getElementById("fileName");


    // Show selected file
    resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {
            fileName.textContent = "📄 " + resumeInput.files[0].name;
        } else {
            fileName.textContent = "No file selected";
        }

    });


    // Analyze Resume
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


            let data = await response.json();

            console.log("FULL n8n RESPONSE:", data);


            // --------------------------------
            // HANDLE DIFFERENT n8n RESPONSES
            // --------------------------------

            if (Array.isArray(data)) {
                data = data[0] || {};
            }


            if (data.body) {
                data = data.body;
            }


            if (typeof data === "string") {

                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.log("Response is plain text");
                }

            }


            // If output exists
            if (data && data.output) {

                if (typeof data.output === "string") {

                    try {
                        data = JSON.parse(data.output);
                    } catch (e) {
                        console.log("Output is text");
                    }

                } else {
                    data = data.output;
                }

            }


            console.log("FINAL RESULT:", data);


            // --------------------------------
            // SAFE VALUE FORMATTER
            // --------------------------------

            function formatValue(value) {

                if (
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {
                    return "";
                }


                if (Array.isArray(value)) {

                    return value
                        .filter(item =>
                            item !== null &&
                            item !== undefined &&
                            item !== ""
                        )
                        .map(item => String(item))
                        .join("<br>");

                }


                return String(value);
            }


            // --------------------------------
            // CREATE SECTION
            // --------------------------------

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


            // --------------------------------
            // DISPLAY RESULT
            // --------------------------------

            status.innerHTML = `

                <div class="analysis-result">

                    <h2>📄 Resume Analysis</h2>


                    ${createSection(
                        "👤 Candidate",
                        data.candidateName
                    )}


                    ${createSection(
                        "🎓 Education",
                        data.education
                    )}


                    ${createSection(
                        "💻 Skills",
                        data.skills
                    )}


                    ${createSection(
                        "📂 Projects",
                        data.projects
                    )}


                    ${createSection(
                        "📜 Certifications",
                        data.certifications
                    )}


                    ${createSection(
                        "💼 Experience",
                        data.experience
                    )}


                    ${createSection(
                        "⭐ Strengths",
                        data.strengths
                    )}


                    ${createSection(
                        "🔧 Areas for Improvement",
                        data.improvementAreas
                    )}


                    ${createSection(
                        "🚀 Suggested Skills",
                        data.suggestedSkills
                    )}


                    ${createSection(
                        "💼 Suitable Career Roles",
                        data.suitableRoles
                    )}


                    ${createSection(
                        "📊 Resume Score",
                        data.resumeScore !== undefined
                            ? data.resumeScore + "/100"
                            : ""
                    )}

                </div>

            `;


        } catch (error) {

            console.error("ERROR:", error);

            status.innerHTML = `
                <h3>❌ Error</h3>
                <p>${error.message}</p>
            `;

        }

    });

});
