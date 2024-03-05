import { defineComponent as L, useSlots as A, ref as B, computed as m, watch as M, resolveComponent as T, openBlock as c, createElementBlock as d, normalizeClass as w, withModifiers as P, renderSlot as p, createCommentVNode as k, createBlock as K } from "vue";
import { createLktEvent as f } from "lkt-events";
import { generateRandomString as N } from "lkt-string-tools";
import { httpCall as x } from "lkt-http-client";
import { openModal as F } from "lkt-modal";
import { openConfirm as U } from "lkt-modal-confirm";
var D = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(D || {});
const u = class u {
};
u.DEFAULT_PALETTE = "", u.debugEnabled = !1;
let i = u;
const S = (t) => {
  i.DEFAULT_PALETTE = t;
}, W = (t = !0) => {
  i.debugEnabled = t;
}, r = (...t) => {
  i.debugEnabled && console.info("[LktButton] ", ...t);
}, H = ["name", "type", "disabled"], R = {
  key: 0,
  class: "lkt-button-prev"
}, j = {
  key: 1,
  class: "lkt-button-next"
}, z = { name: "LktButton", inheritAttrs: !1 }, V = /* @__PURE__ */ L({
  ...z,
  props: {
    type: { default: D.button },
    name: { default: N(10) },
    palette: { default: i.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    modal: { default: "" },
    modalKey: { default: "_" },
    modalData: { default: () => ({}) },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) }
  },
  emits: ["click", "loading", "loaded"],
  setup(t, { expose: h, emit: y }) {
    const e = t, n = y, b = A(), l = B(e.loading), v = m(() => {
      let o = [];
      return e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), l.value && o.push("is-loading"), o.join(" ");
    }), E = m(() => !!b.next), _ = m(() => !!b.prev), s = async (o) => (l.value = !0, n("loading"), x(e.resource, e.resourceData).then((a) => {
      l.value = !1, n("loaded"), n("click", o, a);
    }).catch((a) => {
      l.value = !1, n("loaded"), n("click", o, a);
    })), C = (o) => {
      if (r("onClick!"), e.modal) {
        if (typeof e.modalData.beforeClose == "function") {
          let a = e.modalData.beforeClose.bind({});
          e.modalData.beforeClose = () => {
            if (e.resource)
              return s(o).then(() => {
                a();
              });
            a(), n("click", o, f(e.name, e.value));
          };
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return s(o);
            n("click", o, f(e.name, e.value));
          };
        return F(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (r("Has Confirm Modal: ", e.confirmModal, e.confirmData), r("typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let a = e.confirmData.onConfirm;
          r("Has onConfirm function: ", a), e.confirmData.onConfirm = () => {
            if (e.resource)
              return s(o).then(() => {
                a();
              });
            a(), n("click", o, f(e.name, e.value));
          }, r("New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return s(o);
            n("click", o, f(e.name, e.value));
          }, r("New onConfirm function: ", e.confirmData.onConfirm);
        return U(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return s(o);
      n("click", o, f(e.name, e.value));
    };
    return M(() => e.loading, () => l.value = e.loading), h({
      click: () => C(null)
    }), (o, a) => {
      const g = T("lkt-spinner");
      return c(), d("button", {
        class: w(["lkt-button", v.value]),
        name: o.name,
        type: o.type,
        disabled: o.disabled,
        onClick: P(C, ["prevent", "stop"])
      }, [
        _.value ? (c(), d("span", R, [
          p(o.$slots, "prev")
        ])) : k("", !0),
        p(o.$slots, "default"),
        E.value ? (c(), d("span", j, [
          p(o.$slots, "next")
        ])) : k("", !0),
        l.value ? (c(), K(g, { key: 2 })) : k("", !0)
      ], 10, H);
    };
  }
}), X = {
  install: (t) => {
    t.component("lkt-button") === void 0 && t.component("lkt-button", V);
  }
};
export {
  W as debugLktButton,
  X as default,
  S as setDefaultButtonPalette
};
