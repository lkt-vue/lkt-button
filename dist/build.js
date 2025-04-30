import { defineComponent as Qe, mergeDefaults as We, useSlots as Xe, ref as s, watch as I, computed as u, resolveComponent as z, createElementBlock as p, openBlock as a, normalizeClass as U, createBlock as S, createCommentVNode as r, mergeProps as K, withCtx as j, renderSlot as F, toDisplayString as P, unref as q, Fragment as ge, createTextVNode as we, resolveDynamicComponent as Be, withDirectives as Ye, withModifiers as De, vShow as Ze, createSlots as Te } from "vue";
import { generateRandomString as _e } from "lkt-string-tools";
import { httpCall as $e } from "lkt-http-client";
import { openModal as et, openConfirm as tt, runModalCallback as ot } from "lkt-modal";
import { useRouter as lt } from "vue-router";
import { extractPropValue as G, ButtonType as o, extractI18nValue as te, FieldType as Oe, getDefaultValues as nt, Button as it, LktSettings as Re } from "lkt-vue-kernel";
const J = class J {
};
J.debugEnabled = !1, J.defaultSplitIcon = void 0;
let D = J;
const ht = (y = !0) => {
  D.debugEnabled = y;
}, l = (...y) => {
  D.debugEnabled && console.info("[LktButton] ", ...y);
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
  setup(y, { expose: Ee, emit: Ie }) {
    const e = y, h = Ie, N = Xe(), oe = lt();
    let x = G(e.modal, e.prop), Fe = G(e.modalKey, e.prop);
    const Ve = "lkt-button-" + _e(), w = s(e.loading), B = s(null), Q = s(null), T = s(!1), v = s(e.openTooltip), le = s(!1), O = s(!1), R = s(void 0), f = s(e.checked), ne = s(void 0), W = s(!1), X = s(null), Y = s(!1);
    I(() => e.openTooltip, (t) => v.value = t), I(v, (t) => h("update:openTooltip", t));
    const ie = u(() => {
      let t = [];
      return e.class && t.push(e.class), H.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), w.value && t.push("is-loading"), le.value && t.push("is-active-route"), v.value && t.push("show-tooltip"), T.value && t.push("show-split"), f.value && t.push("is-checked"), ce.value && t.push("is-disabled"), W.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), g = u(() => {
      if (e.type === o.Switch || e.type === o.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return te(e.textOn);
        if (!f.value && typeof e.textOff < "u") return te(e.textOff);
      }
      return te(e.text);
    }), E = u(() => {
      let t = e.icon;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), G(t, e.prop);
    }), ae = u(() => {
      let t = e.iconEnd;
      return (e.type === o.Switch || e.type === o.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), G(t, e.prop);
    }), V = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Me = u(() => typeof D.defaultSplitIcon < "u"), He = u(() => D.defaultSplitIcon), ue = u(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, n = void 0) => {
      l("endClickMethod", t, n), je(), Pe(t === null ? void 0 : t, n), h("click", t, n);
    }, M = async (t) => {
      var m;
      l("Resource Click", e.resource, e.resourceData), w.value = !0, h("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (l("Resource Click -> httpStart event"), e.events.httpStart());
      let n = { ...e.resourceData, isChecked: f.value };
      return $e(e.resource, n).then((d) => {
        var k;
        w.value = !1, h("loaded"), l("Resource Click -> Received response", d), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (l("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), C(t, d);
      }).catch((d) => {
        var k;
        w.value = !1, h("loaded"), l("Resource Click -> Received response error", d), typeof ((k = e.events) == null ? void 0 : k.httpEnd) == "function" && (l("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), C(t, d);
      });
    }, re = s(!1), Le = u(() => B.value ? e.type === o.TooltipLazy ? re.value : e.type === o.TooltipEver ? v.value : e.type === o.Tooltip : !1), Ae = s(!1), Ue = u(() => B.value ? e.type === o.SplitLazy ? Ae.value : e.type === o.SplitEver ? T.value : e.type === o.Split : !1), Ne = (t) => {
      if (W.value = !0, Y.value) {
        Y.value = !1, h("focus");
        return;
      }
      h("focus", t);
    }, xe = (t) => {
      W.value = !1, h("blur", t);
    }, Z = u(() => e.type === o.Switch || e.type === o.HiddenSwitch), ze = u(() => e.type === o.Switch), _ = u(() => e.type === o.FileUpload || e.type === o.ImageUpload), Ke = u(() => e.type === o.ImageUpload ? Oe.Image : Oe.File), je = () => {
      e.modalCallbacks.forEach((t) => {
        ot(t);
      });
    }, Pe = (t, n) => {
      var m;
      l("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: n
      });
    }, H = u(() => [
      o.Split,
      o.SplitLazy,
      o.SplitEver
    ].includes(e.type)), $ = u(() => [
      o.Tooltip,
      o.TooltipLazy,
      o.TooltipEver
    ].includes(e.type)), ee = (t) => {
      var n, m, d, k, L, c, de, pe, ve, me, ke, ye, he, Ce;
      if (l("Click", e, t), t && (Z.value ? (n = t.target) != null && n.closest(".lkt-field.is-switch") || (f.value = !f.value) : _.value ? X.value && ((m = X.value) == null || m.click()) : $.value ? (v.value = !v.value, v.value && (re.value = !0)) : H.value && (T.value = !T.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), H.value || $.value || _.value) {
        C(t);
        return;
      }
      if (x) {
        let i = { ...V.value };
        l("Click -> has modal", e.modal, i), l("Click -> typeof beforeClose: ", typeof i.beforeClose), typeof i.beforeClose == "function" ? (i.beforeClose = (A) => {
          if (e.resource)
            return M(t).then(() => {
              typeof V.value.beforeClose == "function" && V.value.beforeClose(A);
            });
          typeof V.value.beforeClose == "function" && V.value.beforeClose(A), C(t);
        }, l("Click -> New beforeClose function: ", i.beforeClose)) : (i.beforeClose = () => {
          if (e.resource)
            return M(t);
          C(t);
        }, l("Click -> New beforeClose function: ", i.beforeClose));
        let b = x;
        return typeof x == "function" && (b = x()), et(b, Fe, i);
      }
      if (e.confirmModal) {
        l("Click -> has confirm modal", e.confirmModal, e.confirmData), l("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let i = { ...e.confirmData };
        if (i.confirmButton ? i.confirmButton = { ...Re.defaultConfirmButton, ...i.confirmButton } : i.confirmButton = { ...Re.defaultConfirmButton }, i.confirmButton.events || (i.confirmButton.events = {}), typeof ((L = (k = i.confirmButton) == null ? void 0 : k.events) == null ? void 0 : L.click) == "function") {
          let b = (de = (c = i.confirmButton) == null ? void 0 : c.events) == null ? void 0 : de.click;
          l("Click -> Has confirmData.events?.click function: ", b), i.confirmButton.events.click = () => {
            if (l("confirmData.events?.click -> Already: ", e), e.resource)
              return M(t).then(() => {
                b();
              });
            b(), C(t);
          }, l("Click -> New confirmData.events?.click function created: ", (ve = (pe = i.confirmButton) == null ? void 0 : pe.events) == null ? void 0 : ve.click);
        } else
          i.confirmButton.events.click = () => {
            var b, A, be, Se;
            if (l("confirmData.events?.click -> Created: ", e), e.resource)
              return M(t);
            if (((b = e.anchor) == null ? void 0 : b.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (A = e.anchor) != null && A.external || typeof ((be = e.anchor) == null ? void 0 : be.to) < "u" && oe.push((Se = e.anchor) == null ? void 0 : Se.to);
              return;
            }
            C(t);
          }, l("Click -> New confirmData.events?.click function created: ", (me = i.confirmButton) == null ? void 0 : me.events.click);
        return tt(e.confirmModal, e.confirmModalKey, i);
      }
      if (e.resource)
        return l("Click -> has resource"), M(t);
      if (typeof ((ke = e.anchor) == null ? void 0 : ke.to) < "u" && ((ye = e.anchor) == null ? void 0 : ye.to) !== "") {
        l("Click -> Is Anchor", e.anchor), (he = e.anchor) != null && he.external ? typeof ((Ce = e.anchor) == null ? void 0 : Ce.to) == "string" && (window.location.href = e.anchor.to) : oe.push(e.anchor.to);
        return;
      }
      if (Z.value) {
        l("Click -> Is Switch"), C(t);
        return;
      }
      l("Click -> Emit", e), C(t);
    };
    I(() => e.loading, () => w.value = e.loading), I(() => e.checked, () => f.value = e.checked), I(f, (t) => h("update:checked", t)), I(O, (t) => {
      O.value && e.showTooltipOnHover ? (R.value !== void 0 && clearTimeout(R.value), R.value = setTimeout(() => {
        v.value = !0, clearTimeout(R.value);
      }, e.showTooltipOnHoverDelay)) : !O.value && e.hideTooltipOnLeave ? (v.value = !1, clearTimeout(R.value)) : O.value || clearTimeout(R.value);
    }), Ee({
      click: () => ee(null),
      focus: (t) => {
        Q.value && (t && (Y.value = !0), Q.value.focus());
      }
    });
    const qe = u(() => e.type === o.Content ? "div" : "button"), ce = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), se = (t) => ee(t), Ge = (t) => le.value = t, fe = u(() => e.type === o.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), Je = u(() => fe.value ? { ...e.anchor, class: ie.value, prop: e.prop } : {});
    return (t, n) => {
      const m = z("lkt-spinner"), d = z("lkt-anchor"), k = z("lkt-field"), L = z("lkt-tooltip");
      return a(), p("div", {
        class: U(["lkt-button", ie.value]),
        ref_key: "container",
        ref: B,
        id: Ve,
        onMousemove: n[4] || (n[4] = (c) => O.value = !0),
        onMouseleave: n[5] || (n[5] = (c) => O.value = !1)
      }, [
        fe.value ? (a(), S(d, K({ key: 0 }, Je.value, {
          class: "lkt-button-main",
          onActive: Ge
        }), {
          default: j(() => [
            E.value ? (a(), p("i", {
              key: 0,
              class: U(E.value)
            }, null, 2)) : r("", !0),
            E.value && t.dot ? (a(), p("i", at, P(ue.value), 1)) : r("", !0),
            t.img ? (a(), p("img", {
              key: 2,
              src: t.img,
              alt: g.value
            }, null, 8, ut)) : r("", !0),
            q(N).text ? F(t.$slots, "text", {
              key: 3,
              text: g.value
            }) : g.value ? (a(), p(ge, { key: 4 }, [
              we(P(g.value), 1)
            ], 64)) : r("", !0),
            q(N).default ? F(t.$slots, "default", { key: 5 }) : r("", !0),
            w.value ? (a(), S(m, { key: 6 })) : r("", !0)
          ]),
          _: 3
        }, 16)) : (a(), S(Be(qe.value), {
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
            E.value ? (a(), p("i", {
              key: 0,
              class: U(E.value)
            }, null, 2)) : r("", !0),
            E.value && t.dot ? (a(), p("i", rt, P(ue.value), 1)) : r("", !0),
            t.img ? (a(), p("img", {
              key: 2,
              src: t.img,
              alt: g.value
            }, null, 8, ct)) : r("", !0),
            q(N).text ? F(t.$slots, "text", {
              key: 3,
              text: g.value
            }) : g.value ? (a(), p(ge, { key: 4 }, [
              we(P(g.value), 1)
            ], 64)) : r("", !0),
            q(N).default ? F(t.$slots, "default", { key: 5 }) : r("", !0),
            w.value ? (a(), S(m, { key: 6 })) : r("", !0),
            Z.value ? Ye((a(), S(k, {
              key: 7,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": n[0] || (n[0] = (c) => f.value = c),
              disabled: t.disabled,
              onClick: De(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [Ze, ze.value]
            ]) : r("", !0),
            _.value ? (a(), S(k, K({
              key: 8,
              ref_key: "fileFieldRef",
              ref: X,
              type: Ke.value,
              modelValue: ne.value,
              "onUpdate:modelValue": n[1] || (n[1] = (c) => ne.value = c),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: t.resourceData
              }
            }, {
              disabled: t.disabled,
              onClick: De(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : r("", !0),
            ae.value ? (a(), p("i", {
              key: 9,
              class: U([ae.value, "lkt-button-icon-end"])
            }, null, 2)) : r("", !0),
            H.value ? (a(), p("div", st, [
              t.splitIcon ? (a(), p("i", {
                key: 0,
                class: U(t.splitIcon)
              }, null, 2)) : Me.value ? (a(), S(Be(He.value), { key: 1 })) : r("", !0)
            ])) : r("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        H.value && B.value ? (a(), S(L, K({
          key: 2,
          modelValue: T.value,
          "onUpdate:modelValue": n[2] || (n[2] = (c) => T.value = c)
        }, t.tooltip, {
          referrer: B.value,
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Te({ _: 2 }, [
          Ue.value ? {
            name: "default",
            fn: j(({ doClose: c }) => [
              F(t.$slots, "split", {
                doClose: c,
                doRootClick: se
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "referrer", "class"])) : r("", !0),
        $.value && B.value ? (a(), S(L, K({
          key: 3,
          modelValue: v.value,
          "onUpdate:modelValue": n[3] || (n[3] = (c) => v.value = c)
        }, t.tooltip, { referrer: B.value }), Te({ _: 2 }, [
          Le.value ? {
            name: "default",
            fn: j(({ doClose: c }) => [
              F(t.$slots, "tooltip", {
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
  install: (y) => {
    y.component("lkt-button") === void 0 && y.component("lkt-button", ft);
  }
}, bt = (y) => {
  D.defaultSplitIcon = y;
};
export {
  ht as debugLktButton,
  Ct as default,
  bt as setDefaultButtonSplitSlot
};
