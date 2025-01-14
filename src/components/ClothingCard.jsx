const ClothingCard = ({ image, title }) => {
  return (
    <div className="relative h-[300px] w-[300px]">
      <img src={image} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <span className="font-bold text-white">{title}</span>
        <p className="text-white">5 Items</p>
      </div>
    </div>
  );
};

export default ClothingCard;
