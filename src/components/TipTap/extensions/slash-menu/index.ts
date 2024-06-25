import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'

import CommandsList from './floating-menu.vue'

export default {
    items: ({ query }: any) => {
        return [
            {
                title: '二级标题',
                icon: "h",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
                },
            },
            {
                title: '三级标题',
                icon: "h",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
                },
            },
            {
                title: '四级标题',
                icon: "h",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
                },
            },
            {
                title: '任务',
                icon: "square-check",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleTaskList().run()
                },
            },
            {
                title: '有序列表',
                icon: "list-ol",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleOrderedList().run()
                },
            },
            {
                title: '无序列表',
                icon: "list-ul",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleBulletList().run()
                },
            },
            {
                title: '代码块',
                icon: "code",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
                },
            },
            {
                title: '引用块',
                icon: "quote-left",
                type: "item",
                command: ({ editor, range }: any) => {
                    editor.chain().focus().deleteRange(range).toggleBlockquote().run()
                },
            },
            // {
            //     title: '表格',
            //     icon: "table",
            //     type: "item",
            //     command: ({ editor, range }: any) => {
            //         editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            //     },
            // }
        ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
    },

    render: () => {
        let component: VueRenderer
        let popup: any

        return {
            onStart: (props: { editor: any; clientRect: any }) => {
                component = new VueRenderer(CommandsList, {
                    props,
                    editor: props.editor,
                })

                if (!props.clientRect) {
                    return
                }

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'left-start',
                })
            },

            onUpdate(props: any) {
                component.updateProps(props)

                if (!props.clientRect) {
                    return
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props: { event: { key: string } }) {
                if (props.event.key === 'Escape') {
                    popup[0].hide()

                    return true
                }

                return component.ref?.onKeyDown(props)
            },

            onExit() {
                popup[0].destroy()
                component.destroy()
            },
        }
    },
}