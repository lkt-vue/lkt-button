<template>
    <button data-lkt="button"
            v-bind:name="name"
            v-bind:type="type"
            v-bind:disabled="disabled"
            v-bind:data-state="state"
            v-on:click.prevent.stop="onClick">
        <span data-role="prev" v-if="hasPrev"><slot name="prev"></slot></span>
        <span data-role="content" v-if="wrapContent"><slot></slot></span>
        <template v-else><slot></slot></template>
        <span data-role="next" v-if="hasNext"><slot name="next"></slot></span>
    </button>
</template>

<script lang="ts">
import {createLktEvent} from "lkt-events";
import {generateRandomString, slotProvided} from "lkt-tools";
import {isValidButtonType} from "../functions/validation-functions";
import { getDefaultButtonState } from "../functions/settings-functions";

export default {
    name: "LktButton",
    emits: ['click'],
    props: {
        type: {type: String, default: 'button', validator: isValidButtonType},
        name: {type: String, default: (): string => { return generateRandomString(10); }},
        state: {type: String, default: (): string => { return getDefaultButtonState(); }},
        value: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        wrapContent: {type: Boolean, default: false}
    },
    computed: {
        hasPrev() {
            return slotProvided(this, 'prev');
        },
        hasNext() {
            return slotProvided(this, 'next');
        },
    },
    methods: {
        onClick($event: any) {
            this.$emit('click', $event, createLktEvent(this.name, this.value));
        }
    }
}
</script>