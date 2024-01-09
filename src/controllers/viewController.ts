import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { apiResponse } from "../interface/responseData";
const prisma = new PrismaClient();

const viewAllController = async (req: Request, res: Response) => {
  try {
    if (req.query.skip && req.query.take) {
      let viewPaginatedUser = await prisma.user.findMany({
        skip: Number(req.query.skip),
        take: Number(req.query.take),
      });
      if (viewPaginatedUser.length == 0) {
        return res.status(404).json(apiResponse(false, "No User Found", []));
      }

      return res
        .status(200)
        .json(
          apiResponse(true, "Users Fetched Successfully", viewPaginatedUser)
        );
    }
    const viewAllUser = await prisma.user.findMany();
    if (viewAllUser.length == 0) {
      return res.status(404).json(apiResponse(false, "No User Found", []));
    }
    return res
      .status(200)
      .json(apiResponse(true, "Users Fetched Successfully", viewAllUser));
  } catch (error) {
    return res.status(500).json(apiResponse(false, "Something Went Wrong"));
  }
};

const viewByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return res.status(404).json(apiResponse(false, "No User Found", {}));
    }
    return res
      .status(200)
      .json(apiResponse(true, "User Fetched Successfully", existingUser));
  } catch (error) {
    console.log(error);
    return res.status(500).json(apiResponse(false, "Something Went Wrong"));
  }
};

const addUserController = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(404).json(apiResponse(false, "Email already exists"));
    }
    const createUser = await prisma.user.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });
    return res
      .status(200)
      .json(apiResponse(true, "User Successfully Added", createUser));
  } catch (error) {
    console.log(error);
    return res.status(500).json(apiResponse(false, "Something Went Wrong"));
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return res.status(404).json(apiResponse(false, `User ${id} not found`));
    }
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });
    return res
      .status(200)
      .json(apiResponse(true, "User Updated Successfully", updateUser));
  } catch (error) {
    return res.status(500).json(apiResponse(false, "Something Went Wrong"));
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json(apiResponse(false, `User ${id} not found`));
    }
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json(apiResponse(true, `User ${id} deleted successfully`));
  } catch (error) {
    return res.status(500).json(apiResponse(false, "Something Went wrong"));
  }
};

export {
  viewAllController,
  viewByIdController,
  addUserController,
  updateUserController,
  deleteUserController,
};
