import connectDB from "@/db/connect/connector";
const { EVENT } = require("@/db/models/eventModel");



export async function POST(request) {
  try {
    await connectDB();
    const {
      lat,
      lon,
      radius
    } = await request.json();
    console.log(lat, lon, radius);

    const events = await EVENT.aggregate([
      {
        $geoNear: { 
          near: { type: "Point", coordinates: [lon, lat] },
          distanceField: "calculatedDistance",
          spherical: true
        }
      }
    ]);

    console.log(events)
    return Response.json({
      success: true,
      data: events,
      error: null
    })

  } catch (err) {
    console.log(err.message)
    return Response.json({
      success: false,
      data: null,
      error: err.message
    })
  }
}