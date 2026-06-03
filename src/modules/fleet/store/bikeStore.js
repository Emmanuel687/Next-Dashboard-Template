import { create } from "zustand";

const useBikeStore = create((set) => ({
  bikeData: {
    bikeType: "",
    bikeBrand: "",
    bikeColor: "",
    bikeModel: "",
    bikeYear: "",
    currentMileage: "",
    mileageRate: "",
    mileageRateUnit: "",
    lastServiceDate: "",
    lastServiceCost: "",
    lastServiceCostUnit: "",
    serviceHours: "",
    serviceHoursUnit: "",
    serviceCost: "",
    serviceCostUnit: "",
    totalCost: "",
    totalCostUnit: "",
  },
  setBikeData: (data) => set({ bikeData: data }),
}));

export { useBikeStore };