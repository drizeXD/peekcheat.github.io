(() => {
    "use strict";
    var e = {
            700: function(e, l, t) {
                var n = this && this.__awaiter || function(e, l, t, n) {
                    return new(t = t || Promise)((function(a, i) {
                        function s(e) {
                            try {
                                r(n.next(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function o(e) {
                            try {
                                r(n.throw(e))
                            } catch (e) {
                                i(e)
                            }
                        }

                        function r(e) {
                            var l;
                            e.done ? a(e.value) : ((l = e.value) instanceof t ? l : new t((function(e) {
                                e(l)
                            }))).then(s, o)
                        }
                        r((n = n.apply(e, l || [])).next())
                    }))
                };
                Object.defineProperty(l, "__esModule", {
                    value: !0
                });
                const a = t(140),
                    i = t(908);
                window.addEventListener("DOMContentLoaded", (() => n(void 0, void 0, void 0, (function*() {
                    (0, a.default)(document.getElementById("treeview"));
                    let e = yield fetch("docs/docs.json").then((e => e.json())), l = "Environment";

                    function t(e, t) {
                        if (e) {
                            let c = document.querySelector(".main-docs");
                            document.querySelector(".main-header").innerHTML = t, c.innerHTML = "";
                            for (const l of e) {
                                var n = l.name;
                                if ((b = l.code) && !Array.isArray(b)) c.insertAdjacentHTML("beforeend", `\n                        <li>\n                            <div class='docs-header'>${n}</div>\n                            <div class='docs-code'>${(0,i.toHTML)((0,i.tokenize)(b.def,i.root))}</div>\n                            <div class='docs-detail'>${b.desc}</div>\n                        </li>\n                    `);
                                else if (b && Array.isArray(b)) {
                                    c.insertAdjacentHTML("beforeend", `\n                        <li>\n                            <div class='docs-header'>${n}</div>\n                        </li>\n                    `);
                                    let e = c.lastElementChild;
                                    for (var a of b) e.insertAdjacentHTML("beforeend", `\n                            <div class='docs-code'>${(0,i.toHTML)((0,i.tokenize)(a.def,i.root))}</div>\n                            <div class='docs-detail'>${a.desc}</div>\n                        `)
                                } else if (!b && l.table) {
                                    var s, o, r = l.table.headers,
                                        b = l.table.values;
                                    c.insertAdjacentHTML("beforeend", `\n                        <li>\n                            <div class='docs-header'>${n}</div>\n                            <table>\n                                <thead>\n                                    <tr>\n\n                                    </tr>\n                                </thead>\n                                <tbody>\n\n                                </tbody>\n                            </table>\n                        </li>\n                    `);
                                    let e = c.lastElementChild.lastElementChild.firstElementChild,
                                        t = e.nextElementSibling;
                                    for (s of r) e.firstElementChild.insertAdjacentHTML("beforeend", `\n                            <th>${s}</th>\n                        `);
                                    for (o of b) {
                                        t.insertAdjacentHTML("beforeend", "\n                            <tr>\n                                \n                            </tr>\n                        ");
                                        let e = t.lastElementChild;
                                        for (var d of o) e.insertAdjacentHTML("beforeend", `\n                                <td>${d}</td>\n                            `)
                                    }
                                }
                            }
                            l = t
                        }
                    }
                    document.querySelectorAll("ul li .treeview-header").forEach((n => {
                        let a = n,
                            i = a.lastElementChild,
                            s = a.nextElementSibling;
                        a.onclick = () => {
                            var n;
                            i && s ? i.classList.contains("bx-chevron-right") ? (a.classList.add("header-active"), i.classList.remove("bx-chevron-right"), i.classList.add("bx-chevron-down"), s.classList.add("nested-active")) : (a.classList.remove("header-active"), i.classList.remove("bx-chevron-down"), i.classList.add("bx-chevron-right"), s.classList.remove("nested-active")) : (n = a.parentElement.parentElement.parentElement.firstElementChild.querySelector(".header-title").innerHTML, l !== n && t(e[n], n), setTimeout((() => {
                                let e = document.getElementById(a.lastElementChild.innerHTML);
                                e && e.scrollIntoView()
                            }), 250))
                        }
                    })), document.getElementById("toggle").addEventListener("click", (() => {
                        document.querySelector(".container-sidebar").classList.toggle("active"), document.getElementById("toggle").classList.toggle("active"), document.querySelector(".container-main").classList.toggle("active")
                    })), t(e[l], l)
                }))))
            },
            908: (e, l) => {
                Object.defineProperty(l, "__esModule", {
                    value: !0
                }), l.toHTML = l.tokenize = l.root = void 0, l.root = [
                    [/\b(?!function)\w+(?=\(.*\))/, "title"],
                    [/[a-zA-Z_]\w*/, {
                        cases: {
                            keyword: [/function/],
                            type: [/any/, /string/, /int/, /number/, /bool/, /nil/, /thread/, /instance/, /localscript/, /script/, /signal/],
                            builtin: [/table/, /Drawing/, /closure/]
                        }
                    }],
                    [/->/, "keyword"],
                    [/\s+/, "whitespace"]
                ], l.tokenize = function(e, l) {
                    let t = [];
                    for (; e;) {
                        let s = e.length,
                            o = null;
                        for (var n of l) {
                            let l = n[0],
                                t = n[1];
                            if (t.hasOwnProperty("cases"))
                                for (var a in t.cases)
                                    for (var i of t.cases[a])(i = i.exec(e)) && i.index < s && (o = {
                                        token: i[0],
                                        type: a
                                    }, s = i.index);
                            else n = l.exec(e), n && n.index < s && (o = {
                                token: n[0],
                                type: t
                            }, s = n.index)
                        }
                        s && t.push({
                            token: e.substring(0, s),
                            type: "unknown"
                        }), o && t.push(o), e = e.substring(s + (o ? o.token.length : 0))
                    }
                    return t
                }, l.toHTML = function(e) {
                    let l = "";
                    for (var t of e) switch (t.type) {
                        case "title":
                            l += `<span class='code-title'>${t.token}</span>`;
                            break;
                        case "keyword":
                            l += `<span class='code-keyword'>${t.token}</span>`;
                            break;
                        case "type":
                            l += `<span class='code-type'>${t.token}</span>`;
                            break;
                        case "builtin":
                            l += `<span class='code-builtin'>${t.token}</span>`;
                            break;
                        case "whitespace":
                            l += t.token.replace(" ", "&nbsp;").replace("\n", "<br>").replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
                            break;
                        case "unknown":
                            l += t.token
                    }
                    return l
                }
            },
            140: (e, l) => {
                Object.defineProperty(l, "__esModule", {
                    value: !0
                });
                const t = [{
                    kind: "bxs-layer",
                    label: "Environment",
                    list: [{
                        label: "Get Global Environment"
                    }, {
                        label: "Get Environment"
                    }, {
                        label: "Get Registry"
                    }, {
                        label: "Get Garbage Collection"
                    }, {
                        label: "Get Instances"
                    }, {
                        label: "Get Nil Instances"
                    }, {
                        label: "Get Loaded Modules"
                    }, {
                        label: "Get Connections"
                    }, {
                        label: "Fire Signal"
                    }, {
                        label: "Fire Click Detector"
                    }, {
                        label: "Fire Proximity Prompt"
                    }, {
                        label: "Fire Touch Interest"
                    }, {
                        label: "Set Scriptable"
                    }, {
                        label: "Get Hidden Property"
                    }, {
                        label: "Set Hidden Property"
                    }, {
                        label: "Set Simulation Radius"
                    }]
                }, {
                    kind: "bxs-edit-alt",
                    label: "Script",
                    list: [{
                        label: "Get Script Environment"
                    }, {
                        label: "Get Calling Script"
                    }, {
                        label: "Get Script Closure"
                    }, {
                        label: "Get Script Hash"
                    },{
                        label: "Get Script Bytecode"
                    }]
                }, {
                    kind: "bxs-rename",
                    label: "Table",
                    list: [{
                        label: "Get Raw Metatable"
                    }, {
                        label: "Set Raw Metatable"
                    }, {
                        label: "Set Readonly"
                    }, {
                        label: "Is Readonly"
                    }]
                }, {
                    kind: "bx-text",
                    label: "Input",
                    list: [{
                        label: "Is Active"
                    }, {
                        label: "Keyboard"
                    }, {
                        label: "Left Click"
                    }, {
                        label: "Right Click"
                    }, {
                        label: "Mouse Movement"
                    }]
                }, {
                    kind: "bxs-magnet",
                    label: "Hooking",
                    list: [{
                        label: "Hook Function"
                    }, {
                        label: "Hook Metamethod"
                    }, {
                        label: "New CClosure"
                    }]
                }, {
                    kind: "bx-code",
                    label: "Reflection",
                    list: [{
                        label: "Loadstring"
                    }, {
                        label: "Check Caller"
                    }, {
                        label: "Is Lua Closure"
                    }, {
                        label: "Dump String"
                    }, {
                        label: "Decompile"
                    }]
                }, {
                    kind: "bxs-message-alt-x",
                    label: "Console",
                    list: [{
                        label: "Console Print"
                    }, {
                        label: "Console Info"
                    }, {
                        label: "Console Error"
                    }, {
                        label: "Console Clear"
                    }, {
                        label: "Console Name"
                    }, {
                        label: "Console Input"
                    }, {
                        label: "printconsole"
                    }, {
                        label: ""
                    }]
                }, {
                    kind: "bxs-folder",
                    label: "File System",
                    list: [{
                        label: "Read File"
                    }, {
                        label: "Write File"
                    }, {
                        label: "Append File"
                    }, {
                        label: "Load File"
                    }, {
                        label: "List Files"
                    }, {
                        label: "Is File"
                    }, {
                        label: "Is Folder"
                    }, {
                        label: "Make Folder"
                    }, {
                        label: "Delete Folder"
                    }, {
                        label: "Delete File"
                    }]
                }, {
                    kind: "bx-dots-horizontal",
                    label: "Miscellaneous",
                    list: [{
                        label: "Get Clipboard"
                    }, {
                        label: "Set Clipboard"
                    }, {
                        label: "Set Fast Flag"
                    }, {
                        label: "Get Namecall Method"
                    }, {
                        label: "Set Namecall Method"
                    }, {
                        label: "Get Fps Cap"
                    }, {
                        label: "Set Fps Cap"
                    }, {
                        label: "Identify Executor"
                    }, {
                        label: "Save Instance"
                    }, {
                        label: "Message Box"
                    }]
                }, {
                    kind: "bx-library",
                    label: "Libraries",
                    list: [{
                        kind: "bxs-game",
                        label: "Bit32",
                        list: [{
                            label: "Bit Divide"
                        }, {
                            label: "Bit Add"
                        }, {
                            label: "Bit Subtract"
                        }, {
                            label: "Bit Multiply"
                        }, {
                            label: "Bit AND"
                        }, {
                            label: "Bit OR"
                        }, {
                            label: "Bit XOR"
                        }, {
                            label: "Bit NOT"
                        }, {
                            label: "Bit Swap"
                        }, {
                            label: "Bit Rotate"
                        }, {
                            label: "To Hex"
                        }, {
                            label: "To Bit"
                        }, {
                            label: "Left Shift"
                        }, {
                            label: "Right Shift"
                        }, {
                            label: "Arith Shift"
                        }]
                    }, {
                        kind: "bxs-error",
                        label: "Crypt",
                        list: [{
                            label: "Encrypt"
                        }, {
                            label: "Decrypt"
                        }, {
                            label: "Base64 Encode"
                        }, {
                            label: "Base64 Decode"
                        }, {
                            label: "Hash"
                        }, {
                            label: "Derive"
                        }, {
                            label: "Random"
                        }]
                    }, {
                        kind: "bxs-terminal",
                        label: "Debug",
                        list: [{
                            label: "Get Constants"
                        }, {
                            label: "Get Constant"
                        }, {
                            label: "Set Constant"
                        }, {
                            label: "Set Constants"
                        }, {
                            label: "Get Upvalues"
                        }, {
                            label: "Get Upvalue"
                        }, {
                            label: "Set Upvalues"
                        }, {
                            label: "Set upvalue"
                        }, {
                            label: "Get Protos"
                        }, {
                            label: "Get Proto"
                        }, {
                            label: "Set Proto"
                        }, {
                            label: "Get Stack"
                        }, {
                            label: "Set Stack"
                        }, {
                            label: "Set Metatable"
                        }, {
                            label: "Get Registry"
                        }, {
                            label: "Get Info"
                        }]
                    }, {
                        kind: "bx-cut",
                        label: "Drawing",
                        list: [{
                            label: "Drawing New"
                        }]
                    }]
                }];

                function n(e, l) {
                    return !0 === l ? e : ""
                }
                l.default = function(e) {
                    for (const l of t)
                        if (e.insertAdjacentHTML("beforeend", `\n            <li>\n                <div class='treeview-header'>\n                    <button class='bx ${l.kind}'></button>\n                    <span class='header-title'>${l.label}</span>\n                    <button class='bx bx-chevron-right'></button>\n                </div>\n                <ul class='treeview-nested'>\n\n                </ul>\n            </li>\n        `), l.hasOwnProperty("list")) {
                            let t = e.lastElementChild.firstElementChild.nextElementSibling;
                            for (const e of l.list)
                                if (t.insertAdjacentHTML("beforeend", `\n                    <li>\n                        <div class='treeview-header'>\n                            ${n(`\n                                <button class='bx ${e.kind}'></button>\n                            `,e.hasOwnProperty("list"))}\n                            <span class='header-title'>${e.label}</span>\n                            ${n("\n                                <button class='bx bx-chevron-right'></button>\n                            ",e.hasOwnProperty("list"))}\n                        </div>\n                        ${n("\n                            <ul class='treeview-nested'>\n\n                            </ul>\n                        ",e.hasOwnProperty("list"))}\n                    </li>\n                `), e.hasOwnProperty("list")) {
                                    let l = t.lastElementChild.firstElementChild.nextElementSibling;
                                    for (const t of e.list) l.insertAdjacentHTML("beforeend", `\n                            <li>\n                                <div class='treeview-header'>\n                                    <span class='header-title'>${t.label}</span>\n                                </div>\n                            </li>\n                        `)
                                }
                        }
                }
            }
        },
        l = {};
    ! function t(n) {
        var a = l[n];
        return void 0 !== a || (a = l[n] = {
            exports: {}
        }, e[n].call(a.exports, a, a.exports, t)), a.exports
    }(700)
})();