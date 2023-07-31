import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import FinopsSection from "../components/FinopsSection";
import RequestDemoModal from "../components/FinopsSection/RequestDemoModal";

const Finops = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const demoButton = (
    <a
      className="button primary"
      onClick={() => setModalVisible(!modalVisible)}
    >
      Request live demo now
    </a>
  );

  return (
    <PageLayout
      title="Proactive FinOps - Infracost"
      description="Cloud costs, loved by developers"
      pageClass="finops default-page-bg"
      hideCTA={true}
      noIndex={false}
    >
      <div className="container finops-cta">
        <div className="finops-cta__wrapper">{demoButton}</div>
      </div>
      <div className="container finops-wrapper">
        <FinopsSection />
      </div>
      <div className="container finops-cta">
        <div className="finops-cta__wrapper finops-cta__wrapper--bottom">
          {demoButton}
        </div>
      </div>

      {modalVisible && <RequestDemoModal setModalVisible={setModalVisible} />}
    </PageLayout>
  );
};

export default Finops;
