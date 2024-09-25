import { defineComponent as $, useSlots as x, ref as m, watch as E, computed as D, resolveComponent as B, openBlock as l, createElementBlock as s, normalizeClass as p, createBlock as k, withCtx as M, createCommentVNode as a, Fragment as F, createTextVNode as U, toDisplayString as P, unref as K, renderSlot as L, resolveDynamicComponent as ee } from "vue";
import { createLktEvent as y } from "lkt-events";
import { generateRandomString as W } from "lkt-string-tools";
import { httpCall as oe } from "lkt-http-client";
import { openModal as te } from "lkt-modal";
import { openConfirm as le } from "lkt-modal-confirm";
import { useRouter as ae, useRoute as ne } from "vue-router";
import { __ as ie } from "lkt-i18n";
import re from "lkt-tooltip";
var j = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(j || {});
const T = class T {
};
T.DEFAULT_PALETTE = "", T.debugEnabled = !1, T.defaultSplitIcon = void 0;
let c = T;
const ge = (t) => {
  c.DEFAULT_PALETTE = t;
}, De = (t = !0) => {
  c.debugEnabled = t;
}, n = (...t) => {
  c.debugEnabled && console.info("[LktButton] ", ...t);
}, ue = ["src", "alt"], se = ["name", "type", "disabled"], fe = ["src", "alt"], ce = {
  key: 7,
  class: "lkt-split-button-arrow"
}, de = /* @__PURE__ */ $({
  __name: "LktButton",
  props: {
    type: { default: j.button },
    name: { default: W(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: c.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
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
    iconEnd: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    showSwitch: { type: Boolean, default: !1 },
    tooltip: { type: Boolean, default: !1 },
    tooltipWindowMargin: { default: 0 },
    tooltipReferrerMargin: { default: 0 },
    tooltipClass: {},
    tooltipLocationY: { default: "bottom" },
    tooltipLocationX: { default: "left-corner" },
    splitClass: {},
    checked: { type: Boolean, default: !1 }
  },
  emits: ["click", "loading", "loaded", "update:checked"],
  setup(t, { expose: H, emit: X }) {
    const e = t, r = X, S = x(), R = ae(), Y = ne(), z = "lkt-button-" + W(), d = m(e.loading), b = m(null), q = m(null), w = m(!1), v = m(!1), A = m(!1), C = m(e.checked), V = () => {
      if (!e.onClickTo)
        return;
      let o = R.currentRoute;
      A.value = o.value.path === e.onClickTo;
    };
    E(Y, (o) => {
      V();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const G = D(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), d.value && o.push("is-loading"), A.value && o.push("is-active-route"), v.value && o.push("show-tooltip"), w.value && o.push("show-split"), o.join(" ");
    }), J = D(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), h = D(() => e.text.startsWith("__:") ? ie(e.text.substring(3)) : e.text), O = D(() => typeof c.defaultSplitIcon < "u"), Q = D(() => c.defaultSplitIcon), g = async (o) => (n("Resource Click", e.resource, e.resourceData), d.value = !0, r("loading"), oe(e.resource, e.resourceData).then((i) => {
      d.value = !1, r("loaded"), n("Resource Click -> Received response", i), r("click", o, i);
    }).catch((i) => {
      d.value = !1, r("loaded"), n("Resource Click -> Received response error", i), r("click", o, i);
    })), I = (o) => {
      var i;
      if (n("Click"), o && (e.showSwitch ? (i = o.target) != null && i.closest(".lkt-field-switch") || (C.value = !C.value) : e.tooltip ? v.value = !v.value : w.value = !w.value), e.split || e.tooltip) {
        r("click", o, y(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (n("Click -> has modal", e.confirmModal, e.modalData), n("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let u = e.modalData.beforeClose.bind({});
          n("Click -> Has beforeClose function: ", u), e.modalData.beforeClose = () => {
            if (e.resource)
              return g(o).then(() => {
                u();
              });
            u(), r("click", o, y(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return g(o);
            r("click", o, y(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return te(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let u = e.confirmData.onConfirm;
          n("Click -> Has onConfirm function: ", u), e.confirmData.onConfirm = () => {
            if (e.resource)
              return g(o).then(() => {
                u();
              });
            u(), r("click", o, y(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return g(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || R.push(e.onClickTo);
              return;
            }
            r("click", o, y(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return le(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return n("Click -> has resource"), g(o);
      if (n("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : R.push(e.onClickTo);
        return;
      }
      r("click", o, y(e.name, e.value));
    };
    return E(() => e.loading, () => d.value = e.loading), E(() => e.checked, () => C.value = e.checked), E(C, (o) => r("update:checked", o)), V(), H({
      click: () => I(null)
    }), (o, i) => {
      const u = B("lkt-spinner"), Z = B("lkt-anchor"), _ = B("lkt-field-switch"), N = B("lkt-tooltip");
      return l(), s("div", {
        class: p(["lkt-button-container", J.value]),
        ref_key: "container",
        ref: b,
        id: z
      }, [
        o.isAnchor ? (l(), k(Z, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: M(() => [
            o.icon ? (l(), s("i", {
              key: 0,
              class: p(o.icon)
            }, null, 2)) : a("", !0),
            o.img ? (l(), s("img", {
              key: 1,
              src: o.img,
              alt: h.value
            }, null, 8, ue)) : a("", !0),
            h.value ? (l(), s(F, { key: 2 }, [
              U(P(h.value), 1)
            ], 64)) : a("", !0),
            K(S).default ? L(o.$slots, "default", { key: 3 }) : a("", !0),
            d.value ? (l(), k(u, { key: 4 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), s("button", {
          key: 1,
          class: p(["lkt-button", G.value]),
          ref_key: "button",
          ref: q,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: I
        }, [
          o.icon ? (l(), s("i", {
            key: 0,
            class: p(o.icon)
          }, null, 2)) : a("", !0),
          o.img ? (l(), s("img", {
            key: 1,
            src: o.img,
            alt: h.value
          }, null, 8, fe)) : a("", !0),
          h.value ? (l(), s(F, { key: 2 }, [
            U(P(h.value), 1)
          ], 64)) : a("", !0),
          K(S).default ? L(o.$slots, "default", { key: 3 }) : a("", !0),
          d.value ? (l(), k(u, { key: 4 })) : a("", !0),
          o.showSwitch ? (l(), k(_, {
            key: 5,
            modelValue: C.value,
            "onUpdate:modelValue": i[0] || (i[0] = (f) => C.value = f)
          }, null, 8, ["modelValue"])) : a("", !0),
          o.iconEnd ? (l(), s("i", {
            key: 6,
            class: p([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : a("", !0),
          o.split ? (l(), s("div", ce, [
            O.value ? (l(), k(ee(Q.value), { key: 0 })) : a("", !0)
          ])) : a("", !0)
        ], 10, se)),
        o.split && b.value ? (l(), k(N, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": i[1] || (i[1] = (f) => w.value = f),
          referrer: b.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: p(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: M(({ doClose: f }) => [
            L(o.$slots, "split", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : a("", !0),
        o.tooltip && b.value ? (l(), k(N, {
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": i[2] || (i[2] = (f) => v.value = f),
          referrer: b.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: p(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, {
          default: M(({ doClose: f }) => [
            L(o.$slots, "tooltip", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : a("", !0)
      ], 2);
    };
  }
}), Te = {
  install: (t) => {
    t.component("lkt-tooltip") === void 0 && t.use(re), t.component("lkt-button") === void 0 && t.component("lkt-button", de);
  }
}, Ee = (t) => {
  c.defaultSplitIcon = t;
};
export {
  De as debugLktButton,
  Te as default,
  ge as setDefaultButtonPalette,
  Ee as setDefaultButtonSplitSlot
};
