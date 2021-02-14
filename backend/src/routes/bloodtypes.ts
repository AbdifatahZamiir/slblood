import { Router, Request } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";

const prisma = new PrismaClient();
const bloodtypes: Router = Router();
const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (
    bloodtypes: any,
    page: number,
    limit: number,
    totalItems: number
) => {
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, bloodtypes, totalPages, currentPage };
};
bloodtypes.get("/", async (req, res) => {
    try {
        const { page = 0, size = 7 }: any = req.query;
        const { limit, offset }: any = getPagination(page, size);
        const bloodtypes = await prisma.bloodtypes.findMany({
            take: Number(limit),
            skip: Number(offset),
            include: { donors: true },
        });
        const totalItems = await prisma.bloodtypes.count();
        const data = getPagingData(bloodtypes as any, page, limit, totalItems);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

// bloodtypes.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const bloodtype = await prisma.bloodtypes.findUnique({
//         where: { bloodtypeId: Number(id) },
//     });
//     if (bloodtype === null)
//         return res
//             .status(404)
//             .send(`bloodtype with the id: ${id}, was not found`);
//     res.send(bloodtype);
// });

bloodtypes.post("/", auth, async (req, res) => {
    try {
        const { error } = validatebloodtype(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const bloodtype = await prisma.bloodtypes.create({
            data: { ...req.body },
        });
        res.send(bloodtype);
    } catch (err) {
        res.status(500).send(`internal error`);
    }
});

bloodtypes.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { error } = validatebloodtype(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const bloodtype = await prisma.bloodtypes.update({
            where: { bloodtypeId: Number(id) },
            data: {
                bloodname: req.body.bloodname,
            },
        });
        res.send(bloodtype);
    } catch (err) {
        res.status(404).send("bloodtype with the given id was not found");
    }
});

bloodtypes.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const bloodtype = await prisma.bloodtypes.delete({
            where: { bloodtypeId: Number(id) },
        });
        res.send(bloodtype);
    } catch (err) {
        res.status(404).send(`bloodtype with the id: ${id}, was not found`);
    }
});

function validatebloodtype(req: Request) {
    const schema = Joi.object({
        bloodname: Joi.string().min(1).max(4).required(),
    });
    return schema.validate(req);
}

export default bloodtypes;
