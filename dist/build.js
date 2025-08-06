import { defineComponent as Ze, mergeDefaults as $e, useSlots as et, ref as s, watch as M, computed as n, resolveComponent as L, createElementBlock as w, openBlock as a, normalizeClass as De, createBlock as d, createCommentVNode as c, mergeProps as B, withCtx as G, renderSlot as A, unref as J, resolveDynamicComponent as we, withDirectives as tt, normalizeProps as Be, Fragment as ne, createTextVNode as ot, toDisplayString as lt, withModifiers as Te, vShow as nt, createSlots as Oe, renderList as Ee } from "vue";
import { generateRandomString as it } from "lkt-string-tools";
import { httpCall as ut } from "lkt-http-client";
import { openModal as at, openConfirm as rt, runModalCallback as ct } from "lkt-modal";
import { useRouter as st } from "vue-router";
import { extractPropValue as H, ButtonType as o, extractI18nValue as ie, IconPosition as ue, FieldType as Re, getDefaultValues as ft, Button as pt, LktSettings as Ie } from "lkt-vue-kernel";
const Q = class Q {
};
Q.debugEnabled = !1, Q.defaultSplitIcon = void 0;
let E = Q;
const Dt = (h = !0) => {
  E.debugEnabled = h;
}, i = (...h) => {
  E.debugEnabled && console.info("[LktButton] ", ...h);
}, dt = ["src", "alt"], vt = ["src", "alt"], mt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, kt = /* @__PURE__ */ Ze({
  __name: "LktButton",
  props: /* @__PURE__ */ $e({
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
    splitButtons: {},
    tabindex: {},
    prop: {},
    clickRef: {},
    events: {}
  }, ft(pt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(h, { expose: Fe, emit: Ve }) {
    const e = h, b = Ve, _ = et(), ae = st();
    let Me = H(e.modalKey, e.prop);
    const Le = "lkt-button-" + it(), T = s(e.loading), O = s(null), W = s(null), R = s(!1), m = s(e.openTooltip), re = s(!1), I = s(!1), F = s(void 0), f = s(e.checked), ce = s(void 0), X = s(!1), Y = s(null), Z = s(!1);
    M(() => e.openTooltip, (t) => m.value = t), M(m, (t) => b("update:openTooltip", t));
    const se = n(() => {
      let t = [];
      return e.class && t.push(e.class), U.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), T.value && t.push("is-loading"), re.value && t.push("is-active-route"), m.value && t.push("show-tooltip"), R.value && t.push("show-split"), f.value && t.push("is-checked"), pe.value && t.push("is-disabled"), X.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), S = n(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ie(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ie(e.textOff);
      }
      return ie(e.text);
    }), p = n(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), H(t, e.prop);
    }), D = n(() => {
      if (typeof p.value == "object" && p.value.position === ue.End)
        return p.value;
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), H(t, e.prop);
    }), q = n(() => typeof e.modal == "function" ? e.modal(e.prop) : H(e.modal, e.prop)), j = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ae = n(() => typeof E.defaultSplitIcon < "u"), He = n(() => E.defaultSplitIcon), je = n(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, l = void 0) => {
      i("endClickMethod", t, l), qe(), Ge(t === null ? void 0 : t, l), b("click", t, l);
    }, $ = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return H(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let l in e.resourceData)
          t[l] = H(e.resourceData[l], e.prop);
        return t;
      }
      return e.resourceData;
    }), x = async (t) => {
      var k;
      i("Resource Click", e.resource, $.value), T.value = !0, b("loading"), typeof ((k = e.events) == null ? void 0 : k.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let l = { ...$.value, isChecked: f.value };
      return ut(e.resource, l).then((v) => {
        var y;
        T.value = !1, b("loaded"), i("Resource Click -> Received response", v), typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: v
        })), C(t, v);
      }).catch((v) => {
        var y;
        T.value = !1, b("loaded"), i("Resource Click -> Received response error", v), typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: v
        })), C(t, v);
      });
    }, fe = s(!1), xe = n(() => O.value ? e.type === o.TooltipLazy ? fe.value : e.type === o.TooltipEver ? m.value : e.type === o.Tooltip : !1), Ue = s(!1), Ne = n(() => O.value ? e.type === o.SplitLazy ? Ue.value : e.type === o.SplitEver ? R.value : e.type === o.Split : !1), ze = (t) => {
      if (X.value = !0, Z.value) {
        Z.value = !1, b("focus");
        return;
      }
      b("focus", t);
    }, Ke = (t) => {
      X.value = !1, b("blur", t);
    }, ee = n(() => e.type === o.Switch || e.type === o.HiddenSwitch), Pe = n(() => e.type === o.Switch), te = n(() => e.type === o.FileUpload || e.type === o.ImageUpload), _e = n(() => e.type === o.ImageUpload ? Re.Image : Re.File), qe = () => {
      e.modalCallbacks.forEach((t) => {
        ct(t);
      });
    }, Ge = (t, l) => {
      var k;
      i("doConfigClick: ", e), typeof ((k = e.events) == null ? void 0 : k.click) == "function" && e.events.click({
        event: t,
        httpResponse: l
      });
    }, U = n(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), oe = n(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), le = (t) => {
      var l, k, v, y, N, z, K, r, V, ke, ye, he, be, Ce;
      if (i("Click", e, t), t && (ee.value ? (l = t.target) != null && l.closest(".lkt-field.is-switch") || (f.value = !f.value) : te.value ? Y.value && ((k = Y.value) == null || k.click()) : oe.value ? (m.value = !m.value, m.value && (fe.value = !0)) : U.value && (R.value = !R.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), U.value || oe.value || te.value) {
        C(t);
        return;
      }
      if (q.value) {
        let u = { ...j.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (P) => {
          if (e.resource)
            return x(t).then(() => {
              typeof j.value.beforeClose == "function" && j.value.beforeClose(P);
            });
          typeof j.value.beforeClose == "function" && j.value.beforeClose(P), C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return x(t);
          C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let g = q.value;
        return typeof q.value == "function" && (g = q.value()), at(g, Me, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((v = e.confirmData.events) == null ? void 0 : v.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ie.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ie.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((N = (y = u.confirmButton) == null ? void 0 : y.events) == null ? void 0 : N.click) == "function") {
          let g = (K = (z = u.confirmButton) == null ? void 0 : z.events) == null ? void 0 : K.click;
          i("Click -> Has confirmData.events?.click function: ", g), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return x(t).then(() => {
                g();
              });
            g(), C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (V = (r = u.confirmButton) == null ? void 0 : r.events) == null ? void 0 : V.click);
        } else
          u.confirmButton.events.click = () => {
            var g, P, ge, Se;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return x(t);
            if (((g = e.anchor) == null ? void 0 : g.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (P = e.anchor) != null && P.external || typeof ((ge = e.anchor) == null ? void 0 : ge.to) < "u" && ae.push((Se = e.anchor) == null ? void 0 : Se.to);
              return;
            }
            C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (ke = u.confirmButton) == null ? void 0 : ke.events.click);
        return rt(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), x(t);
      if (typeof ((ye = e.anchor) == null ? void 0 : ye.to) < "u" && ((he = e.anchor) == null ? void 0 : he.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (be = e.anchor) != null && be.external ? typeof ((Ce = e.anchor) == null ? void 0 : Ce.to) == "string" && (window.location.href = e.anchor.to) : ae.push(e.anchor.to);
        return;
      }
      if (ee.value) {
        i("Click -> Is Switch"), C(t);
        return;
      }
      i("Click -> Emit", e), C(t);
    };
    M(() => e.loading, () => T.value = e.loading), M(() => e.checked, () => f.value = e.checked), M(f, (t) => b("update:checked", t)), M(I, (t) => {
      I.value && e.showTooltipOnHover ? (F.value !== void 0 && clearTimeout(F.value), F.value = setTimeout(() => {
        m.value = !0, clearTimeout(F.value);
      }, e.showTooltipOnHoverDelay)) : !I.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(F.value)) : I.value || clearTimeout(F.value);
    }), Fe({
      click: () => le(null),
      focus: (t) => {
        W.value && (t && (Z.value = !0), W.value.focus());
      }
    });
    const Je = n(() => e.type === o.Content ? "div" : "button"), Qe = n(() => {
      switch (e.type) {
        case o.Button:
        case o.Submit:
          return e.type;
        default:
          return "button";
      }
    }), pe = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), de = (t) => le(t), We = (t) => re.value = t, ve = n(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), me = n(() => typeof p.value == "string" ? {
      icon: p.value,
      dot: e.dot ? je.value : !1
    } : typeof p.value == "object" && p.value.position !== ue.End ? p.value : {}), Xe = n(() => (console.log("de iconos va la cosa: ", p.value, D.value), typeof D.value == "string" && D.value !== "" ? {
      icon: D.value,
      class: "lkt-button-icon-end"
    } : typeof D.value == "object" && Object.keys(D.value).length > 0 ? {
      ...D.value,
      class: "lkt-button-icon-end"
    } : typeof p.value == "object" && p.value.position === ue.End ? {
      ...p.value,
      class: "lkt-button-icon-end"
    } : {})), Ye = n(() => {
      if (ve.value) {
        let t = {};
        return p.value && (t.icon = me.value), S.value && (t.text = S.value), {
          ...e.anchor,
          class: se.value,
          ...t,
          prop: e.prop
        };
      }
      return {};
    });
    return (t, l) => {
      const k = L("lkt-spinner"), v = L("lkt-anchor"), y = L("lkt-icon"), N = L("lkt-field"), z = L("lkt-button", !0), K = L("lkt-tooltip");
      return a(), w("div", {
        class: De(["lkt-button", se.value]),
        ref_key: "container",
        ref: O,
        id: Le,
        onMousemove: l[4] || (l[4] = (r) => I.value = !0),
        onMouseleave: l[5] || (l[5] = (r) => I.value = !1)
      }, [
        ve.value ? (a(), d(v, B({ key: 0 }, Ye.value, {
          class: "lkt-button-main",
          onActive: We
        }), {
          default: G(() => [
            t.img ? (a(), w("img", {
              key: 0,
              src: t.img,
              alt: S.value
            }, null, 8, dt)) : c("", !0),
            J(_).text ? A(t.$slots, "text", {
              key: 1,
              text: S.value
            }) : c("", !0),
            J(_).default ? A(t.$slots, "default", { key: 2 }) : c("", !0),
            T.value ? (a(), d(k, { key: 3 })) : c("", !0)
          ]),
          _: 3
        }, 16)) : (a(), d(we(Je.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: W,
          name: t.name,
          type: Qe.value,
          disabled: pe.value,
          tabindex: t.tabindex,
          onClick: le,
          onFocus: ze,
          onBlur: Ke
        }, {
          default: G(() => [
            p.value ? (a(), d(y, Be(B({ key: 0 }, me.value)), null, 16)) : c("", !0),
            t.img ? (a(), w("img", {
              key: 1,
              src: t.img,
              alt: S.value
            }, null, 8, vt)) : c("", !0),
            J(_).text ? A(t.$slots, "text", {
              key: 2,
              text: S.value
            }) : S.value ? (a(), w(ne, { key: 3 }, [
              ot(lt(S.value), 1)
            ], 64)) : c("", !0),
            J(_).default ? A(t.$slots, "default", { key: 4 }) : c("", !0),
            T.value ? (a(), d(k, { key: 5 })) : c("", !0),
            ee.value ? tt((a(), d(N, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": l[0] || (l[0] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Te(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [nt, Pe.value]
            ]) : c("", !0),
            te.value ? (a(), d(N, B({
              key: 7,
              ref_key: "fileFieldRef",
              ref: Y,
              type: _e.value,
              modelValue: ce.value,
              "onUpdate:modelValue": l[1] || (l[1] = (r) => ce.value = r),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: $.value
              }
            }, {
              disabled: t.disabled,
              onClick: Te(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : c("", !0),
            D.value ? (a(), d(y, Be(B({ key: 8 }, Xe.value)), null, 16)) : c("", !0),
            U.value ? (a(), w("div", mt, [
              t.splitIcon ? (a(), w("i", {
                key: 0,
                class: De(t.splitIcon)
              }, null, 2)) : Ae.value ? (a(), d(we(He.value), { key: 1 })) : c("", !0)
            ])) : c("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        U.value && O.value ? (a(), d(K, B({
          key: 2,
          modelValue: R.value,
          "onUpdate:modelValue": l[2] || (l[2] = (r) => R.value = r)
        }, {
          referrer: O.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Oe({ _: 2 }, [
          Ne.value ? {
            name: "default",
            fn: G(({ doClose: r }) => [
              (a(!0), w(ne, null, Ee(t.splitButtons, (V) => (a(), d(z, B({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              A(t.$slots, "split", {
                doClose: r,
                doRootClick: de
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : c("", !0),
        oe.value && O.value ? (a(), d(K, B({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": l[3] || (l[3] = (r) => m.value = r)
        }, {
          referrer: O.value,
          ...t.tooltip
        }), Oe({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: G(({ doClose: r }) => [
              (a(!0), w(ne, null, Ee(t.splitButtons, (V) => (a(), d(z, B({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              A(t.$slots, "tooltip", {
                doClose: r,
                doRootClick: de
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : c("", !0)
      ], 34);
    };
  }
}), wt = {
  install: (h) => {
    h.component("lkt-button") === void 0 && h.component("lkt-button", kt);
  }
}, Bt = (h) => {
  E.defaultSplitIcon = h;
};
export {
  Dt as debugLktButton,
  wt as default,
  Bt as setDefaultButtonSplitSlot
};
