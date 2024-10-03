import { defineComponent as ee, useSlots as oe, ref as c, watch as E, computed as R, resolveComponent as L, openBlock as a, createElementBlock as f, normalizeClass as m, createBlock as C, withCtx as A, createCommentVNode as i, Fragment as F, createTextVNode as U, toDisplayString as P, unref as K, renderSlot as S, withDirectives as le, vShow as te, resolveDynamicComponent as ae } from "vue";
import { createLktEvent as b } from "lkt-events";
import { generateRandomString as W } from "lkt-string-tools";
import { httpCall as ie } from "lkt-http-client";
import { openModal as ne } from "lkt-modal";
import { openConfirm as re } from "lkt-modal-confirm";
import { useRouter as ue, useRoute as se } from "vue-router";
import { __ as fe } from "lkt-i18n";
import ce from "lkt-tooltip";
var j = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l))(j || {});
const B = class B {
};
B.DEFAULT_PALETTE = "", B.debugEnabled = !1, B.defaultSplitIcon = void 0;
let d = B;
const Re = (l) => {
  d.DEFAULT_PALETTE = l;
}, Be = (l = !0) => {
  d.debugEnabled = l;
}, n = (...l) => {
  d.debugEnabled && console.info("[LktButton] ", ...l);
}, de = ["src", "alt"], me = ["name", "type", "disabled"], pe = ["src", "alt"], ke = {
  key: 7,
  class: "lkt-split-button-arrow"
}, Ce = /* @__PURE__ */ ee({
  __name: "LktButton",
  props: {
    type: { default: j.button },
    name: { default: W(10) },
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
  setup(l, { expose: X, emit: Y }) {
    const e = l, r = Y, I = oe(), M = ue(), z = se(), q = "lkt-button-" + W(), p = c(e.loading), T = c(null), G = c(null), g = c(!1), k = c(!1), V = c(!1), v = c(!1), h = c(void 0), w = c(e.checked), H = () => {
      if (!e.onClickTo)
        return;
      let o = M.currentRoute;
      V.value = o.value.path === e.onClickTo;
    };
    E(z, (o) => {
      H();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const J = R(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), p.value && o.push("is-loading"), V.value && o.push("is-active-route"), k.value && o.push("show-tooltip"), g.value && o.push("show-split"), o.join(" ");
    }), Q = R(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), y = R(() => e.text.startsWith("__:") ? fe(e.text.substring(3)) : e.text), Z = R(() => typeof d.defaultSplitIcon < "u"), $ = R(() => d.defaultSplitIcon), D = async (o) => (n("Resource Click", e.resource, e.resourceData), p.value = !0, r("loading"), ie(e.resource, e.resourceData).then((t) => {
      p.value = !1, r("loaded"), n("Resource Click -> Received response", t), r("click", o, t);
    }).catch((t) => {
      p.value = !1, r("loaded"), n("Resource Click -> Received response error", t), r("click", o, t);
    })), N = (o) => {
      var t;
      if (n("Click"), o && (e.showSwitch || e.hiddenSwitch ? (t = o.target) != null && t.closest(".lkt-field-switch") || (w.value = !w.value) : e.tooltip ? k.value = !k.value : g.value = !g.value), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        r("click", o, b(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (n("Click -> has modal", e.confirmModal, e.modalData), n("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let u = e.modalData.beforeClose.bind({});
          n("Click -> Has beforeClose function: ", u), e.modalData.beforeClose = () => {
            if (e.resource)
              return D(o).then(() => {
                u();
              });
            u(), r("click", o, b(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return D(o);
            r("click", o, b(e.name, e.value));
          }, n("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return ne(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let u = e.confirmData.onConfirm;
          n("Click -> Has onConfirm function: ", u), e.confirmData.onConfirm = () => {
            if (e.resource)
              return D(o).then(() => {
                u();
              });
            u(), r("click", o, b(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return D(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || M.push(e.onClickTo);
              return;
            }
            r("click", o, b(e.name, e.value));
          }, n("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return re(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return n("Click -> has resource"), D(o);
      if (n("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : M.push(e.onClickTo);
        return;
      }
      r("click", o, b(e.name, e.value));
    };
    return E(() => e.loading, () => p.value = e.loading), E(() => e.checked, () => w.value = e.checked), E(w, (o) => r("update:checked", o)), E(v, (o) => {
      v.value && e.showTooltipOnHover ? (h.value !== void 0 && clearTimeout(h.value), h.value = setTimeout(() => {
        k.value = !0, clearTimeout(h.value);
      }, e.showTooltipOnHoverDelay)) : !v.value && e.hideTooltipOnLeave ? (k.value = !1, clearTimeout(h.value)) : v.value || clearTimeout(h.value);
    }), H(), X({
      click: () => N(null)
    }), (o, t) => {
      const u = L("lkt-spinner"), _ = L("lkt-anchor"), x = L("lkt-field-switch"), O = L("lkt-tooltip");
      return a(), f("div", {
        class: m(["lkt-button-container", Q.value]),
        ref_key: "container",
        ref: T,
        id: q,
        onMousemove: t[3] || (t[3] = (s) => v.value = !0),
        onMouseleave: t[4] || (t[4] = (s) => v.value = !1)
      }, [
        o.isAnchor ? (a(), C(_, {
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
            o.icon ? (a(), f("i", {
              key: 0,
              class: m(o.icon)
            }, null, 2)) : i("", !0),
            o.img ? (a(), f("img", {
              key: 1,
              src: o.img,
              alt: y.value
            }, null, 8, de)) : i("", !0),
            y.value ? (a(), f(F, { key: 2 }, [
              U(P(y.value), 1)
            ], 64)) : i("", !0),
            K(I).default ? S(o.$slots, "default", { key: 3 }) : i("", !0),
            p.value ? (a(), C(u, { key: 4 })) : i("", !0)
          ]),
          _: 3
        }, 8, ["href", "to", "download", "target", "download-file-name"])) : (a(), f("button", {
          key: 1,
          class: m(["lkt-button", J.value]),
          ref_key: "button",
          ref: G,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          onClick: N
        }, [
          o.icon ? (a(), f("i", {
            key: 0,
            class: m(o.icon)
          }, null, 2)) : i("", !0),
          o.img ? (a(), f("img", {
            key: 1,
            src: o.img,
            alt: y.value
          }, null, 8, pe)) : i("", !0),
          y.value ? (a(), f(F, { key: 2 }, [
            U(P(y.value), 1)
          ], 64)) : i("", !0),
          K(I).default ? S(o.$slots, "default", { key: 3 }) : i("", !0),
          p.value ? (a(), C(u, { key: 4 })) : i("", !0),
          o.showSwitch || o.hiddenSwitch ? le((a(), C(x, {
            key: 5,
            modelValue: w.value,
            "onUpdate:modelValue": t[0] || (t[0] = (s) => w.value = s)
          }, null, 8, ["modelValue"])), [
            [te, !o.hiddenSwitch]
          ]) : i("", !0),
          o.iconEnd ? (a(), f("i", {
            key: 6,
            class: m([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : i("", !0),
          o.split ? (a(), f("div", ke, [
            o.splitIcon ? (a(), f("i", {
              key: 0,
              class: m(o.splitIcon)
            }, null, 2)) : Z.value ? (a(), C(ae($.value), { key: 1 })) : i("", !0)
          ])) : i("", !0)
        ], 10, me)),
        o.split && T.value ? (a(), C(O, {
          key: 2,
          modelValue: g.value,
          "onUpdate:modelValue": t[1] || (t[1] = (s) => g.value = s),
          referrer: T.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: m(["lkt-split-button-dropdown-content", o.splitClass])
        }, {
          default: A(({ doClose: s }) => [
            S(o.$slots, "split", { doClose: s })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : i("", !0),
        o.tooltip && T.value ? (a(), C(O, {
          key: 3,
          modelValue: k.value,
          "onUpdate:modelValue": t[2] || (t[2] = (s) => k.value = s),
          referrer: T.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: m(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY
        }, {
          default: A(({ doClose: s }) => [
            S(o.$slots, "tooltip", { doClose: s })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : i("", !0)
      ], 34);
    };
  }
}), Le = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.use(ce), l.component("lkt-button") === void 0 && l.component("lkt-button", Ce);
  }
}, Se = (l) => {
  d.defaultSplitIcon = l;
};
export {
  Be as debugLktButton,
  Le as default,
  Re as setDefaultButtonPalette,
  Se as setDefaultButtonSplitSlot
};
