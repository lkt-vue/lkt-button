import { defineComponent as tt, mergeDefaults as ot, useSlots as lt, ref as p, watch as A, computed as u, resolveComponent as V, createElementBlock as b, unref as H, openBlock as a, normalizeClass as X, renderSlot as O, createVNode as nt, normalizeProps as ae, guardReactiveProps as it, createBlock as m, createCommentVNode as d, mergeProps as R, withCtx as Y, resolveDynamicComponent as Te, withDirectives as ut, toDisplayString as at, withModifiers as Ie, vShow as rt, createSlots as Oe, Fragment as Ee, renderList as Me } from "vue";
import { generateRandomString as ct, ucfirst as st } from "lkt-string-tools";
import { httpCall as ft } from "lkt-http-client";
import { openModal as dt, openConfirm as pt, runModalCallback as vt } from "lkt-modal";
import { useRouter as yt } from "vue-router";
import { extractPropValue as j, ButtonType as n, MenuController as xe, extractI18nValue as re, IconPosition as ce, FieldType as Fe, getDefaultValues as mt, Button as kt, LktSettings as Ae, dispatchHttpNotifications as ht, refreshAppI18n as bt, refreshAppSetup as Ct } from "lkt-vue-kernel";
const Z = class Z {
};
Z.debugEnabled = !1, Z.defaultSplitIcon = void 0;
let E = Z;
const Ft = (i = !0) => {
  E.debugEnabled = i;
}, r = (...i) => {
  E.debugEnabled && console.info("[LktButton] ", ...i);
}, St = { key: 1 }, gt = ["src", "alt"], Bt = ["src", "alt"], Rt = {
  key: 3,
  class: "lkt-button--label"
}, wt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, Dt = /* @__PURE__ */ tt({
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
    events: {},
    preventDefault: { type: Boolean },
    stopPropagation: { type: Boolean },
    dispatchHttpNotifications: { type: Boolean },
    hooks: {}
  }, mt(kt)),
  emits: [
    "click",
    "focus",
    "blur",
    "loading",
    "loaded",
    "update:checked",
    "update:openTooltip"
  ],
  setup(i, { expose: Ve, emit: He }) {
    const e = i, g = He, G = lt(), L = yt();
    let je = j(e.modalKey, e.prop);
    const se = "lkt-button-" + ct(), T = p(e.loading), w = p(null), $ = p(null), M = p(!1), h = p(e.openTooltip), fe = p(!1), C = p(!1), x = p(void 0), v = p(e.checked), de = p(void 0), _ = p(!1), ee = p(null), te = p(!1);
    A(() => e.openTooltip, (t) => h.value = t), A(h, (t) => g("update:openTooltip", t));
    const oe = u(() => {
      let t = [];
      return e.class && t.push(e.class), e.containerClass && t.push(e.containerClass), e.type === n.InvisibleWrapper || (K.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), T.value && t.push("is-loading"), fe.value && t.push("is-active-route"), h.value && t.push("show-tooltip"), M.value && t.push("show-split"), v.value && t.push("is-checked"), me.value && t.push("is-disabled"), _.value && t.push("has-focus"), e.type === n.Menu && (t.push(`menu-target--${e.menuKey}`), xe.getMenuStatus(e.menuKey) && t.push("menu-opened"))), t.join(" ");
    }), D = u(() => {
      if (e.type === n.Switch || e.type === n.HiddenSwitch) {
        if (v.value && typeof e.textOn < "u") return re(e.textOn);
        if (!v.value && typeof e.textOff < "u") return re(e.textOff);
      }
      return re(e.text);
    }), y = u(() => {
      let t = e.icon;
      return (e.type === n.Switch || e.type === n.HiddenSwitch) && (v.value && typeof e.iconOn < "u" ? t = e.iconOn : !v.value && typeof e.iconOff < "u" && (t = e.iconOff)), j(t, e.prop);
    }), I = u(() => {
      if (typeof y.value == "object" && y.value.position === ce.End)
        return y.value;
      let t = e.iconEnd;
      return (e.type === n.Switch || e.type === n.HiddenSwitch) && (v.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !v.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), j(t, e.prop);
    }), J = u(() => typeof e.modal == "function" ? e.modal(e.prop) : j(e.modal, e.prop)), N = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Le = u(() => typeof E.defaultSplitIcon < "u"), Ne = u(() => E.defaultSplitIcon), Ue = u(() => typeof e.dot == "boolean" ? "" : e.dot), S = (t, o = void 0) => {
      r("endClickMethod", t, o), Ge(), Je(t === null ? void 0 : t, o), g("click", t, o);
    }, le = u(() => {
      if (typeof e.resourceData == "function") return e.resourceData(e.prop);
      if (typeof e.resourceData == "string") return j(e.resourceData, e.prop);
      if (typeof e.resourceData == "object" && !Array.isArray(e.resourceData)) {
        let t = {};
        for (let o in e.resourceData)
          t[o] = j(e.resourceData[o], e.prop);
        return t;
      }
      return e.resourceData;
    }), U = async (t) => {
      var k;
      r("Resource Click", e.resource, le.value), T.value = !0, g("loading"), typeof ((k = e.events) == null ? void 0 : k.httpStart) == "function" && (r("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...le.value, isChecked: v.value };
      return ft(e.resource, o).then((l) => {
        var f;
        T.value = !1, g("loaded"), r("Resource Click -> Received response", l), typeof ((f = e.events) == null ? void 0 : f.httpEnd) == "function" && (r("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: l
        })), S(t, l);
      }).catch((l) => {
        var f;
        T.value = !1, g("loaded"), r("Resource Click -> Received response error", l), typeof ((f = e.events) == null ? void 0 : f.httpEnd) == "function" && (r("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: l
        })), S(t, l);
      });
    }, pe = p(!1), Ke = u(() => w.value ? e.type === n.TooltipLazy ? pe.value : e.type === n.TooltipEver ? h.value : e.type === n.Tooltip : !1), Pe = p(!1), ze = u(() => w.value ? e.type === n.SplitLazy ? Pe.value : e.type === n.SplitEver ? M.value : e.type === n.Split : !1), ve = (t) => {
      if (_.value = !0, te.value) {
        te.value = !1, g("focus");
        return;
      }
      g("focus", t);
    }, ye = (t) => {
      _.value = !1, g("blur", t);
    }, ne = u(() => e.type === n.Switch || e.type === n.HiddenSwitch), We = u(() => e.type === n.Switch), ie = u(() => e.type === n.FileUpload || e.type === n.ImageUpload), qe = u(() => e.type === n.ImageUpload ? Fe.Image : Fe.File), Ge = () => {
      e.modalCallbacks.forEach((t) => {
        vt(t);
      });
    }, Je = (t, o) => {
      var k;
      if (r("doConfigClick: ", e), typeof ((k = e.events) == null ? void 0 : k.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      }), e.dispatchHttpNotifications && (o != null && o.notifications) && Array.isArray(o == null ? void 0 : o.notifications) && ht(o.notifications), typeof o > "u" || o != null && o.success) {
        if (typeof e.hooks.onSuccessRefreshI18n < "u") {
          let l = e.hooks.onSuccessRefreshI18n;
          typeof l == "function" && (l = l({
            event: t,
            httpResponse: o
          })), l && bt();
        }
        if (typeof e.hooks.onSuccessRefreshSetup < "u") {
          let l = e.hooks.onSuccessRefreshSetup;
          typeof l == "function" && (l = l({
            event: t,
            httpResponse: o
          })), l && Ct();
        }
        if (typeof e.hooks.onSuccessReload < "u") {
          let l = e.hooks.onSuccessReload;
          typeof l == "function" && (l = l({
            event: t,
            httpResponse: o
          })), l && window.location.reload();
        } else {
          let l, f;
          typeof e.hooks.onSuccessRedirectTo < "u" && (l = e.hooks.onSuccessRedirectTo, typeof l == "function" && (l = l({
            event: t,
            httpResponse: o
          }))), typeof e.hooks.onSuccessRedirectBack < "u" && (f = e.hooks.onSuccessRedirectBack, typeof f == "function" && (f = f({
            event: t,
            httpResponse: o
          }))), typeof f == "boolean" && f === !0 ? L.back() : (typeof l == "object" || typeof l == "string") && (e.hooks.redirectType === "push" ? L.push(l) : L.replace(l));
        }
      }
    }, K = u(() => [
      n.Split,
      n.SplitLazy,
      n.SplitEver
    ].includes(e.type)), ue = u(() => [
      n.Tooltip,
      n.TooltipLazy,
      n.TooltipEver
    ].includes(e.type)), Q = (t) => {
      var o, k, l, f, P, z, W, s, F, Ce, Se, ge, Be, Re;
      if (r("Click", e, t), t && (e.preventDefault && t.preventDefault(), e.stopPropagation && t.stopPropagation(), ne.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (v.value = !v.value) : ie.value ? ee.value && ((k = ee.value) == null || k.click()) : ue.value ? (h.value = !h.value, h.value && (pe.value = !0)) : K.value ? M.value = !M.value : e.type === n.Menu ? xe.toggleMenu(e.menuKey) : (e.type, n.Tab)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), K.value || ue.value || ie.value) {
        S(t);
        return;
      }
      if (J.value) {
        let c = { ...N.value };
        r("Click -> has modal", e.modal, c), r("Click -> typeof beforeClose: ", typeof c.beforeClose), typeof c.beforeClose == "function" ? (c.beforeClose = (q) => {
          if (e.resource)
            return U(t).then(() => {
              typeof N.value.beforeClose == "function" && N.value.beforeClose(q);
            });
          typeof N.value.beforeClose == "function" && N.value.beforeClose(q), S(t);
        }, r("Click -> New beforeClose function: ", c.beforeClose)) : (c.beforeClose = () => {
          if (e.resource)
            return U(t);
          S(t);
        }, r("Click -> New beforeClose function: ", c.beforeClose));
        let B = J.value;
        return typeof J.value == "function" && (B = J.value()), dt(B, je, c);
      }
      if (e.confirmModal) {
        r("Click -> has confirm modal", e.confirmModal, e.confirmData), r("Click -> typeof confirmData.events?.click: ", typeof ((l = e.confirmData.events) == null ? void 0 : l.click));
        let c = { ...e.confirmData };
        if (c.confirmButton ? c.confirmButton = { ...Ae.defaultConfirmButton, ...c.confirmButton } : c.confirmButton = { ...Ae.defaultConfirmButton }, c.confirmButton.events || (c.confirmButton.events = {}), typeof ((P = (f = c.confirmButton) == null ? void 0 : f.events) == null ? void 0 : P.click) == "function") {
          let B = (W = (z = c.confirmButton) == null ? void 0 : z.events) == null ? void 0 : W.click;
          r("Click -> Has confirmData.events?.click function: ", B), c.confirmButton.events.click = () => {
            if (r("confirmData.events?.click -> Already: ", e), e.resource)
              return U(t).then(() => {
                B();
              });
            B(), S(t);
          }, r("Click -> New confirmData.events?.click function created: ", (F = (s = c.confirmButton) == null ? void 0 : s.events) == null ? void 0 : F.click);
        } else
          c.confirmButton.events.click = () => {
            var B, q, we, De;
            if (r("confirmData.events?.click -> Created: ", e), e.resource)
              return U(t);
            if (((B = e.anchor) == null ? void 0 : B.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (q = e.anchor) != null && q.external || typeof ((we = e.anchor) == null ? void 0 : we.to) < "u" && L.push((De = e.anchor) == null ? void 0 : De.to);
              return;
            }
            S(t);
          }, r("Click -> New confirmData.events?.click function created: ", (Ce = c.confirmButton) == null ? void 0 : Ce.events.click);
        return pt(e.confirmModal, e.confirmModalKey, c);
      }
      if (e.resource)
        return r("Click -> has resource"), U(t);
      if (typeof ((Se = e.anchor) == null ? void 0 : Se.to) < "u" && ((ge = e.anchor) == null ? void 0 : ge.to) !== "") {
        r("Click -> Is Anchor", e.anchor), (Be = e.anchor) != null && Be.external ? typeof ((Re = e.anchor) == null ? void 0 : Re.to) == "string" && (window.location.href = e.anchor.to) : L.push(e.anchor.to), S(t);
        return;
      }
      if (ne.value) {
        r("Click -> Is Switch"), S(t);
        return;
      }
      r("Click -> Emit", e), S(t);
    };
    A(() => e.loading, () => T.value = e.loading), A(() => e.checked, () => v.value = e.checked), A(v, (t) => g("update:checked", t)), A(C, (t) => {
      C.value && e.showTooltipOnHover ? (x.value !== void 0 && clearTimeout(x.value), x.value = setTimeout(() => {
        h.value = !0, clearTimeout(x.value);
      }, e.showTooltipOnHoverDelay)) : !C.value && e.hideTooltipOnLeave ? (h.value = !1, clearTimeout(x.value)) : C.value || clearTimeout(x.value);
    }), Ve({
      click: () => Q(null),
      focus: (t) => {
        $.value && (t && (te.value = !0), $.value.focus());
      }
    });
    const Qe = u(() => e.type === n.Content ? "div" : "button"), Xe = u(() => {
      switch (e.type) {
        case n.Button:
        case n.Submit:
          return e.type;
        default:
          return "button";
      }
    }), me = u(() => e.disabled === void 0 ? !1 : typeof e.disabled == "function" ? e.disabled({
      prop: e.prop
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ke = (t) => Q(t), Ye = (t) => fe.value = t, he = u(() => e.type === n.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), be = u(() => typeof y.value == "string" ? {
      icon: y.value,
      dot: e.dot ? Ue.value : !1
    } : typeof y.value == "object" && y.value.position !== ce.End ? y.value : {}), Ze = u(() => typeof I.value == "string" && I.value !== "" ? {
      icon: I.value,
      class: "lkt-button-icon-end"
    } : typeof I.value == "object" && Object.keys(I.value).length > 0 ? {
      ...I.value,
      class: "lkt-button-icon-end"
    } : typeof y.value == "object" && y.value.position === ce.End ? {
      ...y.value,
      class: "lkt-button-icon-end"
    } : {}), $e = u(() => {
      if (he.value) {
        let t = {};
        return y.value && (t.icon = be.value), D.value && (t.text = D.value), {
          ...e.anchor,
          ...t,
          prop: e.prop,
          disabled: e.anchor.disabled ?? e.disabled
        };
      }
      return {};
    }), _e = u(() => {
      if (e.type === n.Tab) return "tab";
    }), et = u(() => {
      let t = {};
      return typeof e.aria != "object" || Object.keys(e.aria).forEach((o) => {
        t[`aria${st(o)}`] = e.aria[o];
      }), t;
    });
    return (t, o) => {
      const k = V("lkt-button", !0), l = V("lkt-spinner"), f = V("lkt-anchor"), P = V("lkt-icon"), z = V("lkt-field"), W = V("lkt-tooltip");
      return i.type === H(n).InvisibleWrapper ? (a(), b("div", {
        key: 0,
        onClick: Q,
        onFocus: ve,
        onBlur: ye,
        onMousemove: o[0] || (o[0] = (s) => C.value = !0),
        onMouseleave: o[1] || (o[1] = (s) => C.value = !1),
        class: X(oe.value)
      }, [
        O(t.$slots, "default")
      ], 34)) : i.wrapButton ? (a(), b("div", St, [
        nt(k, ae(it({
          ...e,
          wrapButton: !1
        })), null, 16)
      ])) : i.type === H(n).Anchor ? (a(), b("div", {
        key: 2,
        class: X(["lkt-button", oe.value]),
        ref_key: "container",
        ref: w,
        id: se,
        onMousemove: o[2] || (o[2] = (s) => C.value = !0),
        onMouseleave: o[3] || (o[3] = (s) => C.value = !1)
      }, [
        he.value ? (a(), m(f, R({ key: 0 }, $e.value, {
          class: "lkt-button-main",
          onActive: Ye
        }), {
          default: Y(() => [
            i.img ? (a(), b("img", {
              key: 0,
              src: i.img,
              alt: D.value
            }, null, 8, gt)) : d("", !0),
            H(G).text ? O(t.$slots, "text", {
              key: 1,
              text: D.value
            }) : d("", !0),
            H(G).default ? O(t.$slots, "default", { key: 2 }) : d("", !0),
            T.value ? (a(), m(l, { key: 3 })) : d("", !0)
          ]),
          _: 3
        }, 16)) : d("", !0)
      ], 34)) : (a(), b("div", {
        key: 3,
        class: X(["lkt-button", oe.value]),
        ref_key: "container",
        ref: w,
        id: se,
        onMousemove: o[8] || (o[8] = (s) => C.value = !0),
        onMouseleave: o[9] || (o[9] = (s) => C.value = !1)
      }, [
        (a(), m(Te(Qe.value), R({
          class: "lkt-button-main",
          ref_key: "button",
          ref: $,
          name: i.name,
          type: Xe.value,
          disabled: me.value,
          tabindex: i.tabindex,
          role: _e.value
        }, et.value, {
          onClick: Q,
          onFocus: ve,
          onBlur: ye
        }), {
          default: Y(() => [
            y.value ? (a(), m(P, ae(R({ key: 0 }, be.value)), null, 16)) : d("", !0),
            i.img ? (a(), b("img", {
              key: 1,
              src: i.img,
              alt: D.value
            }, null, 8, Bt)) : d("", !0),
            H(G).text ? O(t.$slots, "text", {
              key: 2,
              text: D.value
            }) : D.value ? (a(), b("span", Rt, at(D.value), 1)) : d("", !0),
            H(G).default ? O(t.$slots, "default", { key: 4 }) : d("", !0),
            T.value ? (a(), m(l, { key: 5 })) : d("", !0),
            ne.value ? ut((a(), m(z, {
              key: 6,
              type: "switch",
              modelValue: v.value,
              "onUpdate:modelValue": o[4] || (o[4] = (s) => v.value = s),
              disabled: i.disabled,
              onClick: Ie(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [rt, We.value]
            ]) : d("", !0),
            ie.value ? (a(), m(z, R({
              key: 7,
              ref_key: "fileFieldRef",
              ref: ee,
              type: qe.value,
              modelValue: de.value,
              "onUpdate:modelValue": o[5] || (o[5] = (s) => de.value = s),
              hidden: ""
            }, {
              fileUploadHttp: {
                resource: i.resource,
                data: le.value
              }
            }, {
              disabled: i.disabled,
              onClick: Ie(() => {
              }, ["stop"])
            }), null, 16, ["type", "modelValue", "disabled"])) : d("", !0),
            I.value ? (a(), m(P, ae(R({ key: 8 }, Ze.value)), null, 16)) : d("", !0),
            K.value ? (a(), b("div", wt, [
              i.splitIcon ? (a(), b("i", {
                key: 0,
                class: X(i.splitIcon)
              }, null, 2)) : Le.value ? (a(), m(Te(Ne.value), { key: 1 })) : d("", !0)
            ])) : d("", !0)
          ]),
          _: 3
        }, 16, ["name", "type", "disabled", "tabindex", "role"])),
        K.value && w.value ? (a(), m(W, R({
          key: 0,
          modelValue: M.value,
          "onUpdate:modelValue": o[6] || (o[6] = (s) => M.value = s)
        }, {
          referrer: w.value,
          ...i.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", i.splitClass]
        }), Oe({ _: 2 }, [
          ze.value ? {
            name: "default",
            fn: Y(({ doClose: s }) => [
              (a(!0), b(Ee, null, Me(i.splitButtons, (F) => (a(), m(k, R({ ref_for: !0 }, F, { onClick: s }), null, 16, ["onClick"]))), 256)),
              O(t.$slots, "split", {
                doClose: s,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : d("", !0),
        ue.value && w.value ? (a(), m(W, R({
          key: 1,
          modelValue: h.value,
          "onUpdate:modelValue": o[7] || (o[7] = (s) => h.value = s)
        }, {
          referrer: w.value,
          ...i.tooltip
        }), Oe({ _: 2 }, [
          Ke.value ? {
            name: "default",
            fn: Y(({ doClose: s }) => [
              (a(!0), b(Ee, null, Me(i.splitButtons, (F) => (a(), m(k, R({ ref_for: !0 }, F, { onClick: s }), null, 16, ["onClick"]))), 256)),
              O(t.$slots, "tooltip", {
                doClose: s,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : d("", !0)
      ], 34));
    };
  }
}), At = {
  install: (i) => {
    i.component("lkt-button") === void 0 && i.component("lkt-button", Dt);
  }
}, Vt = (i) => {
  E.defaultSplitIcon = i;
};
export {
  Ft as debugLktButton,
  At as default,
  Vt as setDefaultButtonSplitSlot
};
