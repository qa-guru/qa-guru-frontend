import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
});

const g = globalThis;

const defineGlobal = (name, value) => {
  Object.defineProperty(g, name, {
    value,
    writable: true,
    configurable: true,
  });
};

g.window = dom.window;
g.document = dom.window.document;
defineGlobal("navigator", dom.window.navigator);
g.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
g.requestAnimationFrame = (cb) => setTimeout(cb, 0);
g.cancelAnimationFrame = (id) => clearTimeout(id);
g.IS_REACT_ACT_ENVIRONMENT = true;
g.location = dom.window.location;
g.history = dom.window.history;
g.self = dom.window;
g.top = dom.window;
g.parent = dom.window;
g.frameElement = null;
g.open = () => null;
g.scrollTo = () => {};

g.matchMedia = () => ({
  matches: false,
  media: "",
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return false;
  },
});
dom.window.matchMedia = g.matchMedia;

g.getSelection = () => dom.window.getSelection();
dom.window.getSelection = g.getSelection;

for (const name of [
  "HTMLElement",
  "HTMLInputElement",
  "HTMLAnchorElement",
  "HTMLFormElement",
  "HTMLTextAreaElement",
  "HTMLSelectElement",
  "HTMLOptionElement",
  "HTMLButtonElement",
  "HTMLDivElement",
  "HTMLSpanElement",
  "HTMLUListElement",
  "HTMLLIElement",
  "HTMLImageElement",
  "HTMLVideoElement",
  "HTMLParagraphElement",
  "HTMLHeadingElement",
  "HTMLTableElement",
  "HTMLTableRowElement",
  "HTMLTableCellElement",
  "SVGElement",
  "SVGSVGElement",
  "Element",
  "Node",
  "Text",
  "Comment",
  "DocumentFragment",
  "ShadowRoot",
  "Attr",
  "NamedNodeMap",
  "DOMTokenList",
  "MutationObserver",
  "DOMParser",
  "XMLSerializer",
  "Range",
  "StaticRange",
  "Selection",
  "File",
  "Blob",
  "FormData",
  "Headers",
  "Request",
  "Response",
  "Image",
  "Event",
  "CustomEvent",
  "FocusEvent",
  "MouseEvent",
  "KeyboardEvent",
  "AbortController",
  "AbortSignal",
]) {
  if (g[name] === undefined && dom.window[name] !== undefined) {
    g[name] = dom.window[name];
  }
}

const makeEvent = (base) =>
  class extends (base || dom.window.Event) {
    constructor(type, init = {}) {
      super(type, init);
      Object.assign(this, init);
    }
  };

for (const name of [
  "ClipboardEvent",
  "DragEvent",
  "InputEvent",
  "CompositionEvent",
  "UIEvent",
  "WheelEvent",
  "AnimationEvent",
  "TransitionEvent",
  "TextEvent",
]) {
  if (g[name] === undefined) {
    g[name] = makeEvent(dom.window.Event);
    dom.window[name] = g[name];
  }
}

if (g.DataTransfer === undefined) {
  g.DataTransfer = class {
    constructor() {
      this.items = [];
      this.files = [];
      this.types = [];
      this.effectAllowed = "all";
      this.dropEffect = "none";
    }

    getData() {
      return "";
    }

    setData() {}
    clearData() {}
    setDragImage() {}
  };
  dom.window.DataTransfer = g.DataTransfer;
}

if (g.ResizeObserver === undefined) {
  g.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  dom.window.ResizeObserver = g.ResizeObserver;
}

if (g.DOMRect === undefined) {
  g.DOMRect = class {
    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  };
  g.DOMRectReadOnly = g.DOMRect;
  dom.window.DOMRect = g.DOMRect;
  dom.window.DOMRectReadOnly = g.DOMRect;
}

if (g.Element?.prototype?.scrollIntoView === undefined) {
  g.Element.prototype.scrollIntoView = () => {};
}

dom.window.Range.prototype.getClientRects ??= () => [];
dom.window.Range.prototype.getBoundingClientRect ??= () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});
