import prisma from "@/configs/prisma";
import { Prisma } from "@/generated/prisma/client";

class MemberRepository {
  private static _instance: MemberRepository;

  private constructor() {}

  static get instance() {
    if (!this._instance) this._instance = new MemberRepository();
    return this._instance;
  }

  async findAll() {
    return await prisma.member.findMany();
  }

  async findById(id: string) {
    return await prisma.member.findUnique({ where: { id } });
  }

  async findByCode(code: string) {
    return await prisma.member.findUnique({ where: { code } });
  }

  async create(data: Prisma.MemberCreateInput) {
    return await prisma.member.create({ data });
  }

  async update(
    id: string,
    data: Prisma.MemberUpdateInput & { version: number }
  ) {
    const { version, ...rest } = data;
    return await prisma.member.update({
      where: {
        id_version: {
          id,
          version,
        },
      },
      data: {
        ...rest,
        version: { increment: 1 },
      },
    });
  }

  async delete(id: string) {
    return await prisma.member.delete({ where: { id } });
  }
}

export const memberRepository = MemberRepository.instance;
