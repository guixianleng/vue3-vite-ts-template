declare function parseInt(s: string | number, radix?: number): number

declare function parseFloat(string: string | number): number

declare type Recordable<T = any> = Record<string, T>

declare type Nullable<T> = T | null

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
