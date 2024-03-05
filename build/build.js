import { defineComponent as g, useSlots as L, ref as A, computed as f, watch as B, resolveComponent as M, openBlock as u, createElementBlock as d, normalizeClass as T, withModifiers as N, renderSlot as m, createCommentVNode as p, createBlock as P } from "vue";
import { createLktEvent as i } from "lkt-events";
import { generateRandomString as S } from "lkt-string-tools";
import { httpCall as J } from "lkt-http-client";
import { openModal as K } from "lkt-modal";
import { openConfirm as O } from "lkt-modal-confirm";
var y = /* @__PURE__ */ ((a) => (a.button = "button", a.submit = "submit", a.reset = "reset", a))(y || {});
const k = class k {
};
k.DEFAULT_PALETTE = "";
let c = k;
const j = ["name", "type", "disabled"], w = {
  key: 0,
  class: "lkt-button-prev"
}, x = {
  key: 1,
  class: "lkt-button-next"
}, F = { name: "LktButton", inheritAttrs: !1 }, U = /* @__PURE__ */ g({
  ...F,
  props: {
    type: { default: y.button },
    name: { default: S(10) },
    palette: { default: c.DEFAULT_PALETTE },
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
  setup(a, { expose: h, emit: _ }) {
    const e = a, l = _, b = L(), r = A(e.loading), v = f(() => {
      let t = [];
      return e.palette && t.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && t.push("is-loading"), t.join(" ");
    }), D = f(() => !!b.next), E = f(() => !!b.prev), s = async (t) => (r.value = !0, l("loading"), J(e.resource, e.resourceData).then((o) => {
      r.value = !1, l("loaded"), l("click", t, o);
    }).catch((o) => {
      r.value = !1, l("loaded"), l("click", t, o);
    })), C = (t) => {
      if (e.modal) {
        let o = typeof e.modalData == "object" ? JSON.parse(JSON.stringify(e.modalData)) : {};
        if (typeof o.beforeClose == "function") {
          let n = o.beforeClose.bind({});
          o.beforeClose = () => {
            if (e.resource)
              return s(t).then(() => {
                n();
              });
            n(), l("click", t, i(e.name, e.value));
          };
        } else
          o.beforeClose = () => {
            if (e.resource)
              return s(t);
            l("click", t, i(e.name, e.value));
          };
        return K(e.modal, e.modalKey, o);
      }
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let n = o.onConfirm.bind({});
          o.onConfirm = () => {
            if (e.resource)
              return s(t).then(() => {
                n();
              });
            n(), l("click", t, i(e.name, e.value));
          };
        } else
          o.onConfirm = () => {
            if (e.resource)
              return s(t);
            l("click", t, i(e.name, e.value));
          };
        return O(e.confirmModal, e.confirmModalKey, o);
      }
      if (e.resource)
        return s(t);
      l("click", t, i(e.name, e.value));
    };
    return B(() => e.loading, () => r.value = e.loading), h({
      click: () => C(null)
    }), (t, o) => {
      const n = M("lkt-spinner");
      return u(), d("button", {
        class: T(["lkt-button", v.value]),
        name: t.name,
        type: t.type,
        disabled: t.disabled,
        onClick: N(C, ["prevent", "stop"])
      }, [
        E.value ? (u(), d("span", w, [
          m(t.$slots, "prev")
        ])) : p("", !0),
        m(t.$slots, "default"),
        D.value ? (u(), d("span", x, [
          m(t.$slots, "next")
        ])) : p("", !0),
        r.value ? (u(), P(n, { key: 2 })) : p("", !0)
      ], 10, j);
    };
  }
}), I = (a) => {
  c.DEFAULT_PALETTE = a;
}, Q = {
  install: (a) => {
    a.component("lkt-button") === void 0 && a.component("lkt-button", U);
  }
};
export {
  Q as default,
  I as setDefaultButtonPalette
};
