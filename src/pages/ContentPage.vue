<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const contents = ref([]);

const fetchContents = async () => {
  try {
    const token = localStorage.getItem('Authorization');
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/contents`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);

    contents.value = response.data.contents;

    console.log(contents.value);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const publishContent = async (id: number) => {
  try {
    const token = localStorage.getItem('Authorization');
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/content/publish/${id}`,
      {},
      {
        headers: { Authorization: token },
      },
    );
  } catch (error) {
    console.error('Publish error:', error);
  } finally {
    void fetchContents();
  }
};

const draftContent = async (id: number) => {
  try {
    const token = localStorage.getItem('Authorization');
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/content/draft/${id}`,
      {},
      {
        headers: { Authorization: token },
      },
    );
  } catch (error) {
    console.error('Draft error:', error);
  } finally {
    void fetchContents();
  }
};

const deleteContent = async (id: number) => {
  try {
    const token = localStorage.getItem('Authorization');
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/content/delete/${id}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error('Delete error:', error);
  } finally {
    void fetchContents();
  }
};

onMounted(() => {
  void fetchContents();
});
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Content List"
      :rows="contents"
      :columns="[
        { name: 'title', label: 'Title', align: 'left', field: 'title' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
        { name: 'slug', label: 'Slug', align: 'left', field: 'slug' },
        { name: 'actions', label: 'Actions', align: 'left', field: 'id' },
      ]"
      row-key="id"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              v-if="props.row.status !== 'PUBLISHED'"
              label="Publish"
              color="green"
              dense
              @click="publishContent(props.row.id)"
            />
            <q-btn
              v-else
              label="Draft"
              color="yellow"
              text-color="black"
              dense
              @click="draftContent(props.row.id)"
            />
            <q-btn label="Delete" color="red" dense @click="deleteContent(props.row.id)" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
