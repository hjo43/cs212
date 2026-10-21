console.log("Hello World!");

const name = "Hayden O'Rourke";
let hasDownloadedResume = false;
let downloadCount = 0;

function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

document.getElementById("greeting").textContent = showGreeting(name);

const skillForm = $("#skillForm");
const skillInput = $("#skillInput");
const technicalSkillsList = $("#technicalSkillsList");
const skillMessage = $("#skillMessage");

let skills = [];

technicalSkillsList.children("li").each(function() {
    skills.push($(this).text().trim());
});

function renderSkills() {
    technicalSkillsList.empty();

    skills.forEach(function(skill, index) {
        const item = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center");
        const skillName = $("<span>").addClass("skill-name").text(skill).css("cursor", "pointer");
        const deleteButton = $("<button>").attr("type", "button").addClass("btn btn-sm btn-danger delete-skill").text("Delete");

        item.append(skillName, deleteButton);
        technicalSkillsList.append(item);
        item.hide().fadeIn(200);
    });
}

function addSkill() {
    const skill = skillInput.val().trim();

    if (skill === "") {
        skillMessage.text("Please enter a skill.").removeClass("text-success").addClass("text-danger");
        return;
    }

    const alreadyExists = skills.some(function(existingSkill) {
        return existingSkill.toLowerCase() === skill.toLowerCase();
    });

    if (alreadyExists) {
        skillMessage.text("That skill is already listed.").removeClass("text-success").addClass("text-danger");
        return;
    }

    skills.push(skill);
    renderSkills();
    skillInput.val("");
    skillMessage.text("Skill added successfully.").removeClass("text-danger").addClass("text-success");
}

skillForm.on("submit", function(event) {
    event.preventDefault();
    addSkill();
});

technicalSkillsList.on("click", ".skill-name", function() {
    const item = $(this).closest("li");
    const index = item.index();
    const updatedSkill = prompt("Edit this skill:", skills[index]);

    if (updatedSkill === null) {
        return;
    }

    const newSkill = updatedSkill.trim();

    if (newSkill === "") {
        skillMessage.text("A skill cannot be empty.").removeClass("text-success").addClass("text-danger");
        return;
    }

    const duplicate = skills.some(function(existingSkill, skillIndex) {
        return skillIndex !== index && existingSkill.toLowerCase() === newSkill.toLowerCase();
    });

    if (duplicate) {
        skillMessage.text("That skill is already listed.").removeClass("text-success").addClass("text-danger");
        return;
    }

    skills[index] = newSkill;
    renderSkills();
    skillMessage.text("Skill updated successfully.").removeClass("text-danger").addClass("text-success");
});

technicalSkillsList.on("click", ".delete-skill", function() {
    const item = $(this).closest("li");
    const index = item.index();

    item.slideUp(200, function() {
        skills.splice(index, 1);
        renderSkills();
        skillMessage.text("Skill removed.").removeClass("text-danger").addClass("text-success");
    });
});

skillInput.on("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        skillForm.trigger("submit");
    }

    if (event.key === "Escape") {
        skillForm.find(":input").val("");
        skillMessage.text("").removeClass("text-danger text-success");
    }
});

renderSkills();

const navigationItems = [
    { title: "Summary", id: "summary" },
    { title: "Education", id: "education" },
    { title: "Experience", id: "experience" },
    { title: "Skills", id: "skills" },
    { title: "Projects", id: "projects" },
    { title: "Contact Information", id: "contact" }
];

const navMenu = $("#navMenu");
navMenu.empty();

$.each(navigationItems, function(index, item) {
    const listItem = $("<li>").addClass("nav-item");
    const link = $("<a>").addClass("nav-link").attr("href", "#" + item.id).text(item.title);
    listItem.append(link);
    navMenu.append(listItem);
});

navMenu.on("click", "a", function(event) {
    const target = $(this).attr("href");
    const section = $(target);

    if (section.length) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: section.offset().top }, 500);
    }
});

const projects = [
    {
        title: "Windows Server 2011",
        description: "I purposely worked with older, outdated hardware to get a feel for working with unfamiliar tools.",
        deadline: "2026-12-01",
        imageURL: "windows-server-logo-01-3622531575.png",
        secondImageURL: "The-branding-has-not-changed-from-Windows-Server-2025-as-of-yet-1817640475.png"
    },
    {
        title: "Cisco Packet Tracer",
        description: "CCNA training has given me the skills to configure and deploy Cisco hardware at a basic level.",
        deadline: "2026-11-15",
        imageURL: "OIP-591332616.jpg",
        secondImageURL: "maxresdefault-2898280502.jpg"
    },
    {
        title: "Cybersecurity Portfolio Project",
        description: "This is a placeholder project.",
        deadline: "2026-10-12",
        imageURL: "",
        secondImageURL: ""
    }
];

const projectList = $("#projectList");
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
let earliestFirst = true;

function renderProjects() {
    projectList.empty();

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const deadline = new Date(project.deadline + "T00:00:00");
        let status = "";

        if (deadline.getTime() === currentDate.getTime()) {
            status = "Due today";
        } else if (deadline > currentDate) {
            status = "Ongoing";
        } else {
            status = "Completed";
        }

        const column = $("<div>").addClass("col-12 col-md-6");
        const card = $("<div>").addClass("card h-100");
        const cardBody = $("<div>").addClass("card-body");
        const title = $("<h3>").addClass("h5 card-title").text(project.title);
        const description = $("<p>").addClass("card-text").text(project.description);
        const deadlineText = $("<p>").addClass("card-text").text("Deadline: " + project.deadline);
        const statusText = $("<p>").addClass("card-text").text("Status: " + status);

        cardBody.append(title, description, deadlineText, statusText);

        if (project.imageURL !== "") {
            const image = $("<img>").attr("src", project.imageURL).addClass("img-fluid mb-3");
            image.attr("alt", project.title + " image");
            cardBody.append(image);
        }

        if (project.secondImageURL !== "") {
            const secondImage = $("<img>").attr("src", project.secondImageURL).addClass("img-fluid");
            secondImage.attr("alt", project.title + " additional image");
            cardBody.append(secondImage);
        }

        card.append(cardBody);
        column.append(card);
        projectList.append(column);
        column.hide().fadeIn(200);
    }
}

$("#sortProjects").on("click", function() {
    projects.sort(function(firstProject, secondProject) {
        if (earliestFirst) {
            return new Date(firstProject.deadline) - new Date(secondProject.deadline);
        }
        return new Date(secondProject.deadline) - new Date(firstProject.deadline);
    });

    earliestFirst = !earliestFirst;

    if (earliestFirst) {
        $(this).text("Sort by Deadline (Earliest First)");
    } else {
        $(this).text("Sort by Deadline (Latest First)");
    }

    renderProjects();
});

renderProjects();

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