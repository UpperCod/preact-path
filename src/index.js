import { Component, h, cloneElement } from "preact";
import { create, compare, resolve, join } from "path-path";

export let Config = {
    provider: "[[PREACT_PATH]]",
    root: "[[PREACT_PATH_ROOT]]"
};

function defineRender(children, ...args) {
    return typeof children === "function" ? children(...args) : children;
}

export class Provider extends Component {
    getChildContext() {
        return {
            [Config.provider]: this.currentProvider
        };
    }
    componentWillMount(props) {
        let currentPath = "",
            handlers = [],
            redirect = (props || this.props).redirect;

        this.currentProvider = {
            get path() {
                return currentPath;
            },
            subscribe(handler) {
                handlers.push(handler);
                return function unsubscribe() {
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                };
            },
            redirect(path) {
                this.dispatch(redirect ? redirect(path) : path);
            },
            dispatch(path) {
                if (!path || currentPath === path) return;
                currentPath = resolve(currentPath, path);
                handlers.forEach(handler => handler(currentPath));
            }
        };

        if (this.props.history) this.props.history(this.currentProvider);
    }
    componentDidMount() {
        if (!this.props.capture || this.handler) return;
        this.handler = event => {
            let root = "",
                href = "",
                target = event.target;
            do {
                href = href || target.getAttribute("href");
                root = root || target[Config.root];
                if (href && root) {
                    event.preventDefault();
                    break;
                } else {
                    target =
                        target !== this.base ? target.parentElement : false;
                }
            } while (target);

            if (href) this.currentProvider.redirect(join(root, href));
        };
        this.base.addEventListener("click", this.handler);
    }
    componentWillUnmount() {
        if (this.handler) {
            this.base.removeEventListener("click", this.handler);
        }
    }
    render({ children }) {
        return children[0];
    }
}

export class Connect extends Component {
    join(path) {
        return join(this.context[Config.root] || "", path);
    }
    provider() {
        return this.context[Config.provider];
    }
    redirect(path) {
        this.provider().redirect(this.join(path));
    }
    render({ children }) {
        return children[0];
    }
}

export class Root extends Connect {
    getChildContext() {
        return {
            [Config.root]: this.join(this.props.path)
        };
    }
    componentDidMount() {
        this.base[Config.root] = this.join(this.props.path);
    }
    componentWillUnmount() {
        this.base[Config.root] = false;
    }
}

export class Subscriber extends Connect {
    componentWillMount() {
        let provider = this.provider(),
            handler = () => this.setState({ path: provider.path });
        this.unsubscribe = provider.subscribe(handler);
        handler();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render(props, { path = "" }) {
        return defineRender(props.children[0], path, path =>
            this.redirect(path)
        );
    }
}

export class Match extends Connect {
    match({ match, path = "" }) {
        match = this.join(match);
        if ((this.route || {}).path !== match) {
            this.route = create(match);
        }
        let params = compare(this.route, path);
        this.setState({ params, id: this.route.path + path });
    }
    componentWillMount() {
        this.match(this.props);
    }
    componentWillReceiveProps(props) {
        this.match(props);
    }
    shouldComponentUpdate(props, state) {
        if (
            state.id === this.state.id ||
            (!state.params && !this.state.params)
        ) {
            return false;
        }
    }
    render(props, state) {
        return state.params
            ? defineRender(props.children[0], state.params, path =>
                  this.redirect(path)
              )
            : undefined;
    }
}

export function Route(props) {
    return (
        <Subscriber>
            {path => (
                <Match match={props.path} path={path}>
                    {props.children[0]}
                </Match>
            )}
        </Subscriber>
    );
}

export class Switch extends Connect {
    shouldComponentUpdate() {
        return false;
    }
    render(props) {
        let matches = props.children.map(child =>
            create(
                this.join(
                    child.attributes.default
                        ? ":default..."
                        : child.attributes.path
                )
            )
        );
        return (
            <Subscriber>
                {path => {
                    for (let i = 0; i < matches.length; i++) {
                        let match = matches[i],
                            params = compare(match, path);
                        if (params) {
                            return cloneElement(
                                props.children[i],
                                Object.assign(
                                    {},
                                    props.children[i].attributes,
                                    { params }
                                )
                            );
                        }
                    }
                }}
            </Subscriber>
        );
    }
}
