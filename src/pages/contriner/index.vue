<template>
    <div id="Contriner">
        <Header />
        <div id="ContrinerMain">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '../../components/Header/index.vue'
</script>