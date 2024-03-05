import { defineComponent as L, useSlots as A, ref as B, computed as m, watch as M, resolveComponent as N, openBlock as f, createElementBlock as p, normalizeClass as T, withModifiers as w, renderSlot as b, createCommentVNode as k, createBlock as P } from "vue";
import { createLktEvent as u } from "lkt-events";
import { generateRandomString as J } from "lkt-string-tools";
import { httpCall as K } from "lkt-http-client";
import { openModal as O } from "lkt-modal";
import { openConfirm as S } from "lkt-modal-confirm";
var h = /* @__PURE__ */ ((n) => (n.button = "button", n.submit = "submit", n.reset = "reset", n))(h || {});
const d = class d {
};
d.DEFAULT_PALETTE = "", d.debugEnabled = !1;
let s = d;
const Q = (n) => {
  s.DEFAULT_PALETTE = n;
}, W = (n = !0) => {
  s.debugEnabled = n;
}, c = (...n) => {
  s.debugEnabled && console.info("[LktButton] ", n);
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
    palette: { default: s.DEFAULT_PALETTE },
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
      let t = [];
      return e.palette && t.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && t.push("is-loading"), t.join(" ");
    }), _ = m(() => !!C.next), D = m(() => !!C.prev), i = async (t) => (r.value = !0, a("loading"), K(e.resource, e.resourceData).then((o) => {
      r.value = !1, a("loaded"), a("click", t, o);
    }).catch((o) => {
      r.value = !1, a("loaded"), a("click", t, o);
    })), y = (t) => {
      if (c("onClick!"), e.modal) {
        let o = typeof e.modalData == "object" ? JSON.parse(JSON.stringify(e.modalData)) : {};
        if (typeof o.beforeClose == "function") {
          let l = o.beforeClose.bind({});
          o.beforeClose = () => {
            if (e.resource)
              return i(t).then(() => {
                l();
              });
            l(), a("click", t, u(e.name, e.value));
          };
        } else
          o.beforeClose = () => {
            if (e.resource)
              return i(t);
            a("click", t, u(e.name, e.value));
          };
        return O(e.modal, e.modalKey, o);
      }
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (c("Has Confirm Modal: ", e.confirmModal, o), typeof o.onConfirm == "function") {
          let l = o.onConfirm.bind({});
          c("Has onConfirm function: ", l), o.onConfirm = () => {
            if (e.resource)
              return i(t).then(() => {
                l();
              });
            l(), a("click", t, u(e.name, e.value));
          }, c("New onConfirm function: ", o.onConfirm);
        } else
          o.onConfirm = () => {
            if (e.resource)
              return i(t);
            a("click", t, u(e.name, e.value));
          }, c("New onConfirm function: ", o.onConfirm);
        return S(e.confirmModal, e.confirmModalKey, o);
      }
      if (e.resource)
        return i(t);
      a("click", t, u(e.name, e.value));
    };
    return M(() => e.loading, () => r.value = e.loading), g({
      click: () => y(null)
    }), (t, o) => {
      const l = N("lkt-spinner");
      return f(), p("button", {
        class: T(["lkt-button", E.value]),
        name: t.name,
        type: t.type,
        disabled: t.disabled,
        onClick: w(y, ["prevent", "stop"])
      }, [
        D.value ? (f(), p("span", x, [
          b(t.$slots, "prev")
        ])) : k("", !0),
        b(t.$slots, "default"),
        _.value ? (f(), p("span", F, [
          b(t.$slots, "next")
        ])) : k("", !0),
        r.value ? (f(), P(l, { key: 2 })) : k("", !0)
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
