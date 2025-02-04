import { ButtonType, SplitType } from '../enums/enums';
import { LktObject } from 'lkt-ts-interfaces';
import { VueElement } from 'vue';

export interface LktButtonConfig {
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
  split?: boolean | SplitType,
  splitIcon?: string,
  isAnchor?: boolean,
  resource?: string,
  resourceData?: LktObject
  modal?: string|Function,
  modalKey?: string,
  modalData?: LktObject
  confirmModal?: string,
  confirmModalKey?: string,
  confirmData?: LktObject,
  text?: string | number,
  icon?: string,
  iconDot?: boolean | string | number,
  iconEnd?: string,
  img?: string,
  newTab?: boolean,
  download?: boolean,
  downloadFileName?: string,
  showSwitch?: false,
  hiddenSwitch?: false,
  tooltip?: boolean | SplitType,
  tooltipEngine?: 'fixed' | 'absolute',
  showTooltipOnHover?: boolean,
  showTooltipOnHoverDelay?: number,
  hideTooltipOnLeave?: boolean,
  tooltipWindowMargin?: number
  tooltipReferrerMargin?: number
  tooltipClass?: string
  tooltipLocationY?: string
  tooltipLocationX?: string
  splitClass?: string
  checked?: boolean
  clickRef?: Element | VueElement
  openTooltip?: boolean
  tabindex?: string|number|undefined
}