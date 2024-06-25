<template>
    <div class="spark-editor">
        <bubbleMenu v-model="editor" />
        <editor-content :editor="editor" class="spark-editor-content" />
    </div>
</template>

<script setup lang="ts">
import "./index.scss"
import "./tiptap.scss"
import { useEditor, EditorContent, JSONContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import { all, createLowlight } from 'lowlight'
import StarterKit from '@tiptap/starter-kit'
import StarterKitConfigure from './configure/StarterKit'
import bubbleMenu from "./extensions/bubble-menu.vue";
import { editorOptions } from "./type";
import { ref } from "vue";
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

const props = defineProps<{
    options?: editorOptions,
    defaultValue?: JSONContent
}>()
const lowlight = createLowlight(all)
const fontCount = ref<number>(0)

const CustomDocument = Document.extend({
    content: 'heading block*',
})

const Options = ref<editorOptions>(props.options || {
    cache: {
        enable: true,
        id: "editor-content"
    },
    fontCount: {
        enable: true,
        limit: null,
        mode: "textSize"
    }
})
const Content = ref<JSONContent>(props.defaultValue || {
    type: "doc",
    content: [
        {
            type: "paragraph"
        }
    ]
})

const editor = useEditor({
    extensions: [
        CustomDocument,
        StarterKit.configure({...StarterKitConfigure, document: false, codeBlock: false}),
        TextStyle,
        Color,
        CharacterCount.configure({
            limit: Options.value.fontCount.limit,
            mode: Options.value.fontCount.mode
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
            placeholder: ({ node }) => {
                if (node.type.name === 'heading') {
                    return '在此键入标题...'
                }

                return '输入 " / " 添加块...'
            },
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
        if(Options.value.fontCount.enable) {
            fontCount.value = editor.value?.storage.characterCount.characters()
        }
        if (Options.value.cache.enable) {
            localStorage.setItem(Options.value.cache.id, JSON.stringify(editor.value?.getJSON()))
        } else {
            Content.value = editor.value!.getJSON()
        }
    },
    onCreate: () => {
        if (Options.value.cache.enable) {
            const data = localStorage.getItem(Options.value.cache.id)
            if (data) {
                editor.value?.commands.setContent(JSON.parse(data))
            }
        } else {
            editor.value?.commands.setContent(Content.value)
        }
    }
})

defineExpose({
    fontCount,
    Content
})
</script>