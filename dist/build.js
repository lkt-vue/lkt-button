import { defineComponent as L, useSlots as A, ref as B, computed as m, watch as M, resolveComponent as N, openBlock as c, createElementBlock as p, normalizeClass as T, withModifiers as w, renderSlot as b, createCommentVNode as k, createBlock as P } from "vue";
import { createLktEvent as f } from "lkt-events";
import { generateRandomString as J } from "lkt-string-tools";
import { httpCall as K } from "lkt-http-client";
import { openModal as O } from "lkt-modal";
import { openConfirm as S } from "lkt-modal-confirm";
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
}, j = ["name", "type", "disabled"], x = {
  key: 0,
  class: "lkt-button-prev"
}, F = {
  key: 1,
  class: "lkt-button-next"
}, U = { name: "LktButton", inheritAttrs: !1 }, H = /* @__PURE__ */ L({
  ...U,
  props: {
    type: { default: h.button },
    name: { default: J(10) },
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
  setup(n, { expose: g, emit: v }) {
    const e = n, a = v, C = A(), r = B(e.loading), E = m(() => {
      let o = [];
      return e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && o.push("is-loading"), o.join(" ");
    }), _ = m(() => !!C.next), D = m(() => !!C.prev), u = async (o) => (r.value = !0, a("loading"), K(e.resource, e.resourceData).then((t) => {
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
        return O(e.modal, e.modalKey, t);
      }
      if (e.confirmModal) {
        let t = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (s("Has Confirm Modal: ", e.confirmModal, t), s("type of onConfirm: ", typeof t.onConfirm), typeof t.onConfirm == "function") {
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
        return S(e.confirmModal, e.confirmModalKey, t);
      }
      if (e.resource)
        return u(o);
      a("click", o, f(e.name, e.value));
    };
    return M(() => e.loading, () => r.value = e.loading), g({
      click: () => y(null)
    }), (o, t) => {
      const l = N("lkt-spinner");
      return c(), p("button", {
        class: T(["lkt-button", E.value]),
        name: o.name,
        type: o.type,
        disabled: o.disabled,
        onClick: w(y, ["prevent", "stop"])
      }, [
        D.value ? (c(), p("span", x, [
          b(o.$slots, "prev")
        ])) : k("", !0),
        b(o.$slots, "default"),
        _.value ? (c(), p("span", F, [
          b(o.$slots, "next")
        ])) : k("", !0),
        r.value ? (c(), P(l, { key: 2 })) : k("", !0)
      ], 10, j);
    };
  }
}), X = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", H);
  }
};
export {
  W as debugLktButton,
  X as default,
  Q as setDefaultButtonPalette
};
