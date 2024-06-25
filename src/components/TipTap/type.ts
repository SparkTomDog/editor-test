interface cacheType {
    enable: boolean
    id: string
}

interface fontCountType {
    enable: boolean
    limit: number | null
    mode: "textSize" | "nodeSize"
}

interface editorOptions {
    cache: cacheType,
    fontCount: fontCountType
}

export type {
    editorOptions
}