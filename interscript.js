
const internships = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions",
        category: "Web Development",
        icon: "💻",
        duration: "3 Months",
        stipend: "₹8,000/month",
        location: "Remote",
        description: "Work on responsive websites using HTML, CSS and JavaScript. Learn frontend development by working on real-world projects."
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studio",
        category: "Design",
        icon: "🎨",
        duration: "2 Months",
        stipend: "₹6,000/month",
        location: "Remote",
        description: "Create user-friendly interfaces and design attractive website layouts. Improve your UI/UX design skills."
    },
    {
        id: 3,
        title: "Digital Marketing Intern",
        company: "Growth Media",
        category: "Marketing",
        icon: "📢",
        duration: "3 Months",
        stipend: "₹5,000/month",
        location: "Hybrid",
        description: "Learn social media marketing, content creation and digital marketing strategies."
    },
    {
        id: 4,
        title: "Data Science Intern",
        company: "DataWorks",
        category: "Data Science",
        icon: "📊",
        duration: "4 Months",
        stipend: "₹10,000/month",
        location: "Remote",
        description: "Explore data analysis, data visualization and basic machine learning concepts."
    },
    {
        id: 5,
        title: "Web Developer",
        company: "CodeCraft",
        category: "Web Development",
        icon: "🌐",
        duration: "3 Months",
        stipend: "₹7,000/month",
        location: "On-site",
        description: "Build and maintain websites using modern web development technologies."
    },
    {
        id: 6,
        title: "Graphic Designer",
        company: "Pixel Studio",
        category: "Design",
        icon: "🖌️",
        duration: "2 Months",
        stipend: "₹5,000/month",
        location: "Remote",
        description: "Design creative graphics, banners and digital content for different projects."
    }
];

let applications = JSON.parse(localStorage.getItem("applications")) || [];

const internshipList = document.getElementById("internshipList");
const applicationList = document.getElementById("applicationList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const modal = document.getElementById("detailsModal");
const modalDetails = document.getElementById("modalDetails");

function displayInternships(data) {
    internshipList.innerHTML = "";

    if (data.length === 0) {
        internshipList.innerHTML = '<p class="empty">No internships found.</p>';
        return;
    }

    data.forEach(job => {
        internshipList.innerHTML += `
            <div class="job-card">
                <div class="job-icon">${job.icon}</div>
                <h3>${job.title}</h3>
                <p class="company">${job.company}</p>

                <div class="job-info">
                    <span>${job.duration}</span>
                    <span>${job.stipend}</span>
                    <span>${job.location}</span>
                </div>

                <div class="card-buttons">
                    <button class="details-btn"
                    onclick="showDetails(${job.id})">Details</button>

                    <button class="apply-btn"
                    onclick="applyInternship(${job.id})">
                    Apply Now</button>
                </div>
            </div>
        `;
    });
}

function showDetails(id) {
    const job = internships.find(item => item.id === id);

    modalDetails.innerHTML = `
        <div class="job-icon">${job.icon}</div>
        <h2>${job.title}</h2>
        <h4>${job.company}</h4>
        <p><b>Category:</b> ${job.category}</p>
        <p><b>Duration:</b> ${job.duration}</p>
        <p><b>Stipend:</b> ${job.stipend}</p>
        <p><b>Location:</b> ${job.location}</p>
        <p>${job.description}</p>
        <button class="apply-btn" onclick="applyInternship(${job.id})">
            Apply Now
        </button>
    `;

    modal.style.display = "flex";
}

function applyInternship(id) {
    const job = internships.find(item => item.id === id);

    const alreadyApplied = applications.some(
        item => item.id === id
    );

    if (alreadyApplied) {
        alert("You have already applied for this internship!");
        return;
    }

    applications.push({
        id: job.id,
        title: job.title,
        company: job.company,
        status: "Under Review"
    });

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    alert("Application submitted successfully!");

    modal.style.display = "none";

    displayApplications();
}

function displayApplications() {
    applicationList.innerHTML = "";

    if (applications.length === 0) {
        applicationList.innerHTML =
            '<p class="empty">No applications yet. Apply for an internship!</p>';
        return;
    }

    applications.forEach(app => {
        applicationList.innerHTML += `
            <div class="application-row">
                <span>${app.title}</span>
                <span>${app.company}</span>
                <span><span class="status">${app.status}</span></span>
            </div>
        `;
    });
}

function filterInternships() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    const filtered = internships.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            job.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    displayInternships(filtered);
}

searchInput.addEventListener("input", filterInternships);
categoryFilter.addEventListener("change", filterInternships);

document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

displayInternships(internships);
displayApplications();
