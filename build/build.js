import { defineComponent as ee, useSlots as oe, ref as d, watch as E, computed as B, resolveComponent as S, openBlock as a, createElementBlock as f, normalizeClass as m, createBlock as C, withCtx as A, createCommentVNode as n, Fragment as F, createTextVNode as U, toDisplayString as P, unref as K, renderSlot as M, withDirectives as le, vShow as te, resolveDynamicComponent as ae } from "vue";
import { createLktEvent as b } from "lkt-events";
import { generateRandomString as W } from "lkt-string-tools";
import { httpCall as ne } from "lkt-http-client";
import { openModal as ie } from "lkt-modal";
import { openConfirm as re } from "lkt-modal-confirm";
import { useRouter as ue, useRoute as se } from "vue-router";
import { __ as fe } from "lkt-i18n";
import de from "lkt-tooltip";
var j = /* @__PURE__ */ ((l) => (l.button = "button", l.submit = "submit", l.reset = "reset", l))(j || {});
const L = class L {
};
L.DEFAULT_PALETTE = "", L.debugEnabled = !1, L.defaultSplitIcon = void 0;
let c = L;
const Be = (l) => {
  c.DEFAULT_PALETTE = l;
}, Le = (l = !0) => {
  c.debugEnabled = l;
}, i = (...l) => {
  c.debugEnabled && console.info("[LktButton] ", ...l);
}, ce = ["src", "alt"], me = ["name", "type", "disabled"], pe = ["src", "alt"], ke = {
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
    palette: { default: c.DEFAULT_PALETTE },
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
    checked: { type: Boolean, default: !1 }
  },
  emits: ["click", "loading", "loaded", "update:checked"],
  setup(l, { expose: X, emit: Y }) {
    const e = l, r = Y, I = oe(), R = ue(), z = se(), q = "lkt-button-" + W(), p = d(e.loading), T = d(null), G = d(null), g = d(!1), k = d(!1), V = d(!1), v = d(!1), h = d(void 0), w = d(e.checked), H = () => {
      if (!e.onClickTo)
        return;
      let o = R.currentRoute;
      V.value = o.value.path === e.onClickTo;
    };
    E(z, (o) => {
      H();
    }, { flush: "pre", immediate: !0, deep: !0 });
    const J = B(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), p.value && o.push("is-loading"), V.value && o.push("is-active-route"), k.value && o.push("show-tooltip"), g.value && o.push("show-split"), o.join(" ");
    }), Q = B(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), y = B(() => e.text.startsWith("__:") ? fe(e.text.substring(3)) : e.text), Z = B(() => typeof c.defaultSplitIcon < "u"), $ = B(() => c.defaultSplitIcon), D = async (o) => (i("Resource Click", e.resource, e.resourceData), p.value = !0, r("loading"), ne(e.resource, e.resourceData).then((t) => {
      p.value = !1, r("loaded"), i("Resource Click -> Received response", t), r("click", o, t);
    }).catch((t) => {
      p.value = !1, r("loaded"), i("Resource Click -> Received response error", t), r("click", o, t);
    })), N = (o) => {
      var t;
      if (i("Click"), o && (e.showSwitch || e.hiddenSwitch ? (t = o.target) != null && t.closest(".lkt-field-switch") || (w.value = !w.value) : e.tooltip ? k.value = !k.value : g.value = !g.value), e.split || e.tooltip) {
        r("click", o, b(e.name, e.value));
        return;
      }
      if (e.modal) {
        if (i("Click -> has modal", e.confirmModal, e.modalData), i("Click -> typeof beforeClose: ", typeof e.modalData.beforeClose), typeof e.modalData.beforeClose == "function") {
          let u = e.modalData.beforeClose.bind({});
          i("Click -> Has beforeClose function: ", u), e.modalData.beforeClose = () => {
            if (e.resource)
              return D(o).then(() => {
                u();
              });
            u(), r("click", o, b(e.name, e.value));
          }, i("Click -> New beforeClose function: ", e.modalData.beforeClose);
        } else
          e.modalData.beforeClose = () => {
            if (e.resource)
              return D(o);
            r("click", o, b(e.name, e.value));
          }, i("Click -> New beforeClose function: ", e.modalData.beforeClose);
        return ie(e.modal, e.modalKey, e.modalData);
      }
      if (e.confirmModal) {
        if (i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let u = e.confirmData.onConfirm;
          i("Click -> Has onConfirm function: ", u), e.confirmData.onConfirm = () => {
            if (e.resource)
              return D(o).then(() => {
                u();
              });
            u(), r("click", o, b(e.name, e.value));
          }, i("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            if (e.resource)
              return D(o);
            if (e.onClickTo !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.onClickToExternal || R.push(e.onClickTo);
              return;
            }
            r("click", o, b(e.name, e.value));
          }, i("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return re(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return i("Click -> has resource"), D(o);
      if (i("Click -> Emit"), e.onClickTo !== "") {
        e.onClickToExternal ? window.location.href = e.onClickTo : R.push(e.onClickTo);
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
      const u = S("lkt-spinner"), _ = S("lkt-anchor"), x = S("lkt-field-switch"), O = S("lkt-tooltip");
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
            }, null, 2)) : n("", !0),
            o.img ? (a(), f("img", {
              key: 1,
              src: o.img,
              alt: y.value
            }, null, 8, ce)) : n("", !0),
            y.value ? (a(), f(F, { key: 2 }, [
              U(P(y.value), 1)
            ], 64)) : n("", !0),
            K(I).default ? M(o.$slots, "default", { key: 3 }) : n("", !0),
            p.value ? (a(), C(u, { key: 4 })) : n("", !0)
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
          }, null, 2)) : n("", !0),
          o.img ? (a(), f("img", {
            key: 1,
            src: o.img,
            alt: y.value
          }, null, 8, pe)) : n("", !0),
          y.value ? (a(), f(F, { key: 2 }, [
            U(P(y.value), 1)
          ], 64)) : n("", !0),
          K(I).default ? M(o.$slots, "default", { key: 3 }) : n("", !0),
          p.value ? (a(), C(u, { key: 4 })) : n("", !0),
          o.showSwitch || o.hiddenSwitch ? le((a(), C(x, {
            key: 5,
            modelValue: w.value,
            "onUpdate:modelValue": t[0] || (t[0] = (s) => w.value = s)
          }, null, 8, ["modelValue"])), [
            [te, !o.hiddenSwitch]
          ]) : n("", !0),
          o.iconEnd ? (a(), f("i", {
            key: 6,
            class: m([o.iconEnd, "lkt-button-icon-end"])
          }, null, 2)) : n("", !0),
          o.split ? (a(), f("div", ke, [
            o.splitIcon ? (a(), f("i", {
              key: 0,
              class: m(o.splitIcon)
            }, null, 2)) : Z.value ? (a(), C(ae($.value), { key: 1 })) : n("", !0)
          ])) : n("", !0)
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
            M(o.$slots, "split", { doClose: s })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class"])) : n("", !0),
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
            M(o.$slots, "tooltip", { doClose: s })
          ]),
          _: 3
        }, 8, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y"])) : n("", !0)
      ], 34);
    };
  }
}), Se = {
  install: (l) => {
    l.component("lkt-tooltip") === void 0 && l.use(de), l.component("lkt-button") === void 0 && l.component("lkt-button", Ce);
  }
}, Me = (l) => {
  c.defaultSplitIcon = l;
};
export {
  Le as debugLktButton,
  Se as default,
  Be as setDefaultButtonPalette,
  Me as setDefaultButtonSplitSlot
};
