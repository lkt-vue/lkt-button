import { defineComponent as ne, useSlots as ie, ref as d, watch as C, computed as h, resolveComponent as S, openBlock as t, createElementBlock as s, normalizeClass as k, createBlock as y, withCtx as A, createCommentVNode as a, toDisplayString as L, Fragment as K, createTextVNode as W, unref as j, renderSlot as M, withDirectives as re, vShow as ue, resolveDynamicComponent as se, createSlots as fe } from "vue";
import { createLktEvent as D } from "lkt-events";
import { generateRandomString as z } from "lkt-string-tools";
import { httpCall as ce } from "lkt-http-client";
import { openModal as de } from "lkt-modal";
import { openConfirm as pe } from "lkt-modal-confirm";
import { useRouter as me, useRoute as ke } from "vue-router";
import { __ as ve } from "lkt-i18n";
import Ce from "lkt-tooltip";
var X = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l))(X || {});
const R = class R {
};
R.DEFAULT_PALETTE = "", R.debugEnabled = !1, R.defaultSplitIcon = void 0;
let p = R;
const Ne = (l) => {
  p.DEFAULT_PALETTE = l;
}, He = (l = !0) => {
  p.debugEnabled = l;
}, i = (...l) => {
  p.debugEnabled && console.info("[LktButton] ", ...l);
}, he = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ye = ["src", "alt"], we = ["name", "type", "disabled"], be = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Te = ["src", "alt"], ge = {
  key: 8,
  class: "lkt-split-button-arrow"
}, De = /* @__PURE__ */ ne({
  __name: "LktButton",
  props: {
    type: { default: X.button },
    name: { default: z(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: p.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
    splitIcon: { default: "" },
    isAnchor: { type: Boolean, default: !1 },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    modal: { default: "" },
    modalKey: { default: "_" },
    modalData: { default: () => ({}) },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) },
    text: { default: "" },
    icon: { default: "" },
    iconDot: { type: [Boolean, String, Number], default: !1 },
    iconEnd: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    showSwitch: { type: Boolean, default: !1 },
    hiddenSwitch: { type: Boolean },
    tooltip: { type: [Boolean, String], default: !1 },
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: { default: 0 },
    hideTooltipOnLeave: { type: Boolean },
    tooltipWindowMargin: { default: 0 },
    tooltipReferrerMargin: { default: 0 },
    tooltipClass: {},
    tooltipLocationY: { default: "bottom" },
    tooltipLocationX: { default: "left-corner" },
    splitClass: {},
    checked: { type: Boolean, default: !1 },
    clickRef: { default: !1 },
    openTooltip: { type: Boolean, default: !1 }
  },
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(l, { expose: Y, emit: q }) {
    const e = l, r = q, V = ie(), I = me(), G = ke(), J = "lkt-button-" + z(), v = d(e.loading), w = d(null), Q = d(null), B = d(!1), f = d(e.openTooltip), N = d(!1), b = d(!1), T = d(void 0), m = d(e.checked);
    C(() => e.openTooltip, (o) => f.value = o), C(f, (o) => r("update:openTooltip", o));
    const H = () => {
      if (!e.onClickTo) return;
      let o = I.currentRoute;
      N.value = o.value.path === e.onClickTo;
    };
    C(G, (o) => {
      H();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const Z = h(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), v.value && o.push("is-loading"), N.value && o.push("is-active-route"), f.value && o.push("show-tooltip"), B.value && o.push("show-split"), m.value && o.push("is-checked"), o.join(" ");
    }), $ = h(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), g = h(() => e.text.startsWith("__:") ? ve(e.text.substring(3)) : e.text), _ = h(() => typeof p.defaultSplitIcon < "u"), x = h(() => p.defaultSplitIcon), O = h(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), E = async (o) => {
      i("Resource Click", e.resource, e.resourceData), v.value = !0, r("loading");
      let u = { ...e.resourceData, isChecked: m.value };
      return ce(e.resource, u).then((n) => {
        v.value = !1, r("loaded"), i("Resource Click -> Received response", n), r("click", o, n);
      }).catch((n) => {
        v.value = !1, r("loaded"), i("Resource Click -> Received response error", n), r("click", o, n);
      });
    }, F = d(!1), ee = h(() => w.value ? e.tooltip === "lazy" ? F.value : e.tooltip === "ever" ? f.value : e.tooltip === !0 : !1), oe = (o) => r("focus", o), te = (o) => r("blur", o), U = (o) => {
      var u;
      if (i("Click"), o && (e.showSwitch || e.hiddenSwitch ? (u = o.target) != null && u.closest(".lkt-field-switch") || (m.value = !m.value) : e.tooltip ? (f.value = !f.value, f.value && (F.value = !0)) : B.value = !B.value), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        r("click", o, D(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (i("Click -> has modal", e.confirmModal, e.modalData), i("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let n = e.modalData.beforeClose.bind({});
          i("Click -> Has beforeClose function: ", n), e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o).then(() => {
                n();
              });
            n(), r("click", o, D(e.name, e.value));
          }, i("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o);
            r("click", o, D(e.name, e.value));
          }, i("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return de(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let n = e.confirmData.onConfirm;
          i("Click -> Has onConfirm function: ", n), e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o).then(() => {
                n();
              });
            n(), r("click", o, D(e.name, e.value));
          }, i("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || I.push(e.onClickTo);
              return;
            }
            r("click", o, D(e.name, e.value));
          }, i("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return pe(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return i("Click -> has resource"), E(o);
      if (i("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : I.push(e.onClickTo);
        return;
      }
      r("click", o, D(e.name, e.value));
    };
    return C(() => e.loading, () => v.value = e.loading), C(() => e.checked, () => m.value = e.checked), C(m, (o) => r("update:checked", o)), C(b, (o) => {
      b.value && e.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        f.value = !0, clearTimeout(T.value);
      }, e.showTooltipOnHoverDelay)) : !b.value && e.hideTooltipOnLeave ? (f.value = !1, clearTimeout(T.value)) : b.value || clearTimeout(T.value);
    }), H(), Y({
      click: () => U(null)
    }), (o, u) => {
      const n = S("lkt-spinner"), le = S("lkt-anchor"), ae = S("lkt-field-switch"), P = S("lkt-tooltip");
      return t(), s("div", {
        class: k(["lkt-button-container", $.value]),
        ref_key: "container",
        ref: w,
        id: J,
        onMousemove: u[3] || (u[3] = (c) => b.value = !0),
        onMouseleave: u[4] || (u[4] = (c) => b.value = !1)
      }, [
        o.isAnchor ? (t(), y(le, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: A(() => [
            o.icon ? (t(), s("i", {
              key: 0,
              class: k(o.icon)
            }, null, 2)) : a("", !0),
            o.icon && o.iconDot ? (t(), s("i", he, L(O.value), 1)) : a("", !0),
            o.img ? (t(), s("img", {
              key: 2,
              src: o.img,
              alt: g.value
            }, null, 8, ye)) : a("", !0),
            g.value ? (t(), s(K, { key: 3 }, [
              W(L(g.value), 1)
            ], 64)) : a("", !0),
            j(V).default ? M(o.$slots, "default", { key: 4 }) : a("", !0),
            v.value ? (t(), y(n, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (t(), s("button", {
          key: 1,
          class: k(["lkt-button", Z.value]),
          ref_key: "button",
          ref: Q,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: U,
          onFocus: oe,
          onBlur: te
        }, [
          o.icon ? (t(), s("i", {
            key: 0,
            class: k(o.icon)
          }, null, 2)) : a("", !0),
          o.icon && o.iconDot ? (t(), s("i", be, L(O.value), 1)) : a("", !0),
          o.img ? (t(), s("img", {
            key: 2,
            src: o.img,
            alt: g.value
          }, null, 8, Te)) : a("", !0),
          g.value ? (t(), s(K, { key: 3 }, [
            W(L(g.value), 1)
          ], 64)) : a("", !0),
          j(V).default ? M(o.$slots, "default", { key: 4 }) : a("", !0),
          v.value ? (t(), y(n, { key: 5 })) : a("", !0),
          o.showSwitch || o.hiddenSwitch ? re((t(), y(ae, {
            key: 6,
            modelValue: m.value,
            "onUpdate:modelValue": u[0] || (u[0] = (c) => m.value = c)
          }, null, 8, ["modelValue"])), [
            [ue, !o.hiddenSwitch]
          ]) : a("", !0),
          o.iconEnd ? (t(), s("i", {
            key: 7,
            class: k([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : a("", !0),
          o.split ? (t(), s("div", ge, [
            o.splitIcon ? (t(), s("i", {
              key: 0,
              class: k(o.splitIcon)
            }, null, 2)) : _.value ? (t(), y(se(x.value), { key: 1 })) : a("", !0)
          ])) : a("", !0)
        ], 42, we)),
        o.split && w.value ? (t(), y(P, {
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": u[1] || (u[1] = (c) => B.value = c),
          referrer: w.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: k(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: A(({ doClose: c }) => [
            M(o.$slots, "split", { doClose: c })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : a("", !0),
        o.tooltip && w.value ? (t(), y(P, {
          key: 3,
          modelValue: f.value,
          "onUpdate:modelValue": u[2] || (u[2] = (c) => f.value = c),
          referrer: w.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: k(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, fe({ _: 2 }, [
          ee.value ? {
            name: "default",
            fn: A(({ doClose: c }) => [
              M(o.$slots, "tooltip", { doClose: c })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : a("", !0)
      ], 34);
    };
  }
}), Oe = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.use(Ce), l.component("lkt-button") === void 0 && l.component("lkt-button", De);
  }
}, Fe = (l) => {
  p.defaultSplitIcon = l;
};
export {
  He as debugLktButton,
  Oe as default,
  Ne as setDefaultButtonPalette,
  Fe as setDefaultButtonSplitSlot
};
