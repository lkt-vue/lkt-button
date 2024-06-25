<script setup lang="ts">
import {ButtonOption} from "../classes/ButtonOption";
import LktButton from "@/lib-components/LktButton.vue";
import {ref} from "vue";

const props = withDefaults(defineProps<{
    modelValue: ButtonOption,
}>(), {
    modelValue: () => ({}),
});

const btn = ref(props.modelValue);

const emit = defineEmits(['click']);
</script>

<template>
    <lkt-button
        :text="btn.text"
        @click="() => emit('click', btn)"
    />
</template>

<style scoped>

</style>