import { defineComponent as Y, useSlots as Z, ref as m, watch as N, computed as v, resolveComponent as E, openBlock as n, createElementBlock as u, normalizeClass as w, createBlock as p, withCtx as B, createCommentVNode as r, Fragment as V, createTextVNode as F, toDisplayString as P, unref as U, renderSlot as D, resolveDynamicComponent as $ } from "vue";
import { createLktEvent as h } from "lkt-events";
import { generateRandomString as K } from "lkt-string-tools";
import { httpCall as x } from "lkt-http-client";
import { openModal as ee } from "lkt-modal";
import { openConfirm as oe } from "lkt-modal-confirm";
import { useRouter as te, useRoute as le } from "vue-router";
import { __ as ae } from "lkt-i18n";
import ne from "lkt-tooltip";
var W = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(W || {});
const g = class g {
};
g.DEFAULT_PALETTE = "", g.debugEnabled = !1, g.defaultSplitIcon = void 0;
let s = g;
const he = (t) => {
  s.DEFAULT_PALETTE = t;
}, ge = (t = !0) => {
  s.debugEnabled = t;
}, a = (...t) => {
  s.debugEnabled && console.info("[LktButton] ", ...t);
}, re = ["src", "alt"], ie = ["name", "type", "disabled"], ue = ["src", "alt"], se = {
  key: 5,
  class: "lkt-split-button-arrow"
}, fe = /* @__PURE__ */ Y({
  __name: "LktButton",
  props: {
    type: { default: W.button },
    name: { default: K(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: s.DEFAULT_PALETTE },
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
    tooltipReferrerMargin: { default: 0 }
  },
  emits: ["click", "loading", "loaded"],
  setup(t, { expose: j, emit: H }) {
    const e = t, i = H, R = Z(), T = te(), z = le(), _ = "lkt-button-" + K(), f = m(e.loading), k = m(null), q = m(null), C = m(!1), b = m(!1), M = m(!1), L = () => {
      if (!e.onClickTo)
        return;
      let o = T.currentRoute;
      M.value = o.value.path === e.onClickTo;
    };
    N(z, (o) => {
      L();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const G = v(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), f.value && o.push("is-loading"), M.value && o.push("is-active-route"), b.value && o.push("show-tooltip"), C.value && o.push("show-split"), o.join(" ");
    }), J = v(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), c = v(() => e.text.startsWith("__:") ? ae(e.text.substring(3)) : e.text), O = v(() => typeof s.defaultSplitIcon < "u"), Q = v(() => s.defaultSplitIcon), y = async (o) => (a("Resource Click", e.resource, e.resourceData), f.value = !0, i("loading"), x(e.resource, e.resourceData).then((l) => {
      f.value = !1, i("loaded"), a("Resource Click -> Received response", l), i("click", o, l);
    }).catch((l) => {
      f.value = !1, i("loaded"), a("Resource Click -> Received response error", l), i("click", o, l);
    })), A = (o) => {
      if (a("Click"), o && (e.tooltip ? b.value = !b.value : C.value = !C.value), !(e.split || e.tooltip)) {
        if (e.modal) {
          if (a("Click -> has modal", e.confirmModal, e.modalData), a("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
            let l = e.modalData.beforeClose.bind({});
            a("Click -> Has beforeClose function: ", l), e.modalData.beforeClose = () => {
              if (e.resource)
                return y(o).then(() => {
                  l();
                });
              l(), i("click", o, h(e.name, e.value));
            }, a("Click -> New beforeClose function: ", e.modalData.beforeClose);
          } else
            e.modalData.beforeClose = () => {
              if (e.resource)
                return y(o);
              i("click", o, h(e.name, e.value));
            }, a("Click -> New beforeClose function: ", e.modalData.beforeClose);
          return ee(e.modal, e.modalKey, e.modalData);
        }
        if (e.confirmModal) {
          if (a("Click -> has confirm modal", e.confirmModal, e.confirmData), a("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
            let l = e.confirmData.onConfirm;
            a("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
              if (e.resource)
                return y(o).then(() => {
                  l();
                });
              l(), i("click", o, h(e.name, e.value));
            }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          } else
            e.confirmData.onConfirm = () => {
              if (e.resource)
                return y(o);
              if (e.onClickTo !== "") {
                o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || T.push(e.onClickTo);
                return;
              }
              i("click", o, h(e.name, e.value));
            }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
          return oe(e.confirmModal, e.confirmModalKey, e.confirmData);
        }
        if (e.resource)
          return a("Click -> has resource"), y(o);
        if (a("Click -> Emit"), e.onClickTo !== "") {
          e.onClickToExternal ? window.location.href = e.onClickTo : T.push(e.onClickTo);
          return;
        }
        i("click", o, h(e.name, e.value));
      }
    };
    return N(() => e.loading, () => f.value = e.loading), L(), j({
      click: () => A(null)
    }), (o, l) => {
      const S = E("lkt-spinner"), X = E("lkt-anchor"), I = E("lkt-tooltip");
      return n(), u("div", {
        class: w(["lkt-button-container", J.value]),
        ref_key: "container",
        ref: k,
        id: _
      }, [
        o.isAnchor ? (n(), p(X, {
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
            o.icon ? (n(), u("i", {
              key: 0,
              class: w(o.icon)
            }, null, 2)) : r("", !0),
            o.img ? (n(), u("img", {
              key: 1,
              src: o.img,
              alt: c.value
            }, null, 8, re)) : r("", !0),
            c.value ? (n(), u(V, { key: 2 }, [
              F(P(c.value), 1)
            ], 64)) : r("", !0),
            U(R).default ? D(o.$slots, "default", { key: 3 }) : r("", !0),
            f.value ? (n(), p(S, { key: 4 })) : r("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (n(), u("button", {
          key: 1,
          class: w(["lkt-button", G.value]),
          ref_key: "button",
          ref: q,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: A
        }, [
          o.icon ? (n(), u("i", {
            key: 0,
            class: w(o.icon)
          }, null, 2)) : r("", !0),
          o.img ? (n(), u("img", {
            key: 1,
            src: o.img,
            alt: c.value
          }, null, 8, ue)) : r("", !0),
          c.value ? (n(), u(V, { key: 2 }, [
            F(P(c.value), 1)
          ], 64)) : r("", !0),
          U(R).default ? D(o.$slots, "default", { key: 3 }) : r("", !0),
          f.value ? (n(), p(S, { key: 4 })) : r("", !0),
          o.split ? (n(), u("div", se, [
            O.value ? (n(), p($(Q.value), { key: 0 })) : r("", !0)
          ])) : r("", !0)
        ], 10, ie)),
        o.split && k.value ? (n(), p(I, {
          key: 2,
          modelValue: C.value,
          "onUpdate:modelValue": l[0] || (l[0] = (d) => C.value = d),
          referrer: k.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: "lkt-split-button-dropdown-content"
        }, {
          default: B(({ doClose: d }) => [
            D(o.$slots, "split", { doClose: d })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin"])) : r("", !0),
        o.tooltip && k.value ? (n(), p(I, {
          key: 3,
          modelValue: b.value,
          "onUpdate:modelValue": l[1] || (l[1] = (d) => b.value = d),
          referrer: k.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin
        }, {
          default: B(({ doClose: d }) => [
            D(o.$slots, "tooltip", { doClose: d })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin"])) : r("", !0)
      ], 2);
    };
  }
}), we = {
  install: (t) => {
    t.component("lkt-tooltip") === void 0 && t.use(ne), t.component("lkt-button") === void 0 && t.component("lkt-button", fe);
  }
}, De = (t) => {
  s.defaultSplitIcon = t;
};
export {
  ge as debugLktButton,
  we as default,
  he as setDefaultButtonPalette,
  De as setDefaultButtonSplitSlot
};
