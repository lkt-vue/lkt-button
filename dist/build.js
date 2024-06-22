import { defineComponent as x, useSlots as z, ref as p, computed as C, onBeforeUnmount as I, watch as S, resolveComponent as _, openBlock as a, createElementBlock as i, createBlock as v, withCtx as V, renderSlot as c, createCommentVNode as s, normalizeClass as q, withModifiers as G, Fragment as J, renderList as Q } from "vue";
import { createLktEvent as k } from "lkt-events";
import { generateRandomString as B } from "lkt-string-tools";
import { httpCall as W } from "lkt-http-client";
import { openModal as X } from "lkt-modal";
import { openConfirm as Y } from "lkt-modal-confirm";
import { useRouter as Z } from "vue-router";
var A = /* @__PURE__ */ ((n) => (n.button = "button", n.submit = "submit", n.reset = "reset", n))(A || {});
const b = class b {
};
b.DEFAULT_PALETTE = "", b.debugEnabled = !1;
let f = b;
const me = (n) => {
  f.DEFAULT_PALETTE = n;
}, pe = (n = !0) => {
  f.debugEnabled = n;
}, l = (...n) => {
  f.debugEnabled && console.info("[LktButton] ", ...n);
}, $ = {
  key: 0,
  class: "lkt-button-prev"
}, ee = {
  key: 1,
  class: "lkt-button-next"
}, oe = ["name", "type", "disabled"], te = {
  key: 0,
  class: "lkt-button-prev"
}, le = {
  key: 1,
  class: "lkt-button-next"
}, ne = {
  key: 3,
  class: "lkt-split-button-arrow"
}, ae = /* @__PURE__ */ x({
  __name: "LktButton",
  props: {
    type: { default: A.button },
    name: { default: B(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    palette: { default: f.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
    isAnchor: { type: Boolean, default: !1 },
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
  setup(n, { expose: M, emit: R }) {
    const e = n, r = R, h = z(), D = Z(), P = "lkt-button-" + B(), u = p(e.loading), y = p(null), N = p(null), F = p(null), d = p(!1), K = C(() => {
      let o = [];
      return e.class && o.push(e.class), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), u.value && o.push("is-loading"), e.split && o.push("lkt-split-button"), o.join(" ");
    }), E = C(() => !!h.next), w = C(() => !!h.prev), m = async (o) => (l("Resource Click", e.resource, e.resourceData), u.value = !0, r("loading"), W(e.resource, e.resourceData).then((t) => {
      u.value = !1, r("loaded"), l("Resource Click -> Received response", t), r("click", o, t);
    }).catch((t) => {
      u.value = !1, r("loaded"), l("Resource Click -> Received response error", t), r("click", o, t);
    })), g = (o) => {
      if (!o.target) {
        d.value = !1;
        return;
      }
      if (!y.value.contains(o.target) || y.value.id !== o.target.id) {
        d.value = !1;
        return;
      }
    }, U = (o) => {
      d.value = !d.value;
    };
    window.addEventListener("click", g), I(() => {
      window.removeEventListener("click", g);
    });
    const T = (o) => {
      if (l("Click"), o && U(), !e.split) {
        if (e.modal) {
          if (l("Click -> has modal", e.confirmModal, e.modalData), l("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let t = e.modalData.beforeClose.bind({});
            l("Click -> Has beforeClose function: ", t), e.modalData.beforeClose = () => {
              if (e.resource)
                return m(o).then(() => {
                  t();
                });
              t(), r("click", o, k(e.name, e.value));
            }, l("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return m(o);
              r("click", o, k(e.name, e.value));
            }, l("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return X(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (l("Click -> has confirm modal", e.confirmModal, e.confirmData), l("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let t = e.confirmData.onConfirm;
            l("Click -> Has onConfirm function: ", t), e.confirmData.onConfirm = () => {
              if (e.resource)
                return m(o).then(() => {
                  t();
                });
              t(), r("click", o, k(e.name, e.value));
            }, l("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return m(o);
              if (e.onClickTo !== "") {
                o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || D.push(e.onClickTo);
                return;
              }
              r("click", o, k(e.name, e.value));
            }, l("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return Y(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return l("Click -> has resource"), m(o);
        if (l("Click -> Emit"), e.onClickTo !== "") {
          o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal ? window.location.href = e.onClickTo : D.push(e.onClickTo);
          return;
        }
        r("click", o, k(e.name, e.value));
      }
    };
    S(() => e.loading, () => u.value = e.loading), M({
      click: () => T(null)
    });
    const H = C(() => {
      let o = [];
      for (let t in h)
        t.indexOf("split-") !== -1 && o.push(t);
      return o;
    });
    return (o, t) => {
      const L = _("lkt-spinner"), O = _("lkt-anchor");
      return a(), i("div", {
        class: "lkt-button-container",
        ref_key: "container",
        ref: y,
        id: P
      }, [
        o.isAnchor ? (a(), v(O, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          imposter: ""
        }, {
          default: V(() => [
            w.value ? (a(), i("span", $, [
              c(o.$slots, "prev")
            ])) : s("", !0),
            c(o.$slots, "default"),
            E.value ? (a(), i("span", ee, [
              c(o.$slots, "next")
            ])) : s("", !0),
            u.value ? (a(), v(L, { key: 2 })) : s("", !0)
          ]),
          _: 3
        }, 8, ["href", "to"])) : (a(), i("button", {
          key: 1,
          class: q(["lkt-button", K.value]),
          ref_key: "button",
          ref: N,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: G(T, ["prevent", "stop"])
        }, [
          w.value ? (a(), i("span", te, [
            c(o.$slots, "prev")
          ])) : s("", !0),
          c(o.$slots, "default"),
          E.value ? (a(), i("span", le, [
            c(o.$slots, "next")
          ])) : s("", !0),
          u.value ? (a(), v(L, { key: 2 })) : s("", !0),
          o.split ? (a(), i("div", ne)) : s("", !0)
        ], 10, oe)),
        o.split && d.value ? (a(), i("div", {
          key: 2,
          ref_key: "dropdown",
          ref: F,
          class: "lkt-split-button-dropdown-content"
        }, [
          (a(!0), i(J, null, Q(H.value, (j) => c(o.$slots, j)), 256))
        ], 512)) : s("", !0)
      ], 512);
    };
  }
}), ke = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", ae);
  }
};
export {
  pe as debugLktButton,
  ke as default,
  me as setDefaultButtonPalette
};
