"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphql_yoga_1 = require("graphql-yoga");
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const type_graphql_1 = require("type-graphql");
// import schema from "./schemas/schema";
const ProjectResolver_1 = __importDefault(require("./resolvers/ProjectResolver"));
const TaskResolver_1 = __importDefault(require("./resolvers/TaskResolver"));
const app = express_1.default();
const port = process.env.PORT || 5000;
const publicPath = path_1.default.join(__dirname, "../client/dist");
app.use(express_1.default.static(publicPath));
//bodyparser middleware
app.use(body_parser_1.default.json());
app.use(cors_1.default({ origin: "*" }));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [ProjectResolver_1.default, TaskResolver_1.default],
            emitSchemaFile: true
        });
        const server = new graphql_yoga_1.GraphQLServer({
            schema
        });
        server.start(() => console.log("GraphQl Yoga  is running on http://localhost:4000"));
    });
}
bootstrap();
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
app.listen(port, () => {
    console.log("App listening on port 5000");
});
//# sourceMappingURL=app.js.map