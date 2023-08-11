import { prisma } from "config/prisma.connect";
import cache from "./cacheData";
import { Agent, Rentn } from "@prisma/client";

export async function findRentn(email: string): Promise<Rentn | null> {
  try {
    const rentn = await prisma.rentn.findUnique({
      where: {
        email: email,
      },
      include: {
        admin: true,
        agent: true,
        user: true
      }
    });
    return rentn;
  } catch (error: any) {
    throw new Error(`${error}, occurred from fetching db query in findRentn`)
  }
}
export async function findAgent(email: string): Promise<Agent | null> {
  try {
    const findAgent = await prisma.agent.findUnique({
      where: {
        email: email,
      },
      include: {
        rentn: true
      }
    });
    return findAgent;
  } catch (error: any) {
    throw new Error(`${error}, occurred from fetching agent db to query the data`)
  }
}

export async function addNewApartment(
  address: string,
  community: string
): Promise<boolean>{
  const apartment = await prisma.apartment.findFirst({
    where: {
      OR: [
        {address: address},
        {community: community}
      ],
    },
    select: {
      address: true,
      community: true,
    }
  });
  if (apartment){
    throw new Error('an apartment with that address or community already exits')
  }
  return !apartment
}
