import { defineComponent as _, useSlots as B, ref as M, computed as m, watch as A, resolveComponent as w, openBlock as f, createElementBlock as d, normalizeClass as R, withModifiers as T, renderSlot as p, createCommentVNode as C, createBlock as N } from "vue";
import { createLktEvent as c } from "lkt-events";
import { generateRandomString as P } from "lkt-string-tools";
import { httpCall as K } from "lkt-http-client";
import { openModal as x } from "lkt-modal";
import { openConfirm as F } from "lkt-modal-confirm";
var D = /* @__PURE__ */ ((a) => (a.button = "button", a.submit = "submit", a.reset = "reset", a))(D || {});
const u = class u {
};
u.DEFAULT_PALETTE = "", u.debugEnabled = !1;
let i = u;
const Q = (a) => {
  i.DEFAULT_PALETTE = a;
}, S = (a = !0) => {
  i.debugEnabled = a;
}, t = (...a) => {
  i.debugEnabled && console.info("[LktButton] ", ...a);
}, U = ["name", "type", "disabled"], H = {
  key: 0,
  class: "lkt-button-prev"
}, j = {
  key: 1,
  class: "lkt-button-next"
}, z = /* @__PURE__ */ _({
  __name: "LktButton",
  props: {
    type: { default: D.button },
    name: { default: P(10) },
    class: { default: "" },
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
  setup(a, { expose: h, emit: y }) {
    const e = a, n = y, k = B(), r = M(e.loading), v = m(() => {
      let o = [];
      return e.class && o.push(e.class), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && o.push("is-loading"), o.join(" ");
    }), E = m(() => !!k.next), g = m(() => !!k.prev), s = async (o) => (t("Resource Click", e.resource, e.resourceData), r.value = !0, n("loading"), K(e.resource, e.resourceData).then((l) => {
      r.value = !1, n("loaded"), t("Resource Click -> Received response", l), n("click", o, l);
    }).catch((l) => {
      r.value = !1, n("loaded"), t("Resource Click -> Received response error", l), n("click", o, l);
    })), b = (o) => {
      if (t("Click"), e.modal) {
        if (t("Click -> has modal", e.confirmModal, e.modalData), t("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let l = e.modalData.beforeClose.bind({});
          t("Click -> Has beforeClose function: ", l), e.modalData.beforeClose = () => {
            if (e.resource)
              return s(o).then(() => {
                l();
              });
            l(), n("click", o, c(e.name, e.value));
          }, t("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return s(o);
            n("click", o, c(e.name, e.value));
          }, t("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return x(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (t("Click -> has confirm modal", e.confirmModal, e.confirmData), t("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let l = e.confirmData.onConfirm;
          t("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
            if (e.resource)
              return s(o).then(() => {
                l();
              });
            l(), n("click", o, c(e.name, e.value));
          }, t("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return s(o);
            n("click", o, c(e.name, e.value));
          }, t("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return F(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return t("Click -> has resource"), s(o);
      t("Click -> Emit"), n("click", o, c(e.name, e.value));
    };
    return A(() => e.loading, () => r.value = e.loading), h({
      click: () => b(null)
    }), (o, l) => {
      const L = w("lkt-spinner");
      return f(), d("button", {
        class: R(["lkt-button", v.value]),
        name: o.name,
        type: o.type,
        disabled: o.disabled,
        onClick: T(b, ["prevent", "stop"])
      }, [
        g.value ? (f(), d("span", H, [
          p(o.$slots, "prev")
        ])) : C("", !0),
        p(o.$slots, "default"),
        E.value ? (f(), d("span", j, [
          p(o.$slots, "next")
        ])) : C("", !0),
        r.value ? (f(), N(L, { key: 2 })) : C("", !0)
      ], 10, U);
    };
  }
}), W = {
  install: (a) => {
    a.component("lkt-button") === void 0 && a.component("lkt-button", z);
  }
};
export {
  S as debugLktButton,
  W as default,
  Q as setDefaultButtonPalette
};
