
const userList = document.getElementById("userList");
const button = document.getElementById("loadUsers");
const postbutton = document.getElementById("loadPosts");

async function getUsers() {
    try {
        userList.innerHTML = "<p>Loading users...</p>";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to load users.");
        }

        const users = await response.json();

        userList.innerHTML = "";

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Username: ${user.username}</p>
            `;

            userList.appendChild(card);
        });
    } catch (error) {
        userList.innerHTML =
            `<p>Error: ${error.message}</p>`;
    }
}

async function loadPost() {
    try {
        userList.innerHTML = "<p>Loading posts...</p>";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
            throw new Error("Failed to load posts.");
        }

        const posts = await response.json();

        userList.innerHTML = "";

        posts.slice(0, 10).forEach(post => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;

            userList.appendChild(card);
        });
    } catch (error) {
        userList.innerHTML =
            `<p>Error loading posts: ${error.message}</p>`;
    }
}

button.addEventListener("click", getUsers);
postbutton.addEventListener("click", loadPost);
