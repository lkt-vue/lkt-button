import { defineComponent as ne, useSlots as re, ref as d, watch as C, computed as h, resolveComponent as S, openBlock as t, createElementBlock as s, normalizeClass as k, createBlock as y, withCtx as N, createCommentVNode as a, toDisplayString as L, Fragment as j, createTextVNode as z, unref as X, renderSlot as M, withDirectives as ue, vShow as se, resolveDynamicComponent as fe, createSlots as ce } from "vue";
import { createLktEvent as D } from "lkt-events";
import { generateRandomString as Y } from "lkt-string-tools";
import { httpCall as de } from "lkt-http-client";
import { openModal as pe } from "lkt-modal";
import { openConfirm as me } from "lkt-modal-confirm";
import { useRouter as ke, useRoute as ve } from "vue-router";
import { __ as Ce } from "lkt-i18n";
import he from "lkt-tooltip";
var q = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l))(q || {});
const R = class R {
};
R.DEFAULT_PALETTE = "", R.debugEnabled = !1, R.defaultSplitIcon = void 0;
let p = R;
const Fe = (l) => {
  p.DEFAULT_PALETTE = l;
}, He = (l = !0) => {
  p.debugEnabled = l;
}, r = (...l) => {
  p.debugEnabled && console.info("[LktButton] ", ...l);
}, ye = {
  key: 1,
  class: "lkt-button--icon-dot"
}, be = ["src", "alt"], we = ["name", "type", "disabled", "tabindex"], Te = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ge = ["src", "alt"], De = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Ee = /* @__PURE__ */ ne({
  __name: "LktButton",
  props: {
    type: { default: q.button },
    name: { default: Y(10) },
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
    modal: { default: "" },
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
  setup(l, { expose: G, emit: J }) {
    const o = l, n = J, F = re(), I = ke(), Q = ve(), Z = "lkt-button-" + Y(), v = d(o.loading), b = d(null), A = d(null), E = d(!1), f = d(o.openTooltip), H = d(!1), w = d(!1), T = d(void 0), m = d(o.checked), V = d(!1);
    C(() => o.openTooltip, (e) => f.value = e), C(f, (e) => n("update:openTooltip", e));
    const O = () => {
      if (!o.onClickTo) return;
      let e = I.currentRoute;
      H.value = e.value.path === o.onClickTo;
    };
    C(Q, (e) => {
      O();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const $ = h(() => {
      let e = [];
      return o.class && e.push(o.class), o.split && e.push("lkt-split-button"), o.palette && e.push(`lkt-button--${o.palette}`, `palette--${o.palette}`), v.value && e.push("is-loading"), H.value && e.push("is-active-route"), f.value && e.push("show-tooltip"), E.value && e.push("show-split"), m.value && e.push("is-checked"), e.join(" ");
    }), _ = h(() => {
      let e = [];
      return o.containerClass && e.push(o.containerClass), e.join(" ");
    }), g = h(() => {
      let e = String(o.text);
      return e.startsWith("__:") ? Ce(e.substring(3)) : e;
    }), x = h(() => typeof p.defaultSplitIcon < "u"), ee = h(() => p.defaultSplitIcon), U = h(() => typeof o.iconDot == "boolean" ? "" : o.iconDot), B = async (e) => {
      r("Resource Click", o.resource, o.resourceData), v.value = !0, n("loading");
      let u = { ...o.resourceData, isChecked: m.value };
      return de(o.resource, u).then((i) => {
        v.value = !1, n("loaded"), r("Resource Click -> Received response", i), n("click", e, i);
      }).catch((i) => {
        v.value = !1, n("loaded"), r("Resource Click -> Received response error", i), n("click", e, i);
      });
    }, P = d(!1), oe = h(() => b.value ? o.tooltip === "lazy" ? P.value : o.tooltip === "ever" ? f.value : o.tooltip === !0 : !1), te = (e) => {
      if (V.value) {
        V.value = !1, n("focus");
        return;
      }
      n("focus", e);
    }, le = (e) => n("blur", e), K = (e) => {
      var u;
      if (r("Click"), e && (o.showSwitch || o.hiddenSwitch ? (u = e.target) != null && u.closest(".lkt-field-switch") || (m.value = !m.value) : o.tooltip ? (f.value = !f.value, f.value && (P.value = !0)) : o.split && (E.value = !E.value)), typeof o.clickRef < "u" && (o.clickRef instanceof Element || o.clickRef && o.clickRef && typeof o.clickRef == "function") && o.clickRef.click(), o.split || o.tooltip) {
        n("click", e, D(o.name, o.value));
        return;
      }
      if (o.modal) {
        if (r("Click -> has modal", o.confirmModal, o.modalData), r("Click -> typeof beforeClose: ", typeof o.modalData.beforeClose), typeof o.modalData.beforeClose == "function") {
          let i = o.modalData.beforeClose.bind({});
          r("Click -> Has beforeClose function: ", i), o.modalData.beforeClose = () => {
            if (o.resource)
              return B(e).then(() => {
                i();
              });
            i(), n("click", e, D(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        } else
          o.modalData.beforeClose = () => {
            if (o.resource)
              return B(e);
            n("click", e, D(o.name, o.value));
          }, r("Click -> New beforeClose function: ", o.modalData.beforeClose);
        return pe(o.modal, o.modalKey, o.modalData);
      }
      if (o.confirmModal) {
        if (r("Click -> has confirm modal", o.confirmModal, o.confirmData), r("Click -> typeof onConfirm: ", typeof o.confirmData.onConfirm), typeof o.confirmData.onConfirm == "function") {
          let i = o.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", i), o.confirmData.onConfirm = () => {
            if (o.resource)
              return B(e).then(() => {
                i();
              });
            i(), n("click", e, D(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        } else
          o.confirmData.onConfirm = () => {
            if (o.resource)
              return B(e);
            if (o.onClickTo !== "") {
              e && (e.preventDefault(), e.stopPropagation()), o.onClickToExternal || I.push(o.onClickTo);
              return;
            }
            n("click", e, D(o.name, o.value));
          }, r("Click -> New onConfirm function: ", o.confirmData.onConfirm);
        return me(o.confirmModal, o.confirmModalKey, o.confirmData);
      }
      if (o.resource)
        return r("Click -> has resource"), B(e);
      if (r("Click -> Emit"), o.onClickTo !== "") {
        o.onClickToExternal ? window.location.href = o.onClickTo : I.push(o.onClickTo);
        return;
      }
      n("click", e, D(o.name, o.value));
    };
    return C(() => o.loading, () => v.value = o.loading), C(() => o.checked, () => m.value = o.checked), C(m, (e) => n("update:checked", e)), C(w, (e) => {
      w.value && o.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        f.value = !0, clearTimeout(T.value);
      }, o.showTooltipOnHoverDelay)) : !w.value && o.hideTooltipOnLeave ? (f.value = !1, clearTimeout(T.value)) : w.value || clearTimeout(T.value);
    }), O(), G({
      click: () => K(null),
      focus: (e) => {
        A.value && (e && (V.value = !0), A.value.focus());
      }
    }), (e, u) => {
      const i = S("lkt-spinner"), ae = S("lkt-anchor"), ie = S("lkt-field-switch"), W = S("lkt-tooltip");
      return t(), s("div", {
        class: k(["lkt-button-container", _.value]),
        ref_key: "container",
        ref: b,
        id: Z,
        onMousemove: u[3] || (u[3] = (c) => w.value = !0),
        onMouseleave: u[4] || (u[4] = (c) => w.value = !1)
      }, [
        e.isAnchor ? (t(), y(ae, {
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
              class: k(e.icon)
            }, null, 2)) : a("", !0),
            e.icon && e.iconDot ? (t(), s("i", ye, L(U.value), 1)) : a("", !0),
            e.img ? (t(), s("img", {
              key: 2,
              src: e.img,
              alt: g.value
            }, null, 8, be)) : a("", !0),
            g.value ? (t(), s(j, { key: 3 }, [
              z(L(g.value), 1)
            ], 64)) : a("", !0),
            X(F).default ? M(e.$slots, "default", { key: 4 }) : a("", !0),
            v.value ? (t(), y(i, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (t(), s("button", {
          key: 1,
          class: k(["lkt-button", $.value]),
          ref_key: "button",
          ref: A,
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          tabindex: e.tabindex,
          onClick: K,
          onFocus: te,
          onBlur: le
        }, [
          e.icon ? (t(), s("i", {
            key: 0,
            class: k(e.icon)
          }, null, 2)) : a("", !0),
          e.icon && e.iconDot ? (t(), s("i", Te, L(U.value), 1)) : a("", !0),
          e.img ? (t(), s("img", {
            key: 2,
            src: e.img,
            alt: g.value
          }, null, 8, ge)) : a("", !0),
          g.value ? (t(), s(j, { key: 3 }, [
            z(L(g.value), 1)
          ], 64)) : a("", !0),
          X(F).default ? M(e.$slots, "default", { key: 4 }) : a("", !0),
          v.value ? (t(), y(i, { key: 5 })) : a("", !0),
          e.showSwitch || e.hiddenSwitch ? ue((t(), y(ie, {
            key: 6,
            modelValue: m.value,
            "onUpdate:modelValue": u[0] || (u[0] = (c) => m.value = c)
          }, null, 8, ["modelValue"])), [
            [se, !e.hiddenSwitch]
          ]) : a("", !0),
          e.iconEnd ? (t(), s("i", {
            key: 7,
            class: k([e.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : a("", !0),
          e.split ? (t(), s("div", De, [
            e.splitIcon ? (t(), s("i", {
              key: 0,
              class: k(e.splitIcon)
            }, null, 2)) : x.value ? (t(), y(fe(ee.value), { key: 1 })) : a("", !0)
          ])) : a("", !0)
        ], 42, we)),
        e.split && b.value ? (t(), y(W, {
          key: 2,
          modelValue: E.value,
          "onUpdate:modelValue": u[1] || (u[1] = (c) => E.value = c),
          referrer: b.value,
          "window-margin": e.tooltipWindowMargin,
          "referrer-margin": e.tooltipReferrerMargin,
          class: k(["lkt-split-button-dropdown-content", e.splitClass])
        }, {
          default: N(({ doClose: c }) => [
            M(e.$slots, "split", { doClose: c })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : a("", !0),
        e.tooltip && b.value ? (t(), y(W, {
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
          oe.value ? {
            name: "default",
            fn: N(({ doClose: c }) => [
              M(e.$slots, "tooltip", { doClose: c })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : a("", !0)
      ], 34);
    };
  }
}), Oe = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.use(he), l.component("lkt-button") === void 0 && l.component("lkt-button", Ee);
  }
}, Ue = (l) => {
  p.defaultSplitIcon = l;
};
export {
  He as debugLktButton,
  Oe as default,
  Fe as setDefaultButtonPalette,
  Ue as setDefaultButtonSplitSlot
};
