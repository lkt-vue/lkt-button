import { defineComponent as qe, mergeDefaults as Ge, useSlots as Je, ref as s, watch as I, computed as u, resolveComponent as x, createElementBlock as d, openBlock as n, normalizeClass as L, createBlock as C, createCommentVNode as r, mergeProps as z, withCtx as K, renderSlot as E, toDisplayString as j, unref as P, Fragment as ye, createTextVNode as he, resolveDynamicComponent as Ce, withDirectives as Qe, withModifiers as be, vShow as We, createSlots as ge } from "vue";
import { generateRandomString as Xe } from "lkt-string-tools";
import { httpCall as Ye } from "lkt-http-client";
import { openModal as Ze, openConfirm as _e, runModalCallback as $e } from "lkt-modal";
import { useRouter as et } from "vue-router";
import { extractPropValue as q, ButtonType as o, extractI18nValue as ee, FieldType as we, Anchor as tt, getDefaultValues as ot, Button as lt, LktSettings as Se } from "lkt-vue-kernel";
const G = class G {
};
G.debugEnabled = !1, G.defaultSplitIcon = void 0;
let S = G;
const kt = (m = !0) => {
  S.debugEnabled = m;
}, i = (...m) => {
  S.debugEnabled && console.info("[LktButton] ", ...m);
}, nt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, it = ["src", "alt"], at = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ut = ["src", "alt"], rt = {
  key: 10,
  class: "lkt-split-button-arrow"
}, ct = /* @__PURE__ */ qe({
  __name: "LktButton",
  props: /* @__PURE__ */ Ge({
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
  }, ot(lt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(m, { expose: Be, emit: Te }) {
    const e = m, k = Te, A = Je(), te = et();
    let U = q(e.modal, e.prop), Oe = q(e.modalKey, e.prop), De = q(e.icon, e.prop), Ie = q(e.iconEnd, e.prop);
    const Ee = "lkt-button-" + Xe(), g = s(e.loading), w = s(null), J = s(null), B = s(!1), p = s(e.openTooltip), oe = s(!1), T = s(!1), O = s(void 0), f = s(e.checked), le = s(void 0), Q = s(!1), W = s(null), X = s(!1);
    I(() => e.openTooltip, (t) => p.value = t), I(p, (t) => k("update:openTooltip", t));
    const ne = u(() => {
      let t = [];
      return e.class && t.push(e.class), V.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), g.value && t.push("is-loading"), oe.value && t.push("is-active-route"), p.value && t.push("show-tooltip"), B.value && t.push("show-split"), f.value && t.push("is-checked"), re.value && t.push("is-disabled"), Q.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), b = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ee(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ee(e.textOff);
      }
      return ee(e.text);
    }), D = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.iconOn < "u") return e.iconOn;
        if (!f.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return De;
    }), ie = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!f.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return Ie;
    }), R = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Re = u(() => typeof S.defaultSplitIcon < "u"), Fe = u(() => S.defaultSplitIcon), ae = u(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, a = void 0) => {
      i("endClickMethod", t, a), xe(), ze(), k("click", t, a);
    }, F = async (t) => {
      i("Resource Click", e.resource, e.resourceData), g.value = !0, k("loading");
      let a = { ...e.resourceData, isChecked: f.value };
      return Ye(e.resource, a).then((v) => {
        g.value = !1, k("loaded"), i("Resource Click -> Received response", v), y(t, v);
      }).catch((v) => {
        g.value = !1, k("loaded"), i("Resource Click -> Received response error", v), y(t, v);
      });
    }, ue = s(!1), Ve = u(() => w.value ? e.type === o.TooltipLazy ? ue.value : e.type === o.TooltipEver ? p.value : e.type === o.Tooltip : !1), Me = s(!1), He = u(() => w.value ? e.type === o.SplitLazy ? Me.value : e.type === o.SplitEver ? B.value : e.type === o.Split : !1), Le = (t) => {
      if (Q.value = !0, X.value) {
        X.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, Ae = (t) => {
      Q.value = !1, k("blur", t);
    }, Y = u(() => e.type === o.Switch || e.type === o.HiddenSwitch), Ue = u(() => e.type === o.Switch), Z = u(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ne = u(() => e.type === o.ImageUpload ? we.Image : we.File), xe = () => {
      e.modalCallbacks.forEach((t) => {
        $e(t);
      });
    }, ze = () => {
      var t;
      i("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, V = u(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), _ = u(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), $ = (t) => {
      var a, v, N, M, H, c, fe, de, pe, ve, me;
      if (i("Click", e, t), t && (Y.value ? (a = t.target) != null && a.closest(".lkt-field.is-switch") || (f.value = !f.value) : Z.value ? W.value && ((v = W.value) == null || v.click()) : _.value ? (p.value = !p.value, p.value && (ue.value = !0)) : V.value && (B.value = !B.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), V.value || _.value || Z.value) {
        y(t);
        return;
      }
      if (U) {
        let l = { ...R.value };
        i("Click -> has modal", e.modal, l), i("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (ke) => {
          if (e.resource)
            return F(t).then(() => {
              typeof R.value.beforeClose == "function" && R.value.beforeClose(ke);
            });
          typeof R.value.beforeClose == "function" && R.value.beforeClose(ke), y(t);
        }, i("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return F(t);
          y(t);
        }, i("Click -> New beforeClose function: ", l.beforeClose));
        let h = U;
        return typeof U == "function" && (h = U()), Ze(h, Oe, l);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof onConfirm: ", typeof ((N = e.confirmData.events) == null ? void 0 : N.click));
        let l = { ...e.confirmData };
        if (l.confirmButton ? l.confirmButton = { ...Se.defaultConfirmButton, ...l.confirmButton } : l.confirmButton = { ...Se.defaultConfirmButton }, l.confirmButton.events || (l.confirmButton.events = {}), typeof ((H = (M = l.confirmButton) == null ? void 0 : M.events) == null ? void 0 : H.click) == "function") {
          let h = (fe = (c = l.confirmButton) == null ? void 0 : c.events) == null ? void 0 : fe.click;
          i("Click -> Has onConfirm function: ", h), l.confirmButton.events.click = () => {
            if (i("OnConfirm -> Already: ", e), e.resource)
              return F(t).then(() => {
                h();
              });
            h(), y(t);
          }, i("Click -> New onConfirm function created: ", (pe = (de = l.confirmButton) == null ? void 0 : de.events) == null ? void 0 : pe.click);
        } else
          l.confirmButton.events.click = () => {
            var h;
            if (i("OnConfirm -> Created: ", e), e.resource)
              return F(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && te.push(e.anchor.to);
              return;
            }
            y(t);
          }, i("Click -> New onConfirm function created: ", (ve = l.confirmButton) == null ? void 0 : ve.events.click);
        return _e(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return i("Click -> has resource"), F(t);
      if (((me = e.anchor) == null ? void 0 : me.to) !== "") {
        i("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && te.push(e.anchor.to);
        return;
      }
      if (Y.value) {
        i("Click -> Is Switch"), y(t);
        return;
      }
      i("Click -> Emit", e), y(t);
    };
    I(() => e.loading, () => g.value = e.loading), I(() => e.checked, () => f.value = e.checked), I(f, (t) => k("update:checked", t)), I(T, (t) => {
      T.value && e.showTooltipOnHover ? (O.value !== void 0 && clearTimeout(O.value), O.value = setTimeout(() => {
        p.value = !0, clearTimeout(O.value);
      }, e.showTooltipOnHoverDelay)) : !T.value && e.hideTooltipOnLeave ? (p.value = !1, clearTimeout(O.value)) : T.value || clearTimeout(O.value);
    }), Be({
      click: () => $(null),
      focus: (t) => {
        J.value && (t && (X.value = !0), J.value.focus());
      }
    });
    const Ke = u(() => e.type === o.Content ? "div" : "button"), re = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ce = (t) => $(t), je = (t) => oe.value = t, se = u(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Pe = u(() => se.value ? new tt({ ...e.anchor, class: ne.value }) : {});
    return (t, a) => {
      const v = x("lkt-spinner"), N = x("lkt-anchor"), M = x("lkt-field"), H = x("lkt-tooltip");
      return n(), d("div", {
        class: L(["lkt-button", ne.value]),
        ref_key: "container",
        ref: w,
        id: Ee,
        onMousemove: a[4] || (a[4] = (c) => T.value = !0),
        onMouseleave: a[5] || (a[5] = (c) => T.value = !1)
      }, [
        se.value ? (n(), C(N, z({ key: 0 }, Pe.value, {
          class: "lkt-button-main",
          onActive: je
        }), {
          default: K(() => [
            D.value ? (n(), d("i", {
              key: 0,
              class: L(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (n(), d("i", nt, j(ae.value), 1)) : r("", !0),
            t.img ? (n(), d("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, it)) : r("", !0),
            P(A).text ? E(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (n(), d(ye, { key: 4 }, [
              he(j(b.value), 1)
            ], 64)) : r("", !0),
            P(A).default ? E(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (n(), C(v, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (n(), C(Ce(Ke.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: J,
          name: t.name,
          type: t.type,
          disabled: re.value,
          tabindex: t.tabindex,
          onClick: $,
          onFocus: Le,
          onBlur: Ae
        }, {
          default: K(() => [
            D.value ? (n(), d("i", {
              key: 0,
              class: L(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (n(), d("i", at, j(ae.value), 1)) : r("", !0),
            t.img ? (n(), d("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, ut)) : r("", !0),
            P(A).text ? E(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (n(), d(ye, { key: 4 }, [
              he(j(b.value), 1)
            ], 64)) : r("", !0),
            P(A).default ? E(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (n(), C(v, { key: 6 })) : r("", !0),
            Y.value ? Qe((n(), C(M, {
              key: 7,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": a[0] || (a[0] = (c) => f.value = c),
              disabled: t.disabled,
              onClick: be(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [We, Ue.value]
            ]) : r("", !0),
            Z.value ? (n(), C(M, z({
              key: 8,
              ref_key: "fileFieldRef",
              ref: W,
              type: Ne.value,
              modelValue: le.value,
              "onUpdate:modelValue": a[1] || (a[1] = (c) => le.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: t.resourceData
              }
            }, {
              disabled: t.disabled,
              onClick: be(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            ie.value ? (n(), d("i", {
              key: 9,
              class: L([ie.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            V.value ? (n(), d("div", rt, [
              t.splitIcon ? (n(), d("i", {
                key: 0,
                class: L(t.splitIcon)
              }, null, 2)) : Re.value ? (n(), C(Ce(Fe.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        V.value && w.value ? (n(), C(H, z({
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": a[2] || (a[2] = (c) => B.value = c)
        }, t.tooltip, {
          referrer: w.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), ge({ _: 2 }, [
          He.value ? {
            name: "default",
            fn: K(({ doClose: c }) => [
              E(t.$slots, "split", {
                doClose: c,
                doRootClick: ce
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        _.value && w.value ? (n(), C(H, z({
          key: 3,
          modelValue: p.value,
          "onUpdate:modelValue": a[3] || (a[3] = (c) => p.value = c)
        }, t.tooltip, { referrer: w.value }), ge({ _: 2 }, [
          Ve.value ? {
            name: "default",
            fn: K(({ doClose: c }) => [
              E(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: ce
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), yt = {
  install: (m) => {
    m.component("lkt-button") === void 0 && m.component("lkt-button", ct);
  }
}, ht = (m) => {
  S.defaultSplitIcon = m;
};
export {
  kt as debugLktButton,
  yt as default,
  ht as setDefaultButtonSplitSlot
};
