import { defineComponent as Me, mergeDefaults as Ae, useSlots as Ve, ref as d, watch as E, computed as u, resolveComponent as N, createElementBlock as p, openBlock as i, normalizeClass as I, createBlock as h, createCommentVNode as r, mergeProps as J, withCtx as x, renderSlot as P, toDisplayString as z, Fragment as ie, createTextVNode as ae, unref as ue, resolveDynamicComponent as re, withDirectives as Fe, withModifiers as He, vShow as Ne, createSlots as ce } from "vue";
import { generateRandomString as xe } from "lkt-string-tools";
import { httpCall as Pe } from "lkt-http-client";
import { openModal as ze, openConfirm as Ke, runModalCallback as Ue } from "lkt-modal";
import { useRouter as _e } from "vue-router";
import { extractPropValue as K, ButtonType as t, extractI18nValue as Q, Anchor as je, getDefaultValues as qe, Button as Ge, LktSettings as se } from "lkt-vue-kernel";
const A = class A {
};
A.DEFAULT_PALETTE = "", A.debugEnabled = !1, A.defaultSplitIcon = void 0;
let b = A;
const io = (f) => {
  b.DEFAULT_PALETTE = f;
}, ao = (f = !0) => {
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
    const e = f, k = de, W = Ve(), X = _e();
    let V = K(e.modal, e.prop), pe = K(e.modalKey, e.prop), me = K(e.icon, e.prop), ve = K(e.iconEnd, e.prop);
    const ke = "lkt-button-" + xe(), w = d(e.loading), S = d(null), U = d(null), T = d(!1), m = d(e.openTooltip), Y = d(!1), g = d(!1), B = d(void 0), c = d(e.checked), _ = d(!1);
    E(() => e.openTooltip, (o) => m.value = o), E(m, (o) => k("update:openTooltip", o));
    const Z = u(() => {
      let o = [];
      return e.class && o.push(e.class), L.value && o.push("lkt-split-button"), o.push(`lkt-button--${e.type}`), w.value && o.push("is-loading"), Y.value && o.push("is-active-route"), m.value && o.push("show-tooltip"), T.value && o.push("show-split"), c.value && o.push("is-checked"), o.join(" ");
    }), ye = u(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), D = u(() => {
      if (e.type === t.Switch || e.type === t.HiddenSwitch) {
        if (c.value && typeof e.textOn < "u") return Q(e.textOn);
        if (!c.value && typeof e.textOff < "u") return Q(e.textOff);
      }
      return Q(e.text);
    }), O = u(() => {
      if (e.type === t.Switch || e.type === t.HiddenSwitch) {
        if (c.value && typeof e.iconOn < "u") return e.iconOn;
        if (!c.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return me;
    }), $ = u(() => {
      if (e.type === t.Switch || e.type === t.HiddenSwitch) {
        if (c.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!c.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return ve;
    }), Ce = u(() => typeof b.defaultSplitIcon < "u"), he = u(() => b.defaultSplitIcon), ee = u(() => typeof e.dot == "boolean" ? "" : e.dot), y = (o, a = void 0) => {
      n("endClickMethod", o, a), De(), Oe(), k("click", o, a);
    }, R = async (o) => {
      n("Resource Click", e.resource, e.resourceData), w.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: c.value };
      return Pe(e.resource, a).then((v) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response", v), y(o, v);
      }).catch((v) => {
        w.value = !1, k("loaded"), n("Resource Click -> Received response error", v), y(o, v);
      });
    }, oe = d(!1), be = u(() => S.value ? e.type === t.TooltipLazy ? oe.value : e.type === t.TooltipEver ? m.value : e.type === t.Tooltip : !1), we = d(!1), Se = u(() => S.value ? e.type === t.SplitLazy ? we.value : e.type === t.SplitEver ? T.value : e.type === t.Split : !1), Te = (o) => {
      if (_.value) {
        _.value = !1, k("focus");
        return;
      }
      k("focus", o);
    }, ge = (o) => {
      k("blur", o);
    }, j = u(() => e.type === t.Switch || e.type === t.HiddenSwitch), Be = u(() => e.type === t.Switch), De = () => {
      e.modalCallbacks.forEach((o) => {
        Ue(o);
      });
    }, Oe = () => {
      n("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, L = u(() => [
      t.Split,
      t.SplitLazy,
      t.SplitEver
    ].includes(e.type)), q = u(() => [
      t.Tooltip,
      t.TooltipLazy,
      t.TooltipEver
    ].includes(e.type)), G = (o) => {
      var a, v, F, H, M, s;
      if (n("Click", e, o), o && (j.value ? (a = o.target) != null && a.closest(".lkt-field.is-switch") || (c.value = !c.value) : q.value ? (m.value = !m.value, m.value && (oe.value = !0)) : L.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), L.value || q.value) {
        y(o);
        return;
      }
      if (V) {
        let l = { ...e.modalData };
        n("Click -> has modal", e.modal, l), n("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (ne) => {
          if (e.resource)
            return R(o).then(() => {
              typeof e.modalData.beforeClose == "function" && e.modalData.beforeClose(ne);
            });
          typeof e.modalData.beforeClose == "function" && e.modalData.beforeClose(ne), y(o);
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
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && X.push(e.anchor.to);
              return;
            }
            y(o);
          }, n("Click -> New onConfirm function created: ", (M = l.confirmButton) == null ? void 0 : M.onClick);
        return Ke(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return n("Click -> has resource"), R(o);
      if (((s = e.anchor) == null ? void 0 : s.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && X.push(e.anchor.to);
        return;
      }
      if (j.value) {
        n("Click -> Is Switch"), y(o);
        return;
      }
      n("Click -> Emit", e), y(o);
    };
    E(() => e.loading, () => w.value = e.loading), E(() => e.checked, () => c.value = e.checked), E(c, (o) => k("update:checked", o)), E(g, (o) => {
      g.value && e.showTooltipOnHover ? (B.value !== void 0 && clearTimeout(B.value), B.value = setTimeout(() => {
        m.value = !0, clearTimeout(B.value);
      }, e.showTooltipOnHoverDelay)) : !g.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(B.value)) : g.value || clearTimeout(B.value);
    }), fe({
      click: () => G(null),
      focus: (o) => {
        U.value && (o && (_.value = !0), U.value.focus());
      }
    });
    const Ee = u(() => e.type === t.Content ? "div" : "button"), Ie = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), te = (o) => G(o), Re = (o) => Y.value = o, le = u(() => e.type === t.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Le = u(() => le.value ? new je({ ...e.anchor, class: Z.value }) : {});
    return (o, a) => {
      const v = N("lkt-spinner"), F = N("lkt-anchor"), H = N("lkt-field"), M = N("lkt-tooltip");
      return i(), p("div", {
        class: I(["lkt-button-container", ye.value]),
        ref_key: "container",
        ref: S,
        id: ke,
        onMousemove: a[3] || (a[3] = (s) => g.value = !0),
        onMouseleave: a[4] || (a[4] = (s) => g.value = !1)
      }, [
        le.value ? (i(), h(F, J({ key: 0 }, Le.value, {
          class: "lkt-button",
          onActive: Re
        }), {
          default: x(() => [
            O.value ? (i(), p("i", {
              key: 0,
              class: I(O.value)
            }, null, 2)) : r("", !0),
            O.value && o.dot ? (i(), p("i", Je, z(ee.value), 1)) : r("", !0),
            o.img ? (i(), p("img", {
              key: 2,
              src: o.img,
              alt: D.value
            }, null, 8, Qe)) : r("", !0),
            D.value ? (i(), p(ie, { key: 3 }, [
              ae(z(D.value), 1)
            ], 64)) : r("", !0),
            ue(W).default ? P(o.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), h(v, { key: 5 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), h(re(Ee.value), {
          key: 1,
          class: I(["lkt-button", Z.value]),
          ref_key: "button",
          ref: U,
          name: o.name,
          type: o.type,
          disabled: Ie.value,
          tabindex: o.tabindex,
          onClick: G,
          onFocus: Te,
          onBlur: ge
        }, {
          default: x(() => [
            O.value ? (i(), p("i", {
              key: 0,
              class: I(O.value)
            }, null, 2)) : r("", !0),
            O.value && o.dot ? (i(), p("i", We, z(ee.value), 1)) : r("", !0),
            o.img ? (i(), p("img", {
              key: 2,
              src: o.img,
              alt: D.value
            }, null, 8, Xe)) : r("", !0),
            D.value ? (i(), p(ie, { key: 3 }, [
              ae(z(D.value), 1)
            ], 64)) : r("", !0),
            ue(W).default ? P(o.$slots, "default", { key: 4 }) : r("", !0),
            w.value ? (i(), h(v, { key: 5 })) : r("", !0),
            j.value ? Fe((i(), h(H, {
              key: 6,
              type: "switch",
              modelValue: c.value,
              "onUpdate:modelValue": a[0] || (a[0] = (s) => c.value = s),
              onClick: He(() => {
              }, ["stop"])
            }, null, 8, ["modelValue"])), [
              [Ne, Be.value]
            ]) : r("", !0),
            $.value ? (i(), p("i", {
              key: 7,
              class: I([$.value, "lkt-button-icon-end"])
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
        L.value && S.value ? (i(), h(M, J({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": a[1] || (a[1] = (s) => T.value = s)
        }, o.tooltip, {
          referrer: S.value,
          class: ["lkt-split-button-dropdown-content", o.splitClass]
        }), ce({ _: 2 }, [
          Se.value ? {
            name: "default",
            fn: x(({ doClose: s }) => [
              P(o.$slots, "split", {
                doClose: s,
                doRootClick: te
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        q.value && S.value ? (i(), h(M, J({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": a[2] || (a[2] = (s) => m.value = s)
        }, o.tooltip, { referrer: S.value }), ce({ _: 2 }, [
          be.value ? {
            name: "default",
            fn: x(({ doClose: s }) => [
              P(o.$slots, "tooltip", {
                doClose: s,
                doRootClick: te
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), uo = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", Ze);
  }
}, ro = (f) => {
  b.defaultSplitIcon = f;
};
export {
  ao as debugLktButton,
  uo as default,
  io as setDefaultButtonPalette,
  ro as setDefaultButtonSplitSlot
};
