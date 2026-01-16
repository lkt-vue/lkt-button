import { defineComponent as tt, mergeDefaults as ot, useSlots as lt, ref as d, watch as A, computed as u, resolveComponent as V, createElementBlock as h, unref as H, openBlock as a, normalizeClass as X, renderSlot as O, createVNode as nt, normalizeProps as ae, guardReactiveProps as it, createBlock as y, createCommentVNode as f, mergeProps as w, withCtx as Y, resolveDynamicComponent as Te, withDirectives as ut, toDisplayString as at, withModifiers as Ie, vShow as rt, createSlots as Oe, Fragment as Ee, renderList as Me } from "vue";
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
}, gt = { key: 1 }, St = ["src", "alt"], Bt = ["src", "alt"], wt = {
  key: 3,
  class: "lkt-button--label"
}, Dt = {
  key: 9,
  class: "lkt-split-button-arrow"
}, Rt = /* @__PURE__ */ tt({
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
    const e = i, S = He, q = lt(), G = yt();
    let je = j(e.modalKey, e.prop);
    const se = "lkt-button-" + ct(), T = d(e.loading), D = d(null), $ = d(null), M = d(!1), k = d(e.openTooltip), fe = d(!1), b = d(!1), x = d(void 0), p = d(e.checked), de = d(void 0), _ = d(!1), ee = d(null), te = d(!1);
    A(() => e.openTooltip, (t) => k.value = t), A(k, (t) => S("update:openTooltip", t));
    const oe = u(() => {
      let t = [];
      return e.class && t.push(e.class), e.containerClass && t.push(e.containerClass), e.type === n.InvisibleWrapper || (U.value && t.push("lkt-split-button"), t.push(`lkt-button--${e.type}`), T.value && t.push("is-loading"), fe.value && t.push("is-active-route"), k.value && t.push("show-tooltip"), M.value && t.push("show-split"), p.value && t.push("is-checked"), me.value && t.push("is-disabled"), _.value && t.push("has-focus"), e.type === n.Menu && (t.push(`menu-target--${e.menuKey}`), xe.getMenuStatus(e.menuKey) && t.push("menu-opened"))), t.join(" ");
    }), R = u(() => {
      if (e.type === n.Switch || e.type === n.HiddenSwitch) {
        if (p.value && typeof e.textOn < "u") return re(e.textOn);
        if (!p.value && typeof e.textOff < "u") return re(e.textOff);
      }
      return re(e.text);
    }), v = u(() => {
      let t = e.icon;
      return (e.type === n.Switch || e.type === n.HiddenSwitch) && (p.value && typeof e.iconOn < "u" ? t = e.iconOn : !p.value && typeof e.iconOff < "u" && (t = e.iconOff)), j(t, e.prop);
    }), I = u(() => {
      if (typeof v.value == "object" && v.value.position === ce.End)
        return v.value;
      let t = e.iconEnd;
      return (e.type === n.Switch || e.type === n.HiddenSwitch) && (p.value && typeof e.iconOn < "u" ? t = e.iconEndOn : !p.value && typeof e.iconOff < "u" && (t = e.iconEndOff)), j(t, e.prop);
    }), J = u(() => typeof e.modal == "function" ? e.modal(e.prop) : j(e.modal, e.prop)), L = u(() => typeof e.modalData == "function" ? e.modalData(e.prop) : e.modalData), Le = u(() => typeof E.defaultSplitIcon < "u"), Ne = u(() => E.defaultSplitIcon), Ue = u(() => typeof e.dot == "boolean" ? "" : e.dot), C = (t, o = void 0) => {
      r("endClickMethod", t, o), Ge(), Je(t === null ? void 0 : t, o), S("click", t, o);
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
    }), N = async (t) => {
      var m;
      r("Resource Click", e.resource, le.value), T.value = !0, S("loading"), typeof ((m = e.events) == null ? void 0 : m.httpStart) == "function" && (r("Resource Click -> httpStart event"), e.events.httpStart());
      let o = { ...le.value, isChecked: p.value };
      return ft(e.resource, o).then((l) => {
        var g;
        T.value = !1, S("loaded"), r("Resource Click -> Received response", l), typeof ((g = e.events) == null ? void 0 : g.httpEnd) == "function" && (r("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: l
        })), C(t, l);
      }).catch((l) => {
        var g;
        T.value = !1, S("loaded"), r("Resource Click -> Received response error", l), typeof ((g = e.events) == null ? void 0 : g.httpEnd) == "function" && (r("Resource Click -> httpEnd event"), e.events.httpEnd({
          httpResponse: l
        })), C(t, l);
      });
    }, pe = d(!1), Ke = u(() => D.value ? e.type === n.TooltipLazy ? pe.value : e.type === n.TooltipEver ? k.value : e.type === n.Tooltip : !1), Pe = d(!1), ze = u(() => D.value ? e.type === n.SplitLazy ? Pe.value : e.type === n.SplitEver ? M.value : e.type === n.Split : !1), ve = (t) => {
      if (_.value = !0, te.value) {
        te.value = !1, S("focus");
        return;
      }
      S("focus", t);
    }, ye = (t) => {
      _.value = !1, S("blur", t);
    }, ne = u(() => e.type === n.Switch || e.type === n.HiddenSwitch), We = u(() => e.type === n.Switch), ie = u(() => e.type === n.FileUpload || e.type === n.ImageUpload), qe = u(() => e.type === n.ImageUpload ? Fe.Image : Fe.File), Ge = () => {
      e.modalCallbacks.forEach((t) => {
        vt(t);
      });
    }, Je = (t, o) => {
      var m;
      if (r("doConfigClick: ", e), typeof ((m = e.events) == null ? void 0 : m.click) == "function" && e.events.click({
        event: t,
        httpResponse: o
      }), e.dispatchHttpNotifications && (o != null && o.notifications) && Array.isArray(o == null ? void 0 : o.notifications) && ht(o.notifications), o != null && o.success) {
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
        } else if (typeof e.hooks.onSuccessRedirectTo < "u") {
          let l = e.hooks.onSuccessRedirectTo;
          typeof l == "function" && (l = l({
            event: t,
            httpResponse: o
          })), (typeof l == "object" || typeof l == "string") && (e.hooks.redirectType === "push" ? G.push(l) : G.replace(l));
        }
      }
    }, U = u(() => [
      n.Split,
      n.SplitLazy,
      n.SplitEver
    ].includes(e.type)), ue = u(() => [
      n.Tooltip,
      n.TooltipLazy,
      n.TooltipEver
    ].includes(e.type)), Q = (t) => {
      var o, m, l, g, K, P, z, s, F, Ce, ge, Se, Be, we;
      if (r("Click", e, t), t && (e.preventDefault && t.preventDefault(), e.stopPropagation && t.stopPropagation(), ne.value ? (o = t.target) != null && o.closest(".lkt-field.is-switch") || (p.value = !p.value) : ie.value ? ee.value && ((m = ee.value) == null || m.click()) : ue.value ? (k.value = !k.value, k.value && (pe.value = !0)) : U.value ? M.value = !M.value : e.type === n.Menu ? xe.toggleMenu(e.menuKey) : (e.type, n.Tab)), typeof e.clickRef < "u" && (e.clickRef instanceof Element || e.clickRef && e.clickRef && typeof e.clickRef == "function") && e.clickRef.click(), U.value || ue.value || ie.value) {
        C(t);
        return;
      }
      if (J.value) {
        let c = { ...L.value };
        r("Click -> has modal", e.modal, c), r("Click -> typeof beforeClose: ", typeof c.beforeClose), typeof c.beforeClose == "function" ? (c.beforeClose = (W) => {
          if (e.resource)
            return N(t).then(() => {
              typeof L.value.beforeClose == "function" && L.value.beforeClose(W);
            });
          typeof L.value.beforeClose == "function" && L.value.beforeClose(W), C(t);
        }, r("Click -> New beforeClose function: ", c.beforeClose)) : (c.beforeClose = () => {
          if (e.resource)
            return N(t);
          C(t);
        }, r("Click -> New beforeClose function: ", c.beforeClose));
        let B = J.value;
        return typeof J.value == "function" && (B = J.value()), dt(B, je, c);
      }
      if (e.confirmModal) {
        r("Click -> has confirm modal", e.confirmModal, e.confirmData), r("Click -> typeof confirmData.events?.click: ", typeof ((l = e.confirmData.events) == null ? void 0 : l.click));
        let c = { ...e.confirmData };
        if (c.confirmButton ? c.confirmButton = { ...Ae.defaultConfirmButton, ...c.confirmButton } : c.confirmButton = { ...Ae.defaultConfirmButton }, c.confirmButton.events || (c.confirmButton.events = {}), typeof ((K = (g = c.confirmButton) == null ? void 0 : g.events) == null ? void 0 : K.click) == "function") {
          let B = (z = (P = c.confirmButton) == null ? void 0 : P.events) == null ? void 0 : z.click;
          r("Click -> Has confirmData.events?.click function: ", B), c.confirmButton.events.click = () => {
            if (r("confirmData.events?.click -> Already: ", e), e.resource)
              return N(t).then(() => {
                B();
              });
            B(), C(t);
          }, r("Click -> New confirmData.events?.click function created: ", (F = (s = c.confirmButton) == null ? void 0 : s.events) == null ? void 0 : F.click);
        } else
          c.confirmButton.events.click = () => {
            var B, W, De, Re;
            if (r("confirmData.events?.click -> Created: ", e), e.resource)
              return N(t);
            if (((B = e.anchor) == null ? void 0 : B.to) !== "") {
              t && (t.preventDefault(), t.stopPropagation()), (W = e.anchor) != null && W.external || typeof ((De = e.anchor) == null ? void 0 : De.to) < "u" && G.push((Re = e.anchor) == null ? void 0 : Re.to);
              return;
            }
            C(t);
          }, r("Click -> New confirmData.events?.click function created: ", (Ce = c.confirmButton) == null ? void 0 : Ce.events.click);
        return pt(e.confirmModal, e.confirmModalKey, c);
      }
      if (e.resource)
        return r("Click -> has resource"), N(t);
      if (typeof ((ge = e.anchor) == null ? void 0 : ge.to) < "u" && ((Se = e.anchor) == null ? void 0 : Se.to) !== "") {
        r("Click -> Is Anchor", e.anchor), (Be = e.anchor) != null && Be.external ? typeof ((we = e.anchor) == null ? void 0 : we.to) == "string" && (window.location.href = e.anchor.to) : G.push(e.anchor.to), C(t);
        return;
      }
      if (ne.value) {
        r("Click -> Is Switch"), C(t);
        return;
      }
      r("Click -> Emit", e), C(t);
    };
    A(() => e.loading, () => T.value = e.loading), A(() => e.checked, () => p.value = e.checked), A(p, (t) => S("update:checked", t)), A(b, (t) => {
      b.value && e.showTooltipOnHover ? (x.value !== void 0 && clearTimeout(x.value), x.value = setTimeout(() => {
        k.value = !0, clearTimeout(x.value);
      }, e.showTooltipOnHoverDelay)) : !b.value && e.hideTooltipOnLeave ? (k.value = !1, clearTimeout(x.value)) : b.value || clearTimeout(x.value);
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
    }) : typeof e.disabled == "boolean" ? e.disabled : !1), ke = (t) => Q(t), Ye = (t) => fe.value = t, he = u(() => e.type === n.Anchor && typeof e.anchor == "object" && Object.keys(e.anchor).length > 0), be = u(() => typeof v.value == "string" ? {
      icon: v.value,
      dot: e.dot ? Ue.value : !1
    } : typeof v.value == "object" && v.value.position !== ce.End ? v.value : {}), Ze = u(() => typeof I.value == "string" && I.value !== "" ? {
      icon: I.value,
      class: "lkt-button-icon-end"
    } : typeof I.value == "object" && Object.keys(I.value).length > 0 ? {
      ...I.value,
      class: "lkt-button-icon-end"
    } : typeof v.value == "object" && v.value.position === ce.End ? {
      ...v.value,
      class: "lkt-button-icon-end"
    } : {}), $e = u(() => {
      if (he.value) {
        let t = {};
        return v.value && (t.icon = be.value), R.value && (t.text = R.value), {
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
      const m = V("lkt-button", !0), l = V("lkt-spinner"), g = V("lkt-anchor"), K = V("lkt-icon"), P = V("lkt-field"), z = V("lkt-tooltip");
      return i.type === H(n).InvisibleWrapper ? (a(), h("div", {
        key: 0,
        onClick: Q,
        onFocus: ve,
        onBlur: ye,
        onMousemove: o[0] || (o[0] = (s) => b.value = !0),
        onMouseleave: o[1] || (o[1] = (s) => b.value = !1),
        class: X(oe.value)
      }, [
        O(t.$slots, "default")
      ], 34)) : i.wrapButton ? (a(), h("div", gt, [
        nt(m, ae(it({
          ...e,
          wrapButton: !1
        })), null, 16)
      ])) : i.type === H(n).Anchor ? (a(), h("div", {
        key: 2,
        class: X(["lkt-button", oe.value]),
        ref_key: "container",
        ref: D,
        id: se,
        onMousemove: o[2] || (o[2] = (s) => b.value = !0),
        onMouseleave: o[3] || (o[3] = (s) => b.value = !1)
      }, [
        he.value ? (a(), y(g, w({ key: 0 }, $e.value, {
          class: "lkt-button-main",
          onActive: Ye
        }), {
          default: Y(() => [
            i.img ? (a(), h("img", {
              key: 0,
              src: i.img,
              alt: R.value
            }, null, 8, St)) : f("", !0),
            H(q).text ? O(t.$slots, "text", {
              key: 1,
              text: R.value
            }) : f("", !0),
            H(q).default ? O(t.$slots, "default", { key: 2 }) : f("", !0),
            T.value ? (a(), y(l, { key: 3 })) : f("", !0)
          ]),
          _: 3
        }, 16)) : f("", !0)
      ], 34)) : (a(), h("div", {
        key: 3,
        class: X(["lkt-button", oe.value]),
        ref_key: "container",
        ref: D,
        id: se,
        onMousemove: o[8] || (o[8] = (s) => b.value = !0),
        onMouseleave: o[9] || (o[9] = (s) => b.value = !1)
      }, [
        (a(), y(Te(Qe.value), w({
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
            v.value ? (a(), y(K, ae(w({ key: 0 }, be.value)), null, 16)) : f("", !0),
            i.img ? (a(), h("img", {
              key: 1,
              src: i.img,
              alt: R.value
            }, null, 8, Bt)) : f("", !0),
            H(q).text ? O(t.$slots, "text", {
              key: 2,
              text: R.value
            }) : R.value ? (a(), h("span", wt, at(R.value), 1)) : f("", !0),
            H(q).default ? O(t.$slots, "default", { key: 4 }) : f("", !0),
            T.value ? (a(), y(l, { key: 5 })) : f("", !0),
            ne.value ? ut((a(), y(P, {
              key: 6,
              type: "switch",
              modelValue: p.value,
              "onUpdate:modelValue": o[4] || (o[4] = (s) => p.value = s),
              disabled: i.disabled,
              onClick: Ie(() => {
              }, ["stop"])
            }, null, 8, ["modelValue", "disabled"])), [
              [rt, We.value]
            ]) : f("", !0),
            ie.value ? (a(), y(P, w({
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
            }), null, 16, ["type", "modelValue", "disabled"])) : f("", !0),
            I.value ? (a(), y(K, ae(w({ key: 8 }, Ze.value)), null, 16)) : f("", !0),
            U.value ? (a(), h("div", Dt, [
              i.splitIcon ? (a(), h("i", {
                key: 0,
                class: X(i.splitIcon)
              }, null, 2)) : Le.value ? (a(), y(Te(Ne.value), { key: 1 })) : f("", !0)
            ])) : f("", !0)
          ]),
          _: 3
        }, 16, ["name", "type", "disabled", "tabindex", "role"])),
        U.value && D.value ? (a(), y(z, w({
          key: 0,
          modelValue: M.value,
          "onUpdate:modelValue": o[6] || (o[6] = (s) => M.value = s)
        }, {
          referrer: D.value,
          ...i.tooltip
        }, {
          class: ["lkt-split-button-dropdown-content", i.splitClass]
        }), Oe({ _: 2 }, [
          ze.value ? {
            name: "default",
            fn: Y(({ doClose: s }) => [
              (a(!0), h(Ee, null, Me(i.splitButtons, (F) => (a(), y(m, w({ ref_for: !0 }, F, { onClick: s }), null, 16, ["onClick"]))), 256)),
              O(t.$slots, "split", {
                doClose: s,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "class"])) : f("", !0),
        ue.value && D.value ? (a(), y(z, w({
          key: 1,
          modelValue: k.value,
          "onUpdate:modelValue": o[7] || (o[7] = (s) => k.value = s)
        }, {
          referrer: D.value,
          ...i.tooltip
        }), Oe({ _: 2 }, [
          Ke.value ? {
            name: "default",
            fn: Y(({ doClose: s }) => [
              (a(!0), h(Ee, null, Me(i.splitButtons, (F) => (a(), y(m, w({ ref_for: !0 }, F, { onClick: s }), null, 16, ["onClick"]))), 256)),
              O(t.$slots, "tooltip", {
                doClose: s,
                doRootClick: ke
              })
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue"])) : f("", !0)
      ], 34));
    };
  }
}), At = {
  install: (i) => {
    i.component("lkt-button") === void 0 && i.component("lkt-button", Rt);
  }
}, Vt = (i) => {
  E.defaultSplitIcon = i;
};
export {
  Ft as debugLktButton,
  At as default,
  Vt as setDefaultButtonSplitSlot
};
