import { defineComponent as se, useSlots as fe, ref as f, watch as y, computed as k, resolveComponent as M, openBlock as l, createElementBlock as s, normalizeClass as v, createBlock as b, withCtx as N, createCommentVNode as t, toDisplayString as I, Fragment as j, createTextVNode as X, unref as Y, renderSlot as A, withDirectives as ce, vShow as de, resolveDynamicComponent as pe, createSlots as q } from "vue";
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
}, we = ["src", "alt"], Te = ["name", "type", "disabled", "tabindex"], ge = {
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
    const e = a, n = Z, O = fe(), R = Ce(), $ = he(), _ = "lkt-button-" + G(), C = f(e.loading), h = f(null), V = f(null), w = f(!1), c = f(e.openTooltip), H = f(!1), T = f(!1), g = f(void 0), m = f(e.checked), F = f(!1);
    y(() => e.openTooltip, (o) => c.value = o), y(c, (o) => n("update:openTooltip", o));
    const U = () => {
      if (!e.onClickTo) return;
      let o = R == null ? void 0 : R.currentRoute;
      H.value = o.value.path === e.onClickTo;
    };
    y($, (o) => {
      U();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const x = k(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), C.value && o.push("is-loading"), H.value && o.push("is-active-route"), c.value && o.push("show-tooltip"), w.value && o.push("show-split"), m.value && o.push("is-checked"), o.join(" ");
    }), ee = k(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), D = k(() => {
      let o = String(e.text);
      return o.startsWith("__:") ? ye(o.substring(3)) : o;
    }), oe = k(() => typeof p.defaultSplitIcon < "u"), le = k(() => p.defaultSplitIcon), P = k(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), S = async (o) => {
      r("Resource Click", e.resource, e.resourceData), C.value = !0, n("loading");
      let u = { ...e.resourceData, isChecked: m.value };
      return me(e.resource, u).then((i) => {
        C.value = !1, n("loaded"), r("Resource Click -> Received response", i), n("click", o, i);
      }).catch((i) => {
        C.value = !1, n("loaded"), r("Resource Click -> Received response error", i), n("click", o, i);
      });
    }, K = f(!1), te = k(() => h.value ? e.tooltip === "lazy" ? K.value : e.tooltip === "ever" ? c.value : e.tooltip === !0 : !1), ae = f(!1), ne = k(() => h.value ? e.split === "lazy" ? ae.value : e.split === "ever" ? w.value : e.split === !0 : !1), ie = (o) => {
      if (F.value) {
        F.value = !1, n("focus");
        return;
      }
      n("focus", o);
    }, re = (o) => n("blur", o), W = (o) => {
      var u;
      if (r("Click"), o && (e.showSwitch || e.hiddenSwitch ? (u = o.target) != null && u.closest(".lkt-field.is-switch") || (m.value = !m.value) : e.tooltip ? (c.value = !c.value, c.value && (K.value = !0)) : e.split && (w.value = !w.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        n("click", o, E(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (r("Click -> has modal", e.confirmModal, e.modalData), r("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let B = e.modalData.beforeClose.bind({});
          r("Click -> Has beforeClose function: ", B), e.modalData.beforeClose = () => {
            if (e.resource)
              return S(o).then(() => {
                B();
              });
            B(), n("click", o, E(e.name, e.value));
          }, r("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return S(o);
            n("click", o, E(e.name, e.value));
          }, r("Click -> New beforeClose function: ", e.modalData.beforeClose);
        let i = e.modal;
        return typeof e.modal == "function" && (i = e.modal()), ke(i, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (r("Click -> has confirm modal", e.confirmModal, e.confirmData), r("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let i = e.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", i), e.confirmData.onConfirm = () => {
            if (e.resource)
              return S(o).then(() => {
                i();
              });
            i(), n("click", o, E(e.name, e.value));
          }, r("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return S(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || R.push(e.onClickTo);
              return;
            }
            n("click", o, E(e.name, e.value));
          }, r("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return ve(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return r("Click -> has resource"), S(o);
      if (r("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : R.push(e.onClickTo);
        return;
      }
      n("click", o, E(e.name, e.value));
    };
    return y(() => e.loading, () => C.value = e.loading), y(() => e.checked, () => m.value = e.checked), y(m, (o) => n("update:checked", o)), y(T, (o) => {
      T.value && e.showTooltipOnHover ? (g.value !== void 0 && clearTimeout(g.value), g.value = setTimeout(() => {
        c.value = !0, clearTimeout(g.value);
      }, e.showTooltipOnHoverDelay)) : !T.value && e.hideTooltipOnLeave ? (c.value = !1, clearTimeout(g.value)) : T.value || clearTimeout(g.value);
    }), U(), Q({
      click: () => W(null),
      focus: (o) => {
        V.value && (o && (F.value = !0), V.value.focus());
      }
    }), (o, u) => {
      const i = M("lkt-spinner"), B = M("lkt-anchor"), ue = M("lkt-field"), z = M("lkt-tooltip");
      return l(), s("div", {
        class: v(["lkt-button-container", ee.value]),
        ref_key: "container",
        ref: h,
        id: _,
        onMousemove: u[3] || (u[3] = (d) => T.value = !0),
        onMouseleave: u[4] || (u[4] = (d) => T.value = !1)
      }, [
        o.isAnchor ? (l(), b(B, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: N(() => [
            o.icon ? (l(), s("i", {
              key: 0,
              class: v(o.icon)
            }, null, 2)) : t("", !0),
            o.icon && o.iconDot ? (l(), s("i", be, I(P.value), 1)) : t("", !0),
            o.img ? (l(), s("img", {
              key: 2,
              src: o.img,
              alt: D.value
            }, null, 8, we)) : t("", !0),
            D.value ? (l(), s(j, { key: 3 }, [
              X(I(D.value), 1)
            ], 64)) : t("", !0),
            Y(O).default ? A(o.$slots, "default", { key: 4 }) : t("", !0),
            C.value ? (l(), b(i, { key: 5 })) : t("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), s("button", {
          key: 1,
          class: v(["lkt-button", x.value]),
          ref_key: "button",
          ref: V,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          tabindex: o.tabindex,
          onClick: W,
          onFocus: ie,
          onBlur: re
        }, [
          o.icon ? (l(), s("i", {
            key: 0,
            class: v(o.icon)
          }, null, 2)) : t("", !0),
          o.icon && o.iconDot ? (l(), s("i", ge, I(P.value), 1)) : t("", !0),
          o.img ? (l(), s("img", {
            key: 2,
            src: o.img,
            alt: D.value
          }, null, 8, De)) : t("", !0),
          D.value ? (l(), s(j, { key: 3 }, [
            X(I(D.value), 1)
          ], 64)) : t("", !0),
          Y(O).default ? A(o.$slots, "default", { key: 4 }) : t("", !0),
          C.value ? (l(), b(i, { key: 5 })) : t("", !0),
          o.showSwitch || o.hiddenSwitch ? ce((l(), b(ue, {
            key: 6,
            type: "switch",
            modelValue: m.value,
            "onUpdate:modelValue": u[0] || (u[0] = (d) => m.value = d)
          }, null, 8, ["modelValue"])), [
            [de, !o.hiddenSwitch]
          ]) : t("", !0),
          o.iconEnd ? (l(), s("i", {
            key: 7,
            class: v([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : t("", !0),
          o.split ? (l(), s("div", Ee, [
            o.splitIcon ? (l(), s("i", {
              key: 0,
              class: v(o.splitIcon)
            }, null, 2)) : oe.value ? (l(), b(pe(le.value), { key: 1 })) : t("", !0)
          ])) : t("", !0)
        ], 42, Te)),
        o.split && h.value ? (l(), b(z, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": u[1] || (u[1] = (d) => w.value = d),
          referrer: h.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", o.splitClass])
        }, q({ _: 2 }, [
          ne.value ? {
            name: "default",
            fn: N(({ doClose: d }) => [
              A(o.$slots, "split", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : t("", !0),
        o.tooltip && h.value ? (l(), b(z, {
          key: 3,
          modelValue: c.value,
          "onUpdate:modelValue": u[2] || (u[2] = (d) => c.value = d),
          referrer: h.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: v(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, q({ _: 2 }, [
          te.value ? {
            name: "default",
            fn: N(({ doClose: d }) => [
              A(o.$slots, "tooltip", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : t("", !0)
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
