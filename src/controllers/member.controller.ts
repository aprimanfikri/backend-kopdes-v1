import { memberService } from "@/services/member.service";
import { RESPONSE_CODES } from "@/types";
import { responseHandler } from "@/utils/response";
import { MemberCreateSchema, MemberUpdateSchema } from "@/validations/member";
import { Context } from "hono";

class MemberController {
  private static _instance: MemberController;

  private constructor() {}

  static get instance() {
    if (!this._instance) {
      this._instance = new MemberController();
    }
    return this._instance;
  }

  async findAll(c: Context) {
    const members = await memberService.findAll();
    return responseHandler.success(
      c,
      "Members fetched successfully",
      members,
      RESPONSE_CODES.SUCCESS,
      200
    );
  }

  async findById(c: Context) {
    const id = c.req.param("id");
    const member = await memberService.findById(id);
    return responseHandler.success(
      c,
      "Member fetched successfully",
      member,
      RESPONSE_CODES.SUCCESS,
      200
    );
  }

  async findByCode(c: Context) {
    const code = c.req.param("code");
    const member = await memberService.findByCode(code);
    return responseHandler.success(
      c,
      "Member fetched successfully",
      member,
      RESPONSE_CODES.SUCCESS,
      200
    );
  }

  async create(c: Context) {
    const body = await c.req.json<MemberCreateSchema>();
    const member = await memberService.create(body);
    return responseHandler.success(
      c,
      "Member created successfully",
      member,
      RESPONSE_CODES.CREATED,
      201
    );
  }

  async update(c: Context) {
    const id = c.req.param("id");
    const body = await c.req.json<MemberUpdateSchema>();
    const member = await memberService.update(id, body);
    return responseHandler.success(
      c,
      "Member updated successfully",
      member,
      RESPONSE_CODES.SUCCESS,
      200
    );
  }

  async delete(c: Context) {
    const id = c.req.param("id");
    await memberService.delete(id);
    return responseHandler.success(
      c,
      "Member deleted successfully",
      null,
      RESPONSE_CODES.SUCCESS,
      200
    );
  }
}

export const memberController = MemberController.instance;
