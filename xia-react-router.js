import React from "react";
import {
    HashRouter,
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// 常规组件加载和按需加载处理
function Component(component) {
    if (Object.prototype.toString.call(component) === "[object Module]") {
        return component.default;
    }
    return component;
}

// 路由函数
function Router({ mode = "hash", routes = [] }) {
    let RouterMode = HashRouter;
    if (mode === "hash") {
        RouterMode = HashRouter;
    } else if (mode === "history") {
        RouterMode = BrowserRouter;
    } else {
        throw Error(`Router mode is not support ${mode}`);
    }
    if (!(routes instanceof Array)) {
        throw Error(`paramter 'routes' must be Array`);
    }
    return function () {
        return (
            <RouterMode>
                <Switch>
                    {routes.map((i, index) => {
                        if (i.hasOwnProperty("redirect")) {
                            if (i.path === "/*") {
                                return (
                                    <Route
                                        key={index}
                                        exact={i.exact}
                                        strict={i.strict}
                                        render={() => (
                                            <Redirect to={i.redirect} />
                                        )}
                                    ></Route>
                                );
                            } else {
                                return (
                                    <Route
                                        key={index}
                                        path={i.path}
                                        exact={i.exact}
                                        strict={i.strict}
                                        render={() => (
                                            <Redirect to={i.redirect} />
                                        )}
                                    ></Route>
                                );
                            }
                        }
                        if (i.hasOwnProperty("children")) {
                            i.parent = Component(i.component);
                            return (
                                <Route
                                    key={index}
                                    path={i.path}
                                    render={() => (
                                        <i.parent>
                                            {i.children.map((j, jndex) => {
                                                return (
                                                    <Route
                                                        key={jndex}
                                                        path={j.path}
                                                        exact={j.exact}
                                                        strict={j.strict}
                                                        component={Component(j.component)}
                                                    ></Route>
                                                );
                                            })}
                                            <Route />
                                        </i.parent>
                                    )}
                                ></Route>
                            );
                        }
                        return (
                            <Route
                                key={index}
                                path={i.path}
                                exact={i.exact}
                                strict={i.strict}
                                component={Component(i.component)}
                            ></Route>
                        );
                    })}
                </Switch>
            </RouterMode>
        );
    };
}

export default Router;
