import { defineComponent as L, useSlots as A, ref as B, computed as f, watch as M, resolveComponent as T, openBlock as c, createElementBlock as m, normalizeClass as N, withModifiers as P, renderSlot as p, createCommentVNode as b, createBlock as J } from "vue";
import { createLktEvent as u } from "lkt-events";
import { generateRandomString as K } from "lkt-string-tools";
import { httpCall as O } from "lkt-http-client";
import { openModal as S } from "lkt-modal";
import { openConfirm as j } from "lkt-modal-confirm";
var h = /* @__PURE__ */ ((a) => (a.button = "button", a.submit = "submit", a.reset = "reset", a))(h || {});
const d = class d {
};
d.DEFAULT_PALETTE = "", d.debugEnabled = !1;
let s = d;
const Q = (a) => {
  s.DEFAULT_PALETTE = a;
}, W = (a = !0) => {
  s.debugEnabled = a;
}, y = (...a) => {
  s.debugEnabled && console.info("[LktButton] ", a);
}, w = ["name", "type", "disabled"], x = {
  key: 0,
  class: "lkt-button-prev"
}, F = {
  key: 1,
  class: "lkt-button-next"
}, U = { name: "LktButton", inheritAttrs: !1 }, R = /* @__PURE__ */ L({
  ...U,
  props: {
    type: { default: h.button },
    name: { default: K(10) },
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
  setup(a, { expose: g, emit: v }) {
    const e = a, l = v, k = A(), r = B(e.loading), E = f(() => {
      let t = [];
      return e.palette && t.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && t.push("is-loading"), t.join(" ");
    }), _ = f(() => !!k.next), D = f(() => !!k.prev), i = async (t) => (r.value = !0, l("loading"), O(e.resource, e.resourceData).then((o) => {
      r.value = !1, l("loaded"), l("click", t, o);
    }).catch((o) => {
      r.value = !1, l("loaded"), l("click", t, o);
    })), C = (t) => {
      if (y("onClick!"), e.modal) {
        let o = typeof e.modalData == "object" ? JSON.parse(JSON.stringify(e.modalData)) : {};
        if (typeof o.beforeClose == "function") {
          let n = o.beforeClose.bind({});
          o.beforeClose = () => {
            if (e.resource)
              return i(t).then(() => {
                n();
              });
            n(), l("click", t, u(e.name, e.value));
          };
        } else
          o.beforeClose = () => {
            if (e.resource)
              return i(t);
            l("click", t, u(e.name, e.value));
          };
        return S(e.modal, e.modalKey, o);
      }
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (y("Has Confirm Modal: ", e.confirmModal, o), typeof o.onConfirm == "function") {
          let n = o.onConfirm.bind({});
          o.onConfirm = () => {
            if (e.resource)
              return i(t).then(() => {
                n();
              });
            n(), l("click", t, u(e.name, e.value));
          };
        } else
          o.onConfirm = () => {
            if (e.resource)
              return i(t);
            l("click", t, u(e.name, e.value));
          };
        return j(e.confirmModal, e.confirmModalKey, o);
      }
      if (e.resource)
        return i(t);
      l("click", t, u(e.name, e.value));
    };
    return M(() => e.loading, () => r.value = e.loading), g({
      click: () => C(null)
    }), (t, o) => {
      const n = T("lkt-spinner");
      return c(), m("button", {
        class: N(["lkt-button", E.value]),
        name: t.name,
        type: t.type,
        disabled: t.disabled,
        onClick: P(C, ["prevent", "stop"])
      }, [
        D.value ? (c(), m("span", x, [
          p(t.$slots, "prev")
        ])) : b("", !0),
        p(t.$slots, "default"),
        _.value ? (c(), m("span", F, [
          p(t.$slots, "next")
        ])) : b("", !0),
        r.value ? (c(), J(n, { key: 2 })) : b("", !0)
      ], 10, w);
    };
  }
}), X = {
  install: (a) => {
    a.component("lkt-button") === void 0 && a.component("lkt-button", R);
  }
};
export {
  W as debugLktButton,
  X as default,
  Q as setDefaultButtonPalette
};
