// express.d.ts
import { User } from "./models/user"  // Corrected casing


declare global {
  namespace Express {
    interface Request {
      user?: User; // Assuming the user is of type User (you can change this to match your user model)
    }
  }
}
