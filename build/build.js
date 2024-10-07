import { defineComponent as oe, useSlots as le, ref as c, watch as R, computed as b, resolveComponent as L, openBlock as l, createElementBlock as r, normalizeClass as m, createBlock as C, withCtx as A, createCommentVNode as i, toDisplayString as S, Fragment as P, createTextVNode as K, unref as W, renderSlot as M, withDirectives as te, vShow as ae, resolveDynamicComponent as ie } from "vue";
import { createLktEvent as T } from "lkt-events";
import { generateRandomString as j } from "lkt-string-tools";
import { httpCall as ne } from "lkt-http-client";
import { openModal as re } from "lkt-modal";
import { openConfirm as ue } from "lkt-modal-confirm";
import { useRouter as se, useRoute as fe } from "vue-router";
import { __ as ce } from "lkt-i18n";
import de from "lkt-tooltip";
var X = /* @__PURE__ */ ((t) => (t.button = "button", t.submit = "submit", t.reset = "reset", t))(X || {});
const B = class B {
};
B.DEFAULT_PALETTE = "", B.debugEnabled = !1, B.defaultSplitIcon = void 0;
let d = B;
const Se = (t) => {
  d.DEFAULT_PALETTE = t;
}, Me = (t = !0) => {
  d.debugEnabled = t;
}, n = (...t) => {
  d.debugEnabled && console.info("[LktButton] ", ...t);
}, me = {
  key: 1,
  class: "lkt-button--icon-dot"
}, pe = ["src", "alt"], ke = ["name", "type", "disabled"], Ce = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ve = ["src", "alt"], he = {
  key: 8,
  class: "lkt-split-button-arrow"
}, ye = /* @__PURE__ */ oe({
  __name: "LktButton",
  props: {
    type: { default: X.button },
    name: { default: j(10) },
    onClickTo: { default: "" },
    onClickToExternal: { type: Boolean, default: !1 },
    class: { default: "" },
    containerClass: { default: "" },
    palette: { default: d.DEFAULT_PALETTE },
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
    iconDot: { type: [Boolean, String], default: !1 },
    iconEnd: { default: "" },
    img: { default: "" },
    newTab: { type: Boolean, default: !1 },
    download: { type: Boolean, default: !1 },
    downloadFileName: { default: "" },
    showSwitch: { type: Boolean, default: !1 },
    hiddenSwitch: { type: Boolean },
    tooltip: { type: Boolean, default: !1 },
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
    clickRef: { default: !1 }
  },
  emits: ["click", "loading", "loaded", "update:checked"],
  setup(t, { expose: Y, emit: z }) {
    const e = t, u = z, V = le(), I = se(), q = fe(), G = "lkt-button-" + j(), p = c(e.loading), D = c(null), J = c(null), g = c(!1), k = c(!1), H = c(!1), v = c(!1), h = c(void 0), y = c(e.checked), N = () => {
      if (!e.onClickTo) return;
      let o = I.currentRoute;
      H.value = o.value.path === e.onClickTo;
    };
    R(q, (o) => {
      N();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const Q = b(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), p.value && o.push("is-loading"), H.value && o.push("is-active-route"), k.value && o.push("show-tooltip"), g.value && o.push("show-split"), o.join(" ");
    }), Z = b(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), w = b(() => e.text.startsWith("__:") ? ce(e.text.substring(3)) : e.text), $ = b(() => typeof d.defaultSplitIcon < "u"), _ = b(() => d.defaultSplitIcon), O = b(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), E = async (o) => (n("Resource Click", e.resource, e.resourceData), p.value = !0, u("loading"), ne(e.resource, e.resourceData).then((a) => {
      p.value = !1, u("loaded"), n("Resource Click -> Received response", a), u("click", o, a);
    }).catch((a) => {
      p.value = !1, u("loaded"), n("Resource Click -> Received response error", a), u("click", o, a);
    })), F = (o) => {
      var a;
      if (n("Click"), o && (e.showSwitch || e.hiddenSwitch ? (a = o.target) != null && a.closest(".lkt-field-switch") || (y.value = !y.value) : e.tooltip ? k.value = !k.value : g.value = !g.value), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        u("click", o, T(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (n("Click -> has modal", e.confirmModal, e.modalData), n("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let s = e.modalData.beforeClose.bind({});
          n("Click -> Has beforeClose function: ", s), e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o).then(() => {
                s();
              });
            s(), u("click", o, T(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o);
            u("click", o, T(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return re(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let s = e.confirmData.onConfirm;
          n("Click -> Has onConfirm function: ", s), e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o).then(() => {
                s();
              });
            s(), u("click", o, T(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || I.push(e.onClickTo);
              return;
            }
            u("click", o, T(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return ue(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return n("Click -> has resource"), E(o);
      if (n("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : I.push(e.onClickTo);
        return;
      }
      u("click", o, T(e.name, e.value));
    };
    return R(() => e.loading, () => p.value = e.loading), R(() => e.checked, () => y.value = e.checked), R(y, (o) => u("update:checked", o)), R(v, (o) => {
      v.value && e.showTooltipOnHover ? (h.value !== void 0 && clearTimeout(h.value), h.value = setTimeout(() => {
        k.value = !0, clearTimeout(h.value);
      }, e.showTooltipOnHoverDelay)) : !v.value && e.hideTooltipOnLeave ? (k.value = !1, clearTimeout(h.value)) : v.value || clearTimeout(h.value);
    }), N(), Y({
      click: () => F(null)
    }), (o, a) => {
      const s = L("lkt-spinner"), x = L("lkt-anchor"), ee = L("lkt-field-switch"), U = L("lkt-tooltip");
      return l(), r("div", {
        class: m(["lkt-button-container", Z.value]),
        ref_key: "container",
        ref: D,
        id: G,
        onMousemove: a[3] || (a[3] = (f) => v.value = !0),
        onMouseleave: a[4] || (a[4] = (f) => v.value = !1)
      }, [
        o.isAnchor ? (l(), C(x, {
          key: 0,
          class: "lkt-button",
          href: o.onClickToExternal ? o.onClickTo : "",
          to: o.onClickToExternal ? "" : o.onClickTo,
          download: o.download,
          target: o.newTab ? "_blank" : "",
          "download-file-name": o.downloadFileName,
          imposter: ""
        }, {
          default: A(() => [
            o.icon ? (l(), r("i", {
              key: 0,
              class: m(o.icon)
            }, null, 2)) : i("", !0),
            o.icon && o.iconDot ? (l(), r("i", me, S(O.value), 1)) : i("", !0),
            o.img ? (l(), r("img", {
              key: 2,
              src: o.img,
              alt: w.value
            }, null, 8, pe)) : i("", !0),
            w.value ? (l(), r(P, { key: 3 }, [
              K(S(w.value), 1)
            ], 64)) : i("", !0),
            W(V).default ? M(o.$slots, "default", { key: 4 }) : i("", !0),
            p.value ? (l(), C(s, { key: 5 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), r("button", {
          key: 1,
          class: m(["lkt-button", Q.value]),
          ref_key: "button",
          ref: J,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: F
        }, [
          o.icon ? (l(), r("i", {
            key: 0,
            class: m(o.icon)
          }, null, 2)) : i("", !0),
          o.icon && o.iconDot ? (l(), r("i", Ce, S(O.value), 1)) : i("", !0),
          o.img ? (l(), r("img", {
            key: 2,
            src: o.img,
            alt: w.value
          }, null, 8, ve)) : i("", !0),
          w.value ? (l(), r(P, { key: 3 }, [
            K(S(w.value), 1)
          ], 64)) : i("", !0),
          W(V).default ? M(o.$slots, "default", { key: 4 }) : i("", !0),
          p.value ? (l(), C(s, { key: 5 })) : i("", !0),
          o.showSwitch || o.hiddenSwitch ? te((l(), C(ee, {
            key: 6,
            modelValue: y.value,
            "onUpdate:modelValue": a[0] || (a[0] = (f) => y.value = f)
          }, null, 8, ["modelValue"])), [
            [ae, !o.hiddenSwitch]
          ]) : i("", !0),
          o.iconEnd ? (l(), r("i", {
            key: 7,
            class: m([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : i("", !0),
          o.split ? (l(), r("div", he, [
            o.splitIcon ? (l(), r("i", {
              key: 0,
              class: m(o.splitIcon)
            }, null, 2)) : $.value ? (l(), C(ie(_.value), { key: 1 })) : i("", !0)
          ])) : i("", !0)
        ], 10, ke)),
        o.split && D.value ? (l(), C(U, {
          key: 2,
          modelValue: g.value,
          "onUpdate:modelValue": a[1] || (a[1] = (f) => g.value = f),
          referrer: D.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: m(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: A(({ doClose: f }) => [
            M(o.$slots, "split", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : i("", !0),
        o.tooltip && D.value ? (l(), C(U, {
          key: 3,
          modelValue: k.value,
          "onUpdate:modelValue": a[2] || (a[2] = (f) => k.value = f),
          referrer: D.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: m(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, {
          default: A(({ doClose: f }) => [
            M(o.$slots, "tooltip", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : i("", !0)
      ], 34);
    };
  }
}), Ie = {
  install: (t) => {
    t.component("lkt-tooltip") === void 0 && t.use(de), t.component("lkt-button") === void 0 && t.component("lkt-button", ye);
  }
}, Ae = (t) => {
  d.defaultSplitIcon = t;
};
export {
  Me as debugLktButton,
  Ie as default,
  Se as setDefaultButtonPalette,
  Ae as setDefaultButtonSplitSlot
};
