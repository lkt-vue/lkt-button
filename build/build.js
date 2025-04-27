import { defineComponent as Qe, mergeDefaults as We, useSlots as Xe, ref as s, watch as I, computed as u, resolveComponent as z, createElementBlock as p, openBlock as i, normalizeClass as A, createBlock as C, createCommentVNode as r, mergeProps as K, withCtx as j, renderSlot as R, toDisplayString as P, unref as q, Fragment as Se, createTextVNode as we, resolveDynamicComponent as Be, withDirectives as Ye, withModifiers as Te, vShow as Ze, createSlots as Oe } from "vue";
import { generateRandomString as _e } from "lkt-string-tools";
import { httpCall as $e } from "lkt-http-client";
import { openModal as et, openConfirm as tt, runModalCallback as ot } from "lkt-modal";
import { useRouter as lt } from "vue-router";
import { extractPropValue as G, ButtonType as o, extractI18nValue as te, FieldType as De, getDefaultValues as nt, Button as it, LktSettings as Ie } from "lkt-vue-kernel";
const J = class J {
};
J.debugEnabled = !1, J.defaultSplitIcon = void 0;
let w = J;
const ht = (m = !0) => {
  w.debugEnabled = m;
}, a = (...m) => {
  w.debugEnabled && console.info("[LktButton] ", ...m);
}, at = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ut = ["src", "alt"], rt = {
  key: 1,
  class: "lkt-button--icon-dot"
}, ct = ["src", "alt"], st = {
  key: 10,
  class: "lkt-split-button-arrow"
}, ft = /* @__PURE__ */ Qe({
  __name: "LktButton",
  props: /* @__PURE__ */ We({
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
  }, nt(it)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(m, { expose: Re, emit: Ee }) {
    const e = m, k = Ee, U = Xe(), oe = lt();
    let N = G(e.modal, e.prop), Fe = G(e.modalKey, e.prop);
    const Ve = "lkt-button-" + _e(), g = s(e.loading), S = s(null), Q = s(null), B = s(!1), v = s(e.openTooltip), le = s(!1), T = s(!1), O = s(void 0), f = s(e.checked), ne = s(void 0), W = s(!1), X = s(null), Y = s(!1);
    I(() => e.openTooltip, (t) => v.value = t), I(v, (t) => k("update:openTooltip", t));
    const ie = u(() => {
      let t = [];
      return e.class && t.push(e.class), V.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), g.value && t.push("is-loading"), le.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), B.value && t.push("show-split"), f.value && t.push("is-checked"), ce.value && t.push("is-disabled"), W.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), b = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return te(e.textOn);
        if (!f.value && typeof e.textOff < "u") return te(e.textOff);
      }
      return te(e.text);
    }), D = u(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), G(t, e.prop);
    }), ae = u(() => {
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), G(t, e.prop);
    }), E = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Me = u(() => typeof w.defaultSplitIcon < "u"), He = u(() => w.defaultSplitIcon), ue = u(() => typeof e.dot == "boolean" ? "" : e.dot), y = (t, l = void 0) => {
      a("endClickMethod", t, l), je(), Pe(t === null ? void 0 : t, l), k("click", t, l);
    }, F = async (t) => {
      a("Resource Click", e.resource, e.resourceData), g.value = !0, k("loading");
      let l = { ...e.resourceData, isChecked: f.value };
      return $e(e.resource, l).then((d) => {
        g.value = !1, k("loaded"), a("Resource Click -> Received response", d), y(t, d);
      }).catch((d) => {
        g.value = !1, k("loaded"), a("Resource Click -> Received response error", d), y(t, d);
      });
    }, re = s(!1), Le = u(() => S.value ? e.type === o.TooltipLazy ? re.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ae = s(!1), Ue = u(() => S.value ? e.type === o.SplitLazy ? Ae.value : e.type === o.SplitEver ? B.value : e.type === o.Split : !1), Ne = (t) => {
      if (W.value = !0, Y.value) {
        Y.value = !1, k("focus");
        return;
      }
      k("focus", t);
    }, xe = (t) => {
      W.value = !1, k("blur", t);
    }, Z = u(() => e.type === o.Switch || e.type === o.HiddenSwitch), ze = u(() => e.type === o.Switch), _ = u(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ke = u(() => e.type === o.ImageUpload ? De.Image : De.File), je = () => {
      e.modalCallbacks.forEach((t) => {
        ot(t);
      });
    }, Pe = (t, l) => {
      var d;
      a("doConfigClick: ", e), typeof ((d = e.events) == null ? void 0 : d.click) == "function" && e.events.click({
        event: t,
        httpResponse: l
      });
    }, V = u(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), $ = u(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), ee = (t) => {
      var l, d, x, M, H, c, de, pe, ve, me, ke, ye, he, Ce;
      if (a("Click", e, t), t && (Z.value ? (l = t.target) != null && l.closest(".lkt-field.is-switch") || (f.value = !f.value) : _.value ? X.value && ((d = X.value) == null || d.click()) : $.value ? (v.value = !v.value, v.value && (re.value = !0)) : V.value && (B.value = !B.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), V.value || $.value || _.value) {
        y(t);
        return;
      }
      if (N) {
        let n = { ...E.value };
        a("Click -> has modal", e.modal, n), a("Click -> typeof beforeClose: ", typeof n.beforeClose), typeof n.beforeClose == "function" ? (n.beforeClose = (L) => {
          if (e.resource)
            return F(t).then(() => {
              typeof E.value.beforeClose == "function" && E.value.beforeClose(L);
            });
          typeof E.value.beforeClose == "function" && E.value.beforeClose(L), y(t);
        }, a("Click -> New beforeClose function: ", n.beforeClose)) : (n.beforeClose = () => {
          if (e.resource)
            return F(t);
          y(t);
        }, a("Click -> New beforeClose function: ", n.beforeClose));
        let h = N;
        return typeof N == "function" && (h = N()), et(h, Fe, n);
      }
      if (e.confirmModal) {
        a("Click -> has confirm modal", e.confirmModal, e.confirmData), a("Click -> typeof onConfirm: ", typeof ((x = e.confirmData.events) == null ? void 0 : x.click));
        let n = { ...e.confirmData };
        if (n.confirmButton ? n.confirmButton = { ...Ie.defaultConfirmButton, ...n.confirmButton } : n.confirmButton = { ...Ie.defaultConfirmButton }, n.confirmButton.events || (n.confirmButton.events = {}), typeof ((H = (M = n.confirmButton) == null ? void 0 : M.events) == null ? void 0 : H.click) == "function") {
          let h = (de = (c = n.confirmButton) == null ? void 0 : c.events) == null ? void 0 : de.click;
          a("Click -> Has onConfirm function: ", h), n.confirmButton.events.click = () => {
            if (a("OnConfirm -> Already: ", e), e.resource)
              return F(t).then(() => {
                h();
              });
            h(), y(t);
          }, a("Click -> New onConfirm function created: ", (ve = (pe = n.confirmButton) == null ? void 0 : pe.events) == null ? void 0 : ve.click);
        } else
          n.confirmButton.events.click = () => {
            var h, L, be, ge;
            if (a("OnConfirm -> Created: ", e), e.resource)
              return F(t);
            if (((h = e.anchor) == null ? void 0 : h.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (L = e.anchor) != null && L.external || typeof ((be = e.anchor) == null ? void 0 : be.to) < "u" && oe.push((ge = e.anchor) == null ? void 0 : ge.to);
              return;
            }
            y(t);
          }, a("Click -> New onConfirm function created: ", (me = n.confirmButton) == null ? void 0 : me.events.click);
        return tt(e.confirmModal, e.confirmModalKey, n);
      }
      if (e.resource)
        return a("Click -> has resource"), F(t);
      if (typeof ((ke = e.anchor) == null ? void 0 : ke.to) < "u" && ((ye = e.anchor) == null ? void 0 : ye.to) !== "") {
        a("Click -> Is Anchor", e.anchor), (he = e.anchor) != null && he.external ? typeof ((Ce = e.anchor) == null ? void 0 : Ce.to) == "string" && (window.location.href = e.anchor.to) : oe.push(e.anchor.to);
        return;
      }
      if (Z.value) {
        a("Click -> Is Switch"), y(t);
        return;
      }
      a("Click -> Emit", e), y(t);
    };
    I(() => e.loading, () => g.value = e.loading), I(() => e.checked, () => f.value = e.checked), I(f, (t) => k("update:checked", t)), I(T, (t) => {
      T.value && e.showTooltipOnHover ? (O.value !== void 0 && clearTimeout(O.value), O.value = setTimeout(() => {
        v.value = !0, clearTimeout(O.value);
      }, e.showTooltipOnHoverDelay)) : !T.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(O.value)) : T.value || clearTimeout(O.value);
    }), Re({
      click: () => ee(null),
      focus: (t) => {
        Q.value && (t && (Y.value = !0), Q.value.focus());
      }
    });
    const qe = u(() => e.type === o.Content ? "div" : "button"), ce = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), se = (t) => ee(t), Ge = (t) => le.value = t, fe = u(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Je = u(() => fe.value ? { ...e.anchor, class: ie.value, prop: e.prop } : {});
    return (t, l) => {
      const d = z("lkt-spinner"), x = z("lkt-anchor"), M = z("lkt-field"), H = z("lkt-tooltip");
      return i(), p("div", {
        class: A(["lkt-button", ie.value]),
        ref_key: "container",
        ref: S,
        id: Ve,
        onMousemove: l[4] || (l[4] = (c) => T.value = !0),
        onMouseleave: l[5] || (l[5] = (c) => T.value = !1)
      }, [
        fe.value ? (i(), C(x, K({ key: 0 }, Je.value, {
          class: "lkt-button-main",
          onActive: Ge
        }), {
          default: j(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: A(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", at, P(ue.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, ut)) : r("", !0),
            q(U).text ? R(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (i(), p(Se, { key: 4 }, [
              we(P(b.value), 1)
            ], 64)) : r("", !0),
            q(U).default ? R(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (i(), C(d, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (i(), C(Be(qe.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: Q,
          name: t.name,
          type: t.type,
          disabled: ce.value,
          tabindex: t.tabindex,
          onClick: ee,
          onFocus: Ne,
          onBlur: xe
        }, {
          default: j(() => [
            D.value ? (i(), p("i", {
              key: 0,
              class: A(D.value)
            }, null, 2)) : r("", !0),
            D.value && t.dot ? (i(), p("i", rt, P(ue.value), 1)) : r("", !0),
            t.img ? (i(), p("img", {
              key: 2,
              src: t.img,
              alt: b.value
            }, null, 8, ct)) : r("", !0),
            q(U).text ? R(t.$slots, "text", {
              key: 3,
              text: b.value
            }) : b.value ? (i(), p(Se, { key: 4 }, [
              we(P(b.value), 1)
            ], 64)) : r("", !0),
            q(U).default ? R(t.$slots, "default", { key: 5 }) : r("", !0),
            g.value ? (i(), C(d, { key: 6 })) : r("", !0),
            Z.value ? Ye((i(), C(M, {
              key: 7,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": l[0] || (l[0] = (c) => f.value = c),
              disabled: t.disabled,
              onClick: Te(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [Ze, ze.value]
            ]) : r("", !0),
            _.value ? (i(), C(M, K({
              key: 8,
              ref_key: "fileFieldRef",
              ref: X,
              type: Ke.value,
              modelValue: ne.value,
              "onUpdate:modelValue": l[1] || (l[1] = (c) => ne.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: t.resourceData
              }
            }, {
              disabled: t.disabled,
              onClick: Te(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            ae.value ? (i(), p("i", {
              key: 9,
              class: A([ae.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            V.value ? (i(), p("div", st, [
              t.splitIcon ? (i(), p("i", {
                key: 0,
                class: A(t.splitIcon)
              }, null, 2)) : Me.value ? (i(), C(Be(He.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        V.value && S.value ? (i(), C(H, K({
          key: 2,
          modelValue: B.value,
          "onUpdate:modelValue": l[2] || (l[2] = (c) => B.value = c)
        }, t.tooltip, {
          referrer: S.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Oe({ _: 2 }, [
          Ue.value ? {
            name: "default",
            fn: j(({ doClose: c }) => [
              R(t.$slots, "split", {
                doClose: c,
                doRootClick: se
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        $.value && S.value ? (i(), C(H, K({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": l[3] || (l[3] = (c) => v.value = c)
        }, t.tooltip, { referrer: S.value }), Oe({ _: 2 }, [
          Le.value ? {
            name: "default",
            fn: j(({ doClose: c }) => [
              R(t.$slots, "tooltip", {
                doClose: c,
                doRootClick: se
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer"])) : r("", !0)
      ], 34);
    };
  }
}), Ct = {
  install: (m) => {
    m.component("lkt-button") === void 0 && m.component("lkt-button", ft);
  }
}, bt = (m) => {
  w.defaultSplitIcon = m;
};
export {
  ht as debugLktButton,
  Ct as default,
  bt as setDefaultButtonSplitSlot
};
