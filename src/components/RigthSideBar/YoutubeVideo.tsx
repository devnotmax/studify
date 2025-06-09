import portada from "../../assets/portada.png";

export const YoutubeVideo = () => {
  return (
    <div className="flex items-center p-4 gap-3">
      <div className="flex flex-col w-full h-52 items-center justify-center p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all">
        <img
          src={portada}
          alt="Thumbnail del video"
          className="w-full h-40 object-cover rounded-xl"
        />
        <div className="flex flex-col items-start justify-start w-full p-3">
          <p className="text-lg font-medium tracking-wide w-full">telefonía</p>
          <p className="text-base font-light tracking-wide w-full text-gray-600">
            youtube - jorge drexler
          </p>
        </div>
      </div>
    </div>
  );
};
