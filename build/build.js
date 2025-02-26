import { defineComponent as Me, mergeDefaults as Ae, useSlots as Ve, ref as d, watch as D, computed as a, resolveComponent as x, createElementBlock as p, openBlock as i, normalizeClass as I, createBlock as h, createCommentVNode as r, mergeProps as Q, withCtx as P, renderSlot as z, toDisplayString as K, Fragment as ie, createTextVNode as ue, unref as ae, resolveDynamicComponent as re, withDirectives as Fe, withModifiers as He, vShow as Ne, createSlots as ce } from "vue";
import { generateRandomString as xe } from "lkt-string-tools";
import { httpCall as Pe } from "lkt-http-client";
import { openModal as ze, openConfirm as Ke, runModalCallback as Ue } from "lkt-modal";
import { useRouter as _e } from "vue-router";
import { extractPropValue as U, ButtonType as t, extractI18nValue as W, Anchor as je, getDefaultValues as qe, Button as Ge, LktSettings as se } from "lkt-vue-kernel";
const A = class A {
};
A.DEFAULT_PALETTE = "", A.debugEnabled = !1, A.defaultSplitIcon = void 0;
let b = A;
const io = (f) => {
  b.DEFAULT_PALETTE = f;
}, uo = (f = !0) => {
  b.debugEnabled = f;
}, n = (...f) => {
  b.debugEnabled && console.info("[LktButton] ", ...f);
}, Je = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Qe = ["src", "alt"], We = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Xe = ["src", "alt"], Ye = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Ze = /* @__PURE__ */ Me({
  __name: "LktButton",
  props: /* @__PURE__ */ Ae({
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
    onClick: { type: Function }
  }, qe(Ge)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(f, { expose: fe, emit: de }) {
    const e = f, k = de, X = Ve(), Y = _e();
    let V = U(e.modal, e.prop), pe = U(e.modalKey, e.prop), me = U(e.icon, e.prop), ve = U(e.iconEnd, e.prop);
    const ke = "lkt-button-" + xe(), w = d(e.loading), S = d(null), _ = d(null), T = d(!1), m = d(e.openTooltip), Z = d(!1), g = d(!1), B = d(void 0), c = d(e.checked), j = d(!1);
    D(() => e.openTooltip, (o) => m.value = o), D(m, (o) => k("update:openTooltip", o));
    const $ = a(() => {
      let o = [];
      return e.class && o.push(e.class), L.value && o.push("lkt-split-button"), o.push(`lkt-button--${e.type}`), w.value && o.push("is-loading"), Z.value && o.push("is-active-route"), m.value && o.push("show-tooltip"), T.value && o.push("show-split"), c.value && o.push("is-checked"), o.join(" ");
    }), ye = a(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), O = a(() => {
      if (e.type === t.Switch || e.type === t.HiddenSwitch) {
        if (c.value && typeof e.textOn < "u") return W(e.textOn);
        if (!c.value && typeof e.textOff < "u") return W(e.textOff);
      }
      return W(e.text);
    }), E = a(() => {
      if (e.type === t.Switch || e.type === t.HiddenSwitch) {
        if (c.value && typeof e.iconOn < "u") return e.iconOn;
        if (!c.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return me;
    }), ee = a(() => {
      if (e.type === t.Switch || e.type === t.HiddenSwitch) {
        if (c.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!c.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return ve;
    }), Ce = a(() => typeof b.defaultSplitIcon < "u"), he = a(() => b.defaultSplitIcon), oe = a(() => typeof e.dot == "boolean" ? "" : e.dot), y = (o, u = void 0) => {
      n("endClickMethod", o, u), Oe(), Ee(), k("click", o, u);
    }, R = async (o) => {
      n("Resource Click", e.resource, e.resourceData), w.value = !0, k("loading");
      let u = { ...e.resourceData, isChecked: c.value };
      return Pe(e.resource, u).then((v) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response", v), y(o, v);
      }).catch((v) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response error", v), y(o, v);
      });
    }, te = d(!1), be = a(() => S.value ? e.type === t.TooltipLazy ? te.value : e.type === t.TooltipEver ? m.value : e.type === t.Tooltip : !1), we = d(!1), Se = a(() => S.value ? e.type === t.SplitLazy ? we.value : e.type === t.SplitEver ? T.value : e.type === t.Split : !1), Te = (o) => {
      if (j.value) {
        j.value = !1, k("focus");
        return;
      }
      k("focus", o);
    }, ge = (o) => {
      k("blur", o);
    }, q = a(() => e.type === t.Switch || e.type === t.HiddenSwitch), Be = a(() => e.type === t.Switch), Oe = () => {
      e.modalCallbacks.forEach((o) => {
        Ue(o);
      });
    }, Ee = () => {
      n("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, L = a(() => [
      t.Split,
      t.SplitLazy,
      t.SplitEver
    ].includes(e.type)), G = a(() => [
      t.Tooltip,
      t.TooltipLazy,
      t.TooltipEver
    ].includes(e.type)), J = (o) => {
      var u, v, F, H, M, s;
      if (n("Click", e, o), o && (q.value ? (u = o.target) != null && u.closest(".lkt-field.is-switch") || (c.value = !c.value) : G.value ? (m.value = !m.value, m.value && (te.value = !0)) : L.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), L.value || G.value) {
        y(o);
        return;
      }
      if (V) {
        let l = { ...e.modalData };
        n("Click -> has modal", e.modal, l), n("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (N) => {
          if (e.resource)
            return R(o).then(() => {
              N.beforeClose(N);
            });
          N.beforeClose(N), y(o);
        }, n("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return R(o);
          y(o);
        }, n("Click -> New beforeClose function: ", l.beforeClose));
        let C = V;
        return typeof V == "function" && (C = V()), ze(C, pe, l);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm);
        let l = { ...e.confirmData };
        if (l.confirmButton ? l.confirmButton = { ...se.defaultConfirmButton, ...l.confirmButton } : l.confirmButton = { ...se.defaultConfirmButton }, typeof ((v = l.confirmButton) == null ? void 0 : v.onClick) == "function") {
          let C = (F = l.confirmButton) == null ? void 0 : F.onClick;
          n("Click -> Has onConfirm function: ", C), l.confirmButton.onClick = () => {
            if (n("OnConfirm -> Already: ", e), e.resource)
              return R(o).then(() => {
                C();
              });
            C(), y(o);
          }, n("Click -> New onConfirm function created: ", (H = l.confirmButton) == null ? void 0 : H.onClick);
        } else
          l.confirmButton.onClick = () => {
            var C;
            if (n("OnConfirm -> Created: ", e), e.resource)
              return R(o);
            if (((C = e.anchor) == null ? void 0 : C.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && Y.push(e.anchor.to);
              return;
            }
            y(o);
          }, n("Click -> New onConfirm function created: ", (M = l.confirmButton) == null ? void 0 : M.onClick);
        return Ke(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return n("Click -> has resource"), R(o);
      if (((s = e.anchor) == null ? void 0 : s.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && Y.push(e.anchor.to);
        return;
      }
      if (q.value) {
        n("Click -> Is Switch"), y(o);
        return;
      }
      n("Click -> Emit", e), y(o);
    };
    D(() => e.loading, () => w.value = e.loading), D(() => e.checked, () => c.value = e.checked), D(c, (o) => k("update:checked", o)), D(g, (o) => {
      g.value && e.showTooltipOnHover ? (B.value !== void 0 && clearTimeout(B.value), B.value = setTimeout(() => {
        m.value = !0, clearTimeout(B.value);
      }, e.showTooltipOnHoverDelay)) : !g.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(B.value)) : g.value || clearTimeout(B.value);
    }), fe({
      click: () => J(null),
      focus: (o) => {
        _.value && (o && (j.value = !0), _.value.focus());
      }
    });
    const De = a(() => e.type === t.Content ? "div" : "button"), Ie = a(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), le = (o) => J(o), Re = (o) => Z.value = o, ne = a(() => e.type === t.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Le = a(() => ne.value ? new je({ ...e.anchor, class: $.value }) : {});
    return (o, u) => {
      const v = x("lkt-spinner"), F = x("lkt-anchor"), H = x("lkt-field"), M = x("lkt-tooltip");
      return i(), p("div", {
        class: I(["lkt-button-container", ye.value]),
        ref_key: "container",
        ref: S,
        id: ke,
        onMousemove: u[3] || (u[3] = (s) => g.value = !0),
        onMouseleave: u[4] || (u[4] = (s) => g.value = !1)
      }, [
        ne.value ? (i(), h(F, Q({ key: 0 }, Le.value, {
          class: "lkt-button",
          onActive: Re
        }), {
          default: P(() => [
            E.value ? (i(), p("i", {
              key: 0,
              class: I(E.value)
            }, null, 2)) : r("", !0),
            E.value && o.dot ? (i(), p("i", Je, K(oe.value), 1)) : r("", !0),
            o.img ? (i(), p("img", {
              key: 2,
              src: o.img,
              alt: O.value
            }, null, 8, Qe)) : r("", !0),
            O.value ? (i(), p(ie, { key: 3 }, [
              ue(K(O.value), 1)
            ], 64)) : r("", !0),
            ae(X).default ? z(o.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), h(v, { key: 5 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), h(re(De.value), {
          key: 1,
          class: I(["lkt-button", $.value]),
          ref_key: "button",
          ref: _,
          name: o.name,
          type: o.type,
          disabled: Ie.value,
          tabindex: o.tabindex,
          onClick: J,
          onFocus: Te,
          onBlur: ge
        }, {
          default: P(() => [
            E.value ? (i(), p("i", {
              key: 0,
              class: I(E.value)
            }, null, 2)) : r("", !0),
            E.value && o.dot ? (i(), p("i", We, K(oe.value), 1)) : r("", !0),
            o.img ? (i(), p("img", {
              key: 2,
              src: o.img,
              alt: O.value
            }, null, 8, Xe)) : r("", !0),
            O.value ? (i(), p(ie, { key: 3 }, [
              ue(K(O.value), 1)
            ], 64)) : r("", !0),
            ae(X).default ? z(o.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), h(v, { key: 5 })) : r("", !0),
            q.value ? Fe((i(), h(H, {
              key: 6,
              type: "switch",
              modelValue: c.value,
              "onUpdate:modelValue": u[0] || (u[0] = (s) => c.value = s),
              onClick: He(() => {
              }, ["stop"])
            }, null, 8, ["modelValue"])), [
              [Ne, Be.value]
            ]) : r("", !0),
            ee.value ? (i(), p("i", {
              key: 7,
              class: I([ee.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            L.value ? (i(), p("div", Ye, [
              o.splitIcon ? (i(), p("i", {
                key: 0,
                class: I(o.splitIcon)
              }, null, 2)) : Ce.value ? (i(), h(re(he.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        L.value && S.value ? (i(), h(M, Q({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": u[1] || (u[1] = (s) => T.value = s)
        }, o.tooltip, {
          referrer: S.value,
          class: ["lkt-split-button-dropdown-content", o.splitClass]
        }), ce({ _: 2 }, [
          Se.value ? {
            name: "default",
            fn: P(({ doClose: s }) => [
              z(o.$slots, "split", {
                doClose: s,
                doRootClick: le
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        G.value && S.value ? (i(), h(M, Q({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": u[2] || (u[2] = (s) => m.value = s)
        }, o.tooltip, { referrer: S.value }), ce({ _: 2 }, [
          be.value ? {
            name: "default",
            fn: P(({ doClose: s }) => [
              z(o.$slots, "tooltip", {
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
}), ao = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", Ze);
  }
}, ro = (f) => {
  b.defaultSplitIcon = f;
};
export {
  uo as debugLktButton,
  ao as default,
  io as setDefaultButtonPalette,
  ro as setDefaultButtonSplitSlot
};
