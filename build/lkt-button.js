import { defineComponent as L, useSlots as g, ref as A, computed as m, watch as M, resolveComponent as B, openBlock as i, createElementBlock as c, normalizeClass as T, withModifiers as N, renderSlot as f, createCommentVNode as p, createBlock as P } from "vue";
import { createLktEvent as u } from "lkt-events";
import { generateRandomString as S } from "lkt-string-tools";
import { httpCall as w } from "lkt-http-client";
import { openModal as J } from "lkt-modal";
import K, { openConfirm as O } from "lkt-modal-confirm";
var y = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l))(y || {});
const k = class k {
};
k.DEFAULT_PALETTE = "";
let d = k;
const j = ["name", "type", "disabled"], F = {
  key: 0,
  class: "lkt-button-prev"
}, U = {
  key: 1,
  class: "lkt-button-content"
}, R = {
  key: 3,
  class: "lkt-button-next"
}, x = { name: "LktButton", inheritAttrs: !1 }, z = /* @__PURE__ */ L({
  ...x,
  props: {
    type: { default: y.button },
    name: { default: S(10) },
    palette: { default: d.DEFAULT_PALETTE },
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
  setup(l, { expose: h, emit: v }) {
    const e = l, a = v, b = g(), n = A(e.loading), _ = m(() => {
      let t = [];
      return e.palette && t.push(`lkt-button--${e.palette}`), n.value && t.push("is-loading"), t.join(" ");
    }), D = m(() => !!b.next), E = m(() => !!b.prev), r = async (t) => (n.value = !0, a("loading"), w(e.resource, e.resourceData).then((o) => {
      n.value = !1, a("loaded"), a("click", t, o);
    }).catch((o) => {
      n.value = !1, a("loaded"), a("click", t, o);
    })), C = (t) => {
      if (e.modal) {
        let o = typeof e.modalData == "object" ? JSON.parse(JSON.stringify(e.modalData)) : {};
        if (typeof o.beforeClose == "function") {
          let s = o.beforeClose.bind({});
          o.beforeClose = () => {
            if (e.resource)
              return r(t).then(() => {
                s();
              });
            a("click", t, u(e.name, e.value));
          };
        } else
          o.beforeClose = () => {
            if (e.resource)
              return r(t);
            a("click", t, u(e.name, e.value));
          };
        return J(e.modal, e.modalKey, o);
      }
      if (e.confirmModal) {
        let o = typeof e.confirmData == "object" ? JSON.parse(JSON.stringify(e.confirmData)) : {};
        if (typeof o.onConfirm == "function") {
          let s = o.onConfirm.bind({});
          o.onConfirm = () => {
            if (e.resource)
              return r(t).then(() => {
                s();
              });
            a("click", t, u(e.name, e.value));
          };
        } else
          o.onConfirm = () => {
            if (e.resource)
              return r(t);
            a("click", t, u(e.name, e.value));
          };
        return O(e.confirmModal, e.confirmModalKey, o);
      }
      if (e.resource)
        return r(t);
      a("click", t, u(e.name, e.value));
    };
    return M(() => e.loading, () => n.value = e.loading), h({
      click: () => C(null)
    }), (t, o) => {
      const s = B("lkt-spinner");
      return i(), c("button", {
        class: T(["lkt-button", _.value]),
        name: t.name,
        type: t.type,
        disabled: t.disabled,
        onClick: N(C, ["prevent", "stop"])
      }, [
        E.value ? (i(), c("span", F, [
          f(t.$slots, "prev")
        ])) : p("", !0),
        t.wrapContent ? (i(), c("span", U, [
          f(t.$slots, "default")
        ])) : f(t.$slots, "default", { key: 2 }),
        D.value ? (i(), c("span", R, [
          f(t.$slots, "next")
        ])) : p("", !0),
        n.value ? (i(), P(s, { key: 4 })) : p("", !0)
      ], 10, j);
    };
  }
}), W = (l) => {
  d.DEFAULT_PALETTE = l;
}, X = {
  install: (l) => {
    l.component("lkt-button") === void 0 && l.component("lkt-button", z), l.component("lkt-modal-confirm") === void 0 && l.use(K);
  }
};
export {
  X as default,
  W as setDefaultButtonPalette
};
