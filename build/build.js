import { defineComponent as me, mergeDefaults as ke, useSlots as ve, ref as c, watch as S, computed as u, resolveComponent as A, openBlock as t, createElementBlock as f, normalizeClass as v, createBlock as y, mergeProps as ye, withCtx as V, createCommentVNode as n, toDisplayString as O, Fragment as J, createTextVNode as Q, unref as Z, renderSlot as F, resolveDynamicComponent as $, withDirectives as he, vShow as Ce, createSlots as _, nextTick as ge } from "vue";
import { createLktEvent as b } from "lkt-events";
import { generateRandomString as be } from "lkt-string-tools";
import { httpCall as we } from "lkt-http-client";
import { openModal as De } from "lkt-modal";
import { openConfirm as Te } from "lkt-modal-confirm";
import { useRouter as Re } from "vue-router";
import { __ as Se } from "lkt-i18n";
import { getDefaultValues as Be, Button as Ee, ButtonType as L, Anchor as Le } from "lkt-vue-kernel";
const M = class M {
};
M.DEFAULT_PALETTE = "", M.debugEnabled = !1, M.defaultSplitIcon = void 0;
let h = M;
const Ye = (s) => {
  h.DEFAULT_PALETTE = s;
}, qe = (s = !0) => {
  h.debugEnabled = s;
}, r = (...s) => {
  h.debugEnabled && console.info("[LktButton] ", ...s);
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
  }, Be(Ee)),
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(s, { expose: x, emit: ee }) {
    const e = s, i = ee, j = ve(), K = Re(), oe = "lkt-button-" + be(), C = c(e.loading), g = c(null), H = c(null), w = c(!1), p = c(e.openTooltip), W = c(!1), D = c(!1), T = c(void 0), k = c(e.checked), N = c(!1);
    S(() => e.openTooltip, (o) => p.value = o), S(p, (o) => i("update:openTooltip", o));
    const z = u(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), C.value && o.push("is-loading"), W.value && o.push("is-active-route"), p.value && o.push("show-tooltip"), w.value && o.push("show-split"), k.value && o.push("is-checked"), o.join(" ");
    }), te = u(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), R = u(() => {
      let o = String(e.text);
      return o.startsWith("__:") ? Se(o.substring(3)) : o;
    }), le = u(() => typeof h.defaultSplitIcon < "u"), ne = u(() => h.defaultSplitIcon), X = u(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), B = async (o) => {
      r("Resource Click", e.resource, e.resourceData), C.value = !0, i("loading");
      let a = { ...e.resourceData, isChecked: k.value };
      return we(e.resource, a).then((d) => {
        C.value = !1, i("loaded"), r("Resource Click -> Received response", d), i("click", o, d);
      }).catch((d) => {
        C.value = !1, i("loaded"), r("Resource Click -> Received response error", d), i("click", o, d);
      });
    }, Y = c(!1), ie = u(() => g.value ? e.tooltip === "lazy" ? Y.value : e.tooltip === "ever" ? p.value : e.tooltip === !0 : !1), ae = c(!1), re = u(() => g.value ? e.split === "lazy" ? ae.value : e.split === "ever" ? w.value : e.split === !0 : !1), ue = (o) => {
      if (N.value) {
        N.value = !1, i("focus");
        return;
      }
      i("focus", o);
    }, se = (o) => i("blur", o), P = u(() => e.type === L.Switch || e.type === L.HiddenSwitch), ce = u(() => e.type === L.Switch), q = (o) => {
      var a, d;
      if (r("Click"), o && (P.value ? (a = o.target) != null && a.closest(".lkt-field.is-switch") || (k.value = !k.value) : e.tooltip ? (p.value = !p.value, p.value && (Y.value = !0)) : e.split && (w.value = !w.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), e.split || e.tooltip) {
        i("click", o, b(e.name, e.value));
        return;
      }
      if (e.modal) {
        let l = { ...e.modalData };
        r("Click -> has modal", e.confirmModal, l), r("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (E) => {
          if (e.resource)
            return B(o).then(() => {
              e.modalData.beforeClose(E);
            });
          e.modalData.beforeClose(E), i("click", o, b(e.name, e.value));
        }, r("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return B(o);
          i("click", o, b(e.name, e.value));
        }, r("Click -> New beforeClose function: ", l.beforeClose));
        let I = e.modal;
        return typeof e.modal == "function" && (I = e.modal()), De(I, e.modalKey, l);
      }
      if (e.confirmModal) {
        if (r("Click -> has confirm modal", e.confirmModal, e.confirmData), r("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onConfirm == "function") {
          let l = e.confirmData.onConfirm;
          r("Click -> Has onConfirm function: ", l), e.confirmData.onConfirm = () => {
            if (e.resource)
              return B(o).then(() => {
                l();
              });
            l(), i("click", o, b(e.name, e.value));
          }, r("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        } else
          e.confirmData.onConfirm = () => {
            var l;
            if (e.resource)
              return B(o);
            if (((l = e.anchor) == null ? void 0 : l.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && K.push(e.anchor.to);
              return;
            }
            i("click", o, b(e.name, e.value));
          }, r("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return Te(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return r("Click -> has resource"), B(o);
      if (r("Click -> Emit"), ((d = e.anchor) == null ? void 0 : d.to) !== "") {
        e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && K.push(e.anchor.to);
        return;
      }
      if (P.value) {
        ge(() => {
          i("click", o, b(e.name, e.value));
        });
        return;
      }
      i("click", o, b(e.name, e.value));
    };
    S(() => e.loading, () => C.value = e.loading), S(() => e.checked, () => k.value = e.checked), S(k, (o) => i("update:checked", o)), S(D, (o) => {
      D.value && e.showTooltipOnHover ? (T.value !== void 0 && clearTimeout(T.value), T.value = setTimeout(() => {
        p.value = !0, clearTimeout(T.value);
      }, e.showTooltipOnHoverDelay)) : !D.value && e.hideTooltipOnLeave ? (p.value = !1, clearTimeout(T.value)) : D.value || clearTimeout(T.value);
    }), x({
      click: () => q(null),
      focus: (o) => {
        H.value && (o && (N.value = !0), H.value.focus());
      }
    });
    const fe = u(() => e.type === L.Content ? "div" : "button"), pe = (o) => W.value = o, G = u(() => e.type === L.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), de = u(() => G.value ? new Le({ ...e.anchor, class: z.value }) : {});
    return (o, a) => {
      const d = A("lkt-spinner"), l = A("lkt-anchor"), I = A("lkt-field"), E = A("lkt-tooltip");
      return t(), f("div", {
        class: v(["lkt-button-container", te.value]),
        ref_key: "container",
        ref: g,
        id: oe,
        onMousemove: a[3] || (a[3] = (m) => D.value = !0),
        onMouseleave: a[4] || (a[4] = (m) => D.value = !1)
      }, [
        G.value ? (t(), y(l, ye({ key: 0 }, de.value, {
          class: "lkt-button",
          onActive: pe
        }), {
          default: V(() => [
            o.icon ? (t(), f("i", {
              key: 0,
              class: v(o.icon)
            }, null, 2)) : n("", !0),
            o.icon && o.iconDot ? (t(), f("i", Me, O(X.value), 1)) : n("", !0),
            o.img ? (t(), f("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Ie)) : n("", !0),
            R.value ? (t(), f(J, { key: 3 }, [
              Q(O(R.value), 1)
            ], 64)) : n("", !0),
            Z(j).default ? F(o.$slots, "default", { key: 4 }) : n("", !0),
            C.value ? (t(), y(d, { key: 5 })) : n("", !0)
          ]),
          _: 3
        }, 16)) : (t(), y($(fe.value), {
          key: 1,
          class: v(["lkt-button", z.value]),
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
              class: v(o.icon)
            }, null, 2)) : n("", !0),
            o.icon && o.iconDot ? (t(), f("i", Ae, O(X.value), 1)) : n("", !0),
            o.img ? (t(), f("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Ve)) : n("", !0),
            R.value ? (t(), f(J, { key: 3 }, [
              Q(O(R.value), 1)
            ], 64)) : n("", !0),
            Z(j).default ? F(o.$slots, "default", { key: 4 }) : n("", !0),
            C.value ? (t(), y(d, { key: 5 })) : n("", !0),
            P.value ? he((t(), y(I, {
              key: 6,
              type: "switch",
              modelValue: k.value,
              "onUpdate:modelValue": a[0] || (a[0] = (m) => k.value = m)
            }, null, 8, ["modelValue"])), [
              [Ce, ce.value]
            ]) : n("", !0),
            o.iconEnd ? (t(), f("i", {
              key: 7,
              class: v([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : n("", !0),
            o.split ? (t(), f("div", Oe, [
              o.splitIcon ? (t(), f("i", {
                key: 0,
                class: v(o.splitIcon)
              }, null, 2)) : le.value ? (t(), y($(ne.value), { key: 1 })) : n("", !0)
            ])) : n("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        o.split && g.value ? (t(), y(E, {
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": a[1] || (a[1] = (m) => w.value = m),
          referrer: g.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: v(["lkt-split-button-dropdown-content", o.splitClass]),
          engine: o.tooltipEngine
        }, _({ _: 2 }, [
          re.value ? {
            name: "default",
            fn: V(({ doClose: m, doRootClick: U }) => [
              F(o.$slots, "split", {
                doClose: m,
                doRootClick: U
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : n("", !0),
        o.tooltip && g.value ? (t(), y(E, {
          key: 3,
          modelValue: p.value,
          "onUpdate:modelValue": a[2] || (a[2] = (m) => p.value = m),
          referrer: g.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: v(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY,
          engine: o.tooltipEngine
        }, _({ _: 2 }, [
          ie.value ? {
            name: "default",
            fn: V(({ doClose: m, doRootClick: U }) => [
              F(o.$slots, "tooltip", {
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
  h.defaultSplitIcon = s;
};
export {
  qe as debugLktButton,
  Ge as default,
  Ye as setDefaultButtonPalette,
  Je as setDefaultButtonSplitSlot
};
