import React from "react";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  children?: React.ReactNode;
  phone?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  desc,
  children,
  phone,
}) => {
  return (
    <div className="space-y-2 text-[#333333]">
      <div className="flex gap-3 ">
        {icon}
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      {desc && <p className="text-gray-600">{desc}</p>}
      {phone && <p className="font-bold">{phone}</p>}
      {children}
    </div>
  );
};

export default ContactCard;
