import { defineComponent as le, useSlots as ae, ref as c, watch as R, computed as C, resolveComponent as S, openBlock as t, createElementBlock as u, normalizeClass as k, createBlock as h, withCtx as A, createCommentVNode as a, toDisplayString as L, Fragment as K, createTextVNode as W, unref as j, renderSlot as M, withDirectives as ie, vShow as ne, resolveDynamicComponent as re, createSlots as ue } from "vue";
import { createLktEvent as g } from "lkt-events";
import { generateRandomString as z } from "lkt-string-tools";
import { httpCall as se } from "lkt-http-client";
import { openModal as fe } from "lkt-modal";
import { openConfirm as ce } from "lkt-modal-confirm";
import { useRouter as de, useRoute as me } from "vue-router";
import { __ as pe } from "lkt-i18n";
import ke from "lkt-tooltip";
var X = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l))(X || {});
const B = class B {
};
B.DEFAULT_PALETTE = "", B.debugEnabled = !1, B.defaultSplitIcon = void 0;
let m = B;
const Ae = (l) => {
  m.DEFAULT_PALETTE = l;
}, Ve = (l = !0) => {
  m.debugEnabled = l;
}, n = (...l) => {
  m.debugEnabled && console.info("[LktButton] ", ...l);
}, ve = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ce = ["src", "alt"], he = ["name", "type", "disabled"], ye = {
  key: 1,
  class: "lkt-button--icon-dot"
}, we = ["src", "alt"], be = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Te = /* @__PURE__ */ le({
  __name: "LktButton",
  props: {
    type: { default: X.button },
    name: { default: z(10) },
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
    clickRef: { default: !1 }
  },
  emits: ["click", "loading", "loaded", "update:checked"],
  setup(l, { expose: Y, emit: q }) {
    const e = l, s = q, V = ae(), I = de(), G = me(), J = "lkt-button-" + z(), v = c(e.loading), y = c(null), Q = c(null), D = c(!1), d = c(!1), N = c(!1), w = c(!1), b = c(void 0), p = c(e.checked), H = () => {
      if (!e.onClickTo) return;
      let o = I.currentRoute;
      N.value = o.value.path === e.onClickTo;
    };
    R(G, (o) => {
      H();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const Z = C(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), v.value && o.push("is-loading"), N.value && o.push("is-active-route"), d.value && o.push("show-tooltip"), D.value && o.push("show-split"), p.value && o.push("is-checked"), o.join(" ");
    }), $ = C(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), T = C(() => e.text.startsWith("__:") ? pe(e.text.substring(3)) : e.text), _ = C(() => typeof m.defaultSplitIcon < "u"), x = C(() => m.defaultSplitIcon), O = C(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), E = async (o) => {
      n("Resource Click", e.resource, e.resourceData), v.value = !0, s("loading");
      let r = { ...e.resourceData, isChecked: p.value };
      return se(e.resource, r).then((i) => {
        v.value = !1, s("loaded"), n("Resource Click -> Received response", i), s("click", o, i);
      }).catch((i) => {
        v.value = !1, s("loaded"), n("Resource Click -> Received response error", i), s("click", o, i);
      });
    }, F = c(!1), ee = C(() => y.value ? e.tooltip === "lazy" ? F.value : e.tooltip === "ever" ? d.value : e.tooltip === !0 : !1), U = (o) => {
      var r;
      if (n("Click"), o && (e.showSwitch || e.hiddenSwitch ? (r = o.target) != null && r.closest(".lkt-field-switch") || (p.value = !p.value) : e.tooltip ? (d.value = !d.value, d.value && (F.value = !0)) : D.value = !D.value), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        s("click", o, g(e.name, e.value));
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
            i(), s("click", o, g(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return E(o);
            s("click", o, g(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return fe(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let i = e.confirmData.onConfirm;
          n("Click -> Has onConfirm function: ", i), e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o).then(() => {
                i();
              });
            i(), s("click", o, g(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || I.push(e.onClickTo);
              return;
            }
            s("click", o, g(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return ce(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return n("Click -> has resource"), E(o);
      if (n("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : I.push(e.onClickTo);
        return;
      }
      s("click", o, g(e.name, e.value));
    };
    return R(() => e.loading, () => v.value = e.loading), R(() => e.checked, () => p.value = e.checked), R(p, (o) => s("update:checked", o)), R(w, (o) => {
      w.value && e.showTooltipOnHover ? (b.value !== void 0 && clearTimeout(b.value), b.value = setTimeout(() => {
        d.value = !0, clearTimeout(b.value);
      }, e.showTooltipOnHoverDelay)) : !w.value && e.hideTooltipOnLeave ? (d.value = !1, clearTimeout(b.value)) : w.value || clearTimeout(b.value);
    }), H(), Y({
      click: () => U(null)
    }), (o, r) => {
      const i = S("lkt-spinner"), oe = S("lkt-anchor"), te = S("lkt-field-switch"), P = S("lkt-tooltip");
      return t(), u("div", {
        class: k(["lkt-button-container", $.value]),
        ref_key: "container",
        ref: y,
        id: J,
        onMousemove: r[3] || (r[3] = (f) => w.value = !0),
        onMouseleave: r[4] || (r[4] = (f) => w.value = !1)
      }, [
        o.isAnchor ? (t(), h(oe, {
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
            o.icon ? (t(), u("i", {
              key: 0,
              class: k(o.icon)
            }, null, 2)) : a("", !0),
            o.icon && o.iconDot ? (t(), u("i", ve, L(O.value), 1)) : a("", !0),
            o.img ? (t(), u("img", {
              key: 2,
              src: o.img,
              alt: T.value
            }, null, 8, Ce)) : a("", !0),
            T.value ? (t(), u(K, { key: 3 }, [
              W(L(T.value), 1)
            ], 64)) : a("", !0),
            j(V).default ? M(o.$slots, "default", { key: 4 }) : a("", !0),
            v.value ? (t(), h(i, { key: 5 })) : a("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (t(), u("button", {
          key: 1,
          class: k(["lkt-button", Z.value]),
          ref_key: "button",
          ref: Q,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: U
        }, [
          o.icon ? (t(), u("i", {
            key: 0,
            class: k(o.icon)
          }, null, 2)) : a("", !0),
          o.icon && o.iconDot ? (t(), u("i", ye, L(O.value), 1)) : a("", !0),
          o.img ? (t(), u("img", {
            key: 2,
            src: o.img,
            alt: T.value
          }, null, 8, we)) : a("", !0),
          T.value ? (t(), u(K, { key: 3 }, [
            W(L(T.value), 1)
          ], 64)) : a("", !0),
          j(V).default ? M(o.$slots, "default", { key: 4 }) : a("", !0),
          v.value ? (t(), h(i, { key: 5 })) : a("", !0),
          o.showSwitch || o.hiddenSwitch ? ie((t(), h(te, {
            key: 6,
            modelValue: p.value,
            "onUpdate:modelValue": r[0] || (r[0] = (f) => p.value = f)
          }, null, 8, ["modelValue"])), [
            [ne, !o.hiddenSwitch]
          ]) : a("", !0),
          o.iconEnd ? (t(), u("i", {
            key: 7,
            class: k([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : a("", !0),
          o.split ? (t(), u("div", be, [
            o.splitIcon ? (t(), u("i", {
              key: 0,
              class: k(o.splitIcon)
            }, null, 2)) : _.value ? (t(), h(re(x.value), { key: 1 })) : a("", !0)
          ])) : a("", !0)
        ], 10, he)),
        o.split && y.value ? (t(), h(P, {
          key: 2,
          modelValue: D.value,
          "onUpdate:modelValue": r[1] || (r[1] = (f) => D.value = f),
          referrer: y.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: k(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: A(({ doClose: f }) => [
            M(o.$slots, "split", { doClose: f })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : a("", !0),
        o.tooltip && y.value ? (t(), h(P, {
          key: 3,
          modelValue: d.value,
          "onUpdate:modelValue": r[2] || (r[2] = (f) => d.value = f),
          referrer: y.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: k(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, ue({ _: 2 }, [
          ee.value ? {
            name: "default",
            fn: A(({ doClose: f }) => [
              M(o.$slots, "tooltip", { doClose: f })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : a("", !0)
      ], 34);
    };
  }
}), Ne = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.use(ke), l.component("lkt-button") === void 0 && l.component("lkt-button", Te);
  }
}, He = (l) => {
  m.defaultSplitIcon = l;
};
export {
  Ve as debugLktButton,
  Ne as default,
  Ae as setDefaultButtonPalette,
  He as setDefaultButtonSplitSlot
};
