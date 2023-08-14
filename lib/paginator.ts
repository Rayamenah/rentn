import { prisma } from "config/prisma.connect";

export async function agentPaginationHelper(
    pageNumber: number,
    
) {
    const pageSize = 10
    try {
        const totalCount = await prisma.agent.count();
        const totalPages = Math.ceil(totalCount/pageSize)
        const offset = (pageNumber - 1) * pageSize
        const data = await prisma.agent.findMany({
            take: pageSize,
            skip: offset,
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                rentn: true,
                apartments: true,
            }
        })
        return {
            data,
            totalCount,
            totalPages,
            currentPage: pageNumber,
            message: 'returned all apartments successfully'
        }
    }catch(error: any) {
        console.error('Error fetching paginated results agent:', error);
        throw error;
    }
}

export async function rentnPaginationHelper(
    pageNumber: number,
    pageSize: number,
) {
    try{
        const totalCount = await prisma.rentn.count()
        const totalPages = Math.ceil(totalCount/pageSize)
        const offset = (pageNumber - 1) * pageSize

        const data = await prisma.rentn.findMany({
            take: pageSize,
            skip: offset,
            include: {
                agent: true,
                admin: true,
                user: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        return {
            data,
            totalCount,
            totalPages,
            currentPage: pageNumber
        }
    } catch(error: any) {
        console.error('Error fetching paginated results from rentn:', error);
        throw error;
    }
}

export async function usersPaginationHelper(
    pageNumber: number,
    pageSize: number,
) {
    try{
        const totalCount = await prisma.users.count()
        const totalPages = Math.ceil(totalCount/pageSize)
        const offset = (pageNumber - 1) * pageSize

        const data = await prisma.users.findMany({
            take: pageSize,
            skip: offset,
            orderBy: {
                createdAt: 'asc'
            }
        })
        return {
            data,
            totalCount,
            totalPages,
            currentPage: pageNumber
        }
    } catch(error: any) {
        console.error('Error fetching paginated results from users:', error);
        throw error;
    }
}

export async function apartmentsPaginationHelper(
    pageNumber: number,
) {
    try{
        const pageSize = 10
        const totalCount = await prisma.apartment.count()
        const totalPages = Math.ceil(totalCount/pageSize)
        const offset = (pageNumber - 1) * pageSize
        const data = await prisma.apartment.findMany({
            take: pageSize,
            skip: offset,
            include: {
                agent: true,
                price: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        return {
            data,
            totalCount,
            totalPages,
            currentPage: pageNumber,
            message: 'returned all apartments successfully'
        }
    } catch(error: any) {
        console.error('Error fetching paginated results from apartment:', error);
        throw error;
    }
}

export async function pricePaginationHelper(
    pageNumber: number,
    pageSize: number,
) {
    try{
        const totalCount = await prisma.price.count()
        const totalPages = Math.ceil(totalCount/pageSize)
        const offset = (pageNumber - 1) * pageSize

        const data = await prisma.price.findMany({
            take: pageSize,
            skip: offset,
            include: {
                apartment: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        return {
            data,
            totalCount,
            totalPages,
            currentPage: pageNumber
        }
    } catch(error: any) {
        console.error('Error fetching paginated results from price:', error);
        throw error;
    }
}