import { R as React2, j as jsxRuntimeExports, r as reactExports, a as useParams, u as useNavigate } from "./index-DlHngFV9.js";
import { B as Badge } from "./badge-CRLOndo5.js";
import { c as createLucideIcon, u as useComposedRefs, a as cn, g as useGetProject, L as Layout, B as Button, Z as Zap } from "./useProjects-D9WOPPD3.js";
import { T as TriangleAlert, S as Skeleton } from "./skeleton-Cpso_Col.js";
import { h as createContextScope, i as createSlot, e as useId, P as Primitive, c as composeEventHandlers, b as useControllableState, u as useCallbackRef, g as Presence } from "./index-CbZBj_05.js";
import { C as ComplianceBadge } from "./ComplianceBadge-C2AFKqUS.js";
import { C as CircleCheck } from "./circle-check-Dq2fdYZ5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]
];
const Coins = createLucideIcon("coins", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React2.useRef(null);
    const itemMap = React2.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React2.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React2.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React2.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function NormaTag({ reference }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      "data-ocid": "norma.tag",
      className: "inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-secondary/60 border border-border rounded-sm px-1.5 py-0.5 tracking-wide",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📋" }),
        reference
      ]
    }
  );
}
function FormulaCard({
  step,
  defaultExpanded = false
}) {
  const [expanded, setExpanded] = reactExports.useState(defaultExpanded);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-sm bg-card overflow-hidden transition-smooth",
      "data-ocid": "formula.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "formula.toggle",
            onClick: () => setExpanded((v) => !v),
            className: "w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-secondary/40 transition-colors duration-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold font-display text-foreground truncate", children: step.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-accent font-bold flex-shrink-0", children: [
                  step.result % 1 === 0 ? step.result.toFixed(0) : step.result.toFixed(3),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: step.unit })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0 ml-2", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }) })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-3 py-3 flex flex-col gap-2.5 bg-secondary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-1", children: "Expresión" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "formula-code block w-full", children: step.expression })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-1", children: "Sustitución" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "formula-code block w-full text-foreground/80", children: step.substitution })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label", children: "Resultado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold font-mono text-accent", children: [
              step.result % 1 === 0 ? step.result.toFixed(2) : step.result.toFixed(4),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: step.unit })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NormaTag, { reference: step.nb777Ref }) })
        ] })
      ]
    }
  );
}
function fmt(n, d = 2) {
  return n.toFixed(d);
}
const CIRCUIT_TYPE_MAP = {
  lighting: "Iluminación",
  common: "Tomas",
  power: "Fuerza"
};
function CircuitTypeBadge({ type }) {
  const label = CIRCUIT_TYPE_MAP[type] ?? String(type);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] font-mono", children: label });
}
function SummaryPill({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-sm font-mono font-bold ${accent ? "text-accent" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function InfoCard({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold font-display text-foreground", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3", children })
  ] });
}
function DataRow({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1.5 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-xs font-mono font-semibold ${accent ? "text-accent" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function FormulaList({
  steps,
  label
}) {
  if (!steps.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label mb-1", children: label }),
    steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormulaCard, { step: s }, `${s.name}-${i}`))
  ] });
}
function CircuitCard({
  circuit,
  index
}) {
  const [open, setOpen] = reactExports.useState(false);
  const complies = circuit.compliesNB777;
  const hasWarnings = circuit.warnings.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-sm bg-card overflow-hidden",
      "data-ocid": `circuit.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 border-b border-border bg-secondary/20 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircuitTypeBadge, { type: circuit.circuitType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold font-display text-foreground truncate", children: circuit.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComplianceBadge, { complies, size: "sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 grid grid-cols-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryPill,
            {
              label: "I nominal",
              value: `${fmt(circuit.nominalCurrentA)} A`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryPill,
            {
              label: "I corregida",
              value: `${fmt(circuit.correctedCurrentA)} A`,
              accent: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryPill,
            {
              label: "Cable",
              value: `${circuit.cableSectionMm2} mm²`,
              accent: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryPill, { label: "ITM", value: `${Number(circuit.itmAmperes)} A` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryPill,
            {
              label: "ΔV%",
              value: `${fmt(circuit.voltageDropPct)} %`,
              accent: circuit.voltageDropPct > 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryPill,
            {
              label: "Carga",
              value: `${fmt(circuit.totalPowerVA, 0)} VA`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryPill, { label: "Puntos", value: String(Number(circuit.points)) })
        ] }),
        (!complies || hasWarnings) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 flex flex-col gap-1", children: circuit.warnings.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "compliance-warning text-xs text-destructive flex items-start gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: w })
            ]
          },
          w
        )) }),
        circuit.formulaSteps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `circuit.toggle.${index + 1}`,
              onClick: () => setOpen((v) => !v),
              className: "w-full flex items-center justify-between px-3 py-2 border-t border-border text-xs text-muted-foreground hover:bg-secondary/30 transition-colors duration-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "Ver cálculos" }),
                open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
              ]
            }
          ),
          open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 flex flex-col gap-1.5 bg-secondary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormulaList, { steps: circuit.formulaSteps }) })
        ] })
      ]
    }
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "results.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl animate-pulse", children: "⚡" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Calculando según NB 777..." })
    ] }),
    [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-sm" }, i))
  ] });
}
function ResultsPage() {
  const { projectId } = useParams({ from: "/proyecto/$projectId/resultados" });
  const navigate = useNavigate();
  const { data: project, isLoading } = useGetProject(projectId);
  const result = project == null ? void 0 : project.result;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Layout,
      {
        showBack: true,
        backTo: `/proyecto/${projectId}`,
        backLabel: "Editar datos",
        headerSubtitle: "Resultados NB 777",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {})
      }
    );
  }
  if (!result) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Layout,
      {
        showBack: true,
        backTo: `/proyecto/${projectId}`,
        backLabel: "Editar datos",
        headerSubtitle: "Resultados NB 777",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-5 py-16 text-center",
            "data-ocid": "results.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "📐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Sin resultados calculados" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No hay resultados. Vuelve al formulario y calcula." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  "data-ocid": "results.back_button",
                  onClick: () => navigate({ to: `/proyecto/${projectId}` }),
                  children: "← Ir al formulario"
                }
              )
            ]
          }
        )
      }
    );
  }
  const energy = result.energyEstimate;
  const fpComp = result.powerFactorCompensation;
  const transformer = result.transformer;
  const overallComplies = result.globalWarnings.length === 0 && result.circuits.every((c) => c.compliesNB777);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      showBack: true,
      backTo: `/proyecto/${projectId}`,
      backLabel: "Editar datos",
      headerSubtitle: (project == null ? void 0 : project.name) ?? "Resultados NB 777",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: overallComplies ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "compliance-success flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              className: "w-4 h-4 flex-shrink-0",
              style: { color: "oklch(0.6 0.16 150)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-semibold font-mono",
              style: { color: "oklch(0.6 0.16 150)" },
              children: "Instalación cumple todos los requisitos NB 777"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "compliance-warning flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 flex-shrink-0 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold font-mono text-destructive", children: "Se detectaron incumplimientos — revisar advertencias" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "resumen", "data-ocid": "results.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-5 mb-4 h-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "resumen",
                className: "text-[10px] px-1 py-1.5 flex flex-col gap-0.5",
                "data-ocid": "results.tab.resumen",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Resumen" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "circuitos",
                className: "text-[10px] px-1 py-1.5 flex flex-col gap-0.5",
                "data-ocid": "results.tab.circuitos",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Circuitos" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "fp",
                className: "text-[10px] px-1 py-1.5 flex flex-col gap-0.5",
                "data-ocid": "results.tab.fp",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "cos φ" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "trafo",
                className: "text-[10px] px-1 py-1.5 flex flex-col gap-0.5",
                "data-ocid": "results.tab.trafo",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trafo" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "costos",
                className: "text-[10px] px-1 py-1.5 flex flex-col gap-0.5",
                "data-ocid": "results.tab.costos",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Costos" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "resumen", className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Potencias y Demanda", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Potencia Instalada Total",
                  value: `${fmt(result.totalInstalledPowerVA, 1)} VA`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Factor de Temperatura",
                  value: fmt(result.temperatureFactor, 3)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Factor de Agrupamiento",
                  value: fmt(result.groupingFactor, 3)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Demanda Máxima NB 777",
                  value: `${fmt(result.maxDemandVA, 1)} VA`,
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FormulaList,
                {
                  steps: result.demandFormulaSteps,
                  label: "Pasos de cálculo — Demanda"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Corriente Principal", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Corriente de Línea",
                  value: `${fmt(result.lineCurrentA, 2)} A`,
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormulaList, { steps: [], label: "Pasos de cálculo — Corriente" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Corriente de Cortocircuito", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "I cc (Icc)",
                  value: `${fmt(result.shortCircuitCurrentA / 1e3, 3)} kA`,
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FormulaList,
                {
                  steps: result.shortCircuitFormulaSteps,
                  label: "Pasos de cálculo — Cortocircuito"
                }
              )
            ] }),
            result.globalWarnings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { title: "Advertencias Normativas", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: result.globalWarnings.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "compliance-warning text-xs text-destructive flex items-start gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: w })
                ]
              },
              w
            )) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "circuitos", className: "flex flex-col gap-3", children: result.circuits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col items-center gap-3 py-10 text-center",
              "data-ocid": "circuitos.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No hay circuitos derivados calculados." })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: result.circuits.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CircuitCard, { circuit: c, index: i }, c.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "fp", className: "flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { title: "Compensación de Factor de Potencia", children: fpComp.needed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 compliance-warning flex items-start gap-2 text-xs text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "cos φ < 0.95 — Compensación requerida por NB 777 Art. 8.3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Potencia Reactiva a Compensar",
                  value: `${fmt(fpComp.reactiveKVAR, 3)} kVAR`,
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Banco de capacitores sugerido",
                  value: `${fmt(fpComp.suggestedBankKVAR, 2)} kVAR`,
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DataRow,
                {
                  label: "Capacitor",
                  value: `${fmt(fpComp.capacitorMicroFarads, 2)} µF`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormulaList,
              {
                steps: fpComp.formulaSteps,
                label: "Pasos de cálculo — Compensación"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 compliance-success flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleCheck,
              {
                className: "w-4 h-4 flex-shrink-0",
                style: { color: "oklch(0.6 0.16 150)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-mono font-semibold",
                style: { color: "oklch(0.6 0.16 150)" },
                children: "cos φ ≥ 0.95 — No requiere compensación"
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "trafo", className: "flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { title: "Dimensionamiento del Transformador", children: transformer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Potencia requerida",
                value: `${fmt(transformer.requiredKVA, 2)} kVA`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Potencia nominal seleccionada",
                value: `${fmt(transformer.selectedKVA, 0)} kVA`,
                accent: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Corriente primaria",
                value: `${fmt(transformer.primaryCurrentA, 2)} A`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Corriente secundaria",
                value: `${fmt(transformer.secondaryCurrentA, 2)} A`
              }
            ),
            transformer.isExistingAdequate !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ComplianceBadge,
              {
                complies: transformer.isExistingAdequate,
                label: transformer.isExistingAdequate ? "Transformador existente: Adecuado" : "Transformador existente: Insuficiente"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormulaList,
              {
                steps: transformer.formulaSteps,
                label: "Pasos de cálculo — Transformador"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "No aplica transformador en esta instalación." }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "costos", className: "flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Estimación de Consumo Energético", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Horas de uso diario asumidas",
                value: `${energy.dailyUsageHours} h/día`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Energía diaria",
                value: `${fmt(energy.dailyKWh, 2)} kWh`,
                accent: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Energía mensual (30 días)",
                value: `${fmt(energy.monthlyKWh, 1)} kWh`,
                accent: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DataRow,
              {
                label: "Costo estimado mensual",
                value: `Bs. ${fmt(energy.estimatedMonthlyCostBs, 1)}`,
                accent: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-label", children: "Fórmula de Consumo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm bg-secondary/20 px-3 py-3 flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Energía consumida" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "formula-code block", children: "E = P_demanda × h_uso × días" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "formula-code block text-foreground/80", children: [
                  "E = ",
                  fmt(result.maxDemandVA / 1e3, 3),
                  " kVA ×",
                  " ",
                  energy.dailyUsageHours,
                  " h × 30 días"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-label", children: "Resultado" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold font-mono text-accent", children: [
                    fmt(energy.monthlyKWh, 2),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "kWh/mes" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono mt-1", children: "Costo estimado basado en tarifa SINEC-ENDE Bolivia" })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              "data-ocid": "results.back_button",
              onClick: () => navigate({ to: `/proyecto/${projectId}` }),
              children: "← Editar datos"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "flex-1",
              "data-ocid": "results.report_button",
              onClick: () => navigate({ to: `/proyecto/${projectId}/informe` }),
              children: "Ver Informe Técnico →"
            }
          )
        ] })
      ]
    }
  );
}
export {
  ResultsPage as default
};
