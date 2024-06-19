import { defineComponent as U, useSlots as O, ref as d, computed as k, onBeforeUnmount as H, watch as V, resolveComponent as j, openBlock as r, createElementBlock as s, createElementVNode as z, normalizeClass as I, withModifiers as S, renderSlot as C, createCommentVNode as m, createBlock as q, Fragment as G, renderList as J } from "vue";
import { createLktEvent as p } from "lkt-events";
import { generateRandomString as E } from "lkt-string-tools";
import { httpCall as Q } from "lkt-http-client";
import { openModal as W } from "lkt-modal";
import { openConfirm as X } from "lkt-modal-confirm";
import { useRouter as Y } from "vue-router";
var w = /* @__PURE__ */ ((n) => (n.button = "button", n.submit = "submit", n.reset = "reset", n))(w || {});
const b = class b {
};
b.DEFAULT_PALETTE = "", b.debugEnabled = !1;
let c = b;
const ue = (n) => {
  c.DEFAULT_PALETTE = n;
}, fe = (n = !0) => {
  c.debugEnabled = n;
}, l = (...n) => {
  c.debugEnabled && console.info("[LktButton] ", ...n);
}, Z = ["name", "type", "disabled"], $ = {
  key: 0,
  class: "lkt-button-prev"
}, ee = {
  key: 1,
  class: "lkt-button-next"
}, oe = {
  key: 3,
  class: "lkt-split-button-arrow"
}, te = /* @__PURE__ */ U({
  __name: "LktButton",
  props: {
    type: { default: w.button },
    name: { default: E(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    palette: { default: c.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
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
  setup(n, { expose: T, emit: L }) {
    const e = n, a = L, D = O(), v = Y(), _ = "lkt-button-" + E(), i = d(e.loading), h = d(null), B = d(null), M = d(null), u = d(!1), A = k(() => {
      let o = [];
      return e.class && o.push(e.class), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), i.value && o.push("is-loading"), e.split && o.push("lkt-split-button"), o.join(" ");
    }), R = k(() => !!D.next), N = k(() => !!D.prev), f = async (o) => (l("Resource Click", e.resource, e.resourceData), i.value = !0, a("loading"), Q(e.resource, e.resourceData).then((t) => {
      i.value = !1, a("loaded"), l("Resource Click -> Received response", t), a("click", o, t);
    }).catch((t) => {
      i.value = !1, a("loaded"), l("Resource Click -> Received response error", t), a("click", o, t);
    })), y = (o) => {
      if (!o.target) {
        u.value = !1;
        return;
      }
      if (console.log("onClickOutside", o.target), !h.value.contains(o.target) || h.value.id !== o.target.id) {
        u.value = !1;
        return;
      }
    }, P = (o) => {
      u.value = !u.value;
    };
    window.addEventListener("click", y), H(() => {
      window.removeEventListener("click", y);
    });
    const g = (o) => {
      if (l("Click"), o && P(), !e.split) {
        if (e.modal) {
          if (l("Click -> has modal", e.confirmModal, e.modalData), l("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let t = e.modalData.beforeClose.bind({});
            l("Click -> Has beforeClose function: ", t), e.modalData.beforeClose = () => {
              if (e.resource)
                return f(o).then(() => {
                  t();
                });
              t(), a("click", o, p(e.name, e.value));
            }, l("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return f(o);
              a("click", o, p(e.name, e.value));
            }, l("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return W(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (l("Click -> has confirm modal", e.confirmModal, e.confirmData), l("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let t = e.confirmData.onConfirm;
            l("Click -> Has onConfirm function: ", t), e.confirmData.onConfirm = () => {
              if (e.resource)
                return f(o).then(() => {
                  t();
                });
              t(), a("click", o, p(e.name, e.value));
            }, l("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return f(o);
              if (e.onClickTo !== "") {
                o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || v.push(e.onClickTo);
                return;
              }
              a("click", o, p(e.name, e.value));
            }, l("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return X(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return l("Click -> has resource"), f(o);
        if (l("Click -> Emit"), e.onClickTo !== "") {
          o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal ? window.location.href = e.onClickTo : v.push(e.onClickTo);
          return;
        }
        a("click", o, p(e.name, e.value));
      }
    };
    V(() => e.loading, () => i.value = e.loading), T({
      click: () => g(null)
    });
    const x = k(() => {
      let o = [];
      for (let t in D)
        t.indexOf("split-") !== -1 && o.push(t);
      return o;
    });
    return (o, t) => {
      const F = j("lkt-spinner");
      return r(), s("div", {
        class: "lkt-button-container",
        ref_key: "container",
        ref: h,
        id: _
      }, [
        z("button", {
          class: I(["lkt-button", A.value]),
          ref_key: "button",
          ref: B,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: S(g, ["prevent", "stop"])
        }, [
          N.value ? (r(), s("span", $, [
            C(o.$slots, "prev")
          ])) : m("", !0),
          C(o.$slots, "default"),
          R.value ? (r(), s("span", ee, [
            C(o.$slots, "next")
          ])) : m("", !0),
          i.value ? (r(), q(F, { key: 2 })) : m("", !0),
          o.split ? (r(), s("div", oe)) : m("", !0)
        ], 10, Z),
        o.split && u.value ? (r(), s("div", {
          key: 0,
          ref_key: "dropdown",
          ref: M,
          class: "lkt-split-button-dropdown-content"
        }, [
          (r(!0), s(G, null, J(x.value, (K) => C(o.$slots, K)), 256))
        ], 512)) : m("", !0)
      ], 512);
    };
  }
}), de = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", te);
  }
};
export {
  fe as debugLktButton,
  de as default,
  ue as setDefaultButtonPalette
};
