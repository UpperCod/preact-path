import { h, Component, render } from "preact";
import { Provider, Root, Subscriber, Route } from "preact-path";

let styleFolder = {
        padding: "0px 1rem"
    },
    styleButton = {
        padding: ".25rem 1.5rem",
        border: "none",
        borderLeft: "1px solid black",
        background: "transparent"
    };

function Folder(props) {
    return (
        <Root path={props.path}>
            <div>
                <button style={styleButton} href="/">
                    {props.title}
                </button>
                {props.children.length ? (
                    <Route path="/:params...">
                        <div style={styleFolder}>
                            <button style={styleButton} href="../">
                                👈 ../
                            </button>
                            {props.children}
                        </div>
                    </Route>
                ) : (
                    undefined
                )}
            </div>
        </Root>
    );
}

function App() {
    return (
        <Provider capture={true}>
            <div>
                <p style={{ maxWidth: "300px" }}>
                    <a
                        style={{ textDecoration: "none", color: "unset" }}
                        href="https://github.com/UpperCod/preact-path"
                    >
                        <strong>preact-path</strong>
                    </a>
                    , esta pensado para modularizar rutas. Crea componentes de
                    ruta relativa, que no dependan de una raiz
                </p>
                <Subscriber>{path => <h1>🔍 {path || "/"}</h1>}</Subscriber>

                <button style={styleButton} href="/">
                    🏠 root
                </button>
                <Folder path="/folder-1" title="👉 Folder - 1">
                    <Folder path="/sub-1" title="👇 sub-folder- 1">
                        <Folder path="/sub-1" title="👉 sub-sub-folder- 1">
                            <Folder
                                path="/sub-1"
                                title="✋ sub-sub-sub-folder- 1"
                            />
                            <Folder
                                path="/sub-2"
                                title="✋ sub-sub-sub-folder- 2"
                            />
                            <Folder
                                path="/sub-3"
                                title="✋ sub-sub-sub-folder- 3"
                            />
                        </Folder>
                        <Folder path="/sub-2" title="👉 sub-sub-folder- 2">
                            <Folder
                                path="/sub-1"
                                title="✋ sub-sub-sub-folder- 1"
                            />
                            <Folder
                                path="/sub-2"
                                title="✋ sub-sub-sub-folder- 2"
                            />
                            <Folder
                                path="/sub-3"
                                title="✋ sub-sub-sub-folder- 3"
                            />
                        </Folder>
                        <Folder path="/sub-3" title="👉 sub-sub-folder- 3">
                            <Folder
                                path="/sub-1"
                                title="✋ sub-sub-sub-folder- 1"
                            />
                            <Folder
                                path="/sub-2"
                                title="✋ sub-sub-sub-folder- 2"
                            />
                            <Folder
                                path="/sub-3"
                                title="✋ sub-sub-sub-folder- 3"
                            />
                        </Folder>
                    </Folder>
                </Folder>
                <Folder path="/folder-2" title="👉 Folder - 2">
                    <Folder path="/sub-1" title="👇 sub-folder- 1">
                        <Folder path="/sub-1" title="👉 sub-sub-folder- 1">
                            <Folder
                                path="/sub-1"
                                title="✋ sub-sub-sub-folder- 1"
                            />
                            <Folder
                                path="/sub-2"
                                title="✋ sub-sub-sub-folder- 2"
                            />
                            <Folder
                                path="/sub-3"
                                title="✋ sub-sub-sub-folder- 3"
                            />
                        </Folder>
                        <Folder path="/sub-2" title="👉 sub-sub-folder- 2">
                            <Folder
                                path="/sub-1"
                                title="✋ sub-sub-sub-folder- 1"
                            />
                            <Folder
                                path="/sub-2"
                                title="✋ sub-sub-sub-folder- 2"
                            />
                            <Folder
                                path="/sub-3"
                                title="✋ sub-sub-sub-folder- 3"
                            />
                        </Folder>
                        <Folder path="/sub-3" title="👉 sub-sub-folder- 3">
                            <Folder
                                path="/sub-1"
                                title="✋ sub-sub-sub-folder- 1"
                            />
                            <Folder
                                path="/sub-2"
                                title="✋ sub-sub-sub-folder- 2"
                            />
                            <Folder
                                path="/sub-3"
                                title="✋ sub-sub-sub-folder- 3"
                            />
                        </Folder>
                    </Folder>
                </Folder>
            </div>
        </Provider>
    );
}

window.currentNode = render(
    <App />,
    document.querySelector("#app"),
    window.currentNode
);
