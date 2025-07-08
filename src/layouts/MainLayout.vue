<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">Content Management System</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="tw-flex tw-justify-between tw-flex-col tw-h-full tw-p-2">
        <q-list>
          <router-link
            v-for="link in linksList"
            :key="link.title"
            :to="`/${link.link}`"
            class="q-item q-item-type row no-wrap q-pa-sm tw-p-6"
            active-class="text-primary bg-grey-2"
            exact
          >
            {{ link.title }}
          </router-link>
        </q-list>
        <q-btn
          :icon="'exit_to_app'"
          @click="logOut"
          :to="'/'"
          :color="'red'"
          :ripple="true"
          padding="lg xs"
          >Logout</q-btn
        >
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type EssentialLinkProps } from "components/EssentialLink.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const linksList: EssentialLinkProps[] = [
  {
    title: "Home",
    icon: "home",
    link: "home",
  },
  {
    title: "Contents",
    icon: "article",
    link: "content",
  },
  {
    title: "Comments",
    icon: "chat",
    link: "comments",
  },
  {
    title: "Users",
    icon: "group",
    link: "users",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logOut = () => {
  localStorage.removeItem("Authorization");
  $q.notify("Logged out successfully");
};
</script>
