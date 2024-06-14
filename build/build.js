import { defineComponent as _, useSlots as B, ref as w, computed as m, watch as M, resolveComponent as A, openBlock as f, createElementBlock as d, normalizeClass as R, withModifiers as P, renderSlot as p, createCommentVNode as C, createBlock as x } from "vue";
import { createLktEvent as c } from "lkt-events";
import { generateRandomString as N } from "lkt-string-tools";
import { httpCall as K } from "lkt-http-client";
import { openModal as F } from "lkt-modal";
import { openConfirm as U } from "lkt-modal-confirm";
import { useRouter as H } from "vue-router";
var h = /* @__PURE__ */ ((a) => (a.button = "button", a.submit = "submit", a.reset = "reset", a))(h || {});
const u = class u {
};
u.DEFAULT_PALETTE = "", u.debugEnabled = !1;
let i = u;
const X = (a) => {
  i.DEFAULT_PALETTE = a;
}, Y = (a = !0) => {
  i.debugEnabled = a;
}, t = (...a) => {
  i.debugEnabled && console.info("[LktButton] ", ...a);
}, j = ["name", "type", "disabled"], z = {
  key: 0,
  class: "lkt-button-prev"
}, V = {
  key: 1,
  class: "lkt-button-next"
}, q = /* @__PURE__ */ _({
  __name: "LktButton",
  props: {
    type: { default: h.button },
    name: { default: N(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
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
  setup(a, { expose: y, emit: E }) {
    const e = a, n = E, k = B(), b = H(), r = w(e.loading), T = m(() => {
      let o = [];
      return e.class && o.push(e.class), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), r.value && o.push("is-loading"), o.join(" ");
    }), g = m(() => !!k.next), v = m(() => !!k.prev), s = async (o) => (t("Resource Click", e.resource, e.resourceData), r.value = !0, n("loading"), K(e.resource, e.resourceData).then((l) => {
      r.value = !1, n("loaded"), t("Resource Click -> Received response", l), n("click", o, l);
    }).catch((l) => {
      r.value = !1, n("loaded"), t("Resource Click -> Received response error", l), n("click", o, l);
    })), D = (o) => {
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
        return F(e.modal, e.modalKey, e.modalData);
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
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || b.push(e.onClickTo);
              return;
            }
            n("click", o, c(e.name, e.value));
          }, t("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return U(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return t("Click -> has resource"), s(o);
      if (t("Click -> Emit"), e.onClickTo !== "") {
        o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal ? window.location.href = e.onClickTo : b.push(e.onClickTo);
        return;
      }
      n("click", o, c(e.name, e.value));
    };
    return M(() => e.loading, () => r.value = e.loading), y({
      click: () => D(null)
    }), (o, l) => {
      const L = A("lkt-spinner");
      return f(), d("button", {
        class: R(["lkt-button", T.value]),
        name: o.name,
        type: o.type,
        disabled: o.disabled,
        onClick: P(D, ["prevent", "stop"])
      }, [
        v.value ? (f(), d("span", z, [
          p(o.$slots, "prev")
        ])) : C("", !0),
        p(o.$slots, "default"),
        g.value ? (f(), d("span", V, [
          p(o.$slots, "next")
        ])) : C("", !0),
        r.value ? (f(), x(L, { key: 2 })) : C("", !0)
      ], 10, j);
    };
  }
}), Z = {
  install: (a) => {
    a.component("lkt-button") === void 0 && a.component("lkt-button", q);
  }
};
export {
  Y as debugLktButton,
  Z as default,
  X as setDefaultButtonPalette
};
