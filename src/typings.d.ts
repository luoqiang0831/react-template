declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

// google analytics interface
type GAFieldsObject = {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
};
declare function vconsole(): void;
interface Window {
  VConsole: vconsole;
  wx: { [key: string]: any };
  __POST_MESSAGE_HANDLE__: Promise<any>;
}

interface HTMLElement
  extends Element,
    DocumentAndElementEventHandlers,
    ElementCSSInlineStyle,
    ElementCSSInlineStyle,
    ElementContentEditable,
    GlobalEventHandlers,
    HTMLOrSVGElement {
  scrollIntoViewIfNeeded();
}
declare let module: {
  hot?: { accept: function };
};

declare global {
  namespace JSX {
    interface HTMLAttributes {
      styleName?: string;
    }

    interface SVGAttributes {
      styleName?: string;
    }
  }
}
interface HTMLAttributes<T> {
  ref?: T;
}
