const ClothingCard = ({ image, title, subtitle }) => {
  return (
    <div className="group relative h-80 w-full max-w-xs overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-white drop-shadow-lg transition-transform group-hover:scale-105">
          {title}
        </h3>
        <p className="text-sm text-white drop-shadow-md transition-transform group-hover:scale-105">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ClothingCard;
