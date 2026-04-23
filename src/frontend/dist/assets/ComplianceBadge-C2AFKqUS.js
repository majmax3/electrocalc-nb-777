import { j as jsxRuntimeExports } from "./index-DlHngFV9.js";
import { c as createLucideIcon, a as cn } from "./useProjects-D9WOPPD3.js";
import { C as CircleCheck } from "./circle-check-Dq2fdYZ5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function ComplianceBadge({
  complies,
  label,
  size = "md"
}) {
  const defaultLabel = complies ? "Cumple NB 777" : "No cumple NB 777";
  const displayLabel = label ?? defaultLabel;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      "data-ocid": complies ? "compliance.success" : "compliance.warning",
      style: complies ? {
        color: "oklch(0.6 0.16 150)",
        backgroundColor: "oklch(0.6 0.16 150 / 0.1)",
        borderColor: "oklch(0.6 0.16 150 / 0.3)"
      } : void 0,
      className: cn(
        "inline-flex items-center gap-1 rounded-sm font-mono font-semibold border",
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1",
        !complies && "text-destructive bg-destructive/10 border-destructive/30"
      ),
      children: [
        complies ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleCheck,
          {
            className: cn(size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: cn(size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5") }),
        complies ? "✓" : "✗",
        " ",
        displayLabel
      ]
    }
  );
}
export {
  ComplianceBadge as C
};
