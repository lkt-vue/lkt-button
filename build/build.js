import { defineComponent as He, mergeDefaults as Fe, useSlots as Ne, ref as d, watch as E, computed as u, resolveComponent as N, createElementBlock as p, openBlock as i, normalizeClass as I, createBlock as C, createCommentVNode as r, mergeProps as J, withCtx as x, renderSlot as P, toDisplayString as z, Fragment as re, createTextVNode as ce, unref as se, resolveDynamicComponent as fe, withDirectives as xe, withModifiers as Pe, vShow as ze, createSlots as de } from "vue";
import { generateRandomString as Ke } from "lkt-string-tools";
import { httpCall as Ue } from "lkt-http-client";
import { openModal as _e, openConfirm as je, runModalCallback as qe } from "lkt-modal";
import { useRouter as Ge } from "vue-router";
import { extractPropValue as K, ButtonType as l, extractI18nValue as Q, Anchor as Je, getDefaultValues as Qe, Button as We, LktSettings as pe } from "lkt-vue-kernel";
const A = class A {
};
A.DEFAULT_PALETTE = "", A.debugEnabled = !1, A.defaultSplitIcon = void 0;
let b = A;
const rt = (f) => {
  b.DEFAULT_PALETTE = f;
}, ct = (f = !0) => {
  b.debugEnabled = f;
}, n = (...f) => {
  b.debugEnabled && console.info("[LktButton] ", ...f);
}, Xe = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ye = ["src", "alt"], Ze = {
  key: 1,
  class: "lkt-button--icon-dot"
}, $e = ["src", "alt"], et = {
  key: 8,
  class: "lkt-split-button-arrow"
}, tt = /* @__PURE__ */ He({
  __name: "LktButton",
  props: /* @__PURE__ */ Fe({
    type: {},
    name: {},
    value: {},
    disabled: { type: [Boolean, Function] },
    openTooltip: { type: Boolean },
    loading: { type: Boolean },
    class: {},
    containerClass: {},
    wrapContent: { type: Boolean },
    text: {},
    icon: {},
    iconEnd: {},
    img: {},
    checked: { type: Boolean },
    textOn: {},
    textOff: {},
    iconOn: {},
    iconOff: {},
    iconEndOn: {},
    iconEndOff: {},
    dot: { type: [Boolean, String, Number] },
    anchor: {},
    resource: {},
    resourceData: {},
    modal: { type: [String, Function] },
    modalKey: { type: [String, Number, Function] },
    modalData: {},
    confirmModal: { type: [String, Function] },
    confirmModalKey: { type: [String, Number, Function] },
    confirmData: {},
    modalCallbacks: {},
    tooltip: {},
    splitIcon: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: {},
    hideTooltipOnLeave: { type: Boolean },
    splitClass: {},
    tabindex: {},
    prop: {},
    clickRef: {},
    events: {}
  }, Qe(We)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(f, { expose: me, emit: ve }) {
    const e = f, k = ve, W = Ne(), X = Ge();
    let V = K(e.modal, e.prop), ke = K(e.modalKey, e.prop), ye = K(e.icon, e.prop), he = K(e.iconEnd, e.prop);
    const Ce = "lkt-button-" + Ke(), w = d(e.loading), S = d(null), U = d(null), T = d(!1), m = d(e.openTooltip), Y = d(!1), g = d(!1), B = d(void 0), c = d(e.checked), _ = d(!1);
    E(() => e.openTooltip, (t) => m.value = t), E(m, (t) => k("update:openTooltip", t));
    const Z = u(() => {
      let t = [];
      return e.class && t.push(e.class), L.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), Y.value && t.push("is-active-route"), m.value && t.push("show-tooltip"), T.value && t.push("show-split"), c.value && t.push("is-checked"), t.join(" ");
    }), be = u(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), D = u(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (c.value && typeof e.textOn < "u") return Q(e.textOn);
        if (!c.value && typeof e.textOff < "u") return Q(e.textOff);
      }
      return Q(e.text);
    }), O = u(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (c.value && typeof e.iconOn < "u") return e.iconOn;
        if (!c.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return ye;
    }), $ = u(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (c.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!c.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return he;
    }), we = u(() => typeof b.defaultSplitIcon < "u"), Se = u(() => b.defaultSplitIcon), ee = u(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, a = void 0) => {
      n("endClickMethod", t, a), Ie(), Re(), k("click", t, a);
    }, R = async (t) => {
      n("Resource Click", e.resource, e.resourceData), w.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: c.value };
      return Ue(e.resource, a).then((v) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response", v), y(t, v);
      }).catch((v) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response error", v), y(t, v);
      });
    }, te = d(!1), Te = u(() => S.value ? e.type === l.TooltipLazy ? te.value : e.type === l.TooltipEver ? m.value : e.type === l.Tooltip : !1), ge = d(!1), Be = u(() => S.value ? e.type === l.SplitLazy ? ge.value : e.type === l.SplitEver ? T.value : e.type === l.Split : !1), De = (t) => {
      if (_.value) {
        _.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, Oe = (t) => {
      k("blur", t);
    }, j = u(() => e.type === l.Switch || e.type === l.HiddenSwitch), Ee = u(() => e.type === l.Switch), Ie = () => {
      e.modalCallbacks.forEach((t) => {
        qe(t);
      });
    }, Re = () => {
      var t;
      n("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, L = u(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), q = u(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), G = (t) => {
      var a, v, H, F, M, s, ne, ie, ae;
      if (n("Click", e, t), t && (j.value ? (a = t.target) != null && a.closest(".lkt-field.is-switch") || (c.value = !c.value) : q.value ? (m.value = !m.value, m.value && (te.value = !0)) : L.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), L.value || q.value) {
        y(t);
        return;
      }
      if (V) {
        let o = { ...e.modalData };
        n("Click -> has modal", e.modal, o), n("Click -> typeof beforeClose: ", typeof o.beforeClose), typeof o.beforeClose == "function" ? (o.beforeClose = (ue) => {
          if (e.resource)
            return R(t).then(() => {
              typeof e.modalData.beforeClose == "function" && e.modalData.beforeClose(ue);
            });
          typeof e.modalData.beforeClose == "function" && e.modalData.beforeClose(ue), y(t);
        }, n("Click -> New beforeClose function: ", o.beforeClose)) : (o.beforeClose = () => {
          if (e.resource)
            return R(t);
          y(t);
        }, n("Click -> New beforeClose function: ", o.beforeClose));
        let h = V;
        return typeof V == "function" && (h = V()), _e(h, ke, o);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm);
        let o = { ...e.confirmData };
        if (o.confirmButton ? o.confirmButton = { ...pe.defaultConfirmButton, ...o.confirmButton } : o.confirmButton = { ...pe.defaultConfirmButton }, o.confirmButton.events || (o.confirmButton.events = {}), typeof ((H = (v = o.confirmButton) == null ? void 0 : v.events) == null ? void 0 : H.click) == "function") {
          let h = (M = (F = o.confirmButton) == null ? void 0 : F.events) == null ? void 0 : M.click;
          n("Click -> Has onConfirm function: ", h), o.confirmButton.events.click = () => {
            if (n("OnConfirm -> Already: ", e), e.resource)
              return R(t).then(() => {
                h();
              });
            h(), y(t);
          }, n("Click -> New onConfirm function created: ", (ne = (s = o.confirmButton) == null ? void 0 : s.events) == null ? void 0 : ne.click);
        } else
          o.confirmButton.events.click = () => {
            var h;
            if (n("OnConfirm -> Created: ", e), e.resource)
              return R(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && X.push(e.anchor.to);
              return;
            }
            y(t);
          }, n("Click -> New onConfirm function created: ", (ie = o.confirmButton) == null ? void 0 : ie.events.click);
        return je(e.confirmModal, e.confirmModalKey, o);
      }
      if (e.resource)
        return n("Click -> has resource"), R(t);
      if (((ae = e.anchor) == null ? void 0 : ae.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && X.push(e.anchor.to);
        return;
      }
      if (j.value) {
        n("Click -> Is Switch"), y(t);
        return;
      }
      n("Click -> Emit", e), y(t);
    };
    E(() => e.loading, () => w.value = e.loading), E(() => e.checked, () => c.value = e.checked), E(c, (t) => k("update:checked", t)), E(g, (t) => {
      g.value && e.showTooltipOnHover ? (B.value !== void 0 && clearTimeout(B.value), B.value = setTimeout(() => {
        m.value = !0, clearTimeout(B.value);
      }, e.showTooltipOnHoverDelay)) : !g.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(B.value)) : g.value || clearTimeout(B.value);
    }), me({
      click: () => G(null),
      focus: (t) => {
        U.value && (t && (_.value = !0), U.value.focus());
      }
    });
    const Le = u(() => e.type === l.Content ? "div" : "button"), Me = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), oe = (t) => G(t), Ae = (t) => Y.value = t, le = u(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Ve = u(() => le.value ? new Je({ ...e.anchor, class: Z.value }) : {});
    return (t, a) => {
      const v = N("lkt-spinner"), H = N("lkt-anchor"), F = N("lkt-field"), M = N("lkt-tooltip");
      return i(), p("div", {
        class: I(["lkt-button-container", be.value]),
        ref_key: "container",
        ref: S,
        id: Ce,
        onMousemove: a[3] || (a[3] = (s) => g.value = !0),
        onMouseleave: a[4] || (a[4] = (s) => g.value = !1)
      }, [
        le.value ? (i(), C(H, J({ key: 0 }, Ve.value, {
          class: "lkt-button",
          onActive: Ae
        }), {
          default: x(() => [
            O.value ? (i(), p("i", {
              key: 0,
              class: I(O.value)
            }, null, 2)) : r("", !0),
            O.value && t.dot ? (i(), p("i", Xe, z(ee.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: D.value
            }, null, 8, Ye)) : r("", !0),
            D.value ? (i(), p(re, { key: 3 }, [
              ce(z(D.value), 1)
            ], 64)) : r("", !0),
            se(W).default ? P(t.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), C(v, { key: 5 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), C(fe(Le.value), {
          key: 1,
          class: I(["lkt-button", Z.value]),
          ref_key: "button",
          ref: U,
          name: t.name,
          type: t.type,
          disabled: Me.value,
          tabindex: t.tabindex,
          onClick: G,
          onFocus: De,
          onBlur: Oe
        }, {
          default: x(() => [
            O.value ? (i(), p("i", {
              key: 0,
              class: I(O.value)
            }, null, 2)) : r("", !0),
            O.value && t.dot ? (i(), p("i", Ze, z(ee.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: D.value
            }, null, 8, $e)) : r("", !0),
            D.value ? (i(), p(re, { key: 3 }, [
              ce(z(D.value), 1)
            ], 64)) : r("", !0),
            se(W).default ? P(t.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), C(v, { key: 5 })) : r("", !0),
            j.value ? xe((i(), C(F, {
              key: 6,
              type: "switch",
              modelValue: c.value,
              "onUpdate:modelValue": a[0] || (a[0] = (s) => c.value = s),
              onClick: Pe(() => {
              }, ["stop"])
            }, null, 8, ["modelValue"])), [
              [ze, Ee.value]
            ]) : r("", !0),
            $.value ? (i(), p("i", {
              key: 7,
              class: I([$.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            L.value ? (i(), p("div", et, [
              t.splitIcon ? (i(), p("i", {
                key: 0,
                class: I(t.splitIcon)
              }, null, 2)) : we.value ? (i(), C(fe(Se.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        L.value && S.value ? (i(), C(M, J({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": a[1] || (a[1] = (s) => T.value = s)
        }, t.tooltip, {
          referrer: S.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), de({ _: 2 }, [
          Be.value ? {
            name: "default",
            fn: x(({ doClose: s }) => [
              P(t.$slots, "split", {
                doClose: s,
                doRootClick: oe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        q.value && S.value ? (i(), C(M, J({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": a[2] || (a[2] = (s) => m.value = s)
        }, t.tooltip, { referrer: S.value }), de({ _: 2 }, [
          Te.value ? {
            name: "default",
            fn: x(({ doClose: s }) => [
              P(t.$slots, "tooltip", {
                doClose: s,
                doRootClick: oe
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), st = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", tt);
  }
}, ft = (f) => {
  b.defaultSplitIcon = f;
};
export {
  ct as debugLktButton,
  st as default,
  rt as setDefaultButtonPalette,
  ft as setDefaultButtonSplitSlot
};
