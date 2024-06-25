<template>
    <node-view-wrapper class="code-block">
        <el-select contenteditable="false" v-model="selectedLanguage" filterable placeholder="选择代码语言" style="cursor: pointer;width: 200px" size="small">
            <el-option :value="null" label="auto" />
            <el-option v-for="(language, index) in languages" :key="index" :label="language" :value="language" />
        </el-select>
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
        width: 25px;
        height: 25px;
        color: #272727;
        cursor: pointer;
    }

    .el-select {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }
}
</style>