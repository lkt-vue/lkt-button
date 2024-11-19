import { defineComponent as ce, useSlots as de, ref as s, watch as b, computed as p, resolveComponent as M, openBlock as t, createElementBlock as f, normalizeClass as v, createBlock as C, withCtx as I, createCommentVNode as a, toDisplayString as A, Fragment as X, createTextVNode as Y, unref as q, renderSlot as V, resolveDynamicComponent as G, withDirectives as pe, vShow as me, createSlots as J } from "vue";
import { createLktEvent as E } from "lkt-events";
import { generateRandomString as Q } from "lkt-string-tools";
import { httpCall as ke } from "lkt-http-client";
import { openModal as ve } from "lkt-modal";
import { openConfirm as Ce } from "lkt-modal-confirm";
import { useRouter as he, useRoute as ye } from "vue-router";
import { __ as be } from "lkt-i18n";
var O = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l.content = "content", l))(O || {});
const L = class L {
};
L.DEFAULT_PALETTE = "", L.debugEnabled = !1, L.defaultSplitIcon = void 0;
let m = L;
const Ne = (l) => {
  m.DEFAULT_PALETTE = l;
}, Oe = (l = !0) => {
  m.debugEnabled = l;
}, r = (...l) => {
  m.debugEnabled && console.info("[LktButton] ", ...l);
}, we = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ge = ["src", "alt"], Te = {
  key: 1,
  class: "lkt-button--icon-dot"
}, De = ["src", "alt"], Ee = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Re = /* @__PURE__ */ ce({
  __name: "LktButton",
  props: {
    type: { default: O.button },
    name: { default: Q(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: m.DEFAULT_PALETTE },
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
  setup(l, { expose: Z, emit: $ }) {
    const o = l, n = $, H = de(), R = he(), _ = ye(), x = "lkt-button-" + Q(), h = s(o.loading), y = s(null), F = s(null), w = s(!1), c = s(o.openTooltip), U = s(!1), g = s(!1), T = s(void 0), k = s(o.checked), N = s(!1);
    b(() => o.openTooltip, (e) => c.value = e), b(c, (e) => n("update:openTooltip", e));
    const P = () => {
      if (!o.onClickTo) return;
      let e = R == null ? void 0 : R.currentRoute;
      U.value = e.value.path === o.onClickTo;
    };
    b(_, (e) => {
      P();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const ee = p(() => {
      let e = [];
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), h.value && e.push("is-loading"), U.value && e.push("is-active-route"), c.value && e.push("show-tooltip"), w.value && e.push("show-split"), k.value && e.push("is-checked"), e.join(" ");
    }), oe = p(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), D = p(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? be(e.substring(3)) : e;
    }), te = p(() => typeof m.defaultSplitIcon < "u"), le = p(() => m.defaultSplitIcon), K = p(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), S = async (e) => {
      r("Resource Click", o.resource, o.resourceData), h.value = !0, n("loading");
      let u = { ...o.resourceData, isChecked: k.value };
      return ke(o.resource, u).then((i) => {
        h.value = !1, n("loaded"), r("Resource Click -> Received response", i), n("click", e, i);
      }).catch((i) => {
        h.value = !1, n("loaded"), r("Resource Click -> Received response error", i), n("click", e, i);
      });
    }, W = s(!1), ae = p(() => y.value ? o.tooltip === "lazy" ? W.value : o.tooltip === "ever" ? c.value : o.tooltip === !0 : !1), ne = s(!1), ie = p(() => y.value ? o.split === "lazy" ? ne.value : o.split === "ever" ? w.value : o.split === !0 : !1), re = (e) => {
      if (N.value) {
        N.value = !1, n("focus");
        return;
      }
      n("focus", e);
    }, ue = (e) => n("blur", e), z = (e) => {
      var u;
      if (r("Click"), e && (o.showSwitch || o.hiddenSwitch ? (u = e.target) != null && u.closest(".lkt-field.is-switch") || (k.value = !k.value) : o.tooltip ? (c.value = !c.value, c.value && (W.value = !0)) : o.split && (w.value = !w.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
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
        return typeof o.modal == "function" && (i = o.modal()), ve(i, o.modalKey, o.modalData);
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
        return Ce(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return r("Click -> has resource"), S(e);
      if (r("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : R.push(o.onClickTo);
        return;
      }
      n("click", e, E(o.name, o.value));
    };
    b(() => o.loading, () => h.value = o.loading), b(() => o.checked, () => k.value = o.checked), b(k, (e) => n("update:checked", e)), b(g, (e) => {
      g.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        c.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !g.value && o.hideTooltipOnLeave ? (c.value = !1, clearTimeout(T.value)) : g.value || clearTimeout(T.value);
    }), P(), Z({
      click: () => z(null),
      focus: (e) => {
        F.value && (e && (N.value = !0), F.value.focus());
      }
    });
    const se = p(() => o.type === O.content ? "div" : "button");
    return (e, u) => {
      const i = M("lkt-spinner"), B = M("lkt-anchor"), fe = M("lkt-field"), j = M("lkt-tooltip");
      return t(), f("div", {
        class: v(["lkt-button-container", oe.value]),
        ref_key: "container",
        ref: y,
        id: x,
        onMousemove: u[3] || (u[3] = (d) => g.value = !0),
        onMouseleave: u[4] || (u[4] = (d) => g.value = !1)
      }, [
        e.isAnchor ? (t(), C(B, {
          key: 0,
          class: "lkt-button",
          href: e.onClickToExternal ? e.onClickTo : "",
          to: e.onClickToExternal ? "" : e.onClickTo,
          download: e.download,
          target: e.newTab ? "_blank" : "",
          "download-file-name": e.downloadFileName,
          imposter: ""
        }, {
          default: I(() => [
            e.icon ? (t(), f("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (t(), f("i", we, A(K.value), 1)) : a("", !0),
            e.img ? (t(), f("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, ge)) : a("", !0),
            D.value ? (t(), f(X, { key: 3 }, [
              Y(A(D.value), 1)
            ], 64)) : a("", !0),
            q(H).default ? V(e.$slots, "default", { key: 4 }) : a("", !0),
            h.value ? (t(), C(i, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (t(), C(G(se.value), {
          key: 1,
          class: v(["lkt-button", ee.value]),
          ref_key: "button",
          ref: F,
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          tabindex: e.tabindex,
          onClick: z,
          onFocus: re,
          onBlur: ue
        }, {
          default: I(() => [
            e.icon ? (t(), f("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (t(), f("i", Te, A(K.value), 1)) : a("", !0),
            e.img ? (t(), f("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, De)) : a("", !0),
            D.value ? (t(), f(X, { key: 3 }, [
              Y(A(D.value), 1)
            ], 64)) : a("", !0),
            q(H).default ? V(e.$slots, "default", { key: 4 }) : a("", !0),
            h.value ? (t(), C(i, { key: 5 })) : a("", !0),
            e.showSwitch || e.hiddenSwitch ? pe((t(), C(fe, {
              key: 6,
              type: "switch",
              modelValue: k.value,
              "onUpdate:modelValue": u[0] || (u[0] = (d) => k.value = d)
            }, null, 8, ["modelValue"])), [
              [me, !e.hiddenSwitch]
            ]) : a("", !0),
            e.iconEnd ? (t(), f("i", {
              key: 7,
              class: v([e.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : a("", !0),
            e.split ? (t(), f("div", Ee, [
              e.splitIcon ? (t(), f("i", {
                key: 0,
                class: v(e.splitIcon)
              }, null, 2)) : te.value ? (t(), C(G(le.value), { key: 1 })) : a("", !0)
            ])) : a("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        e.split && y.value ? (t(), C(j, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": u[1] || (u[1] = (d) => w.value = d),
          referrer: y.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", e.splitClass]),
          engine: e.tooltipEngine
        }, J({ _: 2 }, [
          ie.value ? {
            name: "default",
            fn: I(({ doClose: d }) => [
              V(e.$slots, "split", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : a("", !0),
        e.tooltip && y.value ? (t(), C(j, {
          key: 3,
          modelValue: c.value,
          "onUpdate:modelValue": u[2] || (u[2] = (d) => c.value = d),
          referrer: y.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(e.tooltipClass),
          "location-x": e.tooltipLocationX,
          "location-y": e.tooltipLocationY,
          engine: e.tooltipEngine
        }, J({ _: 2 }, [
          ae.value ? {
            name: "default",
            fn: I(({ doClose: d }) => [
              V(e.$slots, "tooltip", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : a("", !0)
      ], 34);
    };
  }
}), He = {
  install: (l) => {
    l.component("lkt-button") === void 0 && l.component("lkt-button", Re);
  }
}, Ue = (l) => {
  m.defaultSplitIcon = l;
};
export {
  Oe as debugLktButton,
  He as default,
  Ne as setDefaultButtonPalette,
  Ue as setDefaultButtonSplitSlot
};
