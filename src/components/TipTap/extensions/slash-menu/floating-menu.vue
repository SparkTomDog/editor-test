<template>
    <div class="spark-floating-menu">
        <template v-if="items.length">
            <span
                v-for="(item, index) in items"
                :key="index"
                @click="selectItem(index)"
                class="spark-floating-menu-item"
                :class="{ 'is-active': item.active, 'is-selected': index === selectedIndex }"
            >
                <span class="spark-floating-menu-item-icon">
                    <font-awesome-icon :icon="item.icon" />
                </span>
                <span class="spark-floating-menu-item-label">
                    {{ item.title }}
                </span>
            </span>
            <span class="spark-floating-menu-tip">
                <span class="spark-floating-menu-tip-item">↑ArrowUp</span>
                <span class="spark-floating-menu-tip-item">↓ArrowDown</span>
            </span>
        </template>
        <div class="spark-floating-menu" v-else>
            No result
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    items: {
        type: Array<any>,
        required: true,
    },

    command: {
        type: Function,
        required: true,
    },
})

const selectedIndex = ref<number>(0)

function onKeyDown ({ event }: any) {
    if (event.key === 'ArrowUp') {
        upHandler()
        return true
    }

    if (event.key === 'ArrowDown') {
        downHandler()
        return true
    }

    if (event.key === 'Enter') {
        enterHandler()
        return true
    }

    return false
}

const upHandler = () => {
    selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length
}
const downHandler = () => {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length
}
const enterHandler = () => {
    selectItem(selectedIndex.value)
}

const selectItem = (index: number) => {
    const item = props.items[index]
    console.log(props.items[index])

    if (item) {
        props.command(item)
    }
}

watch(props.items, () => {
    selectedIndex.value = 0
})

defineExpose({
    onKeyDown
})
</script>