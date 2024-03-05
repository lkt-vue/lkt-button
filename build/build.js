import { defineComponent as L, useSlots as A, ref as B, computed as m, watch as M, resolveComponent as T, openBlock as c, createElementBlock as p, normalizeClass as N, withModifiers as w, renderSlot as b, createCommentVNode as k, createBlock as P } from "vue";
import { createLktEvent as f } from "lkt-events";
import { generateRandomString as K } from "lkt-string-tools";
import { httpCall as j } from "lkt-http-client";
import { openModal as x } from "lkt-modal";
import { openConfirm as F } from "lkt-modal-confirm";
var h = /* @__PURE__ */ ((n) => (n.button = "button", n.submit = "submit", n.reset = "reset", n))(h || {});
const d = class d {
};
d.DEFAULT_PALETTE = "", d.debugEnabled = !1;
let i = d;
const Q = (n) => {
  i.DEFAULT_PALETTE = n;
}, W = (n = !0) => {
  i.debugEnabled = n;
}, s = (...n) => {
  i.debugEnabled && console.info("[LktButton] ", ...n);
}, U = ["name", "type", "disabled"], H = {
  key: 0,
  class: "lkt-button-prev"
}, J = {
  key: 1,
  class: "lkt-button-next"
}, O = { name: "LktButton", inheritAttrs: !1 }, R = /* @__PURE__ */ L({
  ...O,
  props: {
    type: { default: h.button },
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
  setup(n, { expose: v, emit: E }) {
    const e = n, a = E, C = A(), r = B(e.loading), _ = m(() => {
      let o = [];
      return e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && o.push("is-loading"), o.join(" ");
    }), g = m(() => !!C.next), D = m(() => !!C.prev), u = async (o) => (r.value = !0, a("loading"), j(e.resource, e.resourceData).then((t) => {
      r.value = !1, a("loaded"), a("click", o, t);
    }).catch((t) => {
      r.value = !1, a("loaded"), a("click", o, t);
    })), y = (o) => {
      if (s("onClick!"), e.modal) {
        let t = typeof e.modalData == "object" ? JSON.parse(JSON.stringify(e.modalData)) : {};
        if (typeof t.beforeClose == "function") {
          let l = t.beforeClose.bind({});
          t.beforeClose = () => {
            if (e.resource)
              return u(o).then(() => {
                l();
              });
            l(), a("click", o, f(e.name, e.value));
          };
        } else
          t.beforeClose = () => {
            if (e.resource)
              return u(o);
            a("click", o, f(e.name, e.value));
          };
        return x(e.modal, e.modalKey, t);
      }
      if (e.confirmModal) {
        let t = typeof e.confirmData == "object" ? e.confirmData : {};
        if (s("Has Confirm Modal: ", e.confirmModal, t), s("typeof onConfirm: ", typeof t.onConfirm), typeof t.onConfirm == "function") {
          let l = t.onConfirm.bind({});
          s("Has onConfirm function: ", l), t.onConfirm = () => {
            if (e.resource)
              return u(o).then(() => {
                l();
              });
            l(), a("click", o, f(e.name, e.value));
          }, s("New onConfirm function: ", t.onConfirm);
        } else
          t.onConfirm = () => {
            if (e.resource)
              return u(o);
            a("click", o, f(e.name, e.value));
          }, s("New onConfirm function: ", t.onConfirm);
        return F(e.confirmModal, e.confirmModalKey, t);
      }
      if (e.resource)
        return u(o);
      a("click", o, f(e.name, e.value));
    };
    return M(() => e.loading, () => r.value = e.loading), v({
      click: () => y(null)
    }), (o, t) => {
      const l = T("lkt-spinner");
      return c(), p("button", {
        class: N(["lkt-button", _.value]),
        name: o.name,
        type: o.type,
        disabled: o.disabled,
        onClick: w(y, ["prevent", "stop"])
      }, [
        D.value ? (c(), p("span", H, [
          b(o.$slots, "prev")
        ])) : k("", !0),
        b(o.$slots, "default"),
        g.value ? (c(), p("span", J, [
          b(o.$slots, "next")
        ])) : k("", !0),
        r.value ? (c(), P(l, { key: 2 })) : k("", !0)
      ], 10, U);
    };
  }
}), X = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", R);
  }
};
export {
  W as debugLktButton,
  X as default,
  Q as setDefaultButtonPalette
};
