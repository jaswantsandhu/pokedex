interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-slate-50 rounded-md border-slate-500 border h-96 p-4 card-hover-effect text-black">
      {children}
    </div>
  );
};

export default Card;
