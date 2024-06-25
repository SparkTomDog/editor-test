import { StarterKitOptions } from "@tiptap/starter-kit";

export default {
    heading: {
        levels: [1, 2, 3, 4],
        HTMLAttributes: {
            class: "spark-heading"
        }
    },
    code: {
        HTMLAttributes: {
            class: "spark-code"
        }
    },
    paragraph: {
        HTMLAttributes: {
            class: "spark-paragraph"
        }
    },
    bulletList: {
        HTMLAttributes: {
            class: "spark-bullet-list"
        }
    },
    orderedList: {
        HTMLAttributes: {
            class: "spark-ordered-list"
        }
    },
    blockquote: {
        HTMLAttributes: {
            class: "spark-block-quote"
        }
    },
    bold: {
        HTMLAttributes: {
            class: "spark-bold"
        }
    },
    italic: {
        HTMLAttributes: {
            class: "spark-italic"
        }
    },
    strike: {
        HTMLAttributes: {
            class: "spark-strike"
        }
    },
    history: {
        depth: 20
    }
} as Partial<StarterKitOptions>