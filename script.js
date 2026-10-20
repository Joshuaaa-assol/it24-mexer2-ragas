

const button = document.getElementById("loadBtn");
const userList = document.getElementById("userList");
const postbutton = document.getElementById("loadPost");

button.addEventListener("click", getUsers);
postbutton.addEventListener("click", loadPosts);

async function getUsers() {
  userList.textContent = "Loading users...";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to retrieve users");
    }
    const users = await response.json();

    userList.innerHTML = "";
    users.forEach(function (user) {
      const card = document.createElement("div");
      card.className = "user-card";

      const name = document.createElement("h3");
      name.textContent = user.name;

      const email = document.createElement("p");
      email.textContent = user.email;

      const city = document.createElement("p");
      city.textContent = user.address.city;

      const phone = document.createElement("p");
      phone.textContent = user.phone;

      const lat = document.createElement("p");
      lat.textContent = user.address.geo.lat;

      const catchPhrase = document.createElement("p");
      catchPhrase.textContent = user.company.catchPhrase;

      const website = document.createElement("p");
      website.textContent = user.website;

      card.append(name, email, city, phone, lat, catchPhrase, website);
      userList.appendChild(card);
    });

    console.log(users);
  } catch (error) {
    userList.textContent = "Error: " + error.message;
  }
}

// LOAD POSTS
async function loadPosts() {
  userList.textContent = "Loading posts...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Failed to retrieve posts");
    }

    const posts = await response.json();

    userList.innerHTML = "";

    posts.slice(0, 10).forEach(function (post) {
      const card = document.createElement("div");
      card.className = "user-card";

      const title = document.createElement("h3");
      title.textContent = post.title;

      const body = document.createElement("p");
      body.textContent = post.body;

      card.append(title, body);
      userList.appendChild(card);
    });

    console.log(posts.slice(0, 10));
  } catch (error) {
    userList.textContent = "Error: " + error.message;
  }
}

// BONUS: CREATE A POST
async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "My First API Post",
        body: "Learning API Integration",
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error("POST failed");
    }

    console.log(await response.json());
  } catch (error) {
    console.error(error);
  }
}
