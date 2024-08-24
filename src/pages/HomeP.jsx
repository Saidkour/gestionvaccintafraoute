import HomeHeader from "../Components/Home/HomeHeader";
import VacsinHead from "../Components/Home/vaccinHead";
import Vacsins from "../Components/Home/vacsinCards";
import WorkingTimes from "../Components/Home/wokringTimes";

const HomeP = () => {
  return (
    <>
      <HomeHeader/>
       <VacsinHead/>
       <Vacsins/>
      <WorkingTimes/>
    </>
  );
};

export default HomeP;
