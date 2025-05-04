interface ICard_sm {
  cardTitle?: string;
  para?: string | React.ReactNode;
  btn_text?: string;
}

function Card_sm({ cardTitle, para, btn_text }: ICard_sm) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="card bg-base-100 shadow-sm w-full">
        <figure>{/* Optional image/visual can go here */}</figure>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-base sm:text-lg">{cardTitle}</h2>
          <p className="text-sm sm:text-base">{para}</p>
          <div className="card-actions w-full mt-4">
            <button className="btn w-full text-white bg-[#1C836D] hover:opacity-90">
              {btn_text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card_sm;
