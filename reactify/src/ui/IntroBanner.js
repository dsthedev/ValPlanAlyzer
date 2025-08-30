import background from "../images/background.webp";

export const IntroBanner = () => {
    return (
    <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
      <div className="content">
        <h1>ValPlanAlyzer</h1>

        <p className="major">
          Analyze your PlanBuild blueprints for their material cost.
        </p>

        <p>
          <a href="https://thunderstore.io/c/valheim/p/MathiasDecrock/PlanBuild/">
            PlanBuild
          </a>{" "}
          allows you to create a blueprint for anything you build in Valheim.
          It's an amazing plugin, and it makes it easy to create backups for
          your most impressive base, or just share a little cabin with your
          friends.
        </p>

        <p>
          The <strong>Val</strong>heim <strong>Plan</strong> An
          <strong>alyzer</strong> takes that one step further and analyzes the
          blueprint file to give you an exhaustive list of every material needed
          to build it!
        </p>

        <ul className="actions stacked">
          <li>
            <a
              href="#upload"
              className="button primary large wide smooth-scroll-middle"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
      <div className="image">
        <img
          src={background}
          alt="ValPlanAlyzer background of a Meadows scene."
        />
      </div>
    </section>
  );
};
