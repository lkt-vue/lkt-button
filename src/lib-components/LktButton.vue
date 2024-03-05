<script lang="ts">
export default {name: "LktButton", inheritAttrs: false}
</script>

<script setup lang="ts">
import {createLktEvent} from "lkt-events";
import {useSlots, computed, ref, watch} from "vue";
import {ButtonType} from "../enums/enums";
import {Settings} from "../settings/Settings";
import {generateRandomString} from "lkt-string-tools";
import {httpCall} from "lkt-http-client";
import {openModal} from "lkt-modal";
import {openConfirm} from "lkt-modal-confirm";
import {LktObject} from "lkt-ts-interfaces";
import {debug} from "../functions/settings-functions";

const props = withDefaults(defineProps<{
    type?: ButtonType,
    name: string,
    palette: string,
    value: string,
    disabled: boolean,
    loading: boolean,
    wrapContent: boolean,
    resource: string,
    resourceData?: LktObject
    modal: string,
    modalKey: string,
    modalData?: LktObject
    confirmModal: string,
    confirmModalKey: string,
    confirmData?: LktObject
}>(), {
    type: ButtonType.button,
    name: generateRandomString(10),
    palette: Settings.DEFAULT_PALETTE,
    value: '',
    disabled: false,
    loading: false,
    wrapContent: false,
    resource: '',
    resourceData: () => ({}),
    modal: '',
    modalKey: '_',
    modalData: () => ({}),
    confirmModal: '',
    confirmModalKey: '_',
    confirmData: () => ({}),
});

const emit = defineEmits(['click', 'loading', 'loaded']);

const slots = useSlots();

const isLoading = ref(props.loading);

const classes = computed(() => {
        let r = [];
        if (props.palette) r.push(`lkt-button--${props.palette}`, `palette--${props.palette}`);
        if (isLoading.value) r.push('is-loading');
        return r.join(' ');
    }),
    hasNext = computed(() => !!slots.next),
    hasPrev = computed(() => !!slots.prev)
;

const doResourceClick = async ($event: MouseEvent | null) => {
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

const onClick = ($event: MouseEvent | null) => {

    debug('onClick!');

    if (props.modal) {
        if (typeof props.modalData.beforeClose === 'function') {
            let externalConfirmAction = props.modalData.beforeClose.bind({});
            props.modalData.beforeClose = () => {
                if (props.resource) {
                    return doResourceClick($event).then(() => {
                        externalConfirmAction();
                    });
                } else {
                    externalConfirmAction();
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
        } else {
            props.modalData.beforeClose = () => {
                if (props.resource) {
                    return doResourceClick($event);
                } else {
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
        }
        return openModal(props.modal, props.modalKey, props.modalData);
    }

    if (props.confirmModal) {
        debug('Has Confirm Modal: ', props.confirmModal, props.confirmData);
        debug('typeof onConfirm: ', typeof props.confirmData.onConfirm);

        if (typeof props.confirmData.onConfirm === 'function') {
            let externalConfirmAction = props.confirmData.onConfirm;
            debug('Has onConfirm function: ', externalConfirmAction);
            props.confirmData.onConfirm = () => {
                if (props.resource) {
                    return doResourceClick($event).then(() => {
                        externalConfirmAction();
                    });
                } else {
                    externalConfirmAction();
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
            debug('New onConfirm function: ', props.confirmData.onConfirm);
        } else {
            props.confirmData.onConfirm = () => {
                if (props.resource) {
                    return doResourceClick($event);
                } else {
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
            debug('New onConfirm function: ', props.confirmData.onConfirm);
        }
        return openConfirm(props.confirmModal, props.confirmModalKey, props.confirmData);
    }

    if (props.resource) return doResourceClick($event);

    emit('click', $event, createLktEvent(props.name, props.value));
}

watch(() => props.loading, () => isLoading.value = props.loading);

defineExpose({
    click: () => onClick(null)
})
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
        <slot name="default"/>
        <span class="lkt-button-next" v-if="hasNext">
            <slot name="next"></slot>
        </span>
        <lkt-spinner v-if="isLoading"></lkt-spinner>
    </button>
</template>