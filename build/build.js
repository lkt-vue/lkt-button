import { defineComponent as Re, mergeDefaults as Ee, useSlots as Ie, ref as d, watch as E, computed as r, resolveComponent as P, createElementBlock as m, openBlock as n, normalizeClass as I, createBlock as b, createCommentVNode as u, mergeProps as J, withCtx as z, renderSlot as K, toDisplayString as U, Fragment as ne, createTextVNode as ie, unref as ue, resolveDynamicComponent as ae, withDirectives as Le, vShow as Ae, createSlots as re, nextTick as Ve } from "vue";
import { generateRandomString as Me } from "lkt-string-tools";
import { httpCall as Fe } from "lkt-http-client";
import { openModal as He, openConfirm as Ne, runModalCallback as xe } from "lkt-modal";
import { useRouter as Pe } from "vue-router";
import { extractPropValue as Q, ButtonType as l, extractI18nValue as W, Anchor as ze, getDefaultValues as Ke, Button as Ue, LktSettings as ce } from "lkt-vue-kernel";
const M = class M {
};
M.DEFAULT_PALETTE = "", M.debugEnabled = !1, M.defaultSplitIcon = void 0;
let T = M;
const oo = (f) => {
  T.DEFAULT_PALETTE = f;
}, to = (f = !0) => {
  T.debugEnabled = f;
}, i = (...f) => {
  T.debugEnabled && console.info("[LktButton] ", ...f);
}, je = {
  key: 1,
  class: "lkt-button--icon-dot"
}, _e = ["src", "alt"], qe = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Ge = ["src", "alt"], Je = {
  key: 8,
  class: "lkt-split-button-arrow"
}, Qe = /* @__PURE__ */ Re({
  __name: "LktButton",
  props: /* @__PURE__ */ Ee({
    type: {},
    openTooltip: { type: Boolean },
    name: {},
    text: {},
    icon: {},
    class: {},
    containerClass: {},
    palette: {},
    value: {},
    disabled: { type: [Boolean, Function] },
    loading: { type: Boolean },
    wrapContent: { type: Boolean },
    checked: { type: Boolean },
    textOn: {},
    textOff: {},
    iconOn: {},
    iconOff: {},
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
    iconDot: { type: [Boolean, String, Number] },
    iconEnd: {},
    img: {},
    splitIcon: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: {},
    hideTooltipOnLeave: { type: Boolean },
    tooltip: {},
    splitClass: {},
    clickRef: {},
    tabindex: {},
    prop: {},
    onClick: { type: Function },
    onConfirm: { type: Function }
  }, Ke(Ue)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(f, { expose: se, emit: fe }) {
    const e = f, a = fe, X = Ie(), Y = Pe();
    let F = Q(e.modal, e.prop), pe = Q(e.modalKey, e.prop), de = Q(e.icon, e.prop);
    const me = "lkt-button-" + Me(), w = d(e.loading), S = d(null), j = d(null), g = d(!1), k = d(e.openTooltip), Z = d(!1), B = d(!1), D = d(void 0), p = d(e.checked), _ = d(!1);
    E(() => e.openTooltip, (o) => k.value = o), E(k, (o) => a("update:openTooltip", o));
    const $ = r(() => {
      let o = [];
      return e.class && o.push(e.class), A.value && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), o.push(`lkt-button--${e.type}`), w.value && o.push("is-loading"), Z.value && o.push("is-active-route"), k.value && o.push("show-tooltip"), g.value && o.push("show-split"), p.value && o.push("is-checked"), o.join(" ");
    }), ke = r(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), O = r(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (p.value && typeof e.textOn < "u") return W(e.textOn);
        if (!p.value && typeof e.textOff < "u") return W(e.textOff);
      }
      return W(e.text);
    }), R = r(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (p.value && typeof e.iconOn < "u") return e.iconOn;
        if (!p.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return de;
    }), ve = r(() => typeof T.defaultSplitIcon < "u"), ye = r(() => T.defaultSplitIcon), ee = r(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), L = async (o) => {
      i("Resource Click", e.resource, e.resourceData), w.value = !0, a("loading");
      let c = { ...e.resourceData, isChecked: p.value };
      return Fe(e.resource, c).then((v) => {
        w.value = !1, a("loaded"), i("Resource Click -> Received response", v), C(), h(), a("click", o, v);
      }).catch((v) => {
        w.value = !1, a("loaded"), i("Resource Click -> Received response error", v), C(), h(), a("click", o, v);
      });
    }, oe = d(!1), Ce = r(() => S.value ? e.type === l.TooltipLazy ? oe.value : e.type === l.TooltipEver ? k.value : e.type === l.Tooltip : !1), he = d(!1), be = r(() => S.value ? e.type === l.SplitLazy ? he.value : e.type === l.SplitEver ? g.value : e.type === l.Split : !1), Te = (o) => {
      if (_.value) {
        _.value = !1, a("focus");
        return;
      }
      a("focus", o);
    }, we = (o) => {
      a("blur", o);
    }, q = r(() => e.type === l.Switch || e.type === l.HiddenSwitch), Se = r(() => e.type === l.Switch), C = () => {
      e.modalCallbacks.forEach((o) => {
        xe(o);
      });
    }, h = () => {
      i("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, A = r(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), G = r(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), te = (o) => {
      var c, v, H, N, V, s;
      if (i("Click", e), o && (q.value ? (c = o.target) != null && c.closest(".lkt-field.is-switch") || (p.value = !p.value) : G.value ? (k.value = !k.value, k.value && (oe.value = !0)) : A.value && (g.value = !g.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), A.value || G.value) {
        C(), h(), a("click", o);
        return;
      }
      if (F) {
        let t = { ...e.modalData };
        i("Click -> has modal", e.modal, t), i("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (x) => {
          if (e.resource)
            return L(o).then(() => {
              x.beforeClose(x);
            });
          x.beforeClose(x), C(), h(), a("click", o);
        }, i("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (e.resource)
            return L(o);
          C(), h(), a("click", o);
        }, i("Click -> New beforeClose function: ", t.beforeClose));
        let y = F;
        return typeof F == "function" && (y = F()), He(y, pe, t);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm);
        let t = { ...e.confirmData };
        if (t.confirmButton ? t.confirmButton = { ...ce.defaultConfirmButton, ...t.confirmButton } : t.confirmButton = { ...ce.defaultConfirmButton }, typeof ((v = t.confirmButton) == null ? void 0 : v.onClick) == "function") {
          let y = (H = t.confirmButton) == null ? void 0 : H.onClick;
          i("Click -> Has onConfirm function: ", y), t.confirmButton.onClick = () => {
            if (i("OnConfirm -> Already: ", e), e.resource)
              return L(o).then(() => {
                y();
              });
            y(), C(), h(), a("click", o);
          }, i("Click -> New onConfirm function created: ", (N = t.confirmButton) == null ? void 0 : N.onClick);
        } else
          t.confirmButton.onClick = () => {
            var y;
            if (i("OnConfirm -> Created: ", e), e.resource)
              return L(o);
            if (((y = e.anchor) == null ? void 0 : y.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && Y.push(e.anchor.to);
              return;
            }
            C(), h(), a("click", o);
          }, i("Click -> New onConfirm function created: ", (V = t.confirmButton) == null ? void 0 : V.onClick);
        return Ne(e.confirmModal, e.confirmModalKey, t);
      }
      if (e.resource)
        return i("Click -> has resource"), L(o);
      if (((s = e.anchor) == null ? void 0 : s.to) !== "") {
        i("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && Y.push(e.anchor.to);
        return;
      }
      if (q.value) {
        i("Click -> Is Switch"), Ve(() => {
          C(), h(), a("click", o);
        });
        return;
      }
      i("Click -> Emit", e), a("click", o);
    };
    E(() => e.loading, () => w.value = e.loading), E(() => e.checked, () => p.value = e.checked), E(p, (o) => a("update:checked", o)), E(B, (o) => {
      B.value && e.showTooltipOnHover ? (D.value !== void 0 && clearTimeout(D.value), D.value = setTimeout(() => {
        k.value = !0, clearTimeout(D.value);
      }, e.showTooltipOnHoverDelay)) : !B.value && e.hideTooltipOnLeave ? (k.value = !1, clearTimeout(D.value)) : B.value || clearTimeout(D.value);
    }), se({
      click: () => te(null),
      focus: (o) => {
        j.value && (o && (_.value = !0), j.value.focus());
      }
    });
    const ge = r(() => e.type === l.Content ? "div" : "button"), Be = r(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), De = (o) => Z.value = o, le = r(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Oe = r(() => le.value ? new ze({ ...e.anchor, class: $.value }) : {});
    return (o, c) => {
      const v = P("lkt-spinner"), H = P("lkt-anchor"), N = P("lkt-field"), V = P("lkt-tooltip");
      return n(), m("div", {
        class: I(["lkt-button-container", ke.value]),
        ref_key: "container",
        ref: S,
        id: me,
        onMousemove: c[3] || (c[3] = (s) => B.value = !0),
        onMouseleave: c[4] || (c[4] = (s) => B.value = !1)
      }, [
        le.value ? (n(), b(H, J({ key: 0 }, Oe.value, {
          class: "lkt-button",
          onActive: De
        }), {
          default: z(() => [
            R.value ? (n(), m("i", {
              key: 0,
              class: I(R.value)
            }, null, 2)) : u("", !0),
            R.value && o.iconDot ? (n(), m("i", je, U(ee.value), 1)) : u("", !0),
            o.img ? (n(), m("img", {
              key: 2,
              src: o.img,
              alt: O.value
            }, null, 8, _e)) : u("", !0),
            O.value ? (n(), m(ne, { key: 3 }, [
              ie(U(O.value), 1)
            ], 64)) : u("", !0),
            ue(X).default ? K(o.$slots, "default", { key: 4 }) : u("", !0),
            w.value ? (n(), b(v, { key: 5 })) : u("", !0)
          ]),
          _: 3
        }, 16)) : (n(), b(ae(ge.value), {
          key: 1,
          class: I(["lkt-button", $.value]),
          ref_key: "button",
          ref: j,
          name: o.name,
          type: o.type,
          disabled: Be.value,
          tabindex: o.tabindex,
          onClick: te,
          onFocus: Te,
          onBlur: we
        }, {
          default: z(() => [
            R.value ? (n(), m("i", {
              key: 0,
              class: I(R.value)
            }, null, 2)) : u("", !0),
            R.value && o.iconDot ? (n(), m("i", qe, U(ee.value), 1)) : u("", !0),
            o.img ? (n(), m("img", {
              key: 2,
              src: o.img,
              alt: O.value
            }, null, 8, Ge)) : u("", !0),
            O.value ? (n(), m(ne, { key: 3 }, [
              ie(U(O.value), 1)
            ], 64)) : u("", !0),
            ue(X).default ? K(o.$slots, "default", { key: 4 }) : u("", !0),
            w.value ? (n(), b(v, { key: 5 })) : u("", !0),
            q.value ? Le((n(), b(N, {
              key: 6,
              type: "switch",
              modelValue: p.value,
              "onUpdate:modelValue": c[0] || (c[0] = (s) => p.value = s)
            }, null, 8, ["modelValue"])), [
              [Ae, Se.value]
            ]) : u("", !0),
            o.iconEnd ? (n(), m("i", {
              key: 7,
              class: I([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : u("", !0),
            A.value ? (n(), m("div", Je, [
              o.splitIcon ? (n(), m("i", {
                key: 0,
                class: I(o.splitIcon)
              }, null, 2)) : ve.value ? (n(), b(ae(ye.value), { key: 1 })) : u("", !0)
            ])) : u("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        A.value && S.value ? (n(), b(V, J({
          key: 2,
          modelValue: g.value,
          "onUpdate:modelValue": c[1] || (c[1] = (s) => g.value = s)
        }, o.tooltip, {
          referrer: S.value,
          class: ["lkt-split-button-dropdown-content", o.splitClass]
        }), re({ _: 2 }, [
          be.value ? {
            name: "default",
            fn: z(({ doClose: s, doRootClick: t }) => [
              K(o.$slots, "split", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : u("", !0),
        G.value && S.value ? (n(), b(V, J({
          key: 3,
          modelValue: k.value,
          "onUpdate:modelValue": c[2] || (c[2] = (s) => k.value = s)
        }, o.tooltip, { referrer: S.value }), re({ _: 2 }, [
          Ce.value ? {
            name: "default",
            fn: z(({ doClose: s, doRootClick: t }) => [
              K(o.$slots, "tooltip", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : u("", !0)
      ], 34);
    };
  }
}), lo = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", Qe);
  }
}, no = (f) => {
  T.defaultSplitIcon = f;
};
export {
  to as debugLktButton,
  lo as default,
  oo as setDefaultButtonPalette,
  no as setDefaultButtonSplitSlot
};
