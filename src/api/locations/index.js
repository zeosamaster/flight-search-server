import { Router } from "express";
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { fromServer, get, update } from "./controller";
export Locations, { schema } from "./model";

const router = new Router();

router.get("/", query(), get);
router.post("/", token({ required: true, roles: ['admin'] }), update);

export default router;
