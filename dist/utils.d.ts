export declare const renameFolder: (oldPath: string, newPath: string) => Promise<unknown>;
export declare const readFile: (file: string) => Promise<string>;
export declare const writeFile: (file: string, data: string) => Promise<unknown>;
export declare const checkAndRemoveExcelFile: (file: string) => Promise<unknown>;
export declare const print: (color: string, comment: string, error?: boolean) => void;
export declare const consoleLog: (color: string, comment: string) => void;
export declare const consoleError: (comment: string) => void;
