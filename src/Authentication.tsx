import { Authenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import OurClasses from "@/scenes/ourClasses";
import Benefits from "@/scenes/benefits";
import ContactUs from "@/scenes/contactUs";
import Footer from "@/scenes/footer";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";



function Authentication() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Authenticator.Provider>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Authenticator>
        {({ signOut }) => {
          return (
            <>
              <main>
                <Home setSelectedPage={setSelectedPage} />
                <Benefits setSelectedPage={setSelectedPage} />
                <OurClasses setSelectedPage={setSelectedPage} />
                <ContactUs setSelectedPage={setSelectedPage} />
              </main>
            </>
          );
        }}
      </Authenticator>
      <Footer />
    </Authenticator.Provider>
  );
}

export default Authentication;
