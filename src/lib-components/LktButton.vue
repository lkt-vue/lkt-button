<script setup lang="ts">
import {createLktEvent} from "lkt-events";
import {ComponentPublicInstance, computed, ref, useSlots, watch} from "vue";
import {ButtonType} from "../enums/enums";
import {Settings} from "../settings/Settings";
import {generateRandomString} from "lkt-string-tools";
import {httpCall} from "lkt-http-client";
import {openModal} from "lkt-modal";
import {openConfirm} from "lkt-modal-confirm";
import {LktObject} from "lkt-ts-interfaces";
import {debug} from "../functions/settings-functions";
import {useRoute, useRouter} from "vue-router";
import {__} from "lkt-i18n";

const props = withDefaults(defineProps<{
    type?: ButtonType,
    name?: string,
    onClickTo?: string,
    onClickToExternal?: boolean,
    class?: string,
    containerClass?: string,
    palette?: string,
    value?: string,
    disabled?: boolean,
    loading?: boolean,
    wrapContent?: boolean,
    split?: boolean,
    closeSplitOnRouteChanged?: boolean,
    isAnchor?: boolean,
    resource?: string,
    resourceData?: LktObject
    modal?: string,
    modalKey?: string,
    modalData?: LktObject
    confirmModal?: string,
    confirmModalKey?: string,
    confirmData?: LktObject,
    text?: string,
    icon?: string,
    img?: string,
    newTab?: boolean,
    download?: boolean,
    downloadFileName?: string,
    tooltip?: boolean,
    tooltipWindowMargin?: number
    tooltipReferrerMargin?: number
}>(), {
    type: ButtonType.button,
    name: generateRandomString(10),
    palette: Settings.DEFAULT_PALETTE,
    onClickTo: '',
    onClickToExternal: false,
    class: '',
    containerClass: '',
    value: '',
    disabled: false,
    loading: false,
    wrapContent: false,
    split: false,
    closeSplitOnRouteChanged: false,
    isAnchor: false,
    resource: '',
    resourceData: () => ({}),
    modal: '',
    modalKey: '_',
    modalData: () => ({}),
    confirmModal: '',
    confirmModalKey: '_',
    confirmData: () => ({}),
    text: '',
    icon: '',
    img: '',
    newTab: false,
    download: false,
    downloadFileName: '',
    tooltip: false,
    tooltipWindowMargin: 0,
    tooltipReferrerMargin: 0,
});

const emit = defineEmits(['click', 'loading', 'loaded']);

const slots = useSlots(),
    router = useRouter(),
    route = useRoute();

const routeIsActive = ref(false);

const checkIfActiveRoute = () => {
    if (!props.onClickTo) return;
    let currentRoute = router.currentRoute;
    routeIsActive.value = currentRoute.value.path === props.onClickTo;
}

watch(route, (to) => {
    checkIfActiveRoute();
    if (props.split && props.closeSplitOnRouteChanged) {
        showDropdown.value = false;
    }
}, {flush: 'pre', immediate: true, deep: true});

const Identifier = 'lkt-button-' + generateRandomString();

const isLoading = ref(props.loading),
    container = ref(<Element | ComponentPublicInstance | null>null),
    button = ref(<Element | ComponentPublicInstance | null>null),
    showDropdown = ref(false),
    showTooltip = ref(false)
;

const classes = computed(() => {
        let r = [];
        if (props.class) r.push(props.class);
        if (props.split) r.push('lkt-split-button');
        if (props.palette) r.push(`lkt-button--${props.palette}`, `palette--${props.palette}`);
        if (isLoading.value) r.push('is-loading');
        if (routeIsActive.value) r.push('is-active-route');
        if (showTooltip.value) r.push('show-tooltip');
        if (showDropdown.value) r.push('show-split');
        return r.join(' ');
    }),
    computedContainerClass = computed(() => {
        let r = [];
        if (props.containerClass) r.push(props.containerClass);
        return r.join(' ');
    }),
    computedText = computed(() => {
        if (props.text.startsWith('__:')) {
            return __(props.text.substring(3));
        }
        return props.text;
    }),
    hasCustomSplitIconSlot = computed(() => {
        return typeof Settings.defaultSplitIcon !== 'undefined';
    }),
    customSplitIconSlot = computed(() => {
        return Settings.defaultSplitIcon;
    });

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
    }
;

const onClick = ($event: MouseEvent | null) => {

    debug('Click');
    if ($event) {
        if (props.tooltip) {
            showTooltip.value = !showTooltip.value;
        } else {
            showDropdown.value = !showDropdown.value;
        }
    }

    if (props.split || props.tooltip) {
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

checkIfActiveRoute();

defineExpose({
    click: () => onClick(null)
})
</script>

<template>
    <div class="lkt-button-container"
         ref="container"
         :id="Identifier"
         :class="computedContainerClass"
    >
        <lkt-anchor
            v-if="isAnchor"
            class="lkt-button"
            :href="onClickToExternal ? onClickTo : ''"
            :to="onClickToExternal ? '' : onClickTo"
            :download="download"
            :target="newTab ? '_blank' : ''"
            :download-file-name="downloadFileName"
            imposter
        >
            <i v-if="icon" :class="icon"/>
            <img v-if="img" :src="img" :alt="computedText"/>

            <template v-if="computedText">
                {{computedText}}
            </template>

            <template v-if="slots.default">
                <slot/>
            </template>
            <lkt-spinner v-if="isLoading"/>
        </lkt-anchor>

        <button
            v-else
            class="lkt-button"
            ref="button"
            :class="classes"
            :name="name"
            :type="type"
            :disabled="disabled"
            v-on:click="onClick">
                <i v-if="icon" :class="icon"/>
                <img v-if="img" :src="img" :alt="computedText"/>

                <template v-if="computedText">
                    {{computedText}}
                </template>

                <template v-if="slots.default">
                    <slot/>
                </template>

                <lkt-spinner v-if="isLoading"/>

                <div v-if="split" class="lkt-split-button-arrow">
                    <template v-if="hasCustomSplitIconSlot">
                        <component :is="customSplitIconSlot"/>
                    </template>
                </div>
        </button>

        <lkt-tooltip
            v-if="split && container"
            v-model="showDropdown"
            :referrer="container"
            :window-margin="tooltipWindowMargin"
            :referrer-margin="tooltipReferrerMargin"
            class="lkt-split-button-dropdown-content"
        >
            <template #default="{doClose}">
                <slot name="split"
                      :do-close="doClose"/>
            </template>
        </lkt-tooltip>

        <lkt-tooltip
            v-if="tooltip && container"
            v-model="showTooltip"
            :referrer="container"
            :window-margin="tooltipWindowMargin"
            :referrer-margin="tooltipReferrerMargin"
        >
            <template #default="{doClose}">
                <slot
                    name="tooltip"
                    :do-close="doClose"/>
            </template>
        </lkt-tooltip>
    </div>
</template>