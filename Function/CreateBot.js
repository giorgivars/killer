import WebSocket from "ws"
import fs from "fs"
import proxyAgent from "https-proxy-agent";
import axios from "axios"
import url from "url"
import { nomap } from "./Maps/NormalMap/MapNormal.js"
import { naleg } from "./Maps/NormalMap/LegNaMap.js"
import { euleg } from "./Maps/NormalMap/LegEuMap.js"
import { asleg } from "./Maps/NormalMap/LegAsMap.js"
import { nomap1 } from "./Maps/PathfindMap/MapNormal.js"
import { naleg1 } from "./Maps/PathfindMap/LegNaMap.js"
import { euleg1 } from "./Maps/PathfindMap/LegEuMap.js"
import { asleg1 } from "./Maps/PathfindMap/LegAsMap.js"
import { zmamap } from "./Maps/PathfindMap/zmamap.js"
let bros,tokens=[],Map_,forestok=!0,forestokk=!0,glitchedtokens=[],Options=JSON.parse(fs.readFileSync("./Options.json","utf8")),proxies,servers=[],serverss=[],blacklisted=[];Array.prototype.ForEach=function(t){for(var o=0;o<this.length;o++)t(this[o],o)},Array.prototype.has=function(e){let r=!1;return this.ForEach((t,o)=>{t==e&&(r=o)}),r};
let allbot = true;
let name=[process.env.user];
let getserv = (mode, smt, ok, a) => {
    mode = mode.toLowerCase()
    let rand = Math.floor(Math.random() * 3 + 1)
    var words = ['singapore','tokyo','fremont','toronto','frankfurt'];
	
var FUCKINGGG = words[Math.floor(Math.random() * words.length)]; 
    switch (mode) {
        case "pathfind": case "pathfinder": return `wss://${FUCKINGGG + rand}.starve.io/server711`
        case "farmred": case "unblockred": case "farmblue": case "unblockblue": case "kill": return `wss://${FUCKINGGG + rand}.starve.io/server712`
        case "tm": case "teamfortress": return `wss://${FUCKINGGG + rand}.starve.io/server747`
        case "hg": case "hunger": return `wss://${FUCKINGGG + rand}.starve.io/server736`
        case "xd": return `wss://dallas${rand}.starve.io/server3188`
        case `full`: case `score`: case `juice`: case `book`: case `afk`: case `hunt`: case "follow": case "target": case `none`: case `mama`:
            let linka = "wss://"
            
            let linke = "wss://"
            let baba = ""
            if (smt) {
                let a = blacklisted.has(smt)
                if (a !== false && mode !== "book") {
                    linka = "wss://ServerISDisabled"
                    linke = "wss://ServerISDisabled"
                } else {
                    if (smt.includes("wss://")) {
                        linka = smt
                    } else {
                        baba = smt
                        if(mode == "mama"){
                            rand = ok
                        }
                        if (smt.includes("eu")) {
                            linka += `${FUCKINGGG + rand}.starve.io/server-eu-${smt.includes("f") ? "forest-" : smt.includes("v") ? "vampire-" : smt.includes("z") ? "zombie-" : ""}${smt[smt.includes("f") || smt.includes("v") || smt.includes("z") ? 3 : 2]}`
                            linke += `${FUCKINGGG + rand}.starve.io/server-eu-${smt.includes("f") ? "forest-" : smt.includes("v") ? "vampire-" : smt.includes("z") ? "zombie-" : ""}${smt[smt.includes("f") || smt.includes("v") || smt.includes("z") ? 3 : 2]}`
                        } else if (smt.includes("na")) {
                            linka += `${FUCKINGGG + rand}.starve.io/server-na-${smt.includes("f") ? "forest-" : smt.includes("v") ? "vampire-" : smt.includes("z") ? "zombie-" : ""}${smt[smt.includes("f") || smt.includes("v") || smt.includes("z") ? 3 : 2]}`
                            linke += `${FUCKINGGG + rand}.starve.io/server-na-${smt.includes("f") ? "forest-" : smt.includes("v") ? "vampire-" : smt.includes("z") ? "zombie-" : ""}${smt[smt.includes("f") || smt.includes("v") || smt.includes("z") ? 3 : 2]}`
                        } else if (smt.includes("as")) {
                            linka += `${FUCKINGGG + rand}.starve.io/server-as${smt.includes("f") ? "-forest-" : smt.includes("v") ? "-vampire-" : smt.includes("z") ? "-zombie-" : ""}${smt[smt.includes("f") || smt.includes("v") || smt.includes("z") ? 3 : 2]}`
                            linke += `${FUCKINGGG + rand}.starve.io/server-as${smt.includes("f") ? "-forest-" : smt.includes("v") ? "-vampire-" : smt.includes("z") ? "-zombie-" : ""}${smt[smt.includes("f") || smt.includes("v") || smt.includes("z") ? 3 : 2]}`
                        } else if (smt.includes("wa")) {
                            linka += `${FUCKINGGG + rand}.starve.io/server-wa`
                            linke += `${FUCKINGGG + rand}.starve.io/server-wa`
                        } else if (smt.includes("au")) {
                            linka += `${FUCKINGGG + rand}.starve.io/server-au1`
                            linke += `${FUCKINGGG + rand}.starve.io/server-au1`
                        }
                    }
                }
                return a == true ? baba : ok == true ? linke : linka
            } else {
                return mode
            }
            break;
        default: return `None`
    }
}

let Bots = []
let Botss = []
let rid = 0
let BigInt = []

class Create {
    constructor(Name, serv, Mode, Path) {
        this.Actived = true
        this.Mode = Mode
        this.BotName = Name
        this.sa = serv
        this.serv = getserv(this.Mode, serv)
        this.law = getserv(this.Mode, serv, true)
        this.pogaerf = getserv(this.Mode, serv, true, true)
        this.Pathfind = {
            Path: Number(Path.Path),
            x: Number(Path.x),
            y: Number(Path.y),
            Tok1: Path.Tok1,
            Tok2: Path.Tok2
        }
        this.workingserv = null
        this.Ennemy = []
        this.botsid = []
        this.stopall = false
        this.TargetId = Path.TargetId == "all" ? Path.TargetId : Number(Path.TargetId)
        this.botalive = 0
        this.ServerFull = false
        this.chests = []
        this.lag = (Mode == "unblockred" || Mode == "unblockblue" ? true : false)
        this.paysage = false
        this.chestid = []
        this.chestnum = 0
        this.token;
        this.reco = Path.reco
        this.hoodcrafted = 0
        this.saddlecrafted = 0
        this.hoodrecycled = 0
        this.saddlerecycled = 0
        this.alt = Path.alt == "alt" ? true : false
        this.berryeated = 0
        this.bottleused = 0
        this.score = 0;
        this.pl = {
            health: 200,
            food: 200,
            cold: 200,
            water: 200
        }
        if (Mode == "score") {
            this.token = Path.x
        }
        if (Mode == "target") {
            let Sock = new WebSocket("wss://peatarget.herokuapp.com")
            Sock.binaryType = "arraybuffer"
            Sock.addEventListener("open", async () => {
                let a = setInterval(() => {
                    if (this.Actived == false) return clearInterval(a)
                    if (this.Ennemy) {
                        Sock.send(JSON.stringify([8, this.pogaerf, this.Ennemy]))
                    }
                }, 2500)
                Sock.addEventListener("message", async (msg) => {

                })
            })
        }
    }
    static addtoken = (tok) => {
        tokens.push(tok)
    }
    static deleteall = () => {
        tokens = []
    }
	static allbotstop = () => {
		allbot = false;
	}
	static allbotgo = () => {
		allbot = true;
	}
    static addbot = (bot) => {
        Bots.push(bot)
        switch (bot.Mode) {
            case "pathfind": case "xd": case "farmred": case "unblockred": case "farmblue": case "unblockblue":
                servers.ForEach((serv, env) => {
                    if (serv.serv == bot.Mode) {
                        return servers[env].bots.push(bot)
                    }
                })
                let bat = []
                bat.push(bot)
                servers.push({ serv: bot.Mode, bots: bat })
                break;
            default:
                servers.ForEach((serv, env) => {
                    if (serv.serv == bot.sa || serv.serv == bot.law) {
                        return servers[env].bots.push(bot)
                    }
                })
                let bater = []
                bater.push(bot)
                servers.push({ serv: bot.law ? bot.law : bot.law, bots: bater })
        }
    }
	    static addbott = (bot) => {
        Botss.push(bot)
        switch (bot.Mode) {
            case "pathfind": case "xd": case "farmred": case "unblockred": case "farmblue": case "unblockblue":
                serverss.ForEach((serv, env) => {
                    if (serv.serv == bot.Mode) {
                        return serverss[env].bots.push(bot)
                    }
                })
                let bat = []
                bat.push(bot)
                serverss.push({ serv: bot.Mode, bots: bat })
                break;
            default:
                serverss.ForEach((serv, env) => {
                    if (serv.serv == bot.sa || serv.serv == bot.law) {
                        return serverss[env].bots.push(bot)
                    }
                })
                let bater = []
                bater.push(bot)
                serverss.push({ serv: bot.law ? bot.law : bot.law, bots: bater })
        }
    }
    static spawn = (Bot, Agent, Prox) => {
       
		
		
        try {
			
			
            let bridges = []
            let bridgesid = []
            let collisionsbr = []
            let dropable = []
            let scam = []
            let IntervalTot = []
            let Entityq = []
            let Inventory = []
            let things = []
            let pay = Bot.paysage
            Bot.paysage = !Bot.paysage
            let Mob = []
            let agusga = false
            if (getserv(Bot.Mode, Bot.sa) == "None") return
            if (getserv(Bot.Mode, Bot.sa) && !Bot.serv.includes("wss")) return
            let serva = getserv(Bot.Mode, Bot.sa)
            let Sock = new WebSocket((Bot.workingserv !== null ? Bot.workingserv : serva == "na" ? Bot.serv : serva), { agent: Agent })
            let maperx = 0
            let mapery = 0
            if (Bot.Mode == "xd") {
                maperx = 100
                mapery = 100
                Map_ = zmamap
            } else {
                if (Bot.serv && Bot.serv.includes("forest")) {
                    maperx = 154
                    mapery = 154
                    Bot.serv.includes("-eu-") ? Map_ = Bot.Mode == "juice" || Bot.Mode == "full" || Bot.Mode == "book" ? euleg1 : euleg : Bot.serv.includes("-na-") ? Map_ = Bot.Mode == "juice" || Bot.Mode == "full" || Bot.Mode == "book" ? naleg1 : naleg : Map_ = Bot.Mode == "juice" || Bot.Mode == "full" || Bot.Mode == "book" ? asleg1 : asleg
                } else {
                    maperx = 230
                    mapery = 310
                    Map_ = Bot.Mode == "juice" || Bot.Mode == "full" || Bot.Mode == "book" ? nomap1 : nomap
                }
            }
           
            Sock.binaryType = "arraybuffer";
            let Sword = false
            let Pickaxe = false, Helmet = false
            Sock.addEventListener("open", async () => {
                if (Bot.stopall) return Sock.close()
                if (Bot.Actived == false) return (Sock.close())
                try {
			!function (t) { if ("object" == typeof exports) module.exports = t(); else if ("function" == typeof define && define.amd) define(t); else { var e; "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.PF = t() } }(function () { return function t(e, i, n) { function o(a, s) { if (!i[a]) { if (!e[a]) { var l = "function" == typeof require && require; if (!s && l) return l(a, true); if (r) return r(a, true); throw new Error("Cannot find module '" + a + "'") } var h = i[a] = { exports: {} }; e[a][0].call(h.exports, function (t) { var i = e[a][1][t]; return o(i || t) }, h, h.exports, t, e, i, n) } return i[a].exports } for (var r = "function" == typeof require && require, a = 0; a < n.length; a++)o(n[a]); return o }({ 1: [function (t, e, i) { e.exports = t("./lib/heap") }, { "./lib/heap": 2 }], 2: [function (t, e, i) { (function () { var t, i, n, o, r, a, s, l, h, u, p, c, f, d, g; n = Math.floor, u = Math.min, i = function (t, e) { return e > t ? -1 : t > e ? 1 : 0 }, h = function (t, e, o, r, a) { var s; if (null == o && (o = 0), null == a && (a = i), 0 > o) throw new Error("lo must be non-negative"); for (null == r && (r = t.length); r > o;)a(e, t[s = n((o + r) / 2)]) < 0 ? r = s : o = s + 1; return [].splice.apply(t, [o, o - o].concat(e)), e }, a = function (t, e, n) { return null == n && (n = i), t.push(e), d(t, 0, t.length - 1, n) }, r = function (t, e) { var n, o; return null == e && (e = i), n = t.pop(), t.length ? (o = t[0], t[0] = n, g(t, 0, e)) : o = n, o }, l = function (t, e, n) { var o; return null == n && (n = i), o = t[0], t[0] = e, g(t, 0, n), o }, s = function (t, e, n) { var o; return null == n && (n = i), t.length && n(t[0], e) < 0 && (e = (o = [t[0], e])[0], t[0] = o[1], g(t, 0, n)), e }, o = function (t, e) { var o, r, a, s, l, h; for (null == e && (e = i), l = [], r = 0, a = (s = function () { h = []; for (var e = 0, i = n(t.length / 2); i >= 0 ? i > e : e > i; i >= 0 ? e++ : e--)h.push(e); return h }.apply(this).reverse()).length; a > r; r++)o = s[r], l.push(g(t, o, e)); return l }, f = function (t, e, n) { var o; return null == n && (n = i), -1 !== (o = t.indexOf(e)) ? (d(t, 0, o, n), g(t, o, n)) : undefined }, p = function (t, e, n) { var r, a, l, h, u; if (null == n && (n = i), !(a = t.slice(0, e)).length) return a; for (o(a, n), l = 0, h = (u = t.slice(e)).length; h > l; l++)r = u[l], s(a, r, n); return a.sort(n).reverse() }, c = function (t, e, n) { var a, s, l, p, c, f, d, g, b; if (null == n && (n = i), 10 * e <= t.length) { if (!(l = t.slice(0, e).sort(n)).length) return l; for (s = l[l.length - 1], p = 0, f = (d = t.slice(e)).length; f > p; p++)n(a = d[p], s) < 0 && (h(l, a, 0, null, n), l.pop(), s = l[l.length - 1]); return l } for (o(t, n), b = [], c = 0, g = u(e, t.length); g >= 0 ? g > c : c > g; g >= 0 ? ++c : --c)b.push(r(t, n)); return b }, d = function (t, e, n, o) { var r, a, s; for (null == o && (o = i), r = t[n]; n > e && o(r, a = t[s = n - 1 >> 1]) < 0;)t[n] = a, n = s; return t[n] = r }, g = function (t, e, n) { var o, r, a, s, l; for (null == n && (n = i), r = t.length, l = e, a = t[e], o = 2 * e + 1; r > o;)r > (s = o + 1) && !(n(t[o], t[s]) < 0) && (o = s), t[e] = t[o], o = 2 * (e = o) + 1; return t[e] = a, d(t, l, e, n) }, t = function () { function t(t) { this.cmp = null != t ? t : i, this.nodes = [] } return t.push = a, t.pop = r, t.replace = l, t.pushpop = s, t.heapify = o, t.updateItem = f, t.nlargest = p, t.nsmallest = c, t.prototype.push = function (t) { return a(this.nodes, t, this.cmp) }, t.prototype.pop = function () { return r(this.nodes, this.cmp) }, t.prototype.peek = function () { return this.nodes[0] }, t.prototype.contains = function (t) { return -1 !== this.nodes.indexOf(t) }, t.prototype.replace = function (t) { return l(this.nodes, t, this.cmp) }, t.prototype.pushpop = function (t) { return s(this.nodes, t, this.cmp) }, t.prototype.heapify = function () { return o(this.nodes, this.cmp) }, t.prototype.updateItem = function (t) { return f(this.nodes, t, this.cmp) }, t.prototype.clear = function () { return this.nodes = [] }, t.prototype.empty = function () { return 0 === this.nodes.length }, t.prototype.size = function () { return this.nodes.length }, t.prototype.clone = function () { var e; return (e = new t).nodes = this.nodes.slice(0), e }, t.prototype.toArray = function () { return this.nodes.slice(0) }, t.prototype.insert = t.prototype.push, t.prototype.top = t.prototype.peek, t.prototype.front = t.prototype.peek, t.prototype.has = t.prototype.contains, t.prototype.copy = t.prototype.clone, t }(), (null != e ? e.exports : undefined) ? e.exports = t : window.Heap = t }).call(this) }, {}], 3: [function (t, e, i) { e.exports = { Always: 1, Never: 2, IfAtMostOneObstacle: 3, OnlyWhenNoObstacles: 4 } }, {}], 4: [function (t, e, i) { function n(t, e, i) { var n; "object" != typeof t ? n = t : (e = t.length, n = t[0].length, i = t), this.width = n, this.height = e, this.nodes = this._buildNodes(n, e, i) } var o = t("./Node"), r = t("./DiagonalMovement"); n.prototype._buildNodes = function (t, e, i) { var n, r, a = new Array(e); for (n = 0; e > n; ++n)for (a[n] = new Array(t), r = 0; t > r; ++r)a[n][r] = new o(r, n); if (undefined === i) return a; if (i.length !== e || i[0].length !== t) throw new Error("Matrix size does not fit"); for (n = 0; e > n; ++n)for (r = 0; t > r; ++r)i[n][r] && (a[n][r].walkable = false); return a }, n.prototype.getNodeAt = function (t, e) { return this.nodes[e][t] }, n.prototype.isWalkableAt = function (t, e) { return this.isInside(t, e) && this.nodes[e][t].walkable }, n.prototype.isInside = function (t, e) { return t >= 0 && t < this.width && e >= 0 && e < this.height }, n.prototype.setWalkableAt = function (t, e, i) { if (e >= 0 && t >= 0 && e < maperx && t < mapery) { this.nodes[e][t].walkable = i; } }, n.prototype.getNeighbors = function (t, e) { var i = t.x, n = t.y, o = [], a = false, s = false, l = false, h = false, u = false, p = false, c = false, f = false, d = this.nodes; if (this.isWalkableAt(i, n - 1) && (o.push(d[n - 1][i]), a = true), this.isWalkableAt(i + 1, n) && (o.push(d[n][i + 1]), l = true), this.isWalkableAt(i, n + 1) && (o.push(d[n + 1][i]), u = true), this.isWalkableAt(i - 1, n) && (o.push(d[n][i - 1]), c = true), e === r.Never) return o; if (e === r.OnlyWhenNoObstacles) s = c && a, h = a && l, p = l && u, f = u && c; else if (e === r.IfAtMostOneObstacle) s = c || a, h = a || l, p = l || u, f = u || c; else { if (e !== r.Always) throw new Error("Incorrect value of diagonalMovement"); s = true, h = true, p = true, f = true } return s && this.isWalkableAt(i - 1, n - 1) && o.push(d[n - 1][i - 1]), h && this.isWalkableAt(i + 1, n - 1) && o.push(d[n - 1][i + 1]), p && this.isWalkableAt(i + 1, n + 1) && o.push(d[n + 1][i + 1]), f && this.isWalkableAt(i - 1, n + 1) && o.push(d[n + 1][i - 1]), o }, n.prototype.clone = function () { var t, e, i = this.width, r = this.height, a = this.nodes, s = new n(i, r), l = new Array(r); for (t = 0; r > t; ++t)for (l[t] = new Array(i), e = 0; i > e; ++e)l[t][e] = new o(e, t, a[t][e].walkable); return s.nodes = l, s }, e.exports = n }, { "./DiagonalMovement": 3, "./Node": 6 }], 5: [function (t, e, i) { e.exports = { manhattan: function (t, e) { return t + e }, euclidean: function (t, e) { return Math.sqrt(t * t + e * e) }, octile: function (t, e) { var i = Math.SQRT2 - 1; return e > t ? i * t + e : i * e + t }, chebyshev: function (t, e) { return Math.max(t, e) } } }, {}], 6: [function (t, e, i) { e.exports = function (t, e, i) { this.x = t, this.y = e, this.walkable = undefined === i || i } }, {}], 7: [function (t, e, i) { function n(t) { for (var e = [[t.x, t.y]]; t.parent;)t = t.parent, e.push([t.x, t.y]); return e.reverse() } function o(t, e, i, n) { var o, r, a, s, l, h, u = Math.abs, p = []; for (o = i > t ? 1 : -1, r = n > e ? 1 : -1, l = (a = u(i - t)) - (s = u(n - e)); p.push([t, e]), t !== i || e !== n;)(h = 2 * l) > -s && (l -= s, t += o), a > h && (l += a, e += r); return p } i.backtrace = n, i.biBacktrace = function (t, e) { var i = n(t), o = n(e); return i.concat(o.reverse()) }, i.pathLength = function (t) { var e, i, n, o, r, a = 0; for (e = 1; e < t.length; ++e)i = t[e - 1], n = t[e], o = i[0] - n[0], r = i[1] - n[1], a += Math.sqrt(o * o + r * r); return a }, i.interpolate = o, i.expandPath = function (t) { var e, i, n, r, a, s, l = [], h = t.length; if (2 > h) return l; for (a = 0; h - 1 > a; ++a)for (e = t[a], i = t[a + 1], r = (n = o(e[0], e[1], i[0], i[1])).length, s = 0; r - 1 > s; ++s)l.push(n[s]); return l.push(t[h - 1]), l }, i.smoothenPath = function (t, e) { var i, n, r, a, s, l, h, u, p, c = e.length, f = e[0][0], d = e[0][1], g = e[c - 1][0], b = e[c - 1][1]; for (r = [[i = f, n = d]], a = 2; c > a; ++a) { for (h = o(i, n, (l = e[a])[0], l[1]), p = false, s = 1; s < h.length; ++s)if (u = h[s], !t.isWalkableAt(u[0], u[1])) { p = true; break } p && (lastValidCoord = e[a - 1], r.push(lastValidCoord), i = lastValidCoord[0], n = lastValidCoord[1]) } return r.push([g, b]), r }, i.compressPath = function (t) { if (t.length < 3) return t; var e, i, n, o, r, a, s = [], l = t[0][0], h = t[0][1], u = t[1][0], p = t[1][1], c = u - l, f = p - h; for (c /= r = Math.sqrt(c * c + f * f), f /= r, s.push([l, h]), a = 2; a < t.length; a++)e = u, i = p, n = c, o = f, c = (u = t[a][0]) - e, f = (p = t[a][1]) - i, f /= r = Math.sqrt(c * c + f * f), (c /= r) === n && f === o || s.push([e, i]); return s.push([u, p]), s } }, {}], 8: [function (t, e, i) { e.exports = { Heap: t("heap"), Node: t("./core/Node"), Grid: t("./core/Grid"), Util: t("./core/Util"), DiagonalMovement: t("./core/DiagonalMovement"), Heuristic: t("./core/Heuristic"), AStarFinder: t("./finders/AStarFinder"), BestFirstFinder: t("./finders/BestFirstFinder"), BreadthFirstFinder: t("./finders/BreadthFirstFinder"), DijkstraFinder: t("./finders/DijkstraFinder"), BiAStarFinder: t("./finders/BiAStarFinder"), BiBestFirstFinder: t("./finders/BiBestFirstFinder"), BiBreadthFirstFinder: t("./finders/BiBreadthFirstFinder"), BiDijkstraFinder: t("./finders/BiDijkstraFinder"), IDAStarFinder: t("./finders/IDAStarFinder"), JumpPointFinder: t("./finders/JumpPointFinder") } }, { "./core/DiagonalMovement": 3, "./core/Grid": 4, "./core/Heuristic": 5, "./core/Node": 6, "./core/Util": 7, "./finders/AStarFinder": 9, "./finders/BestFirstFinder": 10, "./finders/BiAStarFinder": 11, "./finders/BiBestFirstFinder": 12, "./finders/BiBreadthFirstFinder": 13, "./finders/BiDijkstraFinder": 14, "./finders/BreadthFirstFinder": 15, "./finders/DijkstraFinder": 16, "./finders/IDAStarFinder": 17, "./finders/JumpPointFinder": 22, heap: 1 }], 9: [function (t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.heuristic = t.heuristic || a.manhattan, this.weight = t.weight || 1, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = s.OnlyWhenNoObstacles : this.diagonalMovement = s.IfAtMostOneObstacle : this.diagonalMovement = s.Never), this.diagonalMovement === s.Never ? this.heuristic = t.heuristic || a.manhattan : this.heuristic = t.heuristic || a.octile } var o = t("heap"), r = t("../core/Util"), a = t("../core/Heuristic"), s = t("../core/DiagonalMovement"); n.prototype.findPath = function (t, e, i, n, a) { var s, l, h, u, p, c, f, d, g = new o(function (t, e) { return t.f - e.f }), b = a.getNodeAt(t, e), v = a.getNodeAt(i, n), A = this.heuristic, m = this.diagonalMovement, y = this.weight, k = Math.abs, M = Math.SQRT2; for (b.g = 0, b.f = 0, g.push(b), b.opened = true; !g.empty();) { if ((s = g.pop()).closed = true, s === v) return r.backtrace(v); for (u = 0, p = (l = a.getNeighbors(s, m)).length; p > u; ++u)(h = l[u]).closed || (c = h.x, f = h.y, d = s.g + (c - s.x == 0 || f - s.y == 0 ? 1 : M), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || y * A(k(c - i), k(f - n)), h.f = h.g + h.h, h.parent = s, h.opened ? g.updateItem(h) : (g.push(h), h.opened = true))) } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Util": 7, heap: 1 }], 10: [function (t, e, i) { function n(t) { o.call(this, t); var e = this.heuristic; this.heuristic = function (t, i) { return 1e6 * e(t, i) } } var o = t("./AStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./AStarFinder": 9 }], 11: [function (t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.heuristic = t.heuristic || a.manhattan, this.weight = t.weight || 1, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = s.OnlyWhenNoObstacles : this.diagonalMovement = s.IfAtMostOneObstacle : this.diagonalMovement = s.Never), this.diagonalMovement === s.Never ? this.heuristic = t.heuristic || a.manhattan : this.heuristic = t.heuristic || a.octile } var o = t("heap"), r = t("../core/Util"), a = t("../core/Heuristic"), s = t("../core/DiagonalMovement"); n.prototype.findPath = function (t, e, i, n, a) { var s, l, h, u, p, c, f, d, g = function (t, e) { return t.f - e.f }, b = new o(g), v = new o(g), A = a.getNodeAt(t, e), m = a.getNodeAt(i, n), y = this.heuristic, k = this.diagonalMovement, M = this.weight, W = Math.abs, w = Math.SQRT2; for (A.g = 0, A.f = 0, b.push(A), A.opened = 1, m.g = 0, m.f = 0, v.push(m), m.opened = 2; !b.empty() && !v.empty();) { for ((s = b.pop()).closed = true, u = 0, p = (l = a.getNeighbors(s, k)).length; p > u; ++u)if (!(h = l[u]).closed) { if (2 === h.opened) return r.biBacktrace(s, h); c = h.x, f = h.y, d = s.g + (c - s.x == 0 || f - s.y == 0 ? 1 : w), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || M * y(W(c - i), W(f - n)), h.f = h.g + h.h, h.parent = s, h.opened ? b.updateItem(h) : (b.push(h), h.opened = 1)) } for ((s = v.pop()).closed = true, u = 0, p = (l = a.getNeighbors(s, k)).length; p > u; ++u)if (!(h = l[u]).closed) { if (1 === h.opened) return r.biBacktrace(h, s); c = h.x, f = h.y, d = s.g + (c - s.x == 0 || f - s.y == 0 ? 1 : w), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || M * y(W(c - t), W(f - e)), h.f = h.g + h.h, h.parent = s, h.opened ? v.updateItem(h) : (v.push(h), h.opened = 2)) } } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Util": 7, heap: 1 }], 12: [function (t, e, i) { function n(t) { o.call(this, t); var e = this.heuristic; this.heuristic = function (t, i) { return 1e6 * e(t, i) } } var o = t("./BiAStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./BiAStarFinder": 11 }], 13: [function (t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = r.OnlyWhenNoObstacles : this.diagonalMovement = r.IfAtMostOneObstacle : this.diagonalMovement = r.Never) } var o = t("../core/Util"), r = t("../core/DiagonalMovement"); n.prototype.findPath = function (t, e, i, n, r) { var a, s, l, h, u, p = r.getNodeAt(t, e), c = r.getNodeAt(i, n), f = [], d = [], g = this.diagonalMovement; for (f.push(p), p.opened = true, p.by = 0, d.push(c), c.opened = true, c.by = 1; f.length && d.length;) { for ((l = f.shift()).closed = true, h = 0, u = (a = r.getNeighbors(l, g)).length; u > h; ++h)if (!(s = a[h]).closed) if (s.opened) { if (1 === s.by) return o.biBacktrace(l, s) } else f.push(s), s.parent = l, s.opened = true, s.by = 0; for ((l = d.shift()).closed = true, h = 0, u = (a = r.getNeighbors(l, g)).length; u > h; ++h)if (!(s = a[h]).closed) if (s.opened) { if (0 === s.by) return o.biBacktrace(s, l) } else d.push(s), s.parent = l, s.opened = true, s.by = 1 } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Util": 7 }], 14: [function (t, e, i) { function n(t) { o.call(this, t), this.heuristic = function (t, e) { return 0 } } var o = t("./BiAStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./BiAStarFinder": 11 }], 15: [function (t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = r.OnlyWhenNoObstacles : this.diagonalMovement = r.IfAtMostOneObstacle : this.diagonalMovement = r.Never) } var o = t("../core/Util"), r = t("../core/DiagonalMovement"); n.prototype.findPath = function (t, e, i, n, r) { var a, s, l, h, u, p = [], c = this.diagonalMovement, f = r.getNodeAt(t, e), d = r.getNodeAt(i, n); for (p.push(f), f.opened = true; p.length;) { if ((l = p.shift()).closed = true, l === d) return o.backtrace(d); for (h = 0, u = (a = r.getNeighbors(l, c)).length; u > h; ++h)(s = a[h]).closed || s.opened || (p.push(s), s.opened = true, s.parent = l) } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Util": 7 }], 16: [function (t, e, i) { function n(t) { o.call(this, t), this.heuristic = function (t, e) { return 0 } } var o = t("./AStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./AStarFinder": 9 }], 17: [function (t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.heuristic = t.heuristic || o.manhattan, this.weight = t.weight || 1, this.trackRecursion = t.trackRecursion || false, this.timeLimit = t.timeLimit || Infinity, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = a.OnlyWhenNoObstacles : this.diagonalMovement = a.IfAtMostOneObstacle : this.diagonalMovement = a.Never), this.diagonalMovement === a.Never ? this.heuristic = t.heuristic || o.manhattan : this.heuristic = t.heuristic || o.octile } var o = (t("../core/Util"), t("../core/Heuristic")), r = t("../core/Node"), a = t("../core/DiagonalMovement"); n.prototype.findPath = function (t, e, i, n, o) { var a, s, l, h = (new Date).getTime(), u = function (t, e) { return this.heuristic(Math.abs(e.x - t.x), Math.abs(e.y - t.y)) }.bind(this), p = function (t, e) { return t.x === e.x || t.y === e.y ? 1 : Math.SQRT2 }, c = function (t, e, i, n, a) { if (0, this.timeLimit > 0 && (new Date).getTime() - h > 1e3 * this.timeLimit) return Infinity; var s = e + u(t, d) * this.weight; if (s > i) return s; if (t == d) return n[a] = [t.x, t.y], t; var l, f, g, b, v = o.getNeighbors(t, this.diagonalMovement); for (g = 0, l = Infinity; b = v[g]; ++g) { if (this.trackRecursion && (b.retainCount = b.retainCount + 1 || 1, true !== b.tested && (b.tested = true)), (f = c(b, e + p(t, b), i, n, a + 1)) instanceof r) return n[a] = [t.x, t.y], f; this.trackRecursion && 0 == --b.retainCount && (b.tested = false), l > f && (l = f) } return l }.bind(this), f = o.getNodeAt(t, e), d = o.getNodeAt(i, n), g = u(f, d); for (a = 0; ; ++a) { if (Infinity === (l = c(f, 0, g, s = [], 0))) return []; if (l instanceof r) return s; g = l } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Node": 6, "../core/Util": 7 }], 18: [function (t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function (t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (!0 === this.trackJumpRecursion && (o.getNodeAt(t, e).tested = true), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r && 0 !== a) { if (o.isWalkableAt(t - r, e + a) && !o.isWalkableAt(t - r, e) || o.isWalkableAt(t + r, e - a) && !o.isWalkableAt(t, e - a)) return [t, e]; if (this._jump(t + r, e, t, e) || this._jump(t, e + a, t, e)) return [t, e] } else if (0 !== r) { if (o.isWalkableAt(t + r, e + 1) && !o.isWalkableAt(t, e + 1) || o.isWalkableAt(t + r, e - 1) && !o.isWalkableAt(t, e - 1)) return [t, e] } else if (o.isWalkableAt(t + 1, e + a) && !o.isWalkableAt(t + 1, e) || o.isWalkableAt(t - 1, e + a) && !o.isWalkableAt(t - 1, e)) return [t, e]; return this._jump(t + r, e + a, t, e) }, n.prototype._findNeighbors = function (t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p + n, c + o) && d.push([p + n, c + o]), f.isWalkableAt(p - n, c) || d.push([p - n, c + o]), f.isWalkableAt(p, c - o) || d.push([p + n, c - o])) : 0 === n ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + 1, c) || d.push([p + 1, c + o]), f.isWalkableAt(p - 1, c) || d.push([p - 1, c + o])) : (f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p, c + 1) || d.push([p + n, c + 1]), f.isWalkableAt(p, c - 1) || d.push([p + n, c - 1])); else for (l = 0, h = (a = f.getNeighbors(t, r.Always)).length; h > l; ++l)s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 19: [function (t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function (t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (!0 === this.trackJumpRecursion && (o.getNodeAt(t, e).tested = true), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r && 0 !== a) { if (o.isWalkableAt(t - r, e + a) && !o.isWalkableAt(t - r, e) || o.isWalkableAt(t + r, e - a) && !o.isWalkableAt(t, e - a)) return [t, e]; if (this._jump(t + r, e, t, e) || this._jump(t, e + a, t, e)) return [t, e] } else if (0 !== r) { if (o.isWalkableAt(t + r, e + 1) && !o.isWalkableAt(t, e + 1) || o.isWalkableAt(t + r, e - 1) && !o.isWalkableAt(t, e - 1)) return [t, e] } else if (o.isWalkableAt(t + 1, e + a) && !o.isWalkableAt(t + 1, e) || o.isWalkableAt(t - 1, e + a) && !o.isWalkableAt(t - 1, e)) return [t, e]; return o.isWalkableAt(t + r, e) || o.isWalkableAt(t, e + a) ? this._jump(t + r, e + a, t, e) : null }, n.prototype._findNeighbors = function (t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), (f.isWalkableAt(p, c + o) || f.isWalkableAt(p + n, c)) && d.push([p + n, c + o]), !f.isWalkableAt(p - n, c) && f.isWalkableAt(p, c + o) && d.push([p - n, c + o]), !f.isWalkableAt(p, c - o) && f.isWalkableAt(p + n, c) && d.push([p + n, c - o])) : 0 === n ? f.isWalkableAt(p, c + o) && (d.push([p, c + o]), f.isWalkableAt(p + 1, c) || d.push([p + 1, c + o]), f.isWalkableAt(p - 1, c) || d.push([p - 1, c + o])) : f.isWalkableAt(p + n, c) && (d.push([p + n, c]), f.isWalkableAt(p, c + 1) || d.push([p + n, c + 1]), f.isWalkableAt(p, c - 1) || d.push([p + n, c - 1])); else for (l = 0, h = (a = f.getNeighbors(t, r.IfAtMostOneObstacle)).length; h > l; ++l)s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 20: [function (t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function (t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (!0 === this.trackJumpRecursion && (o.getNodeAt(t, e).tested = true), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r && 0 !== a) { if (this._jump(t + r, e, t, e) || this._jump(t, e + a, t, e)) return [t, e] } else if (0 !== r) { if (o.isWalkableAt(t, e - 1) && !o.isWalkableAt(t - r, e - 1) || o.isWalkableAt(t, e + 1) && !o.isWalkableAt(t - r, e + 1)) return [t, e] } else if (0 !== a && (o.isWalkableAt(t - 1, e) && !o.isWalkableAt(t - 1, e - a) || o.isWalkableAt(t + 1, e) && !o.isWalkableAt(t + 1, e - a))) return [t, e]; return o.isWalkableAt(t + r, e) && o.isWalkableAt(t, e + a) ? this._jump(t + r, e + a, t, e) : null }, n.prototype._findNeighbors = function (t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) if (e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o) f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p, c + o) && f.isWalkableAt(p + n, c) && d.push([p + n, c + o]); else { var g; if (0 !== n) { g = f.isWalkableAt(p + n, c); var b = f.isWalkableAt(p, c + 1), v = f.isWalkableAt(p, c - 1); g && (d.push([p + n, c]), b && d.push([p + n, c + 1]), v && d.push([p + n, c - 1])), b && d.push([p, c + 1]), v && d.push([p, c - 1]) } else if (0 !== o) { g = f.isWalkableAt(p, c + o); var A = f.isWalkableAt(p + 1, c), m = f.isWalkableAt(p - 1, c); g && (d.push([p, c + o]), A && d.push([p + 1, c + o]), m && d.push([p - 1, c + o])), A && d.push([p + 1, c]), m && d.push([p - 1, c]) } } else for (l = 0, h = (a = f.getNeighbors(t, r.OnlyWhenNoObstacles)).length; h > l; ++l)s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 21: [function (t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function (t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (!0 === this.trackJumpRecursion && (o.getNodeAt(t, e).tested = true), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r) { if (o.isWalkableAt(t, e - 1) && !o.isWalkableAt(t - r, e - 1) || o.isWalkableAt(t, e + 1) && !o.isWalkableAt(t - r, e + 1)) return [t, e] } else { if (0 === a) throw new Error("Only horizontal and vertical movements are allowed"); if (o.isWalkableAt(t - 1, e) && !o.isWalkableAt(t - 1, e - a) || o.isWalkableAt(t + 1, e) && !o.isWalkableAt(t + 1, e - a)) return [t, e]; if (this._jump(t + 1, e, t, e) || this._jump(t - 1, e, t, e)) return [t, e] } return this._jump(t + r, e + a, t, e) }, n.prototype._findNeighbors = function (t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n ? (f.isWalkableAt(p, c - 1) && d.push([p, c - 1]), f.isWalkableAt(p, c + 1) && d.push([p, c + 1]), f.isWalkableAt(p + n, c) && d.push([p + n, c])) : 0 !== o && (f.isWalkableAt(p - 1, c) && d.push([p - 1, c]), f.isWalkableAt(p + 1, c) && d.push([p + 1, c]), f.isWalkableAt(p, c + o) && d.push([p, c + o])); else for (l = 0, h = (a = f.getNeighbors(t, r.Never)).length; h > l; ++l)s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 22: [function (t, e, i) { var n = t("../core/DiagonalMovement"), o = t("./JPFNeverMoveDiagonally"), r = t("./JPFAlwaysMoveDiagonally"), a = t("./JPFMoveDiagonallyIfNoObstacles"), s = t("./JPFMoveDiagonallyIfAtMostOneObstacle"); e.exports = function (t) { return (t = t || {}).diagonalMovement === n.Never ? new o(t) : t.diagonalMovement === n.Always ? new r(t) : t.diagonalMovement === n.OnlyWhenNoObstacles ? new a(t) : new s(t) } }, { "../core/DiagonalMovement": 3, "./JPFAlwaysMoveDiagonally": 18, "./JPFMoveDiagonallyIfAtMostOneObstacle": 19, "./JPFMoveDiagonallyIfNoObstacles": 20, "./JPFNeverMoveDiagonally": 21 }], 23: [function (t, e, i) { function n(t) { t = t || {}, this.heuristic = t.heuristic || a.manhattan, this.trackJumpRecursion = t.trackJumpRecursion || false } var o = t("heap"), r = t("../core/Util"), a = t("../core/Heuristic"); t("../core/DiagonalMovement"), n.prototype.findPath = function (t, e, i, n, a) { var s, l = this.openList = new o(function (t, e) { return t.f - e.f }), h = this.startNode = a.getNodeAt(t, e), u = this.endNode = a.getNodeAt(i, n); for (this.grid = a, h.g = 0, h.f = 0, l.push(h), h.opened = true; !l.empty();) { if ((s = l.pop()).closed = true, s === u) return r.expandPath(r.backtrace(u)); this._identifySuccessors(s) } return [] }, n.prototype._identifySuccessors = function (t) { var e, i, n, o, r, s, l, h, u, p, c = this.grid, f = this.heuristic, d = this.openList, g = this.endNode.x, b = this.endNode.y, v = t.x, A = t.y, m = Math.abs; for (Math.max, o = 0, r = (e = this._findNeighbors(t)).length; r > o; ++o)if (i = e[o], n = this._jump(i[0], i[1], v, A)) { if (s = n[0], l = n[1], (p = c.getNodeAt(s, l)).closed) continue; h = a.octile(m(s - v), m(l - A)), u = t.g + h, (!p.opened || u < p.g) && (p.g = u, p.h = p.h || f(m(s - g), m(l - b)), p.f = p.g + p.h, p.parent = t, p.opened ? d.updateItem(p) : (d.push(p), p.opened = true)) } }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Util": 7, heap: 1 }] }, {}, [8])(8) });
                    let taken = Bot.lag ? "❤" : "❤"
                    Sock.send(JSON.stringify([Bot.BotName ? Bot.BotName : name[Math.floor(Math.random() * name.length)], 4000, 4000, 52, Bot.Mode == "score" ? Bot.token : "", Bot.Mode == "score" ? Bot.token_id : "", 0, 0, 0, 0, 0, 0, 0, Bot.Pathfind.Tok1, Bot.Pathfind.Tok2, null, (taken ? taken : tokens.pop() || tokens.shift())]));
					let myPlayer = {
                        id: 0,
                        x: 0,
                        y: 0,
                        rid: 0
                    }
                    let Updatepos = (pos) => {
                        Sock.send(JSON.stringify([1, pos.x - 400, pos.y - 400]))
                    }
                    for (var i = 0; i < 100; i++) {
                        Entityq[i] = []
                    }
					 let p = []
                    function findpath(myPlayer, End, mapx, mapy, act) {
                        if (End.x <= mapx && End.x >= 0 && End.y <= mapy && End.y >= 0) {
                            var grid = new PF.Grid(mapx, mapy);
                            for (let i = 0; i < Map_.length; i++) {
                                for (let j = 0; j < Map_[i].length; j++) {
                                    if (Map_[i][j].length != 0) {
                                        let arr = Map_[i][j]["la"] || Map_[i][j]["cs"] || Map_[i][j]["t"] || Map_[i][j]["b"] || Map_[i][j]["f"] || Map_[i][j]["plm"] || Map_[i][j]["p"] || Map_[i][j]["g"] || Map_[i][j]["s"] || Map_[i][j]["re"] || Map_[i][j]["c"] || Map_[i][j]["a"] || Map_[i][j]["m"] || false;
                                        if (arr) {
                                            for (let k = 0; k < arr.length; k++) {
                                                if (arr[k]) {
                                                    if (Math.floor(arr[k][0].x / 100) == End.x && Math.floor(arr[k][0].y / 100) == End.y) {
                                                        continue;
                                                    };
                                                    try {
                                                        grid.setWalkableAt(Math.floor((arr[k][0].x) / 100), Math.floor((arr[k][0].y) / 100), false);
                                                        grid.setWalkableAt(Math.floor((arr[k][0].x) / 100) + 1, Math.floor((arr[k][0].y) / 100), false);
                                                        grid.setWalkableAt(Math.floor((arr[k][0].x) / 100) - 1, Math.floor((arr[k][0].y) / 100), false);
                                                        grid.setWalkableAt(Math.floor((arr[k][0].x) / 100), Math.floor((arr[k][0].y) / 100) + 1, false);
                                                        grid.setWalkableAt(Math.floor((arr[k][0].x) / 100), Math.floor((arr[k][0].y) / 100) - 1, false);
                                                    } catch (err) { }
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            let O = Entityq[4];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[7];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[8];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[9];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[19];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[34];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[32];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[22];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[18];

                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[21];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[17];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[16];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[15];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[2];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            O = Entityq[29];
                            for (let i = 0; i < O.length; i++) {
                                if (Math.round(O[i].x / 100) == End.x && Math.round(O[i].y / 100) == End.y) {
                                    continue;
                                };
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) + 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100), Math.round(O[i].y / 100) - 1, false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) + 1, Math.round(O[i].y / 100), false);
                                grid.setWalkableAt(Math.round(O[i].x / 100) - 1, Math.round(O[i].y / 100), false);
                            };
                            var finder = new PF.AStarFinder({ allowDiagonal: true });
                            try {
                                var path = finder.findPath(myPlayer.x, myPlayer.y, End.x, End.y, grid);
                                if (path.length < 5 && act) {
                                    switch (act.action) {
                                        case "hit":
                                            if (path.length < 2) {
                                                Sock.send([5, act.item])
                                                let e = 2 * Math.PI
                                                let EnemyAngle = Math.floor((((Number(Math.atan2(act.Near.y - act.myPlayer.y, act.Near.x - act.myPlayer.x)) + e) % e) * 255) / e)
                                                Sock.send([3, EnemyAngle])
                                                Sock.send([4, EnemyAngle])
                                                lastalo = act.Near
                                            } else {
                                                Sock.send([5, 7])
                                                Sock.send([14])
                                            }
                                            break;
                                        case "drop":
                                            if (Bot.chests.length > 0) {
                                                Bot.chests.ForEach((chest) => {
                                                    let ch = chest
                                                    act.item.ForEach((item) => {
                                                        Sock.send(JSON.stringify([8, item, 255, Number(ch.ownerid), Number(ch.chestid)]))
                                                    })

                                                })
                                            } else {
                                                act.item.ForEach((item) => {
                                                    Sock.send(JSON.stringify([6, item]))
                                                })
                                            }
                                            break;
                                    }
                                };
                                if (path.length === 0) {
                                    Sock.send(JSON.stringify([2, Math.random() > 0.5 ? 6 : 9]));
                                    return;
                                };
                                if (path[1]) {
                                    if (myPlayer.x == path[1][0] && myPlayer.y + 1 == path[1][1]) Sock.send(JSON.stringify([2, 4]));
                                    if (myPlayer.x == path[1][0] && myPlayer.y - 1 == path[1][1]) Sock.send(JSON.stringify([2, 8]));
                                    if (myPlayer.x - 1 == path[1][0] && myPlayer.y == path[1][1]) Sock.send(JSON.stringify([2, 1]));
                                    if (myPlayer.x + 1 == path[1][0] && myPlayer.y == path[1][1]) Sock.send(JSON.stringify([2, 2]));
                                    if (myPlayer.x - 1 == path[1][0] && myPlayer.y - 1 == path[1][1]) Sock.send(JSON.stringify([2, 9]));
                                    if (myPlayer.x - 1 == path[1][0] && myPlayer.y + 1 == path[1][1]) Sock.send(JSON.stringify([2, 5]));
                                    if (myPlayer.x + 1 == path[1][0] && myPlayer.y - 1 == path[1][1]) Sock.send(JSON.stringify([2, 10]));
                                    if (myPlayer.x + 1 == path[1][0] && myPlayer.y + 1 == path[1][1]) Sock.send(JSON.stringify([2, 6]));
                                };
                            } catch (e) { }
                        };
                    };
                    let Aloe = []
                    function updatear() {
                        Bot.Ennemy = []
                    }
                    let HandleData = (a, e, d) => {
                        a = new Uint16Array(a);
                        d && updatear()
                        d = (e.length - 2) / 18;
                        for (var c = 0; c < d; c++) {
                            var f = 2 + (18 * c),
                                g = 1 + (9 * c),
                                h = e[f],
                                k = a[g + 1],
                                l = a[g + 5],
                                n = (h * 1000) + l;

                            // else {
                            var q = a[g + 2],
                                r = a[g + 3],
                                u = a[g + 4],
                                x = a[g + 6],
                                y = a[g + 7],
                                g = a[g + 8],
                                f = ((e[f + 1] / 255) * Math.PI) * 2;
                            if (scam[n]) {

                            } else {
                                scam[n] = h
                                Entityq[q] = []
                                Entityq[q].push(h)
                            }
                            if (r + u == 0) return


                            if (h == myPlayer.id && myPlayer.id !== 0) {
                                myPlayer.x = r, myPlayer.y = u
                                Updatepos(myPlayer)
                            } else if (q == 0 && Bot.botsid.has(h) == false) {
                                Bot.Ennemy[h] = { x: r, y: u, id: h }
                                if (Bot.Ennemy[myPlayer.id]) {
                                    Bot.Ennemy.splice(myPlayer.id, 1)
                                }
                            } else if (q == 60 || q == 61) {
                                let Animal = {
                                    x: r, y: u
                                }
                                Mob[h] = Animal
                            } else if (q == 11 && !Bot.chestid[h + " " + l]) {
                                let chest = {
                                    angle: f,
                                    x: r,
                                    y: u,
                                    ownerid: h,
                                    chestid: l
                                }
                                Bot.chestid[h + " " + l] = "Fuck"
                                if (chest.x - 750 < Bot.Pathfind.x && chest.x + 750 > Bot.Pathfind.x && chest.y - 750 < Bot.Pathfind.y && chest.y + 750 > Bot.Pathfind.y || Bot.Mode == "farmred" || Bot.Mode == "farmblue") {
                                    Bot.chests.push(chest)
                                }
                            } else if (q == 89) {
                                let aloe = {
                                    x: r, y: u, id: l, le: 0
                                }
                                if (Aloe.length > 0 && Aloe.has(aloe) !== false) {
                                    aloe.le = Aloe.has(aloe)
                                    Aloe[Aloe.has(aloe)] = aloe
                                } else {
                                    aloe.le = Aloe.length
                                    Aloe.push(aloe)
                                }
                            } else if (q == 30 && !bridgesid[l] && Bot.Mode !== "farmred" && Bot.Mode !== "farmblue" && Bot.Mode !== "unblockred" && Bot.Mode !== "unblockblue") {
                                let bridge = {
                                    angle: f,
                                    x: r,
                                    y: u,
                                    ownerid: h,
                                    chestid: l
                                }
                                bridgesid[l] = "Fuck"
                                bridges.push(bridge)
                            } else if (h && l && !things[l + r + u]) {
                                let bridge = {
                                    angle: f,
                                    x: r,
                                    y: u,
                                    ownerid: h,
                                    chestid: l
                                }
                                bridgesid[l + r + u] = "Fuck"
                                things.push(bridge)
                            }
                            // }
                        }
                    }
                    let PathFind = (x2, y2) => {
                        if (agusga == true) return
                        let y1 = myPlayer.y, x1 = myPlayer.x;
                        let Pathfind = 0
                        Bot.Pathfind.x = x2, Bot.Pathfind.y = y2
                        if (Math.floor(y1 / 100) == Math.floor(y2 / 100)) {
                            if (x1 < x2 - 45 && Pathfind == 0) Pathfind += 2;
                            if (x1 > x2 + 45 && Pathfind == 0) Pathfind += 1;
                        } else {
                            if (y1 < y2 - 45 && Pathfind == 0) Pathfind += 4;
                            if (y1 > y2 + 45 && Pathfind == 0) Pathfind += 8;
                        }
                        Sock.send([2, Pathfind])
                    }

                    let isincoll = (x, y, d) => {
                        let namx = 0
                        let namy = 0
                        if (d !== null) {
                            switch (d) {
                                case 1:
                                    namx = -100
                                    break;
                                case 2:
                                    namx = +100
                                    break;
                                case 4:
                                    namy = +100
                                    break;
                                case 8:
                                    namy = -100
                                    break;
                                case 5:
                                    namx = -100
                                    namy = +100
                                    break;
                                case 6:
                                    namx = +100
                                    namy = +100
                                    break;
                                case 9:
                                    namy = -100
                                    namx = -100
                                    break;
                                case 10:
                                    namy = -100
                                    namx = +100
                                    break;
                            }
                            if (myPlayer.x + namx > x - 550 && myPlayer.x + namx < x + 550 && myPlayer.y + namy > y - 550 && myPlayer.y + namy < y + 550) {
                                return true
                            } else {
                                return false
                            }
                        } else {
                            if (myPlayer.x > x - 550 && myPlayer.x < x + 550 && myPlayer.y > y - 500 && myPlayer.y < y + 500) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                    let checkf = (r, e) => {
                        if (r > e) {
                            return r - e
                        } else {
                            return e - r
                        }
                    }
                    let checkcollision = (going) => {
                        bridges.ForEach((bridge) => {
                            if (checkf(myPlayer.x, bridge.x) < 400 && checkf(myPlayer.y, bridge.y) < 400) {
                                return true
                            }
                        })
                        return false
                    }
                    let checkcola = (going) => {
                        let Pathfind = 0
                        things.ForEach((tree) => {
                            let iq = {
                                x: tree[3] * 100,
                                y: tree[4] * 100,
                                size: tree[2],
                                type: tree[1]
                            }
                            if (checkf(myPlayer.x, iq.x) < 400 && checkf(myPlayer.y, iq.y) < 400) {
                                if (myPlayer.y < iq.y) Pathfind = 4; // -- vv
                                if (myPlayer.y > iq.y) Pathfind = 8; // ++ ^^
                                if (myPlayer.x < iq.x) Pathfind = 2; // -- >> 
                                if (myPlayer.x > iq.x) Pathfind = 1; // ++ <<
                                if (going == Pathfind) {//-0.02536584537907684
                                    // droite c haut
                                    let ych1 = checkf(myPlayer.y, iq.y - 50), ych2 = checkf(myPlayer.y, iq.y + 50), xch1 = checkf(myPlayer.x, iq.x - 50), xch2 = checkf(myPlayer.x, iq.x + 50), ang = going == 2 ? 255 : going == 1 ? 155 : going = 4 ? -255 : -155, col5 = checkcolla({ x: myPlayer.x + 100, y: myPlayer.y - 100 }), col9 = checkcolla({ x: myPlayer.x + 100, y: myPlayer.y + 100 }), col8 = checkcolla({ x: myPlayer.x, y: myPlayer.y + 100 }), col4 = checkcolla({ x: myPlayer.x, y: myPlayer.y - 100 }), col1 = checkcolla({ x: myPlayer.x + 150, y: myPlayer.y }), col2 = checkcolla({ x: myPlayer.x - 100, y: myPlayer.y }), col6 = checkcolla({ x: myPlayer.x - 100, y: myPlayer.y - 100 }), col10 = checkcolla({ x: myPlayer.x - 100, y: myPlayer.y + 100 })
                                    // Sock.send([3,ang])
                                    switch (Pathfind) {
                                        case 1:
                                            going = col5 && col4 && Pathfind !== 5 ? 5 : col9 && col8 && Pathfind !== 9 ? 9 : col4 && Pathfind !== 4 ? 4 : col8 && Pathfind !== 8 ? 8 : 1
                                            break;
                                        case 2:
                                            going = col6 && col4 && Pathfind !== 6 ? 6 : col10 && col8 && Pathfind !== 10 ? 10 : col4 && Pathfind !== 4 ? 4 : col8 && Pathfind !== 8 ? 8 : 2
                                            break;
                                        case 4:
                                            going = col6 && col2 && Pathfind !== 6 ? 6 : col5 && col1 && Pathfind !== 5 ? 5 : col1 && Pathfind !== 1 ? 1 : col2 && Pathfind !== 2 ? 2 : 4
                                            break;
                                        case 8:
                                            going = col9 && col1 && Pathfind !== 9 ? 9 : col10 && col2 && Pathfind !== 10 ? 10 : col1 && Pathfind !== 1 ? 1 : col2 && Pathfind !== 2 ? 2 : 8
                                            break;
                                        case 5:
                                            going = col4 && col1 && Pathfind !== 4 ? 4 : col1 && Pathfind !== 1 ? 1 : col6 && Pathfind !== 6 ? 6 : col2 && Pathfind !== 2 ? 2 : 5
                                            break;
                                        case 6:
                                            going = col4 && Pathfind !== 4 ? 4 : col2 && Pathfind !== 2 ? 2 : col5 && Pathfind !== 5 ? 5 : col1 && Pathfind !== 1 ? 1 : 6
                                            break;
                                        case 9:
                                            going = col8 && Pathfind !== 8 ? 8 : col1 && Pathfind !== 1 ? 1 : col10 && Pathfind !== 10 ? 10 : col2 && Pathfind !== 2 ? 2 : 9
                                            break;
                                        case 10:
                                            going = col8 && Pathfind !== 8 ? 8 : col2 && Pathfind !== 2 ? 2 : col9 && Pathfind !== 9 ? 9 : col1 && Pathfind !== 1 ? 1 : 10
                                            break;
                                    }
                                    return going

                                }
                            }
                        })
                        return going
                    }
                    let checkcolla = (my) => {
                        Map_.ForEach((collision) => {
                            let coll = {
                                type: collision[1],
                                x: collision[3] * 100,
                                y: collision[4] * 100
                            }
                            if (checkf(my.x, coll.x) < 100 && checkf(my.y, coll.y) < 100 && coll.type !== "de") {
                                return false
                            }
                        })
                        return true
                    }
                    let checkcollision2 = (going) => {
                        let Pathfind = 0
                        Map_.ForEach((tree) => {
                            let iq = {
                                x: tree[3] * 100,
                                y: tree[4] * 100,
                                size: tree[2],
                                type: tree[1]
                            }
                            if (checkf(myPlayer.x, iq.x) < 400 && checkf(myPlayer.y, iq.y) < 400) {
                                if (myPlayer.y < iq.y) Pathfind = 4; // -- vv
                                if (myPlayer.y > iq.y) Pathfind = 8; // ++ ^^
                                if (myPlayer.x < iq.x) Pathfind = 2; // -- >> 
                                if (myPlayer.x > iq.x) Pathfind = 1; // ++ <<
                                if (going == Pathfind) {//-0.02536584537907684
                                    // droite c haut
                                    let ych1 = checkf(myPlayer.y, iq.y - 50), ych2 = checkf(myPlayer.y, iq.y + 50), xch1 = checkf(myPlayer.x, iq.x - 50), xch2 = checkf(myPlayer.x, iq.x + 50), ang = going == 2 ? 255 : going == 1 ? 155 : going = 4 ? -255 : -155, col5 = checkcolla({ x: myPlayer.x + 100, y: myPlayer.y - 100 }), col9 = checkcolla({ x: myPlayer.x + 100, y: myPlayer.y + 100 }), col8 = checkcolla({ x: myPlayer.x, y: myPlayer.y + 100 }), col4 = checkcolla({ x: myPlayer.x, y: myPlayer.y - 100 }), col1 = checkcolla({ x: myPlayer.x + 150, y: myPlayer.y }), col2 = checkcolla({ x: myPlayer.x - 100, y: myPlayer.y }), col6 = checkcolla({ x: myPlayer.x - 100, y: myPlayer.y - 100 }), col10 = checkcolla({ x: myPlayer.x - 100, y: myPlayer.y + 100 })
                                    // Sock.send([3,ang])
                                    switch (Pathfind) {
                                        case 1:
                                            going = col5 && col4 && Pathfind !== 5 ? 5 : col9 && col8 && Pathfind !== 9 ? 9 : col4 && Pathfind !== 4 ? 4 : col8 && Pathfind !== 8 ? 8 : 1
                                            break;
                                        case 2:
                                            going = col6 && col4 && Pathfind !== 6 ? 6 : col10 && col8 && Pathfind !== 10 ? 10 : col4 && Pathfind !== 4 ? 4 : col8 && Pathfind !== 8 ? 8 : 2
                                            break;
                                        case 4:
                                            going = col6 && col2 && Pathfind !== 6 ? 6 : col5 && col1 && Pathfind !== 5 ? 5 : col1 && Pathfind !== 1 ? 1 : col2 && Pathfind !== 2 ? 2 : 4
                                            break;
                                        case 8:
                                            going = col9 && col1 && Pathfind !== 9 ? 9 : col10 && col2 && Pathfind !== 10 ? 10 : col1 && Pathfind !== 1 ? 1 : col2 && Pathfind !== 2 ? 2 : 8
                                            break;
                                        case 5:
                                            going = col4 && col1 && Pathfind !== 4 ? 4 : col1 && Pathfind !== 1 ? 1 : col6 && Pathfind !== 6 ? 6 : col2 && Pathfind !== 2 ? 2 : 5
                                            break;
                                        case 6:
                                            going = col4 && Pathfind !== 4 ? 4 : col2 && Pathfind !== 2 ? 2 : col5 && Pathfind !== 5 ? 5 : col1 && Pathfind !== 1 ? 1 : 6
                                            break;
                                        case 9:
                                            going = col8 && Pathfind !== 8 ? 8 : col1 && Pathfind !== 1 ? 1 : col10 && Pathfind !== 10 ? 10 : col2 && Pathfind !== 2 ? 2 : 9
                                            break;
                                        case 10:
                                            going = col8 && Pathfind !== 8 ? 8 : col2 && Pathfind !== 2 ? 2 : col9 && Pathfind !== 9 ? 9 : col1 && Pathfind !== 1 ? 1 : 10
                                            break;
                                    }
                                    return going

                                }
                            }
                        })
                        return going
                    }
                    let calccolmath = (cal) => {
                        let Pathfind = 0
                        let x1 = collisionsbr.x, y1 = collisionsbr.y
                        if (myPlayer.y < y1) Pathfind += 4; // -- vv
                        if (myPlayer.y > y1) Pathfind += 8; // ++ ^^
                        if (myPlayer.x < x1) Pathfind += 2; // -- >> 
                        if (myPlayer.x > x1) Pathfind += 1; // ++ <<
                        if (Pathfind == cal) {
                            switch (Number(cal)) {
                                case 1: return checkf(myPlayer.y, y1 - 50) > checkf(myPlayer.y, y1 + 50) ? 5 : 9;
                                case 2: return checkf(myPlayer.y, y1 - 50) > checkf(myPlayer.y, y1 + 50) ? 6 : 10;
                                case 4: return checkf(myPlayer.x, x1 - 50) > checkf(myPlayer.x, x1 + 50) ? 6 : 5;
                                case 8: return checkf(myPlayer.x, x1 - 50) > checkf(myPlayer.x, x1 + 50) ? 10 : 9;
                                case 5: return 4;
                                case 6: return 2;
                                case 9: return 1;
                                case 10: return 8;
                                default: return cal
                            }
                        } else {
                            return cal
                        }
                    }
                    let PathFind2 = (x2, y2) => {
                        let y1 = myPlayer.y, x1 = myPlayer.x;
                        let Pathfind = 0
                        if (y1 < y2 - 45) Pathfind += 4;
                        if (y1 > y2 + 45) Pathfind += 8;
                        if (x1 < x2 - 75) Pathfind += 2;
                        if (x1 > x2 + 75) Pathfind += 1;
                        if (checkcollision()) {
                            Sock.send([2, calccolmath(Pathfind)])
                        } else {
                            Sock.send([2, Pathfind])
                        }
                        if (y1 > y2 - Options.Pathfind.Seafarm.RangeBeforeDrop.y && y1 < y2 + Options.Pathfind.Seafarm.RangeBeforeDrop.y && x1 > x2 - Options.Pathfind.Seafarm.RangeBeforeDrop.x && x1 < x2 + Options.Pathfind.Seafarm.RangeBeforeDrop.x) {
                            Chestall(x2, y2)
                        }
                    }
                    let PathFind99 = (x2, y2) => {
                        let y1 = myPlayer.y, x1 = myPlayer.x;
                        let Pathfind = 0
                        if (y1 < y2 - 75) Pathfind += 4;
                        if (y1 > y2 + 75) Pathfind += 8;
                        if (x1 < x2 - 75) Pathfind += 2;
                        if (x1 > x2 + 75) Pathfind += 1;
                        Sock.send([2, checkcollision2(Pathfind)])
                        if (y1 > y2 - 500 && y1 < y2 + 500 && x1 > x2 - 500 && x1 < x2 + 500) {
                            if (Bot.chests.length > 0) {
                                Bot.chests.ForEach((chest) => {
                                    let ch = chest

                                    Sock.send(JSON.stringify([8, 28, 100, Number(ch.ownerid), Number(ch.chestid)]))
                                    Sock.send(JSON.stringify([8, 104, 100, Number(ch.ownerid), Number(ch.chestid)]))
                                    Sock.send(JSON.stringify([8, 232, 100, Number(ch.ownerid), Number(ch.chestid)]))
                                    Sock.send(JSON.stringify([8, 107, 100, Number(ch.ownerid), Number(ch.chestid)]))
                                    Sock.send(JSON.stringify([8, 184, 100, Number(ch.ownerid), Number(ch.chestid)]))

                                })
                            } else {
                                Sock.send(JSON.stringify([6, 28]))
                                Sock.send(JSON.stringify([6, 104]))
                                Sock.send(JSON.stringify([6, 232]))
                                Sock.send(JSON.stringify([6, 107]))
                                Sock.send(JSON.stringify([6, 184]))
                            }
                        }
                    }
                    let Pathfind_ = (x, Nearest, s) => {
                        let y1 = myPlayer.y, x1 = myPlayer.x, x2 = Nearest ? Nearest.x : x, y2 = Nearest ? Nearest.y : 0;
                        let Pathfind = 0
                        if (y1 < y2 - 55 && Nearest) Pathfind += 4;
                        if (y1 > y2 + 55 && Nearest) Pathfind += 8;
                        if (x1 < x2 - 55) Pathfind += 2
                        if (x1 > x2 + 55) Pathfind += 1
                        if (y1 > y2 - 200 && y1 < y2 + 200 && x1 > x2 - 200 && x1 < x2 + 200) {
                            if (s) {
                                let e = 2 * Math.PI
                                let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([3, EnemyAngle])
                                EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([2, Pathfind])
                            } else {
                                Sock.send([5, 0])
                                let e = 2 * Math.PI
                                let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([3, EnemyAngle])
                                EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([4, EnemyAngle])
                                Sock.send([2, Pathfind])
                            }
                        } else {
                            Sock.send([14])
                            Sock.send([5, 8])
                            Sock.send([2, checkcollision2(Pathfind)])
                        }
                    }
                    let Pathfinde = (x, Nearest, s) => {
                        let y1 = myPlayer.y, x1 = myPlayer.x, x2 = Nearest ? Nearest.x : x, y2 = Nearest ? Nearest.y : 0;
                        let Pathfind = 0
                        if (y1 < y2 - 55 && Nearest) Pathfind += 4;
                        if (y1 > y2 + 55 && Nearest) Pathfind += 8;
                        if (x1 < x2 - 55) Pathfind += 2
                        if (x1 > x2 + 55) Pathfind += 1
                        if (y1 > y2 - 200 && y1 < y2 + 200 && x1 > x2 - 200 && x1 < x2 + 200) {
                            if (s) {
                                let e = 2 * Math.PI
                                let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([3, EnemyAngle])
                                EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([2, Pathfind])
                            } else {
                                Sock.send([5, 57])
                                let e = 2 * Math.PI
                                let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([3, EnemyAngle])
                                EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                Sock.send([4, EnemyAngle])
                                Sock.send([2, Pathfind])
                            }

                        } else {
                            Sock.send([14])
                            Sock.send([5, 8])
                            Sock.send([2, checkcollision2(Pathfind)])
                        }
                    }
                    let parted = 0
                    let downe = 0
                    let PathFind9c = (x2, y2) => {
                        let y1 = myPlayer.y, x1 = myPlayer.x;
                        if (parted) {
                            let Pathfind = 0
                            if (y1 < y2 - 25) Pathfind += 4;
                            if (y1 > y2 + 25) Pathfind += 8;
                            if (x1 < x2 - 55) Pathfind += 2
                            if (x1 > x2 + 55) Pathfind += 1
                            if (y1 > y2 - 100 && y1 < y2 + 100 && x1 > x2 - 100 && x1 < x2 + 100) {
                                Sock.send(JSON.stringify([0, "I Love You ❤❤ : " + rid]))
                                Sock.send(JSON.stringify([6, 103]))
                                Sock.send(JSON.stringify([6, 59]))
                                Sock.send(JSON.stringify([6, 62]))
                                Sock.send(JSON.stringify([6, 16]))
                                Sock.send(JSON.stringify([6, 77]))
                                Sock.send(JSON.stringify([5, 7]))
                                Sock.send([14])
                                Sock.send([5, 59])


                                let Nearest = Bot.Ennemy[rid]
                                if (!Nearest) return

                                Sock.send([2, 0])
                            } else {
                                let Nearest = Bot.Ennemy[rid]

                                if (Nearest) {
                                    let e = 2 * Math.PI
                                    let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                    Sock.send([3, EnemyAngle])
                                    Sock.send(JSON.stringify([5, 36]))
                                    Sock.send([4, EnemyAngle])
                                } else {
                                    let GetNearest = () => {
                                        let Trees = new Map()
                                        Bot.Ennemy.forEach((ennemy) => {
                                            var tree = ennemy
                                            let iq = {
                                                x: ennemy.x,
                                                y: ennemy.y
                                            }
                                            Trees.set(tree, iq)
                                        })
                                        let pos = myPlayer
                                        let dist = (pl1, pl2) => {
                                            return Math.sqrt(Math.pow(pl1.y - pl2.y, 2) + Math.pow(pl1.x - pl2.x, 2));
                                        }
                                        try {
                                            let Nearest = [...Trees.entries()].sort(function (line, i) {
                                                return dist(line[1], pos) - dist(i[1], pos);
                                            })[0][1];
                                            return Nearest
                                        } catch (ee) { }
                                    }
                                    Nearest = GetNearest()
                                    Pathfind = 0
                                    x2 = Nearest.x, y2 = Nearest.y
                                    if (y1 < y2 - 25) Pathfind += 4;
                                    if (y1 > y2 + 25) Pathfind += 8;
                                    if (x1 < x2 - 55) Pathfind += 2
                                    if (x1 > x2 + 55) Pathfind += 1
                                    let e = 2 * Math.PI
                                    let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                                    Sock.send(JSON.stringify([5, 16]))
                                    Sock.send([4, EnemyAngle])
                                }
                            }
                            Sock.send([2, checkcola(Pathfind)])
                        }
                    }
                    let PathFind9 = (x2, y2) => {
                        let y1 = myPlayer.y, x1 = myPlayer.x;
                        let Pathfind = 0
                        if (y1 < y2 - 25) Pathfind += 4;
                        if (y1 > y2 + 25) Pathfind += 8;
                        if (x1 < x2 - 55) Pathfind += 2
                        if (x1 > x2 + 55) Pathfind += 1
                        if (y1 > y2 - 100 && y1 < y2 + 100 && x1 > x2 - 100 && x1 < x2 + 100) {
                            Sock.send(JSON.stringify([0, "Trolling id " + rid]))
                            let Nearest = Bot.Ennemy[rid]
                            if (!Nearest) return
                            let e = 2 * Math.PI
                            let EnemyAngle = Math.floor((((Number(Math.atan2(Nearest.y - myPlayer.y, Nearest.x - myPlayer.x)) + e) % e) * 255) / e)
                            Sock.send([3, EnemyAngle])
                        }
                        Sock.send([2, Pathfind])
                    }
                    let Dropall = (itemid) => {
                        Sock.send(JSON.stringify([6, itemid]))
                    }
                    let Chall = () => {
                        if (Bot.chests && Bot.chests.length > 0) {
                            Bot.chests.ForEach((chest) => {
                                if (!chest) return
                                Sock.send(JSON.stringify([8, 89, 100, Number(chest.ownerid), Number(chest.chestid)]))
                                Sock.send(JSON.stringify([8, 104, 100, Number(chest.ownerid), Number(chest.chestid)]))
                                Sock.send(JSON.stringify([8, 35, 100, Number(chest.ownerid), Number(chest.chestid)]))
                                Sock.send(JSON.stringify([8, 28, 100, Number(chest.ownerid), Number(chest.chestid)]))
                                Sock.send(JSON.stringify([8, 122, 100, Number(chest.ownerid), Number(chest.chestid)]))
                            })
                        } else {
                            Sock.send([6, 89])
                            Sock.send([6, 104])
                            Sock.send([6, 35])
                            Sock.send([6, 28])
                            Sock.send([6, 122])
                        }
                    }
                    let Chestall = (posx, posy) => {
                        Bot.chests.ForEach((chest) => {
                            if (!chest) return
                            for (var a = 0; a < Options.Pathfind.Seafarm.drop.length; a++) {
                                if (chest.y > posy - Options.Pathfind.Seafarm.RangeBeforeDrop.y && chest.y < posy + Options.Pathfind.Seafarm.RangeBeforeDrop.y && chest.x > posx - Options.Pathfind.Seafarm.RangeBeforeDrop.x && chest.x < posx + Options.Pathfind.Seafarm.RangeBeforeDrop.x) {
                                    Sock.send(JSON.stringify([8, Options.Pathfind.Seafarm.drop[a], 100, Number(chest.ownerid), Number(chest.chestid)]))
                                } else {
                                    Bot.chests.splice(Bot.chestnum, 1);
                                }
                            }
                        })
                    }
                    let Message;
                    let Message2;
                    let Require = (itemid) => {
                        if (Message !== true) {
                            Sock.send([7, itemid])
                        } else if (Message2 == true) {
                            if (itemid == 4) {
                                Sock.send(JSON.stringify([0, "Crafted what? oh.."]))
                                Pickaxe = true
                                Message = false
                                Message2 = false
                                Sock.send([5, 8])
                                Sock.send([10, 107, 254, 0])
                                Sock.send([10, 107, 120, 0])
                                Sock.send([5, 104])
                            } else if (itemid == 34) {
                                Sock.send([14])
                                Sword = true
                                Message = false
                                Message2 = false
                                Sock.send([5, 8])
                                Sock.send(JSON.stringify([0, "Crafted Sword Bro go kill"]))
                            } else {
                                Helmet = true
                                Message = false
                                Message2 = false
                                Sock.send([5, 58])
                                Sock.send(JSON.stringify([0, "Crafted Helmet yeah im stronger"]))
                            }
                        }
                    };
                    let dataint = 0

                    let lastempty2 = null
                    let lastempty = null
                    let lasttree = null
                    let lastalo = null
					let stopa = false;
                    Sock.onmessage = (message) => {
                        if (stopa) return Sock.close()
                        let mese;
                        switch (typeof message.data) {
                            case "string":
                                mese = JSON.parse(message.data);
                                switch (mese[0]) {
                                    case 0:
                                        switch (mese[2].split(" ")[0]) {
                                            case `res`:
                                                Sock.send(JSON.stringify([0, `I Have ${Inventory[103]} Woods `]))
                                                setTimeout(() => {
                                                    Sock.send(JSON.stringify([0, `I Have ${Inventory[102]} Stones `]))
                                                }, 1000)

                                                break;
                                            case "setdropable":
                                                dropable.push(Number(mese[2].split(" ")[1]))
                                                break;
											case `dropall`:
											for (var ia = 0; i < 300; ia++) {
                                                Sock.send(JSON.stringify([6, ia]))
											}
                                                break;
                                            case `ch`:
                                                break;
                                            case "<‎3":
                                                rid = Number(mese[1]);
                                                break;
                                            case "mob":
                                                break;
                                            case "s‎end":
                                                agusga = true
                                                Sock.send(JSON.stringify([2, Number(mese[2].split(" ")[1])]))
                                                setTimeout(() => {
                                                    agusga = false
                                                }, 3000)
                                                break;
                                            case `book`:
                                                Sock.send([6, 28])
                                                break;
                                        }
                                        break;
                                    case 3:
                                        if (serva !== "na" && Bot.workingserv == null) {
                                            Bot.workingserv = serva
                                            setTimeout(() => {
                                                Bot.workingserv = null
                                            }, 5000)
                                        }
                                        myPlayer.x = mese[3]
                                        myPlayer.y = mese[10]
                                        myPlayer.id = mese[9]
                                        Bot.botsid.push(myPlayer.id)

                                        if (Bot.Ennemy[myPlayer.id]) {
                                            Bot.Ennemy.splice(myPlayer.id, 1)
                                        }
                                        if (mese[13] > Bot.score) Bot.score = mese[13];

                                        Updatepos(myPlayer)

                                        switch (Bot.Mode) {
                                            case "pathfind":
                                            case "pathfinder":
                                                Sock.send(JSON.stringify([5, 217]))
                                                let shat = setInterval(() => {
                                                    PathFind2(Number(Bot.Pathfind.x), Number(Bot.Pathfind.y))
                                                }, 60)
                                                IntervalTot.push(shat)
                                                break;
                                            case "follow":
                                                let Target = Bot.Ennemy[Bot.TargetId]
                                                let agae23 = setInterval(() => {
                                                    let Near = Target
                                                    if (Near) {
                                                    findpath({ x: Math.floor(myPlayer.x / 100), y: Math.floor(myPlayer.y / 100) }, { x: Math.floor(Near.x / 100), y: Math.floor(Near.y / 100) }, Bot.serv && Bot.serv.includes("forest") ? 154 : 230, Bot.serv && Bot.serv.includes("forest") ? 154 : 310, { action: "", item: 0, Near: Near, myPlayer: myPlayer })
                                                    }
                                                }, 60)
                                                IntervalTot.push(agae23)
                                                break;
                                            case `hunt`:
                                                let sw = false
                                                let GetNearest2 = () => {
                                                    let Trees = new Map()
                                                    if (Sword == true) {
                                                        let Target = Bot.Ennemy[Bot.TargetId]
                                                        if (!Target) Target = { x: 0, y: 0 }
                                                        Trees.set(Target, Target)
                                                        sw = true
                                                    } else {
                                                        Sock.send([5, 8])
                                                        Map_.ForEach((tree) => {
                                                            if (Helmet == true && Sword == true || Mob.length > 0 && Sword == true && !Bot.serv.includes("forest")) {
                                                                if (tree[1] == "s" && tree !== lastempty) {
                                                                    let iq = {
                                                                        x: tree[3] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                        y: tree[4] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                        size: tree[2],
                                                                        type: tree[1],
                                                                        tree: tree
                                                                    }
                                                                    Trees.set(tree, iq)
                                                                }
                                                            } else {
                                                                if (tree[1] == "t" && tree !== lastempty || tree[1] == "b" && tree !== lastempty) {
                                                                    let iq = {
                                                                        x: tree[3] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                        y: tree[4] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                        size: tree[2],
                                                                        type: tree[1],
                                                                        tree: tree
                                                                    }
                                                                    Trees.set(tree, iq)
                                                                }
                                                            }
                                                        })
                                                    }
                                                    let pos = myPlayer
                                                    let dist = (pl1, pl2) => {
                                                        return Math.sqrt(Math.pow(pl1.y - pl2.y, 2) + Math.pow(pl1.x - pl2.x, 2));
                                                    }

                                                    let Nearest = [...Trees.entries()].sort(function (line, i) {
                                                        return dist(line[1], pos) - dist(i[1], pos);
                                                    });
                                                    if (!Nearest[0]) return
                                                    return Nearest[0][1]
                                                }
                                                let agae2 = setInterval(() => {
                                                    let Near = GetNearest2()
                                                    if (sw) {
                                                        if (Near) {
                                                            Pathfinde("forest", Near)
                                                            //   findpath({ x: Math.floor(myPlayer.x / 100), y: Math.floor(myPlayer.y / 100) }, { x: Math.floor(Near.x / 100), y: Math.floor(Near.y / 100) }, Bot.serv && Bot.serv.includes("forest") ? 154 : 230, Bot.serv && Bot.serv.includes("forest") ? 154 : 310, { action: "hit", item: 57, Near: Near, myPlayer: myPlayer })
                                                        }
                                                    } else {
                                                        if (Bot.serv.includes("forest")) {
                                                            Pathfinde("forest", Near)
                                                        } else {
                                                            Pathfinde("forest", Near)
                                                        }
                                                    }
                                                    if (Pickaxe !== true) {
                                                        Require(4)
                                                    } else if (Helmet !== true) {
                                                        Require(87)
                                                    } else if (Sword !== true) {
                                                        Require(34)
                                                    }
                                                }, 60)
                                                IntervalTot.push(agae2)
                                                break;
                                            case `target`:
                                                IntervalTot.push(setInterval(() => {
                                                    if (Bot.Ennemy.length < 1 || Bot.Ennemy[Bot.TargetId] == null) return
                                                    Pathfinde("forest", Bot.Ennemy[Bot.TargetId], true)
                                                }, 60))
                                                break;
                                            case `score`:
                                                if (Bot.token == "aloeverra") {
                                                    let GetNearest = () => {

                                                        let AloeVerra = new Map()
                                                        if (Aloe.length < 1) return null
                                                        Aloe.ForEach((aloe) => {
                                                            if (aloe == null) return
                                                            let alo = { x: aloe.x, y: aloe.y, id: aloe.id }
                                                            if (alo == lastalo) return
                                                            AloeVerra.set(aloe, alo)
                                                        })

                                                        let pos = myPlayer
                                                        let dist = (pl1, pl2) => {
                                                            return Math.sqrt(Math.pow(pl1.y - pl2.y, 2) + Math.pow(pl1.x - pl2.x, 2));
                                                        }
                                                        try {
                                                            let Nearest = [...AloeVerra.entries()].sort(function (line, i) {
                                                                return dist(line[1], pos) - dist(i[1], pos);
                                                            })[0][1]
                                                            return Nearest
                                                        } catch (err) { }

                                                    }
                                                    let agae = setInterval(() => {
                                                        let Near = GetNearest()
                                                        if (myPlayer.x < 9300) {
                                                            findpath({ x: Math.floor(myPlayer.x / 100), y: Math.floor(myPlayer.y / 100) }, { x: Math.floor(9700 / 100), y: Math.floor(24100 / 100) }, Bot.serv && Bot.serv.includes("forest") ? 154 : 230, Bot.serv && Bot.serv.includes("forest") ? 154 : 310, { action: "", item: 0, Near: Near, myPlayer: myPlayer })
                                                        } else {
                                                            if (Near) {
                                                                findpath({ x: Math.floor(myPlayer.x / 100), y: Math.floor(myPlayer.y / 100) }, { x: Math.floor(Near.x / 100), y: Math.floor(Near.y / 100) }, Bot.serv && Bot.serv.includes("forest") ? 154 : 230, Bot.serv && Bot.serv.includes("forest") ? 154 : 310, { action: "hit", item: 0, Near: Near, myPlayer: myPlayer })
                                                            } else {
                                                                Sock.send([2, 2])
                                                            }
                                                        }
                                                    }, 60)
                                                    IntervalTot.push(agae)
                                                } else {
                                                    let GetNearest = () => {
                                                        let Trees = new Map()
                                                        if (Sword == true && !Bot.serv.includes("forest") && Mob.length > 0) {
                                                            Sock.send([5, 57])
                                                            Mob.ForEach((mob) => {
                                                                let animal = {
                                                                    x: mob.x,
                                                                    y: mob.y
                                                                }
                                                                Trees.set(mob, animal)
                                                            })
                                                        } else {
                                                            Sock.send([5, 8])
                                                            for (var tr = 0; tr < Map_.length; tr++) {
                                                                var tree = Map_[tr]
                                                                if (Helmet == true || Mob.length > 0 && Sword == true && !Bot.serv.includes("forest")) {
                                                                    if (tree[1] == "s" && tree !== lastempty && tree !== lastempty2) {
                                                                        let iq = {
                                                                            x: tree[3] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                            y: tree[4] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                            size: tree[2],
                                                                            type: tree[1],
                                                                            tree: tree
                                                                        }
                                                                        Trees.set(tree, iq)
                                                                    }
                                                                } else {
                                                                    if (tree[1] == "t" && tree !== lastempty && tree !== lastempty2 || tree[1] == "b" && tree !== lastempty && tree !== lastempty2) {
                                                                        let iq = {
                                                                            x: tree[3] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                            y: tree[4] * (Bot.serv.includes("forest") ? 1 : 100),
                                                                            size: tree[2],
                                                                            type: tree[1],
                                                                            tree: tree
                                                                        }
                                                                        Trees.set(tree, iq)
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        let pos = myPlayer
                                                        let dist = (pl1, pl2) => {
                                                            return Math.sqrt(Math.pow(pl1.y - pl2.y, 2) + Math.pow(pl1.x - pl2.x, 2));
                                                        }
                                                        try {
                                                            let Nearest = [...Trees.entries()].sort(function (line, i) {
                                                                return dist(line[1], pos) - dist(i[1], pos);
                                                            })[0][1];
                                                            return Nearest
                                                        } catch (ee) { }
                                                    }
                                                    let agae = setInterval(() => {
                                                        let Near = GetNearest()
                                                        if (!Near) return// console.log(Map_)
                                                        lasttree = Near.tree
                                                        let e = 2 * Math.PI
                                                        let EnemyAngle = Math.floor((((Number(Math.atan2(Near.y - myPlayer.y, Near.x - myPlayer.x)) + e) % e) * 255) / e)
                                                        Sock.send([4, EnemyAngle])
                                                        if (Bot.serv.includes("forest")) {
                                                            Pathfinde("forest", Near)
                                                        } else {
                                                            Pathfinde("forest", Near)
                                                        }
                                                        if (Pickaxe !== true) {
                                                            Require(4)
                                                        } else if (Helmet !== true) {
                                                            Require(87)
                                                        }
                                                    }, 60)
                                                    IntervalTot.push(agae)
                                                }
                                                break;
                                            case "juice":
                                                let juicy = setInterval(() => {
                                                    //PathFind99(Bot.Pathfind.x, Bot.Pathfind.y)
                                                      findpath({ x: Math.floor(myPlayer.x / 100), y: Math.floor(myPlayer.y / 100) }, { x: Math.floor(Bot.Pathfind.x / 100), y: Math.floor(Bot.Pathfind.y / 100) }, Bot.serv && Bot.serv.includes("forest") ? 154 : 230, Bot.serv && Bot.serv.includes("forest") ? 154 : 310, { action: "drop", item: [28, 104, 232, 107, 184] })
                                                }, 60)
                                                IntervalTot.push(juicy)
                                                break;
                                            case "book":
                                                let booky = setInterval(() => {
                                                    //PathFind99(Bot.Pathfind.x, Bot.Pathfind.y)
                                                    findpath({ x: Math.floor(myPlayer.x / 100), y: Math.floor(myPlayer.y / 100) }, { x: Math.floor(Bot.Pathfind.x / 100), y: Math.floor(Bot.Pathfind.y / 100) }, Bot.serv && Bot.serv.includes("forest") ? 154 : 230, Bot.serv && Bot.serv.includes("forest") ? 154 : 310, { action: "drop", item: [28, 104, 232, 107, 184] })
                                                    if (Date.now() - dataint > 2000) {
                                                        dataint = Date.now()
                                                        Sock.send(JSON.stringify([0, `:)`]))
                                                    }
                                                }, 60)
                                                IntervalTot.push(booky)
                                                break;
                                            case "full":
                                                let anotheronee = setInterval(() => {
                                                    Sock.send(JSON.stringify([5, 104]))
                                                }, 2000)
                                                IntervalTot.push(anotheronee)
                                                break;
                                            case "xd":
                                                //Sock.send(JSON.stringify([6,139]))
                                                if (Number(Bot.Pathfind.lol) == 1) {
                                                    Sock.send(JSON.stringify([2, 4]))
                                                    setTimeout(() => {
                                                        Sock.send(JSON.stringify([2, 1]))
                                                        setTimeout(() => {
                                                            Sock.send(JSON.stringify([2, 0]))
                                                            parted = true
                                                            Sock.send([5, 59])
                                                        }, 4000)
                                                    }, 3500)
                                                } else {
                                                    Sock.send(JSON.stringify([2, 1]))
                                                    setTimeout(() => {
                                                        Sock.send(JSON.stringify([2, 4]))
                                                        setTimeout(() => {
                                                            Sock.send(JSON.stringify([2, 0]))
                                                            parted = true
                                                            Sock.send([5, 59])
                                                        }, 4000)
                                                    }, 3500)
                                                }
                                                let hunhrye = setInterval(() => {
                                                    if (!parted) return
                                                    let Nearest = Bot.Ennemy[rid]
                                                    if (!Nearest) Nearest = { x: 0, y: 0 }
                                                    PathFind9c(Nearest.x, Nearest.y)
                                                }, 300)
                                                IntervalTot.push(hunhrye)
                                                break;
                                            case "hg":
                                            case "hunger":
                                                let hunhry = setInterval(() => {
                                                    let Nearest = Bot.Ennemy[rid]
                                                    if (!Nearest) return
                                                    PathFind9(Nearest.x, Nearest.y)
                                                }, 300)
                                                IntervalTot.push(hunhry)
                                                break;
                                            case "tm":
                                            case "teamfortress":
                                                let tfa = setInterval(() => {
                                                    Sock.send(JSON.stringify([0, "PEANUT THE BEST"]))
                                                    Sock.send(JSON.stringify([2, myPlayer.x < 6000 ? 2 : 1]))
                                                    //  if(myPlayer.rid == 0 || !player[myPlayer.rid].x) return
                                                    // PathFind9(player[myPlayer.rid].x,player[myPlayer.rid].y)
                                                }, 300)
                                                IntervalTot.push(tfa)
                                                break;
                                            case "kill":
                                                let kaka = false
                                                let GetNearest_ = () => {
                                                    let Trees = new Map()
                                                    let Target = Bot.Ennemy[Bot.TargetId]
                                                    Trees.set(Target, Target)
                                                    let pos = myPlayer
                                                    let dist = (pl1, pl2) => {
                                                        return Math.sqrt(Math.pow(pl1.y - pl2.y, 2) + Math.pow(pl1.x - pl2.x, 2));
                                                    }
                                                    let Nearest = [...Trees.entries()].sort(function (line, i) {
                                                        return dist(line[1], pos) - dist(i[1], pos);
                                                    })[0][1];
                                                    return Nearest
                                                }
                                                setTimeout(() => {
                                                    kaka = true
                                                }, 2500)
                                                IntervalTot.push(setInterval(() => {
                                                    if (kaka) {
                                                        let Neare = GetNearest_()
                                                        Pathfind_("forest", Neare)
                                                    } else {
                                                        if (myPlayer.y > 1900) {
                                                            PathFind(11488, 2350)
                                                        } else {
                                                            PathFind(11550, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                        }
                                                    }
                                                },400))
                                                break;
                                            case "unblockred":
                                                let shiat = setInterval(() => {
                                                    let e = 2 * Math.PI
                                                    let EnemyAngle
                                                    if (myPlayer.x < 6000) {
                                                        EnemyAngle = Math.floor((((3.1372885194801707 + e) % e) * 255) / e)
                                                        if (myPlayer.y > 1900) {
                                                            PathFind(1200, 2350)
                                                        } else {
                                                            PathFind(1050, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                        }
                                                    } else {
                                                        EnemyAngle = Math.floor((((0.08134186360997542 + e) % e) * 255) / e)
                                                        if (myPlayer.y > 1900) {
                                                            PathFind(11488, 2350)
                                                        } else {
                                                            PathFind(11550, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                        }
                                                    }
                                                    Sock.send(JSON.stringify([4, Number(EnemyAngle)]))
                                                    Sock.send(JSON.stringify([5, 35]))
                                                }, 60)
                                                IntervalTot.push(shiat)
                                                break;
                                            case "unblockblue":
                                                let sget = setInterval(() => {
                                                    let e = 2 * Math.PI
                                                    let EnemyAngle = Math.floor((((3.1372885194801707 + e) % e) * 255) / e)
                                                    Sock.send(JSON.stringify([4, Number(EnemyAngle)]))
                                                    Sock.send(JSON.stringify([5, 35]))
                                                    if (myPlayer.y > 1900) {
                                                        PathFind(1200, 2350)
                                                    } else {
                                                        PathFind(1050, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                    }
                                                }, 60)
                                                IntervalTot.push(sget)
                                                break;
                                            case "farmred":
                                                let ageagaeg = setInterval(() => {
                                                    if (myPlayer.x > 6000) {
                                                        PathFind(11584, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                    } else {
							    Sock.close()
                                                        //PathFind(1050, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                    }
                                                    Chall()
                                                }, 60)
                                                IntervalTot.push(ageagaeg)
                                                break;
                                            case "farmblue":
                                                let ada = setInterval(() => {
                                                    Chall()
                                                    if (myPlayer.x < 6000) {
                                                        PathFind(11584, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                    } else {
                                                        PathFind(1050, (Bot.Pathfind.Path == 1 ? 1350 : Bot.Pathfind.Path == 2 ? 1450 : Bot.Pathfind.Path == 3 ? 1550 : Bot.Pathfind.Path == 4 ? 1650 : 1750))
                                                    }
                                                    if (Date.now() - dataint > 2000) {
                                                        dataint = Date.now()
                                                        Sock.send(JSON.stringify([0, `:)`]))
                                                    }
                                                }, 60)
                                                IntervalTot.push(ada)
                                                break;
                                        }
                                        break;
                                }
                                break;

                            default:
                                mese = new Uint8Array(message.data);
                                switch (mese[0]) {
                                    case 0:
                                        HandleData(message.data, mese, false)
                                        break;
                                    case 1:
                                        HandleData(message.data, mese, true)
                                        break;
                                    case 3:
                                        if (!Inventory[mese[2]]) Inventory[mese[2]] = 0;
                                        switch (mese[2]) {
                                            case 103:
                                                Inventory[mese[2]] += Pickaxe == true ? 2 : 1
                                                break;
                                            case 102:
                                                Inventory[mese[2]] += 1
                                                break;
                                        }
                                        break;
                                    case 17:
                                        let sage = new Uint16Array(message.data)
                                        myPlayer.x = sage[1], myPlayer.y = sage[2]
                                        Updatepos(myPlayer)
                                        break;
                                    case 18:
                                        lastempty2 = lastempty
                                        lastempty = lasttree
                                        Sock.send(JSON.stringify([0, `${(lastempty && lastempty[1] && lastempty[1] == "s") ? "Stone" : "Tree"} Is Empty`]))
                                        break;
                                    case 36:
                                        Sock.send(JSON.stringify([11]))
                                        break;
                                    case 59:
                                        Sock.send(JSON.stringify([11]))
                                        break;
                                    case 9:
                                        Message = true
                                        switch (mese[1]) {
                                            case 4:
                                                Inventory[103] -= 10
                                                break;
                                            case 87:
                                                Inventory[103] -= 50
                                                break;
                                            case 34:
                                                Inventory[103] -= 30
                                                break;
                                            case 3:
                                                Inventory[103] -= 20
                                                Inventory[102] -= 10
                                                break;
                                        }
                                        break;
                                    case 8:
                                        Message2 = true
                                        break;
									case 5:
                                        break;
                                    case 25:
                                        for (var i = 0; i < Bot.botsid.length; i++) {
                                            let botaf = Bot.botsid[i]
                                            if (botaf == myPlayer.id) {
                                                Bot.botsid.splice(i, 1)
                                            }
                                        }
                                        for (var i = 0; i < IntervalTot.length; i++) {
                                            clearInterval(IntervalTot[i])
                                        }
										Sock.close()
									
                                        Sock.removeAllListeners()
                                        break;

                                }
                        }
                    }
                    Sock.onerror = (error) => {
                    }
                    Sock.onclose = () => {
						
                        if (myPlayer && myPlayer.id) {
                            for (var i = 0; i < Bot.botsid.length; i++) {
                                let botaf = Bot.botsid[i]
                                if (botaf == myPlayer.id) {
                                    Bot.botsid.splice(i, 1)
                                }
                            }
                        }
                        for (var i = 0; i < IntervalTot.length; i++) {
                            clearInterval(IntervalTot[i])
                        }
                        Sock.removeAllListeners()
                    }
                } catch (e) {
                }
            })
        } catch (err) {
        }
    }
    static glitchtoken(token) {
        if (glitchedtokens.has(token) !== false) {
            glitchedtokens = []
        } else {
            glitchedtokens.push(token)
                const proxy = proxies[Math.floor(Math.random() * proxies.length)];
                const options = url.parse("http://" + proxy);
                const agent = new proxyAgent(options);
                modee.ForEach((mo) => {
                    Create.glitch(agent, token, mo)
                })
        }
    }
	    static afkb() {
			
		}
    static blacklist(a1) {
        if (blacklisted.has(a1) !== false) {
            blacklisted = []
        } else {
            blacklisted.push(a1)
        }
    }
}
let modee = [];

axios.get("https://raw.githubusercontent.com/giorgivars/killer/main/usr.txt").then(res => {
    proxies = res.data.split("\n")

    let GetProx = () => {
        const ma = setInterval(() => {
            servers.ForEach((server) => {
                let Bot = server.bots[Math.floor(Math.random() * server.bots.length)]
                for (var i = 0; i < 100; i++) {
                    if (Bot.Actived == true && Bot.Mode !== "afk") {
                        const proxy = proxies[Math.floor(Math.random() * proxies.length)];
                        const options = url.parse("http://" + proxy);
                        const agent = new proxyAgent(options);
                        Create.spawn(Bot, agent, proxy)
                    }
                }
            })
        }, 200)
        BigInt.push(ma)
    }
    GetProx()

})
export default Create
