import { defineComponent as _e, mergeDefaults as $e, useSlots as et, ref as s, watch as L, computed as n, resolveComponent as A, createElementBlock as S, unref as W, openBlock as a, renderSlot as I, normalizeClass as we, createBlock as d, createCommentVNode as c, mergeProps as T, withCtx as Q, resolveDynamicComponent as Be, withDirectives as tt, normalizeProps as Te, toDisplayString as ot, withModifiers as Oe, vShow as lt, createSlots as Ee, Fragment as Ie, renderList as Re } from "vue";
import { generateRandomString as nt } from "lkt-string-tools";
import { httpCall as it } from "lkt-http-client";
import { openModal as ut, openConfirm as at, runModalCallback as rt } from "lkt-modal";
import { useRouter as ct } from "vue-router";
import { extractPropValue as H, ButtonType as l, extractI18nValue as ne, IconPosition as ie, FieldType as Me, getDefaultValues as st, Button as ft, LktSettings as Fe } from "lkt-vue-kernel";
const X = class X {
};
X.debugEnabled = !1, X.defaultSplitIcon = void 0;
let R = X;
const Dt = (h = !0) => {
  R.debugEnabled = h;
}, i = (...h) => {
  R.debugEnabled && console.info("[LktButton] ", ...h);
}, pt = ["src", "alt"], dt = ["src", "alt"], vt = {
  key: 3,
  class: "lkt-button--label"
}, mt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, kt = /* @__PURE__ */ _e({
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
  }, st(ft)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(h, { expose: Ve, emit: Le }) {
    const e = h, b = Le, q = et(), ue = ct();
    let Ae = H(e.modalKey, e.prop);
    const He = "lkt-button-" + nt(), O = s(e.loading), E = s(null), Y = s(null), M = s(!1), m = s(e.openTooltip), ae = s(!1), D = s(!1), F = s(void 0), f = s(e.checked), re = s(void 0), Z = s(!1), _ = s(null), $ = s(!1);
    L(() => e.openTooltip, (t) => m.value = t), L(m, (t) => b("update:openTooltip", t));
    const ce = n(() => {
      let t = [];
      return e.class && t.push(e.class), N.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), O.value && t.push("is-loading"), ae.value && t.push("is-active-route"), m.value && t.push("show-tooltip"), M.value && t.push("show-split"), f.value && t.push("is-checked"), de.value && t.push("is-disabled"), Z.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), t.join(" ");
    }), w = n(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ne(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ne(e.textOff);
      }
      return ne(e.text);
    }), p = n(() => {
      let t = e.icon;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), H(t, e.prop);
    }), B = n(() => {
      if (typeof p.value == "object" && p.value.position === ie.End)
        return p.value;
      let t = e.iconEnd;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), H(t, e.prop);
    }), G = n(() => typeof e.modal == "function" ? e.modal(e.prop) : H(e.modal, e.prop)), j = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), je = n(() => typeof R.defaultSplitIcon < "u"), Ue = n(() => R.defaultSplitIcon), Ne = n(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, o = void 0) => {
      i("endClickMethod", t, o), qe(), Ge(t === null ? void 0 : t, o), b("click", t, o);
    }, ee = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return H(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let o in e.resourceData)
          t[o] = H(e.resourceData[o], e.prop);
        return t;
      }
      return e.resourceData;
    }), U = async (t) => {
      var k;
      i("Resource Click", e.resource, ee.value), O.value = !0, b("loading"), typeof ((k = e.events) == null ? void 0 : k.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...ee.value, isChecked: f.value };
      return it(e.resource, o).then((v) => {
        var y;
        O.value = !1, b("loaded"), i("Resource Click -> Received response", v), typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: v
        })), C(t, v);
      }).catch((v) => {
        var y;
        O.value = !1, b("loaded"), i("Resource Click -> Received response error", v), typeof ((y = e.events) == null ? void 0 : y.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: v
        })), C(t, v);
      });
    }, se = s(!1), xe = n(() => E.value ? e.type === l.TooltipLazy ? se.value : e.type === l.TooltipEver ? m.value : e.type === l.Tooltip : !1), ze = s(!1), Ke = n(() => E.value ? e.type === l.SplitLazy ? ze.value : e.type === l.SplitEver ? M.value : e.type === l.Split : !1), fe = (t) => {
      if (Z.value = !0, $.value) {
        $.value = !1, b("focus");
        return;
      }
      b("focus", t);
    }, pe = (t) => {
      Z.value = !1, b("blur", t);
    }, te = n(() => e.type === l.Switch || e.type === l.HiddenSwitch), Pe = n(() => e.type === l.Switch), oe = n(() => e.type === l.FileUpload || e.type === l.ImageUpload), We = n(() => e.type === l.ImageUpload ? Me.Image : Me.File), qe = () => {
      e.modalCallbacks.forEach((t) => {
        rt(t);
      });
    }, Ge = (t, o) => {
      var k;
      i("doConfigClick: ", e), typeof ((k = e.events) == null ? void 0 : k.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      });
    }, N = n(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), le = n(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), J = (t) => {
      var o, k, v, y, x, z, K, r, V, ye, he, be, Ce, ge;
      if (i("Click", e, t), t && (te.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (f.value = !f.value) : oe.value ? _.value && ((k = _.value) == null || k.click()) : le.value ? (m.value = !m.value, m.value && (se.value = !0)) : N.value && (M.value = !M.value)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), N.value || le.value || oe.value) {
        C(t);
        return;
      }
      if (G.value) {
        let u = { ...j.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (P) => {
          if (e.resource)
            return U(t).then(() => {
              typeof j.value.beforeClose == "function" && j.value.beforeClose(P);
            });
          typeof j.value.beforeClose == "function" && j.value.beforeClose(P), C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return U(t);
          C(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let g = G.value;
        return typeof G.value == "function" && (g = G.value()), ut(g, Ae, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((v = e.confirmData.events) == null ? void 0 : v.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Fe.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Fe.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((x = (y = u.confirmButton) == null ? void 0 : y.events) == null ? void 0 : x.click) == "function") {
          let g = (K = (z = u.confirmButton) == null ? void 0 : z.events) == null ? void 0 : K.click;
          i("Click -> Has confirmData.events?.click function: ", g), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return U(t).then(() => {
                g();
              });
            g(), C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (V = (r = u.confirmButton) == null ? void 0 : r.events) == null ? void 0 : V.click);
        } else
          u.confirmButton.events.click = () => {
            var g, P, Se, De;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return U(t);
            if (((g = e.anchor) == null ? void 0 : g.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (P = e.anchor) != null && P.external || typeof ((Se = e.anchor) == null ? void 0 : Se.to) < "u" && ue.push((De = e.anchor) == null ? void 0 : De.to);
              return;
            }
            C(t);
          }, i("Click -> New confirmData.events?.click function created: ", (ye = u.confirmButton) == null ? void 0 : ye.events.click);
        return at(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), U(t);
      if (typeof ((he = e.anchor) == null ? void 0 : he.to) < "u" && ((be = e.anchor) == null ? void 0 : be.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (Ce = e.anchor) != null && Ce.external ? typeof ((ge = e.anchor) == null ? void 0 : ge.to) == "string" && (window.location.href = e.anchor.to) : ue.push(e.anchor.to);
        return;
      }
      if (te.value) {
        i("Click -> Is Switch"), C(t);
        return;
      }
      i("Click -> Emit", e), C(t);
    };
    L(() => e.loading, () => O.value = e.loading), L(() => e.checked, () => f.value = e.checked), L(f, (t) => b("update:checked", t)), L(D, (t) => {
      D.value && e.showTooltipOnHover ? (F.value !== void 0 && clearTimeout(F.value), F.value = setTimeout(() => {
        m.value = !0, clearTimeout(F.value);
      }, e.showTooltipOnHoverDelay)) : !D.value && e.hideTooltipOnLeave ? (m.value = !1, clearTimeout(F.value)) : D.value || clearTimeout(F.value);
    }), Ve({
      click: () => J(null),
      focus: (t) => {
        Y.value && (t && ($.value = !0), Y.value.focus());
      }
    });
    const Je = n(() => e.type === l.Content ? "div" : "button"), Qe = n(() => {
      switch (e.type) {
        case l.Button:
        case l.Submit:
          return e.type;
        default:
          return "button";
      }
    }), de = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ve = (t) => J(t), Xe = (t) => ae.value = t, me = n(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), ke = n(() => typeof p.value == "string" ? {
      icon: p.value,
      dot: e.dot ? Ne.value : !1
    } : typeof p.value == "object" && p.value.position !== ie.End ? p.value : {}), Ye = n(() => (console.log("de iconos va la cosa: ", p.value, B.value), typeof B.value == "string" && B.value !== "" ? {
      icon: B.value,
      class: "lkt-button-icon-end"
    } : typeof B.value == "object" && Object.keys(B.value).length > 0 ? {
      ...B.value,
      class: "lkt-button-icon-end"
    } : typeof p.value == "object" && p.value.position === ie.End ? {
      ...p.value,
      class: "lkt-button-icon-end"
    } : {})), Ze = n(() => {
      if (me.value) {
        let t = {};
        return p.value && (t.icon = ke.value), w.value && (t.text = w.value), {
          ...e.anchor,
          class: ce.value,
          ...t,
          prop: e.prop,
          disabled: e.anchor.disabled ?? e.disabled
        };
      }
      return {};
    });
    return (t, o) => {
      const k = A("lkt-spinner"), v = A("lkt-anchor"), y = A("lkt-icon"), x = A("lkt-field"), z = A("lkt-button", !0), K = A("lkt-tooltip");
      return t.type === W(l).InvisibleWrapper ? (a(), S("div", {
        key: 0,
        onClick: J,
        onFocus: fe,
        onBlur: pe,
        onMousemove: o[0] || (o[0] = (r) => D.value = !0),
        onMouseleave: o[1] || (o[1] = (r) => D.value = !1)
      }, [
        I(t.$slots, "default")
      ], 32)) : (a(), S("div", {
        key: 1,
        class: we(["lkt-button", ce.value]),
        ref_key: "container",
        ref: E,
        id: He,
        onMousemove: o[6] || (o[6] = (r) => D.value = !0),
        onMouseleave: o[7] || (o[7] = (r) => D.value = !1)
      }, [
        me.value ? (a(), d(v, T({ key: 0 }, Ze.value, {
          class: "lkt-button-main",
          onActive: Xe
        }), {
          default: Q(() => [
            t.img ? (a(), S("img", {
              key: 0,
              src: t.img,
              alt: w.value
            }, null, 8, pt)) : c("", !0),
            W(q).text ? I(t.$slots, "text", {
              key: 1,
              text: w.value
            }) : c("", !0),
            W(q).default ? I(t.$slots, "default", { key: 2 }) : c("", !0),
            O.value ? (a(), d(k, { key: 3 })) : c("", !0)
          ]),
          _: 3
        }, 16)) : (a(), d(Be(Je.value), {
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: Y,
          name: t.name,
          type: Qe.value,
          disabled: de.value,
          tabindex: t.tabindex,
          onClick: J,
          onFocus: fe,
          onBlur: pe
        }, {
          default: Q(() => [
            p.value ? (a(), d(y, Te(T({ key: 0 }, ke.value)), null, 16)) : c("", !0),
            t.img ? (a(), S("img", {
              key: 1,
              src: t.img,
              alt: w.value
            }, null, 8, dt)) : c("", !0),
            W(q).text ? I(t.$slots, "text", {
              key: 2,
              text: w.value
            }) : w.value ? (a(), S("span", vt, ot(w.value), 1)) : c("", !0),
            W(q).default ? I(t.$slots, "default", { key: 4 }) : c("", !0),
            O.value ? (a(), d(k, { key: 5 })) : c("", !0),
            te.value ? tt((a(), d(x, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": o[2] || (o[2] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [lt, Pe.value]
            ]) : c("", !0),
            oe.value ? (a(), d(x, T({
              key: 7,
              ref_key: "fileFieldRef",
              ref: _,
              type: We.value,
              modelValue: re.value,
              "onUpdate:modelValue": o[3] || (o[3] = (r) => re.value = r),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: t.resource,
                data: ee.value
              }
            }, {
              disabled: t.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : c("", !0),
            B.value ? (a(), d(y, Te(T({ key: 8 }, Ye.value)), null, 16)) : c("", !0),
            N.value ? (a(), S("div", mt, [
              t.splitIcon ? (a(), S("i", {
                key: 0,
                class: we(t.splitIcon)
              }, null, 2)) : je.value ? (a(), d(Be(Ue.value), { key: 1 })) : c("", !0)
            ])) : c("", !0)
          ]),
          _: 3
        }, 40, ["name", "type", "disabled", "tabindex"])),
        N.value && E.value ? (a(), d(K, T({
          key: 2,
          modelValue: M.value,
          "onUpdate:modelValue": o[4] || (o[4] = (r) => M.value = r)
        }, {
          referrer: E.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ee({ _: 2 }, [
          Ke.value ? {
            name: "default",
            fn: Q(({ doClose: r }) => [
              (a(!0), S(Ie, null, Re(t.splitButtons, (V) => (a(), d(z, T({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              I(t.$slots, "split", {
                doClose: r,
                doRootClick: ve
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : c("", !0),
        le.value && E.value ? (a(), d(K, T({
          key: 3,
          modelValue: m.value,
          "onUpdate:modelValue": o[5] || (o[5] = (r) => m.value = r)
        }, {
          referrer: E.value,
          ...t.tooltip
        }), Ee({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: Q(({ doClose: r }) => [
              (a(!0), S(Ie, null, Re(t.splitButtons, (V) => (a(), d(z, T({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              I(t.$slots, "tooltip", {
                doClose: r,
                doRootClick: ve
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : c("", !0)
      ], 34));
    };
  }
}), wt = {
  install: (h) => {
    h.component("lkt-button") === void 0 && h.component("lkt-button", kt);
  }
}, Bt = (h) => {
  R.defaultSplitIcon = h;
};
export {
  Dt as debugLktButton,
  wt as default,
  Bt as setDefaultButtonSplitSlot
};
