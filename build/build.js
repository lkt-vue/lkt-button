import { defineComponent as se, useSlots as fe, ref as f, watch as y, computed as k, resolveComponent as M, openBlock as t, createElementBlock as s, normalizeClass as v, createBlock as b, withCtx as N, createCommentVNode as l, toDisplayString as I, Fragment as j, createTextVNode as X, unref as Y, renderSlot as A, withDirectives as ce, vShow as de, resolveDynamicComponent as pe, createSlots as q } from "vue";
import { createLktEvent as E } from "lkt-events";
import { generateRandomString as G } from "lkt-string-tools";
import { httpCall as me } from "lkt-http-client";
import { openModal as ke } from "lkt-modal";
import { openConfirm as ve } from "lkt-modal-confirm";
import { useRouter as Ce, useRoute as he } from "vue-router";
import { __ as ye } from "lkt-i18n";
var J = /* @__PURE__ */ ((a) => (a.button = "button", a.submit = "submit", a.reset = "reset", a))(J || {});
const L = class L {
};
L.DEFAULT_PALETTE = "", L.debugEnabled = !1, L.defaultSplitIcon = void 0;
let p = L;
const Ne = (a) => {
  p.DEFAULT_PALETTE = a;
}, Oe = (a = !0) => {
  p.debugEnabled = a;
}, r = (...a) => {
  p.debugEnabled && console.info("[LktButton] ", ...a);
}, be = {
  key: 1,
  class: "lkt-button--icon-dot"
}, we = ["src", "alt"], ge = ["name", "type", "disabled", "tabindex"], Te = {
  key: 1,
  class: "lkt-button--icon-dot"
}, De = ["src", "alt"], Ee = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Re = /* @__PURE__ */ se({
  __name: "LktButton",
  props: {
    type: { default: J.button },
    name: { default: G(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: p.DEFAULT_PALETTE },
    value: { default: "" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    wrapContent: { type: Boolean, default: !1 },
    split: { type: [Boolean, String], default: !1 },
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
    tooltipEngine: {},
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
  setup(a, { expose: Q, emit: Z }) {
    const o = a, n = Z, O = fe(), R = Ce(), $ = he(), _ = "lkt-button-" + G(), C = f(o.loading), h = f(null), V = f(null), w = f(!1), c = f(o.openTooltip), H = f(!1), g = f(!1), T = f(void 0), m = f(o.checked), F = f(!1);
    y(() => o.openTooltip, (e) => c.value = e), y(c, (e) => n("update:openTooltip", e));
    const U = () => {
      if (!o.onClickTo) return;
      let e = R == null ? void 0 : R.currentRoute;
      H.value = e.value.path === o.onClickTo;
    };
    y($, (e) => {
      U();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const x = k(() => {
      let e = [];
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), C.value && e.push("is-loading"), H.value && e.push("is-active-route"), c.value && e.push("show-tooltip"), w.value && e.push("show-split"), m.value && e.push("is-checked"), e.join(" ");
    }), ee = k(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), D = k(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? ye(e.substring(3)) : e;
    }), oe = k(() => typeof p.defaultSplitIcon < "u"), te = k(() => p.defaultSplitIcon), P = k(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), S = async (e) => {
      r("Resource Click", o.resource, o.resourceData), C.value = !0, n("loading");
      let u = { ...o.resourceData, isChecked: m.value };
      return me(o.resource, u).then((i) => {
        C.value = !1, n("loaded"), r("Resource Click -> Received response", i), n("click", e, i);
      }).catch((i) => {
        C.value = !1, n("loaded"), r("Resource Click -> Received response error", i), n("click", e, i);
      });
    }, K = f(!1), le = k(() => h.value ? o.tooltip === "lazy" ? K.value : o.tooltip === "ever" ? c.value : o.tooltip === !0 : !1), ae = f(!1), ne = k(() => h.value ? o.split === "lazy" ? ae.value : o.split === "ever" ? w.value : o.split === !0 : !1), ie = (e) => {
      if (F.value) {
        F.value = !1, n("focus");
        return;
      }
      n("focus", e);
    }, re = (e) => n("blur", e), W = (e) => {
      var u;
      if (r("Click"), e && (o.showSwitch || o.hiddenSwitch ? (u = e.target) != null && u.closest(".lkt-field.is-switch") || (m.value = !m.value) : o.tooltip ? (c.value = !c.value, c.value && (K.value = !0)) : o.split && (w.value = !w.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
        n("click", e, E(o.name, o.value));
        return;
      }
      if (o.modal) {
        if (r("Click -> has modal", o.confirmModal, o.modalData), r("Click -> typeof beforeClose: ", typeof o.modalData.beforeClose), typeof o.modalData.beforeClose == "function") {
          let B = o.modalData.beforeClose.bind({});
          r("Click -> Has beforeClose function: ", B), o.modalData.beforeClose = () => {
            if (o.resource)
              return S(e).then(() => {
                B();
              });
            B(), n("click", e, E(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        } else
          o.modalData.beforeClose = () => {
            if (o.resource)
              return S(e);
            n("click", e, E(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        let i = o.modal;
        return typeof o.modal == "function" && (i = o.modal()), ke(i, o.modalKey, o.modalData);
      }
      if (o.confirmModal) {
        if (r("Click -> has confirm modal", o.confirmModal, o.confirmData), r("Click -> typeof onConfirm: ", typeof o.confirmData.onConfirm), typeof o.confirmData.onConfirm == "function") {
          let i = o.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", i), o.confirmData.onConfirm = () => {
            if (o.resource)
              return S(e).then(() => {
                i();
              });
            i(), n("click", e, E(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        } else
          o.confirmData.onConfirm = () => {
            if (o.resource)
              return S(e);
            if (o.onClickTo !== "") {
              e && (e.preventDefault(), e.stopPropagation()), o.onClickToExternal || R.push(o.onClickTo);
              return;
            }
            n("click", e, E(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        return ve(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return r("Click -> has resource"), S(e);
      if (r("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : R.push(o.onClickTo);
        return;
      }
      n("click", e, E(o.name, o.value));
    };
    return y(() => o.loading, () => C.value = o.loading), y(() => o.checked, () => m.value = o.checked), y(m, (e) => n("update:checked", e)), y(g, (e) => {
      g.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        c.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !g.value && o.hideTooltipOnLeave ? (c.value = !1, clearTimeout(T.value)) : g.value || clearTimeout(T.value);
    }), U(), Q({
      click: () => W(null),
      focus: (e) => {
        V.value && (e && (F.value = !0), V.value.focus());
      }
    }), (e, u) => {
      const i = M("lkt-spinner"), B = M("lkt-anchor"), ue = M("lkt-field"), z = M("lkt-tooltip");
      return t(), s("div", {
        class: v(["lkt-button-container", ee.value]),
        ref_key: "container",
        ref: h,
        id: _,
        onMousemove: u[3] || (u[3] = (d) => g.value = !0),
        onMouseleave: u[4] || (u[4] = (d) => g.value = !1)
      }, [
        e.isAnchor ? (t(), b(B, {
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
            e.icon ? (t(), s("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : l("", !0),
            e.icon && e.iconDot ? (t(), s("i", be, I(P.value), 1)) : l("", !0),
            e.img ? (t(), s("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, we)) : l("", !0),
            D.value ? (t(), s(j, { key: 3 }, [
              X(I(D.value), 1)
            ], 64)) : l("", !0),
            Y(O).default ? A(e.$slots, "default", { key: 4 }) : l("", !0),
            C.value ? (t(), b(i, { key: 5 })) : l("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (t(), s("button", {
          key: 1,
          class: v(["lkt-button", x.value]),
          ref_key: "button",
          ref: V,
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          tabindex: e.tabindex,
          onClick: W,
          onFocus: ie,
          onBlur: re
        }, [
          e.icon ? (t(), s("i", {
            key: 0,
            class: v(e.icon)
          }, null, 2)) : l("", !0),
          e.icon && e.iconDot ? (t(), s("i", Te, I(P.value), 1)) : l("", !0),
          e.img ? (t(), s("img", {
            key: 2,
            src: e.img,
            alt: D.value
          }, null, 8, De)) : l("", !0),
          D.value ? (t(), s(j, { key: 3 }, [
            X(I(D.value), 1)
          ], 64)) : l("", !0),
          Y(O).default ? A(e.$slots, "default", { key: 4 }) : l("", !0),
          C.value ? (t(), b(i, { key: 5 })) : l("", !0),
          e.showSwitch || e.hiddenSwitch ? ce((t(), b(ue, {
            key: 6,
            type: "switch",
            modelValue: m.value,
            "onUpdate:modelValue": u[0] || (u[0] = (d) => m.value = d)
          }, null, 8, ["modelValue"])), [
            [de, !e.hiddenSwitch]
          ]) : l("", !0),
          e.iconEnd ? (t(), s("i", {
            key: 7,
            class: v([e.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : l("", !0),
          e.split ? (t(), s("div", Ee, [
            e.splitIcon ? (t(), s("i", {
              key: 0,
              class: v(e.splitIcon)
            }, null, 2)) : oe.value ? (t(), b(pe(te.value), { key: 1 })) : l("", !0)
          ])) : l("", !0)
        ], 42, ge)),
        e.split && h.value ? (t(), b(z, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": u[1] || (u[1] = (d) => w.value = d),
          referrer: h.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", e.splitClass]),
          engine: e.tooltipEngine
        }, q({ _: 2 }, [
          ne.value ? {
            name: "default",
            fn: N(({ doClose: d }) => [
              A(e.$slots, "split", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : l("", !0),
        e.tooltip && h.value ? (t(), b(z, {
          key: 3,
          modelValue: c.value,
          "onUpdate:modelValue": u[2] || (u[2] = (d) => c.value = d),
          referrer: h.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(e.tooltipClass),
          "location-x": e.tooltipLocationX,
          "location-y": e.tooltipLocationY,
          engine: e.tooltipEngine
        }, q({ _: 2 }, [
          le.value ? {
            name: "default",
            fn: N(({ doClose: d }) => [
              A(e.$slots, "tooltip", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : l("", !0)
      ], 34);
    };
  }
}), He = {
  install: (a) => {
    a.component("lkt-button") === void 0 && a.component("lkt-button", Re);
  }
}, Ue = (a) => {
  p.defaultSplitIcon = a;
};
export {
  Oe as debugLktButton,
  He as default,
  Ne as setDefaultButtonPalette,
  Ue as setDefaultButtonSplitSlot
};
