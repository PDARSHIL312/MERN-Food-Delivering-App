import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i"); // for mongodb Query
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cusinesArray = selectedCuisines
        .split(",")
        .map((cusine) => new RegExp(cusine, "i"));

      query["cuisines"] = { $all: cusinesArray };
    }

    if (searchQuery) {
      const searchRegx = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegx },
        { cuisines: { $in: [searchRegx] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { searchRestaurant };

// If wanted to use aggregation pipeline

// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";

// const searchRestaurant = async (req: Request, res: Response) => {
//   try {
//     const city = req.params.city;
//     const searchQuery = (req.query.searchQuery as string) || "";
//     const selectedCuisines = (req.query.selectedCuisines as string) || "";
//     const sortOption = (req.query.sortOption as string) || "lastUpdated";
//     const page = parseInt(req.query.page as string) || 1;

//     const pageSize = 10;
//     const skip = (page - 1) * pageSize;

//     let match: any = {
//       city: new RegExp(city, "i"),
//     };

//     if (selectedCuisines) {
//       const cuisinesArray = selectedCuisines
//         .split(",")
//         .map((cuisine) => new RegExp(cuisine, "i"));
//       match.cuisines = { $all: cuisinesArray };
//     }

//     if (searchQuery) {
//       const searchRegx = new RegExp(searchQuery, "i");
//       match.$or = [
//         { restaurantName: searchRegx },
//         { cuisines: { $in: [searchRegx] } },
//       ];
//     }

//     const aggregatePipeline = [
//       { $match: match },
//       { $sort: { [sortOption]: 1 } },
//       { $skip: skip },
//       { $limit: pageSize },
//       {
//         $facet: {  // here this is for the proper documenttaion return if you not do it than it okay but transition may not smoother in fetch so
//           data: [
//             { $match: match },
//             { $sort: { [sortOption]: 1 } },
//             { $skip: skip },
//             { $limit: pageSize },
//           ],
//           pagination: [
//          { $match: match },
//           { $count: "total" }
//              ],
//         },
//       },
//       {
//         $project: {  // this is un necessary if you do not want than it is okay
//           data: 1,
//           pagination: {
//             $arrayElemAt: ["$pagination", 0],
//           },
//         },
//       },
//     ];

//     const result = await Restaurant.aggregate(aggregatePipeline).exec();

//     const response = {
//       data: result[0]?.data || [],
//       pagination: {
//         total: result[0]?.pagination?.total || 0,
//         page,
//         pages: Math.ceil((result[0]?.pagination?.total || 0) / pageSize),
//       },
//     };

//     res.json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export default { searchRestaurant };
