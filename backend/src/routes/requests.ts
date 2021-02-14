import { Router, Request } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";

const prisma = new PrismaClient();
const requests: Router = Router();

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (
    requests: any,
    page: number,
    limit: number,
    totalItems: number
) => {
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, requests, totalPages, currentPage };
};

requests.get("/", async (req, res) => {
    try {
        const { page, size }: any = req.query;
        const { limit, offset }: any = getPagination(page, size);
        const requests = await prisma.requests.findMany({
            take: Number(limit),
            skip: Number(offset),
            include: { donors: true, bloodtypes: true },
        });
        const totalItems = await prisma.requests.count();
        const data = getPagingData(requests as any, page, limit, totalItems);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

// requests.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const request = await prisma.requests.findUnique({
//         where: { requestId: Number(id) },
//     });
//     if (request === null)
//         return res.status(404).send(`request with the id: ${id}, was not found`);
//     res.send(request);
// });

requests.post("/", auth, async (req, res) => {
    try {
        const { bloodtypeId, donorId } = req.body;

        const bloodtype = await prisma.bloodtypes.findUnique({
            where: { bloodtypeId: bloodtypeId },
        });

        if (bloodtype === null)
            return res
                .status(404)
                .send(`bloodtype with the id: ${bloodtypeId}, was not found`);

        const donor = await prisma.donors.findUnique({
            where: { donorId: donorId },
        });
        if (donor === null)
            return res
                .status(404)
                .send(`donor with the id: ${donorId}, was not found`);

        const { error } = validaterequest(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const request = await prisma.requests.create({
            data: {
                amount: req.body.amount,
                donors: {
                    connect: {
                        donorId: donorId,
                    },
                },
                bloodtypes: {
                    connect: {
                        bloodtypeId: bloodtypeId,
                    },
                },
            },
            include: {
                bloodtypes: true,
                donors: true,
            },
        });

        res.send(request);
    } catch (err) {
        res.status(400).send(`Error ${err.message}`);
    }
});

requests.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { donorId, bloodtypeId, examId } = req.body;
    const { error } = validaterequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const request = await prisma.requests.update({
            where: { requestId: Number(id) },
            data: {
                amount: req.body.amount,
                donors: {
                    connect: {
                        donorId: donorId,
                    },
                },
                bloodtypes: {
                    connect: {
                        bloodtypeId: bloodtypeId,
                    },
                },
            },
            include: { bloodtypes: true, donors: true },
        });
        res.send(request);
    } catch (err) {
        res.status(404).send("request with the given id was not found");
    }
});

requests.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const request = await prisma.requests.delete({
            where: { requestId: Number(id) },
        });
        res.send(request);
    } catch (err) {
        res.status(404).send(`request with the id: ${id}, was not found`);
    }
});

function validaterequest(req: Request) {
    const schema = Joi.object({
        amount: Joi.number().required(),
        bloodtypeId: Joi.number().required(),
        donorId: Joi.number().required(),
    });
    return schema.validate(req);
}

export default requests;
