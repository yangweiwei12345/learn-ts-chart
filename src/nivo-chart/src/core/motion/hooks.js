import { useContext } from "react";
import { motionConfigContext } from "./context";

export const useMotionConfig = () => useContext(motionConfigContext);