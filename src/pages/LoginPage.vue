<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const submitForm = async () => {
  try {
    const response = await axios.post(`http://localhost:3333/api/admin/login`, {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;
    localStorage.setItem('Authorization', `Bearer ${token}`);
    await router.push('/home');
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
</script>
<template>
  <div class="fixed-center">
    <q-card class="q-pa-lg shadow-2" style="min-width: 300px; max-width: 400px; width: 100%">
      <q-card-section>
        <div class="text-h6 text-center q-mb-md">Login</div>
        <q-form @submit.prevent="submitForm">
          <q-input
            v-model="email"
            filled
            type="email"
            label="Email"
            placeholder="Enter your email"
            name="email"
            class="q-mb-md"
          />

          <q-input
            v-model="password"
            filled
            type="password"
            label="Password"
            placeholder="Enter your password"
            name="password"
            class="q-mb-md"
          />

          <q-btn label="Login" color="primary" class="full-width" unelevated type="submit" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
