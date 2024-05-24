// import {EventBus} from "./eventBus";
//
// export class Block<T extends object> {
//     static EVENTS:Record<string, string> = {
//         INIT: "init",
//         FLOW_CDM: "flow:component-did-mount",
//         FLOW_CDU:'flow:component-did-update',
//         FLOW_RENDER: "flow:render",
//     };
//
//
//     _element: HTMLElement | null = null;
//     _meta: { tagName: string, props: T | {} } | null = null;
//
//     props: {[index: string]:any}  = {};
//     eventBus: () => EventBus<T>;
//
//     constructor(tagName:string,props = {}) {
//         const eventBus = new EventBus<T>();
//         this._meta = {
//             tagName,
//             props
//         };
//         this.eventBus = () => eventBus;
//         this.props = this._makePropsProxy(props);
//         this._registerEvents(eventBus)
//     }
//
//     _registerEvents(eventBus: EventBus<T>){
//         eventBus.onAttach(Block.EVENTS.INIT, this.init.bind(this))
//         eventBus.onAttach(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
//         eventBus.onAttach(Block.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this))
//         eventBus.onAttach(Block.EVENTS.FLOW_RENDER,  this._render.bind(this))
//     }
//
//     _createDocumentElement(tagName: string) {
//         return document.createElement(tagName);
//     }
//
//     _createResources() {
//         if(this._meta?.tagName){
//             this._element = this._createDocumentElement(this._meta.tagName);
//         }
//
//         const { wrapperClassName } = this.props;
//
//         if (wrapperClassName) {
//             this._element?.setAttribute('class', `${wrapperClassName}`);
//         }
//     }
//
//     init() {
//         this._createResources();
//         this.eventBus().notify(Block.EVENTS.FLOW_RENDER);
//     }
//
//     _componentDidMount() {
//         this.componentDidMount();
//     }
//
//     componentDidMount() {}
//
//     dispatchComponentDidMount() {
//         this.eventBus().notify(Block.EVENTS.FLOW_CDM);
//     }
//
//     _componentDidUpdate(oldProps: T, newProps: T) {
//         const response = this.componentDidUpdate(oldProps, newProps);
//         if (response) {
//             this.eventBus().notify(Block.EVENTS.FLOW_RENDER);
//         }
//     }
//
//     // The user can override, it is not necessary to touch
//     componentDidUpdate(oldProps: T, newProps: T) {
//         return JSON.stringify(oldProps) !== JSON.stringify(newProps);
//     }
//
//     setProps = (nextProps:T) => {
//         if (!nextProps) {
//             return;
//         }
//
//         Object.assign(this.props, nextProps);
//     };
//     get element() {
//         return this._element;
//     }
//
//     _addEvents() {
//         const { events = {}, eventInterception } = this.props as { events: Record<string, Function>, eventInterception:boolean };
//
//         Object.keys(events).forEach((eventName) => {
//             this._element?.addEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject, eventInterception);
//         });
//     }
//
//     _removeEvents() {
//         const { events = {} } = this.props as { events: Record<string, Function> };
//
//         Object.keys(events).forEach((eventName) => {
//             this._element?.removeEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject);
//         });
//     }
//
//     _render() {
//         const block = this.render();
//         const element = new DOMParser().parseFromString(block as unknown as string, 'text/html').body.firstChild;
//
//         this._removeEvents();
//         this._element?.append(element as string | Node);
//
//         this._addEvents();
//         this.dispatchComponentDidMount();
//     }
//
//     // Может переопределять пользователь, необязательно трогать
//     render() {}
//
//     getContent() {
//         return this.element;
//     }
//
//     _makePropsProxy(props:{[index: string]:any}){
//         return new Proxy(props, {
//             get(target:{[index: string]:any}, prop:string){
//                 const value = target[prop];
//                 return typeof value === "function" ? value.bind(target) : value;
//             },
//             set(target:{[index: string]:any}, prop:string, value:any){
//                 if(prop in target){
//                     console.log('prop', prop)
//                     console.log('target', target)
//                     target[prop] = value
//                 }else {
//                     throw new Error('Access denied');
//                 }
//                 return true;
//             },
//             deleteProperty: () => {
//                 throw new Error('Access denied');
//             },
//         })
//     }
// }



// import { EventBus } from './eventBus';
//
// export class Block<T extends object> {
//     static EVENTS:Record<string, string> = {
//         INIT: 'init',
//         FLOW_CDM: 'flow:component-did-mount',
//         FLOW_RENDER: 'flow:render',
//         FLOW_CDU: 'flow:component-did-update',
//     };
//
//     _element: HTMLElement | null = null;
//
//     _meta: { tagName: string, props: T | {} } | null = null;
//
//     /** JSDoc
//      * @param {string} tagName
//      * @param {Object} props
//      *
//      * @returns {void}
//      */
//     props: T;
//
//     eventBus: () => EventBus<T>;
//
//     constructor(tagName = 'div', props = {}) {
//         const eventBus = new EventBus<T>();
//         this._meta = {
//             tagName,
//             props,
//         };
//
//         this.props = this._makePropsProxy(props as T);
//
//         this.eventBus = () => eventBus;
//
//         this._registerEvents(eventBus);
//         eventBus.notify(Block.EVENTS.INIT);
//     }
//
//     _registerEvents(eventBus: EventBus<T>) {
//         eventBus.onAttach(Block.EVENTS.INIT, this.init.bind(this));
//         eventBus.onAttach(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//         eventBus.onAttach(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//         eventBus.onAttach(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     }
//
//     _createResources() {
//         const { tagName } = this._meta as { tagName: string };
//         this._element = this._createDocumentElement(tagName) as HTMLElement;
//         const { wrapperClassName } = this.props as { wrapperClassName: string };
//
//         if (wrapperClassName) {
//             this._element.setAttribute('class', `${wrapperClassName}`);
//         }
//     }
//
//     _addEvents() {
//         const { events = {}, eventInterception } = this.props as { events: Record<string, Function>, eventInterception:boolean };
//
//         Object.keys(events).forEach((eventName) => {
//             this._element?.addEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject, eventInterception);
//         });
//     }
//
//     _removeEvents() {
//         const { events = {} } = this.props as { events: Record<string, Function> };
//
//         Object.keys(events).forEach((eventName) => {
//             this._element?.removeEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject);
//         });
//     }
//
//     init() {
//         this._createResources();
//         this.eventBus().notify(Block.EVENTS.FLOW_RENDER);
//     }
//
//     _componentDidMount() {
//         this.componentDidMount();
//     }
//
//     // Может переопределять пользователь, необязательно трогать
//     componentDidMount() {}
//
//     dispatchComponentDidMount() {
//         this.eventBus().notify(Block.EVENTS.FLOW_CDM);
//     }
//
//     _componentDidUpdate(oldProps: T, newProps: T) {
//         const response = this.componentDidUpdate(oldProps, newProps);
//         if (response) {
//             this.eventBus().notify(Block.EVENTS.FLOW_RENDER);
//         }
//     }
//
//     // Может переопределять пользователь, необязательно трогать
//     componentDidUpdate(oldProps: T, newProps: T) {
//         return JSON.stringify(oldProps) !== JSON.stringify(newProps);
//     }
//
//     setProps = (nextProps:T) => {
//         if (!nextProps) {
//             return;
//         }
//
//         Object.assign(this.props, nextProps);
//     };
//
//     get element() {
//         return this._element;
//     }
//
//     _render() {
//         const block = this.render();
//         const element = new DOMParser().parseFromString(block as unknown as string, 'text/html').body.firstChild;
//
//         // Удалить старые события через removeEventListener
//         this._removeEvents();
//         this._element?.append(element as string | Node);
//
//         // Навесить новые события через addEventListener
//         this._addEvents();
//         this.dispatchComponentDidMount();
//     }
//
//     // Может переопределять пользователь, необязательно трогать
//     render() {}
//
//     getContent() {
//         return this.element;
//     }
//
//     _makePropsProxy(props: T) {
//         return new Proxy(props, {
//             get(target, prop) {
//                 const value = (target as { [index: string]:unknown })[prop as string];
//                 return typeof value === 'function' ? value.bind(target) : value;
//             },
//             set: (target, prop, value) => {
//                 if (prop in target) {
//                     // eslint-disable-next-line no-param-reassign
//                     (target as { [index: string]:unknown })[prop as string] = value;
//                     this.eventBus().notify(Block.EVENTS.FLOW_CDU, { oldProps: props as T, newProps: target });
//                 } else {
//                     throw new Error('Access denied');
//                 }
//                 return true;
//             },
//             deleteProperty: () => {
//                 throw new Error('Access denied');
//             },
//         } as ProxyHandler<T>);
//     }
//
//     // eslint-disable-next-line class-methods-use-this
//     _createDocumentElement(tagName: string) {
//         // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//         return document.createElement(tagName);
//     }
// }


import {EventBus} from './EventBus';
import * as Handlebars  from 'handlebars';

type Props = Record<string, unknown>;

type Attributes = Record<string, string>;

type Events = {
    INIT: string;
    FLOW_CDM: string;
    FLOW_RENDER: string;
    FLOW_CDU: string;
};

type ChildBlock = Block | string;
type Children = ChildBlock[];

export class Block {
    static EVENTS: Events = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    _element: HTMLElement | null = null;
    _meta: { tagName: string; props: Props } | null = null;
    _id = Math.floor(100000 + Math.random() * 900000);
    props: Props;
    eventBus: () => EventBus;
    lists: object;
    children: Children | object;

    constructor(propsWithChildren: Props = {}) {
        const eventBus = new EventBus();
        const { props, children, lists } =
            this._getChildrenPropsAndProps(propsWithChildren);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { events = {} as any } = this.props;
        Object.keys(events).forEach((eventName) => {
            // Здесь я добавил обработку событий blur и submit так как у меня Input и form обернут в div, альтернативой было напрямую переписать компоненты Input и form, но я посчитал что это сломает мою папочную структуру

            const inputElement = this._element?.querySelector('Input');
            const formElement = this._element?.querySelector('form');
            if (inputElement && eventName === ('blur' || 'focus')) {
                inputElement.addEventListener(eventName, events[eventName]);
            } else if (formElement && eventName === 'submit') {
                formElement.addEventListener(eventName, events[eventName]);
            } else {
                this._element?.addEventListener(eventName, events[eventName]);
            }
        });
    }

    _removeEvents() {
        const { events = {} as any } = this.props;
        Object.keys(events).forEach((eventName) => {
            for (const eventListener of events[eventName]) {
                this._element?.removeEventListener(eventName, eventListener);
            }
        });
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources(): void {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    init(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(): void {}

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(): void {
        const response = this.componentDidUpdate();
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(): boolean {
        return true;
    }

    _getChildrenPropsAndProps(propsAndChildren: Props) {
        const children: Record<string, Block> = {};
        const props: Props = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lists: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { children, props, lists };
    }

    addAttributes() {
        const { attr = {} as Attributes } = this.props;

        Object.entries(attr as Attributes).forEach(([key, value]) => {
            this._element?.setAttribute(key, value as string);
        });
    }

    setProps = (nextProps: Props): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    _render() {
        const propsAndStubs: Props = { ...this.props };
        const _tmpId = Math.floor(100000 + Math.random() * 900000);
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        // this._removeEvents();

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            stub?.replaceWith(child.getContent());
        });

        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template');
            child.forEach((item: Block | string) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent() as Node);
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            // fragment.content.innerHTML = listCont.content;
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            stub?.replaceWith(listCont.content);
        });

        const newElement = fragment.content.firstElementChild as Node;
        if (this._element) {
            this._element?.replaceWith(newElement);
        }
        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    render(): void {}

    public getContent(): HTMLElement | null {
        return this.element;
    }

    _makePropsProxy(props: Props): Props {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Props, prop: string, value) {
                const oldTarget = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {
                    oldProps: oldTarget,
                    newProps: target,
                });
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
