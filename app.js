// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqrAMFWAXnu1rapsiyVbaQpVaN_oGCwzA",
  authDomain: "resepmakanan-8d886.firebaseapp.com",
  projectId: "resepmakanan-8d886",
  storageBucket: "resepmakanan-8d886.appspot.com",
  messagingSenderId: "964433867152",
  appId: "1:964433867152:web:d2fd9201165e236265c315"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let namaV = document.getElementById("nama");
let resepV = document.getElementById("resep"); 
let tbody = document.getElementById("tbody");
let editnama = document.getElementById("editnama");
let editresep = document.getElementById("editresep");
let idV = document.getElementById("id");

//Create Data
function createData() {
  let data = {
      nama: namaV.value,
      resep: resepV.value 
  };
  database.ref("resepmakanan").push(data);
  namaV.value = "";
  resepV.value = ""; 
}

// Read Data
database.ref("resepmakanan").on("value", ambildata);

function ambildata(snapshot) {
  let table = "";
  let no = 1;
  snapshot.forEach((data) => {
      table += `
          <tr>
              <th scope="row">${no}</th>
              <td>${data.val().nama}</td>
              <td>${data.val().resep}</td> 
              <td>
                  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow('${data.key}')">Edit</button>
                  <button type="button" class="btn btn-danger" onclick="deleteRow('${data.key}')">Hapus</button>
              </td>
          </tr>
      `;
      no++;
  });

  tbody.innerHTML = table;
}

//show data edit
function editRow(id) {
  database.ref("resepmakanan/" + id).get().then((snapshot) => {
      if (snapshot.exists()) {
          editnama.value = snapshot.val().nama;
          editresep.value = snapshot.val().resep; 
          idV.value = id;
      } else {
          console.log("No data available");
      }
  }).catch((error) => {
      console.error(error);
  });
}
//update data
function updateData() {
  let data = {
      nama: editnama.value,
      resep: editresep.value 
  };
  database.ref("resepmakanan/" + idV.value).update(data)
      .then(() => {
          // Tutup modal setelah update berhasil
          const modalElement = document.getElementById('exampleModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
      })
      .catch((error) => {
          console.error("Error updating data:", error);
      });
}

function deleteRow(id) {
  database.ref("resepmakanan/" + id).remove();
}
