
console.log("Hello World!");

const name = "Hayden O'Rourke";
let hasDownloadedResume = false;
let downloadCount = 0;

function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

document.getElementById("greeting").textContent = showGreeting(name);

const skillForm = document.getElementById("skillForm");
const skillInput = document.getElementById("skillInput");
const technicalSkillsList = document.getElementById("technicalSkillsList");

skillForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const skill = skillInput.value.trim();

    if (skill !== "") {
        const newSkill = document.createElement("li");
        newSkill.textContent = skill;
        newSkill.className = "list-group-item";

        technicalSkillsList.appendChild(newSkill);

        skillInput.value = "";
    }
});

const projectTitles = [
    "Windows Server 2011",
    "Cisco Packet Tracer",
    "Cybersecurity Portfolio Project"
];

const projectDescriptions = [
    "I purposely worked with older, outdated hardware to get a feel for working with unfamiliar tools.",
    "CCNA training has given me the skills to configure and deploy Cisco hardware at a basic level.",
    "This is a placeholder project."
];

const projectDeadlines = [
    "2026-12-01",
    "2026-11-15",
    "2026-10-12"
];

const projectList = document.getElementById("projectList");

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

for (let i = 0; i < projectTitles.length; i++) {
    const deadline = new Date(projectDeadlines[i] + "T00:00:00");

    let status = "";

    if (deadline.getTime() === currentDate.getTime()) {
        status = "Due today";
    }
    else if (deadline > currentDate) {
        status = "Ongoing";
    }
    else if (deadline < currentDate) {
        status = "Completed";
    }

    const column = document.createElement("div");
    column.className = "col-12 col-md-6";

    const card = document.createElement("div");
    card.className = "card h-100";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h3");
    title.className = "h5 card-title";
    title.textContent = projectTitles[i];

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = projectDescriptions[i];

    const deadlineText = document.createElement("p");
    deadlineText.className = "card-text";
    deadlineText.textContent = "Deadline: " + projectDeadlines[i];

    const statusText = document.createElement("p");
    statusText.className = "card-text";
    statusText.textContent = "Status: " + status;

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(deadlineText);
    cardBody.appendChild(statusText);

    if (i === 0) {
        const image = document.createElement("img");
        image.src = "windows-server-logo-01-3622531575.png";
        image.className = "img-fluid mb-3";
        image.alt = "Windows Server logo";
        cardBody.appendChild(image);

        const secondImage = document.createElement("img");
        secondImage.src = "The-branding-has-not-changed-from-Windows-Server-2025-as-of-yet-1817640475.png";
        secondImage.className = "img-fluid";
        secondImage.alt = "Windows Server branding";
        cardBody.appendChild(secondImage);
    }

    if (i === 1) {
        const image = document.createElement("img");
        image.src = "OIP-591332616.jpg";
        image.className = "img-fluid mb-3";
        image.alt = "Cisco networking project";
        cardBody.appendChild(image);

        const secondImage = document.createElement("img");
        secondImage.src = "maxresdefault-2898280502.jpg";
        secondImage.className = "img-fluid";
        secondImage.alt = "Cisco Packet Tracer project";
        cardBody.appendChild(secondImage);
    }

    card.appendChild(cardBody);
    column.appendChild(card);
    projectList.appendChild(column);
}

const resumeButton = document.getElementById("resumeButton");
const downloadCountDisplay = document.getElementById("downloadCount");

resumeButton.addEventListener("click", function() {
    downloadCount++;

    downloadCountDisplay.textContent = downloadCount;

    if (hasDownloadedResume === false) {
        alert("Your resume is downloaded successfully!");
        hasDownloadedResume = true;
    }
});

const educationData = [
    ["Northern Arizona University", "Cybersecurity", "Not specified", "Present"],
    ["West-Mec Northwest", "Technical Education Program", "Not specified", "Not specified"]
];

const experienceData = [
    ["Tier 2 Desktop Support", "Northern Arizona University", "Not specified", "Not specified"]
];

function createTable(containerId, headings, data) {
    const container = document.getElementById(containerId);

    const table = document.createElement("table");
    table.className = "table table-bordered table-striped table-hover";

    const tableHead = document.createElement("thead");
    tableHead.className = "table-dark";

    const headerRow = document.createElement("tr");

    for (let i = 0; i < headings.length; i++) {
        const heading = document.createElement("th");
        heading.textContent = headings[i];
        headerRow.appendChild(heading);
    }

    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    const tableBody = document.createElement("tbody");

    for (let i = 0; i < data.length; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < data[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = data[i][j];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    container.appendChild(table);
}

createTable(
    "educationTable",
    ["Institution", "Program/Degree", "Start Date", "End Date"],
    educationData
);

createTable(
    "experienceTable",
    ["Job Title/Role", "Company", "Start Date", "End Date"],
    experienceData
);
