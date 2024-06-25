<template>
    <node-view-wrapper class="code-block">
        <select contenteditable="false" v-model="selectedLanguage">
            <option :value="null">
                auto
            </option>
            <option v-for="(language, index) in languages" :value="language" :key="index">
                {{ language }}
            </option>
        </select>
        <button @click="copyCodeContent">
            <span class="action_btn">
                <font-awesome-icon icon="check" v-if="isClipboard" />
                <font-awesome-icon icon="clipboard" v-else />
            </span>
        </button>
        <pre><code><node-view-content /></code></pre>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, ref } from 'vue';

const props = defineProps(nodeViewProps)
const languages = ref(props.extension.options.lowlight.listLanguages())
const isClipboard = ref<boolean>(false)
const selectedLanguage = computed({
    get() {
        return props.node.attrs.language
    },
    set(language) {
        props.updateAttributes({ language })
    },
})

const copyCodeContent = () => {
    const text = props.node.content.toJSON()[0].text
    window.navigator.clipboard.writeText(text).then(() => {
        isClipboard.value = true
        setTimeout(() => {
            isClipboard.value = false
        }, 1000)
    })
}
</script>

<style lang="scss">
.code-block {
    position: relative;

    button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }

    select {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }
}
</style>