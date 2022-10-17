export type ScreenStatus = 'init' | 'loading' | 'success' | 'error'
export type ZfighterSImilarity = {
    predictions: string;
    ok: boolean;
    message: string;
  };