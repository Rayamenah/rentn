import { prisma } from "config/prisma.connect";
import cache from "./cacheData";
import { Rentn } from "@prisma/client";

export async function findRentn(email: string): Promise<Rentn | null> {
  try {
    const rentn = await prisma.rentn.findUnique({
      where: {
        email: email,
      },
    });
    return rentn;
  } catch (error: any) {
    throw new Error(`${error}, occurred from fetching db query in findRentn`)
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
