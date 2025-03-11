import { defineComponent as Ne, mergeDefaults as xe, useSlots as Pe, ref as d, watch as E, computed as u, resolveComponent as x, createElementBlock as p, openBlock as i, normalizeClass as I, createBlock as C, createCommentVNode as r, mergeProps as Q, withCtx as P, renderSlot as j, toDisplayString as z, Fragment as se, createTextVNode as fe, unref as de, resolveDynamicComponent as pe, withDirectives as je, withModifiers as ze, vShow as Ke, createSlots as ve } from "vue";
import { generateRandomString as Ue } from "lkt-string-tools";
import { httpCall as _e } from "lkt-http-client";
import { openModal as qe, openConfirm as Ge, runModalCallback as Je } from "lkt-modal";
import { useRouter as Qe } from "vue-router";
import { extractPropValue as K, ButtonType as l, extractI18nValue as W, Anchor as We, getDefaultValues as Xe, Button as Ye, LktSettings as me } from "lkt-vue-kernel";
const V = class V {
};
V.DEFAULT_PALETTE = "", V.debugEnabled = !1, V.defaultSplitIcon = void 0;
let b = V;
const st = (f) => {
  b.DEFAULT_PALETTE = f;
}, ft = (f = !0) => {
  b.debugEnabled = f;
}, n = (...f) => {
  b.debugEnabled && console.info("[LktButton] ", ...f);
}, Ze = {
  key: 1,
  class: "lkt-button--icon-dot"
}, $e = ["src", "alt"], et = {
  key: 1,
  class: "lkt-button--icon-dot"
}, tt = ["src", "alt"], ot = {
  key: 8,
  class: "lkt-split-button-arrow"
}, lt = /* @__PURE__ */ Ne({
  __name: "LktButton",
  props: /* @__PURE__ */ xe({
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
    modalData: { type: [Object, Function] },
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
  }, Xe(Ye)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(f, { expose: ke, emit: ye }) {
    const e = f, k = ye, X = Pe(), Y = Qe();
    let F = K(e.modal, e.prop), he = K(e.modalKey, e.prop), Ce = K(e.icon, e.prop), be = K(e.iconEnd, e.prop);
    const we = "lkt-button-" + Ue(), w = d(e.loading), S = d(null), U = d(null), T = d(!1), v = d(e.openTooltip), Z = d(!1), g = d(!1), B = d(void 0), c = d(e.checked), _ = d(!1);
    E(() => e.openTooltip, (t) => v.value = t), E(v, (t) => k("update:openTooltip", t));
    const $ = u(() => {
      let t = [];
      return e.class && t.push(e.class), L.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), Z.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), T.value && t.push("show-split"), c.value && t.push("is-checked"), t.join(" ");
    }), Se = u(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), O = u(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (c.value && typeof e.textOn < "u") return W(e.textOn);
        if (!c.value && typeof e.textOff < "u") return W(e.textOff);
      }
      return W(e.text);
    }), D = u(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (c.value && typeof e.iconOn < "u") return e.iconOn;
        if (!c.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return Ce;
    }), ee = u(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (c.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!c.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return be;
    }), R = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Te = u(() => typeof b.defaultSplitIcon < "u"), ge = u(() => b.defaultSplitIcon), te = u(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, a = void 0) => {
      n("endClickMethod", t, a), Me(), Le(), k("click", t, a);
    }, M = async (t) => {
      n("Resource Click", e.resource, e.resourceData), w.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: c.value };
      return _e(e.resource, a).then((m) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response", m), y(t, m);
      }).catch((m) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response error", m), y(t, m);
      });
    }, oe = d(!1), Be = u(() => S.value ? e.type === l.TooltipLazy ? oe.value : e.type === l.TooltipEver ? v.value : e.type === l.Tooltip : !1), Oe = d(!1), De = u(() => S.value ? e.type === l.SplitLazy ? Oe.value : e.type === l.SplitEver ? T.value : e.type === l.Split : !1), Ee = (t) => {
      if (_.value) {
        _.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, Ie = (t) => {
      k("blur", t);
    }, q = u(() => e.type === l.Switch || e.type === l.HiddenSwitch), Re = u(() => e.type === l.Switch), Me = () => {
      e.modalCallbacks.forEach((t) => {
        Je(t);
      });
    }, Le = () => {
      var t;
      n("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, L = u(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), G = u(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), J = (t) => {
      var a, m, H, N, A, s, ie, ue, ae, re;
      if (n("Click", e, t), t && (q.value ? (a = t.target) != null && a.closest(".lkt-field.is-switch") || (c.value = !c.value) : G.value ? (v.value = !v.value, v.value && (oe.value = !0)) : L.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), L.value || G.value) {
        y(t);
        return;
      }
      if (F) {
        let o = { ...R.value };
        n("Click -> has modal", e.modal, o), n("Click -> typeof beforeClose: ", typeof o.beforeClose), typeof o.beforeClose == "function" ? (o.beforeClose = (ce) => {
          if (e.resource)
            return M(t).then(() => {
              typeof R.value.beforeClose == "function" && R.value.beforeClose(ce);
            });
          typeof R.value.beforeClose == "function" && R.value.beforeClose(ce), y(t);
        }, n("Click -> New beforeClose function: ", o.beforeClose)) : (o.beforeClose = () => {
          if (e.resource)
            return M(t);
          y(t);
        }, n("Click -> New beforeClose function: ", o.beforeClose));
        let h = F;
        return typeof F == "function" && (h = F()), qe(h, he, o);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof ((m = e.confirmData.events) == null ? void 0 : m.click));
        let o = { ...e.confirmData };
        if (o.confirmButton ? o.confirmButton = { ...me.defaultConfirmButton, ...o.confirmButton } : o.confirmButton = { ...me.defaultConfirmButton }, o.confirmButton.events || (o.confirmButton.events = {}), typeof ((N = (H = o.confirmButton) == null ? void 0 : H.events) == null ? void 0 : N.click) == "function") {
          let h = (s = (A = o.confirmButton) == null ? void 0 : A.events) == null ? void 0 : s.click;
          n("Click -> Has onConfirm function: ", h), o.confirmButton.events.click = () => {
            if (n("OnConfirm -> Already: ", e), e.resource)
              return M(t).then(() => {
                h();
              });
            h(), y(t);
          }, n("Click -> New onConfirm function created: ", (ue = (ie = o.confirmButton) == null ? void 0 : ie.events) == null ? void 0 : ue.click);
        } else
          o.confirmButton.events.click = () => {
            var h;
            if (n("OnConfirm -> Created: ", e), e.resource)
              return M(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && Y.push(e.anchor.to);
              return;
            }
            y(t);
          }, n("Click -> New onConfirm function created: ", (ae = o.confirmButton) == null ? void 0 : ae.events.click);
        return Ge(e.confirmModal, e.confirmModalKey, o);
      }
      if (e.resource)
        return n("Click -> has resource"), M(t);
      if (((re = e.anchor) == null ? void 0 : re.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && Y.push(e.anchor.to);
        return;
      }
      if (q.value) {
        n("Click -> Is Switch"), y(t);
        return;
      }
      n("Click -> Emit", e), y(t);
    };
    E(() => e.loading, () => w.value = e.loading), E(() => e.checked, () => c.value = e.checked), E(c, (t) => k("update:checked", t)), E(g, (t) => {
      g.value && e.showTooltipOnHover ? (B.value !== void 0 && clearTimeout(B.value), B.value = setTimeout(() => {
        v.value = !0, clearTimeout(B.value);
      }, e.showTooltipOnHoverDelay)) : !g.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(B.value)) : g.value || clearTimeout(B.value);
    }), ke({
      click: () => J(null),
      focus: (t) => {
        U.value && (t && (_.value = !0), U.value.focus());
      }
    });
    const Ae = u(() => e.type === l.Content ? "div" : "button"), Ve = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), le = (t) => J(t), Fe = (t) => Z.value = t, ne = u(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), He = u(() => ne.value ? new We({ ...e.anchor, class: $.value }) : {});
    return (t, a) => {
      const m = x("lkt-spinner"), H = x("lkt-anchor"), N = x("lkt-field"), A = x("lkt-tooltip");
      return i(), p("div", {
        class: I(["lkt-button-container", Se.value]),
        ref_key: "container",
        ref: S,
        id: we,
        onMousemove: a[3] || (a[3] = (s) => g.value = !0),
        onMouseleave: a[4] || (a[4] = (s) => g.value = !1)
      }, [
        ne.value ? (i(), C(H, Q({ key: 0 }, He.value, {
          class: "lkt-button",
          onActive: Fe
        }), {
          default: P(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: I(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", Ze, z(te.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: O.value
            }, null, 8, $e)) : r("", !0),
            O.value ? (i(), p(se, { key: 3 }, [
              fe(z(O.value), 1)
            ], 64)) : r("", !0),
            de(X).default ? j(t.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), C(m, { key: 5 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), C(pe(Ae.value), {
          key: 1,
          class: I(["lkt-button", $.value]),
          ref_key: "button",
          ref: U,
          name: t.name,
          type: t.type,
          disabled: Ve.value,
          tabindex: t.tabindex,
          onClick: J,
          onFocus: Ee,
          onBlur: Ie
        }, {
          default: P(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: I(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", et, z(te.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: O.value
            }, null, 8, tt)) : r("", !0),
            O.value ? (i(), p(se, { key: 3 }, [
              fe(z(O.value), 1)
            ], 64)) : r("", !0),
            de(X).default ? j(t.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), C(m, { key: 5 })) : r("", !0),
            q.value ? je((i(), C(N, {
              key: 6,
              type: "switch",
              modelValue: c.value,
              "onUpdate:modelValue": a[0] || (a[0] = (s) => c.value = s),
              onClick: ze(() => {
              }, ["stop"])
            }, null, 8, ["modelValue"])), [
              [Ke, Re.value]
            ]) : r("", !0),
            ee.value ? (i(), p("i", {
              key: 7,
              class: I([ee.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            L.value ? (i(), p("div", ot, [
              t.splitIcon ? (i(), p("i", {
                key: 0,
                class: I(t.splitIcon)
              }, null, 2)) : Te.value ? (i(), C(pe(ge.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        L.value && S.value ? (i(), C(A, Q({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": a[1] || (a[1] = (s) => T.value = s)
        }, t.tooltip, {
          referrer: S.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), ve({ _: 2 }, [
          De.value ? {
            name: "default",
            fn: P(({ doClose: s }) => [
              j(t.$slots, "split", {
                doClose: s,
                doRootClick: le
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        G.value && S.value ? (i(), C(A, Q({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": a[2] || (a[2] = (s) => v.value = s)
        }, t.tooltip, { referrer: S.value }), ve({ _: 2 }, [
          Be.value ? {
            name: "default",
            fn: P(({ doClose: s }) => [
              j(t.$slots, "tooltip", {
                doClose: s,
                doRootClick: le
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), dt = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", lt);
  }
}, pt = (f) => {
  b.defaultSplitIcon = f;
};
export {
  ft as debugLktButton,
  dt as default,
  st as setDefaultButtonPalette,
  pt as setDefaultButtonSplitSlot
};
