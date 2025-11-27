import { db } from "@/database/client";
import {
  MemberCreateInput,
  members,
  MemberUpdateInput,
  Member,
} from "@/database/schema";
import { eq, and } from "drizzle-orm";

class MemberRepository {
  private static _instance: MemberRepository;

  private constructor() {}

  static get instance() {
    if (!this._instance) this._instance = new MemberRepository();
    return this._instance;
  }

  async findAll(): Promise<Member[]> {
    return await db.select().from(members);
  }

  async findById(id: string): Promise<Member | null> {
    const result = await db.select().from(members).where(eq(members.id, id));
    return result[0] ?? null;
  }

  async findByCode(code: string): Promise<Member | null> {
    const result = await db
      .select()
      .from(members)
      .where(eq(members.code, code));
    return result[0] ?? null;
  }

  async create(data: MemberCreateInput): Promise<Member> {
    const result = await db.insert(members).values(data).returning();
    return result[0];
  }

  async update(id: string, data: MemberUpdateInput): Promise<Member> {
    const { version, ...rest } = data;
    const result = await db
      .update(members)
      .set({
        ...rest,
        version: version + 1,
      })
      .where(and(eq(members.id, id), eq(members.version, version)))
      .returning();
    if (result.length === 0) {
      throw new Error("Version conflict or Member not found.");
    }
    return result[0];
  }

  async delete(id: string): Promise<Member | null> {
    const result = await db
      .delete(members)
      .where(eq(members.id, id))
      .returning();
    return result[0] ?? null;
  }
}

export const memberRepository = MemberRepository.instance;
