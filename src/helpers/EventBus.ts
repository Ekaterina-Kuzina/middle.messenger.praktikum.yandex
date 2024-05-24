// export class EventBus<T>{
//     listeners:Record<string, Array<()=> void>> = {};
//
//     constructor() {
//         this.listeners = {};
//     }
//
//     onAttach(event:string,callback:()=> void){
//         if(!this.listeners[event]){
//            this.listeners[event]= []
//         }
//
//         this.listeners[event].push(callback)
//         return this.listeners
//     }
//
//     onDetach(event:string, callback:()=> void){
//         if(!this.listeners[event]){
//             return
//         }
//
//         this.listeners[event] = this.listeners[event].filter((listener:any)=> listener !== callback)
//
//     }
//
//     notify(event:string, ...args:  ({ oldProps: T; newProps: T } | undefined)[]){
//         if(!this.listeners[event]){
//             return
//         }
//
//         this.listeners[event].forEach((listener)=> listener(...args as []))
//     }
//
// }
//
// function callback(...args:any){
//     console.log('hi', ...args)
// }
//
// function callback2(...args:any){
//     console.log('by', ...args)
// }
// export const eventBus = new EventBus();
// eventBus.onAttach('onClick', callback);
// eventBus.onAttach('onSubmit', callback2);
//
//
// // eventBus.onDetach('onClick', () => {
// //     console.log('d')});
//

type Listener = (...args: { oldProps: object; newProps: object }[]) => void;

export class EventBus {
    listeners: Record<string, Listener[]>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Listener): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: Listener): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: string, ...args: { oldProps: object; newProps: object }[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
