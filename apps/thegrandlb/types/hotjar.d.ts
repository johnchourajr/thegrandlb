// types/hotjar.d.ts
declare global {
  interface Window {
    hj: {
      (action: string, ...args: any[]): void;
    };
  }
}

export {};
