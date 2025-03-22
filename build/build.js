import { defineComponent as qe, mergeDefaults as Ge, useSlots as Je, ref as f, watch as I, computed as n, resolveComponent as x, createElementBlock as d, openBlock as i, normalizeClass as E, createBlock as C, createCommentVNode as r, mergeProps as j, withCtx as z, renderSlot as R, toDisplayString as K, unref as P, Fragment as me, createTextVNode as ke, resolveDynamicComponent as ye, withDirectives as Qe, withModifiers as he, vShow as We, createSlots as Ce } from "vue";
import { generateRandomString as Xe } from "lkt-string-tools";
import { httpCall as Ye } from "lkt-http-client";
import { openModal as Ze, openConfirm as _e, runModalCallback as $e } from "lkt-modal";
import { useRouter as et } from "vue-router";
import { extractPropValue as q, ButtonType as o, extractI18nValue as $, FieldType as be, Anchor as tt, getDefaultValues as ot, Button as lt, LktSettings as ge } from "lkt-vue-kernel";
const G = class G {
};
G.debugEnabled = !1, G.defaultSplitIcon = void 0;
let S = G;
const kt = (m = !0) => {
  S.debugEnabled = m;
}, a = (...m) => {
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
  setup(m, { expose: we, emit: Se }) {
    const e = m, k = Se, A = Je(), ee = et();
    let U = q(e.modal, e.prop), Be = q(e.modalKey, e.prop), Te = q(e.icon, e.prop), Oe = q(e.iconEnd, e.prop);
    const De = "lkt-button-" + Xe(), g = f(e.loading), w = f(null), J = f(null), B = f(!1), p = f(e.openTooltip), te = f(!1), T = f(!1), O = f(void 0), s = f(e.checked), oe = f(void 0), Q = f(null), W = f(!1);
    I(() => e.openTooltip, (t) => p.value = t), I(p, (t) => k("update:openTooltip", t));
    const le = n(() => {
      let t = [];
      return e.class && t.push(e.class), M.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), g.value && t.push("is-loading"), te.value && t.push("is-active-route"), p.value && t.push("show-tooltip"), B.value && t.push("show-split"), s.value && t.push("is-checked"), t.join(" ");
    }), Ie = n(() => {
      let t = [];
      return e.containerClass && t.push(e.containerClass), t.join(" ");
    }), b = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.textOn < "u") return $(e.textOn);
        if (!s.value && typeof e.textOff < "u") return $(e.textOff);
      }
      return $(e.text);
    }), D = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconOn < "u") return e.iconOn;
        if (!s.value && typeof e.iconOff < "u") return e.iconOff;
      }
      return Te;
    }), ne = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (s.value && typeof e.iconEndOn < "u") return e.iconEndOn;
        if (!s.value && typeof e.iconEndOff < "u") return e.iconEndOff;
      }
      return Oe;
    }), V = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ee = n(() => typeof S.defaultSplitIcon < "u"), Re = n(() => S.defaultSplitIcon), ie = n(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, u = void 0) => {
      a("endClickMethod", t, u), Ne(), xe(), k("click", t, u);
    }, F = async (t) => {
      a("Resource Click", e.resource, e.resourceData), g.value = !0, k("loading");
      let u = { ...e.resourceData, isChecked: s.value };
      return Ye(e.resource, u).then((v) => {
        g.value = !1, k("loaded"), a("Resource Click -> Received response", v), y(t, v);
      }).catch((v) => {
        g.value = !1, k("loaded"), a("Resource Click -> Received response error", v), y(t, v);
      });
    }, ae = f(!1), Ve = n(() => w.value ? e.type === o.TooltipLazy ? ae.value : e.type === o.TooltipEver ? p.value : e.type === o.Tooltip : !1), Fe = f(!1), Me = n(() => w.value ? e.type === o.SplitLazy ? Fe.value : e.type === o.SplitEver ? B.value : e.type === o.Split : !1), He = (t) => {
      if (W.value) {
        W.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, Le = (t) => {
      k("blur", t);
    }, X = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), Ae = n(() => e.type === o.Switch), Y = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ue = n(() => e.type === o.ImageUpload ? be.Image : be.File), Ne = () => {
      e.modalCallbacks.forEach((t) => {
        $e(t);
      });
    }, xe = () => {
      var t;
      a("doConfigClick: ", e), typeof ((t = e.events) == null ? void 0 : t.click) == "function" && e.events.click();
    }, M = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), Z = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), _ = (t) => {
      var u, v, N, H, L, c, ce, se, fe, de, pe;
      if (a("Click", e, t), t && (X.value ? (u = t.target) != null && u.closest(".lkt-field.is-switch") || (s.value = !s.value) : Y.value ? Q.value && ((v = Q.value) == null || v.click()) : Z.value ? (p.value = !p.value, p.value && (ae.value = !0)) : M.value && (B.value = !B.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), M.value || Z.value || Y.value) {
        y(t);
        return;
      }
      if (U) {
        let l = { ...V.value };
        a("Click -> has modal", e.modal, l), a("Click -> typeof beforeClose: ", typeof l.beforeClose), typeof l.beforeClose == "function" ? (l.beforeClose = (ve) => {
          if (e.resource)
            return F(t).then(() => {
              typeof V.value.beforeClose == "function" && V.value.beforeClose(ve);
            });
          typeof V.value.beforeClose == "function" && V.value.beforeClose(ve), y(t);
        }, a("Click -> New beforeClose function: ", l.beforeClose)) : (l.beforeClose = () => {
          if (e.resource)
            return F(t);
          y(t);
        }, a("Click -> New beforeClose function: ", l.beforeClose));
        let h = U;
        return typeof U == "function" && (h = U()), Ze(h, Be, l);
      }
      if (e.confirmModal) {
        a("Click -> has confirm modal", e.confirmModal, e.confirmData), a("Click -> typeof onConfirm: ", typeof ((N = e.confirmData.events) == null ? void 0 : N.click));
        let l = { ...e.confirmData };
        if (l.confirmButton ? l.confirmButton = { ...ge.defaultConfirmButton, ...l.confirmButton } : l.confirmButton = { ...ge.defaultConfirmButton }, l.confirmButton.events || (l.confirmButton.events = {}), typeof ((L = (H = l.confirmButton) == null ? void 0 : H.events) == null ? void 0 : L.click) == "function") {
          let h = (ce = (c = l.confirmButton) == null ? void 0 : c.events) == null ? void 0 : ce.click;
          a("Click -> Has onConfirm function: ", h), l.confirmButton.events.click = () => {
            if (a("OnConfirm -> Already: ", e), e.resource)
              return F(t).then(() => {
                h();
              });
            h(), y(t);
          }, a("Click -> New onConfirm function created: ", (fe = (se = l.confirmButton) == null ? void 0 : se.events) == null ? void 0 : fe.click);
        } else
          l.confirmButton.events.click = () => {
            var h;
            if (a("OnConfirm -> Created: ", e), e.resource)
              return F(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), e.anchor.external || typeof e.anchor.to < "u" && ee.push(e.anchor.to);
              return;
            }
            y(t);
          }, a("Click -> New onConfirm function created: ", (de = l.confirmButton) == null ? void 0 : de.events.click);
        return _e(e.confirmModal, e.confirmModalKey, l);
      }
      if (e.resource)
        return a("Click -> has resource"), F(t);
      if (((pe = e.anchor) == null ? void 0 : pe.to) !== "") {
        a("Click -> Is Anchor", e.anchor), e.anchor.external ? typeof e.anchor.to == "string" && (window.location.href = e.anchor.to) : typeof e.anchor.to < "u" && ee.push(e.anchor.to);
        return;
      }
      if (X.value) {
        a("Click -> Is Switch"), y(t);
        return;
      }
      a("Click -> Emit", e), y(t);
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
    const je = n(() => e.type === o.Content ? "div" : "button"), ze = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ue = (t) => _(t), Ke = (t) => te.value = t, re = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Pe = n(() => re.value ? new tt({ ...e.anchor, class: le.value }) : {});
    return (t, u) => {
      const v = x("lkt-spinner"), N = x("lkt-anchor"), H = x("lkt-field"), L = x("lkt-tooltip");
      return i(), d("div", {
        class: E(["lkt-button", Ie.value]),
        ref_key: "container",
        ref: w,
        id: De,
        onMousemove: u[4] || (u[4] = (c) => T.value = !0),
        onMouseleave: u[5] || (u[5] = (c) => T.value = !1)
      }, [
        re.value ? (i(), C(N, j({ key: 0 }, Pe.value, {
          class: "lkt-button-main",
          onActive: Ke
        }), {
          default: z(() => [
            D.value ? (i(), d("i", {
              key: 0,
              class: E(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), d("i", nt, K(ie.value), 1)) : r("", !0),
            t.img ? (i(), d("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, it)) : r("", !0),
            P(A).text ? R(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (i(), d(me, { key: 4 }, [
              ke(K(b.value), 1)
            ], 64)) : r("", !0),
            P(A).default ? R(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (i(), C(v, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), C(ye(je.value), {
          key: 1,
          class: E(["lkt-button-main", le.value]),
          ref_key: "button",
          ref: J,
          name: t.name,
          type: t.type,
          disabled: ze.value,
          tabindex: t.tabindex,
          onClick: _,
          onFocus: He,
          onBlur: Le
        }, {
          default: z(() => [
            D.value ? (i(), d("i", {
              key: 0,
              class: E(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), d("i", at, K(ie.value), 1)) : r("", !0),
            t.img ? (i(), d("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, ut)) : r("", !0),
            P(A).text ? R(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (i(), d(me, { key: 4 }, [
              ke(K(b.value), 1)
            ], 64)) : r("", !0),
            P(A).default ? R(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (i(), C(v, { key: 6 })) : r("", !0),
            X.value ? Qe((i(), C(H, {
              key: 7,
              type: "switch",
              modelValue: s.value,
              "onUpdate:modelValue": u[0] || (u[0] = (c) => s.value = c),
              disabled: t.disabled,
              onClick: he(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [We, Ae.value]
            ]) : r("", !0),
            Y.value ? (i(), C(H, j({
              key: 8,
              ref_key: "fileFieldRef",
              ref: Q,
              type: Ue.value,
              modelValue: oe.value,
              "onUpdate:modelValue": u[1] || (u[1] = (c) => oe.value = c),
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
            ne.value ? (i(), d("i", {
              key: 9,
              class: E([ne.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            M.value ? (i(), d("div", rt, [
              t.splitIcon ? (i(), d("i", {
                key: 0,
                class: E(t.splitIcon)
              }, null, 2)) : Ee.value ? (i(), C(ye(Re.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["class", "name", "type", "disabled", "tabindex"])),
        M.value && w.value ? (i(), C(L, j({
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": u[2] || (u[2] = (c) => B.value = c)
        }, t.tooltip, {
          referrer: w.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ce({ _: 2 }, [
          Me.value ? {
            name: "default",
            fn: z(({ doClose: c }) => [
              R(t.$slots, "split", {
                doClose: c,
                doRootClick: ue
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        Z.value && w.value ? (i(), C(L, j({
          key: 3,
          modelValue: p.value,
          "onUpdate:modelValue": u[3] || (u[3] = (c) => p.value = c)
        }, t.tooltip, { referrer: w.value }), Ce({ _: 2 }, [
          Ve.value ? {
            name: "default",
            fn: z(({ doClose: c }) => [
              R(t.$slots, "tooltip", {
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
