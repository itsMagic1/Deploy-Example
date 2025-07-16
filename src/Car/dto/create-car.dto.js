"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarDto = void 0;
var class_validator_1 = require("class-validator");
var CreateCarDto = function () {
    var _a;
    var _modelo_decorators;
    var _modelo_initializers = [];
    var _modelo_extraInitializers = [];
    var _marca_decorators;
    var _marca_initializers = [];
    var _marca_extraInitializers = [];
    var _color_decorators;
    var _color_initializers = [];
    var _color_extraInitializers = [];
    var _ownerId_decorators;
    var _ownerId_initializers = [];
    var _ownerId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateCarDto() {
                this.modelo = __runInitializers(this, _modelo_initializers, void 0);
                this.marca = (__runInitializers(this, _modelo_extraInitializers), __runInitializers(this, _marca_initializers, void 0));
                this.color = (__runInitializers(this, _marca_extraInitializers), __runInitializers(this, _color_initializers, void 0));
                this.ownerId = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _ownerId_initializers, void 0));
                __runInitializers(this, _ownerId_extraInitializers);
            }
            return CreateCarDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _modelo_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsDefined)()];
            _marca_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsDefined)()];
            _color_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsDefined)()];
            _ownerId_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.IsDefined)()];
            __esDecorate(null, null, _modelo_decorators, { kind: "field", name: "modelo", static: false, private: false, access: { has: function (obj) { return "modelo" in obj; }, get: function (obj) { return obj.modelo; }, set: function (obj, value) { obj.modelo = value; } }, metadata: _metadata }, _modelo_initializers, _modelo_extraInitializers);
            __esDecorate(null, null, _marca_decorators, { kind: "field", name: "marca", static: false, private: false, access: { has: function (obj) { return "marca" in obj; }, get: function (obj) { return obj.marca; }, set: function (obj, value) { obj.marca = value; } }, metadata: _metadata }, _marca_initializers, _marca_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: function (obj) { return "color" in obj; }, get: function (obj) { return obj.color; }, set: function (obj, value) { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _ownerId_decorators, { kind: "field", name: "ownerId", static: false, private: false, access: { has: function (obj) { return "ownerId" in obj; }, get: function (obj) { return obj.ownerId; }, set: function (obj, value) { obj.ownerId = value; } }, metadata: _metadata }, _ownerId_initializers, _ownerId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateCarDto = CreateCarDto;
