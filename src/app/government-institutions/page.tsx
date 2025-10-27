import GovernmentHero from '@/components/government/GovernmentHero';
import AboutGovernmentDivision from '@/components/government/AboutGovernmentDivision';
import CoreOfferings from '@/components/government/CoreOfferings';
import ProcurementCompliance from '@/components/government/ProcurementCompliance';
import CapabilityStatement from '@/components/government/CapabilityStatement';
import ContactSection from '@/components/government/ContactSection';

export default function GovernmentInstitutionsPage() {
  return (
    <>
      <GovernmentHero />
      <AboutGovernmentDivision />
      <CoreOfferings />
      <ProcurementCompliance />
      <CapabilityStatement />
      <ContactSection />
    </>
  );
}
