<template>
    <button class="lkt-button"
            v-bind:class="classes"
            v-bind:name="name"
            v-bind:type="type"
            v-bind:disabled="disabled"
            v-on:click.prevent.stop="onClick">
        <span class="lkt-button__prev" data-role="prev" v-if="hasPrev">
            <slot name="prev-loading" v-if="loading"></slot>
            <slot name="prev" v-else></slot>
        </span>
        <span class="lkt-button__content" data-role="content" v-if="wrapContent"><slot></slot></span>
        <template v-else>
            <slot></slot>
        </template>
        <span class="lkt-button__next" data-role="next" v-if="hasNext">
            <slot name="next-loading" v-if="loading"></slot>
            <slot name="next" v-else></slot>
        </span>
    </button>
</template>

<script lang="ts">
import {createLktEvent} from "lkt-events";
import {isValidButtonType} from "../functions/validation-functions";
import {defineComponent, PropType} from "vue";
import {ButtonType} from "../enums/enums";
import {Settings} from "../settings/Settings";
import {generateRandomString} from "lkt-string-tools";
import {slotProvided} from "lkt-vue-tools";

export default defineComponent({
    name: "LktButton",
    emits: ['click'],
    props: {
        type: {type: String as PropType<ButtonType>, default: ButtonType.button, validator: isValidButtonType},
        name: {
            type: String, default: (): string => {
                return generateRandomString(10);
            }
        },
        palette: {type: String, default: (): string => Settings.DEFAULT_STATE},
        value: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        loading: {type: Boolean, default: false},
        wrapContent: {type: Boolean, default: false}
    },
    computed: {
        hasPrev() {
            return slotProvided(this, 'prev') || slotProvided(this, 'prev-loading');
        },
        hasNext() {
            return slotProvided(this, 'next') || slotProvided(this, 'next-loading');
        },
        classes() {
            let r = [];

            if (this.palette) {
                r.push(`lkt-button--${this.palette}`);
            }

            if (this.loading) {
                r.push('is-loading');
            }
            return r.join(' ');
        }
    },
    methods: {
        onClick($event: any) {
            this.$emit('click', $event, createLktEvent(this.name, this.value));
        }
    }
})
</script>