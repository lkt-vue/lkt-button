import { defineComponent as oe, useSlots as le, ref as c, watch as R, computed as b, resolveComponent as L, openBlock as l, createElementBlock as u, normalizeClass as p, createBlock as v, withCtx as A, createCommentVNode as a, toDisplayString as S, Fragment as P, createTextVNode as K, unref as W, renderSlot as M, withDirectives as te, vShow as ae, resolveDynamicComponent as ie } from "vue";
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
    iconDot: { type: [Boolean, String, Number], default: !1 },
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
    const e = t, s = z, V = le(), I = se(), q = fe(), G = "lkt-button-" + j(), k = c(e.loading), D = c(null), J = c(null), g = c(!1), C = c(!1), N = c(!1), h = c(!1), y = c(void 0), m = c(e.checked), H = () => {
      if (!e.onClickTo) return;
      let o = I.currentRoute;
      N.value = o.value.path === e.onClickTo;
    };
    R(q, (o) => {
      H();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const Q = b(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), k.value && o.push("is-loading"), N.value && o.push("is-active-route"), C.value && o.push("show-tooltip"), g.value && o.push("show-split"), m.value && o.push("is-checked"), o.join(" ");
    }), Z = b(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), w = b(() => e.text.startsWith("__:") ? ce(e.text.substring(3)) : e.text), $ = b(() => typeof d.defaultSplitIcon < "u"), _ = b(() => d.defaultSplitIcon), O = b(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), E = async (o) => {
      n("Resource Click", e.resource, e.resourceData), k.value = !0, s("loading");
      let r = { ...e.resourceData, isChecked: m.value };
      return ne(e.resource, r).then((i) => {
        k.value = !1, s("loaded"), n("Resource Click -> Received response", i), s("click", o, i);
      }).catch((i) => {
        k.value = !1, s("loaded"), n("Resource Click -> Received response error", i), s("click", o, i);
      });
    }, F = (o) => {
      var r;
      if (n("Click"), o && (e.showSwitch || e.hiddenSwitch ? (r = o.target) != null && r.closest(".lkt-field-switch") || (m.value = !m.value) : e.tooltip ? C.value = !C.value : g.value = !g.value), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        s("click", o, T(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (n("Click -> has modal", e.confirmModal, e.modalData), n("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let i = e.modalData.beforeClose.bind({});
          n("Click -> Has beforeClose function: ", i), e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o).then(() => {
                i();
              });
            i(), s("click", o, T(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o);
            s("click", o, T(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return re(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let i = e.confirmData.onConfirm;
          n("Click -> Has onConfirm function: ", i), e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o).then(() => {
                i();
              });
            i(), s("click", o, T(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || I.push(e.onClickTo);
              return;
            }
            s("click", o, T(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return ue(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return n("Click -> has resource"), E(o);
      if (n("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : I.push(e.onClickTo);
        return;
      }
      s("click", o, T(e.name, e.value));
    };
    return R(() => e.loading, () => k.value = e.loading), R(() => e.checked, () => m.value = e.checked), R(m, (o) => s("update:checked", o)), R(h, (o) => {
      h.value && e.showTooltipOnHover ? (y.value !== void 0 && clearTimeout(y.value), y.value = setTimeout(() => {
        C.value = !0, clearTimeout(y.value);
      }, e.showTooltipOnHoverDelay)) : !h.value && e.hideTooltipOnLeave ? (C.value = !1, clearTimeout(y.value)) : h.value || clearTimeout(y.value);
    }), H(), Y({
      click: () => F(null)
    }), (o, r) => {
      const i = L("lkt-spinner"), x = L("lkt-anchor"), ee = L("lkt-field-switch"), U = L("lkt-tooltip");
      return l(), u("div", {
        class: p(["lkt-button-container", Z.value]),
        ref_key: "container",
        ref: D,
        id: G,
        onMousemove: r[3] || (r[3] = (f) => h.value = !0),
        onMouseleave: r[4] || (r[4] = (f) => h.value = !1)
      }, [
        o.isAnchor ? (l(), v(x, {
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
            o.icon ? (l(), u("i", {
              key: 0,
              class: p(o.icon)
            }, null, 2)) : a("", !0),
            o.icon && o.iconDot ? (l(), u("i", me, S(O.value), 1)) : a("", !0),
            o.img ? (l(), u("img", {
              key: 2,
              src: o.img,
              alt: w.value
            }, null, 8, pe)) : a("", !0),
            w.value ? (l(), u(P, { key: 3 }, [
              K(S(w.value), 1)
            ], 64)) : a("", !0),
            W(V).default ? M(o.$slots, "default", { key: 4 }) : a("", !0),
            k.value ? (l(), v(i, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (l(), u("button", {
          key: 1,
          class: p(["lkt-button", Q.value]),
          ref_key: "button",
          ref: J,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: F
        }, [
          o.icon ? (l(), u("i", {
            key: 0,
            class: p(o.icon)
          }, null, 2)) : a("", !0),
          o.icon && o.iconDot ? (l(), u("i", Ce, S(O.value), 1)) : a("", !0),
          o.img ? (l(), u("img", {
            key: 2,
            src: o.img,
            alt: w.value
          }, null, 8, ve)) : a("", !0),
          w.value ? (l(), u(P, { key: 3 }, [
            K(S(w.value), 1)
          ], 64)) : a("", !0),
          W(V).default ? M(o.$slots, "default", { key: 4 }) : a("", !0),
          k.value ? (l(), v(i, { key: 5 })) : a("", !0),
          o.showSwitch || o.hiddenSwitch ? te((l(), v(ee, {
            key: 6,
            modelValue: m.value,
            "onUpdate:modelValue": r[0] || (r[0] = (f) => m.value = f)
          }, null, 8, ["modelValue"])), [
            [ae, !o.hiddenSwitch]
          ]) : a("", !0),
          o.iconEnd ? (l(), u("i", {
            key: 7,
            class: p([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : a("", !0),
          o.split ? (l(), u("div", he, [
            o.splitIcon ? (l(), u("i", {
              key: 0,
              class: p(o.splitIcon)
            }, null, 2)) : $.value ? (l(), v(ie(_.value), { key: 1 })) : a("", !0)
          ])) : a("", !0)
        ], 10, ke)),
        o.split && D.value ? (l(), v(U, {
          key: 2,
          modelValue: g.value,
          "onUpdate:modelValue": r[1] || (r[1] = (f) => g.value = f),
          referrer: D.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: p(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: A(({ doClose: f }) => [
            M(o.$slots, "split", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : a("", !0),
        o.tooltip && D.value ? (l(), v(U, {
          key: 3,
          modelValue: C.value,
          "onUpdate:modelValue": r[2] || (r[2] = (f) => C.value = f),
          referrer: D.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: p(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, {
          default: A(({ doClose: f }) => [
            M(o.$slots, "tooltip", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : a("", !0)
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
