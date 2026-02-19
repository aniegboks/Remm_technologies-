export {};

declare global {
  interface Window {
    fcWidgetMessengerConfig?: {
      config?: {
        headerProperty?: {
          direction?: string;
          backgroundColor?: string;
        };
        cssNames?: {
          widget?: string;
        };
      };
    };
  }
}
