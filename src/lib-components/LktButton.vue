<template>
    <button data-lkt="button"
            v-bind:type="type"
            v-bind:disabled="disabled"
            v-bind:data-state="state"
            v-on:click.stop="onClick">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {generateRandomString} from "lkt-tools";
import {isValidButtonType} from "../functions/validation-functions";
import { getDefaultButtonState } from "../functions/settings-functions";

export default {
    name: "LktButton",
    props: {
        type: {type: String, default: 'button', validator: isValidButtonType},
        name: {type: String, default: (): string => { return generateRandomString(10); }},
        state: {type: String, default: (): string => { return getDefaultButtonState(); }},
        value: {type: String, default: ''},
        disabled: {type: Boolean, default: false}
    },
    methods: {
        onClick($event: any) {
            $event.lkt = {id: this.name, value: this.value};
            this.$emit('click', $event);
        }
    }
}
</script>