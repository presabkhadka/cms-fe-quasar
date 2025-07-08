<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import type { QTableProps } from "quasar";

const comments = ref([]);

const columns: QTableProps["columns"] = [
  { name: "comment", label: "Comment", align: "left", field: "comment" },
  { name: "status", label: "Status", align: "left", field: "status" },
  {
    name: "content_id",
    label: "Content ID",
    align: "left",
    field: "content_id",
  },
  { name: "user_id", label: "User ID", align: "left", field: "user_id" },
  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "id",
  },
];

const fetchComments = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comments`,
      {
        headers: { Authorization: token },
      }
    );
    comments.value = res.data.comments;
  } catch (err) {
    if (err instanceof Error) console.error("Error:", err.message);
  }
};

const approveComment = async (id: number) => {
  try {
    const token = localStorage.getItem("Authorization");
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comment/approve/${id}`,
      {},
      { headers: { Authorization: token } }
    );
  } catch (err) {
    if (err instanceof Error) console.error("Error:", err.message);
  } finally {
    void fetchComments();
  }
};

const rejectComment = async (id: number) => {
  try {
    const token = localStorage.getItem("Authorization");
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comment/reject/${id}`,
      {},
      { headers: { Authorization: token } }
    );
  } catch (err) {
    if (err instanceof Error) console.error("Error:", err.message);
  } finally {
    void fetchComments();
  }
};

const deleteComment = async (id: number) => {
  try {
    const token = localStorage.getItem("Authorization");
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comment/delete/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  } catch (err) {
    if (err instanceof Error) console.error("Error:", err.message);
  } finally {
    void fetchComments();
  }
};

onMounted(fetchComments);
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Comments"
      :rows="comments"
      :columns="columns"
      row-key="id"
      flat
      bordered
      separator="horizontal"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm tw-p-4">
            <q-btn
              v-if="
                props.row.status === 'PENDING' ||
                props.row.status === 'REJECTED'
              "
              color="positive"
              label="Approve"
              dense
              unelevated
              @click="approveComment(props.row.id)"
              padding="xs lg"
              />
              <q-btn
              v-else
              color="warning"
              label="Reject"
              dense
              unelevated
              @click="rejectComment(props.row.id)"
              padding="xs lg"
              />
              <q-btn
              color="negative"
              label="Delete"
              dense
              unelevated
              @click="deleteComment(props.row.id)"
              padding="xs lg"
              />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
