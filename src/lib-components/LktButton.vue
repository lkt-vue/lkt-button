<template>
    <button data-lkt="button"
            v-bind:type="type"
            v-bind:disabled="disabled"
            v-bind:data-state="state"
            v-on:click="onClick">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {isValidButtonType} from "../functions/validation-functions";

export default {
    name: "LktButton",
    props: {
        type: {type: String, default: 'button', validator: isValidButtonType},
        name: {type: String, default: ''},
        value: {type: String, default: ''},
        state: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    methods: {
        onClick(e: any) {
            this.$emit('click', {id: this.name, value: this.value, event: e});
        }
    }
}
</script>