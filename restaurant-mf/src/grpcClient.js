
import { loadPackageDefinition } from "@grpc/grpc-js";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../proto/restaurant.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = loadPackageDefinition(packageDefinition).restaurant;

const client = new proto.RestaurantService("localhost:5002", grpc.credentials.createInsecure());

export default client;
