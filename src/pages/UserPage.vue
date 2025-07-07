<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { QTableProps } from 'quasar';

const users = ref([]);
const isLoading = ref(false);
const deletingId = ref<number | null>(null);

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Name', align: 'left', field: 'name' },
  { name: 'email', label: 'Email', align: 'left', field: 'email' },
  { name: 'status', label: 'Status', align: 'left', field: 'status' },
  { name: 'actions', label: 'Action', align: 'left', field: 'id' },
];

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('Authorization');
    const res = await axios.get(`http://localhost:3333/api/admin/users`, {
      headers: { Authorization: token },
    });
    users.value = res.data.users;
  } catch (err) {
    if (err instanceof Error) console.error('Error:', err.message);
  } finally {
    isLoading.value = false;
  }
};

const deleteUser = async (id: number) => {
  deletingId.value = id;
  try {
    const token = localStorage.getItem('Authorization');
    await axios.delete(`http://localhost:3333/api/delete-user/${id}`, {
      headers: { Authorization: token },
    });
    await fetchUsers();
  } catch (err) {
    if (err instanceof Error) console.error('Error:', err.message);
  } finally {
    deletingId.value = null;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      :rows="users"
      :columns="columns"
      row-key="id"
      flat
      bordered
      separator="horizontal"
      :loading="isLoading"
      loading-label="Loading users..."
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-if="deletingId !== props.row.id"
            label="Delete"
            color="negative"
            dense
            unelevated
            @click="deleteUser(props.row.id)"
          />
          <q-btn v-else label="Deleting..." color="negative" dense unelevated :disable="true" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
