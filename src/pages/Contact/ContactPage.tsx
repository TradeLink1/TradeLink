import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../../components/reusable/Button";
import ContactCard from "../Contact/ContactCard";
import { IoMdHelpCircle } from "react-icons/io";
import ContactForm from "./ContactForm";
import { LuClock4 } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

import React from "react";

const ContactPage: React.FC = () => {
  return (
    <main>
      <section className="flex flex-col items-center justify-center space-y-3 pt-28 pb-12 bg-[#FDEED0]">
        <FiMessageCircle size={60} color="#F89216" />
        <h2 className="text-2xl text-[#333333] font-bold">Contact Us</h2>
        <p className="text-[#555555] text-center max-w-[700px]">
          We're here to help. Get in touch with our support team.
        </p>
      </section>

      <section className="mx-auto max-w-[1000px] p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <ContactCard
              icon={<FiPhone color="#F89216" size={24} />}
              title="Phone Support"
              desc="Speak directly with our support team"
              phone="+1234567890"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <LuClock4 />
                  <p>Monday - Friday 9:00 AM - 7:00 PM</p>
                </div>
                <div className="flex items-center gap-3">
                  <LuClock4 />
                  <p>Saturday 10:00 AM - 4:00 PM</p>
                </div>
                <div className="flex items-center gap-3">
                  <LuClock4 />
                  <p>Sunday Closed</p>
                </div>
                <Button
                  icon={<FiPhone />}
                  name="Call Now"
                  bgColor="#30ac57"
                  hoverBgColor="#f89216"
                  hoverTextColor="#333333"
                  textColor="white"
                />
              </div>
            </ContactCard>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <ContactCard
              icon={<MdMailOutline color="#F89216" size={24} />}
              title="Email Support"
              desc="Send us an email and we'll respond within 24 hours"
            >
              <div className="space-y-2">
                <p>
                  <span className="font-bold">General: </span>
                  <a
                    href="mailto:support@tradelink.com"
                    className="text-[#1f7bff]"
                  >
                    support@tradelink.com
                  </a>
                </p>
                <p>
                  <span className="font-bold">Sellers: </span>
                  <a
                    href="mailto:sellers@tradelink.com"
                    className="text-[#1f7bff]"
                  >
                    sellers@tradelink.com
                  </a>
                </p>
                <p>
                  <span className="font-bold">Buyers: </span>
                  <a
                    href="mailto:buyers@tradelink.com"
                    className="text-[#1f7bff]"
                  >
                    buyers@tradelink.com
                  </a>
                </p>
              </div>
            </ContactCard>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <ContactCard
              icon={<CiLocationOn color="#F89216" size={24} />}
              title="Our Office"
              desc="TradeLink Headquarters"
            >
              <div className="space-y-2">
                <p>123 TradeLink Street, Floor 100</p>
                <p>Lagos, Nigeria</p>
                <Link to="/GetDirections">
                  <Button
                    icon={<CiLocationOn />}
                    name="Get Directions"
                    bgColor="#30ac57"
                    hoverBgColor="#f89216"
                    hoverTextColor="#333333"
                    textColor="white"
                  />
                </Link>
              </div>
            </ContactCard>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <ContactCard
              icon={<IoMdHelpCircle color="#F89216" size={24} />}
              title="Quick Help"
              desc="Find answers and resources fast"
            >
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <Link to="/FAQ">
                  <Button
                    name="View FAQs"
                    className="w-full"
                    bgColor="#30ac57"
                    hoverBgColor="#f89216"
                    hoverTextColor="#333333"
                    textColor="white"
                  />
                </Link>
                <Link to="/SellWithUs">
                  <Button
                    name="Become a Seller"
                    className="w-full"
                    bgColor="#30ac57"
                    hoverBgColor="#f89216"
                    hoverTextColor="#333333"
                    textColor="white"
                  />
                </Link>
                <Link to="/ReportIssue">
                  <Button
                    name="Report an Issue"
                    className="w-full"
                    bgColor="#30ac57"
                    hoverBgColor="#f89216"
                    hoverTextColor="#333333"
                    textColor="white"
                  />
                </Link>
              </div>
            </ContactCard>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
