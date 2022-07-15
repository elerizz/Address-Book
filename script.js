const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const newEl = (el) => document.createElement(el);
const qS = (el) => document.querySelector(el);

const input = document.querySelector(".input");
const favouriteBtn = document.querySelectorAll(".favouriteBtn");
const favourite = document.querySelectorAll(".favouriteBtn favourite");
const favContacts = document.querySelector(".fav-contacts");
const allContacts = document.querySelector(".all-contacts");

const createCard = (parent, name, email, username) => {
  const wrapperEl = newEl("div");
  const emailEl = newEl("p");
  const nameEl = newEl("h6");
  const usernameEl = newEl("p");
  const favouriteBtn = newEl("button");

  wrapperEl.classList.add("wrapper");
  emailEl.classList.add("email");
  nameEl.classList.add("name");
  usernameEl.classList.add("username");
  favouriteBtn.classList.add("favouriteBtn");

  emailEl.textContent = "email: " + email;
  nameEl.textContent = name;
  usernameEl.textContent = "username:  " + username;
  favouriteBtn.textContent = "⭐";

  //render contattti FAV
  favouriteBtn.addEventListener("click", (eFav) => {
    console.log(eFav.target);

    const wrapperElClone = eFav.target.closest("div").cloneNode(true);
    wrapperElClone.classList = "wrapperFav";
    favContacts.append(wrapperElClone);

    const removeFav = wrapperElClone.querySelector(".favouriteBtn");
    removeFav.textContent = "❌";
    removeFav.addEventListener("click", (eRem) => {
      eRem.target.closest("div").remove();
    });
  });

  wrapperEl.append(nameEl, favouriteBtn, emailEl, usernameEl);
  parent.appendChild(wrapperEl);
};

// render card TUTTI i contatti
const fetchContacts = async function fetchContacts() {
  const allContactsList = [];
  const request = await fetch(BASE_URL);
  const requestToJson = await request.json();
  console.log(requestToJson);
  requestToJson.map((user) =>
    createCard(allContacts, user.name, user.email, user.username)
  );
};
fetchContacts();

// filtro search
input.addEventListener("input", (e) => {
  document.querySelectorAll(".wrapper").forEach((card) => card.remove());

  fetch(BASE_URL)
    .then((res) => {
      const json = res.json();
      return json;
    })
    .then((json) => {
      console.log(json);
      json
        .filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        .map((user) =>
          createCard(allContacts, user.email, user.name, user.username, user.id)
        );
    });
});
