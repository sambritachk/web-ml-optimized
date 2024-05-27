import { ImageIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export type HomePageProps = {};
// eslint-disable-next-line no-empty-pattern
export const HomePage: React.FC = ({}: HomePageProps) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <NavLink
        to={"/tf/image-detection"}
        className="flex flex-col justify-center items-center p-4 rounded bg-slate-950 shadow-black"
      >
        <div className="bg-clip-text text-transparent bg-gradient-to-r flex flex-col justify-center items-center from-orange-400 to-orange-700">
          <ImageIcon className="h-24 w-24 text-orange-600" />
          <span className="text-3xl font-bold">Image Detection</span>
        </div>
      </NavLink>
    </div>
  );
};

export default HomePage;
