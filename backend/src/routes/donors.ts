import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";
// import { admin } from "../middleware/admin";

const prisma = new PrismaClient();
const donors: Router = Router();
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (
  donors: any,
  page: number,
  limit: number,
  totalItems: number
) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, donors, totalPages, currentPage };
};
donors.get("/", async (req, res) => {
  try {
    const { page, size }: any = req.query;
    const { limit, offset }: any = getPagination(page, size);
    const donors = await prisma.donors.findMany({
      take: Number(limit),
      skip: Number(offset), // Skip the cursor

      include: {
        bloodtypes: true,
        requests: {
          include: {
            bloodtypes: { select: { bloodname: true } },
          },
        },
      },
      orderBy: [
        {
          donorId: "asc",
        },
      ],
    });
    const totalItems = await prisma.donors.count();
    const data = getPagingData(donors as any, page, limit, totalItems);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// donors.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const donor = await prisma.donors.findUnique({
//         where: { donorId: Number(id) },
//     });
//     if (donor === null)
//         return res
//             .status(404)
//             .send(`donor with the id: ${id}, was not found`);
//     res.send(donor);
// });

donors.post("/", auth, async (req, res) => {
  try {
    const { bloodtypeId } = req.body;

    const bloodtype = await prisma.bloodtypes.findUnique({
      where: { bloodtypeId: bloodtypeId },
    });

    if (bloodtype === null)
      return res
        .status(400)
        .send(`bloodtype with the id: ${bloodtypeId}, was not found`);

    const { error } = validateDonor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const donor = await prisma.donors.create({
      data: {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        contact: req.body.contact,
        city: req.body.city,
        bloodtypes: {
          connect: {
            bloodtypeId: bloodtypeId,
          },
        },
      },
      include: {
        bloodtypes: true,
      },
    });

    res.send(donor);
  } catch (err) {
    res.status(500).send(`internal error`);
  }
});

donors.put("/:id", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bloodtypeId } = req.body;

    const { error } = validateDonor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const donor = await prisma.donors.update({
      where: { donorId: Number(id) },
      data: {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        contact: req.body.contact,
        city: req.body.city,
        bloodtypes: {
          connect: {
            bloodtypeId: bloodtypeId,
          },
        },
      },
      include: { bloodtypes: true },
    });
    res.send(donor);
  } catch (err) {
    res.status(404).send("donor with the given id was not found");
  }
});

donors.delete("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const donor = await prisma.donors.delete({
      where: { donorId: Number(id) },
    });
    res.send(donor);
  } catch (err) {
    res.status(404).send(`donor with the id: ${id}, was not found`);
  }
});

function validateDonor(req: Request) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    secondname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    gender: Joi.string().valid("male", "female").required(),
    contact: Joi.string().required(),
    bloodtypeId: Joi.number().required(),
    city: Joi.string().required(),
  });
  return schema.validate(req);
}

export default donors;
