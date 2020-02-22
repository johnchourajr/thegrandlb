import React from "react";

// **
// ** Using React GA for event tracking
// https://github.com/pushtell/react-ga
import ReactGA from "react-ga";

// **
// ** Using React AB Test to conduct the AB Testing
// https://github.com/pushtell/react-ab-test
import Experiment from "react-ab-test/lib/Experiment";
import Variant from "react-ab-test/lib/Variant";
import emitter from "react-ab-test/lib/emitter";

import PageCta from "../components/PageCta";
import ScrollAnimate from "../components/ScrollAnimate";
import PromoSection from "../components/PromoSection";

class HomeABTest extends React.Component {
  render() {
    return (
      <ScrollAnimate>
        <Experiment ref="experiment" name="Test092919__Home">
          <Variant name="B">
            <PageCta
              accent={"grandPink"}
              heading={"Chat with Elizabeth\nor Marissa today."}
              buttons={[
                {
                  text: "Let's Talk",
                  url: "/contact/",
                  event: {
                    category: "ContactAction",
                    action: "Test092919__Home__Action_B",
                    label: "Test092919__Home__Action_B"
                  }
                }
              ]}
              img={"/img/about/team-elizabeth-melissa-2.jpg"}
            />
          </Variant>
          <Variant name="C">
            <PromoSection siteBanner={this.props.siteBanner} />
          </Variant>
        </Experiment>
      </ScrollAnimate>
    );
  }
}

// Called when the experiment is displayed to the user.
emitter.addPlayListener((experimentName, variantName) => {
  const str = `Displaying experiment '${experimentName}' variant '${variantName}'`;

  ReactGA.event({
    category: "Test092919__Home",
    action: str
  });
});

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener((experimentName, variantName) => {
  const str = `Variant '${variantName}' of experiment '${experimentName}' was clicked`;

  ReactGA.event({
    category: "Test092919__Home",
    action: str
  });
});

export default HomeABTest;
