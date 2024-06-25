<template>
    <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor" class="spark-bubble-menu">
        <button
            v-for="item in menuItem"
            @click="item.onClick"
            :class="{ 'is-active': editor.isActive(`${item.id}`) }" v-show="item.label !== 'null'"
            :title="item.label"
        >
            <span v-if="item.icon">
                <font-awesome-icon :icon="item.icon" />
            </span>
            <span v-else>
                {{ item.label }}
            </span>
        </button>
    </bubble-menu>
</template>

<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import { ref } from 'vue';

const editor = defineModel<Editor>()

const menuItem = ref([
    {
        id: "bold",
        label: "粗体",
        icon: "bold",
        onClick: () => editor.value!.chain().focus().toggleBold().run()
    },
    {
        id: "textStyle",
        label: "Mark",
        icon: "highlighter",
        onClick: () => toggleColor()
    },
    {
        id: "italic",
        label: "斜体",
        icon: "italic",
        onClick: () => editor.value!.chain().focus().toggleItalic().run()
    },
    {
        id: "strike",
        label: "删除线",
        icon: "strikethrough",
        onClick: () => editor.value!.chain().focus().toggleStrike().run()
    },
    {
        id: "underline",
        label: "下划线",
        icon: "underline",
        onClick: () => editor.value!.chain().focus().toggleUnderline().run()
    },
    {
        id: "code",
        label: "行内代码",
        icon: "terminal",
        onClick: () => editor.value!.chain().focus().toggleCode().run()
    },
    {
        id: "subscript",
        label: "下标",
        icon: "subscript",
        onClick: () => editor.value!.chain().focus().toggleSubscript().run()
    },
    {
        id: "superscript",
        label: "上标",
        icon: "superscript",
        onClick: () => editor.value!.chain().focus().toggleSuperscript().run()
    },
    {
        id: "taskItem",
        label: "null",
        onClick: () => editor.value!.chain().focus().splitListItem('taskItem').run()
    },
    {
        id: "taskItem",
        label: "null",
        onClick: () => editor.value!.chain().focus().sinkListItem('taskItem').run()
    },
    {
        id: "taskItem",
        label: "null",
        onClick: () => editor.value!.chain().focus().liftListItem('taskItem').run()
    }
])

const toggleColor = () => {
    if(editor.value?.isActive('textStyle', { color: '#F98181' })) {
        editor.value.chain().focus().unsetColor().run()
    } else {
        editor.value?.chain().focus().setColor('#F98181').run()
    }
}
</script>