import "./WelcomeSection.css";
import car from "../../assets/image/car.png";

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="section-container welcome-container">
        <div className="welcome-content">
          <h1 style={{ marginBottom: "12px" }}>
            Welcome To <span className="text-primary">Auto Style</span>
          </h1>
          <h5 style={{ marginBottom: "10px" }}>
            From vintage models to the latest - you will find all.
          </h5>
          <p>
            Auto Style- where your dreams meet affordability. If you are looking
            for a used, cost-effective as well as enchanting car, Auto Style is
            here for you.
          </p>
          <p>
            What are the questions that constantly come to your mind while
            buying a car? - Are the equipment and parts okay? Is the engine
            condition good? Do you have to face the hassles of the paperwork? If
            you want to overcome these inconveniences and choose the best
            product- Auto Style should be your first choice.
          </p>
        </div>
        <img src={car} alt="car" className="responsive-image" />
      </div>
    </section>
  );
};

export default WelcomeSection;
