<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import Card from 'src/components/CardComponent.vue';
const totalContent = ref(0);
const totalUsers = ref(0);
const totalCategories = ref(0);

let contentInterval: ReturnType<typeof setInterval> | null = null;
let userInterval: ReturnType<typeof setInterval> | null = null;
let categoryInterval: ReturnType<typeof setInterval> | null = null;

const fetchTotalContents = async () => {
  try {
    const token = localStorage.getItem('Authorization');
    const res = await axios.get(`http://localhost:3333/api/admin/total-content`, {
      headers: { Authorization: token },
    });
    totalContent.value = res.data.totalContents;
  } catch (err) {
    console.error('Fetch content error:', err);
  }
};

const fetchTotalUsers = async () => {
  try {
    const token = localStorage.getItem('Authorization');
    const res = await axios.get(`http://localhost:3333/api/admin/total-users`, {
      headers: { Authorization: token },
    });
    totalUsers.value = res.data.totalUsers;
  } catch (err) {
    console.error('Fetch users error:', err);
  }
};

const fetchTotalCategories = async () => {
  try {
    const token = localStorage.getItem('Authorization');
    const res = await axios.get(`http://localhost:3333/api/admin/total-categories`, {
      headers: { Authorization: token },
    });
    totalCategories.value = res.data.totalCategories;
  } catch (err) {
    console.error('Fetch categories error:', err);
  }
};

onMounted(() => {
  void fetchTotalContents();
  void fetchTotalUsers();
  void fetchTotalCategories();

  contentInterval = setInterval(() => {
    void fetchTotalContents();
  }, 10000);
  userInterval = setInterval(() => {
    void fetchTotalUsers();
  }, 10000);
  categoryInterval = setInterval(() => {
    void fetchTotalCategories();
  }, 10000);
});

onUnmounted(() => {
  if (contentInterval) clearInterval(contentInterval);
  if (userInterval) clearInterval(userInterval);
  if (categoryInterval) clearInterval(categoryInterval);
});
</script>

<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4">
        <Card :value="totalUsers" title="Total Users" />
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <Card :value="totalContent ?? 0" title="Total Contents" />
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <Card :value="totalCategories" title="Total Categories" />
      </div>
    </div>
  </div>
</template>
