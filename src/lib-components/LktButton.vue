<script setup lang="ts">
    import { createLktEvent } from 'lkt-events';
    import { ComponentPublicInstance, computed, nextTick, ref, useSlots, watch } from 'vue';
    import { Settings } from '../settings/Settings';
    import { generateRandomString } from 'lkt-string-tools';
    import { httpCall } from 'lkt-http-client';
    import { openModal } from 'lkt-modal';
    import { openConfirm } from 'lkt-modal-confirm';
    import { LktObject } from 'lkt-ts-interfaces';
    import { debug } from '../functions/settings-functions';
    import { useRouter } from 'vue-router';
    import { __ } from 'lkt-i18n';
    import { Anchor, Button, ButtonConfig, ButtonType, extractPropValue, getDefaultValues } from 'lkt-vue-kernel';

    const props = withDefaults(defineProps<ButtonConfig>(), getDefaultValues(Button));

    const emit = defineEmits(['click', 'focus', 'blur', 'loading', 'loaded', 'update:checked', 'update:openTooltip']);

    const slots = useSlots(),
        router = useRouter();

    // Calculated data
    let calculatedModal = extractPropValue(props.modal, props.prop);
    let calculatedModalKey = extractPropValue(props.modalKey, props.prop);
    let calculatedIcon = extractPropValue(props.icon, props.prop);

    const Identifier = 'lkt-button-' + generateRandomString();

    const isLoading = ref(props.loading),
        container = ref(<Element | ComponentPublicInstance | null>null),
        button = ref(<Element | ComponentPublicInstance | null>null),
        showDropdown = ref(false),
        showTooltip = ref(props.openTooltip),
        routeIsActive = ref(false),
        isHovered = ref(false),
        showTooltipOnHoverTimeout = ref(undefined),
        isChecked = ref(props.checked)
    ;

    const nextFocusEventless = ref(false);

    watch(() => props.openTooltip, v => showTooltip.value = v);
    watch(showTooltip, v => emit('update:openTooltip', v));

    const classes = computed(() => {
            let r = [];
            if (props.class) r.push(props.class);
            if (props.split) r.push('lkt-split-button');
            if (props.palette) r.push(`lkt-button--${props.palette}`, `palette--${props.palette}`);
            if (isLoading.value) r.push('is-loading');
            if (routeIsActive.value) r.push('is-active-route');
            if (showTooltip.value) r.push('show-tooltip');
            if (showDropdown.value) r.push('show-split');
            if (isChecked.value) r.push('is-checked');
            return r.join(' ');
        }),
        computedContainerClass = computed(() => {
            let r = [];
            if (props.containerClass) r.push(props.containerClass);
            return r.join(' ');
        }),
        computedText = computed(() => {
            let txt = String(props.text);
            if (txt.startsWith('__:')) {
                return __(txt.substring(3));
            }
            return txt;
        }),
        hasCustomSplitIconSlot = computed(() => {
            return typeof Settings.defaultSplitIcon !== 'undefined';
        }),
        customSplitIconSlot = computed(() => {
            return Settings.defaultSplitIcon;
        }),
        computedIconDotText = computed(() => {
            if (typeof props.iconDot === 'boolean') return '';
            return props.iconDot;
        });

    const doResourceClick = async ($event: MouseEvent | null) => {
            debug('Resource Click', props.resource, props.resourceData);
            isLoading.value = true;
            emit('loading');
            let data = { ...props.resourceData, isChecked: isChecked.value };
            return httpCall(props.resource, data).then((r: any) => {
                isLoading.value = false;
                emit('loaded');
                debug('Resource Click -> Received response', r);
                doConfigClick();
                emit('click', $event, r);
            }).catch((r: any) => {
                isLoading.value = false;
                emit('loaded');
                debug('Resource Click -> Received response error', r);
                doConfigClick();
                emit('click', $event, r);
            });
        }
    ;

    const tooltipOpened = ref(false);
    const computedRenderTooltip = computed(() => {
        if (!container.value) return false;
        if (props.type === ButtonType.TooltipLazy) return tooltipOpened.value;
        if (props.type === ButtonType.TooltipEver) return showTooltip.value;
        return props.tooltip === true;
    });

    const splitOpened = ref(false);
    const computedRenderSplit = computed(() => {
        if (!container.value) return false;
        if (props.type === ButtonType.SplitLazy) return splitOpened.value;
        if (props.type === ButtonType.SplitEver) return showDropdown.value;
        return props.split === true;
    });

    const onFocus = ($event) => {
        if (nextFocusEventless.value) {
            nextFocusEventless.value = false;
            emit('focus');
            return;
        }
        emit('focus', $event);
    };
    const onBlur = ($event) => emit('blur', $event);

    const canRenderSwitch = computed(() => {
        return props.type === ButtonType.Switch || props.type === ButtonType.HiddenSwitch;
    })

    const canDisplaySwitch = computed(() => {
        return props.type === ButtonType.Switch;
    })

    const doConfigClick = () => {
        debug('doConfigClick: ', props)
        if (typeof props.onClick === 'function') props.onClick();
    }

    const computedIsSplit = computed(() => {
        return [
            ButtonType.Split,
            ButtonType.SplitLazy,
            ButtonType.SplitEver,
        ].includes(props.type)
    })

    const computedIsTooltip = computed(() => {
        return [
            ButtonType.Tooltip,
            ButtonType.TooltipLazy,
            ButtonType.TooltipEver,
        ].includes(props.type)
    })

    const doClick = ($event: MouseEvent | null) => {

        debug('Click', props);
        if ($event) {
            if (canRenderSwitch.value) {
                //@ts-ignore
                let fieldContainer = $event.target?.closest('.lkt-field.is-switch');
                if (!fieldContainer) {
                    isChecked.value = !isChecked.value;
                }
            } else if (props.tooltip) {
                showTooltip.value = !showTooltip.value;
                if (showTooltip.value) tooltipOpened.value = true;

            } else if (props.split) {
                showDropdown.value = !showDropdown.value;
            }
        }

        if (typeof props.clickRef !== 'undefined') {
            if (props.clickRef instanceof Element) {
                // @ts-ignore
                props.clickRef.click();
            } else if (props.clickRef && props.clickRef && typeof props.clickRef === 'function') {
                // @ts-ignore
                props.clickRef.click();
            }
        }

        if (computedIsSplit.value || computedIsTooltip.value) {
            doConfigClick();
            emit('click', $event, createLktEvent(props.name, props.value));
            return;
        }

        if (calculatedModal) {
            let modalData = {...props.modalData};
            debug('Click -> has modal', props.modal, modalData);
            debug('Click -> typeof beforeClose: ', typeof modalData.beforeClose);
            if (typeof modalData.beforeClose === 'function') {
                modalData.beforeClose = (modalData: LktObject) => {
                    if (props.resource) {
                        return doResourceClick($event).then(() => {
                            props.modalData.beforeClose(modalData);
                        });
                    } else {
                        props.modalData.beforeClose(modalData);
                        doConfigClick();
                        emit('click', $event, createLktEvent(props.name, props.value));
                    }
                };
                debug('Click -> New beforeClose function: ', modalData.beforeClose);
            } else {
                modalData.beforeClose = () => {
                    if (props.resource) {
                        return doResourceClick($event);
                    } else {
                        doConfigClick();
                        emit('click', $event, createLktEvent(props.name, props.value));
                    }
                };
                debug('Click -> New beforeClose function: ', modalData.beforeClose);
            }

            let modal = calculatedModal;
            if (typeof calculatedModal === 'function') modal = calculatedModal();

            return openModal(modal, calculatedModalKey, modalData);
        }

        if (props.confirmModal) {
            debug('Click -> has confirm modal', props.confirmModal, props.confirmData);
            debug('Click -> typeof onConfirm: ', typeof props.confirmData.onConfirm);

            if (typeof props.confirmData.onClick === 'function') {
                let externalConfirmAction = props.confirmData.onClick;
                debug('Click -> Has onConfirm function: ', externalConfirmAction);
                props.confirmData.onClick = () => {
                    if (props.resource) {
                        return doResourceClick($event).then(() => {
                            externalConfirmAction();
                        });
                    } else {
                        externalConfirmAction();
                        doConfigClick();
                        emit('click', $event, createLktEvent(props.name, props.value));
                    }
                };
                debug('Click -> New onConfirm function: ', props.confirmData.onClick);
            } else {
                props.confirmData.onClick = () => {
                    if (props.resource) {
                        return doResourceClick($event);
                    } else {
                        if (props.anchor?.to !== '') {
                            if ($event) {
                                $event.preventDefault();
                                $event.stopPropagation();
                            }
                            if (props.anchor.external) {

                            } else if (typeof props.anchor.to !== 'undefined') {
                                router.push(props.anchor.to);
                            }
                            return;
                        }
                        doConfigClick();
                        emit('click', $event, createLktEvent(props.name, props.value));
                    }
                };
                debug('Click -> New onConfirm function: ', props.confirmData.onConfirm);
            }
            return openConfirm(props.confirmModal, props.confirmModalKey, props.confirmData);
        }

        if (props.resource) {
            debug('Click -> has resource');
            return doResourceClick($event);
        }

        debug('Click -> Emit');
        if (props.anchor?.to !== '') {
            if (props.anchor.external) {
                if (typeof props.anchor.to === 'string') {
                    window.location.href = props.anchor.to;
                }

            } else if (typeof props.anchor.to !== 'undefined') {
                router.push(props.anchor.to);
            }
            return;
        }
        if (canRenderSwitch.value){
            nextTick(() => {
                doConfigClick();
                emit('click', $event, createLktEvent(props.name, props.value));
            })
            return;
        }

        // doConfigClick();
        emit('click', $event, createLktEvent(props.name, props.value));
    };

    watch(() => props.loading, () => isLoading.value = props.loading);
    watch(() => props.checked, () => isChecked.value = props.checked);
    watch(isChecked, v => emit('update:checked', v));
    watch(isHovered, v => {

        if (isHovered.value && props.showTooltipOnHover) {
            if (showTooltipOnHoverTimeout.value !== undefined) {
                clearTimeout(showTooltipOnHoverTimeout.value);
            }

            //@ts-ignore
            showTooltipOnHoverTimeout.value = setTimeout(() => {
                showTooltip.value = true;
                clearTimeout(showTooltipOnHoverTimeout.value);
            }, props.showTooltipOnHoverDelay);

        } else if (!isHovered.value && props.hideTooltipOnLeave) {
            showTooltip.value = false;
            clearTimeout(showTooltipOnHoverTimeout.value);

        } else if (!isHovered.value) {
            clearTimeout(showTooltipOnHoverTimeout.value);
        }
    });

    defineExpose({
        click: () => doClick(null),
        focus: (eventless: boolean) => {
            if (button.value) {

                if (eventless) {
                    nextFocusEventless.value = true;
                }

                //@ts-ignore
                button.value.focus();
            }
        }
    });

    const computedButtonComponent = computed(() => {
        if (props.type === ButtonType.Content) return 'div';
        return 'button';
    })

    const doRootClick = ($event: MouseEvent) => {
        return doClick($event);
    }

    const onRouteActive= (v) => routeIsActive.value = v;

    const computedIsAnchor = computed(() => {
        return props.type === ButtonType.Anchor
            && typeof props.anchor === 'object'
            && Object.keys(props.anchor).length > 0;
    });

    const computedAnchor = computed(() => {
        if (computedIsAnchor.value) return new Anchor({ ...props.anchor, ...{"class": classes.value} });
        return {};
    })
</script>

<template>
    <div class="lkt-button-container"
         ref="container"
         :id="Identifier"
         :class="computedContainerClass"
         @mousemove="isHovered = true"
         @mouseleave="isHovered = false"
    >
        <lkt-anchor
            v-if="computedIsAnchor"
            v-bind="computedAnchor"
            class="lkt-button"
            @active="onRouteActive"
        >
            <i v-if="calculatedIcon" :class="calculatedIcon" />
            <i v-if="calculatedIcon && iconDot" class="lkt-button--icon-dot">{{ computedIconDotText }}</i>
            <img v-if="img" :src="img" :alt="computedText" />

            <template v-if="computedText">
                {{ computedText }}
            </template>

            <template v-if="slots.default">
                <slot />
            </template>
            <lkt-spinner v-if="isLoading" />
        </lkt-anchor>

        <component
            v-else
            :is="computedButtonComponent"
            class="lkt-button"
            ref="button"
            :class="classes"
            :name="name"
            :type="type"
            :disabled="disabled"
            :tabindex="tabindex"
            @click="doClick"
            @focus="onFocus"
            @blur="onBlur"
        >
            <i v-if="icon" :class="icon" />
            <i v-if="icon && iconDot" class="lkt-button--icon-dot">{{ computedIconDotText }}</i>
            <img v-if="img" :src="img" :alt="computedText" />

            <template v-if="computedText">
                {{ computedText }}
            </template>

            <template v-if="slots.default">
                <slot />
            </template>

            <lkt-spinner v-if="isLoading" />

            <lkt-field
                v-if="canRenderSwitch"
                type="switch"
                v-show="canDisplaySwitch"
                v-model="isChecked" />

            <i v-if="iconEnd" :class="iconEnd" class="lkt-button-icon-end" />

            <div v-if="split" class="lkt-split-button-arrow">
                <template v-if="splitIcon">
                    <i :class="splitIcon" />
                </template>
                <template v-else-if="hasCustomSplitIconSlot">
                    <component :is="customSplitIconSlot" />
                </template>
            </div>
        </component>

        <lkt-tooltip
            v-if="split && container"
            v-model="showDropdown"
            :referrer="container"
            :window-margin="tooltipWindowMargin"
            :referrer-margin="tooltipReferrerMargin"
            class="lkt-split-button-dropdown-content"
            :class="splitClass"
            :engine="tooltipEngine"
        >
            <template #default="{doClose, doRootClick}" v-if="computedRenderSplit">
                <slot name="split"
                      :do-close="doClose"
                      :do-root-click="doRootClick" />
            </template>
        </lkt-tooltip>

        <lkt-tooltip
            v-if="tooltip && container"
            v-model="showTooltip"
            :referrer="container"
            :window-margin="tooltipWindowMargin"
            :referrer-margin="tooltipReferrerMargin"
            :class="tooltipClass"
            :location-x="tooltipLocationX"
            :location-y="tooltipLocationY"
            :engine="tooltipEngine"
        >
            <template #default="{doClose, doRootClick}" v-if="computedRenderTooltip">
                <slot
                    name="tooltip"
                    :do-close="doClose"
                    :do-root-click="doRootClick" />
            </template>
        </lkt-tooltip>
    </div>
</template>