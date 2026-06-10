const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/";
}

async function load() {
  const res = await fetch("/complaints", {
    headers: { Authorization: token }
  });

  const data = await res.json();

  list.innerHTML = data.map(c => `
    <div class="card">
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <b>${c.status}</b>

      <button onclick="resolve('${c._id}')">Resolve</button>
      <button onclick="del('${c._id}')">Delete</button>
    </div>
  `).join("");
}

async function add() {
  await fetch("/complaints", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      title: title.value,
      description: desc.value
    })
  });

  load();
}

async function resolve(id) {
  await fetch("/complaints/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ status: "resolved" })
  });

  load();
}

async function del(id) {
  await fetch("/complaints/" + id, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  load();
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

load();