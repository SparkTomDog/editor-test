<template>
    <div id="ContrinerHeader">
        <RouterLink to="/tiptap">TipTap</RouterLink>
        |
        <span>
            {{ route.name }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute()
</script>