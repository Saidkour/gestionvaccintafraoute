import IMG from "../../Assets/card1.jpg";

export default function VacsinHead() {
  return (
    <div className=" container w-full m-auto xl:flex md:flex flex-wrap justify-evenly items-center py-10 border-b">
      <div className="md:w-5/12 xl:w-5/12 w-9/12 m-auto xl:m-0 md:m-0 relative xl:order-1 order-2">
        <img
          className="rounded-b-[200px] rounded-l-[200px]  shadow-xl"
          src={IMG}
          alt="img"
        />
        <div className="bg-primary absolute rounded-b-[200px]  rounded-l-[200px]  right-0 bottom-0 top-0 left-0 opacity-20"></div>
      </div>

      <div className="md:w-5/12 xl:w-5/12 w-9/12 m-auto mt-8 xl:m-0 md:m-0 xl:order-2 order-1">
        <div>
          <h1 className="text-3xl text-gray-400 font-bold">why vaccination?</h1>
          <div className="w-3/12 h-2 bg-secondary opacity-20 rounded mt-3"></div>
          <p className="text-gray-400 mt-8">
            La vaccination des enfants est cruciale pour protéger leur santé et
            prévenir la propagation de maladies infectieuses. En administrant
            des vaccins dès le plus jeune âge, on renforce le système
            immunitaire des enfants et on les immunise contre un large éventail
            de maladies potentiellement dangereuses.
          </p>
        </div>
      </div>
    </div>
  );
}
