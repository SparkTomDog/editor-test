<template>
    <el-container class="spark-editor" :id="editorData.id">
        <el-header>
            <input type="text" v-model="editorData.label">
            <span>
                {{ fontCount }}
            </span>
        </el-header>
        <el-main>
            <bubbleMenu v-model="editor" />
            <editor-content :editor="editor" class="spark-editor-content" />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import "./index.scss"
import "./tiptap.scss"
import { Editor, EditorContent, JSONContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import { all, createLowlight } from 'lowlight'
import StarterKit from '@tiptap/starter-kit'
import StarterKitConfigure from './configure/StarterKit'
import bubbleMenu from "./extensions/bubble-menu.vue";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import SlashCommands from './extensions/slash-menu/command'
import suggestion from './extensions/slash-menu/index'
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Placeholder from "@tiptap/extension-placeholder"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import Underline from "@tiptap/extension-underline"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Link from "@tiptap/extension-link"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import CharacterCount from "@tiptap/extension-character-count"
import Document from '@tiptap/extension-document'
import CodeBlockComponent from './extensions/CodeBlockComponent.vue'
import { propsEditorDataType } from "./type"

const props = defineProps<{
    data: propsEditorDataType
}>()
const editor = ref<Editor>()
const editorData = ref<propsEditorDataType>(props.data)
const lowlight = createLowlight(all)
const fontCount = ref<number>()

const editorInit = () => {
    editor.value = new Editor({
        extensions: [
            Document,
            StarterKit.configure({ ...StarterKitConfigure, document: false, codeBlock: false }),
            TextStyle,
            Color,
            CharacterCount.configure({
                limit: null,
                mode: "textSize"
            }),
            CodeBlockLowlight.extend({
                addNodeView() {
                    return VueNodeViewRenderer(CodeBlockComponent)
                },
            }).configure({
                languageClassPrefix: 'language-',
                defaultLanguage: 'js',
                lowlight,
                HTMLAttributes: {
                    class: "spark-block-code"
                }
            }),
            Placeholder.configure({
                placeholder: `输入 " / " 添加块...`,
            }),
            Subscript.configure({
                HTMLAttributes: {
                    class: 'spark-sub',
                },
            }),
            Superscript.configure({
                HTMLAttributes: {
                    class: 'spark-sup',
                },
            }),
            Underline.configure({
                HTMLAttributes: {
                    class: 'spark-underline',
                },
            }),
            SlashCommands.configure({
                suggestion,
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: 'spark-task-list',
                },
            }),
            TaskItem.configure({
                HTMLAttributes: {
                    class: 'spark-task-item',
                    nested: true,
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
        ],
        editorProps: {
            attributes: {
                class: "spark-editor-item"
            }
        },
        onUpdate: () => {
            fontCount.value = editor.value?.storage.characterCount.characters()
            editorData.value.content = editor.value?.getJSON() as JSONContent
        },
        onCreate: () => {
            editor.value?.commands.setContent(editorData.value.content)
        }
    })
}

onMounted(() => {
    editorInit()
})

onBeforeUnmount(async() => {
    console.log("更新", editorData.value)
})

onUnmounted(() => {
    editor.value?.destroy()
})
</script>