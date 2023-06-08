const fetch = require("node-fetch");

// Path to JSON server
// Remember to run the command: `npm run json-server`
const JSON_SERVER = "http://127.0.0.1:3001"; // 'https://mapi.brocorp.site';

/**** USERS ****/

// Get user by uid
function getUser(uid) {
  return fetch(`${JSON_SERVER}/users?id=${uid}`).then((r) => r.json());
}

// Get user by walletId
function getUserByWalletId(walletId) {
  return fetch(`${JSON_SERVER}/users?walletId=${walletId}`)
    .then((r) => r.json())
    .then((results) => {
      return results[0];
    });
}

// Create a new user
function createUser(walletId, data) {
  return fetch(`${JSON_SERVER}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletId: walletId, lastSeen: Date.now(), ...data }),
  }).then((r) => r.json());
}

// Update an existing user
function updateUser(uid, data) {
  return fetch(`${JSON_SERVER}/users/${uid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

// Update a user by their stripeCustomerId
function updateUserByCustomerId(customerId, data) {
  return getUserByCustomerId(customerId).then((user) => {
    return updateUser(user.uid, data);
  });
}

/**** ITEMS ****/

// Fetch item data
function getItem(id) {
  return fetch(`${JSON_SERVER}/items?_id=${id}`).then((r) => r.json());
}

function getItemByName(name) {
  var x = name.split("/");
  return fetch(`${JSON_SERVER}/items?siteName=${x[0]}&pageName=${x[1]}`).then(
    (r) => r.json()
  );
}

// Fetch all items by site name
function getItemsBySiteName(siteName) {
  return fetch(
    `${JSON_SERVER}/items?siteName=${siteName}&$limit=30&$sort=createdAt&$order=desc`
  ).then((r) => r.json());
}

// Create a new item
function createItem(data) {
  return fetch(`${JSON_SERVER}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, createdAt: Date.now() }),
  }).then((r) => r.json());
}

// Update an item
function updateItem(id, data) {
  return fetch(`${JSON_SERVER}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

// Delete an item
function deleteItem(id) {
  return fetch(`${JSON_SERVER}/items/${id}`, {
    method: "DELETE",
  }).then((r) => {
    return;
  });
}

// Fetch all items by site name
function getSiteBuilds(siteName) {
  return fetch(`${JSON_SERVER}/sites?siteName=${siteName}`).then((r) =>
    r.json()
  );
}

function getAllPendingSiteBuilds() {
  return fetch(`${JSON_SERVER}/sites?status=${"pending"}`).then((r) =>
    r.json()
  );
}

function createSiteBuilds(data) {
  return fetch(`${JSON_SERVER}/sites/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

function updateSiteBuilds(id, data) {
  return fetch(`${JSON_SERVER}/sites/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
  }).then((r) => r.json());
}

module.exports = {
  getUser,
  getUserByWalletId,
  createUser,
  updateUser,
  updateUserByCustomerId,

  getItem,
  getItemByName,
  getItemsBySiteName,
  createItem,
  updateItem,
  deleteItem,

  getSiteBuilds,
  getAllPendingSiteBuilds,
  createSiteBuilds,
  updateSiteBuilds,
};
