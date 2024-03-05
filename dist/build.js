import { defineComponent as L, useSlots as A, ref as B, computed as d, watch as M, resolveComponent as T, openBlock as u, createElementBlock as p, normalizeClass as N, withModifiers as w, renderSlot as k, createCommentVNode as b, createBlock as P } from "vue";
import { createLktEvent as f } from "lkt-events";
import { generateRandomString as K } from "lkt-string-tools";
import { httpCall as x } from "lkt-http-client";
import { openModal as F } from "lkt-modal";
import { openConfirm as U } from "lkt-modal-confirm";
var D = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(D || {});
const m = class m {
};
m.DEFAULT_PALETTE = "", m.debugEnabled = !1;
let i = m;
const Q = (t) => {
  i.DEFAULT_PALETTE = t;
}, W = (t = !0) => {
  i.debugEnabled = t;
}, r = (...t) => {
  i.debugEnabled && console.info("[LktButton] ", ...t);
}, j = ["name", "type", "disabled"], H = {
  key: 0,
  class: "lkt-button-prev"
}, J = {
  key: 1,
  class: "lkt-button-next"
}, O = { name: "LktButton", inheritAttrs: !1 }, R = /* @__PURE__ */ L({
  ...O,
  props: {
    type: { default: D.button },
    name: { default: K(10) },
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
  setup(t, { expose: h, emit: v }) {
    const e = t, n = v, C = A(), l = B(e.loading), E = d(() => {
      let o = [];
      return e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), l.value && o.push("is-loading"), o.join(" ");
    }), _ = d(() => !!C.next), g = d(() => !!C.prev), s = async (o) => (l.value = !0, n("loading"), x(e.resource, e.resourceData).then((a) => {
      l.value = !1, n("loaded"), n("click", o, a);
    }).catch((a) => {
      l.value = !1, n("loaded"), n("click", o, a);
    })), y = (o) => {
      if (r("onClick!"), e.modal) {
        let a = typeof e.modalData == "object" ? JSON.parse(JSON.stringify(e.modalData)) : {};
        if (typeof a.beforeClose == "function") {
          let c = a.beforeClose.bind({});
          a.beforeClose = () => {
            if (e.resource)
              return s(o).then(() => {
                c();
              });
            c(), n("click", o, f(e.name, e.value));
          };
        } else
          a.beforeClose = () => {
            if (e.resource)
              return s(o);
            n("click", o, f(e.name, e.value));
          };
        return F(e.modal, e.modalKey, a);
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
      click: () => y(null)
    }), (o, a) => {
      const c = T("lkt-spinner");
      return u(), p("button", {
        class: N(["lkt-button", E.value]),
        name: o.name,
        type: o.type,
        disabled: o.disabled,
        onClick: w(y, ["prevent", "stop"])
      }, [
        g.value ? (u(), p("span", H, [
          k(o.$slots, "prev")
        ])) : b("", !0),
        k(o.$slots, "default"),
        _.value ? (u(), p("span", J, [
          k(o.$slots, "next")
        ])) : b("", !0),
        l.value ? (u(), P(c, { key: 2 })) : b("", !0)
      ], 10, j);
    };
  }
}), X = {
  install: (t) => {
    t.component("lkt-button") === void 0 && t.component("lkt-button", R);
  }
};
export {
  W as debugLktButton,
  X as default,
  Q as setDefaultButtonPalette
};
