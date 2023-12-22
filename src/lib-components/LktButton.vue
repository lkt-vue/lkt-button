<script lang="ts">
export default {name: "LktButton", inheritAttrs: false}
</script>

<script setup lang="ts">
import {createLktEvent} from "lkt-events";
import {isValidButtonType} from "../functions/validation-functions";
import {PropType, useSlots, computed, ref, watch} from "vue";
import {ButtonType} from "../enums/enums";
import {Settings} from "../settings/Settings";
import {generateRandomString} from "lkt-string-tools";
import {httpCall} from "lkt-http-client";
import {openConfirm} from "lkt-modal-confirm";

const props = defineProps({
    type: {type: String as PropType<ButtonType>, default: ButtonType.button, validator: isValidButtonType},
    name: {type: String, default: (): string => generateRandomString(10)},
    palette: {type: String, default: (): string => Settings.DEFAULT_STATE},
    value: {type: String, default: ''},
    disabled: {type: Boolean, default: false},
    loading: {type: Boolean, default: false},
    wrapContent: {type: Boolean, default: false},
    resource: {type: String, default: ''},
    resourceData: {type: Object, required: false, default: () => ({})},
    confirmModal: {type: String, default: ''},
    confirmModalKey: {type: String, default: '_'},
    confirmData: {type: Object, required: false, default: () => ({})},
});

const emit = defineEmits(['click', 'loading', 'loaded']);

const slots = useSlots();

const isLoading = ref(props.loading);

const classes = computed(() => {
        let r = [];
        if (props.palette) r.push(`lkt-button--${props.palette}`);
        if (isLoading.value) r.push('is-loading');
        return r.join(' ');
    }),
    hasNext = computed(() => !!slots.next),
    hasPrev = computed(() => !!slots.prev)
;

const doResourceClick = async ($event: any) => {
    isLoading.value = true;
    emit('loading');
    return httpCall(props.resource, props.resourceData).then((r: any) => {
        isLoading.value = false;
        emit('loaded');
        emit('click', $event, r);
    }).catch((r: any) => {
        isLoading.value = false;
        emit('loaded');
        emit('click', $event, r);
    });
}

const onClick = ($event: any) => {

    if (props.confirmModal) {
        let data = typeof props.confirmData === 'object' ? JSON.parse(JSON.stringify(props.confirmData)) : {};

        if (typeof data.onConfirm === 'function') {
            let externalConfirmAction = data.onConfirm.bind({});
            data.onConfirm = () => {
                if (props.resource) {
                    return doResourceClick($event).then(() => {
                        externalConfirmAction();
                    });
                } else {
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
        } else {
            data.onConfirm = () => {
                if (props.resource) {
                    return doResourceClick($event);
                } else {
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
        }
        return openConfirm(props.confirmModal, props.confirmModalKey, data);
    }

    if (props.resource) return doResourceClick($event);

    emit('click', $event, createLktEvent(props.name, props.value));
}

watch(() => props.loading, () => isLoading.value = props.loading);
</script>

<template>
    <button class="lkt-button"
            v-bind:class="classes"
            v-bind:name="name"
            v-bind:type="type"
            v-bind:disabled="disabled"
            v-on:click.prevent.stop="onClick">
        <span class="lkt-button-prev" v-if="hasPrev">
            <slot name="prev"></slot>
        </span>
        <span class="lkt-button-content" v-if="wrapContent"><slot></slot></span>
        <template v-else>
            <slot></slot>
        </template>
        <span class="lkt-button-next" v-if="hasNext">
            <slot name="next"></slot>
        </span>
        <lkt-spinner v-if="isLoading"></lkt-spinner>
    </button>
</template>