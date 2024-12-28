export interface SubRoute {
    stationName: any;
    stationFee: any;
  }
  
export interface BusFee {
    _id?: string;
    route: string;
    fee: number;
    noOfSeats: number;
    filledSeats: number;
    isAvailable: boolean;
    subRoutes: SubRoute[];
  }
  