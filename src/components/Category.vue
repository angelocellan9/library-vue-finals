<template>
  <div class="main-con">
    <h1 class="title-page">BOOKS</h1>
    <button @click="showForm = true" class="btn-success">Add Book</button>

    <!-- Add Book Modal -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <span @click="showForm = false" class="close">&times;</span>
        <form @submit.prevent="addBook">
          <label for="bookTitle">Title:</label>
          <input v-model="newBook.title" type="text" id="bookTitle" required>

          <label for="bookISBN">ISBN:</label>
          <input v-model="newBook.isbn" type="text" id="bookISBN" required>

          <label for="bookAuthor">Author ID:</label>
          <input v-model="newBook.author_id" type="number" id="bookAuthor" required>

          <button type="submit" class="btn-success">Add</button>
        </form>
      </div>
    </div>

    <div class="book-list">
      <div v-for="book in books" :key="book.id" class="book-card">
        <h2 class="book-title">{{ book.title }}</h2>
        <p>ISBN: {{ book.isbn }}</p>
        <p>Author ID: {{ book.author_id }}</p>
        <button @click="deleteBook(book.id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<style>
.title-page {
  font-weight: bold;
  font-size: 3rem;
  text-shadow: #068a22;
}

.book-title {
  font-size: 1.5rem;
  font-weight: 800;
}

.main-con {
  margin: 2%;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
}

.book-card {
  border: 1px solid #068a22;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 300px;
}

.btn {
  margin-top: 10px;
  margin-right: 10px;
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

const books = ref(null);
const newBook = ref({ title: '', isbn: '', author_id: '' });
const showForm = ref(false);

onMounted(() => {
  fetch('http://localhost:8000/api/books')
    .then((response) => response.json().then((data) => (books.value = data)))
    .catch((error) => console.error('Error fetching books:', error));
});

const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/books/${bookId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      books.value = books.value.filter((book) => book.id !== bookId);
      alert('Book deleted successfully!');
    } else {
      console.error('Failed to delete book:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};

const addBook = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook.value),
    });

    if (response.ok) {
      const newBookData = await response.json();
      books.value.push(newBookData);
      alert('Book added successfully!');
      showForm.value = false;
    } else {
      console.error('Failed to add book:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding book:', error);
  }
};
</script>
