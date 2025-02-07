import { defineComponent as me, mergeDefaults as ke, useSlots as ve, ref as c, watch as B, computed as u, resolveComponent as A, createElementBlock as f, openBlock as t, normalizeClass as y, createBlock as h, createCommentVNode as n, mergeProps as ye, withCtx as V, renderSlot as O, toDisplayString as F, Fragment as J, createTextVNode as Q, unref as Z, resolveDynamicComponent as $, withDirectives as he, vShow as Ce, createSlots as _, nextTick as ge } from "vue";
import { createLktEvent as w } from "lkt-events";
import { generateRandomString as be } from "lkt-string-tools";
import { httpCall as we } from "lkt-http-client";
import { openModal as De } from "lkt-modal";
import { openConfirm as Te } from "lkt-modal-confirm";
import { useRouter as Se } from "vue-router";
import { __ as Re } from "lkt-i18n";
import { ButtonType as k, Anchor as Be, getDefaultValues as Ee, Button as Le } from "lkt-vue-kernel";
const M = class M {
};
M.DEFAULT_PALETTE = "", M.debugEnabled = !1, M.defaultSplitIcon = void 0;
let C = M;
const Ye = (s) => {
  C.DEFAULT_PALETTE = s;
}, qe = (s = !0) => {
  C.debugEnabled = s;
}, r = (...s) => {
  C.debugEnabled && console.info("[LktButton] ", ...s);
}, Me = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ie = ["src", "alt"], Ae = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ve = ["src", "alt"], Oe = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Fe = /* @__PURE__ */ me({
  __name: "LktButton",
  props: /* @__PURE__ */ ke({
    type: {},
    checked: { type: Boolean },
    openTooltip: { type: Boolean },
    name: {},
    text: {},
    icon: {},
    class: {},
    containerClass: {},
    palette: {},
    value: {},
    disabled: { type: Boolean },
    loading: { type: Boolean },
    wrapContent: { type: Boolean },
    anchor: {},
    resource: {},
    resourceData: {},
    modal: { type: [String, Function] },
    modalKey: { type: [String, Function] },
    modalData: {},
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Function] },
    confirmData: {},
    iconDot: { type: [Boolean, String, Number] },
    iconEnd: {},
    img: {},
    split: { type: [Boolean, String] },
    splitIcon: {},
    tooltip: { type: [Boolean, String] },
    tooltipEngine: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: {},
    hideTooltipOnLeave: { type: Boolean },
    tooltipWindowMargin: {},
    tooltipReferrerMargin: {},
    tooltipClass: {},
    tooltipLocationY: {},
    tooltipLocationX: {},
    splitClass: {},
    clickRef: {},
    tabindex: {}
  }, Ee(Le)),
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(s, { expose: x, emit: ee }) {
    const e = s, i = ee, j = ve(), K = Se(), oe = "lkt-button-" + be(), g = c(e.loading), b = c(null), H = c(null), D = c(!1), p = c(e.openTooltip), W = c(!1), T = c(!1), S = c(void 0), v = c(e.checked), N = c(!1);
    B(() => e.openTooltip, (o) => p.value = o), B(p, (o) => i("update:openTooltip", o));
    const z = u(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), g.value && o.push("is-loading"), W.value && o.push("is-active-route"), p.value && o.push("show-tooltip"), D.value && o.push("show-split"), v.value && o.push("is-checked"), o.join(" ");
    }), te = u(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), R = u(() => {
      let o = String(e.text);
      return o.startsWith("__:") ? Re(o.substring(3)) : o;
    }), le = u(() => typeof C.defaultSplitIcon < "u"), ne = u(() => C.defaultSplitIcon), X = u(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), E = async (o) => {
      r("Resource Click", e.resource, e.resourceData), g.value = !0, i("loading");
      let a = { ...e.resourceData, isChecked: v.value };
      return we(e.resource, a).then((d) => {
        g.value = !1, i("loaded"), r("Resource Click -> Received response", d), i("click", o, d);
      }).catch((d) => {
        g.value = !1, i("loaded"), r("Resource Click -> Received response error", d), i("click", o, d);
      });
    }, Y = c(!1), ie = u(() => b.value ? e.type === k.TooltipLazy ? Y.value : e.type === k.TooltipEver ? p.value : e.tooltip === !0 : !1), ae = c(!1), re = u(() => b.value ? e.type === k.SplitLazy ? ae.value : e.type === k.SplitEver ? D.value : e.split === !0 : !1), ue = (o) => {
      if (N.value) {
        N.value = !1, i("focus");
        return;
      }
      i("focus", o);
    }, se = (o) => i("blur", o), P = u(() => e.type === k.Switch || e.type === k.HiddenSwitch), ce = u(() => e.type === k.Switch), q = (o) => {
      var a, d;
      if (r("Click"), o && (P.value ? (a = o.target) != null && a.closest(".lkt-field.is-switch") || (v.value = !v.value) : e.tooltip ? (p.value = !p.value, p.value && (Y.value = !0)) : e.split && (D.value = !D.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        i("click", o, w(e.name, e.value));
        return;
      }
      if (e.modal) {
        let l = { ...e.modalData };
        r("Click -> has modal", e.confirmModal, l), r("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (L) => {
          if (e.resource)
            return E(o).then(() => {
              e.modalData.beforeClose(L);
            });
          e.modalData.beforeClose(L), i("click", o, w(e.name, e.value));
        }, r("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return E(o);
          i("click", o, w(e.name, e.value));
        }, r("Click -> New beforeClose function: ", l.beforeClose));
        let I = e.modal;
        return typeof e.modal == "function" && (I = e.modal()), De(I, e.modalKey, l);
      }
      if (e.confirmModal) {
        if (r("Click -> has confirm modal", e.confirmModal, e.confirmData), r("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let l = e.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
            if (e.resource)
              return E(o).then(() => {
                l();
              });
            l(), i("click", o, w(e.name, e.value));
          }, r("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            var l;
            if (e.resource)
              return E(o);
            if (((l = e.anchor) == null ? void 0 : l.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && K.push(e.anchor.to);
              return;
            }
            i("click", o, w(e.name, e.value));
          }, r("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return Te(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return r("Click -> has resource"), E(o);
      if (r("Click -> Emit"), ((d = e.anchor) == null ? void 0 : d.to) !== "") {
        e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && K.push(e.anchor.to);
        return;
      }
      if (P.value) {
        ge(() => {
          i("click", o, w(e.name, e.value));
        });
        return;
      }
      i("click", o, w(e.name, e.value));
    };
    B(() => e.loading, () => g.value = e.loading), B(() => e.checked, () => v.value = e.checked), B(v, (o) => i("update:checked", o)), B(T, (o) => {
      T.value && e.showTooltipOnHover ? (S.value !== void 0 && clearTimeout(S.value), S.value = setTimeout(() => {
        p.value = !0, clearTimeout(S.value);
      }, e.showTooltipOnHoverDelay)) : !T.value && e.hideTooltipOnLeave ? (p.value = !1, clearTimeout(S.value)) : T.value || clearTimeout(S.value);
    }), x({
      click: () => q(null),
      focus: (o) => {
        H.value && (o && (N.value = !0), H.value.focus());
      }
    });
    const fe = u(() => e.type === k.Content ? "div" : "button"), pe = (o) => W.value = o, G = u(() => e.type === k.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), de = u(() => G.value ? new Be({ ...e.anchor, class: z.value }) : {});
    return (o, a) => {
      const d = A("lkt-spinner"), l = A("lkt-anchor"), I = A("lkt-field"), L = A("lkt-tooltip");
      return t(), f("div", {
        class: y(["lkt-button-container", te.value]),
        ref_key: "container",
        ref: b,
        id: oe,
        onMousemove: a[3] || (a[3] = (m) => T.value = !0),
        onMouseleave: a[4] || (a[4] = (m) => T.value = !1)
      }, [
        G.value ? (t(), h(l, ye({ key: 0 }, de.value, {
          class: "lkt-button",
          onActive: pe
        }), {
          default: V(() => [
            o.icon ? (t(), f("i", {
              key: 0,
              class: y(o.icon)
            }, null, 2)) : n("", !0),
            o.icon && o.iconDot ? (t(), f("i", Me, F(X.value), 1)) : n("", !0),
            o.img ? (t(), f("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Ie)) : n("", !0),
            R.value ? (t(), f(J, { key: 3 }, [
              Q(F(R.value), 1)
            ], 64)) : n("", !0),
            Z(j).default ? O(o.$slots, "default", { key: 4 }) : n("", !0),
            g.value ? (t(), h(d, { key: 5 })) : n("", !0)
          ]),
          _: 3
        }, 16)) : (t(), h($(fe.value), {
          key: 1,
          class: y(["lkt-button", z.value]),
          ref_key: "button",
          ref: H,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          tabindex: o.tabindex,
          onClick: q,
          onFocus: ue,
          onBlur: se
        }, {
          default: V(() => [
            o.icon ? (t(), f("i", {
              key: 0,
              class: y(o.icon)
            }, null, 2)) : n("", !0),
            o.icon && o.iconDot ? (t(), f("i", Ae, F(X.value), 1)) : n("", !0),
            o.img ? (t(), f("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Ve)) : n("", !0),
            R.value ? (t(), f(J, { key: 3 }, [
              Q(F(R.value), 1)
            ], 64)) : n("", !0),
            Z(j).default ? O(o.$slots, "default", { key: 4 }) : n("", !0),
            g.value ? (t(), h(d, { key: 5 })) : n("", !0),
            P.value ? he((t(), h(I, {
              key: 6,
              type: "switch",
              modelValue: v.value,
              "onUpdate:modelValue": a[0] || (a[0] = (m) => v.value = m)
            }, null, 8, ["modelValue"])), [
              [Ce, ce.value]
            ]) : n("", !0),
            o.iconEnd ? (t(), f("i", {
              key: 7,
              class: y([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : n("", !0),
            o.split ? (t(), f("div", Oe, [
              o.splitIcon ? (t(), f("i", {
                key: 0,
                class: y(o.splitIcon)
              }, null, 2)) : le.value ? (t(), h($(ne.value), { key: 1 })) : n("", !0)
            ])) : n("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        o.split && b.value ? (t(), h(L, {
          key: 2,
          modelValue: D.value,
          "onUpdate:modelValue": a[1] || (a[1] = (m) => D.value = m),
          referrer: b.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: y(["lkt-split-button-dropdown-content", o.splitClass]),
          engine: o.tooltipEngine
        }, _({ _: 2 }, [
          re.value ? {
            name: "default",
            fn: V(({ doClose: m, doRootClick: U }) => [
              O(o.$slots, "split", {
                doClose: m,
                doRootClick: U
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : n("", !0),
        o.tooltip && b.value ? (t(), h(L, {
          key: 3,
          modelValue: p.value,
          "onUpdate:modelValue": a[2] || (a[2] = (m) => p.value = m),
          referrer: b.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: y(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY,
          engine: o.tooltipEngine
        }, _({ _: 2 }, [
          ie.value ? {
            name: "default",
            fn: V(({ doClose: m, doRootClick: U }) => [
              O(o.$slots, "tooltip", {
                doClose: m,
                doRootClick: U
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : n("", !0)
      ], 34);
    };
  }
}), Ge = {
  install: (s) => {
    s.component("lkt-button") === void 0 && s.component("lkt-button", Fe);
  }
}, Je = (s) => {
  C.defaultSplitIcon = s;
};
export {
  qe as debugLktButton,
  Ge as default,
  Ye as setDefaultButtonPalette,
  Je as setDefaultButtonSplitSlot
};
