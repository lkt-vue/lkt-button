import { defineComponent as be, mergeDefaults as we, useSlots as De, ref as p, watch as B, computed as u, resolveComponent as O, createElementBlock as f, openBlock as t, normalizeClass as C, createBlock as h, createCommentVNode as n, mergeProps as Te, withCtx as H, renderSlot as N, unref as I, toDisplayString as P, Fragment as x, createTextVNode as ee, resolveDynamicComponent as oe, withDirectives as Se, vShow as Re, createSlots as te, nextTick as Ee } from "vue";
import { createLktEvent as D } from "lkt-events";
import { generateRandomString as Be } from "lkt-string-tools";
import { httpCall as Le } from "lkt-http-client";
import { openModal as Me } from "lkt-modal";
import { openConfirm as Ie } from "lkt-modal-confirm";
import { useRouter as Ve } from "vue-router";
import { __ as Ae } from "lkt-i18n";
import { extractPropValue as X, ButtonType as c, Anchor as Fe, getDefaultValues as Oe, Button as He } from "lkt-vue-kernel";
const V = class V {
};
V.DEFAULT_PALETTE = "", V.debugEnabled = !1, V.defaultSplitIcon = void 0;
let g = V;
const $e = (s) => {
  g.DEFAULT_PALETTE = s;
}, xe = (s = !0) => {
  g.debugEnabled = s;
}, a = (...s) => {
  g.debugEnabled && console.info("[LktButton] ", ...s);
}, Ne = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Pe = ["src", "alt"], ze = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ke = ["src", "alt"], Ue = {
  key: 8,
  class: "lkt-split-button-arrow"
}, je = /* @__PURE__ */ be({
  __name: "LktButton",
  props: /* @__PURE__ */ we({
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
    tabindex: {},
    prop: {},
    onClick: { type: Function }
  }, Oe(He)),
  emits: ["click", "focus", "blur", "loading", "loaded", "update:checked", "update:openTooltip"],
  setup(s, { expose: le, emit: ne }) {
    const e = s, i = ne, Y = De(), q = Ve();
    let A = X(e.modal, e.prop), ie = X(e.modalKey, e.prop), z = X(e.icon, e.prop);
    const ae = "lkt-button-" + Be(), b = p(e.loading), w = p(null), K = p(null), T = p(!1), d = p(e.openTooltip), G = p(!1), S = p(!1), R = p(void 0), v = p(e.checked), U = p(!1);
    B(() => e.openTooltip, (o) => d.value = o), B(d, (o) => i("update:openTooltip", o));
    const J = u(() => {
      let o = [];
      return e.class && o.push(e.class), e.split && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), b.value && o.push("is-loading"), G.value && o.push("is-active-route"), d.value && o.push("show-tooltip"), T.value && o.push("show-split"), v.value && o.push("is-checked"), o.join(" ");
    }), re = u(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), E = u(() => {
      let o = String(e.text);
      return o.startsWith("__:") ? Ae(o.substring(3)) : o;
    }), ue = u(() => typeof g.defaultSplitIcon < "u"), ce = u(() => g.defaultSplitIcon), Q = u(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), L = async (o) => {
      a("Resource Click", e.resource, e.resourceData), b.value = !0, i("loading");
      let r = { ...e.resourceData, isChecked: v.value };
      return Le(e.resource, r).then((m) => {
        b.value = !1, i("loaded"), a("Resource Click -> Received response", m), y(), i("click", o, m);
      }).catch((m) => {
        b.value = !1, i("loaded"), a("Resource Click -> Received response error", m), y(), i("click", o, m);
      });
    }, Z = p(!1), se = u(() => w.value ? e.type === c.TooltipLazy ? Z.value : e.type === c.TooltipEver ? d.value : e.tooltip === !0 : !1), pe = p(!1), fe = u(() => w.value ? e.type === c.SplitLazy ? pe.value : e.type === c.SplitEver ? T.value : e.split === !0 : !1), de = (o) => {
      if (U.value) {
        U.value = !1, i("focus");
        return;
      }
      i("focus", o);
    }, me = (o) => i("blur", o), j = u(() => e.type === c.Switch || e.type === c.HiddenSwitch), ke = u(() => e.type === c.Switch), y = () => {
      a("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, ve = u(() => [
      c.Split,
      c.SplitLazy,
      c.SplitEver
    ].includes(e.type)), ye = u(() => [
      c.Tooltip,
      c.TooltipLazy,
      c.TooltipEver
    ].includes(e.type)), _ = (o) => {
      var r, m;
      if (a("Click", e), o && (j.value ? (r = o.target) != null && r.closest(".lkt-field.is-switch") || (v.value = !v.value) : e.tooltip ? (d.value = !d.value, d.value && (Z.value = !0)) : e.split && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), ve.value || ye.value) {
        y(), i("click", o, D(e.name, e.value));
        return;
      }
      if (A) {
        let l = { ...e.modalData };
        a("Click -> has modal", e.modal, l), a("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (M) => {
          if (e.resource)
            return L(o).then(() => {
              e.modalData.beforeClose(M);
            });
          e.modalData.beforeClose(M), y(), i("click", o, D(e.name, e.value));
        }, a("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return L(o);
          y(), i("click", o, D(e.name, e.value));
        }, a("Click -> New beforeClose function: ", l.beforeClose));
        let F = A;
        return typeof A == "function" && (F = A()), Me(F, ie, l);
      }
      if (e.confirmModal) {
        if (a("Click -> has confirm modal", e.confirmModal, e.confirmData), a("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm), typeof e.confirmData.onClick == "function") {
          let l = e.confirmData.onClick;
          a("Click -> Has onConfirm function: ", l), e.confirmData.onClick = () => {
            if (e.resource)
              return L(o).then(() => {
                l();
              });
            l(), y(), i("click", o, D(e.name, e.value));
          }, a("Click -> New onConfirm function: ", e.confirmData.onClick);
        } else
          e.confirmData.onClick = () => {
            var l;
            if (e.resource)
              return L(o);
            if (((l = e.anchor) == null ? void 0 : l.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && q.push(e.anchor.to);
              return;
            }
            y(), i("click", o, D(e.name, e.value));
          }, a("Click -> New onConfirm function: ", e.confirmData.onConfirm);
        return Ie(e.confirmModal, e.confirmModalKey, e.confirmData);
      }
      if (e.resource)
        return a("Click -> has resource"), L(o);
      if (a("Click -> Emit"), ((m = e.anchor) == null ? void 0 : m.to) !== "") {
        e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && q.push(e.anchor.to);
        return;
      }
      if (j.value) {
        Ee(() => {
          y(), i("click", o, D(e.name, e.value));
        });
        return;
      }
      i("click", o, D(e.name, e.value));
    };
    B(() => e.loading, () => b.value = e.loading), B(() => e.checked, () => v.value = e.checked), B(v, (o) => i("update:checked", o)), B(S, (o) => {
      S.value && e.showTooltipOnHover ? (R.value !== void 0 && clearTimeout(R.value), R.value = setTimeout(() => {
        d.value = !0, clearTimeout(R.value);
      }, e.showTooltipOnHoverDelay)) : !S.value && e.hideTooltipOnLeave ? (d.value = !1, clearTimeout(R.value)) : S.value || clearTimeout(R.value);
    }), le({
      click: () => _(null),
      focus: (o) => {
        K.value && (o && (U.value = !0), K.value.focus());
      }
    });
    const Ce = u(() => e.type === c.Content ? "div" : "button"), he = (o) => G.value = o, $ = u(() => e.type === c.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), ge = u(() => $.value ? new Fe({ ...e.anchor, class: J.value }) : {});
    return (o, r) => {
      const m = O("lkt-spinner"), l = O("lkt-anchor"), F = O("lkt-field"), M = O("lkt-tooltip");
      return t(), f("div", {
        class: C(["lkt-button-container", re.value]),
        ref_key: "container",
        ref: w,
        id: ae,
        onMousemove: r[3] || (r[3] = (k) => S.value = !0),
        onMouseleave: r[4] || (r[4] = (k) => S.value = !1)
      }, [
        $.value ? (t(), h(l, Te({ key: 0 }, ge.value, {
          class: "lkt-button",
          onActive: he
        }), {
          default: H(() => [
            I(z) ? (t(), f("i", {
              key: 0,
              class: C(I(z))
            }, null, 2)) : n("", !0),
            I(z) && o.iconDot ? (t(), f("i", Ne, P(Q.value), 1)) : n("", !0),
            o.img ? (t(), f("img", {
              key: 2,
              src: o.img,
              alt: E.value
            }, null, 8, Pe)) : n("", !0),
            E.value ? (t(), f(x, { key: 3 }, [
              ee(P(E.value), 1)
            ], 64)) : n("", !0),
            I(Y).default ? N(o.$slots, "default", { key: 4 }) : n("", !0),
            b.value ? (t(), h(m, { key: 5 })) : n("", !0)
          ]),
          _: 3
        }, 16)) : (t(), h(oe(Ce.value), {
          key: 1,
          class: C(["lkt-button", J.value]),
          ref_key: "button",
          ref: K,
          name: o.name,
          type: o.type,
          disabled: o.disabled,
          tabindex: o.tabindex,
          onClick: _,
          onFocus: de,
          onBlur: me
        }, {
          default: H(() => [
            o.icon ? (t(), f("i", {
              key: 0,
              class: C(o.icon)
            }, null, 2)) : n("", !0),
            o.icon && o.iconDot ? (t(), f("i", ze, P(Q.value), 1)) : n("", !0),
            o.img ? (t(), f("img", {
              key: 2,
              src: o.img,
              alt: E.value
            }, null, 8, Ke)) : n("", !0),
            E.value ? (t(), f(x, { key: 3 }, [
              ee(P(E.value), 1)
            ], 64)) : n("", !0),
            I(Y).default ? N(o.$slots, "default", { key: 4 }) : n("", !0),
            b.value ? (t(), h(m, { key: 5 })) : n("", !0),
            j.value ? Se((t(), h(F, {
              key: 6,
              type: "switch",
              modelValue: v.value,
              "onUpdate:modelValue": r[0] || (r[0] = (k) => v.value = k)
            }, null, 8, ["modelValue"])), [
              [Re, ke.value]
            ]) : n("", !0),
            o.iconEnd ? (t(), f("i", {
              key: 7,
              class: C([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : n("", !0),
            o.split ? (t(), f("div", Ue, [
              o.splitIcon ? (t(), f("i", {
                key: 0,
                class: C(o.splitIcon)
              }, null, 2)) : ue.value ? (t(), h(oe(ce.value), { key: 1 })) : n("", !0)
            ])) : n("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        o.split && w.value ? (t(), h(M, {
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": r[1] || (r[1] = (k) => T.value = k),
          referrer: w.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: C(["lkt-split-button-dropdown-content", o.splitClass]),
          engine: o.tooltipEngine
        }, te({ _: 2 }, [
          fe.value ? {
            name: "default",
            fn: H(({ doClose: k, doRootClick: W }) => [
              N(o.$slots, "split", {
                doClose: k,
                doRootClick: W
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "engine"])) : n("", !0),
        o.tooltip && w.value ? (t(), h(M, {
          key: 3,
          modelValue: d.value,
          "onUpdate:modelValue": r[2] || (r[2] = (k) => d.value = k),
          referrer: w.value,
          "window-margin": o.tooltipWindowMargin,
          "referrer-margin": o.tooltipReferrerMargin,
          class: C(o.tooltipClass),
          "location-x": o.tooltipLocationX,
          "location-y": o.tooltipLocationY,
          engine: o.tooltipEngine
        }, te({ _: 2 }, [
          se.value ? {
            name: "default",
            fn: H(({ doClose: k, doRootClick: W }) => [
              N(o.$slots, "tooltip", {
                doClose: k,
                doRootClick: W
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["modelValue", "referrer", "window-margin", "referrer-margin", "class", "location-x", "location-y", "engine"])) : n("", !0)
      ], 34);
    };
  }
}), eo = {
  install: (s) => {
    s.component("lkt-button") === void 0 && s.component("lkt-button", je);
  }
}, oo = (s) => {
  g.defaultSplitIcon = s;
};
export {
  xe as debugLktButton,
  eo as default,
  $e as setDefaultButtonPalette,
  oo as setDefaultButtonSplitSlot
};
