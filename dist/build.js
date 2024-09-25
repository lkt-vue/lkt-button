import { defineComponent as $, useSlots as x, ref as m, watch as E, computed as D, resolveComponent as B, openBlock as l, createElementBlock as f, normalizeClass as h, createBlock as p, withCtx as L, createCommentVNode as i, Fragment as F, createTextVNode as U, toDisplayString as P, unref as K, renderSlot as R, resolveDynamicComponent as ee } from "vue";
import { createLktEvent as b } from "lkt-events";
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
let d = T;
const ge = (t) => {
  d.DEFAULT_PALETTE = t;
}, De = (t = !0) => {
  d.debugEnabled = t;
}, a = (...t) => {
  d.debugEnabled && console.info("[LktButton] ", ...t);
}, ue = ["src", "alt"], se = ["name", "type", "disabled"], fe = ["src", "alt"], de = {
  key: 6,
  class: "lkt-split-button-arrow"
}, ce = /* @__PURE__ */ $({
  __name: "LktButton",
  props: {
    type: { default: j.button },
    name: { default: W(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: d.DEFAULT_PALETTE },
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
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    showSwitch: { type: Boolean, default: !1 },
    tooltip: { type: Boolean, default: !1 },
    tooltipWindowMargin: { default: 0 },
    tooltipReferrerMargin: { default: 0 },
    tooltipClass: {},
    splitClass: {},
    checked: { type: Boolean, default: !1 }
  },
  emits: ["click", "loading", "loaded", "update:checked"],
  setup(t, { expose: H, emit: z }) {
    const e = t, r = z, S = x(), M = ae(), q = ne(), G = "lkt-button-" + W(), c = m(e.loading), w = m(null), J = m(null), y = m(!1), v = m(!1), A = m(!1), k = m(e.checked), V = () => {
      if (!e.onClickTo)
        return;
      let o = M.currentRoute;
      A.value = o.value.path === e.onClickTo;
    };
    E(q, (o) => {
      V();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const O = D(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), c.value && o.push("is-loading"), A.value && o.push("is-active-route"), v.value && o.push("show-tooltip"), y.value && o.push("show-split"), o.join(" ");
    }), Q = D(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), C = D(() => e.text.startsWith("__:") ? ie(e.text.substring(3)) : e.text), X = D(() => typeof d.defaultSplitIcon < "u"), Y = D(() => d.defaultSplitIcon), g = async (o) => (a("Resource Click", e.resource, e.resourceData), c.value = !0, r("loading"), oe(e.resource, e.resourceData).then((n) => {
      c.value = !1, r("loaded"), a("Resource Click -> Received response", n), r("click", o, n);
    }).catch((n) => {
      c.value = !1, r("loaded"), a("Resource Click -> Received response error", n), r("click", o, n);
    })), I = (o) => {
      var n;
      if (a("Click"), o && (e.showSwitch ? (n = o.target) != null && n.closest(".lkt-field-switch") || (k.value = !k.value) : e.tooltip ? v.value = !v.value : y.value = !y.value), e.split || e.tooltip) {
        r("click", o, b(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (a("Click -> has modal", e.confirmModal, e.modalData), a("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let u = e.modalData.beforeClose.bind({});
          a("Click -> Has beforeClose function: ", u), e.modalData.beforeClose = () => {
            if (e.resource)
              return g(o).then(() => {
                u();
              });
            u(), r("click", o, b(e.name, e.value));
          }, a("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return g(o);
            r("click", o, b(e.name, e.value));
          }, a("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return te(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (a("Click -> has confirm modal", e.confirmModal, e.confirmData), a("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let u = e.confirmData.onConfirm;
          a("Click -> Has onConfirm function: ", u), e.confirmData.onConfirm = () => {
            if (e.resource)
              return g(o).then(() => {
                u();
              });
            u(), r("click", o, b(e.name, e.value));
          }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return g(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || M.push(e.onClickTo);
              return;
            }
            r("click", o, b(e.name, e.value));
          }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return le(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return a("Click -> has resource"), g(o);
      if (a("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : M.push(e.onClickTo);
        return;
      }
      r("click", o, b(e.name, e.value));
    };
    return E(() => e.loading, () => c.value = e.loading), E(() => e.checked, () => k.value = e.checked), E(k, (o) => r("update:checked", o)), V(), H({
      click: () => I(null)
    }), (o, n) => {
      const u = B("lkt-spinner"), Z = B("lkt-anchor"), _ = B("lkt-field-switch"), N = B("lkt-tooltip");
      return l(), f("div", {
        class: h(["lkt-button-container", Q.value]),
        ref_key: "container",
        ref: w,
        id: G
      }, [
        o.isAnchor ? (l(), p(Z, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: L(() => [
            o.icon ? (l(), f("i", {
              key: 0,
              class: h(o.icon)
            }, null, 2)) : i("", !0),
            o.img ? (l(), f("img", {
              key: 1,
              src: o.img,
              alt: C.value
            }, null, 8, ue)) : i("", !0),
            C.value ? (l(), f(F, { key: 2 }, [
              U(P(C.value), 1)
            ], 64)) : i("", !0),
            K(S).default ? R(o.$slots, "default", { key: 3 }) : i("", !0),
            c.value ? (l(), p(u, { key: 4 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), f("button", {
          key: 1,
          class: h(["lkt-button", O.value]),
          ref_key: "button",
          ref: J,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: I
        }, [
          o.icon ? (l(), f("i", {
            key: 0,
            class: h(o.icon)
          }, null, 2)) : i("", !0),
          o.img ? (l(), f("img", {
            key: 1,
            src: o.img,
            alt: C.value
          }, null, 8, fe)) : i("", !0),
          C.value ? (l(), f(F, { key: 2 }, [
            U(P(C.value), 1)
          ], 64)) : i("", !0),
          K(S).default ? R(o.$slots, "default", { key: 3 }) : i("", !0),
          o.showSwitch ? (l(), p(_, {
            key: 4,
            modelValue: k.value,
            "onUpdate:modelValue": n[0] || (n[0] = (s) => k.value = s)
          }, null, 8, ["modelValue"])) : i("", !0),
          c.value ? (l(), p(u, { key: 5 })) : i("", !0),
          o.split ? (l(), f("div", de, [
            X.value ? (l(), p(ee(Y.value), { key: 0 })) : i("", !0)
          ])) : i("", !0)
        ], 10, se)),
        o.split && w.value ? (l(), p(N, {
          key: 2,
          modelValue: y.value,
          "onUpdate:modelValue": n[1] || (n[1] = (s) => y.value = s),
          referrer: w.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: h(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: L(({ doClose: s }) => [
            R(o.$slots, "split", { doClose: s })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : i("", !0),
        o.tooltip && w.value ? (l(), p(N, {
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": n[2] || (n[2] = (s) => v.value = s),
          referrer: w.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: h(o.tooltipClass)
        }, {
          default: L(({ doClose: s }) => [
            R(o.$slots, "tooltip", { doClose: s })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : i("", !0)
      ], 2);
    };
  }
}), Te = {
  install: (t) => {
    t.component("lkt-tooltip") === void 0 && t.use(re), t.component("lkt-button") === void 0 && t.component("lkt-button", ce);
  }
}, Ee = (t) => {
  d.defaultSplitIcon = t;
};
export {
  De as debugLktButton,
  Te as default,
  ge as setDefaultButtonPalette,
  Ee as setDefaultButtonSplitSlot
};
