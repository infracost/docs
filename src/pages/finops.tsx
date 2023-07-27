import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import FinopsAnimatedSection from "../components/FinopsSection";
import RequestDemoModal from "../components/FinopsSection/RequestDemoModal";

const Finops = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const demoButton = (
    <a
      className="button primary"
      onClick={() => setModalVisible(!modalVisible)}
    >
      Request demo
    </a>
  );

  return (
    <PageLayout
      title="FinOps"
      description="Cloud costs, loved by developers"
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <div className="container finops-cta">
        <div className="finops-cta__wrapper">
          <span className="finops-cta__text">Request live demo now</span>
          {demoButton}
        </div>
      </div>
      <div className="container finops-wrapper">
        <FinopsAnimatedSection />
      </div>
      <div className="container finops-cta">
        <div className="finops-cta__wrapper finops-cta__wrapper--bottom">
          <span className="finops-cta__text">Request live demo now</span>
          {demoButton}
        </div>
      </div>

      {modalVisible && <RequestDemoModal setModalVisible={setModalVisible} />}
    </PageLayout>
  );
};

export default Finops;
