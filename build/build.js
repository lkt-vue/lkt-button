import { defineComponent as ie, useSlots as re, ref as d, watch as C, computed as h, resolveComponent as M, openBlock as l, createElementBlock as s, normalizeClass as k, createBlock as y, withCtx as N, createCommentVNode as t, toDisplayString as I, Fragment as z, createTextVNode as X, unref as Y, renderSlot as A, withDirectives as ue, vShow as se, resolveDynamicComponent as fe, createSlots as ce } from "vue";
import { createLktEvent as D } from "lkt-events";
import { generateRandomString as q } from "lkt-string-tools";
import { httpCall as de } from "lkt-http-client";
import { openModal as pe } from "lkt-modal";
import { openConfirm as me } from "lkt-modal-confirm";
import { useRouter as ke, useRoute as ve } from "vue-router";
import { __ as Ce } from "lkt-i18n";
var G = /* @__PURE__ */ ((a) => (a.button = "button", a.submit = "submit", a.reset = "reset", a))(G || {});
const L = class L {
};
L.DEFAULT_PALETTE = "", L.debugEnabled = !1, L.defaultSplitIcon = void 0;
let p = L;
const Ve = (a) => {
  p.DEFAULT_PALETTE = a;
}, Fe = (a = !0) => {
  p.debugEnabled = a;
}, r = (...a) => {
  p.debugEnabled && console.info("[LktButton] ", ...a);
}, he = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ye = ["src", "alt"], be = ["name", "type", "disabled", "tabindex"], we = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Te = ["src", "alt"], ge = {
  key: 8,
  class: "lkt-split-button-arrow"
}, De = /* @__PURE__ */ ie({
  __name: "LktButton",
  props: {
    type: { default: G.button },
    name: { default: q(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: p.DEFAULT_PALETTE },
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
  setup(a, { expose: J, emit: Q }) {
    const o = a, n = Q, H = re(), E = ke(), Z = ve(), $ = "lkt-button-" + q(), v = d(o.loading), b = d(null), V = d(null), B = d(!1), f = d(o.openTooltip), O = d(!1), w = d(!1), T = d(void 0), m = d(o.checked), F = d(!1);
    C(() => o.openTooltip, (e) => f.value = e), C(f, (e) => n("update:openTooltip", e));
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
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), v.value && e.push("is-loading"), O.value && e.push("is-active-route"), f.value && e.push("show-tooltip"), B.value && e.push("show-split"), m.value && e.push("is-checked"), e.join(" ");
    }), x = h(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), g = h(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? Ce(e.substring(3)) : e;
    }), ee = h(() => typeof p.defaultSplitIcon < "u"), oe = h(() => p.defaultSplitIcon), P = h(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), R = async (e) => {
      r("Resource Click", o.resource, o.resourceData), v.value = !0, n("loading");
      let u = { ...o.resourceData, isChecked: m.value };
      return de(o.resource, u).then((i) => {
        v.value = !1, n("loaded"), r("Resource Click -> Received response", i), n("click", e, i);
      }).catch((i) => {
        v.value = !1, n("loaded"), r("Resource Click -> Received response error", i), n("click", e, i);
      });
    }, K = d(!1), le = h(() => b.value ? o.tooltip === "lazy" ? K.value : o.tooltip === "ever" ? f.value : o.tooltip === !0 : !1), te = (e) => {
      if (F.value) {
        F.value = !1, n("focus");
        return;
      }
      n("focus", e);
    }, ae = (e) => n("blur", e), W = (e) => {
      var u;
      if (r("Click"), e && (o.showSwitch || o.hiddenSwitch ? (u = e.target) != null && u.closest(".lkt-field.is-switch") || (m.value = !m.value) : o.tooltip ? (f.value = !f.value, f.value && (K.value = !0)) : o.split && (B.value = !B.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
        n("click", e, D(o.name, o.value));
        return;
      }
      if (o.modal) {
        if (r("Click -> has modal", o.confirmModal, o.modalData), r("Click -> typeof beforeClose: ", typeof o.modalData.beforeClose), typeof o.modalData.beforeClose == "function") {
          let S = o.modalData.beforeClose.bind({});
          r("Click -> Has beforeClose function: ", S), o.modalData.beforeClose = () => {
            if (o.resource)
              return R(e).then(() => {
                S();
              });
            S(), n("click", e, D(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        } else
          o.modalData.beforeClose = () => {
            if (o.resource)
              return R(e);
            n("click", e, D(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        let i = o.modal;
        return typeof o.modal == "function" && (i = o.modal()), pe(i, o.modalKey, o.modalData);
      }
      if (o.confirmModal) {
        if (r("Click -> has confirm modal", o.confirmModal, o.confirmData), r("Click -> typeof onConfirm: ", typeof o.confirmData.onConfirm), typeof o.confirmData.onConfirm == "function") {
          let i = o.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", i), o.confirmData.onConfirm = () => {
            if (o.resource)
              return R(e).then(() => {
                i();
              });
            i(), n("click", e, D(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        } else
          o.confirmData.onConfirm = () => {
            if (o.resource)
              return R(e);
            if (o.onClickTo !== "") {
              e && (e.preventDefault(), e.stopPropagation()), o.onClickToExternal || E.push(o.onClickTo);
              return;
            }
            n("click", e, D(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        return me(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return r("Click -> has resource"), R(e);
      if (r("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : E.push(o.onClickTo);
        return;
      }
      n("click", e, D(o.name, o.value));
    };
    return C(() => o.loading, () => v.value = o.loading), C(() => o.checked, () => m.value = o.checked), C(m, (e) => n("update:checked", e)), C(w, (e) => {
      w.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        f.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !w.value && o.hideTooltipOnLeave ? (f.value = !1, clearTimeout(T.value)) : w.value || clearTimeout(T.value);
    }), U(), J({
      click: () => W(null),
      focus: (e) => {
        V.value && (e && (F.value = !0), V.value.focus());
      }
    }), (e, u) => {
      const i = M("lkt-spinner"), S = M("lkt-anchor"), ne = M("lkt-field"), j = M("lkt-tooltip");
      return l(), s("div", {
        class: k(["lkt-button-container", x.value]),
        ref_key: "container",
        ref: b,
        id: $,
        onMousemove: u[3] || (u[3] = (c) => w.value = !0),
        onMouseleave: u[4] || (u[4] = (c) => w.value = !1)
      }, [
        e.isAnchor ? (l(), y(S, {
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
            }, null, 2)) : t("", !0),
            e.icon && e.iconDot ? (l(), s("i", he, I(P.value), 1)) : t("", !0),
            e.img ? (l(), s("img", {
              key: 2,
              src: e.img,
              alt: g.value
            }, null, 8, ye)) : t("", !0),
            g.value ? (l(), s(z, { key: 3 }, [
              X(I(g.value), 1)
            ], 64)) : t("", !0),
            Y(H).default ? A(e.$slots, "default", { key: 4 }) : t("", !0),
            v.value ? (l(), y(i, { key: 5 })) : t("", !0)
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
          onFocus: te,
          onBlur: ae
        }, [
          e.icon ? (l(), s("i", {
            key: 0,
            class: k(e.icon)
          }, null, 2)) : t("", !0),
          e.icon && e.iconDot ? (l(), s("i", we, I(P.value), 1)) : t("", !0),
          e.img ? (l(), s("img", {
            key: 2,
            src: e.img,
            alt: g.value
          }, null, 8, Te)) : t("", !0),
          g.value ? (l(), s(z, { key: 3 }, [
            X(I(g.value), 1)
          ], 64)) : t("", !0),
          Y(H).default ? A(e.$slots, "default", { key: 4 }) : t("", !0),
          v.value ? (l(), y(i, { key: 5 })) : t("", !0),
          e.showSwitch || e.hiddenSwitch ? ue((l(), y(ne, {
            key: 6,
            type: "switch",
            modelValue: m.value,
            "onUpdate:modelValue": u[0] || (u[0] = (c) => m.value = c)
          }, null, 8, ["modelValue"])), [
            [se, !e.hiddenSwitch]
          ]) : t("", !0),
          e.iconEnd ? (l(), s("i", {
            key: 7,
            class: k([e.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : t("", !0),
          e.split ? (l(), s("div", ge, [
            e.splitIcon ? (l(), s("i", {
              key: 0,
              class: k(e.splitIcon)
            }, null, 2)) : ee.value ? (l(), y(fe(oe.value), { key: 1 })) : t("", !0)
          ])) : t("", !0)
        ], 42, be)),
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
            A(e.$slots, "split", { doClose: c })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : t("", !0),
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
          le.value ? {
            name: "default",
            fn: N(({ doClose: c }) => [
              A(e.$slots, "tooltip", { doClose: c })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : t("", !0)
      ], 34);
    };
  }
}), Ne = {
  install: (a) => {
    a.component("lkt-button") === void 0 && a.component("lkt-button", De);
  }
}, He = (a) => {
  p.defaultSplitIcon = a;
};
export {
  Fe as debugLktButton,
  Ne as default,
  Ve as setDefaultButtonPalette,
  He as setDefaultButtonSplitSlot
};
