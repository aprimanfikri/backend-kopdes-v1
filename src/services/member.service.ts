import { memberRepository } from "@/repositories/member.repository";
import {
  memberCreateSchema,
  MemberCreateSchema,
  memberUpdateSchema,
  MemberUpdateSchema,
} from "@/validations/member";
import { HTTPException } from "hono/http-exception";

class MemberService {
  private static _instance: MemberService;

  private constructor() {}

  static get instance() {
    if (!this._instance) {
      this._instance = new MemberService();
    }
    return this._instance;
  }

  async findAll() {
    return await memberRepository.findAll();
  }

  async findById(id: string) {
    return await memberRepository.findById(id);
  }

  async findByCode(code: string) {
    return await memberRepository.findByCode(code);
  }

  async create(body: MemberCreateSchema) {
    const data = memberCreateSchema.parse(body);

    const exist = await memberRepository.findByCode(data.code);

    if (exist) {
      throw new HTTPException(400, { message: "Code already exists" });
    }

    return await memberRepository.create(data);
  }

  async update(id: string, body: MemberUpdateSchema) {
    const exist = await memberRepository.findById(id);

    if (!exist) {
      throw new HTTPException(404, { message: "Member not found" });
    }

    const data = memberUpdateSchema.parse(body);

    const version = exist.version;

    if (data.version !== version) {
      throw new HTTPException(409, { message: "Version conflict" });
    }

    return await memberRepository.update(id, data);
  }

  async delete(id: string) {
    return await memberRepository.delete(id);
  }
}

export const memberService = MemberService.instance;
