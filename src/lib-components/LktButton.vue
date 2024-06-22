<script setup lang="ts">
import {createLktEvent} from "lkt-events";
import {ComponentPublicInstance, computed, onBeforeUnmount, ref, useSlots, watch} from "vue";
import {ButtonType} from "../enums/enums";
import {Settings} from "../settings/Settings";
import {generateRandomString} from "lkt-string-tools";
import {httpCall} from "lkt-http-client";
import {openModal} from "lkt-modal";
import {openConfirm} from "lkt-modal-confirm";
import {LktObject} from "lkt-ts-interfaces";
import {debug} from "../functions/settings-functions";
import {useRouter} from "vue-router";

const props = withDefaults(defineProps<{
    type?: ButtonType,
    name?: string,
    onClickTo?: string,
    onClickToExternal?: boolean,
    class?: string,
    palette?: string,
    value?: string,
    disabled?: boolean,
    loading?: boolean,
    wrapContent?: boolean,
    split?: boolean,
    isAnchor?: boolean,
    resource?: string,
    resourceData?: LktObject
    modal?: string,
    modalKey?: string,
    modalData?: LktObject
    confirmModal?: string,
    confirmModalKey?: string,
    confirmData?: LktObject
}>(), {
    type: ButtonType.button,
    name: generateRandomString(10),
    palette: Settings.DEFAULT_PALETTE,
    onClickTo: '',
    onClickToExternal: false,
    class: '',
    value: '',
    disabled: false,
    loading: false,
    wrapContent: false,
    split: false,
    isAnchor: false,
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

const router = useRouter();

const Identifier = 'lkt-button-' + generateRandomString();

const isLoading = ref(props.loading),
    container = ref(<Element | ComponentPublicInstance | null>null),
    button = ref(<Element | ComponentPublicInstance | null>null),
    dropdown = ref(<Element | ComponentPublicInstance | null>null),
    showDropdown = ref(false)
;

const classes = computed(() => {
        let r = [];
        if (props.class) r.push(props.class);
        if (props.palette) r.push(`lkt-button--${props.palette}`, `palette--${props.palette}`);
        if (isLoading.value) r.push('is-loading');
        if (props.split) r.push('lkt-split-button');
        return r.join(' ');
    }),
    hasNext = computed(() => !!slots.next),
    hasPrev = computed(() => !!slots.prev)
;

const doResourceClick = async ($event: MouseEvent | null) => {
        debug('Resource Click', props.resource, props.resourceData);
        isLoading.value = true;
        emit('loading');
        return httpCall(props.resource, props.resourceData).then((r: any) => {
            isLoading.value = false;
            emit('loaded');
            debug('Resource Click -> Received response', r);
            emit('click', $event, r);
        }).catch((r: any) => {
            isLoading.value = false;
            emit('loaded');
            debug('Resource Click -> Received response error', r);
            emit('click', $event, r);
        });
    },
    onClickOutside = (e: MouseEvent) => {

        if (!e.target) {
            showDropdown.value = false;
            return;
        }
        //
        // if (e.target === button.value || e.target === container.value) {
        //     // showDropdown.value = false;
        //     return;
        // }
        //
        // if (
        //     // e.target !== container.value
        //     // && e.target !== button.value
        //     // &&
        //     e.target !== dropdown.value
        // ){
        //     showDropdown.value = false;
        //     return;
        // }

        //@ts-ignore
        if (!container.value.contains(e.target) || container.value.id !== e.target.id) {
            showDropdown.value = false;
            return;
        }
    },
    toggleDropdown = ($event: MouseEvent) => {
        // onClickOutside($event);
        showDropdown.value = !showDropdown.value;
    }
;

window.addEventListener('click', onClickOutside);

onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
})

const onClick = ($event: MouseEvent | null) => {

    debug('Click');
    if ($event) {
        toggleDropdown($event);
    }

    // window.dispatchEvent(new Event('click'));

    if (props.split) {
        return;
    }

    if (props.modal) {
        debug('Click -> has modal', props.confirmModal, props.modalData);
        debug('Click -> typeof beforeClose: ', typeof props.modalData.beforeClose);
        if (typeof props.modalData.beforeClose === 'function') {
            let externalConfirmAction = props.modalData.beforeClose.bind({});
            debug('Click -> Has beforeClose function: ', externalConfirmAction);
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
            debug('Click -> New beforeClose function: ', props.modalData.beforeClose);
        } else {
            props.modalData.beforeClose = () => {
                if (props.resource) {
                    return doResourceClick($event);
                } else {
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
            debug('Click -> New beforeClose function: ', props.modalData.beforeClose);
        }
        return openModal(props.modal, props.modalKey, props.modalData);
    }

    if (props.confirmModal) {
        debug('Click -> has confirm modal', props.confirmModal, props.confirmData);
        debug('Click -> typeof onConfirm: ', typeof props.confirmData.onConfirm);

        if (typeof props.confirmData.onConfirm === 'function') {
            let externalConfirmAction = props.confirmData.onConfirm;
            debug('Click -> Has onConfirm function: ', externalConfirmAction);
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
            debug('Click -> New onConfirm function: ', props.confirmData.onConfirm);
        } else {
            props.confirmData.onConfirm = () => {
                if (props.resource) {
                    return doResourceClick($event);
                } else {
                    if (props.onClickTo !== '') {
                        if ($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                        }
                        if (props.onClickToExternal) {

                        } else {
                            router.push(props.onClickTo);
                        }
                        return;
                    }
                    emit('click', $event, createLktEvent(props.name, props.value));
                }
            }
            debug('Click -> New onConfirm function: ', props.confirmData.onConfirm);
        }
        return openConfirm(props.confirmModal, props.confirmModalKey, props.confirmData);
    }

    if (props.resource) {
        debug('Click -> has resource');
        return doResourceClick($event);
    }

    debug('Click -> Emit');
    if (props.onClickTo !== '') {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        if (props.onClickToExternal) {
            window.location.href = props.onClickTo;
        } else {
            router.push(props.onClickTo);
        }
        return;
    }
    emit('click', $event, createLktEvent(props.name, props.value));
}

watch(() => props.loading, () => isLoading.value = props.loading);

defineExpose({
    click: () => onClick(null)
})

const splitSlots = computed((): LktObject => {
    let r = [];
    for (let k in slots) if (k.indexOf('split-') !== -1) r.push(k);
    return r;
});
</script>

<template>
    <div class="lkt-button-container"
         ref="container"
         :id="Identifier"
    >
        <lkt-anchor
            v-if="isAnchor"
            class="lkt-button"
            :href="onClickToExternal ? onClickTo : ''"
            :to="onClickToExternal ? '' : onClickTo"
            imposter
        >
            <span class="lkt-button-prev" v-if="hasPrev">
                <slot name="prev"/>
            </span>
            <slot name="default"/>
            <span class="lkt-button-next" v-if="hasNext">
                <slot name="next"/>
            </span>
            <lkt-spinner v-if="isLoading"/>
        </lkt-anchor>
        <button
            v-else
            class="lkt-button"
            ref="button"
            v-bind:class="classes"
            v-bind:name="name"
            v-bind:type="type"
            v-bind:disabled="disabled"
            v-on:click.prevent.stop="onClick">
            <span class="lkt-button-prev" v-if="hasPrev">
                <slot name="prev"/>
            </span>
            <slot name="default"/>
            <span class="lkt-button-next" v-if="hasNext">
                <slot name="next"/>
            </span>
            <lkt-spinner v-if="isLoading"/>
            <div v-if="split" class="lkt-split-button-arrow"/>
        </button>
        <div v-if="split && showDropdown" ref="dropdown" class="lkt-split-button-dropdown-content">
            <template v-for="slot in splitSlots">
                <slot :name="slot"/>
            </template>
        </div>
    </div>
</template>