let toggleform = document.querySelector("#toggleform") as HTMLButtonElement;
let createProjectform = document.querySelector(
  ".createProjectform"
) as HTMLFormElement;

let projectname = document.querySelector("#projectname") as HTMLInputElement;
let projectmanager = document.querySelector(
  "#projectmanager"
) as HTMLInputElement;
let email = document.querySelector("#email") as HTMLInputElement;
let deadline = document.querySelector("#deadline") as HTMLInputElement;
let priority = document.querySelector("#priority") as HTMLInputElement;

let projects = document.querySelector(".projects") as HTMLTableElement;

let Projects: Project[] = JSON.parse(localStorage.getItem("Projects") || "[]");
// currentEmployee index
let currentIndex: number;

toggleform.addEventListener("click", () => {
  if (createProjectform.style.display == "none") {
    createProjectform.style.display = "flex";
    toggleform.textContent = "Close Form";
    toggleform.style.backgroundColor = "red";
  } else {
    createProjectform.style.display = "none";
    toggleform.textContent = "Add User";
    toggleform.style.backgroundColor = "#0c63dd";
  }
});

interface Project {
  id: number;
  projectname: string;
  projectmanager: string;
  email: string;
  deadline: string;
  priority: string;
}

createProjectform.addEventListener("submit", (e) => {
  e.preventDefault();

  let project =
    createProjectform.value.trim() != "" &&
    projectname.value.trim() != "" &&
    projectmanager.value.trim() != "" &&
    email.value.trim() != "" &&
    deadline.value.trim() != "" &&
    priority.value.trim() != "";

  if (project) {
    let ProjectDetails = {
      id: Projects.length + 1,
      projectname: projectname.value.trim(),
      email: email.value.trim(),
      projectmanager: projectmanager.value.trim(),
      deadline: deadline.value.trim(),
      priority: priority.value.trim(),
    };

    if (currentIndex) {
      Projects.splice(currentIndex, 1, ProjectDetails);
    } else {
      Projects.push(ProjectDetails);
    }
    localStorage.setItem("Projects", JSON.stringify(Projects));

    instance.displayProjects();

    projectname.value = "";
    projectmanager.value = "";
    deadline.value = "";
    email.value = "";
    priority.value = "";

    createProjectform.style.display = "none";
    toggleform.textContent = "Add Project";
    toggleform.style.backgroundColor = "#0c63dd";
  }
});

class ProjectActions {
  displayProjects() {
    let allprojects = document.querySelectorAll(
      ".projects .project"
    ) as NodeListOf<HTMLDivElement>;

    allprojects.forEach((el) => {
      el.remove();
    });

    Projects.forEach((project: Project, index: number) => {
      let projectrecord = <HTMLTableRowElement>document.createElement("tr");
      projectrecord.className = "project";

      let numbering = document.createElement("td") as HTMLTableCellElement;
      numbering.textContent = `${index + 1}`;

      let projectname = document.createElement("td") as HTMLTableCellElement;
      projectname.textContent = project.projectname;

      let projectmanager = document.createElement("td") as HTMLTableCellElement;
      projectmanager.textContent = project.projectmanager;

      let email = document.createElement("td") as HTMLTableCellElement;
      email.textContent = project.email;

      let deadline = document.createElement("td") as HTMLTableCellElement;
      deadline.textContent = project.deadline;

      let priority = document.createElement("td") as HTMLTableCellElement;
      priority.textContent = project.priority;

      let deletebtn = document.createElement("button") as HTMLButtonElement;
      deletebtn.textContent = "Delete";
      deletebtn.style.backfaceVisibility = "red";
      deletebtn.addEventListener("click", () => {
        this.deleteProject(index);
      });

      let updatebtn = document.createElement("button") as HTMLButtonElement;
      updatebtn.textContent = "Update";
      updatebtn.style.backfaceVisibility = "skyblue";
      updatebtn.addEventListener("click", () => {
        this.updateProject(index);
      });

      projectrecord.appendChild(numbering);
      projectrecord.appendChild(projectname);
      projectrecord.appendChild(projectmanager);
      projectrecord.appendChild(email);
      projectrecord.appendChild(deadline);
      projectrecord.appendChild(priority);
      projectrecord.appendChild(deletebtn);
    });
  }

  deleteProject(index: number) {
    Projects.splice(index, 1);

    this.displayProjects();
  }

  updateProject(index: number) {
    currentIndex = index;

    console.log(currentIndex);

    createProjectform.style.display = "flex";

    let user = Projects[index];
  }
}

let instance = new ProjectActions();

instance.displayProjects();
