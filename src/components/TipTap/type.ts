import { JSONContent } from "@tiptap/core"

interface propsEditorDataType {
    id: string
    label: string
    content: JSONContent | string
    [x: string]: any
}
export type {
    propsEditorDataType
}