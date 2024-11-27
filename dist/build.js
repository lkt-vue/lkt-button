import { defineComponent as ce, useSlots as de, ref as s, watch as b, computed as p, resolveComponent as I, openBlock as l, createElementBlock as f, normalizeClass as v, createBlock as C, withCtx as A, createCommentVNode as a, toDisplayString as V, Fragment as Y, createTextVNode as q, unref as G, renderSlot as F, resolveDynamicComponent as J, withDirectives as pe, vShow as me, createSlots as Q } from "vue";
import { createLktEvent as E } from "lkt-events";
import { generateRandomString as Z } from "lkt-string-tools";
import { httpCall as ke } from "lkt-http-client";
import { openModal as ve } from "lkt-modal";
import { openConfirm as Ce } from "lkt-modal-confirm";
import { useRouter as he, useRoute as ye } from "vue-router";
import { __ as be } from "lkt-i18n";
var H = /* @__PURE__ */ ((n) => (n.button = "button", n.submit = "submit", n.reset = "reset", n.content = "content", n))(H || {});
const B = class B {
};
B.DEFAULT_PALETTE = "", B.debugEnabled = !1, B.defaultSplitIcon = void 0;
let m = B;
const Ne = (n) => {
  m.DEFAULT_PALETTE = n;
}, Oe = (n = !0) => {
  m.debugEnabled = n;
}, u = (...n) => {
  m.debugEnabled && console.info("[LktButton] ", ...n);
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
    type: { default: H.button },
    name: { default: Z(10) },
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
  setup(n, { expose: $, emit: _ }) {
    const o = n, i = _, U = de(), R = he(), x = ye(), ee = "lkt-button-" + Z(), h = s(o.loading), y = s(null), N = s(null), w = s(!1), c = s(o.openTooltip), P = s(!1), g = s(!1), T = s(void 0), k = s(o.checked), O = s(!1);
    b(() => o.openTooltip, (e) => c.value = e), b(c, (e) => i("update:openTooltip", e));
    const K = () => {
      if (!o.onClickTo) return;
      let e = R == null ? void 0 : R.currentRoute;
      P.value = e.value.path === o.onClickTo;
    };
    b(x, (e) => {
      K();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const oe = p(() => {
      let e = [];
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), h.value && e.push("is-loading"), P.value && e.push("is-active-route"), c.value && e.push("show-tooltip"), w.value && e.push("show-split"), k.value && e.push("is-checked"), e.join(" ");
    }), te = p(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), D = p(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? be(e.substring(3)) : e;
    }), le = p(() => typeof m.defaultSplitIcon < "u"), ne = p(() => m.defaultSplitIcon), W = p(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), S = async (e) => {
      u("Resource Click", o.resource, o.resourceData), h.value = !0, i("loading");
      let r = { ...o.resourceData, isChecked: k.value };
      return ke(o.resource, r).then((t) => {
        h.value = !1, i("loaded"), u("Resource Click -> Received response", t), i("click", e, t);
      }).catch((t) => {
        h.value = !1, i("loaded"), u("Resource Click -> Received response error", t), i("click", e, t);
      });
    }, z = s(!1), ae = p(() => y.value ? o.tooltip === "lazy" ? z.value : o.tooltip === "ever" ? c.value : o.tooltip === !0 : !1), ie = s(!1), re = p(() => y.value ? o.split === "lazy" ? ie.value : o.split === "ever" ? w.value : o.split === !0 : !1), ue = (e) => {
      if (O.value) {
        O.value = !1, i("focus");
        return;
      }
      i("focus", e);
    }, se = (e) => i("blur", e), j = (e) => {
      var r;
      if (u("Click"), e && (o.showSwitch || o.hiddenSwitch ? (r = e.target) != null && r.closest(".lkt-field.is-switch") || (k.value = !k.value) : o.tooltip ? (c.value = !c.value, c.value && (z.value = !0)) : o.split && (w.value = !w.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
        i("click", e, E(o.name, o.value));
        return;
      }
      if (o.modal) {
        let t = { ...o.modalData };
        u("Click -> has modal", o.confirmModal, t), u("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (M) => {
          if (o.resource)
            return S(e).then(() => {
              o.modalData.beforeClose(M);
            });
          o.modalData.beforeClose(M), i("click", e, E(o.name, o.value));
        }, u("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (o.resource)
            return S(e);
          i("click", e, E(o.name, o.value));
        }, u("Click -> New beforeClose function: ", t.beforeClose));
        let L = o.modal;
        return typeof o.modal == "function" && (L = o.modal()), ve(L, o.modalKey, t);
      }
      if (o.confirmModal) {
        if (u("Click -> has confirm modal", o.confirmModal, o.confirmData), u("Click -> typeof onConfirm: ", typeof o.confirmData.onConfirm), typeof o.confirmData.onConfirm == "function") {
          let t = o.confirmData.onConfirm;
          u("Click -> Has onConfirm function: ", t), o.confirmData.onConfirm = () => {
            if (o.resource)
              return S(e).then(() => {
                t();
              });
            t(), i("click", e, E(o.name, o.value));
          }, u("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        } else
          o.confirmData.onConfirm = () => {
            if (o.resource)
              return S(e);
            if (o.onClickTo !== "") {
              e && (e.preventDefault(), e.stopPropagation()), o.onClickToExternal || R.push(o.onClickTo);
              return;
            }
            i("click", e, E(o.name, o.value));
          }, u("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        return Ce(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return u("Click -> has resource"), S(e);
      if (u("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : R.push(o.onClickTo);
        return;
      }
      i("click", e, E(o.name, o.value));
    };
    b(() => o.loading, () => h.value = o.loading), b(() => o.checked, () => k.value = o.checked), b(k, (e) => i("update:checked", e)), b(g, (e) => {
      g.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        c.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !g.value && o.hideTooltipOnLeave ? (c.value = !1, clearTimeout(T.value)) : g.value || clearTimeout(T.value);
    }), K(), $({
      click: () => j(null),
      focus: (e) => {
        N.value && (e && (O.value = !0), N.value.focus());
      }
    });
    const fe = p(() => o.type === H.content ? "div" : "button");
    return (e, r) => {
      const t = I("lkt-spinner"), L = I("lkt-anchor"), M = I("lkt-field"), X = I("lkt-tooltip");
      return l(), f("div", {
        class: v(["lkt-button-container", te.value]),
        ref_key: "container",
        ref: y,
        id: ee,
        onMousemove: r[3] || (r[3] = (d) => g.value = !0),
        onMouseleave: r[4] || (r[4] = (d) => g.value = !1)
      }, [
        e.isAnchor ? (l(), C(L, {
          key: 0,
          class: "lkt-button",
          href: e.onClickToExternal ? e.onClickTo : "",
          to: e.onClickToExternal ? "" : e.onClickTo,
          download: e.download,
          target: e.newTab ? "_blank" : "",
          "download-file-name": e.downloadFileName,
          imposter: ""
        }, {
          default: A(() => [
            e.icon ? (l(), f("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (l(), f("i", we, V(W.value), 1)) : a("", !0),
            e.img ? (l(), f("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, ge)) : a("", !0),
            D.value ? (l(), f(Y, { key: 3 }, [
              q(V(D.value), 1)
            ], 64)) : a("", !0),
            G(U).default ? F(e.$slots, "default", { key: 4 }) : a("", !0),
            h.value ? (l(), C(t, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), C(J(fe.value), {
          key: 1,
          class: v(["lkt-button", oe.value]),
          ref_key: "button",
          ref: N,
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          tabindex: e.tabindex,
          onClick: j,
          onFocus: ue,
          onBlur: se
        }, {
          default: A(() => [
            e.icon ? (l(), f("i", {
              key: 0,
              class: v(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (l(), f("i", Te, V(W.value), 1)) : a("", !0),
            e.img ? (l(), f("img", {
              key: 2,
              src: e.img,
              alt: D.value
            }, null, 8, De)) : a("", !0),
            D.value ? (l(), f(Y, { key: 3 }, [
              q(V(D.value), 1)
            ], 64)) : a("", !0),
            G(U).default ? F(e.$slots, "default", { key: 4 }) : a("", !0),
            h.value ? (l(), C(t, { key: 5 })) : a("", !0),
            e.showSwitch || e.hiddenSwitch ? pe((l(), C(M, {
              key: 6,
              type: "switch",
              modelValue: k.value,
              "onUpdate:modelValue": r[0] || (r[0] = (d) => k.value = d)
            }, null, 8, ["modelValue"])), [
              [me, !e.hiddenSwitch]
            ]) : a("", !0),
            e.iconEnd ? (l(), f("i", {
              key: 7,
              class: v([e.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : a("", !0),
            e.split ? (l(), f("div", Ee, [
              e.splitIcon ? (l(), f("i", {
                key: 0,
                class: v(e.splitIcon)
              }, null, 2)) : le.value ? (l(), C(J(ne.value), { key: 1 })) : a("", !0)
            ])) : a("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        e.split && y.value ? (l(), C(X, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": r[1] || (r[1] = (d) => w.value = d),
          referrer: y.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", e.splitClass]),
          engine: e.tooltipEngine
        }, Q({ _: 2 }, [
          re.value ? {
            name: "default",
            fn: A(({ doClose: d }) => [
              F(e.$slots, "split", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : a("", !0),
        e.tooltip && y.value ? (l(), C(X, {
          key: 3,
          modelValue: c.value,
          "onUpdate:modelValue": r[2] || (r[2] = (d) => c.value = d),
          referrer: y.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: v(e.tooltipClass),
          "location-x": e.tooltipLocationX,
          "location-y": e.tooltipLocationY,
          engine: e.tooltipEngine
        }, Q({ _: 2 }, [
          ae.value ? {
            name: "default",
            fn: A(({ doClose: d }) => [
              F(e.$slots, "tooltip", { doClose: d })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : a("", !0)
      ], 34);
    };
  }
}), He = {
  install: (n) => {
    n.component("lkt-button") === void 0 && n.component("lkt-button", Re);
  }
}, Ue = (n) => {
  m.defaultSplitIcon = n;
};
export {
  Oe as debugLktButton,
  He as default,
  Ne as setDefaultButtonPalette,
  Ue as setDefaultButtonSplitSlot
};
