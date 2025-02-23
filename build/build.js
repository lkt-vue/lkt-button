import { defineComponent as De, mergeDefaults as Re, useSlots as Ee, ref as p, watch as E, computed as r, resolveComponent as z, createElementBlock as d, openBlock as l, normalizeClass as I, createBlock as b, createCommentVNode as i, mergeProps as X, withCtx as K, renderSlot as U, unref as M, toDisplayString as j, Fragment as ne, createTextVNode as ie, resolveDynamicComponent as ae, withDirectives as Ie, vShow as Le, createSlots as ue, nextTick as Ae } from "vue";
import { generateRandomString as Ve } from "lkt-string-tools";
import { httpCall as Me } from "lkt-http-client";
import { openModal as Fe, openConfirm as Oe, runModalCallback as Ne } from "lkt-modal";
import { useRouter as He } from "vue-router";
import { extractPropValue as Y, extractI18nValue as Pe, ButtonType as u, Anchor as ze, getDefaultValues as Ke, Button as Ue, LktSettings as re } from "lkt-vue-kernel";
const F = class F {
};
F.DEFAULT_PALETTE = "", F.debugEnabled = !1, F.defaultSplitIcon = void 0;
let T = F;
const eo = (f) => {
  T.DEFAULT_PALETTE = f;
}, oo = (f = !0) => {
  T.debugEnabled = f;
}, n = (...f) => {
  T.debugEnabled && console.info("[LktButton] ", ...f);
}, je = {
  key: 1,
  class: "lkt-button--icon-dot"
}, qe = ["src", "alt"], Ge = {
  key: 1,
  class: "lkt-button--icon-dot"
}, Je = ["src", "alt"], Qe = {
  key: 8,
  class: "lkt-split-button-arrow"
}, We = /* @__PURE__ */ De({
  __name: "LktButton",
  props: /* @__PURE__ */ Re({
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
    disabled: { type: [Boolean, Function] },
    loading: { type: Boolean },
    wrapContent: { type: Boolean },
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
  setup(f, { expose: ce, emit: se }) {
    const e = f, a = se, Z = Ee(), _ = He();
    let O = Y(e.modal, e.prop), fe = Y(e.modalKey, e.prop), q = Y(e.icon, e.prop);
    const pe = "lkt-button-" + Ve(), g = p(e.loading), B = p(null), G = p(null), w = p(!1), m = p(e.openTooltip), x = p(!1), S = p(!1), D = p(void 0), y = p(e.checked), J = p(!1);
    E(() => e.openTooltip, (o) => m.value = o), E(m, (o) => a("update:openTooltip", o));
    const $ = r(() => {
      let o = [];
      return e.class && o.push(e.class), A.value && o.push("lkt-split-button"), e.palette && o.push(`lkt-button--${e.palette}`, `palette--${e.palette}`), o.push(`lkt-button--${e.type}`), g.value && o.push("is-loading"), x.value && o.push("is-active-route"), m.value && o.push("show-tooltip"), w.value && o.push("show-split"), y.value && o.push("is-checked"), o.join(" ");
    }), de = r(() => {
      let o = [];
      return e.containerClass && o.push(e.containerClass), o.join(" ");
    }), R = r(() => Pe(e.text)), me = r(() => typeof T.defaultSplitIcon < "u"), ke = r(() => T.defaultSplitIcon), ee = r(() => typeof e.iconDot == "boolean" ? "" : e.iconDot), L = async (o) => {
      n("Resource Click", e.resource, e.resourceData), g.value = !0, a("loading");
      let c = { ...e.resourceData, isChecked: y.value };
      return Me(e.resource, c).then((k) => {
        g.value = !1, a("loaded"), n("Resource Click -> Received response", k), C(), h(), a("click", o, k);
      }).catch((k) => {
        g.value = !1, a("loaded"), n("Resource Click -> Received response error", k), C(), h(), a("click", o, k);
      });
    }, oe = p(!1), ve = r(() => B.value ? e.type === u.TooltipLazy ? oe.value : e.type === u.TooltipEver ? m.value : e.type === u.Tooltip : !1), ye = p(!1), Ce = r(() => B.value ? e.type === u.SplitLazy ? ye.value : e.type === u.SplitEver ? w.value : e.type === u.Split : !1), he = (o) => {
      if (J.value) {
        J.value = !1, a("focus");
        return;
      }
      a("focus", o);
    }, be = (o) => {
      a("blur", o);
    }, Q = r(() => e.type === u.Switch || e.type === u.HiddenSwitch), Te = r(() => e.type === u.Switch), C = () => {
      e.modalCallbacks.forEach((o) => {
        Ne(o);
      });
    }, h = () => {
      n("doConfigClick: ", e), typeof e.onClick == "function" && e.onClick();
    }, A = r(() => [
      u.Split,
      u.SplitLazy,
      u.SplitEver
    ].includes(e.type)), W = r(() => [
      u.Tooltip,
      u.TooltipLazy,
      u.TooltipEver
    ].includes(e.type)), te = (o) => {
      var c, k, N, H, V, s;
      if (n("Click", e), o && (Q.value ? (c = o.target) != null && c.closest(".lkt-field.is-switch") || (y.value = !y.value) : W.value ? (m.value = !m.value, m.value && (oe.value = !0)) : A.value && (w.value = !w.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), A.value || W.value) {
        C(), h(), a("click", o);
        return;
      }
      if (O) {
        let t = { ...e.modalData };
        n("Click -> has modal", e.modal, t), n("Click -> typeof beforeClose: ", typeof t.beforeClose), typeof t.beforeClose == "function" ? (t.beforeClose = (P) => {
          if (e.resource)
            return L(o).then(() => {
              P.beforeClose(P);
            });
          P.beforeClose(P), C(), h(), a("click", o);
        }, n("Click -> New beforeClose function: ", t.beforeClose)) : (t.beforeClose = () => {
          if (e.resource)
            return L(o);
          C(), h(), a("click", o);
        }, n("Click -> New beforeClose function: ", t.beforeClose));
        let v = O;
        return typeof O == "function" && (v = O()), Fe(v, fe, t);
      }
      if (e.confirmModal) {
        n("Click -> has confirm modal", e.confirmModal, e.confirmData), n("Click -> typeof onConfirm: ", typeof e.confirmData.onConfirm);
        let t = { ...e.confirmData };
        if (t.confirmButton ? t.confirmButton = { ...re.defaultConfirmButton, ...t.confirmButton } : t.confirmButton = { ...re.defaultConfirmButton }, typeof ((k = t.confirmButton) == null ? void 0 : k.onClick) == "function") {
          let v = (N = t.confirmButton) == null ? void 0 : N.onClick;
          n("Click -> Has onConfirm function: ", v), t.confirmButton.onClick = () => {
            if (n("OnConfirm -> Already: ", e), e.resource)
              return L(o).then(() => {
                v();
              });
            v(), C(), h(), a("click", o);
          }, n("Click -> New onConfirm function created: ", (H = t.confirmButton) == null ? void 0 : H.onClick);
        } else
          t.confirmButton.onClick = () => {
            var v;
            if (n("OnConfirm -> Created: ", e), e.resource)
              return L(o);
            if (((v = e.anchor) == null ? void 0 : v.to) !== "") {
              o && (o.preventDefault(), o.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && _.push(e.anchor.to);
              return;
            }
            C(), h(), a("click", o);
          }, n("Click -> New onConfirm function created: ", (V = t.confirmButton) == null ? void 0 : V.onClick);
        return Oe(e.confirmModal, e.confirmModalKey, t);
      }
      if (e.resource)
        return n("Click -> has resource"), L(o);
      if (((s = e.anchor) == null ? void 0 : s.to) !== "") {
        n("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && _.push(e.anchor.to);
        return;
      }
      if (Q.value) {
        n("Click -> Is Switch"), Ae(() => {
          C(), h(), a("click", o);
        });
        return;
      }
      n("Click -> Emit", e), a("click", o);
    };
    E(() => e.loading, () => g.value = e.loading), E(() => e.checked, () => y.value = e.checked), E(y, (o) => a("update:checked", o)), E(S, (o) => {
      S.value && e.showTooltipOnHover ? (D.value !== void 0 && clearTimeout(D.value), D.value = setTimeout(() => {
        m.value = !0, clearTimeout(D.value);
      }, e.showTooltipOnHoverDelay)) : !S.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(D.value)) : S.value || clearTimeout(D.value);
    }), ce({
      click: () => te(null),
      focus: (o) => {
        G.value && (o && (J.value = !0), G.value.focus());
      }
    });
    const ge = r(() => e.type === u.Content ? "div" : "button"), Be = r(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({}) : typeof e.disabled == "boolean" ? e.disabled : !1), we = (o) => x.value = o, le = r(() => e.type === u.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Se = r(() => le.value ? new ze({ ...e.anchor, class: $.value }) : {});
    return (o, c) => {
      const k = z("lkt-spinner"), N = z("lkt-anchor"), H = z("lkt-field"), V = z("lkt-tooltip");
      return l(), d("div", {
        class: I(["lkt-button-container", de.value]),
        ref_key: "container",
        ref: B,
        id: pe,
        onMousemove: c[3] || (c[3] = (s) => S.value = !0),
        onMouseleave: c[4] || (c[4] = (s) => S.value = !1)
      }, [
        le.value ? (l(), b(N, X({ key: 0 }, Se.value, {
          class: "lkt-button",
          onActive: we
        }), {
          default: K(() => [
            M(q) ? (l(), d("i", {
              key: 0,
              class: I(M(q))
            }, null, 2)) : i("", !0),
            M(q) && o.iconDot ? (l(), d("i", je, j(ee.value), 1)) : i("", !0),
            o.img ? (l(), d("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, qe)) : i("", !0),
            R.value ? (l(), d(ne, { key: 3 }, [
              ie(j(R.value), 1)
            ], 64)) : i("", !0),
            M(Z).default ? U(o.$slots, "default", { key: 4 }) : i("", !0),
            g.value ? (l(), b(k, { key: 5 })) : i("", !0)
          ]),
          _: 3
        }, 16)) : (l(), b(ae(ge.value), {
          key: 1,
          class: I(["lkt-button", $.value]),
          ref_key: "button",
          ref: G,
          name: o.name,
          type: o.type,
          disabled: Be.value,
          tabindex: o.tabindex,
          onClick: te,
          onFocus: he,
          onBlur: be
        }, {
          default: K(() => [
            o.icon ? (l(), d("i", {
              key: 0,
              class: I(o.icon)
            }, null, 2)) : i("", !0),
            o.icon && o.iconDot ? (l(), d("i", Ge, j(ee.value), 1)) : i("", !0),
            o.img ? (l(), d("img", {
              key: 2,
              src: o.img,
              alt: R.value
            }, null, 8, Je)) : i("", !0),
            R.value ? (l(), d(ne, { key: 3 }, [
              ie(j(R.value), 1)
            ], 64)) : i("", !0),
            M(Z).default ? U(o.$slots, "default", { key: 4 }) : i("", !0),
            g.value ? (l(), b(k, { key: 5 })) : i("", !0),
            Q.value ? Ie((l(), b(H, {
              key: 6,
              type: "switch",
              modelValue: y.value,
              "onUpdate:modelValue": c[0] || (c[0] = (s) => y.value = s)
            }, null, 8, ["modelValue"])), [
              [Le, Te.value]
            ]) : i("", !0),
            o.iconEnd ? (l(), d("i", {
              key: 7,
              class: I([o.iconEnd, "lkt-button-icon-end"])
            }, null, 2)) : i("", !0),
            A.value ? (l(), d("div", Qe, [
              o.splitIcon ? (l(), d("i", {
                key: 0,
                class: I(o.splitIcon)
              }, null, 2)) : me.value ? (l(), b(ae(ke.value), { key: 1 })) : i("", !0)
            ])) : i("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        A.value && B.value ? (l(), b(V, X({
          key: 2,
          modelValue: w.value,
          "onUpdate:modelValue": c[1] || (c[1] = (s) => w.value = s)
        }, o.tooltip, {
          referrer: B.value,
          class: ["lkt-split-button-dropdown-content", o.splitClass]
        }), ue({ _: 2 }, [
          Ce.value ? {
            name: "default",
            fn: K(({ doClose: s, doRootClick: t }) => [
              U(o.$slots, "split", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : i("", !0),
        W.value && B.value ? (l(), b(V, X({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": c[2] || (c[2] = (s) => m.value = s)
        }, o.tooltip, { referrer: B.value }), ue({ _: 2 }, [
          ve.value ? {
            name: "default",
            fn: K(({ doClose: s, doRootClick: t }) => [
              U(o.$slots, "tooltip", {
                doClose: s,
                doRootClick: t
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : i("", !0)
      ], 34);
    };
  }
}), to = {
  install: (f) => {
    f.component("lkt-button") === void 0 && f.component("lkt-button", We);
  }
}, lo = (f) => {
  T.defaultSplitIcon = f;
};
export {
  oo as debugLktButton,
  to as default,
  eo as setDefaultButtonPalette,
  lo as setDefaultButtonSplitSlot
};
