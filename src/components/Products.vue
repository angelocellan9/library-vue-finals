<template>
  <div class="main-con">
    <div class="table-authors">
      <h1 class="author-title"> AUTHORS </h1>
      <button @click="showForm = true" class="btn-success">Add Author</button>

      <!-- Add Author Modal -->
      <div v-if="showForm" class="modal">
        <div class="modal-content">
          <span @click="showForm = false" class="close">&times;</span>
          <form @submit.prevent="addAuthor">
            <label for="authorName">Name:</label>
            <input v-model="newAuthor.name" type="text" id="authorName" required>

            <label for="authorBiography">Biography:</label>
            <textarea v-model="newAuthor.biography" id="authorBiography"></textarea>

            <button type="submit" class="btn-success">Add</button>
          </form>
        </div>
      </div>

      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Biography</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author.id">
            <td>{{ author.id }}</td>
            <td>{{ author.name }}</td>
            <td>{{ author.biography || 'No biography available' }}</td>
            <td>
              <button @click="deleteAuthor(author.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.btn-success{
  background-color: #068a22;
  color:white ;
  padding: 8px;
  border-radius: 10px;
}
.author-title {
  font-weight: bold;
  font-size: 2rem;
  text-shadow: #068a22;
}

.main-con {
  margin: 2%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 10px;
}

th,
td {
  border: 1px solid #068a22;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #068a22;
  color: white;
}

.auth {
  color: white;
}

.btn {
  margin-top: 10px;
  margin-right: 10px;
}

form {
  margin-top: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

/* Modal Styles */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';

const authors = ref(null);
const newAuthor = ref({ name: '', biography: '' });
const showForm = ref(false);

onMounted(() => {
  fetch('http://localhost:8000/api/authors')
    .then((response) => response.json().then((data) => (authors.value = data)))
    .catch((error) => console.error('Error fetching authors:', error));
});

const deleteAuthor = async (authorId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/authors/${authorId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      authors.value = authors.value.filter((author) => author.id !== authorId);
      alert('Author deleted successfully!');
    } else {
      console.error('Failed to delete author:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting author:', error);
  }
};

const addAuthor = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/authors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAuthor.value),
    });

    if (response.ok) {
      const newAuthorData = await response.json();
      authors.value.push(newAuthorData);
      alert('Author added successfully!');
      showForm.value = false;
    } else {
      console.error('Failed to add author:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding author:', error);
  }
};
</script>

