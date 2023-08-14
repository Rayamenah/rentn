import { apartmentsPaginationHelper } from "lib/paginator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const { pageNumber } = req.body;
        const paginationResult = await apartmentsPaginationHelper(
          Number(pageNumber)
        );
        if (!paginationResult) {
          return res.status(404).send({
            message: "No apartments found",
          });
        }
        return res.status(200).send(paginationResult);
    } catch (error: any) {
        console.error("Error while fetching apartments:", error);
        return res.status(500).send({
          message: "Internal server error",
          error: error.message,
        });
    }
}