import { HTTPException } from "hono/http-exception";
import { memberRepository } from "@/repositories/member.repository";
import {
  memberCreateSchema,
  MemberCreateSchema,
  memberUpdateSchema,
  MemberUpdateSchema,
} from "@/validations/member";
import { Member } from "@/database/schema";

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
    return memberRepository.findAll();
  }

  async findById(id: string) {
    const member = await memberRepository.findById(id);
    if (!member) throw new HTTPException(404, { message: "Member not found" });
    return member;
  }

  async findByCode(code: string) {
    const member = await memberRepository.findByCode(code);
    if (!member) throw new HTTPException(404, { message: "Member not found" });
    return member;
  }

  async create(body: MemberCreateSchema) {
    const data = memberCreateSchema.parse(body);
    const exist = await memberRepository.findByCode(data.code);
    if (exist) throw new HTTPException(400, { message: "Code already exists" });
    const member = await memberRepository.create(data);
    return member;
  }

  async update(id: string, body: MemberUpdateSchema) {
    const exist = await memberRepository.findById(id);
    if (!exist) throw new HTTPException(404, { message: "Member not found" });
    const data = memberUpdateSchema.parse(body);
    if (data.version !== exist.version) {
      throw new HTTPException(409, { message: "Version conflict" });
    }
    const member = await memberRepository.update(id, data);
    return member;
  }

  async delete(id: string) {
    const member = await memberRepository.delete(id);
    if (!member) throw new HTTPException(404, { message: "Member not found" });
    return member;
  }
}

export const memberService = MemberService.instance;
