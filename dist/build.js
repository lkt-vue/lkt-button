import { defineComponent as Pe, mergeDefaults as qe, useSlots as Ge, ref as f, watch as I, computed as u, resolveComponent as x, createElementBlock as d, openBlock as n, normalizeClass as L, createBlock as C, createCommentVNode as r, mergeProps as z, withCtx as K, renderSlot as E, toDisplayString as j, unref as P, Fragment as me, createTextVNode as ke, resolveDynamicComponent as ye, withDirectives as Je, withModifiers as he, vShow as Qe, createSlots as Ce } from "vue";
import { generateRandomString as We } from "lkt-string-tools";
import { httpCall as Xe } from "lkt-http-client";
import { openModal as Ye, openConfirm as Ze, runModalCallback as _e } from "lkt-modal";
import { useRouter as $e } from "vue-router";
import { extractPropValue as q, ButtonType as o, extractI18nValue as $, FieldType as be, Anchor as et, getDefaultValues as tt, Button as ot, LktSettings as ge } from "lkt-vue-kernel";
const G = class G {
};
G.debugEnabled = !1, G.defaultSplitIcon = void 0;
let S = G;
const mt = (m = !0) => {
  S.debugEnabled = m;
}, i = (...m) => {
  S.debugEnabled && console.info("[LktButton] ", ...m);
}, lt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, nt = ["src", "alt"], it = {
  key: 1,
  class: "lkt-button--icon-dot"
}, at = ["src", "alt"], ut = {
  key: 10,
  class: "lkt-split-button-arrow"
}, rt = /* @__PURE__ */ Pe({
  __name: "LktButton",
  props: /* @__PURE__ */ qe({
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
  }, tt(ot)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(m, { expose: we, emit: Se }) {
    const e = m, k = Se, A = Ge(), ee = $e();
    let U = q(e.modal, e.prop), Be = q(e.modalKey, e.prop), Te = q(e.icon, e.prop), Oe = q(e.iconEnd, e.prop);
    const De = "lkt-button-" + We(), g = f(e.loading), w = f(null), J = f(null), B = f(!1), p = f(e.openTooltip), te = f(!1), T = f(!1), O = f(void 0), s = f(e.checked), oe = f(void 0), Q = f(null), W = f(!1);
    I(() => e.openTooltip, (t) => p.value = t), I(p, (t) => k("update:openTooltip", t));
    const le = u(() => {
      let t = [];
      return e.class && t.push(e.class), F.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), g.value && t.push("is-loading"), te.value && t.push("is-active-route"), p.value && t.push("show-tooltip"), B.value && t.push("show-split"), s.value && t.push("is-checked"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), b = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.textOn < "u") return $(e.textOn);
        if (!s.value && typeof e.textOff < "u") return $(e.textOff);
      }
      return $(e.text);
    }), D = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconOn < "u") return e.iconOn;
        if (!s.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return Te;
    }), ne = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!s.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return Oe;
    }), R = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ie = u(() => typeof S.defaultSplitIcon < "u"), Ee = u(() => S.defaultSplitIcon), ie = u(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, a = void 0) => {
      i("endClickMethod", t, a), Ue(), Ne(), k("click", t, a);
    }, V = async (t) => {
      i("Resource Click", e.resource, e.resourceData), g.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: s.value };
      return Xe(e.resource, a).then((v) => {
        g.value = !1, k("loaded"), i("Resource Click -> Received response", v), y(t, v);
      }).catch((v) => {
        g.value = !1, k("loaded"), i("Resource Click -> Received response error", v), y(t, v);
      });
    }, ae = f(!1), Re = u(() => w.value ? e.type === o.TooltipLazy ? ae.value : e.type === o.TooltipEver ? p.value : e.type === o.Tooltip : !1), Ve = f(!1), Fe = u(() => w.value ? e.type === o.SplitLazy ? Ve.value : e.type === o.SplitEver ? B.value : e.type === o.Split : !1), Me = (t) => {
      if (W.value) {
        W.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, He = (t) => {
      k("blur", t);
    }, X = u(() => e.type === o.Switch || e.type === o.HiddenSwitch), Le = u(() => e.type === o.Switch), Y = u(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ae = u(() => e.type === o.ImageUpload ? be.Image : be.File), Ue = () => {
      e.modalCallbacks.forEach((t) => {
        _e(t);
      });
    }, Ne = () => {
      var t;
      i("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, F = u(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), Z = u(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), _ = (t) => {
      var a, v, N, M, H, c, ce, se, fe, de, pe;
      if (i("Click", e, t), t && (X.value ? (a = t.target) != null && a.closest(".lkt-field.is-switch") || (s.value = !s.value) : Y.value ? Q.value && ((v = Q.value) == null || v.click()) : Z.value ? (p.value = !p.value, p.value && (ae.value = !0)) : F.value && (B.value = !B.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), F.value || Z.value || Y.value) {
        y(t);
        return;
      }
      if (U) {
        let l = { ...R.value };
        i("Click -> has modal", e.modal, l), i("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (ve) => {
          if (e.resource)
            return V(t).then(() => {
              typeof R.value.beforeClose == "function" && R.value.beforeClose(ve);
            });
          typeof R.value.beforeClose == "function" && R.value.beforeClose(ve), y(t);
        }, i("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return V(t);
          y(t);
        }, i("Click -> New beforeClose function: ", l.beforeClose));
        let h = U;
        return typeof U == "function" && (h = U()), Ye(h, Be, l);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof onConfirm: ", typeof ((N = e.confirmData.events) == null ? void 0 : N.click));
        let l = { ...e.confirmData };
        if (l.confirmButton ? l.confirmButton = { ...ge.defaultConfirmButton, ...l.confirmButton } : l.confirmButton = { ...ge.defaultConfirmButton }, l.confirmButton.events || (l.confirmButton.events = {}), typeof ((H = (M = l.confirmButton) == null ? void 0 : M.events) == null ? void 0 : H.click) == "function") {
          let h = (ce = (c = l.confirmButton) == null ? void 0 : c.events) == null ? void 0 : ce.click;
          i("Click -> Has onConfirm function: ", h), l.confirmButton.events.click = () => {
            if (i("OnConfirm -> Already: ", e), e.resource)
              return V(t).then(() => {
                h();
              });
            h(), y(t);
          }, i("Click -> New onConfirm function created: ", (fe = (se = l.confirmButton) == null ? void 0 : se.events) == null ? void 0 : fe.click);
        } else
          l.confirmButton.events.click = () => {
            var h;
            if (i("OnConfirm -> Created: ", e), e.resource)
              return V(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && ee.push(e.anchor.to);
              return;
            }
            y(t);
          }, i("Click -> New onConfirm function created: ", (de = l.confirmButton) == null ? void 0 : de.events.click);
        return Ze(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return i("Click -> has resource"), V(t);
      if (((pe = e.anchor) == null ? void 0 : pe.to) !== "") {
        i("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && ee.push(e.anchor.to);
        return;
      }
      if (X.value) {
        i("Click -> Is Switch"), y(t);
        return;
      }
      i("Click -> Emit", e), y(t);
    };
    I(() => e.loading, () => g.value = e.loading), I(() => e.checked, () => s.value = e.checked), I(s, (t) => k("update:checked", t)), I(T, (t) => {
      T.value && e.showTooltipOnHover ? (O.value !== void 0 && clearTimeout(O.value), O.value = setTimeout(() => {
        p.value = !0, clearTimeout(O.value);
      }, e.showTooltipOnHoverDelay)) : !T.value && e.hideTooltipOnLeave ? (p.value = !1, clearTimeout(O.value)) : T.value || clearTimeout(O.value);
    }), we({
      click: () => _(null),
      focus: (t) => {
        J.value && (t && (W.value = !0), J.value.focus());
      }
    });
    const xe = u(() => e.type === o.Content ? "div" : "button"), ze = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ue = (t) => _(t), Ke = (t) => te.value = t, re = u(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), je = u(() => re.value ? new et({ ...e.anchor, class: le.value }) : {});
    return (t, a) => {
      const v = x("lkt-spinner"), N = x("lkt-anchor"), M = x("lkt-field"), H = x("lkt-tooltip");
      return n(), d("div", {
        class: L(["lkt-button", le.value]),
        ref_key: "container",
        ref: w,
        id: De,
        onMousemove: a[4] || (a[4] = (c) => T.value = !0),
        onMouseleave: a[5] || (a[5] = (c) => T.value = !1)
      }, [
        re.value ? (n(), C(N, z({ key: 0 }, je.value, {
          class: "lkt-button-main",
          onActive: Ke
        }), {
          default: K(() => [
            D.value ? (n(), d("i", {
              key: 0,
              class: L(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (n(), d("i", lt, j(ie.value), 1)) : r("", !0),
            t.img ? (n(), d("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, nt)) : r("", !0),
            P(A).text ? E(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (n(), d(me, { key: 4 }, [
              ke(j(b.value), 1)
            ], 64)) : r("", !0),
            P(A).default ? E(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (n(), C(v, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (n(), C(ye(xe.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: J,
          name: t.name,
          type: t.type,
          disabled: ze.value,
          tabindex: t.tabindex,
          onClick: _,
          onFocus: Me,
          onBlur: He
        }, {
          default: K(() => [
            D.value ? (n(), d("i", {
              key: 0,
              class: L(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (n(), d("i", it, j(ie.value), 1)) : r("", !0),
            t.img ? (n(), d("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, at)) : r("", !0),
            P(A).text ? E(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (n(), d(me, { key: 4 }, [
              ke(j(b.value), 1)
            ], 64)) : r("", !0),
            P(A).default ? E(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (n(), C(v, { key: 6 })) : r("", !0),
            X.value ? Je((n(), C(M, {
              key: 7,
              type: "switch",
              modelValue: s.value,
              "onUpdate:modelValue": a[0] || (a[0] = (c) => s.value = c),
              disabled: t.disabled,
              onClick: he(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [Qe, Le.value]
            ]) : r("", !0),
            Y.value ? (n(), C(M, z({
              key: 8,
              ref_key: "fileFieldRef",
              ref: Q,
              type: Ae.value,
              modelValue: oe.value,
              "onUpdate:modelValue": a[1] || (a[1] = (c) => oe.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: t.resourceData
              }
            }, {
              disabled: t.disabled,
              onClick: he(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            ne.value ? (n(), d("i", {
              key: 9,
              class: L([ne.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            F.value ? (n(), d("div", ut, [
              t.splitIcon ? (n(), d("i", {
                key: 0,
                class: L(t.splitIcon)
              }, null, 2)) : Ie.value ? (n(), C(ye(Ee.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        F.value && w.value ? (n(), C(H, z({
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": a[2] || (a[2] = (c) => B.value = c)
        }, t.tooltip, {
          referrer: w.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ce({ _: 2 }, [
          Fe.value ? {
            name: "default",
            fn: K(({ doClose: c }) => [
              E(t.$slots, "split", {
                doClose: c,
                doRootClick: ue
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        Z.value && w.value ? (n(), C(H, z({
          key: 3,
          modelValue: p.value,
          "onUpdate:modelValue": a[3] || (a[3] = (c) => p.value = c)
        }, t.tooltip, { referrer: w.value }), Ce({ _: 2 }, [
          Re.value ? {
            name: "default",
            fn: K(({ doClose: c }) => [
              E(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: ue
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), kt = {
  install: (m) => {
    m.component("lkt-button") === void 0 && m.component("lkt-button", rt);
  }
}, yt = (m) => {
  S.defaultSplitIcon = m;
};
export {
  mt as debugLktButton,
  kt as default,
  yt as setDefaultButtonSplitSlot
};
