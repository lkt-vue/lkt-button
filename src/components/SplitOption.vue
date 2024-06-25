<script setup lang="ts">
import {ButtonOption} from "../classes/ButtonOption";
import LktButton from "@/lib-components/LktButton.vue";
import {computed, ref} from "vue";

const props = withDefaults(defineProps<{
    modelValue: ButtonOption,
}>(), {
    modelValue: () => (new ButtonOption('', '')),
});

const btn = ref(props.modelValue);

const emit = defineEmits(['click']);

const computedClasses = computed(() => {

    let r = [];
    if (btn.value.classes !== '') r.push(btn.value.classes);

    if (typeof btn.value.classGenerator === 'function') {
        let generated = btn.value.classGenerator({
            button: btn.value
        });

        if (typeof generated === 'string' && generated !== '') r.push(generated);
    }

    return r.join(' ');
});
</script>

<template>
    <lkt-button
        :class="computedClasses"
        :container-class="btn.containerClasses"
        :text="btn.text"
        @click="() => emit('click', btn)"
    />
</template>

<style scoped>

</style>