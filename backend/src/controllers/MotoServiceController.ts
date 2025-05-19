import { Request, Response } from "express";
import mongoose from "mongoose";
import MotoService from "../models/MotoServiceModel";
export const createMotoServiceBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      phone,
      email,
      motoModel,
      motoYear,
      date,
      time,
      serviceIds,
      notes,
    } = req.body;

    const Service = require("../models/ServiceModel").default;

    const services = await Service.find({ _id: { $in: serviceIds } });

    if (services.length !== serviceIds.length) {
      await session.abortTransaction();
      session.endSession();
      res
        .status(400)
        .json({ success: false, error: "One or more services are invalid" });
      return;
    }

    const totalPrice = services.reduce(
      (sum: number, service: { price: number }) => sum + service.price,
      0
    );

    const motoService = await MotoService.create(
      [
        {
          name,
          phone,
          email,
          motoModel,
          motoYear,
          date: new Date(date),
          time,
          services: serviceIds,
          notes,
          totalPrice,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: {
        ...motoService[0].toObject(),
        services,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getMotoServiceBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookings = await MotoService.find().populate("services");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getMotoServiceBookingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const booking = await MotoService.findById(id).populate("services");

    if (!booking) {
      res.status(404).json({ success: false, error: "Booking not found" });
      return;
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateMotoServiceBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.serviceIds) {
      const Service = require("../models/ServiceModel").default;
      const services = await Service.find({
        _id: { $in: updateData.serviceIds },
      });

      if (services.length !== updateData.serviceIds.length) {
        await session.abortTransaction();
        session.endSession();
        res
          .status(400)
          .json({ success: false, error: "One or more services are invalid" });
        return;
      }

      updateData.totalPrice = services.reduce(
        (sum: number, service: { price: number }) => sum + service.price,
        0
      );
      updateData.services = updateData.serviceIds;
      delete updateData.serviceIds;
    }

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const booking = await MotoService.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      session,
    }).populate("services");

    if (!booking) {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json({ success: false, error: "Booking not found" });
      return;
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteMotoServiceBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const booking = await MotoService.findByIdAndDelete(id);

    if (!booking) {
      res.status(404).json({ success: false, error: "Booking not found" });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
