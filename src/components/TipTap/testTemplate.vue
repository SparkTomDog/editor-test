<template>
    <Editor :data="data" />
</template>

<script setup lang="ts">
import Editor from './index.vue'
import { propsEditorDataType } from './type';

const data: propsEditorDataType = {
    id: "a1111",
    label: "测试文档1",
    content: "这是测试文档1"
}
</script>