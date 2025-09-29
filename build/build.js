import { defineComponent as tt, mergeDefaults as ot, useSlots as lt, ref as s, watch as A, computed as n, resolveComponent as L, createElementBlock as C, unref as W, openBlock as a, renderSlot as R, createVNode as nt, normalizeProps as ne, guardReactiveProps as it, normalizeClass as De, createBlock as v, createCommentVNode as c, mergeProps as w, withCtx as Q, resolveDynamicComponent as Te, withDirectives as ut, toDisplayString as at, withModifiers as Oe, vShow as rt, createSlots as Ee, Fragment as Re, renderList as Ie } from "vue";
import { generateRandomString as ct, ucfirst as st } from "lkt-string-tools";
import { httpCall as ft } from "lkt-http-client";
import { openModal as pt, openConfirm as dt, runModalCallback as vt } from "lkt-modal";
import { useRouter as mt } from "vue-router";
import { extractPropValue as j, ButtonType as l, MenuController as Me, extractI18nValue as ie, IconPosition as ue, FieldType as Fe, getDefaultValues as yt, Button as kt, LktSettings as Ve } from "lkt-vue-kernel";
const X = class X {
};
X.debugEnabled = !1, X.defaultSplitIcon = void 0;
let I = X;
const It = (k = !0) => {
  I.debugEnabled = k;
}, i = (...k) => {
  I.debugEnabled && console.info("[LktButton] ", ...k);
}, ht = { key: 1 }, bt = ["src", "alt"], Ct = ["src", "alt"], gt = {
  key: 3,
  class: "lkt-button--label"
}, St = {
  key: 9,
  class: "lkt-split-button-arrow"
}, wt = /* @__PURE__ */ tt({
  __name: "LktButton",
  props: /* @__PURE__ */ ot({
    type: {},
    name: {},
    value: {},
    disabled: { type: [Boolean, Function] },
    openTooltip: { type: Boolean },
    loading: { type: Boolean },
    class: {},
    containerClass: {},
    wrapButton: { type: Boolean },
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
    menuKey: { type: [String, Number, Function] },
    tooltip: {},
    splitIcon: {},
    showTooltipOnHover: { type: Boolean },
    showTooltipOnHoverDelay: {},
    hideTooltipOnLeave: { type: Boolean },
    splitClass: {},
    splitButtons: {},
    tabindex: {},
    prop: {},
    aria: {},
    clickRef: {},
    events: {}
  }, yt(kt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(k, { expose: Ae, emit: Le }) {
    const e = k, g = Le, q = lt(), ae = mt();
    let je = j(e.modalKey, e.prop);
    const He = "lkt-button-" + ct(), T = s(e.loading), O = s(null), Y = s(null), M = s(!1), y = s(e.openTooltip), re = s(!1), B = s(!1), F = s(void 0), f = s(e.checked), ce = s(void 0), Z = s(!1), _ = s(null), $ = s(!1);
    A(() => e.openTooltip, (t) => y.value = t), A(y, (t) => g("update:openTooltip", t));
    const se = n(() => {
      let t = [];
      return e.class && t.push(e.class), U.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), T.value && t.push("is-loading"), re.value && t.push("is-active-route"), y.value && t.push("show-tooltip"), M.value && t.push("show-split"), f.value && t.push("is-checked"), ve.value && t.push("is-disabled"), Z.value && t.push("has-focus"), e.containerClass && t.push(e.containerClass), e.type === l.Menu && (t.push(`menu-target--${e.menuKey}`), Me.getMenuStatus(e.menuKey) && t.push("menu-opened")), t.join(" ");
    }), D = n(() => {
      if (e.type === l.Switch || e.type === l.HiddenSwitch) {
        if (f.value && typeof e.textOn < "u") return ie(e.textOn);
        if (!f.value && typeof e.textOff < "u") return ie(e.textOff);
      }
      return ie(e.text);
    }), p = n(() => {
      let t = e.icon;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconOn : !f.value && typeof e.iconOff < "u" && (t = e.iconOff)), j(t, e.prop);
    }), E = n(() => {
      if (typeof p.value == "object" && p.value.position === ue.End)
        return p.value;
      let t = e.iconEnd;
      return (e.type === l.Switch || e.type === l.HiddenSwitch) && (f.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !f.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), j(t, e.prop);
    }), G = n(() => typeof e.modal == "function" ? e.modal(e.prop) : j(e.modal, e.prop)), H = n(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Ne = n(() => typeof I.defaultSplitIcon < "u"), Ue = n(() => I.defaultSplitIcon), Ke = n(() => typeof e.dot == "boolean" ? "" : e.dot), h = (t, o = void 0) => {
      i("endClickMethod", t, o), Ge(), Je(t === null ? void 0 : t, o), g("click", t, o);
    }, ee = n(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return j(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let o in e.resourceData)
          t[o] = j(e.resourceData[o], e.prop);
        return t;
      }
      return e.resourceData;
    }), N = async (t) => {
      var m;
      i("Resource Click", e.resource, ee.value), T.value = !0, g("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (i("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...ee.value, isChecked: f.value };
      return ft(e.resource, o).then((d) => {
        var b;
        T.value = !1, g("loaded"), i("Resource Click -> Received response", d), typeof ((b = e.events) == null ? void 0 : b.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), h(t, d);
      }).catch((d) => {
        var b;
        T.value = !1, g("loaded"), i("Resource Click -> Received response error", d), typeof ((b = e.events) == null ? void 0 : b.httpEnd) == "function" && (i("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: d
        })), h(t, d);
      });
    }, fe = s(!1), xe = n(() => O.value ? e.type === l.TooltipLazy ? fe.value : e.type === l.TooltipEver ? y.value : e.type === l.Tooltip : !1), ze = s(!1), Pe = n(() => O.value ? e.type === l.SplitLazy ? ze.value : e.type === l.SplitEver ? M.value : e.type === l.Split : !1), pe = (t) => {
      if (Z.value = !0, $.value) {
        $.value = !1, g("focus");
        return;
      }
      g("focus", t);
    }, de = (t) => {
      Z.value = !1, g("blur", t);
    }, te = n(() => e.type === l.Switch || e.type === l.HiddenSwitch), We = n(() => e.type === l.Switch), oe = n(() => e.type === l.FileUpload || e.type === l.ImageUpload), qe = n(() => e.type === l.ImageUpload ? Fe.Image : Fe.File), Ge = () => {
      e.modalCallbacks.forEach((t) => {
        vt(t);
      });
    }, Je = (t, o) => {
      var m;
      i("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      });
    }, U = n(() => [
      l.Split,
      l.SplitLazy,
      l.SplitEver
    ].includes(e.type)), le = n(() => [
      l.Tooltip,
      l.TooltipLazy,
      l.TooltipEver
    ].includes(e.type)), J = (t) => {
      var o, m, d, b, K, x, z, r, V, he, be, Ce, ge, Se;
      if (i("Click", e, t), t && (te.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (f.value = !f.value) : oe.value ? _.value && ((m = _.value) == null || m.click()) : le.value ? (y.value = !y.value, y.value && (fe.value = !0)) : U.value ? M.value = !M.value : e.type === l.Menu ? Me.toggleMenu(e.menuKey) : (e.type, l.Tab)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), U.value || le.value || oe.value) {
        h(t);
        return;
      }
      if (G.value) {
        let u = { ...H.value };
        i("Click -> has modal", e.modal, u), i("Click -> typeof beforeClose: ", typeof u.beforeClose), typeof u.beforeClose == "function" ? (u.beforeClose = (P) => {
          if (e.resource)
            return N(t).then(() => {
              typeof H.value.beforeClose == "function" && H.value.beforeClose(P);
            });
          typeof H.value.beforeClose == "function" && H.value.beforeClose(P), h(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose)) : (u.beforeClose = () => {
          if (e.resource)
            return N(t);
          h(t);
        }, i("Click -> New beforeClose function: ", u.beforeClose));
        let S = G.value;
        return typeof G.value == "function" && (S = G.value()), pt(S, je, u);
      }
      if (e.confirmModal) {
        i("Click -> has confirm modal", e.confirmModal, e.confirmData), i("Click -> typeof confirmData.events?.click: ", typeof ((d = e.confirmData.events) == null ? void 0 : d.click));
        let u = { ...e.confirmData };
        if (u.confirmButton ? u.confirmButton = { ...Ve.defaultConfirmButton, ...u.confirmButton } : u.confirmButton = { ...Ve.defaultConfirmButton }, u.confirmButton.events || (u.confirmButton.events = {}), typeof ((K = (b = u.confirmButton) == null ? void 0 : b.events) == null ? void 0 : K.click) == "function") {
          let S = (z = (x = u.confirmButton) == null ? void 0 : x.events) == null ? void 0 : z.click;
          i("Click -> Has confirmData.events?.click function: ", S), u.confirmButton.events.click = () => {
            if (i("confirmData.events?.click -> Already: ", e), e.resource)
              return N(t).then(() => {
                S();
              });
            S(), h(t);
          }, i("Click -> New confirmData.events?.click function created: ", (V = (r = u.confirmButton) == null ? void 0 : r.events) == null ? void 0 : V.click);
        } else
          u.confirmButton.events.click = () => {
            var S, P, we, Be;
            if (i("confirmData.events?.click -> Created: ", e), e.resource)
              return N(t);
            if (((S = e.anchor) == null ? void 0 : S.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (P = e.anchor) != null && P.external || typeof ((we = e.anchor) == null ? void 0 : we.to) < "u" && ae.push((Be = e.anchor) == null ? void 0 : Be.to);
              return;
            }
            h(t);
          }, i("Click -> New confirmData.events?.click function created: ", (he = u.confirmButton) == null ? void 0 : he.events.click);
        return dt(e.confirmModal, e.confirmModalKey, u);
      }
      if (e.resource)
        return i("Click -> has resource"), N(t);
      if (typeof ((be = e.anchor) == null ? void 0 : be.to) < "u" && ((Ce = e.anchor) == null ? void 0 : Ce.to) !== "") {
        i("Click -> Is Anchor", e.anchor), (ge = e.anchor) != null && ge.external ? typeof ((Se = e.anchor) == null ? void 0 : Se.to) == "string" && (window.location.href = e.anchor.to) : ae.push(e.anchor.to), h(t);
        return;
      }
      if (te.value) {
        i("Click -> Is Switch"), h(t);
        return;
      }
      i("Click -> Emit", e), h(t);
    };
    A(() => e.loading, () => T.value = e.loading), A(() => e.checked, () => f.value = e.checked), A(f, (t) => g("update:checked", t)), A(B, (t) => {
      B.value && e.showTooltipOnHover ? (F.value !== void 0 && clearTimeout(F.value), F.value = setTimeout(() => {
        y.value = !0, clearTimeout(F.value);
      }, e.showTooltipOnHoverDelay)) : !B.value && e.hideTooltipOnLeave ? (y.value = !1, clearTimeout(F.value)) : B.value || clearTimeout(F.value);
    }), Ae({
      click: () => J(null),
      focus: (t) => {
        Y.value && (t && ($.value = !0), Y.value.focus());
      }
    });
    const Qe = n(() => e.type === l.Content ? "div" : "button"), Xe = n(() => {
      switch (e.type) {
        case l.Button:
        case l.Submit:
          return e.type;
        default:
          return "button";
      }
    }), ve = n(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), me = (t) => J(t), Ye = (t) => re.value = t, ye = n(() => e.type === l.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), ke = n(() => typeof p.value == "string" ? {
      icon: p.value,
      dot: e.dot ? Ke.value : !1
    } : typeof p.value == "object" && p.value.position !== ue.End ? p.value : {}), Ze = n(() => typeof E.value == "string" && E.value !== "" ? {
      icon: E.value,
      class: "lkt-button-icon-end"
    } : typeof E.value == "object" && Object.keys(E.value).length > 0 ? {
      ...E.value,
      class: "lkt-button-icon-end"
    } : typeof p.value == "object" && p.value.position === ue.End ? {
      ...p.value,
      class: "lkt-button-icon-end"
    } : {}), _e = n(() => {
      if (ye.value) {
        let t = {};
        return p.value && (t.icon = ke.value), D.value && (t.text = D.value), {
          ...e.anchor,
          class: se.value,
          ...t,
          prop: e.prop,
          disabled: e.anchor.disabled ?? e.disabled
        };
      }
      return {};
    }), $e = n(() => {
      if (e.type === l.Tab) return "tab";
    }), et = n(() => {
      let t = {};
      return typeof e.aria != "object" || Object.keys(e.aria).forEach((o) => {
        t[`aria${st(o)}`] = e.aria[o];
      }), t;
    });
    return (t, o) => {
      const m = L("lkt-button", !0), d = L("lkt-spinner"), b = L("lkt-anchor"), K = L("lkt-icon"), x = L("lkt-field"), z = L("lkt-tooltip");
      return t.type === W(l).InvisibleWrapper ? (a(), C("div", {
        key: 0,
        onClick: J,
        onFocus: pe,
        onBlur: de,
        onMousemove: o[0] || (o[0] = (r) => B.value = !0),
        onMouseleave: o[1] || (o[1] = (r) => B.value = !1)
      }, [
        R(t.$slots, "default")
      ], 32)) : t.wrapButton ? (a(), C("div", ht, [
        nt(m, ne(it({
          ...e,
          wrapButton: !1
        })), null, 16)
      ])) : (a(), C("div", {
        key: 2,
        class: De(["lkt-button", se.value]),
        ref_key: "container",
        ref: O,
        id: He,
        onMousemove: o[6] || (o[6] = (r) => B.value = !0),
        onMouseleave: o[7] || (o[7] = (r) => B.value = !1)
      }, [
        ye.value ? (a(), v(b, w({ key: 0 }, _e.value, {
          class: "lkt-button-main",
          onActive: Ye
        }), {
          default: Q(() => [
            t.img ? (a(), C("img", {
              key: 0,
              src: t.img,
              alt: D.value
            }, null, 8, bt)) : c("", !0),
            W(q).text ? R(t.$slots, "text", {
              key: 1,
              text: D.value
            }) : c("", !0),
            W(q).default ? R(t.$slots, "default", { key: 2 }) : c("", !0),
            T.value ? (a(), v(d, { key: 3 })) : c("", !0)
          ]),
          _: 3
        }, 16)) : (a(), v(Te(Qe.value), w({
          key: 1,
          class: "lkt-button-main",
          ref_key: "button",
          ref: Y,
          name: t.name,
          type: Xe.value,
          disabled: ve.value,
          tabindex: t.tabindex,
          role: $e.value
        }, et.value, {
          onClick: J,
          onFocus: pe,
          onBlur: de
        }), {
          default: Q(() => [
            p.value ? (a(), v(K, ne(w({ key: 0 }, ke.value)), null, 16)) : c("", !0),
            t.img ? (a(), C("img", {
              key: 1,
              src: t.img,
              alt: D.value
            }, null, 8, Ct)) : c("", !0),
            W(q).text ? R(t.$slots, "text", {
              key: 2,
              text: D.value
            }) : D.value ? (a(), C("span", gt, at(D.value), 1)) : c("", !0),
            W(q).default ? R(t.$slots, "default", { key: 4 }) : c("", !0),
            T.value ? (a(), v(d, { key: 5 })) : c("", !0),
            te.value ? ut((a(), v(x, {
              key: 6,
              type: "switch",
              modelValue: f.value,
              "onUpdate:modelValue": o[2] || (o[2] = (r) => f.value = r),
              disabled: t.disabled,
              onClick: Oe(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [rt, We.value]
            ]) : c("", !0),
            oe.value ? (a(), v(x, w({
              key: 7,
              ref_key: "fileFieldRef",
              ref: _,
              type: qe.value,
              modelValue: ce.value,
              "onUpdate:modelValue": o[3] || (o[3] = (r) => ce.value = r),
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
            E.value ? (a(), v(K, ne(w({ key: 8 }, Ze.value)), null, 16)) : c("", !0),
            U.value ? (a(), C("div", St, [
              t.splitIcon ? (a(), C("i", {
                key: 0,
                class: De(t.splitIcon)
              }, null, 2)) : Ne.value ? (a(), v(Te(Ue.value), { key: 1 })) : c("", !0)
            ])) : c("", !0)
          ]),
          _: 3
        }, 16, ["name", "type", "disabled", "tabindex", "role"])),
        U.value && O.value ? (a(), v(z, w({
          key: 2,
          modelValue: M.value,
          "onUpdate:modelValue": o[4] || (o[4] = (r) => M.value = r)
        }, {
          referrer: O.value,
          ...t.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", t.splitClass]
        }), Ee({ _: 2 }, [
          Pe.value ? {
            name: "default",
            fn: Q(({ doClose: r }) => [
              (a(!0), C(Re, null, Ie(t.splitButtons, (V) => (a(), v(m, w({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              R(t.$slots, "split", {
                doClose: r,
                doRootClick: me
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : c("", !0),
        le.value && O.value ? (a(), v(z, w({
          key: 3,
          modelValue: y.value,
          "onUpdate:modelValue": o[5] || (o[5] = (r) => y.value = r)
        }, {
          referrer: O.value,
          ...t.tooltip
        }), Ee({ _: 2 }, [
          xe.value ? {
            name: "default",
            fn: Q(({ doClose: r }) => [
              (a(!0), C(Re, null, Ie(t.splitButtons, (V) => (a(), v(m, w({ ref_for: !0 }, V, { onClick: r }), null, 16, ["onClick"]))), 256)),
              R(t.$slots, "tooltip", {
                doClose: r,
                doRootClick: me
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : c("", !0)
      ], 34));
    };
  }
}), Mt = {
  install: (k) => {
    k.component("lkt-button") === void 0 && k.component("lkt-button", wt);
  }
}, Ft = (k) => {
  I.defaultSplitIcon = k;
};
export {
  It as debugLktButton,
  Mt as default,
  Ft as setDefaultButtonSplitSlot
};
