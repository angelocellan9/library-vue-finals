<template>
  <div class="copy-list">
    <h1 class="coh1">COPIES</h1>
    <button @click="showForm = true" class="btn-success">Add Copy</button>

    <!-- Add Copy Modal -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <span @click="showForm = false" class="close">&times;</span>
        <form @submit.prevent="addCopy">
          <label for="bookId">Book ID:</label>
          <input v-model="newCopy.book_id" type="number" id="bookId" required>

          <label for="copyNumber">Copy Number:</label>
          <input v-model="newCopy.copy_number" type="text" id="copyNumber" required>

          <label for="status">Status:</label>
          <input v-model="newCopy.status" type="text" id="status" required>

          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
    </div>

    <div class="copy-container">
      <div v-for="copy in copies" :key="copy.id" class="copy-box">
        <div class="copy-details">
          <h2 class="copy-title">Copy ID: {{ copy.id }}</h2>
          <p>Book ID: {{ copy.book_id }}</p>
          <p>Copy Number: {{ copy.copy_number }}</p>
          <p>Status: {{ copy.status }}</p>
          <button @click="deleteCopy(copy.id)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.coh1 {
  font-size: 35px;
  color: #068a22; /* Green color */
  font-weight: bold;
  margin-bottom: 10px;
}

.copy-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 2%;
}

.copy-box {
  border: 2px solid #35dc3d;
  background-color: #dcf8d7;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
}

.copy-details {
  color: #000; /* Black text */
}

.btn {
  background-color: #dc3545; /* Red button */
  color: #ffffff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
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
.copy-list{
  margin: 2%;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';

const copies = ref(null);
const newCopy = ref({ book_id: '', copy_number: '', status: '' });
const showForm = ref(false);

onMounted(() => {
  fetch('http://localhost:8000/api/copies')
    .then((response) => response.json().then((data) => (copies.value = data)))
    .catch((error) => console.error('Error fetching copies:', error));
});

const deleteCopy = async (copyId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/copies/${copyId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      copies.value = copies.value.filter((copy) => copy.id !== copyId);
      alert('Copy deleted successfully!');
    } else {
      console.error('Failed to delete copy:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting copy:', error);
  }
};

const addCopy = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/copies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCopy.value),
    });

    if (response.ok) {
      const newCopyData = await response.json();
      copies.value.push(newCopyData);
      alert('Copy added successfully!');
      showForm.value = false;
    } else {
      console.error('Failed to add copy:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding copy:', error);
  }
};
</script>

