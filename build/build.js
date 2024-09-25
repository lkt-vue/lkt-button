import { defineComponent as Z, useSlots as _, ref as m, watch as N, computed as h, resolveComponent as E, openBlock as n, createElementBlock as s, normalizeClass as p, createBlock as k, withCtx as B, createCommentVNode as r, Fragment as V, createTextVNode as F, toDisplayString as P, unref as U, renderSlot as D, resolveDynamicComponent as $ } from "vue";
import { createLktEvent as g } from "lkt-events";
import { generateRandomString as K } from "lkt-string-tools";
import { httpCall as x } from "lkt-http-client";
import { openModal as ee } from "lkt-modal";
import { openConfirm as oe } from "lkt-modal-confirm";
import { useRouter as te, useRoute as le } from "vue-router";
import { __ as ae } from "lkt-i18n";
import ne from "lkt-tooltip";
var W = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(W || {});
const w = class w {
};
w.DEFAULT_PALETTE = "", w.debugEnabled = !1, w.defaultSplitIcon = void 0;
let u = w;
const he = (t) => {
  u.DEFAULT_PALETTE = t;
}, ge = (t = !0) => {
  u.debugEnabled = t;
}, a = (...t) => {
  u.debugEnabled && console.info("[LktButton] ", ...t);
}, re = ["src", "alt"], ie = ["name", "type", "disabled"], se = ["src", "alt"], ue = {
  key: 5,
  class: "lkt-split-button-arrow"
}, fe = /* @__PURE__ */ Z({
  __name: "LktButton",
  props: {
    type: { default: W.button },
    name: { default: K(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: u.DEFAULT_PALETTE },
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
    confirmData: { default: () => ({}) },
    text: { default: "" },
    icon: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    tooltip: { type: Boolean, default: !1 },
    tooltipWindowMargin: { default: 0 },
    tooltipReferrerMargin: { default: 0 },
    tooltipClass: {},
    splitClass: {}
  },
  emits: ["click", "loading", "loaded"],
  setup(t, { expose: j, emit: H }) {
    const e = t, i = H, R = _(), T = te(), z = le(), q = "lkt-button-" + K(), f = m(e.loading), C = m(null), G = m(null), b = m(!1), y = m(!1), M = m(!1), L = () => {
      if (!e.onClickTo)
        return;
      let o = T.currentRoute;
      M.value = o.value.path === e.onClickTo;
    };
    N(z, (o) => {
      L();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const J = h(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), f.value && o.push("is-loading"), M.value && o.push("is-active-route"), y.value && o.push("show-tooltip"), b.value && o.push("show-split"), o.join(" ");
    }), O = h(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), d = h(() => e.text.startsWith("__:") ? ae(e.text.substring(3)) : e.text), Q = h(() => typeof u.defaultSplitIcon < "u"), X = h(() => u.defaultSplitIcon), v = async (o) => (a("Resource Click", e.resource, e.resourceData), f.value = !0, i("loading"), x(e.resource, e.resourceData).then((l) => {
      f.value = !1, i("loaded"), a("Resource Click -> Received response", l), i("click", o, l);
    }).catch((l) => {
      f.value = !1, i("loaded"), a("Resource Click -> Received response error", l), i("click", o, l);
    })), A = (o) => {
      if (a("Click"), o && (e.tooltip ? y.value = !y.value : b.value = !b.value), !(e.split || e.tooltip)) {
        if (e.modal) {
          if (a("Click -> has modal", e.confirmModal, e.modalData), a("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let l = e.modalData.beforeClose.bind({});
            a("Click -> Has beforeClose function: ", l), e.modalData.beforeClose = () => {
              if (e.resource)
                return v(o).then(() => {
                  l();
                });
              l(), i("click", o, g(e.name, e.value));
            }, a("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return v(o);
              i("click", o, g(e.name, e.value));
            }, a("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return ee(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (a("Click -> has confirm modal", e.confirmModal, e.confirmData), a("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let l = e.confirmData.onConfirm;
            a("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
              if (e.resource)
                return v(o).then(() => {
                  l();
                });
              l(), i("click", o, g(e.name, e.value));
            }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return v(o);
              if (e.onClickTo !== "") {
                o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || T.push(e.onClickTo);
                return;
              }
              i("click", o, g(e.name, e.value));
            }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return oe(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return a("Click -> has resource"), v(o);
        if (a("Click -> Emit"), e.onClickTo !== "") {
          e.onClickToExternal ? window.location.href = e.onClickTo : T.push(e.onClickTo);
          return;
        }
        i("click", o, g(e.name, e.value));
      }
    };
    return N(() => e.loading, () => f.value = e.loading), L(), j({
      click: () => A(null)
    }), (o, l) => {
      const S = E("lkt-spinner"), Y = E("lkt-anchor"), I = E("lkt-tooltip");
      return n(), s("div", {
        class: p(["lkt-button-container", O.value]),
        ref_key: "container",
        ref: C,
        id: q
      }, [
        o.isAnchor ? (n(), k(Y, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: B(() => [
            o.icon ? (n(), s("i", {
              key: 0,
              class: p(o.icon)
            }, null, 2)) : r("", !0),
            o.img ? (n(), s("img", {
              key: 1,
              src: o.img,
              alt: d.value
            }, null, 8, re)) : r("", !0),
            d.value ? (n(), s(V, { key: 2 }, [
              F(P(d.value), 1)
            ], 64)) : r("", !0),
            U(R).default ? D(o.$slots, "default", { key: 3 }) : r("", !0),
            f.value ? (n(), k(S, { key: 4 })) : r("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (n(), s("button", {
          key: 1,
          class: p(["lkt-button", J.value]),
          ref_key: "button",
          ref: G,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: A
        }, [
          o.icon ? (n(), s("i", {
            key: 0,
            class: p(o.icon)
          }, null, 2)) : r("", !0),
          o.img ? (n(), s("img", {
            key: 1,
            src: o.img,
            alt: d.value
          }, null, 8, se)) : r("", !0),
          d.value ? (n(), s(V, { key: 2 }, [
            F(P(d.value), 1)
          ], 64)) : r("", !0),
          U(R).default ? D(o.$slots, "default", { key: 3 }) : r("", !0),
          f.value ? (n(), k(S, { key: 4 })) : r("", !0),
          o.split ? (n(), s("div", ue, [
            Q.value ? (n(), k($(X.value), { key: 0 })) : r("", !0)
          ])) : r("", !0)
        ], 10, ie)),
        o.split && C.value ? (n(), k(I, {
          key: 2,
          modelValue: b.value,
          "onUpdate:modelValue": l[0] || (l[0] = (c) => b.value = c),
          referrer: C.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: p(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: B(({ doClose: c }) => [
            D(o.$slots, "split", { doClose: c })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : r("", !0),
        o.tooltip && C.value ? (n(), k(I, {
          key: 3,
          modelValue: y.value,
          "onUpdate:modelValue": l[1] || (l[1] = (c) => y.value = c),
          referrer: C.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: p(o.tooltipClass)
        }, {
          default: B(({ doClose: c }) => [
            D(o.$slots, "tooltip", { doClose: c })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : r("", !0)
      ], 2);
    };
  }
}), we = {
  install: (t) => {
    t.component("lkt-tooltip") === void 0 && t.use(ne), t.component("lkt-button") === void 0 && t.component("lkt-button", fe);
  }
}, De = (t) => {
  u.defaultSplitIcon = t;
};
export {
  ge as debugLktButton,
  we as default,
  he as setDefaultButtonPalette,
  De as setDefaultButtonSplitSlot
};
