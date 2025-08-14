import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "gcds-button": any;
      "gcds-header": any;
      "gcds-container": any;
      "gcds-heading": any;
      "gcds-text": any;
      "gcds-footer": any;
      "gcds-input": any;
      "gcds-radios": any;
      "gcds-textarea": any;
      "gcds-error-summary": any;
      "gcds-top-nav": any;
      "gcds-nav-link": any;
      "gcds-nav-group": any;
      "gcds-date-modified": any;
    }
  }
}
