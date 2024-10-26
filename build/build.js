import { defineComponent as ne, useSlots as re, ref as d, watch as C, computed as h, resolveComponent as M, openBlock as l, createElementBlock as s, normalizeClass as k, createBlock as y, withCtx as N, createCommentVNode as a, toDisplayString as A, Fragment as z, createTextVNode as X, unref as Y, renderSlot as I, withDirectives as ue, vShow as se, resolveDynamicComponent as fe, createSlots as ce } from "vue";
import { createLktEvent as D } from "lkt-events";
import { generateRandomString as q } from "lkt-string-tools";
import { httpCall as de } from "lkt-http-client";
import { openModal as me } from "lkt-modal";
import { openConfirm as pe } from "lkt-modal-confirm";
import { useRouter as ke, useRoute as ve } from "vue-router";
import { __ as Ce } from "lkt-i18n";
import he from "lkt-tooltip";
import ye from "lkt-field";
import be from "lkt-anchor";
import we from "lkt-loader";
var G = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(G || {});
const S = class S {
};
S.DEFAULT_PALETTE = "", S.debugEnabled = !1, S.defaultSplitIcon = void 0;
let m = S;
const We = (t) => {
  m.DEFAULT_PALETTE = t;
}, je = (t = !0) => {
  m.debugEnabled = t;
}, r = (...t) => {
  m.debugEnabled && console.info("[LktButton] ", ...t);
}, Te = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ge = ["src", "alt"], De = ["name", "type", "disabled", "tabindex"], Ee = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Be = ["src", "alt"], Re = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Le = /* @__PURE__ */ ne({
  __name: "LktButton",
  props: {
    type: { default: G.button },
    name: { default: q(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: m.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
    splitIcon: { default: "" },
    isAnchor: { type: Boolean, default: !1 },
    resource: { default: "" },
    resourceData: { default: () => ({}) },
    modal: { type: [String, Function], default: "" },
    modalKey: { default: "_" },
    modalData: { default: () => ({}) },
    confirmModal: { default: "" },
    confirmModalKey: { default: "_" },
    confirmData: { default: () => ({}) },
    text: { default: "" },
    icon: { default: "" },
    iconDot: { type: [Boolean, String, Number], default: !1 },
    iconEnd: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    showSwitch: { type: Boolean, default: !1 },
    hiddenSwitch: { type: Boolean },
    tooltip: { type: [Boolean, String], default: !1 },
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: { default: 0 },
    hideTooltipOnLeave: { type: Boolean },
    tooltipWindowMargin: { default: 0 },
    tooltipReferrerMargin: { default: 0 },
    tooltipClass: {},
    tooltipLocationY: { default: "bottom" },
    tooltipLocationX: { default: "left-corner" },
    splitClass: {},
    checked: { type: Boolean, default: !1 },
    clickRef: { default: !1 },
    openTooltip: { type: Boolean, default: !1 },
    tabindex: { default: void 0 }
  },
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(t, { expose: J, emit: Q }) {
    const o = t, i = Q, H = re(), E = ke(), Z = ve(), $ = "lkt-button-" + q(), v = d(o.loading), b = d(null), V = d(null), B = d(!1), f = d(o.openTooltip), O = d(!1), w = d(!1), T = d(void 0), p = d(o.checked), F = d(!1);
    C(() => o.openTooltip, (e) => f.value = e), C(f, (e) => i("update:openTooltip", e));
    const U = () => {
      if (!o.onClickTo) return;
      let e = E == null ? void 0 : E.currentRoute;
      O.value = e.value.path === o.onClickTo;
    };
    C(Z, (e) => {
      U();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const _ = h(() => {
      let e = [];
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), v.value && e.push("is-loading"), O.value && e.push("is-active-route"), f.value && e.push("show-tooltip"), B.value && e.push("show-split"), p.value && e.push("is-checked"), e.join(" ");
    }), x = h(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), g = h(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? Ce(e.substring(3)) : e;
    }), ee = h(() => typeof m.defaultSplitIcon < "u"), oe = h(() => m.defaultSplitIcon), P = h(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), R = async (e) => {
      r("Resource Click", o.resource, o.resourceData), v.value = !0, i("loading");
      let u = { ...o.resourceData, isChecked: p.value };
      return de(o.resource, u).then((n) => {
        v.value = !1, i("loaded"), r("Resource Click -> Received response", n), i("click", e, n);
      }).catch((n) => {
        v.value = !1, i("loaded"), r("Resource Click -> Received response error", n), i("click", e, n);
      });
    }, K = d(!1), te = h(() => b.value ? o.tooltip === "lazy" ? K.value : o.tooltip === "ever" ? f.value : o.tooltip === !0 : !1), le = (e) => {
      if (F.value) {
        F.value = !1, i("focus");
        return;
      }
      i("focus", e);
    }, ae = (e) => i("blur", e), W = (e) => {
      var u;
      if (r("Click"), e && (o.showSwitch || o.hiddenSwitch ? (u = e.target) != null && u.closest(".lkt-field.is-switch") || (p.value = !p.value) : o.tooltip ? (f.value = !f.value, f.value && (K.value = !0)) : o.split && (B.value = !B.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
        i("click", e, D(o.name, o.value));
        return;
      }
      if (o.modal) {
        if (r("Click -> has modal", o.confirmModal, o.modalData), r("Click -> typeof beforeClose: ", typeof o.modalData.beforeClose), typeof o.modalData.beforeClose == "function") {
          let L = o.modalData.beforeClose.bind({});
          r("Click -> Has beforeClose function: ", L), o.modalData.beforeClose = () => {
            if (o.resource)
              return R(e).then(() => {
                L();
              });
            L(), i("click", e, D(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        } else
          o.modalData.beforeClose = () => {
            if (o.resource)
              return R(e);
            i("click", e, D(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        let n = o.modal;
        return typeof o.modal == "function" && (n = o.modal()), me(n, o.modalKey, o.modalData);
      }
      if (o.confirmModal) {
        if (r("Click -> has confirm modal", o.confirmModal, o.confirmData), r("Click -> typeof onConfirm: ", typeof o.confirmData.onConfirm), typeof o.confirmData.onConfirm == "function") {
          let n = o.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", n), o.confirmData.onConfirm = () => {
            if (o.resource)
              return R(e).then(() => {
                n();
              });
            n(), i("click", e, D(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        } else
          o.confirmData.onConfirm = () => {
            if (o.resource)
              return R(e);
            if (o.onClickTo !== "") {
              e && (e.preventDefault(), e.stopPropagation()), o.onClickToExternal || E.push(o.onClickTo);
              return;
            }
            i("click", e, D(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        return pe(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return r("Click -> has resource"), R(e);
      if (r("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : E.push(o.onClickTo);
        return;
      }
      i("click", e, D(o.name, o.value));
    };
    return C(() => o.loading, () => v.value = o.loading), C(() => o.checked, () => p.value = o.checked), C(p, (e) => i("update:checked", e)), C(w, (e) => {
      w.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        f.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !w.value && o.hideTooltipOnLeave ? (f.value = !1, clearTimeout(T.value)) : w.value || clearTimeout(T.value);
    }), U(), J({
      click: () => W(null),
      focus: (e) => {
        V.value && (e && (F.value = !0), V.value.focus());
      }
    }), (e, u) => {
      const n = M("lkt-spinner"), L = M("lkt-anchor"), ie = M("lkt-field"), j = M("lkt-tooltip");
      return l(), s("div", {
        class: k(["lkt-button-container", x.value]),
        ref_key: "container",
        ref: b,
        id: $,
        onMousemove: u[3] || (u[3] = (c) => w.value = !0),
        onMouseleave: u[4] || (u[4] = (c) => w.value = !1)
      }, [
        e.isAnchor ? (l(), y(L, {
          key: 0,
          class: "lkt-button",
          href: e.onClickToExternal ? e.onClickTo : "",
          to: e.onClickToExternal ? "" : e.onClickTo,
          download: e.download,
          target: e.newTab ? "_blank" : "",
          "download-file-name": e.downloadFileName,
          imposter: ""
        }, {
          default: N(() => [
            e.icon ? (l(), s("i", {
              key: 0,
              class: k(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (l(), s("i", Te, A(P.value), 1)) : a("", !0),
            e.img ? (l(), s("img", {
              key: 2,
              src: e.img,
              alt: g.value
            }, null, 8, ge)) : a("", !0),
            g.value ? (l(), s(z, { key: 3 }, [
              X(A(g.value), 1)
            ], 64)) : a("", !0),
            Y(H).default ? I(e.$slots, "default", { key: 4 }) : a("", !0),
            v.value ? (l(), y(n, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), s("button", {
          key: 1,
          class: k(["lkt-button", _.value]),
          ref_key: "button",
          ref: V,
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          tabindex: e.tabindex,
          onClick: W,
          onFocus: le,
          onBlur: ae
        }, [
          e.icon ? (l(), s("i", {
            key: 0,
            class: k(e.icon)
          }, null, 2)) : a("", !0),
          e.icon && e.iconDot ? (l(), s("i", Ee, A(P.value), 1)) : a("", !0),
          e.img ? (l(), s("img", {
            key: 2,
            src: e.img,
            alt: g.value
          }, null, 8, Be)) : a("", !0),
          g.value ? (l(), s(z, { key: 3 }, [
            X(A(g.value), 1)
          ], 64)) : a("", !0),
          Y(H).default ? I(e.$slots, "default", { key: 4 }) : a("", !0),
          v.value ? (l(), y(n, { key: 5 })) : a("", !0),
          e.showSwitch || e.hiddenSwitch ? ue((l(), y(ie, {
            key: 6,
            type: "switch",
            modelValue: p.value,
            "onUpdate:modelValue": u[0] || (u[0] = (c) => p.value = c)
          }, null, 8, ["modelValue"])), [
            [se, !e.hiddenSwitch]
          ]) : a("", !0),
          e.iconEnd ? (l(), s("i", {
            key: 7,
            class: k([e.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : a("", !0),
          e.split ? (l(), s("div", Re, [
            e.splitIcon ? (l(), s("i", {
              key: 0,
              class: k(e.splitIcon)
            }, null, 2)) : ee.value ? (l(), y(fe(oe.value), { key: 1 })) : a("", !0)
          ])) : a("", !0)
        ], 42, De)),
        e.split && b.value ? (l(), y(j, {
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": u[1] || (u[1] = (c) => B.value = c),
          referrer: b.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: k(["lkt-split-button-dropdown-content", e.splitClass])
        }, {
          default: N(({ doClose: c }) => [
            I(e.$slots, "split", { doClose: c })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : a("", !0),
        e.tooltip && b.value ? (l(), y(j, {
          key: 3,
          modelValue: f.value,
          "onUpdate:modelValue": u[2] || (u[2] = (c) => f.value = c),
          referrer: b.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: k(e.tooltipClass),
          "location-x": e.tooltipLocationX,
          "location-y": e.tooltipLocationY
        }, ce({ _: 2 }, [
          te.value ? {
            name: "default",
            fn: N(({ doClose: c }) => [
              I(e.$slots, "tooltip", { doClose: c })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : a("", !0)
      ], 34);
    };
  }
}), ze = {
  install: (t) => {
    t.component("lkt-tooltip") === void 0 && t.use(he), t.component("lkt-field") === void 0 && t.use(ye), t.component("lkt-anchor") === void 0 && t.use(be), t.component("lkt-loader") === void 0 && t.use(we), t.component("lkt-button") === void 0 && t.component("lkt-button", Le);
  }
}, Xe = (t) => {
  m.defaultSplitIcon = t;
};
export {
  je as debugLktButton,
  ze as default,
  We as setDefaultButtonPalette,
  Xe as setDefaultButtonSplitSlot
};
